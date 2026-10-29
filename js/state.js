/**
 * state.js
 * Centralized State Management, History Stack (Undo/Redo),
 * LocalStorage Persistence, Custom Formations, and Export/Import operations.
 */

const STORAGE_KEYS = {
  CURRENT_STATE: 'tactical_board_current_state',
  CUSTOM_FORMATIONS: 'tactical_board_custom_formations',
  SAVED_SETUPS: 'tactical_board_saved_setups'
};

class StateManager {
  constructor(initialState) {
    this.state = initialState || this.getDefaultState();
    this.undoStack = [];
    this.redoStack = [];
    this.maxHistory = 40;
    this.subscribers = [];

    // Load persisted state if exists
    this.loadFromLocalStorage();
  }

  getDefaultState() {
    const formation433 = window.FORMATION_DEFINITIONS['4-3-3'];
    const formation4231 = window.FORMATION_DEFINITIONS['4-2-3-1'];

    return {
      version: '1.0',
      title: 'Match Tactical Plan',
      timestamp: Date.now(),
      viewMode: 'full', // 'full', 'teamA', 'teamB'
      activeScenario: null,
      ball: { x: 50, y: 50 },
      offsideLine: {
        visible: false,
        y: 65, // normalized % from top
        team: 'teamA'
      },
      grid: {
        visible: false,
        type: 'positional_play' // 18-zone positional play grid
      },
      displayOptions: {
        showNames: true,
        showNumbers: true,
        showPositions: true
      },
      teamA: {
        id: 'teamA',
        name: 'HOME XI',
        color: '#2563eb', // Vivid Royal Blue
        textColor: '#ffffff',
        gkColor: '#eab308', // Amber/Yellow GK
        formationKey: '4-3-3',
        attackDirection: 'bottom', // Defends bottom, attacks top
        players: JSON.parse(JSON.stringify(formation433.bottom)),
        tactics: {
          mentality: 'Attacking',
          defensiveLine: 'High',
          pressing: 'High',
          width: 'Wide',
          passing: 'Short',
          buildUp: 'Possession',
          defenseApproach: 'High Press'
        }
      },
      teamB: {
        id: 'teamB',
        name: 'AWAY XI',
        color: '#dc2626', // Crimson Red
        textColor: '#ffffff',
        gkColor: '#10b981', // Emerald GK
        formationKey: '4-2-3-1',
        attackDirection: 'top', // Defends top, attacks bottom
        players: JSON.parse(JSON.stringify(formation4231.top)),
        tactics: {
          mentality: 'Balanced',
          defensiveLine: 'Medium',
          pressing: 'Medium',
          width: 'Balanced',
          passing: 'Mixed',
          buildUp: 'Counter-Attack',
          defenseApproach: 'Mid Block'
        }
      },
      drawings: [],
      notes: 'Initial tactical preparation. Pressing cues active on fullback receiving facing sideline.'
    };
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  notify() {
    this.saveToLocalStorage();
    this.subscribers.forEach(cb => {
      try {
        cb(this.state);
      } catch (e) {
        console.error('Subscriber notification error:', e);
      }
    });
  }

  recordSnapshot() {
    const snapshot = JSON.stringify(this.state);
    if (this.undoStack.length > 0 && this.undoStack[this.undoStack.length - 1] === snapshot) {
      return;
    }
    this.undoStack.push(snapshot);
    if (this.undoStack.length > this.maxHistory) {
      this.undoStack.shift();
    }
    this.redoStack = []; // Clear redo on new action
  }

  undo() {
    if (this.undoStack.length === 0) return false;
    const current = JSON.stringify(this.state);
    this.redoStack.push(current);
    const prev = this.undoStack.pop();
    this.state = JSON.parse(prev);
    this.notify();
    return true;
  }

  redo() {
    if (this.redoStack.length === 0) return false;
    const current = JSON.stringify(this.state);
    this.undoStack.push(current);
    const next = this.redoStack.pop();
    this.state = JSON.parse(next);
    this.notify();
    return true;
  }

  canUndo() {
    return this.undoStack.length > 0;
  }

  canRedo() {
    return this.redoStack.length > 0;
  }

  resetBoard() {
    this.recordSnapshot();
    this.state = this.getDefaultState();
    this.notify();
  }

  // --- Formation Methods ---
  setTeamFormation(teamKey, formationKey) {
    const def = window.FORMATION_DEFINITIONS[formationKey];
    if (!def) return;
    this.recordSnapshot();

    const team = this.state[teamKey];
    team.formationKey = formationKey;
    const side = team.attackDirection === 'bottom' ? 'bottom' : 'top';
    const template = def[side] || def.bottom;

    // Preserve existing player custom names/numbers where possible
    const newPlayers = template.map((tmpl, idx) => {
      const existing = team.players[idx] || {};
      return {
        ...tmpl,
        name: existing.name || tmpl.name,
        number: existing.number !== undefined ? existing.number : tmpl.number,
        isCaptain: !!existing.isCaptain
      };
    });

    team.players = newPlayers;
    this.notify();
  }

  resetTeamToDefaultPositions(teamKey) {
    this.recordSnapshot();
    const team = this.state[teamKey];
    const def = window.FORMATION_DEFINITIONS[team.formationKey] || window.FORMATION_DEFINITIONS['4-3-3'];
    const side = team.attackDirection === 'bottom' ? 'bottom' : 'top';
    const template = def[side] || def.bottom;

    team.players.forEach((p, idx) => {
      if (template[idx]) {
        p.x = template[idx].x;
        p.y = template[idx].y;
        p.role = template[idx].role;
      }
    });

    this.notify();
  }

  // --- Player Manipulation ---
  updatePlayerPosition(teamKey, playerId, normX, normY) {
    const team = this.state[teamKey];
    const player = team.players.find(p => p.id === playerId);
    if (!player) return;

    player.x = Math.max(2, Math.min(98, normX));
    player.y = Math.max(2, Math.min(98, normY));
    // Notice: we don't snapshot every sub-pixel move during drag; snapshot happens on drag end
    this.notify();
  }

  updatePlayerDetails(teamKey, playerId, updates) {
    this.recordSnapshot();
    const team = this.state[teamKey];
    const player = team.players.find(p => p.id === playerId);
    if (!player) return;

    if (updates.isCaptain && updates.isCaptain !== player.isCaptain) {
      // Only 1 captain per team
      team.players.forEach(p => { p.isCaptain = false; });
    }

    Object.assign(player, updates);
    this.notify();
  }

  // --- Ball Manipulation ---
  updateBallPosition(normX, normY) {
    this.state.ball.x = Math.max(1, Math.min(99, normX));
    this.state.ball.y = Math.max(1, Math.min(99, normY));
    this.notify();
  }

  moveBallToPlayer(player) {
    this.recordSnapshot();
    this.state.ball.x = player.x;
    this.state.ball.y = Math.min(98, Math.max(2, player.y + 2.5));
    this.notify();
  }

  resetBallToCenter() {
    this.recordSnapshot();
    this.state.ball.x = 50;
    this.state.ball.y = 50;
    this.notify();
  }

  // --- Scenario Methods ---
  loadScenario(scenarioId) {
    const scenario = window.PRESET_SCENARIOS[scenarioId];
    if (!scenario) return;
    this.recordSnapshot();

    this.state.activeScenario = scenarioId;

    if (scenario.positions) {
      if (scenario.positions.teamA) {
        scenario.positions.teamA.forEach(sp => {
          const p = this.state.teamA.players.find(pl => pl.id === sp.id);
          if (p) {
            p.x = sp.x;
            p.y = sp.y;
            if (sp.role) p.role = sp.role;
            if (sp.customRole) p.customRole = sp.customRole;
          }
        });
      }
      if (scenario.positions.teamB) {
        scenario.positions.teamB.forEach(sp => {
          const p = this.state.teamB.players.find(pl => pl.id === sp.id);
          if (p) {
            p.x = sp.x;
            p.y = sp.y;
            if (sp.role) p.role = sp.role;
            if (sp.customRole) p.customRole = sp.customRole;
          }
        });
      }
    }

    if (scenario.ball) {
      this.state.ball = { ...scenario.ball };
    }

    if (scenario.tactics && scenario.tactics.teamA) {
      Object.assign(this.state.teamA.tactics, scenario.tactics.teamA);
    }

    if (scenario.drawings) {
      this.state.drawings = JSON.parse(JSON.stringify(scenario.drawings));
    }

    this.state.notes = scenario.description || '';
    this.notify();
  }

  // --- Custom Formations (localStorage) ---
  getCustomFormations() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CUSTOM_FORMATIONS);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      console.error('Error reading custom formations:', e);
      return {};
    }
  }

  saveCustomFormation(name, teamKey) {
    const formations = this.getCustomFormations();
    const team = this.state[teamKey];
    formations[name] = {
      name,
      timestamp: Date.now(),
      attackDirection: team.attackDirection,
      players: JSON.parse(JSON.stringify(team.players))
    };
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_FORMATIONS, JSON.stringify(formations));
      return true;
    } catch (e) {
      console.error('Error saving custom formation:', e);
      return false;
    }
  }

  deleteCustomFormation(name) {
    const formations = this.getCustomFormations();
    if (formations[name]) {
      delete formations[name];
      localStorage.setItem(STORAGE_KEYS.CUSTOM_FORMATIONS, JSON.stringify(formations));
      return true;
    }
    return false;
  }

  duplicateCustomFormation(name) {
    const formations = this.getCustomFormations();
    if (!formations[name]) return false;
    let newName = name + ' (Copy)';
    let counter = 1;
    while (formations[newName]) {
      newName = `${name} (Copy ${++counter})`;
    }
    formations[newName] = {
      ...JSON.parse(JSON.stringify(formations[name])),
      name: newName,
      timestamp: Date.now()
    };
    localStorage.setItem(STORAGE_KEYS.CUSTOM_FORMATIONS, JSON.stringify(formations));
    return newName;
  }

  renameCustomFormation(oldName, newName) {
    const formations = this.getCustomFormations();
    if (!formations[oldName] || !newName || formations[newName]) return false;
    formations[newName] = {
      ...formations[oldName],
      name: newName
    };
    delete formations[oldName];
    localStorage.setItem(STORAGE_KEYS.CUSTOM_FORMATIONS, JSON.stringify(formations));
    return true;
  }

  loadCustomFormation(name, teamKey) {
    const formations = this.getCustomFormations();
    const custom = formations[name];
    if (!custom) return false;
    this.recordSnapshot();

    const team = this.state[teamKey];
    team.formationKey = `custom_${name}`;
    team.players = JSON.parse(JSON.stringify(custom.players));
    this.notify();
    return true;
  }

  // --- Saved Setups (localStorage) ---
  getSavedSetups() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SAVED_SETUPS);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      console.error('Error reading saved setups:', e);
      return {};
    }
  }

  saveNamedSetup(name) {
    const setups = this.getSavedSetups();
    setups[name] = {
      name,
      savedAt: Date.now(),
      state: JSON.parse(JSON.stringify(this.state))
    };
    try {
      localStorage.setItem(STORAGE_KEYS.SAVED_SETUPS, JSON.stringify(setups));
      return true;
    } catch (e) {
      console.error('Error saving tactical setup:', e);
      return false;
    }
  }

  loadNamedSetup(name) {
    const setups = this.getSavedSetups();
    if (!setups[name]) return false;
    this.recordSnapshot();
    this.state = JSON.parse(JSON.stringify(setups[name].state));
    this.notify();
    return true;
  }

  deleteNamedSetup(name) {
    const setups = this.getSavedSetups();
    if (setups[name]) {
      delete setups[name];
      localStorage.setItem(STORAGE_KEYS.SAVED_SETUPS, JSON.stringify(setups));
      return true;
    }
    return false;
  }

  duplicateNamedSetup(name) {
    const setups = this.getSavedSetups();
    if (!setups[name]) return false;
    let newName = name + ' (Copy)';
    let counter = 1;
    while (setups[newName]) {
      newName = `${name} (Copy ${++counter})`;
    }
    setups[newName] = {
      name: newName,
      savedAt: Date.now(),
      state: JSON.parse(JSON.stringify(setups[name].state))
    };
    localStorage.setItem(STORAGE_KEYS.SAVED_SETUPS, JSON.stringify(setups));
    return newName;
  }

  renameNamedSetup(oldName, newName) {
    const setups = this.getSavedSetups();
    if (!setups[oldName] || !newName || setups[newName]) return false;
    setups[newName] = {
      ...setups[oldName],
      name: newName
    };
    delete setups[oldName];
    localStorage.setItem(STORAGE_KEYS.SAVED_SETUPS, JSON.stringify(setups));
    return true;
  }

  // --- LocalStorage Auto-Persistence ---
  saveToLocalStorage() {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_STATE, JSON.stringify(this.state));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }

  loadFromLocalStorage() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_STATE);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.teamA && parsed.teamB) {
          this.state = parsed;
        }
      }
    } catch (e) {
      console.warn('Could not load saved state from localStorage, using default:', e);
    }
  }

  // --- JSON Export / Import ---
  exportJSON() {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.state, null, 2));
    const downloadAnchor = document.createElement('a');
    const filename = `tactical-board-${this.state.teamA.name}-vs-${this.state.teamB.name}-${new Date().toISOString().slice(0, 10)}.json`;
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', filename);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }

  importJSON(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed.teamA || !parsed.teamB || !Array.isArray(parsed.teamA.players) || !Array.isArray(parsed.teamB.players)) {
        throw new Error('Invalid tactical setup file structure. Must contain Team A and Team B player data.');
      }
      this.recordSnapshot();
      this.state = parsed;
      this.notify();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }
}

window.StateManager = StateManager;
