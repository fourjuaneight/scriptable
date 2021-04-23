// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: calculator;
/**
 * Default comparison function. It just assumes that "a" and "b" are strings or numbers.
 * @function
 *
 * @param {(string|number)} a
 * @param {(string|number)} b
 * @returns {number}
 */
const compare = (a, b) => {
  if (a === b) {
    return 0;
  }

  return a < b ? -1 : 1;
};

/**
 * Checks if two variables are equal.
 * @function
 *
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
const equal = (a, b) => compare(a, b) === 0;

/**
 * Checks if variable "a" is less than "b".
 * @function
 *
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
const lessThan = (a, b) => compare(a, b) < 0;

/**
 * Checks if variable "a" is less than or equal to "b".
 * @function
 *
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
const lessThanOrEqual = (a, b) => lessThan(a, b) || equal(a, b);

/**
 * Checks if variable "a" is greater than "b".
 * @function
 *
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
const greaterThan = (a, b) => compare(a, b) > 0;

/**
 * Checks if variable "a" is greater than or equal to "b".
 * @function
 *
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */
const greaterThanOrEqual = (a, b) => greaterThan(a, b) || equal(a, b);

exports.compare = compare;
exports.equal = equal;
exports.lessThan = lessThan;
exports.lessThanOrEqual = lessThanOrEqual;
exports.greaterThan = greaterThan;
exports.greaterThanOrEqual = greaterThanOrEqual;
