// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: spinner;
/**
 * Initializes an array containing the numbers in the specified range where start and end are inclusive and the ratio between two terms is step.
 * @function
 * 
 * @param {number} end
 * @param {number} start
 * @param {number} step
 * @returns {number[]}
 */
const geometricProgression = (end, start = 1, step = 2) =>
  // create an array of the desired length
  Array.from({
    length: Math.floor(Math.log(end / start) / Math.log(step)) + 1,
    // fill with the desired values in a rang
  }).map((_, index) => start * step ** index);

module.exports = geometricProgression;
