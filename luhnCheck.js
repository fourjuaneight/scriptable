// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: teal; icon-glyph: id-card;
/**
 * Implementation of the Luhn Algorithm used to validate a variety of identification numbers, such as credit card numbers, IMEI numbers, National Provider Identifier numbers etc.
 * @function
 *
 * @param {number | string} num
 * @returns {boolean} true if sum is divisible by 10, false otherwise
 */
const luhnCheck = num => {
  // obtain array of digits
  const arr = (num + '')
    .split('')
    .reverse()
    .map(x => parseInt(x));
  // obtain last digit
  const lastDigit = arr.splice(0, 1)[0];
  // implement algorith
  let sum = arr.reduce(
    (acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val * 2) % 9) || 9),
    0,
  );

  sum += lastDigit;

  return sum % 10 === 0;
};

module.exports = luhnCheck;
