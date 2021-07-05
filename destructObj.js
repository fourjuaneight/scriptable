// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: magic;
const toCapitalized = importModule("toCapitalized.js");

const params = args.shortcutParameter;
const cap = args.plainTexts[0];
const keyVal = args.plainTexts[1];

const keys = Object.keys(params).sort();
const values = Object.values(params);
let results = {};

switch (true) {
  case Boolean(cap) && Boolean(keyVal):
    results = {
      keys: keys.map((key) => `${toCapitalized(key)} - ${params[key] ? '✅' : '🚫'}`),
      values: values.map((value) => toCapitalized(value)),
    };
    break;
  case Boolean(cap):
    results = {
      keys: keys.map((key) => toCapitalized(key)),
      values: values.map((value) => toCapitalized(value)),
    };
    break;
  case Boolean(keyVal):
    results = {
      keys: keys.map((key) => `${key} - ${params[keys]}`),
      values,
    };
    break;
  default:
    results = {
      keys,
      values,
    };
    break;
}

Script.setShortcutOutput(results);
Script.complete();
