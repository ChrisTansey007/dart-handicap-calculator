import { Calculator, Target, Trophy } from 'lucide-react';

/**
 * Handicap calculation method identifiers
 */
export const HANDICAP_METHODS = {
  MPR: 'mpr',
  MULTI_FACTOR: 'multiFactor',
  ADVANCED: 'advanced',
};

/**
 * Configuration for each handicap calculation method
 */
export const METHOD_CONFIG = {
  [HANDICAP_METHODS.MPR]: {
    id: HANDICAP_METHODS.MPR,
    name: 'MPR-Based',
    description: 'Simple calculation using only MPR',
    inputs: ['mpr'],
    icon: Calculator,
    difficulty: 'Beginner',
    maxHandicap: 15,
    multiplier: 3.5,
  },
  [HANDICAP_METHODS.MULTI_FACTOR]: {
    id: HANDICAP_METHODS.MULTI_FACTOR,
    name: 'Multi-Factor',
    description: 'Uses MPR, closing speed, accuracy, and points per turn',
    inputs: ['mpr', 'closingSpeed', 'accuracy', 'pointsPerTurn'],
    icon: Target,
    difficulty: 'Intermediate',
    maxHandicap: 12,
  },
  [HANDICAP_METHODS.ADVANCED]: {
    id: HANDICAP_METHODS.ADVANCED,
    name: 'Advanced Dynamic',
    description: 'Includes consistency and win rate for adaptive results',
    inputs: ['mpr', 'closingSpeed', 'accuracy', 'pointsPerTurn', 'consistency', 'winRate'],
    icon: Trophy,
    difficulty: 'Expert',
    maxHandicap: 18,
  },
};
