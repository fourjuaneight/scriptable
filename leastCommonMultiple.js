const euclideanGCD = importModule('euclideanGCD');

/**
 * Fing lowest common multiple (LCM) or smallest common multiple of two integers
 * @param {number} a
 * @param {number} b
 *
 * @return {number}
 */

const leastCommonMultiple = (a, b) =>
  a === 0 || b === 0 ? 0 : Math.abs(a * b) / euclideanGCD(a, b);

module.exports = leastCommonMultiple;
