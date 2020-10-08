// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: clock;
// share-sheet-inputs: url;
const { unixTime } = importModule('dateStd');

Script.setShortcutOutput(unixTime);
Script.complete();
