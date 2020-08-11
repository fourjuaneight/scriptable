// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: green; icon-glyph: calculator;
/**
 * Check if number is prime
 *
 * @param {number} num
 *
 * @return {boolean}
 */
const primality = num => {
  // Check if num is integer.
  if (num % 1 !== 0) {
    return false;
  }

  if (num <= 1) {
    // If num is less than one then it isn't prime by definition.
    return false;
  }

  if (num <= 3) {
    // All nums from 2 to 3 are prime.
    return true;
  }

  // If the num is not divided by 2 then we may eliminate all further even dividers.
  if (num % 2 === 0) {
    return false;
  }

  // If there is no dividers up to square root of n then there is no higher dividers as well.
  const dividerLimit = Math.sqrt(num);
  for (let divider = 3; divider <= dividerLimit; divider += 2) {
    if (num % divider === 0) {
      return false;
    }
  }

  return true;
};

module.exports = primality;
