// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: search-minus;
const { equal } = importModule("comparison");

/**
 * Linear search implementation.
 * @function
 *
 * @param {*[]} array
 * @param {*} seekElement
 * @return {number[]}
 */
const linearSearch = (array, seekElement) => {
  const foundIndices = [];

  array.forEach((element, index) => {
    if (equal(element, seekElement)) {
      foundIndices.push(index);
    }
  });

  return foundIndices;
};

module.exports = linearSearch;
