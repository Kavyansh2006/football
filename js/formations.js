/**
 * formations.js
 * Comprehensive tactical formation definitions and analysis for Football Tactical Board.
 * Coordinates are normalized: x: 0 (left touchline) to 100 (right touchline),
 * y: 0 (top goal line) to 100 (bottom goal line).
 */

const FORMATION_DEFINITIONS = {
  '4-3-3': {
    name: '4-3-3 Attack',
    category: 'Four at the Back',
    defendersCount: 4,
    midfieldersCount: 3,
    forwardsCount: 3,
    description: 'Classic attacking formation offering natural passing triangles, wide wingers stretching the pitch, and high pressing potential with a balanced three-man midfield.',
    pros: ['Excellent pitch width and diagonal passing angles', 'Fluid transitions and strong high-press triggers', 'Isolates fullbacks in 1v1 wing duels'],
    cons: ['Single pivot can be isolated in defensive transitions', 'Vulnerable to central counter-attacks if wingers do not track back'],
    // Team A (Defending bottom, attacking top)
    bottom: [
      { id: 1, role: 'GK', number: 1, name: 'Goalkeeper', x: 50, y: 94, isGK: true },
      { id: 2, role: 'RB', number: 2, name: 'Right Back', x: 86, y: 80 },
      { id: 3, role: 'RCB', number: 4, name: 'Right Center Back', x: 62, y: 82 },
      { id: 4, role: 'LCB', number: 5, name: 'Left Center Back', x: 38, y: 82 },
      { id: 5, role: 'LB', number: 3, name: 'Left Back', x: 14, y: 80 },
      { id: 6, role: 'CDM', number: 6, name: 'Defensive Mid', x: 50, y: 70 },
      { id: 7, role: 'RCM', number: 8, name: 'Right Center Mid', x: 68, y: 62 },
      { id: 8, role: 'LCM', number: 10, name: 'Left Center Mid', x: 32, y: 62 },
      { id: 9, role: 'RW', number: 7, name: 'Right Winger', x: 84, y: 53 },
      { id: 10, role: 'ST', number: 9, name: 'Striker', x: 50, y: 50 },
      { id: 11, role: 'LW', number: 11, name: 'Left Winger', x: 16, y: 53 }
    ],
    // Team B (Defending top, attacking bottom)
    top: [
      { id: 1, role: 'GK', number: 1, name: 'Goalkeeper', x: 50, y: 6, isGK: true },
      { id: 2, role: 'LB', number: 3, name: 'Left Back', x: 86, y: 20 },
      { id: 3, role: 'LCB', number: 5, name: 'Left Center Back', x: 62, y: 18 },
      { id: 4, role: 'RCB', number: 4, name: 'Right Center Back', x: 38, y: 18 },
      { id: 5, role: 'RB', number: 2, name: 'Right Back', x: 14, y: 20 },
      { id: 6, role: 'CDM', number: 6, name: 'Defensive Mid', x: 50, y: 30 },
      { id: 7, role: 'LCM', number: 10, name: 'Left Center Mid', x: 68, y: 38 },
      { id: 8, role: 'RCM', number: 8, name: 'Right Center Mid', x: 32, y: 38 },
      { id: 9, role: 'LW', number: 11, name: 'Left Winger', x: 84, y: 47 },
      { id: 10, role: 'ST', number: 9, name: 'Striker', x: 50, y: 50 },
      { id: 11, role: 'RW', number: 7, name: 'Right Winger', x: 16, y: 47 }
    ]
  },

  '4-4-2': {
    name: '4-4-2 Classic',
    category: 'Four at the Back',
    defendersCount: 4,
    midfieldersCount: 4,
    forwardsCount: 2,
    description: 'The quintessential balanced system. Two banks of four provide solid defensive compactness and direct vertical threat through two central strikers.',
    pros: ['Very compact defensive block with small spaces between lines', 'Two strikers occupy opponent center backs directly', 'Straightforward player roles and coverage'],
    cons: ['Midfield can be outnumbered against 3-man midfield systems', 'Less natural central creation between the lines'],
    bottom: [
      { id: 1, role: 'GK', number: 1, name: 'Goalkeeper', x: 50, y: 94, isGK: true },
      { id: 2, role: 'RB', number: 2, name: 'Right Back', x: 86, y: 81 },
      { id: 3, role: 'RCB', number: 4, name: 'Right Center Back', x: 62, y: 82 },
      { id: 4, role: 'LCB', number: 5, name: 'Left Center Back', x: 38, y: 82 },
      { id: 5, role: 'LB', number: 3, name: 'Left Back', x: 14, y: 81 },
      { id: 6, role: 'RM', number: 7, name: 'Right Midfielder', x: 84, y: 65 },
      { id: 7, role: 'RCM', number: 8, name: 'Central Midfielder', x: 62, y: 66 },
      { id: 8, role: 'LCM', number: 6, name: 'Central Midfielder', x: 38, y: 66 },
      { id: 9, role: 'LM', number: 11, name: 'Left Midfielder', x: 16, y: 65 },
      { id: 10, role: 'RST', number: 9, name: 'Right Striker', x: 60, y: 51 },
      { id: 11, role: 'LST', number: 10, name: 'Left Striker', x: 40, y: 51 }
    ],
    top: [
      { id: 1, role: 'GK', number: 1, name: 'Goalkeeper', x: 50, y: 6, isGK: true },
      { id: 2, role: 'LB', number: 3, name: 'Left Back', x: 86, y: 19 },
      { id: 3, role: 'LCB', number: 5, name: 'Left Center Back', x: 62, y: 18 },
      { id: 4, role: 'RCB', number: 4, name: 'Right Center Back', x: 38, y: 18 },
      { id: 5, role: 'RB', number: 2, name: 'Right Back', x: 14, y: 19 },
      { id: 6, role: 'LM', number: 11, name: 'Left Midfielder', x: 84, y: 35 },
      { id: 7, role: 'LCM', number: 6, name: 'Central Midfielder', x: 62, y: 34 },
      { id: 8, role: 'RCM', number: 8, name: 'Central Midfielder', x: 38, y: 34 },
      { id: 9, role: 'RM', number: 7, name: 'Right Midfielder', x: 16, y: 35 },
      { id: 10, role: 'LST', number: 10, name: 'Left Striker', x: 60, y: 49 },
      { id: 11, role: 'RST', number: 9, name: 'Right Striker', x: 40, y: 49 }
    ]
  },

  '4-2-3-1': {
    name: '4-2-3-1 Modern',
    category: 'Four at the Back',
    defendersCount: 4,
    midfieldersCount: 5,
    forwardsCount: 1,
    description: 'One of the most versatile modern tactical systems. The double pivot shields the back line while granting the attacking trio freedom to exploit half-spaces.',
    pros: ['Superb defensive solidity through the double pivot', 'Strong presence in the central pocket behind the striker', 'Flexible transitions into 4-4-2 or 4-3-3'],
    cons: ['Lone striker can become isolated if attacking midfielders fail to push up', 'Demands high work rate from wide attacking midfielders'],
    bottom: [
      { id: 1, role: 'GK', number: 1, name: 'Goalkeeper', x: 50, y: 94, isGK: true },
      { id: 2, role: 'RB', number: 2, name: 'Right Back', x: 86, y: 81 },
      { id: 3, role: 'RCB', number: 4, name: 'Right Center Back', x: 62, y: 83 },
      { id: 4, role: 'LCB', number: 5, name: 'Left Center Back', x: 38, y: 83 },
      { id: 5, role: 'LB', number: 3, name: 'Left Back', x: 14, y: 81 },
      { id: 6, role: 'RDM', number: 8, name: 'Right Defensive Mid', x: 62, y: 72 },
      { id: 7, role: 'LDM', number: 6, name: 'Left Defensive Mid', x: 38, y: 72 },
      { id: 8, role: 'RAM', number: 7, name: 'Right Attacking Mid', x: 80, y: 60 },
      { id: 9, role: 'CAM', number: 10, name: 'Central Attacking Mid', x: 50, y: 59 },
      { id: 10, role: 'LAM', number: 11, name: 'Left Attacking Mid', x: 20, y: 60 },
      { id: 11, role: 'ST', number: 9, name: 'Striker', x: 50, y: 50 }
    ],
    top: [
      { id: 1, role: 'GK', number: 1, name: 'Goalkeeper', x: 50, y: 6, isGK: true },
      { id: 2, role: 'LB', number: 3, name: 'Left Back', x: 86, y: 19 },
      { id: 3, role: 'LCB', number: 5, name: 'Left Center Back', x: 62, y: 17 },
      { id: 4, role: 'RCB', number: 4, name: 'Right Center Back', x: 38, y: 17 },
      { id: 5, role: 'RB', number: 2, name: 'Right Back', x: 14, y: 19 },
      { id: 6, role: 'LDM', number: 6, name: 'Left Defensive Mid', x: 62, y: 28 },
      { id: 7, role: 'RDM', number: 8, name: 'Right Defensive Mid', x: 38, y: 28 },
      { id: 8, role: 'LAM', number: 11, name: 'Left Attacking Mid', x: 80, y: 40 },
      { id: 9, role: 'CAM', number: 10, name: 'Central Attacking Mid', x: 50, y: 41 },
      { id: 10, role: 'RAM', number: 7, name: 'Right Attacking Mid', x: 20, y: 40 },
      { id: 11, role: 'ST', number: 9, name: 'Striker', x: 50, y: 50 }
    ]
  },

  '4-1-4-1': {
    name: '4-1-4-1 Controlled',
    category: 'Four at the Back',
    defendersCount: 4,
    midfieldersCount: 5,
    forwardsCount: 1,
    description: 'Focuses on maintaining midfield density and suffocating central passing channels, utilizing an anchor defensive midfielder behind a high line of four.',
    pros: ['Very hard to play through centrally', 'High pressing platform with four advanced midfielders', 'Anchor sweeps up loose clearances'],
    cons: ['Striker needs elite aerial and hold-up play', 'Gaps between the anchor and the forward line if not disciplined'],
    bottom: [
      { id: 1, role: 'GK', number: 1, name: 'Goalkeeper', x: 50, y: 94, isGK: true },
      { id: 2, role: 'RB', number: 2, name: 'Right Back', x: 86, y: 81 },
      { id: 3, role: 'RCB', number: 4, name: 'Right Center Back', x: 62, y: 83 },
      { id: 4, role: 'LCB', number: 5, name: 'Left Center Back', x: 38, y: 83 },
      { id: 5, role: 'LB', number: 3, name: 'Left Back', x: 14, y: 81 },
      { id: 6, role: 'CDM', number: 6, name: 'Defensive Anchor', x: 50, y: 73 },
      { id: 7, role: 'RM', number: 7, name: 'Right Midfielder', x: 84, y: 61 },
      { id: 8, role: 'RCM', number: 8, name: 'Right Central Mid', x: 62, y: 62 },
      { id: 9, role: 'LCM', number: 10, name: 'Left Central Mid', x: 38, y: 62 },
      { id: 10, role: 'LM', number: 11, name: 'Left Midfielder', x: 16, y: 61 },
      { id: 11, role: 'ST', number: 9, name: 'Target Forward', x: 50, y: 50 }
    ],
    top: [
      { id: 1, role: 'GK', number: 1, name: 'Goalkeeper', x: 50, y: 6, isGK: true },
      { id: 2, role: 'LB', number: 3, name: 'Left Back', x: 86, y: 19 },
      { id: 3, role: 'LCB', number: 5, name: 'Left Center Back', x: 62, y: 17 },
      { id: 4, role: 'RCB', number: 4, name: 'Right Center Back', x: 38, y: 17 },
      { id: 5, role: 'RB', number: 2, name: 'Right Back', x: 14, y: 19 },
      { id: 6, role: 'CDM', number: 6, name: 'Defensive Anchor', x: 50, y: 27 },
      { id: 7, role: 'LM', number: 11, name: 'Left Midfielder', x: 84, y: 39 },
      { id: 8, role: 'LCM', number: 10, name: 'Left Central Mid', x: 62, y: 38 },
      { id: 9, role: 'RCM', number: 8, name: 'Right Central Mid', x: 38, y: 38 },
      { id: 10, role: 'RM', number: 7, name: 'Right Midfielder', x: 16, y: 39 },
      { id: 11, role: 'ST', number: 9, name: 'Target Forward', x: 50, y: 50 }
    ]
  },

  '3-5-2': {
    name: '3-5-2 Wing-Backs',
    category: 'Three at the Back',
    defendersCount: 3,
    midfieldersCount: 5,
    forwardsCount: 2,
    description: 'Provides tactical overloads in the center of the park with dynamic wing-backs who own the touchlines and two complementary front-runners.',
    pros: ['Dominates possession in midfield 3v2 battles', 'Protects against central attackers with 3 dedicated CBs', 'Direct vertical link-up with dual strikers'],
    cons: ['Huge physical demand on both wingbacks', 'Vulnerable in the wide defensive channels on counter-attacks'],
    bottom: [
      { id: 1, role: 'GK', number: 1, name: 'Goalkeeper', x: 50, y: 94, isGK: true },
      { id: 2, role: 'RCB', number: 4, name: 'Right Center Back', x: 68, y: 82 },
      { id: 3, role: 'CB', number: 5, name: 'Central Sweeper/CB', x: 50, y: 84 },
      { id: 4, role: 'LCB', number: 3, name: 'Left Center Back', x: 32, y: 82 },
      { id: 5, role: 'RWB', number: 2, name: 'Right Wing Back', x: 88, y: 68 },
      { id: 6, role: 'CDM', number: 6, name: 'Defensive Mid', x: 50, y: 72 },
      { id: 7, role: 'RCM', number: 8, name: 'Right Central Mid', x: 63, y: 63 },
      { id: 8, role: 'LCM', number: 10, name: 'Left Central Mid', x: 37, y: 63 },
      { id: 9, role: 'LWB', number: 11, name: 'Left Wing Back', x: 12, y: 68 },
      { id: 10, role: 'RST', number: 9, name: 'Right Striker', x: 58, y: 51 },
      { id: 11, role: 'LST', number: 7, name: 'Left Striker', x: 42, y: 51 }
    ],
    top: [
      { id: 1, role: 'GK', number: 1, name: 'Goalkeeper', x: 50, y: 6, isGK: true },
      { id: 2, role: 'LCB', number: 3, name: 'Left Center Back', x: 68, y: 18 },
      { id: 3, role: 'CB', number: 5, name: 'Central Sweeper/CB', x: 50, y: 16 },
      { id: 4, role: 'RCB', number: 4, name: 'Right Center Back', x: 32, y: 18 },
      { id: 5, role: 'LWB', number: 11, name: 'Left Wing Back', x: 88, y: 32 },
      { id: 6, role: 'CDM', number: 6, name: 'Defensive Mid', x: 50, y: 28 },
      { id: 7, role: 'LCM', number: 10, name: 'Left Central Mid', x: 63, y: 37 },
      { id: 8, role: 'RCM', number: 8, name: 'Right Central Mid', x: 37, y: 37 },
      { id: 9, role: 'RWB', number: 2, name: 'Right Wing Back', x: 12, y: 32 },
      { id: 10, role: 'LST', number: 7, name: 'Left Striker', x: 58, y: 49 },
      { id: 11, role: 'RST', number: 9, name: 'Right Striker', x: 42, y: 49 }
    ]
  },

  '3-4-3': {
    name: '3-4-3 Total Attack',
    category: 'Three at the Back',
    defendersCount: 3,
    midfieldersCount: 4,
    forwardsCount: 3,
    description: 'High-octane attacking shape that creates overwhelming superiority in the final third and constant passing overloads across every zone.',
    pros: ['Dominates wide areas with wingers and wing-backs tandem', 'Fabulous counter-pressing structure in attacking half', 'Direct goal threat from 3 front-line attackers'],
    cons: ['Central midfield two can get overwhelmed if wingers fail to drop', 'Leaves large spaces behind the wing-backs for quick counters'],
    bottom: [
      { id: 1, role: 'GK', number: 1, name: 'Goalkeeper', x: 50, y: 94, isGK: true },
      { id: 2, role: 'RCB', number: 4, name: 'Right Center Back', x: 68, y: 82 },
      { id: 3, role: 'CB', number: 5, name: 'Central Defender', x: 50, y: 84 },
      { id: 4, role: 'LCB', number: 3, name: 'Left Center Back', x: 32, y: 82 },
      { id: 5, role: 'RWB', number: 2, name: 'Right Wing Back', x: 88, y: 67 },
      { id: 6, role: 'RCM', number: 8, name: 'Right Central Mid', x: 61, y: 68 },
      { id: 7, role: 'LCM', number: 6, name: 'Left Central Mid', x: 39, y: 68 },
      { id: 8, role: 'LWB', number: 12, name: 'Left Wing Back', x: 12, y: 67 },
      { id: 9, role: 'RW', number: 7, name: 'Right Winger', x: 82, y: 53 },
      { id: 10, role: 'ST', number: 9, name: 'Striker', x: 50, y: 50 },
      { id: 11, role: 'LW', number: 11, name: 'Left Winger', x: 18, y: 53 }
    ],
    top: [
      { id: 1, role: 'GK', number: 1, name: 'Goalkeeper', x: 50, y: 6, isGK: true },
      { id: 2, role: 'LCB', number: 3, name: 'Left Center Back', x: 68, y: 18 },
      { id: 3, role: 'CB', number: 5, name: 'Central Defender', x: 50, y: 16 },
      { id: 4, role: 'RCB', number: 4, name: 'Right Center Back', x: 32, y: 18 },
      { id: 5, role: 'LWB', number: 12, name: 'Left Wing Back', x: 88, y: 33 },
      { id: 6, role: 'LCM', number: 6, name: 'Left Central Mid', x: 61, y: 32 },
      { id: 7, role: 'RCM', number: 8, name: 'Right Central Mid', x: 39, y: 32 },
      { id: 8, role: 'RWB', number: 2, name: 'Right Wing Back', x: 12, y: 33 },
      { id: 9, role: 'LW', number: 11, name: 'Left Winger', x: 82, y: 47 },
      { id: 10, role: 'ST', number: 9, name: 'Striker', x: 50, y: 50 },
      { id: 11, role: 'RW', number: 7, name: 'Right Winger', x: 18, y: 47 }
    ]
  },

  '3-4-2-1': {
    name: '3-4-2-1 Half-Space Attack',
    category: 'Three at the Back',
    defendersCount: 3,
    midfieldersCount: 6,
    forwardsCount: 1,
    description: 'Employs two inverted attacking midfielders inside the opposing half-spaces, causing dilemma for rival full-backs and holding midfielders.',
    pros: ['Deadly overload between the lines in inside pockets', 'Smooth build-up play out from back three', 'Quick counter-pressing upon turnover in attacking zones'],
    cons: ['Needs disciplined wingbacks to generate all touchline width', 'Susceptible to rapid wing counters'],
    bottom: [
      { id: 1, role: 'GK', number: 1, name: 'Goalkeeper', x: 50, y: 94, isGK: true },
      { id: 2, role: 'RCB', number: 4, name: 'Right Center Back', x: 68, y: 82 },
      { id: 3, role: 'CB', number: 5, name: 'Central Defender', x: 50, y: 84 },
      { id: 4, role: 'LCB', number: 3, name: 'Left Center Back', x: 32, y: 82 },
      { id: 5, role: 'RWB', number: 2, name: 'Right Wing Back', x: 88, y: 67 },
      { id: 6, role: 'RDM', number: 8, name: 'Holding Midfielder', x: 61, y: 70 },
      { id: 7, role: 'LDM', number: 6, name: 'Holding Midfielder', x: 39, y: 70 },
      { id: 8, role: 'LWB', number: 12, name: 'Left Wing Back', x: 12, y: 67 },
      { id: 9, role: 'RAM', number: 7, name: 'Inside Right AM', x: 66, y: 57 },
      { id: 10, role: 'LAM', number: 10, name: 'Inside Left AM', x: 34, y: 57 },
      { id: 11, role: 'ST', number: 9, name: 'Striker', x: 50, y: 50 }
    ],
    top: [
      { id: 1, role: 'GK', number: 1, name: 'Goalkeeper', x: 50, y: 6, isGK: true },
      { id: 2, role: 'LCB', number: 3, name: 'Left Center Back', x: 68, y: 18 },
      { id: 3, role: 'CB', number: 5, name: 'Central Defender', x: 50, y: 16 },
      { id: 4, role: 'RCB', number: 4, name: 'Right Center Back', x: 32, y: 18 },
      { id: 5, role: 'LWB', number: 12, name: 'Left Wing Back', x: 88, y: 33 },
      { id: 6, role: 'LDM', number: 6, name: 'Holding Midfielder', x: 61, y: 30 },
      { id: 7, role: 'RDM', number: 8, name: 'Holding Midfielder', x: 39, y: 30 },
      { id: 8, role: 'RWB', number: 2, name: 'Right Wing Back', x: 12, y: 33 },
      { id: 9, role: 'LAM', number: 10, name: 'Inside Left AM', x: 66, y: 43 },
      { id: 10, role: 'RAM', number: 7, name: 'Inside Right AM', x: 34, y: 43 },
      { id: 11, role: 'ST', number: 9, name: 'Striker', x: 50, y: 50 }
    ]
  },

  '3-4-1-2': {
    name: '3-4-1-2 Trequartista',
    category: 'Three at the Back',
    defendersCount: 3,
    midfieldersCount: 5,
    forwardsCount: 2,
    description: 'Utilizes a traditional number 10 playmaker orchestrating behind two dynamic strikers with wide support from wing-backs.',
    pros: ['Direct link from playmaker to dual strikers', 'Three central defenders prevent counter-breakaways', 'Natural crossing channels from wing-backs'],
    cons: ['Heavy defensive load on the central midfield pair', 'Playmaker can be marked out by defensive pivot'],
    bottom: [
      { id: 1, role: 'GK', number: 1, name: 'Goalkeeper', x: 50, y: 94, isGK: true },
      { id: 2, role: 'RCB', number: 4, name: 'Right Center Back', x: 68, y: 82 },
      { id: 3, role: 'CB', number: 5, name: 'Central Defender', x: 50, y: 84 },
      { id: 4, role: 'LCB', number: 3, name: 'Left Center Back', x: 32, y: 82 },
      { id: 5, role: 'RWB', number: 2, name: 'Right Wing Back', x: 88, y: 68 },
      { id: 6, role: 'RCM', number: 8, name: 'Central Midfielder', x: 62, y: 69 },
      { id: 7, role: 'LCM', number: 6, name: 'Central Midfielder', x: 38, y: 69 },
      { id: 8, role: 'LWB', number: 12, name: 'Left Wing Back', x: 12, y: 68 },
      { id: 9, role: 'CAM', number: 10, name: 'Playmaker', x: 50, y: 58 },
      { id: 10, role: 'RST', number: 9, name: 'Right Forward', x: 58, y: 50 },
      { id: 11, role: 'LST', number: 7, name: 'Left Forward', x: 42, y: 50 }
    ],
    top: [
      { id: 1, role: 'GK', number: 1, name: 'Goalkeeper', x: 50, y: 6, isGK: true },
      { id: 2, role: 'LCB', number: 3, name: 'Left Center Back', x: 68, y: 18 },
      { id: 3, role: 'CB', number: 5, name: 'Central Defender', x: 50, y: 16 },
      { id: 4, role: 'RCB', number: 4, name: 'Right Center Back', x: 32, y: 18 },
      { id: 5, role: 'LWB', number: 12, name: 'Left Wing Back', x: 88, y: 32 },
      { id: 6, role: 'LCM', number: 6, name: 'Central Midfielder', x: 62, y: 31 },
      { id: 7, role: 'RCM', number: 8, name: 'Central Midfielder', x: 38, y: 31 },
      { id: 8, role: 'RWB', number: 2, name: 'Right Wing Back', x: 12, y: 32 },
      { id: 9, role: 'CAM', number: 10, name: 'Playmaker', x: 50, y: 42 },
      { id: 10, role: 'LST', number: 7, name: 'Left Forward', x: 58, y: 50 },
      { id: 11, role: 'RST', number: 9, name: 'Right Forward', x: 42, y: 50 }
    ]
  },

  '5-3-2': {
    name: '5-3-2 Solid Low Block',
    category: 'Five at the Back',
    defendersCount: 5,
    midfieldersCount: 3,
    forwardsCount: 2,
    description: 'An impenetrable defensive fortress. Five defenders span the width of the penalty area with three compact central midfielders in front.',
    pros: ['Virtually impenetrable central defensive zone', 'Strong resistance against crosses and cutbacks', 'Dangerous counter-attacks with two strikers'],
    cons: ['Hard to retain sustained possession in the opposition half', 'Wingbacks can be pinned back into a flat back five'],
    bottom: [
      { id: 1, role: 'GK', number: 1, name: 'Goalkeeper', x: 50, y: 94, isGK: true },
      { id: 2, role: 'RWB', number: 2, name: 'Right Wing Back', x: 90, y: 80 },
      { id: 3, role: 'RCB', number: 4, name: 'Right Center Back', x: 70, y: 84 },
      { id: 4, role: 'CB', number: 5, name: 'Central Defender', x: 50, y: 85 },
      { id: 5, role: 'LCB', number: 12, name: 'Left Center Back', x: 30, y: 84 },
      { id: 6, role: 'LWB', number: 3, name: 'Left Wing Back', x: 10, y: 80 },
      { id: 7, role: 'RCM', number: 8, name: 'Right Central Mid', x: 68, y: 67 },
      { id: 8, role: 'CDM', number: 6, name: 'Defensive Mid', x: 50, y: 72 },
      { id: 9, role: 'LCM', number: 10, name: 'Left Central Mid', x: 32, y: 67 },
      { id: 10, role: 'RST', number: 9, name: 'Right Striker', x: 59, y: 51 },
      { id: 11, role: 'LST', number: 7, name: 'Left Striker', x: 41, y: 51 }
    ],
    top: [
      { id: 1, role: 'GK', number: 1, name: 'Goalkeeper', x: 50, y: 6, isGK: true },
      { id: 2, role: 'LWB', number: 3, name: 'Left Wing Back', x: 90, y: 20 },
      { id: 3, role: 'LCB', number: 12, name: 'Left Center Back', x: 70, y: 16 },
      { id: 4, role: 'CB', number: 5, name: 'Central Defender', x: 50, y: 15 },
      { id: 5, role: 'RCB', number: 4, name: 'Right Center Back', x: 30, y: 16 },
      { id: 6, role: 'RWB', number: 2, name: 'Right Wing Back', x: 10, y: 20 },
      { id: 7, role: 'LCM', number: 10, name: 'Left Central Mid', x: 68, y: 33 },
      { id: 8, role: 'CDM', number: 6, name: 'Defensive Mid', x: 50, y: 28 },
      { id: 9, role: 'RCM', number: 8, name: 'Right Central Mid', x: 32, y: 33 },
      { id: 10, role: 'LST', number: 7, name: 'Left Striker', x: 59, y: 49 },
      { id: 11, role: 'RST', number: 9, name: 'Right Striker', x: 41, y: 49 }
    ]
  },

  '5-4-1': {
    name: '5-4-1 Defensive Bulwark',
    category: 'Five at the Back',
    defendersCount: 5,
    midfieldersCount: 4,
    forwardsCount: 1,
    description: 'The ultimate containment strategy. Two thick defensive lines deny both central passing lanes and wide crosses, protecting tight leads.',
    pros: ['Extreme defensive resilience and minimal space conceded', 'Solid double coverage in wide spaces', 'Great for match-closing situations'],
    cons: ['Very low attacking threat', 'Lone striker suffers immense isolation'],
    bottom: [
      { id: 1, role: 'GK', number: 1, name: 'Goalkeeper', x: 50, y: 94, isGK: true },
      { id: 2, role: 'RWB', number: 2, name: 'Right Wing Back', x: 90, y: 81 },
      { id: 3, role: 'RCB', number: 4, name: 'Right Center Back', x: 70, y: 84 },
      { id: 4, role: 'CB', number: 5, name: 'Central Defender', x: 50, y: 85 },
      { id: 5, role: 'LCB', number: 12, name: 'Left Center Back', x: 30, y: 84 },
      { id: 6, role: 'LWB', number: 3, name: 'Left Wing Back', x: 10, y: 81 },
      { id: 7, role: 'RM', number: 7, name: 'Right Midfielder', x: 84, y: 66 },
      { id: 8, role: 'RCM', number: 8, name: 'Central Midfielder', x: 61, y: 68 },
      { id: 9, role: 'LCM', number: 6, name: 'Central Midfielder', x: 39, y: 68 },
      { id: 10, role: 'LM', number: 11, name: 'Left Midfielder', x: 16, y: 66 },
      { id: 11, role: 'ST', number: 9, name: 'Striker', x: 50, y: 51 }
    ],
    top: [
      { id: 1, role: 'GK', number: 1, name: 'Goalkeeper', x: 50, y: 6, isGK: true },
      { id: 2, role: 'LWB', number: 3, name: 'Left Wing Back', x: 90, y: 19 },
      { id: 3, role: 'LCB', number: 12, name: 'Left Center Back', x: 70, y: 16 },
      { id: 4, role: 'CB', number: 5, name: 'Central Defender', x: 50, y: 15 },
      { id: 5, role: 'RCB', number: 4, name: 'Right Center Back', x: 30, y: 16 },
      { id: 6, role: 'RWB', number: 2, name: 'Right Wing Back', x: 10, y: 19 },
      { id: 7, role: 'LM', number: 11, name: 'Left Midfielder', x: 84, y: 34 },
      { id: 8, role: 'LCM', number: 6, name: 'Central Midfielder', x: 61, y: 32 },
      { id: 9, role: 'RCM', number: 8, name: 'Central Midfielder', x: 39, y: 32 },
      { id: 10, role: 'RM', number: 7, name: 'Right Midfielder', x: 16, y: 34 },
      { id: 11, role: 'ST', number: 9, name: 'Striker', x: 50, y: 49 }
    ]
  },

  '4-5-1': {
    name: '4-5-1 Midfield Overload',
    category: 'Four at the Back',
    defendersCount: 4,
    midfieldersCount: 5,
    forwardsCount: 1,
    description: 'Prioritizes midfield control and territorial containment, choking the opponent build-up play through a dense five-player bank.',
    pros: ['Total midfield numerical dominance', 'Easily presses fullbacks and holding midfielders', 'Fluid transition into 4-3-3 on counter'],
    cons: ['Striker can become stranded without fast wing support', 'Can lack penalty box penetration'],
    bottom: [
      { id: 1, role: 'GK', number: 1, name: 'Goalkeeper', x: 50, y: 94, isGK: true },
      { id: 2, role: 'RB', number: 2, name: 'Right Back', x: 86, y: 81 },
      { id: 3, role: 'RCB', number: 4, name: 'Right Center Back', x: 62, y: 83 },
      { id: 4, role: 'LCB', number: 5, name: 'Left Center Back', x: 38, y: 83 },
      { id: 5, role: 'LB', number: 3, name: 'Left Back', x: 14, y: 81 },
      { id: 6, role: 'RM', number: 7, name: 'Right Midfielder', x: 85, y: 64 },
      { id: 7, role: 'RCM', number: 8, name: 'Central Midfielder', x: 65, y: 67 },
      { id: 8, role: 'CDM', number: 6, name: 'Holding Midfielder', x: 50, y: 72 },
      { id: 9, role: 'LCM', number: 10, name: 'Central Midfielder', x: 35, y: 67 },
      { id: 10, role: 'LM', number: 11, name: 'Left Midfielder', x: 15, y: 64 },
      { id: 11, role: 'ST', number: 9, name: 'Striker', x: 50, y: 50 }
    ],
    top: [
      { id: 1, role: 'GK', number: 1, name: 'Goalkeeper', x: 50, y: 6, isGK: true },
      { id: 2, role: 'LB', number: 3, name: 'Left Back', x: 86, y: 19 },
      { id: 3, role: 'LCB', number: 5, name: 'Left Center Back', x: 62, y: 17 },
      { id: 4, role: 'RCB', number: 4, name: 'Right Center Back', x: 38, y: 17 },
      { id: 5, role: 'RB', number: 2, name: 'Right Back', x: 14, y: 19 },
      { id: 6, role: 'LM', number: 11, name: 'Left Midfielder', x: 85, y: 36 },
      { id: 7, role: 'LCM', number: 10, name: 'Central Midfielder', x: 65, y: 33 },
      { id: 8, role: 'CDM', number: 6, name: 'Holding Midfielder', x: 50, y: 28 },
      { id: 9, role: 'RCM', number: 8, name: 'Central Midfielder', x: 35, y: 33 },
      { id: 10, role: 'RM', number: 7, name: 'Right Midfielder', x: 15, y: 36 },
      { id: 11, role: 'ST', number: 9, name: 'Striker', x: 50, y: 50 }
    ]
  },

  '4-3-1-2': {
    name: '4-3-1-2 Diamond Support',
    category: 'Four at the Back',
    defendersCount: 4,
    midfieldersCount: 4,
    forwardsCount: 2,
    description: 'Central powerhouse formation featuring a midfield trio protecting a creative maestro feeding two front-line forwards.',
    pros: ['Terrific central combinations and quick wall passes', 'Solid midfield triangle behind the number 10', 'Two strikers pin center-backs'],
    cons: ['Lacks natural width, requiring fullbacks to push extremely high', 'Exposes flanks to quick opponent counters'],
    bottom: [
      { id: 1, role: 'GK', number: 1, name: 'Goalkeeper', x: 50, y: 94, isGK: true },
      { id: 2, role: 'RB', number: 2, name: 'Right Back', x: 86, y: 80 },
      { id: 3, role: 'RCB', number: 4, name: 'Right Center Back', x: 62, y: 83 },
      { id: 4, role: 'LCB', number: 5, name: 'Left Center Back', x: 38, y: 83 },
      { id: 5, role: 'LB', number: 3, name: 'Left Back', x: 14, y: 80 },
      { id: 6, role: 'RCM', number: 8, name: 'Right Center Mid', x: 67, y: 69 },
      { id: 7, role: 'CDM', number: 6, name: 'Defensive Mid', x: 50, y: 74 },
      { id: 8, role: 'LCM', number: 7, name: 'Left Center Mid', x: 33, y: 69 },
      { id: 9, role: 'CAM', number: 10, name: 'Playmaker', x: 50, y: 59 },
      { id: 10, role: 'RST', number: 9, name: 'Right Striker', x: 58, y: 50 },
      { id: 11, role: 'LST', number: 11, name: 'Left Striker', x: 42, y: 50 }
    ],
    top: [
      { id: 1, role: 'GK', number: 1, name: 'Goalkeeper', x: 50, y: 6, isGK: true },
      { id: 2, role: 'LB', number: 3, name: 'Left Back', x: 86, y: 20 },
      { id: 3, role: 'LCB', number: 5, name: 'Left Center Back', x: 62, y: 17 },
      { id: 4, role: 'RCB', number: 4, name: 'Right Center Back', x: 38, y: 17 },
      { id: 5, role: 'RB', number: 2, name: 'Right Back', x: 14, y: 20 },
      { id: 6, role: 'LCM', number: 7, name: 'Left Center Mid', x: 67, y: 31 },
      { id: 7, role: 'CDM', number: 6, name: 'Defensive Mid', x: 50, y: 26 },
      { id: 8, role: 'RCM', number: 8, name: 'Right Center Mid', x: 33, y: 31 },
      { id: 9, role: 'CAM', number: 10, name: 'Playmaker', x: 50, y: 41 },
      { id: 10, role: 'LST', number: 11, name: 'Left Striker', x: 58, y: 50 },
      { id: 11, role: 'RST', number: 9, name: 'Right Striker', x: 42, y: 50 }
    ]
  },

  '4-2-2-2': {
    name: '4-2-2-2 Magic Box',
    category: 'Four at the Back',
    defendersCount: 4,
    midfieldersCount: 4,
    forwardsCount: 2,
    description: 'Renowned Brazilian box formation featuring two holding defensive midfielders, two roaming attacking midfielders, and two forwards.',
    pros: ['Very compact central core with devastating short-passing combinations', 'Double pivot shields defense effectively', 'Overloads half-spaces with dual playmakers'],
    cons: ['Zero natural touchline width without adventurous full-backs', 'Demands high tactical discipline to avoid clustering'],
    bottom: [
      { id: 1, role: 'GK', number: 1, name: 'Goalkeeper', x: 50, y: 94, isGK: true },
      { id: 2, role: 'RB', number: 2, name: 'Right Back', x: 86, y: 81 },
      { id: 3, role: 'RCB', number: 4, name: 'Right Center Back', x: 62, y: 83 },
      { id: 4, role: 'LCB', number: 5, name: 'Left Center Back', x: 38, y: 83 },
      { id: 5, role: 'LB', number: 3, name: 'Left Back', x: 14, y: 81 },
      { id: 6, role: 'RDM', number: 8, name: 'Defensive Mid', x: 62, y: 72 },
      { id: 7, role: 'LDM', number: 6, name: 'Defensive Mid', x: 38, y: 72 },
      { id: 8, role: 'RAM', number: 7, name: 'Attacking Mid', x: 68, y: 60 },
      { id: 9, role: 'LAM', number: 10, name: 'Attacking Mid', x: 32, y: 60 },
      { id: 10, role: 'RST', number: 9, name: 'Right Striker', x: 58, y: 50 },
      { id: 11, role: 'LST', number: 11, name: 'Left Striker', x: 42, y: 50 }
    ],
    top: [
      { id: 1, role: 'GK', number: 1, name: 'Goalkeeper', x: 50, y: 6, isGK: true },
      { id: 2, role: 'LB', number: 3, name: 'Left Back', x: 86, y: 19 },
      { id: 3, role: 'LCB', number: 5, name: 'Left Center Back', x: 62, y: 17 },
      { id: 4, role: 'RCB', number: 4, name: 'Right Center Back', x: 38, y: 17 },
      { id: 5, role: 'RB', number: 2, name: 'Right Back', x: 14, y: 19 },
      { id: 6, role: 'LDM', number: 6, name: 'Defensive Mid', x: 62, y: 28 },
      { id: 7, role: 'RDM', number: 8, name: 'Defensive Mid', x: 38, y: 28 },
      { id: 8, role: 'LAM', number: 10, name: 'Attacking Mid', x: 68, y: 40 },
      { id: 9, role: 'RAM', number: 7, name: 'Attacking Mid', x: 32, y: 40 },
      { id: 10, role: 'LST', number: 11, name: 'Left Striker', x: 58, y: 50 },
      { id: 11, role: 'RST', number: 9, name: 'Right Striker', x: 42, y: 50 }
    ]
  },

  '4-3-2-1': {
    name: '4-3-2-1 Christmas Tree',
    category: 'Four at the Back',
    defendersCount: 4,
    midfieldersCount: 5,
    forwardsCount: 1,
    description: 'The famed Milanese Christmas Tree formation. Three hardworking central midfielders anchor two creative inside-forwards supporting a lethal target striker.',
    pros: ['Dense midfield triangle dominates possession and stifles opponents', 'Creative magic from two complementary playmakers', 'Very solid central defense'],
    cons: ['Narrow shape requires energetic full-backs to prevent opposing wing dominance', 'High reliance on the lone striker for runs'],
    bottom: [
      { id: 1, role: 'GK', number: 1, name: 'Goalkeeper', x: 50, y: 94, isGK: true },
      { id: 2, role: 'RB', number: 2, name: 'Right Back', x: 86, y: 81 },
      { id: 3, role: 'RCB', number: 4, name: 'Right Center Back', x: 62, y: 83 },
      { id: 4, role: 'LCB', number: 5, name: 'Left Center Back', x: 38, y: 83 },
      { id: 5, role: 'LB', number: 3, name: 'Left Back', x: 14, y: 81 },
      { id: 6, role: 'RCM', number: 8, name: 'Right Central Mid', x: 68, y: 71 },
      { id: 7, role: 'CCM', number: 6, name: 'Regista/Center Mid', x: 50, y: 73 },
      { id: 8, role: 'LCM', number: 7, name: 'Left Central Mid', x: 32, y: 71 },
      { id: 9, role: 'RAM', number: 10, name: 'Right Inside Forward', x: 62, y: 59 },
      { id: 10, role: 'LAM', number: 11, name: 'Left Inside Forward', x: 38, y: 59 },
      { id: 11, role: 'ST', number: 9, name: 'Striker', x: 50, y: 50 }
    ],
    top: [
      { id: 1, role: 'GK', number: 1, name: 'Goalkeeper', x: 50, y: 6, isGK: true },
      { id: 2, role: 'LB', number: 3, name: 'Left Back', x: 86, y: 19 },
      { id: 3, role: 'LCB', number: 5, name: 'Left Center Back', x: 62, y: 17 },
      { id: 4, role: 'RCB', number: 4, name: 'Right Center Back', x: 38, y: 17 },
      { id: 5, role: 'RB', number: 2, name: 'Right Back', x: 14, y: 19 },
      { id: 6, role: 'LCM', number: 7, name: 'Left Central Mid', x: 68, y: 29 },
      { id: 7, role: 'CCM', number: 6, name: 'Regista/Center Mid', x: 50, y: 27 },
      { id: 8, role: 'RCM', number: 8, name: 'Right Central Mid', x: 32, y: 29 },
      { id: 9, role: 'LAM', number: 11, name: 'Left Inside Forward', x: 62, y: 41 },
      { id: 10, role: 'RAM', number: 10, name: 'Right Inside Forward', x: 38, y: 41 },
      { id: 11, role: 'ST', number: 9, name: 'Striker', x: 50, y: 50 }
    ]
  },

  '4-1-2-1-2': {
    name: '4-1-2-1-2 Narrow Diamond',
    category: 'Four at the Back',
    defendersCount: 4,
    midfieldersCount: 4,
    forwardsCount: 2,
    description: 'Diamond midfield system emphasizing vertical passing through the lines, with a dedicated holding midfielder, two shuttling central midfielders, a trequartista, and two strikers.',
    pros: ['Unmatched central passing triangles and combination play', 'Dedicated shield in front of defense and classic creator behind forwards', 'Constant 2v2 pressure on opponent center-backs'],
    cons: ['Completely concedes the wings unless full-backs advance aggressively', 'Extreme physical demands on the outside central midfielders'],
    bottom: [
      { id: 1, role: 'GK', number: 1, name: 'Goalkeeper', x: 50, y: 94, isGK: true },
      { id: 2, role: 'RB', number: 2, name: 'Right Back', x: 86, y: 81 },
      { id: 3, role: 'RCB', number: 4, name: 'Right Center Back', x: 62, y: 83 },
      { id: 4, role: 'LCB', number: 5, name: 'Left Center Back', x: 38, y: 83 },
      { id: 5, role: 'LB', number: 3, name: 'Left Back', x: 14, y: 81 },
      { id: 6, role: 'CDM', number: 6, name: 'Defensive Pivot', x: 50, y: 74 },
      { id: 7, role: 'RCM', number: 8, name: 'Right Shuttler', x: 66, y: 66 },
      { id: 8, role: 'LCM', number: 7, name: 'Left Shuttler', x: 34, y: 66 },
      { id: 9, role: 'CAM', number: 10, name: 'Diamond Apex AM', x: 50, y: 58 },
      { id: 10, role: 'RST', number: 9, name: 'Right Striker', x: 58, y: 50 },
      { id: 11, role: 'LST', number: 11, name: 'Left Striker', x: 42, y: 50 }
    ],
    top: [
      { id: 1, role: 'GK', number: 1, name: 'Goalkeeper', x: 50, y: 6, isGK: true },
      { id: 2, role: 'LB', number: 3, name: 'Left Back', x: 86, y: 19 },
      { id: 3, role: 'LCB', number: 5, name: 'Left Center Back', x: 62, y: 17 },
      { id: 4, role: 'RCB', number: 4, name: 'Right Center Back', x: 38, y: 17 },
      { id: 5, role: 'RB', number: 2, name: 'Right Back', x: 14, y: 19 },
      { id: 6, role: 'CDM', number: 6, name: 'Defensive Pivot', x: 50, y: 26 },
      { id: 7, role: 'LCM', number: 7, name: 'Left Shuttler', x: 66, y: 34 },
      { id: 8, role: 'RCM', number: 8, name: 'Right Shuttler', x: 34, y: 34 },
      { id: 9, role: 'CAM', number: 10, name: 'Diamond Apex AM', x: 50, y: 42 },
      { id: 10, role: 'LST', number: 11, name: 'Left Striker', x: 58, y: 50 },
      { id: 11, role: 'RST', number: 9, name: 'Right Striker', x: 42, y: 50 }
    ]
  }
};

/**
 * Calculates line breakdown (defenders, midfielders, forwards)
 * based on role labels and position coordinates.
 */
function analyzeTeamLineup(players) {
  let defenders = 0;
  let midfielders = 0;
  let forwards = 0;
  let goalkeepers = 0;

  players.forEach(p => {
    const role = (p.role || '').toUpperCase();
    if (role === 'GK' || p.isGK) {
      goalkeepers++;
    } else if (['CB', 'RCB', 'LCB', 'RB', 'LB', 'RWB', 'LWB', 'SW'].includes(role) || role.includes('B')) {
      defenders++;
    } else if (['ST', 'CF', 'LW', 'RW', 'LF', 'RF', 'RST', 'LST'].includes(role) || role.includes('W') || role.includes('ST')) {
      forwards++;
    } else {
      midfielders++;
    }
  });

  return { goalkeepers, defenders, midfielders, forwards, total: players.length };
}

window.FORMATION_DEFINITIONS = FORMATION_DEFINITIONS;
window.analyzeTeamLineup = analyzeTeamLineup;
