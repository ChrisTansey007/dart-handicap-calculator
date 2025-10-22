import { calculateMultiFactorHandicap } from './multiFactorCalculator';
import { safeParseFloat } from '../../utils';
import { 
  DEFAULT_WIN_RATE, 
  CONSISTENCY_THRESHOLD, 
  WIN_RATE_THRESHOLD,
  METHOD_CONFIG,
  HANDICAP_METHODS 
} from '../../constants';

const CONSISTENCY_WEIGHT = 0.1;
const WIN_RATE_WEIGHT = 0.05;
const MAX_DYNAMIC_ADJUSTMENT = 6;

/**
 * Calculate handicap using advanced dynamic method
 * @param {Object} player1
 * @param {Object} player2
 * @returns {Object} Handicap result
 */
export const calculateAdvancedHandicap = (player1, player2) => {
  // Start with multi-factor base
  let result = calculateMultiFactorHandicap(player1, player2);

  // Calculate consistency and win rate differences
  const consistency1 = safeParseFloat(player1.consistency);
  const consistency2 = safeParseFloat(player2.consistency);
  const consistencyDiff = Math.abs(consistency1 - consistency2);

  const winRate1 = safeParseFloat(player1.winRate, DEFAULT_WIN_RATE);
  const winRate2 = safeParseFloat(player2.winRate, DEFAULT_WIN_RATE);
  const winRateDiff = Math.abs(winRate1 - winRate2);

  // Calculate adjustment
  const adjustment = Math.round(
    consistencyDiff * CONSISTENCY_WEIGHT + 
    winRateDiff * WIN_RATE_WEIGHT
  );

  const config = METHOD_CONFIG[HANDICAP_METHODS.ADVANCED];

  // Handle even match with significant consistency/win rate difference
  if (
    result.type === 'none' &&
    (consistencyDiff > CONSISTENCY_THRESHOLD || winRateDiff > WIN_RATE_THRESHOLD)
  ) {
    const weakerPlayer = winRate1 < winRate2 ? player1 : player2;
    return {
      type: 'points',
      weakerPlayer: weakerPlayer.name,
      amount: Math.min(adjustment, MAX_DYNAMIC_ADJUSTMENT),
      explanation: `Dynamic adjustment: ${adjustment} points from consistency and win rate.`,
      method: 'advanced',
    };
  }

  // Add adjustment to points handicap
  if (result.type === 'points') {
    result.amount = Math.min(result.amount + adjustment, config.maxHandicap);
    result.explanation += ` +${adjustment} from consistency and win rate factors.`;
    result.method = 'advanced';
  }

  return result;
};
