// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: teal; icon-glyph: compress;
/**
 * Generates all permutations of an array's elements (contains duplicates).
 * @function
 *
 * @param {any[]} arr array of datasets
 * @returns {any[][]} possible permutations
 */
const permutations = (arr) => {
  if (arr.length <= 2) return arr.length === 2 ? [arr, [arr[1], arr[0]]] : arr;

  // combine all permutations in one array
  return arr.reduce(
    (acc, item, i) =>
      acc.concat(
        // combine the element with each partial permutation
        permutations([...arr.slice(0, i), ...arr.slice(i + 1)]).map((val) => [
          item,
          ...val,
        ])
      ),
    []
  );
};

module.exports = permutations;
