import { calculateMPRHandicap } from './mprCalculator';
import { calculateMultiFactorHandicap } from './multiFactorCalculator';
import { calculateAdvancedHandicap } from './advancedCalculator';
import { HANDICAP_METHODS } from '../../constants';

/**
 * Main handicap calculator - routes to appropriate method
 * @param {Object} player1
 * @param {Object} player2
 * @param {string} method
 * @returns {Object} Handicap result
 */
export const calculateHandicap = (player1, player2, method) => {
  if (!player1 || !player2) {
    throw new Error('Both players are required for handicap calculation');
  }

  switch (method) {
    case HANDICAP_METHODS.MPR:
      return calculateMPRHandicap(player1, player2);
    
    case HANDICAP_METHODS.MULTI_FACTOR:
      return calculateMultiFactorHandicap(player1, player2);
    
    case HANDICAP_METHODS.ADVANCED:
      return calculateAdvancedHandicap(player1, player2);
    
    default:
      throw new Error(`Unknown handicap method: ${method}`);
  }
};
