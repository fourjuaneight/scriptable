// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: green; icon-glyph: fingerprint;
const uuid = UUID.string();

module.exports = uuid;

Script.setShortcutOutput(uuid);
Script.complete();
