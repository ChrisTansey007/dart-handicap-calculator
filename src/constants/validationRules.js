/**
 * Validation rules for player statistics
 */
export const VALIDATION_RULES = {
  MPR: {
    min: 0,
    max: 9,
    step: 0.1,
  },
  CLOSING_SPEED: {
    min: 0,
    max: 20,
    step: 0.1,
  },
  ACCURACY: {
    min: 0,
    max: 100,
    step: 1,
  },
  POINTS_PER_TURN: {
    min: 0,
    max: 50,
    step: 0.1,
  },
  CONSISTENCY: {
    min: 0,
    max: 100,
    step: 1,
  },
  WIN_RATE: {
    min: 0,
    max: 100,
    step: 1,
  },
};

/**
 * Thresholds for handicap calculations
 */
export const THRESHOLD_EVEN_MATCH_MPR = 0.2;
export const THRESHOLD_EVEN_MATCH_SKILL = 0.5;
export const THRESHOLD_HIGH_SKILL_DIFF = 1.5;

/**
 * Threshold for dynamic adjustments
 */
export const CONSISTENCY_THRESHOLD = 15;
export const WIN_RATE_THRESHOLD = 20;
