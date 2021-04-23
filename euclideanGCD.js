// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: calculator;
/**
 * Recursive version of Euclidean Algorithm of finding greatest common divisor (GCD).
 * @function
 *
 * @param {number} originalA
 * @param {number} originalB
 * @return {number}
 */
const euclideanGCD = (originalA, originalB) => {
  // Make input numbers positive.
  const a = Math.abs(originalA);
  const b = Math.abs(originalB);

  // To make algorithm work faster instead of subtracting one number from the other
  // we may use modulo operation.
  return b === 0 ? a : euclideanGCD(b, a % b);
};

module.exports = euclideanGCD;
