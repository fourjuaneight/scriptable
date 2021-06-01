// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: ellipsis-h;
/**
 * Creates an array of numbers in the arithmetic progression, starting with the given positive integer and up to the specified limit.
 * @function
 * 
 * @param {number} number
 * @param {number} limit
 * @returns {number[]}
 */
const arithmeticProgression = (number, limit) =>
  Array.from(
    // create an array of the desired length
    { length: Math.ceil(limit / number) },
    // fill it with the desired values in the given range
    (_, index) => (index + 1) * number
  );

module.exports = arithmeticProgression;
