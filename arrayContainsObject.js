// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: glasses;
const objectsEqual = importModule("objectsEqual.js");
const params = args.shortcutParameter;

/**
 * Determine if object is found in given array.
 * @function
 *
 * @param {array} arr array to lookup against
 * @param {object} obj object to search for
 * @returns {boolean} is obj in array
 */
const objInArr = (arr, obj) =>
  arr.some(elem => objectsEqual.deep(elem, obj));

const results = objInArr(params.data, params.object);

Script.setShortcutOutput(results);
Script.complete();
