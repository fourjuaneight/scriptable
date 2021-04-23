// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: magic;
const params = args.shortcutParameter;

const keys = Object.keys(params);
const values = Object.values(params);
const results = { keys, values };

Script.setShortcutOutput(results);
Script.complete();