// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-brown; icon-glyph: bath;
const params = args.shortcutParameter;

const cleanTitle = params.title
  .replace(/(["':]+)/g, "\\$1")
  .replace(/([,]+)/g, "\\$1");
const results = {
  ...params,
  title: cleanTitle,
};

Script.setShortcutOutput(results);
Script.complete();
