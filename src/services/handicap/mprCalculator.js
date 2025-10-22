import { safeParseFloat } from '../../utils';
import { THRESHOLD_EVEN_MATCH_MPR, METHOD_CONFIG, HANDICAP_METHODS } from '../../constants';

/**
 * Calculate handicap using MPR method
 * @param {Object} player1
 * @param {Object} player2
 * @returns {Object} Handicap result
 */
export const calculateMPRHandicap = (player1, player2) => {
  const mpr1 = safeParseFloat(player1.mpr);
  const mpr2 = safeParseFloat(player2.mpr);
  const difference = mpr1 - mpr2;

  // Even match check
  if (Math.abs(difference) < THRESHOLD_EVEN_MATCH_MPR) {
    return {
      type: 'none',
      reason: 'Players are very evenly matched on MPR.',
    };
  }

  const config = METHOD_CONFIG[HANDICAP_METHODS.MPR];
  const handicapPoints = Math.round(Math.abs(difference) * config.multiplier);
  const weakerPlayer = difference < 0 ? player1 : player2;

  return {
    type: 'points',
    weakerPlayer: weakerPlayer.name,
    amount: Math.min(handicapPoints, config.maxHandicap),
    explanation: `${Math.abs(difference).toFixed(1)} MPR difference × ${config.multiplier} = ${handicapPoints} points.`,
    method: 'mpr',
  };
};
