// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: green; icon-glyph: calculator;
/**
 * Calculate fibonacci number at specific position using Dynamic Programming approach
 * @function
 *
 * @param {number} num
 * @return {number}
 */
const fibonacciNth = (num) => {
  let currentValue = 1;
  let previousValue = 0;

  if (num === 1) {
    return 1;
  }

  let iterationsCounter = num - 1;

  while (iterationsCounter) {
    currentValue += previousValue;
    previousValue = currentValue - previousValue;

    iterationsCounter -= 1;
  }

  return currentValue;
};

module.exports = fibonacciNth;
