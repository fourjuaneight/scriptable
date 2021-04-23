// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: calculator;
/**
 * Iterative version of Euclidean Algorithm of finding greatest common divisor (GCD)
 * @function
 *
 * @param {number} originalA
 * @param {number} originalB
 * @return {number}
 */
const euclideanGCDIterative = (originalA, originalB) => {
  // Make input numbers positive.
  let a = Math.abs(originalA);
  let b = Math.abs(originalB);

  // Subtract one number from another until both numbers would become the same.
  // This will be out GCD. Also quit the loop if one of the numbers is zero.
  while (a && b && a !== b) {
    [a, b] = a > b ? [a - b, b] : [a, b - a];
  }

  // Return the number that is not equal to zero since the last subtraction (it will be a GCD).
  return a || b;
};

module.exports = euclideanGCDIterative;
