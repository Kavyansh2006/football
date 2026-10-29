/**
 * scenarios.js
 * 12 Predefined tactical scenarios with realistic player coordinates,
 * set piece role tags, strategic notes, and tactical drawings.
 */

const PRESET_SCENARIOS = {
  'build_up': {
    id: 'build_up',
    name: '1. Attacking from the Back',
    category: 'In Possession',
    description: 'Deep build-up phase. Goalkeeper acts as an auxiliary outfield distributor, center-backs split wide to the edges of the 18-yard box, fullbacks push high and wide, and single pivot drops into the pocket to create superior passing triangles against opponent high press.',
    tactics: {
      teamA: {
        mentality: 'Attacking',
        defensiveLine: 'Low',
        pressing: 'Medium',
        width: 'Wide',
        passing: 'Short',
        buildUp: 'Possession',
        defenseApproach: 'Mid Block'
      }
    },
    ball: { x: 45, y: 89 },
    // Custom positional adjustments for Team A (Bottom) and Team B (Top)
    positions: {
      teamA: [
        { id: 1, role: 'GK', number: 1, name: 'Goalkeeper', x: 50, y: 92, customRole: 'Sweeper Keeper' },
        { id: 2, role: 'RB', number: 2, name: 'Right Back', x: 92, y: 68, customRole: 'Wide Outlet' },
        { id: 3, role: 'RCB', number: 4, name: 'Right CB', x: 72, y: 86, customRole: 'Split CB' },
        { id: 4, role: 'LCB', number: 5, name: 'Left CB', x: 28, y: 86, customRole: 'Split CB' },
        { id: 5, role: 'LB', number: 3, name: 'Left Back', x: 8, y: 68, customRole: 'Wide Outlet' },
        { id: 6, role: 'CDM', number: 6, name: 'Pivot', x: 50, y: 77, customRole: 'Deep Pivot' },
        { id: 7, role: 'RCM', number: 8, name: 'Right 8', x: 70, y: 60, customRole: 'Free 8' },
        { id: 8, role: 'LCM', number: 10, name: 'Left 8', x: 30, y: 60, customRole: 'Free 8' },
        { id: 9, role: 'RW', number: 7, name: 'Right Winger', x: 86, y: 48, customRole: 'High Winger' },
        { id: 10, role: 'ST', number: 9, name: 'Striker', x: 50, y: 46, customRole: 'Pinning Forward' },
        { id: 11, role: 'LW', number: 11, name: 'Left Winger', x: 14, y: 48, customRole: 'High Winger' }
      ],
      teamB: [
        { id: 1, role: 'GK', number: 1, name: 'Goalkeeper', x: 50, y: 10 },
        { id: 2, role: 'LB', number: 3, name: 'Left Back', x: 88, y: 35 },
        { id: 3, role: 'LCB', number: 5, name: 'Left CB', x: 64, y: 32 },
        { id: 4, role: 'RCB', number: 4, name: 'Right CB', x: 36, y: 32 },
        { id: 5, role: 'RB', number: 2, name: 'Right Back', x: 12, y: 35 },
        { id: 6, role: 'LDM', number: 6, name: 'Holding Mid', x: 60, y: 45 },
        { id: 7, role: 'RDM', number: 8, name: 'Holding Mid', x: 40, y: 45 },
        { id: 8, role: 'LAM', number: 11, name: 'Pressing AM', x: 74, y: 58 },
        { id: 9, role: 'CAM', number: 10, name: 'Pressing CAM', x: 50, y: 65 },
        { id: 10, role: 'RAM', number: 7, name: 'Pressing AM', x: 26, y: 58 },
        { id: 11, role: 'ST', number: 9, name: 'Pressing ST', x: 45, y: 78 }
      ]
    },
    drawings: [
      { type: 'pass', from: { x: 50, y: 92 }, to: { x: 28, y: 86 }, color: '#38bdf8', label: 'Pass' },
      { type: 'arrow', from: { x: 28, y: 86 }, to: { x: 8, y: 70 }, color: '#34d399', label: 'Progress' },
      { type: 'run', from: { x: 50, y: 77 }, to: { x: 42, y: 74 }, color: '#fbbf24', label: 'Pivot Drop' }
    ]
  },

  'high_press': {
    id: 'high_press',
    name: '2. High Pressing Trap',
    category: 'Out of Possession',
    description: 'Aggressive front-foot pressing structure designed to lock the opponent build-up into the sideline trap, cutting off the central pivot and forcing rushed long balls or turnovers in high-value territory.',
    tactics: {
      teamA: {
        mentality: 'Attacking',
        defensiveLine: 'High',
        pressing: 'High',
        width: 'Narrow',
        passing: 'Mixed',
        buildUp: 'Direct Play',
        defenseApproach: 'High Press'
      }
    },
    ball: { x: 28, y: 22 },
    positions: {
      teamB: [
        { id: 1, role: 'GK', number: 1, name: 'Goalkeeper', x: 50, y: 10 },
        { id: 2, role: 'LB', number: 3, name: 'Left Back', x: 86, y: 25 },
        { id: 3, role: 'LCB', number: 5, name: 'Left CB', x: 62, y: 20 },
        { id: 4, role: 'RCB', number: 4, name: 'Right CB', x: 28, y: 22 },
        { id: 5, role: 'RB', number: 2, name: 'Right Back', x: 12, y: 26 },
        { id: 6, role: 'CDM', number: 6, name: 'Pivot', x: 48, y: 32 }
      ],
      teamA: [
        { id: 10, role: 'ST', number: 9, name: 'Striker', x: 36, y: 24, customRole: 'Curved Press' },
        { id: 11, role: 'LW', number: 11, name: 'Left Winger', x: 20, y: 28, customRole: 'Sideline Trap' },
        { id: 8, role: 'LCM', number: 10, name: 'Left 8', x: 45, y: 33, customRole: 'Shadow Pivot' },
        { id: 7, role: 'RCM', number: 8, name: 'Right 8', x: 60, y: 36, customRole: 'Pressing Cover' },
        { id: 9, role: 'RW', number: 7, name: 'Right Winger', x: 74, y: 34, customRole: 'Weak Side Cover' },
        { id: 6, role: 'CDM', number: 6, name: 'Holding Mid', x: 50, y: 48, customRole: 'Second Ball Sweeper' },
        { id: 5, role: 'LB', number: 3, name: 'Left Back', x: 16, y: 46, customRole: 'High Line' },
        { id: 4, role: 'LCB', number: 5, name: 'Left CB', x: 38, y: 52, customRole: 'Covering CB' },
        { id: 3, role: 'RCB', number: 4, name: 'Right CB', x: 62, y: 52, customRole: 'Covering CB' },
        { id: 2, role: 'RB', number: 2, name: 'Right Back', x: 84, y: 46, customRole: 'High Line' },
        { id: 1, role: 'GK', number: 1, name: 'Goalkeeper', x: 50, y: 76, customRole: 'Sweeper Keeper' }
      ]
    },
    drawings: [
      { type: 'curved', from: { x: 44, y: 30 }, to: { x: 30, y: 22 }, control: { x: 38, y: 28 }, color: '#ef4444', label: 'Curve Run' },
      { type: 'trigger', center: { x: 28, y: 22 }, radius: 35, color: '#f59e0b', label: 'Pressing Trigger' },
      { type: 'defensive_line', from: { x: 12, y: 50 }, to: { x: 88, y: 50 }, color: '#e11d48', label: 'High Offside Line' }
    ]
  },

  'low_block': {
    id: 'low_block',
    name: '3. Low Defensive Block',
    category: 'Out of Possession',
    description: 'Compact 5-4-1 / 4-5-1 bunker defending inside the defensive third. Distance between backline and midfield is strictly 10-12 meters, denying all space in the penalty box and forcing shots from low xG zones outside the area.',
    tactics: {
      teamA: {
        mentality: 'Defensive',
        defensiveLine: 'Low',
        pressing: 'Low',
        width: 'Narrow',
        passing: 'Direct',
        buildUp: 'Counter-Attack',
        defenseApproach: 'Low Block'
      }
    },
    ball: { x: 50, y: 62 },
    positions: {
      teamA: [
        { id: 1, role: 'GK', number: 1, name: 'Goalkeeper', x: 50, y: 93 },
        { id: 2, role: 'RB', number: 2, name: 'Right Back', x: 80, y: 83 },
        { id: 3, role: 'RCB', number: 4, name: 'Right CB', x: 60, y: 85 },
        { id: 4, role: 'LCB', number: 5, name: 'Left CB', x: 40, y: 85 },
        { id: 5, role: 'LB', number: 3, name: 'Left Back', x: 20, y: 83 },
        { id: 6, role: 'RM', number: 7, name: 'Right Mid', x: 76, y: 74 },
        { id: 7, role: 'RCM', number: 8, name: 'Center Mid', x: 58, y: 75 },
        { id: 8, role: 'LCM', number: 6, name: 'Center Mid', x: 42, y: 75 },
        { id: 9, role: 'LM', number: 11, name: 'Left Mid', x: 24, y: 74 },
        { id: 10, role: 'CAM', number: 10, name: 'Shuttler', x: 50, y: 67 },
        { id: 11, role: 'ST', number: 9, name: 'Outlet', x: 50, y: 55, customRole: 'Target Outlet' }
      ]
    },
    drawings: [
      { type: 'zone', points: [{ x: 16, y: 72 }, { x: 84, y: 72 }, { x: 84, y: 88 }, { x: 16, y: 88 }], color: 'rgba(59, 130, 246, 0.25)', label: 'Compact Box' },
      { type: 'defensive_line', from: { x: 14, y: 84 }, to: { x: 86, y: 84 }, color: '#3b82f6', label: '18m Defensive Bank' }
    ]
  },

  'counter_attack': {
    id: 'counter_attack',
    name: '4. Lethal Counter-Attack',
    category: 'Transitions',
    description: 'Rapid vertical transition following a turnover inside the defensive half. The ball winner immediately releases a penetrative vertical pass to a sprinting wide forward, while the striker makes an unselfish diagonal decoy run.',
    ball: { x: 44, y: 68 },
    positions: {
      teamA: [
        { id: 6, role: 'CDM', number: 6, name: 'Ball Winner', x: 44, y: 68 },
        { id: 11, role: 'LW', number: 11, name: 'Sprinter', x: 18, y: 46, customRole: 'Breakaway' },
        { id: 10, role: 'ST', number: 9, name: 'Striker', x: 52, y: 40, customRole: 'Diagonal Run' },
        { id: 9, role: 'RW', number: 7, name: 'Winger', x: 82, y: 45, customRole: 'Back-Post Sprint' },
        { id: 8, role: 'CAM', number: 10, name: 'Runner', x: 48, y: 56, customRole: 'Trailer' }
      ]
    },
    drawings: [
      { type: 'pass', from: { x: 44, y: 68 }, to: { x: 20, y: 42 }, color: '#38bdf8', label: 'Through Ball' },
      { type: 'run', from: { x: 18, y: 46 }, to: { x: 20, y: 28 }, color: '#fbbf24', label: 'Sprint' },
      { type: 'curved', from: { x: 52, y: 40 }, to: { x: 62, y: 24 }, control: { x: 60, y: 32 }, color: '#f97316', label: 'Decoy Run' }
    ]
  },

  'defending_corner': {
    id: 'defending_corner',
    name: '5. Defending a Corner Kick',
    category: 'Set Pieces',
    description: 'Hybrid zonal-man marking setup inside the 6-yard and 18-yard box. Three dominant aerial zonal headers along the 6-yard line, four dedicated man-markers, one short corner blocker, one edge-of-box sweeper, and one pacey outlet forward on the halfway line.',
    ball: { x: 4, y: 96 },
    positions: {
      teamA: [
        { id: 1, role: 'GK', number: 1, name: 'Keeper', x: 48, y: 94, customRole: 'Goalkeeper Command' },
        { id: 4, role: 'LCB', number: 5, name: 'Near Zonal', x: 36, y: 91, customRole: 'Near Post Zonal Header' },
        { id: 3, role: 'RCB', number: 4, name: 'Central Zonal', x: 48, y: 90, customRole: 'Center Zonal Header' },
        { id: 2, role: 'RB', number: 2, name: 'Far Zonal', x: 62, y: 91, customRole: 'Far Post Zonal Header' },
        { id: 5, role: 'LB', number: 3, name: 'Near Post Guard', x: 30, y: 95, customRole: 'Near Post Post Guard' },
        { id: 6, role: 'CDM', number: 6, name: 'Man Marker 1', x: 42, y: 86, customRole: 'Man Marker' },
        { id: 7, role: 'RCM', number: 8, name: 'Man Marker 2', x: 54, y: 86, customRole: 'Man Marker' },
        { id: 8, role: 'LCM', number: 10, name: 'Man Marker 3', x: 46, y: 82, customRole: 'Man Marker' },
        { id: 9, role: 'RM', number: 7, name: 'Short Blocker', x: 14, y: 90, customRole: 'Short Corner Blocker' },
        { id: 10, role: 'CAM', number: 12, name: 'Edge Sweeper', x: 50, y: 77, customRole: 'Edge-of-Box Sweeper' },
        { id: 11, role: 'ST', number: 9, name: 'Counter Outlet', x: 35, y: 55, customRole: 'Halfway Line Outlet' }
      ]
    },
    drawings: [
      { type: 'zone', points: [{ x: 28, y: 88 }, { x: 72, y: 88 }, { x: 72, y: 95 }, { x: 28, y: 95 }], color: 'rgba(239, 68, 68, 0.28)', label: 'Zonal Protection Box' },
      { type: 'arrow', from: { x: 14, y: 90 }, to: { x: 8, y: 94 }, color: '#f59e0b', label: 'Close Down Angle' }
    ]
  },

  'attacking_corner': {
    id: 'attacking_corner',
    name: '6. Attacking an Inswinging Corner',
    category: 'Set Pieces',
    description: 'Inswinging delivery whipped towards the near post. Features a cluster on the penalty spot that breaks in coordinated waves: near-post flick run, far-post powerhouse runner, edge-of-box volley specialist, and short corner distraction option.',
    ball: { x: 96, y: 4 },
    positions: {
      teamA: [
        { id: 11, role: 'LW', number: 11, name: 'Taker', x: 96, y: 4, customRole: 'Corner Taker' },
        { id: 7, role: 'RW', number: 7, name: 'Short Option', x: 86, y: 12, customRole: 'Short-Corner Option' },
        { id: 10, role: 'ST', number: 9, name: 'Near Runner', x: 52, y: 16, customRole: 'Near-Post Runner' },
        { id: 3, role: 'RCB', number: 4, name: 'Far Target', x: 58, y: 18, customRole: 'Far-Post Target' },
        { id: 4, role: 'LCB', number: 5, name: 'Center Crash', x: 48, y: 19, customRole: 'Penalty Spot Target' },
        { id: 8, role: 'RCM', number: 8, name: 'Screen/Block', x: 44, y: 12, customRole: 'Keeper Screen / Blocker' },
        { id: 9, role: 'CAM', number: 10, name: 'Edge Striker', x: 50, y: 28, customRole: 'Edge-of-Box Volleyer' },
        { id: 6, role: 'CDM', number: 6, name: 'Rest Defense', x: 42, y: 38, customRole: 'Rest Defense Anchor' },
        { id: 2, role: 'RB', number: 2, name: 'Safety Cover', x: 68, y: 42, customRole: 'Rest Defense Cover' },
        { id: 5, role: 'LB', number: 3, name: 'Safety Cover', x: 26, y: 42, customRole: 'Rest Defense Cover' },
        { id: 1, role: 'GK', number: 1, name: 'Keeper', x: 50, y: 78, customRole: 'Sweeper Keeper' }
      ]
    },
    drawings: [
      { type: 'curved', from: { x: 96, y: 4 }, to: { x: 42, y: 9 }, control: { x: 74, y: 14 }, color: '#38bdf8', label: 'Inswinging Whip' },
      { type: 'run', from: { x: 52, y: 16 }, to: { x: 40, y: 8 }, color: '#f59e0b', label: 'Near Post Dash' },
      { type: 'run', from: { x: 58, y: 18 }, to: { x: 58, y: 8 }, color: '#ec4899', label: 'Far Post Attack' }
    ]
  },

  'defending_freekick': {
    id: 'defending_freekick',
    name: '7. Defending a Central Free Kick',
    category: 'Set Pieces',
    description: 'Set-piece defense 22 yards out. 4-man compact wall positioned to protect the near post, goalkeeper covering the far half of the net, 2 perimeter runners tracking wall spill-overs, and a deep defensive line ready to sweep.',
    ball: { x: 46, y: 76 },
    positions: {
      teamA: [
        { id: 1, role: 'GK', number: 1, name: 'Goalkeeper', x: 58, y: 93, customRole: 'Far Post Position' },
        { id: 2, role: 'RB', number: 2, name: 'Wall 1', x: 40, y: 83, customRole: '4-Man Wall' },
        { id: 3, role: 'RCB', number: 4, name: 'Wall 2', x: 44, y: 83, customRole: '4-Man Wall' },
        { id: 4, role: 'LCB', number: 5, name: 'Wall 3', x: 48, y: 83, customRole: '4-Man Wall' },
        { id: 5, role: 'LB', number: 3, name: 'Wall 4', x: 52, y: 83, customRole: '4-Man Wall' },
        { id: 6, role: 'CDM', number: 6, name: 'Draft Excluder', x: 46, y: 85, customRole: 'Under-Wall Prone Block' },
        { id: 7, role: 'RCM', number: 8, name: 'Rebound Tracker', x: 64, y: 82, customRole: 'Rebound Runner' },
        { id: 8, role: 'LCM', number: 10, name: 'Rebound Tracker', x: 28, y: 82, customRole: 'Rebound Runner' }
      ]
    },
    drawings: [
      { type: 'defensive_line', from: { x: 38, y: 83 }, to: { x: 54, y: 83 }, color: '#38bdf8', label: 'Solid 4-Man Wall' }
    ]
  },

  'attacking_freekick': {
    id: 'attacking_freekick',
    name: '8. Attacking a Lateral Free Kick',
    category: 'Set Pieces',
    description: 'Dangerous set piece from the flank. Ball whipped between the six-yard line and penalty spot with attackers making dynamic staggered runs to avoid the offside trap.',
    ball: { x: 18, y: 30 },
    positions: {
      teamA: [
        { id: 8, role: 'LCM', number: 10, name: 'Free Kick Taker', x: 18, y: 30, customRole: 'Taker' },
        { id: 10, role: 'ST', number: 9, name: 'Primary Target', x: 44, y: 22, customRole: 'Near Post Header' },
        { id: 3, role: 'RCB', number: 4, name: 'Tall CB', x: 52, y: 24, customRole: 'Far Post Header' },
        { id: 4, role: 'LCB', number: 5, name: 'Target CB', x: 48, y: 25, customRole: 'Penalty Spot Target' },
        { id: 9, role: 'RW', number: 7, name: 'Rebounder', x: 56, y: 30, customRole: 'Edge-of-Box Volleyer' }
      ]
    },
    drawings: [
      { type: 'curved', from: { x: 18, y: 30 }, to: { x: 46, y: 14 }, control: { x: 28, y: 20 }, color: '#38bdf8', label: 'Whipped Cross' },
      { type: 'run', from: { x: 44, y: 22 }, to: { x: 42, y: 12 }, color: '#eab308', label: 'Penetrative Run' }
    ]
  },

  'defending_lead': {
    id: 'defending_lead',
    name: '9. Defending a Lead in Final Minutes',
    category: 'Game Management',
    description: 'Late game 5-4-1 deep defensive consolidation. Fullbacks tuck inside, midfielders hold the edge of the D, time management in corner quadrants, zero risk taking in transition.',
    tactics: {
      teamA: {
        mentality: 'Defensive',
        defensiveLine: 'Low',
        pressing: 'Low',
        width: 'Narrow',
        passing: 'Direct',
        buildUp: 'Possession',
        defenseApproach: 'Low Block'
      }
    },
    ball: { x: 88, y: 78 },
    positions: {
      teamA: [
        { id: 1, role: 'GK', number: 1, name: 'Goalkeeper', x: 50, y: 94 },
        { id: 2, role: 'RB', number: 2, name: 'Full Back', x: 88, y: 85 },
        { id: 3, role: 'RCB', number: 4, name: 'Right CB', x: 68, y: 87 },
        { id: 4, role: 'CB', number: 12, name: 'Central Sweeper', x: 50, y: 88 },
        { id: 5, role: 'LCB', number: 5, name: 'Left CB', x: 32, y: 87 },
        { id: 6, role: 'LB', number: 3, name: 'Full Back', x: 12, y: 85 },
        { id: 7, role: 'RM', number: 7, name: 'Right Mid', x: 82, y: 76 },
        { id: 8, role: 'RCM', number: 8, name: 'Center Mid', x: 62, y: 76 },
        { id: 9, role: 'LCM', number: 6, name: 'Center Mid', x: 38, y: 76 },
        { id: 10, role: 'LM', number: 11, name: 'Left Mid', x: 18, y: 76 },
        { id: 11, role: 'ST', number: 9, name: 'Corner Flagger', x: 78, y: 62, customRole: 'Corner Flag Hold-Up' }
      ]
    },
    drawings: [
      { type: 'zone', points: [{ x: 8, y: 72 }, { x: 92, y: 72 }, { x: 92, y: 90 }, { x: 8, y: 90 }], color: 'rgba(34, 197, 94, 0.22)', label: 'Denial Zone' }
    ]
  },

  'chasing_goal': {
    id: 'chasing_goal',
    name: '10. Chasing a Goal Late in the Match',
    category: 'Game Management',
    description: 'All-out attack 2-3-5 / 3-1-6 overload. Both fullbacks play as inverted attacking midfielders, two center-backs push to the halfway line, and 5 players flood the opponent penalty area for crosses and second balls.',
    tactics: {
      teamA: {
        mentality: 'Attacking',
        defensiveLine: 'High',
        pressing: 'High',
        width: 'Wide',
        passing: 'Direct',
        buildUp: 'Direct Play',
        defenseApproach: 'High Press'
      }
    },
    ball: { x: 82, y: 32 },
    positions: {
      teamA: [
        { id: 1, role: 'GK', number: 1, name: 'Goalkeeper', x: 50, y: 68, customRole: 'Halfway Sweeper' },
        { id: 3, role: 'RCB', number: 4, name: 'CB', x: 62, y: 55 },
        { id: 4, role: 'LCB', number: 5, name: 'CB', x: 38, y: 55 },
        { id: 6, role: 'CDM', number: 6, name: 'Anchor', x: 50, y: 46 },
        { id: 2, role: 'RB', number: 2, name: 'Inverted FB', x: 68, y: 40 },
        { id: 5, role: 'LB', number: 3, name: 'Inverted FB', x: 32, y: 40 },
        { id: 9, role: 'RW', number: 7, name: 'Right Wing', x: 90, y: 26 },
        { id: 7, role: 'RCM', number: 8, name: 'Box Crasher', x: 64, y: 22 },
        { id: 10, role: 'ST', number: 9, name: 'Target 9', x: 50, y: 18 },
        { id: 8, role: 'LCM', number: 10, name: 'Auxiliary 9', x: 36, y: 22 },
        { id: 11, role: 'LW', number: 11, name: 'Left Wing', x: 10, y: 26 }
      ]
    },
    drawings: [
      { type: 'arrow', from: { x: 90, y: 26 }, to: { x: 52, y: 16 }, color: '#38bdf8', label: 'Driven Cross' },
      { type: 'run', from: { x: 64, y: 22 }, to: { x: 54, y: 14 }, color: '#f59e0b', label: 'Crash Near Post' },
      { type: 'run', from: { x: 36, y: 22 }, to: { x: 46, y: 14 }, color: '#ec4899', label: 'Crash Far Post' }
    ]
  },

  'wing_overload': {
    id: 'wing_overload',
    name: '11. Building an Overload on the Wings',
    category: 'Positional Play',
    description: '3v2 / 4v3 local overload on the right flank involving right-back, right central midfielder, right winger, and dropping striker. Attracts the opponent block to shift, creating isolated 1v1 weak-side switch for the opposite winger.',
    ball: { x: 82, y: 42 },
    positions: {
      teamA: [
        { id: 2, role: 'RB', number: 2, name: 'Overlapping FB', x: 88, y: 46, customRole: 'Overlap' },
        { id: 9, role: 'RW', number: 7, name: 'Inside Winger', x: 74, y: 38, customRole: 'Half-Space Hub' },
        { id: 7, role: 'RCM', number: 8, name: 'Supporting 8', x: 66, y: 46, customRole: 'Base of Triangle' },
        { id: 10, role: 'ST', number: 9, name: 'Link Striker', x: 58, y: 32, customRole: 'Wall Pass' },
        { id: 11, role: 'LW', number: 11, name: 'Weak-Side Winger', x: 12, y: 36, customRole: 'Isolated 1v1 Outlet' }
      ]
    },
    drawings: [
      { type: 'zone', points: [{ x: 56, y: 30 }, { x: 94, y: 30 }, { x: 94, y: 55 }, { x: 56, y: 55 }], color: 'rgba(234, 179, 8, 0.25)', label: '4v3 Overload Zone' },
      { type: 'curved', from: { x: 66, y: 46 }, to: { x: 12, y: 36 }, control: { x: 38, y: 24 }, color: '#38bdf8', label: 'Diagonal Switch to Isolated Winger' }
    ]
  },

  'breaking_compact': {
    id: 'breaking_compact',
    name: '12. Breaking Down a Compact Defense',
    category: 'In Possession',
    description: 'Positional play third-man combinations to pierce a stubborn low block. Quick one-touch pass into the feet of the striker who sets it back to the arriving attacking midfielder, finding the blindside runner behind the center-back.',
    ball: { x: 42, y: 45 },
    positions: {
      teamA: [
        { id: 8, role: 'LCM', number: 10, name: 'First Man (Passer)', x: 42, y: 45 },
        { id: 10, role: 'ST', number: 9, name: 'Second Man (Target)', x: 50, y: 32 },
        { id: 7, role: 'RCM', number: 8, name: 'Third Man (Runner)', x: 62, y: 42 },
        { id: 9, role: 'RW', number: 7, name: 'Wide Pin', x: 86, y: 28 },
        { id: 11, role: 'LW', number: 11, name: 'Wide Pin', x: 14, y: 28 }
      ]
    },
    drawings: [
      { type: 'pass', from: { x: 42, y: 45 }, to: { x: 50, y: 32 }, color: '#38bdf8', label: '1st Pass to Feet' },
      { type: 'pass', from: { x: 50, y: 32 }, to: { x: 56, y: 38 }, color: '#34d399', label: '2nd Set Back' },
      { type: 'run', from: { x: 62, y: 42 }, to: { x: 56, y: 22 }, color: '#f59e0b', label: '3rd Man Blindside Run' }
    ]
  }
};

window.PRESET_SCENARIOS = PRESET_SCENARIOS;
