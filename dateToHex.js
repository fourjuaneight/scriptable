// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: calendar-alt;
const { isoDate } = importModule('dateStd');

const params = args.shortcutParameter;
const date = new Date(params);
const dateHex = isoDate(date).match(/\d{2,4}/g).map(Number).map(char => char.toString(16)).join('');

Script.setShortcutOutput(dateHex);
Script.complete();