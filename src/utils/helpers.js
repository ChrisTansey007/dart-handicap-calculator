/**
 * General helper functions
 */

/**
 * Generate unique ID
 * @returns {string}
 */
export const generateId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for older browsers
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Deep clone an object
 * @param {Object} obj
 * @returns {Object}
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};
