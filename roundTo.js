// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-brown; icon-glyph: magic;
/**
 * Safe number trimming. toFixed alternative, which will round up or down for you depending on the values beyond 2 decimals.
 * @function
 *
 * @param   {number} num number to trim
 * @param   {number} dig amount of digits trimmed to
 *
 * @return  {number} trimmed value
 */
const roundTo = (num, dig) => {
  let negative = false;
  let number = num;
  let digits = dig;

  if (dig === undefined) {
    digits = 0;
  }

  if (num < 0) {
    negative = true;
    number *= -1;
  }

  const multiplicator = 10 ** digits;
  number = parseFloat((number * multiplicator).toFixed(11));
  number = (Math.round(number) / multiplicator).toFixed(digits);

  if (negative) {
    number = (number * -1).toFixed(digits);
  }

  return parseFloat(number);
};

module.exports = roundTo;
