/**
 * Handicap-related action types and creators
 */

// Action types
export const HANDICAP_ACTION_TYPES = {
  SELECT_PLAYER_1: 'SELECT_PLAYER_1',
  SELECT_PLAYER_2: 'SELECT_PLAYER_2',
  SET_METHOD: 'SET_METHOD',
  CALCULATE_HANDICAP: 'CALCULATE_HANDICAP',
  CLEAR_RESULT: 'CLEAR_RESULT',
};

// Action creators
export const selectPlayer1 = (playerId) => ({
  type: HANDICAP_ACTION_TYPES.SELECT_PLAYER_1,
  payload: playerId,
});

export const selectPlayer2 = (playerId) => ({
  type: HANDICAP_ACTION_TYPES.SELECT_PLAYER_2,
  payload: playerId,
});

export const setMethod = (method) => ({
  type: HANDICAP_ACTION_TYPES.SET_METHOD,
  payload: method,
});

export const setHandicapResult = (result) => ({
  type: HANDICAP_ACTION_TYPES.CALCULATE_HANDICAP,
  payload: result,
});

export const clearResult = () => ({
  type: HANDICAP_ACTION_TYPES.CLEAR_RESULT,
});
