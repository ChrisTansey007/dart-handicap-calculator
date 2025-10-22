import React from 'react';

/**
 * Player selector dropdown component
 */
export const PlayerSelector = ({ 
  label, 
  players, 
  selectedId, 
  excludeId, 
  onChange 
}) => {
  const availablePlayers = players.filter((p) => p.id !== excludeId);

  return (
    <div className="flex-1 space-y-2">
      <label className="text-lg font-semibold text-stone-300">{label}</label>
      <select
        value={selectedId || ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 bg-stone-900/80 border-2 border-amber-800/50 rounded-lg text-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
      >
        <option value="" disabled>
          Select a player
        </option>
        {availablePlayers.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
    </div>
  );
};
