import React from 'react';
import { DART_NUMBERS } from '../../../constants';

/**
 * Component for grid-based stat input (closing speed, accuracy)
 */
export const PlayerStatInput = ({ label, field, data, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-stone-300 mb-2">
        {label}
      </label>
      <div className="grid grid-cols-4 gap-2">
        {DART_NUMBERS.map((num) => (
          <div key={num} className="text-center">
            <label className="block text-xs text-stone-400 mb-1">{num}</label>
            <input
              type="number"
              step="0.1"
              value={data[num] || ''}
              onChange={(e) => onChange(field, e.target.value, num)}
              className="w-full p-1 text-sm bg-stone-900/80 border-2 border-amber-800/50 rounded-lg text-stone-200 text-center focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="0"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
