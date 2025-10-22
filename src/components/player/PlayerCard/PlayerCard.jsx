import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Card } from '../../common/Card/Card';
import { Button } from '../../common/Button/Button';
import { calculateSkillLevel } from '../../../services/player';
import { formatSkillLevel } from '../../../utils';

/**
 * Player card component for displaying player info
 */
export const PlayerCard = ({ player, onEdit, onDelete }) => {
  const skillLevel = calculateSkillLevel(player);

  return (
    <Card className="flex items-center justify-between">
      <div>
        <p className="font-bold text-stone-200 text-lg">{player.name}</p>
        <p className="text-sm text-amber-400">
          Skill Level: {formatSkillLevel(skillLevel)}
        </p>
      </div>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          icon={Edit}
          onClick={() => onEdit(player)}
        />
        <Button
          variant="ghost"
          size="sm"
          icon={Trash2}
          onClick={() => onDelete(player.id)}
          className="text-red-500 hover:text-red-400"
        />
      </div>
    </Card>
  );
};
