import { PLAYER_ACTION_TYPES } from '../actions/playerActions';
import { HANDICAP_ACTION_TYPES } from '../actions/handicapActions';
import { generateId } from '../../utils';
import { EMPTY_PLAYER } from '../../constants';

/**
 * Main application reducer
 * Handles all state updates for the application
 */
export const appReducer = (state, action) => {
  switch (action.type) {
    // Player actions
    case PLAYER_ACTION_TYPES.START_EDIT_PLAYER:
      return {
        ...state,
        editingPlayer: action.payload || { ...EMPTY_PLAYER, id: null },
      };

    case PLAYER_ACTION_TYPES.CANCEL_EDIT:
      return {
        ...state,
        editingPlayer: null,
      };

    case PLAYER_ACTION_TYPES.SAVE_PLAYER: {
      const player = action.payload;
      
      if (player.id) {
        // Update existing player
        return {
          ...state,
          roster: state.roster.map((p) => (p.id === player.id ? player : p)),
          editingPlayer: null,
        };
      } else {
        // Add new player
        const newPlayer = { ...player, id: generateId() };
        return {
          ...state,
          roster: [...state.roster, newPlayer],
          editingPlayer: null,
        };
      }
    }

    case PLAYER_ACTION_TYPES.DELETE_PLAYER:
      return {
        ...state,
        roster: state.roster.filter((p) => p.id !== action.payload),
      };

    // Handicap actions
    case HANDICAP_ACTION_TYPES.SELECT_PLAYER_1:
      return {
        ...state,
        selectedPlayer1Id: action.payload,
        handicapResult: null,
      };

    case HANDICAP_ACTION_TYPES.SELECT_PLAYER_2:
      return {
        ...state,
        selectedPlayer2Id: action.payload,
        handicapResult: null,
      };

    case HANDICAP_ACTION_TYPES.SET_METHOD:
      return {
        ...state,
        selectedMethod: action.payload,
        handicapResult: null,
      };

    case HANDICAP_ACTION_TYPES.CALCULATE_HANDICAP:
      return {
        ...state,
        handicapResult: action.payload,
      };

    case HANDICAP_ACTION_TYPES.CLEAR_RESULT:
      return {
        ...state,
        handicapResult: null,
      };

    default:
      return state;
  }
};
