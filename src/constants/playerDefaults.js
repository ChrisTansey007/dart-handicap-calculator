/**
 * Standard cricket numbers in dart games
 */
export const DART_NUMBERS = ['20', '19', '18', '17', '16', '15', 'bull'];

/**
 * Empty closing speed object structure
 */
export const EMPTY_CLOSING_SPEED = {
  '20': '',
  '19': '',
  '18': '',
  '17': '',
  '16': '',
  '15': '',
  'bull': '',
};

/**
 * Empty accuracy object structure
 */
export const EMPTY_ACCURACY = {
  '20': '',
  '19': '',
  '18': '',
  '17': '',
  '16': '',
  '15': '',
  'bull': '',
};

/**
 * Empty player template
 */
export const EMPTY_PLAYER = {
  name: '',
  mpr: '',
  closingSpeed: { ...EMPTY_CLOSING_SPEED },
  accuracy: { ...EMPTY_ACCURACY },
  pointsPerTurn: '',
  consistency: '',
  winRate: '',
};

/**
 * Default values
 */
export const DEFAULT_WIN_RATE = 50;
export const DEFAULT_CONSISTENCY = 0;
