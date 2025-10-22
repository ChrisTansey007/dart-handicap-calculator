/**
 * Pure utility functions for formatting data
 */

/**
 * Format number to fixed decimal places
 * @param {number} value
 * @param {number} decimals
 * @returns {string}
 */
export const formatDecimal = (value, decimals = 2) => {
  return parseFloat(value).toFixed(decimals);
};

/**
 * Format percentage
 * @param {number} value
 * @returns {string}
 */
export const formatPercentage = (value) => {
  return `${Math.round(value)}%`;
};

/**
 * Format player skill level
 * @param {number} skillLevel
 * @returns {string}
 */
export const formatSkillLevel = (skillLevel) => {
  return skillLevel.toFixed(2);
};
