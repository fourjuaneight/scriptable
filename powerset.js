// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: teal; icon-glyph: couch;
/**
 * Get the powerset of a given array of numbers.
 * @function
 * 
 * @param {number[]} arr dataset
 * @returns {number[]][] | any[][]}
 */
const powerset = (arr) =>
  // iterate over elements and combine into an array containing all combinations
  arr.reduce((a, v) => a.concat(a.map((r) => [v].concat(r))), [[]]);

module.exports = powerset
