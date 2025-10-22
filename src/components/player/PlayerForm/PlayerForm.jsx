import React, { useState } from 'react';
import { Modal } from '../../common/Modal/Modal';
import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import { PlayerStatInput } from '../PlayerStatInput/PlayerStatInput';

/**
 * Player form modal component
 */
export const PlayerForm = ({ player, onSave, onCancel }) => {
  const [playerData, setPlayerData] = useState(player);

  const handleUpdate = (field, value, subfield = null) => {
    setPlayerData((prev) => {
      if (subfield) {
        return { ...prev, [field]: { ...prev[field], [subfield]: value } };
      }
      return { ...prev, [field]: value };
    });
  };

  const handleSubmit = () => {
    onSave(playerData);
  };

  return (
    <Modal
      isOpen={true}
      onClose={onCancel}
      title={player.id ? 'Edit Player' : 'Add New Player'}
    >
      <Input
        label="Player Name"
        value={playerData.name}
        onChange={(e) => handleUpdate('name', e.target.value)}
        type="text"
        placeholder="Enter name"
        required
      />

      <Input
        label="MPR (Marks Per Round)"
        value={playerData.mpr}
        onChange={(e) => handleUpdate('mpr', e.target.value)}
        type="number"
        step="0.1"
        placeholder="0.00"
      />

      <PlayerStatInput
        label="Turns to Close (per number)"
        field="closingSpeed"
        data={playerData.closingSpeed}
        onChange={handleUpdate}
      />

      <PlayerStatInput
        label="Accuracy % (per number)"
        field="accuracy"
        data={playerData.accuracy}
        onChange={handleUpdate}
      />

      <Input
        label="Points Per Turn"
        value={playerData.pointsPerTurn}
        onChange={(e) => handleUpdate('pointsPerTurn', e.target.value)}
        type="number"
        step="0.1"
        placeholder="0.0"
      />

      <Input
        label="Consistency %"
        value={playerData.consistency}
        onChange={(e) => handleUpdate('consistency', e.target.value)}
        type="number"
        placeholder="0"
      />

      <Input
        label="Win Rate %"
        value={playerData.winRate}
        onChange={(e) => handleUpdate('winRate', e.target.value)}
        type="number"
        placeholder="50"
      />

      <div className="flex justify-end gap-4 mt-6">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Player
        </Button>
      </div>
    </Modal>
  );
};
