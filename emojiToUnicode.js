// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-brown; icon-glyph: meh-blank;
// share-sheet-inputs: url;
const range = importModule("unicodeRange.js");

/**
 * Get the unicode code of an emoji in base 16.
 * @function
 *
 * @param {string} emojiString the string containing emoji characters
 * @returns {string} the unicode code
 */
const convertEmoji = (emojiString) => {
  let comp;

  if (emojiString.length === 1) {
    comp = emojiString.charCodeAt(0);
  }

  comp =
    (emojiString.charCodeAt(0) - 0xd800) * 0x400 +
    (emojiString.charCodeAt(1) - 0xdc00) +
    0x10000;

  if (comp < 0) {
    comp = emojiString.charCodeAt(0);
  }

  // get the unicode code of an emoji in base 16
  comp = `U+${comp.toString(16)}`;

  return comp;
};

/**
 * Takes a string and replaces unicode
 * @function
 *
 * @param {string} tweet tweet string with emojies
 * @return {string} tweet with unicode emojies
 */
const emojiUnicode = (tweet) =>
  tweet.replace(range, (p1) => `${convertEmoji(p1)}`);

module.exports = emojiUnicode;
