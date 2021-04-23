// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: calculator;
/**
 * Find a numbers factorial
 * @function
 *
 * @param {number} num
 * @return {number}
 */
const factorial = (num) => {
  let result = 1;

  for (let i = 2; i <= num; i += 1) {
    result *= i;
  }

  return result;
};

module.exports = factorial;
