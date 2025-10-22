import React from 'react';
import { PlayerCard } from '../PlayerCard/PlayerCard';

/**
 * Player list component
 */
export const PlayerList = ({ players, onEdit, onDelete }) => {
  if (players.length === 0) {
    return (
      <div className="text-center py-10 bg-stone-900/30 rounded-lg border-2 border-dashed border-stone-700">
        <p className="text-stone-400">No players in your roster yet.</p>
        <p className="text-stone-500">Click "Add Player" to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {players.map((player) => (
        <PlayerCard
          key={player.id}
          player={player}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
