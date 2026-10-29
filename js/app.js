/**
 * Clean, lightweight Football Tactical Board.
 * Features:
 * - 22 draggable player chips (Blue vs Red) + draggable football.
 * - Formation type selectors for both teams (4-3-3, 4-4-2, 4-2-3-1, 3-5-2, 5-3-2, 3-4-3).
 * - Click to edit player name, shirt number, and position label.
 * - Reset positions button.
 */

document.addEventListener('DOMContentLoaded', () => {
  const pitchSvg = document.getElementById('football-pitch');
  const playersLayer = document.getElementById('players-layer');
  const ballElement = document.getElementById('football');
  const btnReset = document.getElementById('btn-reset');
  const selectBlueFormation = document.getElementById('blue-formation');
  const selectRedFormation = document.getElementById('red-formation');

  // Edit Modal Elements
  const editModal = document.getElementById('edit-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalCancelBtn = document.getElementById('modal-cancel-btn');
  const modalSaveBtn = document.getElementById('modal-save-btn');
  const playerNameInput = document.getElementById('player-name-input');
  const playerNumberInput = document.getElementById('player-number-input');
  const playerRoleInput = document.getElementById('player-role-input');

  let activeEditingPlayer = null;

  // Formation Coordinate Templates
  const FORMATIONS = {
    '4-3-3': {
      blue: [
        { role: 'GK', x: 340, y: 880, isGK: true },
        { role: 'RB', x: 550, y: 760 },
        { role: 'RCB', x: 410, y: 780 },
        { role: 'LCB', x: 270, y: 780 },
        { role: 'LB', x: 130, y: 760 },
        { role: 'CDM', x: 340, y: 670 },
        { role: 'RCM', x: 450, y: 590 },
        { role: 'LCM', x: 230, y: 590 },
        { role: 'RW', x: 540, y: 510 },
        { role: 'ST', x: 340, y: 490 },
        { role: 'LW', x: 140, y: 510 }
      ],
      red: [
        { role: 'GK', x: 340, y: 80, isGK: true },
        { role: 'LB', x: 550, y: 200 },
        { role: 'LCB', x: 410, y: 180 },
        { role: 'RCB', x: 270, y: 180 },
        { role: 'RB', x: 130, y: 200 },
        { role: 'CDM', x: 340, y: 290 },
        { role: 'LCM', x: 450, y: 370 },
        { role: 'RCM', x: 230, y: 370 },
        { role: 'LW', x: 540, y: 450 },
        { role: 'ST', x: 340, y: 470 },
        { role: 'RW', x: 140, y: 450 }
      ]
    },
    '4-4-2': {
      blue: [
        { role: 'GK', x: 340, y: 880, isGK: true },
        { role: 'RB', x: 550, y: 760 },
        { role: 'RCB', x: 410, y: 780 },
        { role: 'LCB', x: 270, y: 780 },
        { role: 'LB', x: 130, y: 760 },
        { role: 'RM', x: 540, y: 620 },
        { role: 'RCM', x: 410, y: 630 },
        { role: 'LCM', x: 270, y: 630 },
        { role: 'LM', x: 140, y: 620 },
        { role: 'RST', x: 410, y: 500 },
        { role: 'LST', x: 270, y: 500 }
      ],
      red: [
        { role: 'GK', x: 340, y: 80, isGK: true },
        { role: 'LB', x: 550, y: 200 },
        { role: 'LCB', x: 410, y: 180 },
        { role: 'RCB', x: 270, y: 180 },
        { role: 'RB', x: 130, y: 200 },
        { role: 'LM', x: 540, y: 340 },
        { role: 'LCM', x: 410, y: 330 },
        { role: 'RCM', x: 270, y: 330 },
        { role: 'RM', x: 140, y: 340 },
        { role: 'LST', x: 410, y: 460 },
        { role: 'RST', x: 270, y: 460 }
      ]
    },
    '4-2-3-1': {
      blue: [
        { role: 'GK', x: 340, y: 880, isGK: true },
        { role: 'RB', x: 550, y: 760 },
        { role: 'RCB', x: 410, y: 780 },
        { role: 'LCB', x: 270, y: 780 },
        { role: 'LB', x: 130, y: 760 },
        { role: 'RDM', x: 420, y: 680 },
        { role: 'LDM', x: 260, y: 680 },
        { role: 'RAM', x: 520, y: 570 },
        { role: 'CAM', x: 340, y: 560 },
        { role: 'LAM', x: 160, y: 570 },
        { role: 'ST', x: 340, y: 490 }
      ],
      red: [
        { role: 'GK', x: 340, y: 80, isGK: true },
        { role: 'LB', x: 550, y: 200 },
        { role: 'LCB', x: 410, y: 180 },
        { role: 'RCB', x: 270, y: 180 },
        { role: 'RB', x: 130, y: 200 },
        { role: 'LDM', x: 420, y: 280 },
        { role: 'RDM', x: 260, y: 280 },
        { role: 'LAM', x: 520, y: 390 },
        { role: 'CAM', x: 340, y: 400 },
        { role: 'RAM', x: 160, y: 390 },
        { role: 'ST', x: 340, y: 470 }
      ]
    },
    '3-5-2': {
      blue: [
        { role: 'GK', x: 340, y: 880, isGK: true },
        { role: 'RCB', x: 460, y: 780 },
        { role: 'CB', x: 340, y: 790 },
        { role: 'LCB', x: 220, y: 780 },
        { role: 'RWB', x: 570, y: 640 },
        { role: 'RCM', x: 430, y: 620 },
        { role: 'CDM', x: 340, y: 680 },
        { role: 'LCM', x: 250, y: 620 },
        { role: 'LWB', x: 110, y: 640 },
        { role: 'RST', x: 400, y: 500 },
        { role: 'LST', x: 280, y: 500 }
      ],
      red: [
        { role: 'GK', x: 340, y: 80, isGK: true },
        { role: 'LCB', x: 460, y: 180 },
        { role: 'CB', x: 340, y: 170 },
        { role: 'RCB', x: 220, y: 180 },
        { role: 'LWB', x: 570, y: 320 },
        { role: 'LCM', x: 430, y: 340 },
        { role: 'CDM', x: 340, y: 280 },
        { role: 'RCM', x: 250, y: 340 },
        { role: 'RWB', x: 110, y: 320 },
        { role: 'LST', x: 400, y: 460 },
        { role: 'RST', x: 280, y: 460 }
      ]
    },
    '5-3-2': {
      blue: [
        { role: 'GK', x: 340, y: 880, isGK: true },
        { role: 'RWB', x: 570, y: 750 },
        { role: 'RCB', x: 460, y: 780 },
        { role: 'CB', x: 340, y: 790 },
        { role: 'LCB', x: 220, y: 780 },
        { role: 'LWB', x: 110, y: 750 },
        { role: 'RCM', x: 440, y: 640 },
        { role: 'CDM', x: 340, y: 670 },
        { role: 'LCM', x: 240, y: 640 },
        { role: 'RST', x: 400, y: 510 },
        { role: 'LST', x: 280, y: 510 }
      ],
      red: [
        { role: 'GK', x: 340, y: 80, isGK: true },
        { role: 'LWB', x: 570, y: 210 },
        { role: 'LCB', x: 460, y: 180 },
        { role: 'CB', x: 340, y: 170 },
        { role: 'RCB', x: 220, y: 180 },
        { role: 'RWB', x: 110, y: 210 },
        { role: 'LCM', x: 440, y: 320 },
        { role: 'CDM', x: 340, y: 290 },
        { role: 'RCM', x: 240, y: 320 },
        { role: 'LST', x: 400, y: 450 },
        { role: 'RST', x: 280, y: 450 }
      ]
    },
    '3-4-3': {
      blue: [
        { role: 'GK', x: 340, y: 880, isGK: true },
        { role: 'RCB', x: 460, y: 780 },
        { role: 'CB', x: 340, y: 790 },
        { role: 'LCB', x: 220, y: 780 },
        { role: 'RM', x: 560, y: 630 },
        { role: 'RCM', x: 410, y: 640 },
        { role: 'LCM', x: 270, y: 640 },
        { role: 'LM', x: 120, y: 630 },
        { role: 'RW', x: 530, y: 500 },
        { role: 'ST', x: 340, y: 480 },
        { role: 'LW', x: 150, y: 500 }
      ],
      red: [
        { role: 'GK', x: 340, y: 80, isGK: true },
        { role: 'LCB', x: 460, y: 180 },
        { role: 'CB', x: 340, y: 170 },
        { role: 'RCB', x: 220, y: 180 },
        { role: 'LM', x: 560, y: 330 },
        { role: 'LCM', x: 410, y: 320 },
        { role: 'RCM', x: 270, y: 320 },
        { role: 'RM', x: 120, y: 330 },
        { role: 'LW', x: 530, y: 460 },
        { role: 'ST', x: 340, y: 480 },
        { role: 'RW', x: 150, y: 460 }
      ]
    }
  };

  // Initialize Players (11 Blue, 11 Red)
  function initPlayers() {
    const blueTmpl = FORMATIONS['4-3-3'].blue;
    const redTmpl = FORMATIONS['4-2-3-1'].red;

    const blue = blueTmpl.map((slot, idx) => ({
      id: `b${idx + 1}`,
      team: 'blue',
      number: idx === 0 ? 1 : idx + 1,
      role: slot.role,
      name: '',
      x: slot.x,
      y: slot.y,
      isGK: !!slot.isGK
    }));

    const red = redTmpl.map((slot, idx) => ({
      id: `r${idx + 1}`,
      team: 'red',
      number: idx === 0 ? 1 : idx + 1,
      role: slot.role,
      name: '',
      x: slot.x,
      y: slot.y,
      isGK: !!slot.isGK
    }));

    return { blue, red };
  }

  let players = initPlayers();
  let ballPos = { x: 340, y: 480 };

  // Apply formation to a team (preserves names & numbers)
  function applyFormation(teamKey, formationName) {
    const tmpl = FORMATIONS[formationName] ? FORMATIONS[formationName][teamKey] : null;
    if (!tmpl) return;

    players[teamKey].forEach((player, idx) => {
      if (tmpl[idx]) {
        player.x = tmpl[idx].x;
        player.y = tmpl[idx].y;
        player.role = tmpl[idx].role;
        player.isGK = !!tmpl[idx].isGK;
      }
    });

    render();
  }

  // Render all players and the football
  function render() {
    playersLayer.innerHTML = '';

    // Render Blue Team
    players.blue.forEach(p => createPlayerChip(p, '#2563eb', '#eab308'));

    // Render Red Team
    players.red.forEach(p => createPlayerChip(p, '#dc2626', '#10b981'));

    // Position Football
    ballElement.setAttribute('transform', `translate(${ballPos.x}, ${ballPos.y})`);
  }

  // Create SVG elements for each chip
  function createPlayerChip(player, teamColor, gkColor) {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', 'chip');
    g.setAttribute('data-id', player.id);
    g.setAttribute('transform', `translate(${player.x}, ${player.y})`);
    g.setAttribute('filter', 'url(#chip-shadow)');

    // Jersey Circle
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('class', 'base-circle');
    circle.setAttribute('cx', '0');
    circle.setAttribute('cy', '0');
    circle.setAttribute('r', '16');
    circle.setAttribute('fill', player.isGK ? gkColor : teamColor);
    circle.setAttribute('stroke', '#ffffff');
    circle.setAttribute('stroke-width', '1.8');
    g.appendChild(circle);

    // Shirt Number
    const numText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    numText.setAttribute('x', '0');
    numText.setAttribute('y', '5');
    numText.setAttribute('text-anchor', 'middle');
    numText.setAttribute('fill', '#ffffff');
    numText.setAttribute('font-size', '13');
    numText.setAttribute('font-weight', '800');
    numText.style.pointerEvents = 'none';
    numText.textContent = player.number;
    g.appendChild(numText);

    // Position / Role Label underneath
    const roleText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    roleText.setAttribute('x', '0');
    roleText.setAttribute('y', '26');
    roleText.setAttribute('text-anchor', 'middle');
    roleText.setAttribute('fill', '#ffffff');
    roleText.setAttribute('font-size', '9.5');
    roleText.setAttribute('font-weight', '700');
    roleText.style.paintOrder = 'stroke';
    roleText.style.stroke = 'rgba(11, 15, 23, 0.9)';
    roleText.style.strokeWidth = '3px';
    roleText.style.pointerEvents = 'none';
    roleText.textContent = player.role;
    g.appendChild(roleText);

    // Player Custom Name (if provided)
    if (player.name && player.name.trim() !== '') {
      const nameText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      nameText.setAttribute('x', '0');
      nameText.setAttribute('y', '-22');
      nameText.setAttribute('text-anchor', 'middle');
      nameText.setAttribute('fill', '#ffffff');
      nameText.setAttribute('font-size', '10.5');
      nameText.setAttribute('font-weight', '700');
      nameText.style.paintOrder = 'stroke';
      nameText.style.stroke = 'rgba(11, 15, 23, 0.95)';
      nameText.style.strokeWidth = '3px';
      nameText.style.strokeLinejoin = 'round';
      nameText.style.pointerEvents = 'none';
      nameText.textContent = player.name;
      g.appendChild(nameText);
    }

    bindPlayerInteractions(g, player);
    playersLayer.appendChild(g);
  }

  // Convert mouse/touch event into SVG coordinate
  function getSvgCoords(e) {
    const pt = pitchSvg.createSVGPoint();
    const evt = (e.touches && e.touches[0]) ? e.touches[0] : e;
    pt.x = evt.clientX;
    pt.y = evt.clientY;
    return pt.matrixTransform(pitchSvg.getScreenCTM().inverse());
  }

  // Drag and click handling for player chips
  function bindPlayerInteractions(element, playerObj) {
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let hasMoved = false;

    const onStart = (e) => {
      e.stopPropagation();
      e.preventDefault();
      isDragging = true;
      hasMoved = false;
      const coords = getSvgCoords(e);
      startX = coords.x;
      startY = coords.y;
    };

    const onMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const coords = getSvgCoords(e);
      if (Math.hypot(coords.x - startX, coords.y - startY) > 3) {
        hasMoved = true;
      }
      const clampedX = Math.max(35, Math.min(645, Math.round(coords.x)));
      const clampedY = Math.max(35, Math.min(925, Math.round(coords.y)));
      playerObj.x = clampedX;
      playerObj.y = clampedY;
      element.setAttribute('transform', `translate(${clampedX}, ${clampedY})`);
    };

    const onEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      // If user clicked without dragging, open player edit modal
      if (!hasMoved) {
        openEditModal(playerObj);
      }
    };

    element.addEventListener('mousedown', onStart);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);

    element.addEventListener('touchstart', onStart, { passive: false });
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onEnd);
  }

  // Football Dragging
  let isBallDragging = false;
  const onBallStart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    isBallDragging = true;
  };
  const onBallMove = (e) => {
    if (!isBallDragging) return;
    e.preventDefault();
    const coords = getSvgCoords(e);
    const clampedX = Math.max(30, Math.min(650, Math.round(coords.x)));
    const clampedY = Math.max(20, Math.min(940, Math.round(coords.y)));
    ballPos.x = clampedX;
    ballPos.y = clampedY;
    ballElement.setAttribute('transform', `translate(${clampedX}, ${clampedY})`);
  };
  const onBallEnd = () => {
    isBallDragging = false;
  };

  ballElement.addEventListener('mousedown', onBallStart);
  window.addEventListener('mousemove', onBallMove);
  window.addEventListener('mouseup', onBallEnd);
  ballElement.addEventListener('touchstart', onBallStart, { passive: false });
  window.addEventListener('touchmove', onBallMove, { passive: false });
  window.addEventListener('touchend', onBallEnd);

  // Edit Player Modal
  function openEditModal(player) {
    activeEditingPlayer = player;
    modalTitle.textContent = `Edit Player #${player.number} (${player.team === 'blue' ? 'Blue Team' : 'Red Team'})`;
    playerNameInput.value = player.name || '';
    playerNumberInput.value = player.number;
    playerRoleInput.value = player.role || '';
    editModal.style.display = 'flex';
    setTimeout(() => playerNameInput.focus(), 50);
  }

  function closeEditModal() {
    editModal.style.display = 'none';
    activeEditingPlayer = null;
  }

  modalCloseBtn.addEventListener('click', closeEditModal);
  modalCancelBtn.addEventListener('click', closeEditModal);

  modalSaveBtn.addEventListener('click', () => {
    if (!activeEditingPlayer) return;
    activeEditingPlayer.name = playerNameInput.value.trim();
    const num = parseInt(playerNumberInput.value, 10);
    if (!isNaN(num) && num > 0) activeEditingPlayer.number = num;
    activeEditingPlayer.role = playerRoleInput.value.trim().toUpperCase() || activeEditingPlayer.role;
    render();
    closeEditModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeEditModal();
    if (e.key === 'Enter' && editModal.style.display === 'flex') {
      modalSaveBtn.click();
    }
  });

  // Formation Change Handlers
  selectBlueFormation.addEventListener('change', (e) => {
    applyFormation('blue', e.target.value);
  });

  selectRedFormation.addEventListener('change', (e) => {
    applyFormation('red', e.target.value);
  });

  // Reset Button Handler
  btnReset.addEventListener('click', () => {
    applyFormation('blue', selectBlueFormation.value);
    applyFormation('red', selectRedFormation.value);
    ballPos = { x: 340, y: 480 };
    render();
  });

  // Initial draw
  render();
});
