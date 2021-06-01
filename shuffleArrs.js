// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: mortar-pestle;
/**
 * Randomizes the order of the values of an array, returning a new array.
 * Uses Fisher-Yates algorithm.
 * @function
 * 
 * @param {any[]} array
 * @returns {any[]} shuffled array
 */
const shuffleArrs = ([...arr]) => {
  let match = arr.length;

  while (match) {
    const index = Math.floor(Math.random() * match--);

    [arr[match], arr[index]] = [arr[index], arr[match]];
  }

  return arr;
};

module.exports = shuffleArrs;
