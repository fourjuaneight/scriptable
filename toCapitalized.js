// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: angle-double-up;
/**
 * Turns first letter of a string to uppercase, capitalizing the string
 * @function
 *
 * @param   {string} str word to capitalized
 *
 * @returns {string} capitalized word
 */
const toCapitalized = (str) => {
  if (str && typeof str === "string") {
    return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
  }

  return str;
};

module.exports = toCapitalized;
