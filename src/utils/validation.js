import { VALIDATION_RULES } from '../constants';

/**
 * Validate player name
 * @param {string} name
 * @returns {Object} { isValid: boolean, error: string }
 */
export const validatePlayerName = (name) => {
  if (!name || name.trim().length === 0) {
    return { isValid: false, error: 'Player name is required' };
  }
  if (name.length > 50) {
    return { isValid: false, error: 'Player name must be less than 50 characters' };
  }
  return { isValid: true, error: null };
};

/**
 * Validate numeric field against rules
 * @param {number} value
 * @param {string} field
 * @returns {Object}
 */
export const validateNumericField = (value, field) => {
  const rules = VALIDATION_RULES[field];
  if (!rules) {
    return { isValid: true, error: null };
  }

  const num = parseFloat(value);
  if (isNaN(num)) {
    return { isValid: false, error: `${field} must be a number` };
  }
  if (num < rules.min || num > rules.max) {
    return { 
      isValid: false, 
      error: `${field} must be between ${rules.min} and ${rules.max}` 
    };
  }
  return { isValid: true, error: null };
};

/**
 * Validate entire player object
 * @param {Object} player
 * @returns {Object} { isValid: boolean, errors: Array }
 */
export const validatePlayer = (player) => {
  const errors = [];
  
  const nameValidation = validatePlayerName(player.name);
  if (!nameValidation.isValid) {
    errors.push(nameValidation.error);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
