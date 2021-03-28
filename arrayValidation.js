// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: check-double;
const params = args.shortcutParameter;

// filter out falsy values
const validate = (val) => val;
const isValid = params.every(validate);

Script.setShortcutOutput(isValid);
Script.complete();
