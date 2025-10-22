import { calculateAverage, safeParseFloat } from '../../utils';

/**
 * Skill weight configuration
 */
const SKILL_WEIGHTS = {
  MPR: 0.4,
  CLOSING_SPEED: 0.3,
  ACCURACY: 0.2,
  POINTS_PER_TURN: 0.1,
};

const MAX_CLOSING_SPEED = 8;

/**
 * Calculate player's overall skill level
 * @param {Object} player - Player object
 * @returns {number} - Calculated skill level
 */
export const calculateSkillLevel = (player) => {
  if (!player) return 0;

  const mpr = safeParseFloat(player.mpr);
  const avgClosingSpeed = calculateAverage(player.closingSpeed || {});
  const avgAccuracy = calculateAverage(player.accuracy || {});
  const pointsPerTurn = safeParseFloat(player.pointsPerTurn);

  const skill =
    mpr * SKILL_WEIGHTS.MPR +
    Math.max(0, MAX_CLOSING_SPEED - avgClosingSpeed) * SKILL_WEIGHTS.CLOSING_SPEED +
    avgAccuracy * SKILL_WEIGHTS.ACCURACY +
    pointsPerTurn * SKILL_WEIGHTS.POINTS_PER_TURN;

  return skill;
};

/**
 * Calculate skill difference between two players
 * @param {Object} player1
 * @param {Object} player2
 * @returns {Object} { difference: number, strongerPlayer: Object, weakerPlayer: Object }
 */
export const calculateSkillDifference = (player1, player2) => {
  const skill1 = calculateSkillLevel(player1);
  const skill2 = calculateSkillLevel(player2);
  const difference = Math.abs(skill1 - skill2);

  return {
    difference,
    strongerPlayer: skill1 > skill2 ? player1 : player2,
    weakerPlayer: skill1 > skill2 ? player2 : player1,
  };
};
