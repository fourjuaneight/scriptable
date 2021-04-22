// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-brown; icon-glyph: sign-in-alt;
const params = args.shortcutParameter;

const results = JSON.parse(params);

Script.setShortcutOutput(results);
Script.complete();
