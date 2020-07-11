// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: meh-blank;
// share-sheet-inputs: url;
const regex = importModule('unicodeRange.js');
const params = args.shortcutParameter;

const emojiUnicode = emoji => {
  let comp;

  if (emoji.length === 1) comp = emoji.charCodeAt(0);

  comp =
    (emoji.charCodeAt(0) - 0xd800) * 0x400 +
    (emoji.charCodeAt(1) - 0xdc00) +
    0x10000;

  if (comp < 0) comp = emoji.charCodeAt(0);

  comp = `U+${comp.toString('16')}`;

  return comp;
};

const clean = str => str.replace(regex, p1 => `${emojiUnicode(p1)}`);

Script.setShortcutOutput(clean(params));
Script.complete();

module.exports = clean;