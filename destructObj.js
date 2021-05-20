// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: magic;
const toCapitalized = importModule("toCapitalized.js");

const params = args.shortcutParameter;
const cap = args.plainTexts[0];

const keys = Object.keys(params).sort();
const values = Object.values(params);
let results = { keys, values };

if (Boolean(cap)) {
  results = {
    keys: keys.map(key => toCapitalized(key)),
    values: values.map(value => toCapitalized(value))
  }
}

Script.setShortcutOutput(results);
Script.complete();