// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-brown; icon-glyph: stream;
const params = args.shortcutParameter;

/**
 * Diff two arrays of objects by key.
 * @function
 *
 * @param {array} arr1 first array to compare
 * @param {array} arr2 second array to comprare
 * @param {string} key objecy key (in arrays) to compare against
 * @returns {array} diff between two arrays
 */
const diffArrays = (arr1, arr2, key) =>
  arr1.filter((item1) => !arr2.some((item2) => item1[key] === item2[key]));

const results = diffArrays(params.data.arr1, params.data.arr2, params.key);

Script.setShortcutOutput(results);
Script.complete();
