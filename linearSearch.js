const { equal } = importModule('comparison');

/**
 * Linear search implementation.
 *
 * @param {*[]} array
 * @param {*} seekElement
 * @return {number[]}
 */
export default function linearSearch(array, seekElement) {
  const foundIndices = [];

  array.forEach((element, index) => {
    if (equal(element, seekElement)) {
      foundIndices.push(index);
    }
  });

  return foundIndices;
}
