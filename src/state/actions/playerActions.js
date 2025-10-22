/**
 * Player-related action types and creators
 */

// Action types
export const PLAYER_ACTION_TYPES = {
  START_EDIT_PLAYER: 'START_EDIT_PLAYER',
  CANCEL_EDIT: 'CANCEL_EDIT',
  SAVE_PLAYER: 'SAVE_PLAYER',
  DELETE_PLAYER: 'DELETE_PLAYER',
};

// Action creators
export const startEditPlayer = (player = null) => ({
  type: PLAYER_ACTION_TYPES.START_EDIT_PLAYER,
  payload: player,
});

export const cancelEdit = () => ({
  type: PLAYER_ACTION_TYPES.CANCEL_EDIT,
});

export const savePlayer = (player) => ({
  type: PLAYER_ACTION_TYPES.SAVE_PLAYER,
  payload: player,
});

export const deletePlayer = (playerId) => ({
  type: PLAYER_ACTION_TYPES.DELETE_PLAYER,
  payload: playerId,
});
