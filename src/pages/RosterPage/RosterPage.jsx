import React from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '../../components/common';
import { PlayerList } from '../../components/player';
import { useAppContext } from '../../state';
import { startEditPlayer, deletePlayer } from '../../state';

/**
 * Roster page component
 */
export const RosterPage = () => {
  const { state, dispatch } = useAppContext();
  const { roster } = state;

  const handleAddPlayer = () => {
    dispatch(startEditPlayer());
  };

  const handleEditPlayer = (player) => {
    dispatch(startEditPlayer(player));
  };

  const handleDeletePlayer = (playerId) => {
    dispatch(deletePlayer(playerId));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-stone-200">Player Roster</h2>
        <Button
          variant="primary"
          icon={PlusCircle}
          onClick={handleAddPlayer}
        >
          Add Player
        </Button>
      </div>
      <PlayerList
        players={roster}
        onEdit={handleEditPlayer}
        onDelete={handleDeletePlayer}
      />
    </div>
  );
};
