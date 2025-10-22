import { calculateSkillDifference } from '../player/skillCalculator';
import { 
  THRESHOLD_EVEN_MATCH_SKILL, 
  THRESHOLD_HIGH_SKILL_DIFF,
  METHOD_CONFIG,
  HANDICAP_METHODS 
} from '../../constants';

const SKILL_TO_POINTS_MULTIPLIER = 2.5;
const SKILL_TO_MARKS_MULTIPLIER = 0.8;
const MAX_MARKS = 3;

/**
 * Calculate handicap using multi-factor method
 * @param {Object} player1
 * @param {Object} player2
 * @returns {Object} Handicap result
 */
export const calculateMultiFactorHandicap = (player1, player2) => {
  const { difference, weakerPlayer } = calculateSkillDifference(player1, player2);

  // Even match check
  if (difference < THRESHOLD_EVEN_MATCH_SKILL) {
    return {
      type: 'none',
      reason: 'Players are evenly matched across all metrics.',
    };
  }

  const config = METHOD_CONFIG[HANDICAP_METHODS.MULTI_FACTOR];

  // Small to medium difference: points
  if (difference < THRESHOLD_HIGH_SKILL_DIFF) {
    const points = Math.round(difference * SKILL_TO_POINTS_MULTIPLIER);
    return {
      type: 'points',
      weakerPlayer: weakerPlayer.name,
      amount: Math.min(points, config.maxHandicap),
      explanation: `Multi-factor skill difference: ${difference.toFixed(1)} = ${points} points.`,
      method: 'multiFactor',
    };
  }

  // Large difference: marks
  const marksCount = Math.min(
    Math.round(difference * SKILL_TO_MARKS_MULTIPLIER),
    MAX_MARKS
  );
  const numbers = ['20', '19', '18'].slice(0, marksCount);

  return {
    type: 'marks',
    weakerPlayer: weakerPlayer.name,
    amount: 1,
    numbers,
    explanation: `High skill difference: ${difference.toFixed(1)} = 1 mark head start.`,
    method: 'multiFactor',
  };
};
