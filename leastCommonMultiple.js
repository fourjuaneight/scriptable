// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: green; icon-glyph: calculator;
const euclideanGCD = importModule("euclideanGCD");

/**
 * Fing lowest common multiple (LCM) or smallest common multiple of two integers
 * @function
 *
 * @param {number} a
 * @param {number} b
 * @return {number}
 */

const leastCommonMultiple = (a, b) =>
  a === 0 || b === 0 ? 0 : Math.abs(a * b) / euclideanGCD(a, b);

module.exports = leastCommonMultiple;
