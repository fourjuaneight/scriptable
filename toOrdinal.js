/**
 * Number to ordinal string. It leverages JS's treatment of indices to an array. If you pass an array an index that’s outside the range, it returns undefined, which is considered false.
 *
 * @param  {number} num
 * @return {string} ordinal number
 */
const toOrdinal = (num) => {
  const str = ["th", "st", "nd", "rd"];
  // returns a negative number when its first operand (the dividend) is negative
  const val = num % 100;
  // returns the value of the first operand if it’s true and the value of the second operand otherwise
  const type = str[(val - 20) % 10] || str[val] || str[0];

  return `${num}${type}`;
};

module.exports = toOrdinal;
