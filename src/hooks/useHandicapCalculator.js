import { useCallback } from 'react';
import { calculateHandicap } from '../services/handicap';

/**
 * Custom hook for handicap calculations
 */
export const useHandicapCalculator = () => {
  const calculate = useCallback((player1, player2, method) => {
    try {
      return calculateHandicap(player1, player2, method);
    } catch (error) {
      console.error('Handicap calculation failed:', error);
      return {
        type: 'none',
        reason: 'Unable to calculate handicap. Please check player data.',
      };
    }
  }, []);

  return { calculate };
};
