// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: calendar-minus;
const { isoDate } = importModule("dateStd");
const baseDate = args.shortcutParameter;

// convert date to hex value
const date = new Date(baseDate);
const dateHex = isoDate(date)
  .match(/\d{2,4}/g)
  .map(Number)
  .map((char) => char.toString(16))
  .join("");

Script.setShortcutOutput(dateHex);
Script.complete();
