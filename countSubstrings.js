// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: teal; icon-glyph: glasses;
/**
 * Counts the occurrences of a substring in a given string.
 * @function
 * 
 * @param {string} str string to search
 * @param {string} searchValue value to search for
 * @returns {number} found occurrences
 */
const countSubstrings = (str, searchValue) => {
  let count = 0;
  let index = 0;

  while (true) {
    // look for searchValue in str
    const round = str.indexOf(searchValue, index);

    if (round !== -1) {
      // increment if the value is found and update the inde
      [count, index] = [count + 1, round + 1];
    } else {
      return count
    };
  }
};

module.exports = countSubstrings;
