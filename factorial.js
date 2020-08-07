/**
 * Find a numbers factorial
 *
 * @param {number} num
 *
 * @return {number}
 */
const factorial = num => {
  let result = 1;

  for (let i = 2; i <= num; i += 1) {
    result *= i;
  }

  return result;
};

module.exports = factorial;
