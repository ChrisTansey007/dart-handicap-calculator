import { HANDICAP_METHODS } from '../constants';

/**
 * Sample roster data
 */
const initialRoster = [
  {
    id: '1',
    name: 'Alice "The Ace"',
    mpr: '3.5',
    closingSpeed: {
      20: '2.1',
      19: '2.5',
      18: '2.8',
      17: '3.1',
      16: '3.5',
      15: '4.0',
      bull: '5.0',
    },
    accuracy: {
      20: '85',
      19: '80',
      18: '75',
      17: '70',
      16: '65',
      15: '60',
      bull: '50',
    },
    pointsPerTurn: '15',
    consistency: '88',
    winRate: '75',
  },
  {
    id: '2',
    name: 'Bob "Bullseye"',
    mpr: '2.8',
    closingSpeed: {
      20: '2.9',
      19: '3.2',
      18: '3.5',
      17: '4.0',
      16: '4.5',
      15: '5.0',
      bull: '6.0',
    },
    accuracy: {
      20: '70',
      19: '65',
      18: '60',
      17: '55',
      16: '50',
      15: '45',
      bull: '35',
    },
    pointsPerTurn: '10',
    consistency: '75',
    winRate: '55',
  },
];

/**
 * Initial application state
 */
export const initialState = {
  roster: initialRoster,
  editingPlayer: null,
  selectedPlayer1Id: null,
  selectedPlayer2Id: null,
  selectedMethod: HANDICAP_METHODS.MPR,
  handicapResult: null,
};
