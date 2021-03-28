// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-brown; icon-glyph: magic;
const hex = args.shortcutParameter;

// convert hex value to ISO date
const hexDate = hex.replace(
  /(^[a-f0-9]{3})([a-c1-9]{1})([a-f0-9]{1,2}$)/g,
  (match, p1, p2, p3) =>
    `${parseInt(p1, 16)}-${parseInt(p2, 16)}-${parseInt(p3, 16)}`
);

Script.setShortcutOutput(hexDate);
Script.complete();
