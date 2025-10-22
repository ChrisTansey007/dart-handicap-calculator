/**
 * Pure utility functions for calculations
 */

/**
 * Calculate average of numeric values in an object
 * @param {Object} obj - Object containing numeric values
 * @returns {number} - Average of all valid numeric values
 */
export const calculateAverage = (obj) => {
  if (!obj || typeof obj !== 'object') return 0;
  
  const values = Object.values(obj)
    .map((v) => parseFloat(v) || 0)
    .filter((v) => v > 0);
  
  return values.length > 0 
    ? values.reduce((sum, val) => sum + val, 0) / values.length 
    : 0;
};

/**
 * Safely parse float with fallback
 * @param {*} value - Value to parse
 * @param {number} defaultValue - Default if parsing fails
 * @returns {number}
 */
export const safeParseFloat = (value, defaultValue = 0) => {
  const parsed = parseFloat(value);
  return isNaN(parsed) ? defaultValue : parsed;
};

/**
 * Clamp value between min and max
 * @param {number} value - Value to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number}
 */
export const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Round to specified decimal places
 * @param {number} value - Value to round
 * @param {number} decimals - Number of decimal places
 * @returns {number}
 */
export const roundTo = (value, decimals = 2) => {
  const multiplier = Math.pow(10, decimals);
  return Math.round(value * multiplier) / multiplier;
};
