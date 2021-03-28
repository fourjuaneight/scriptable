// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: green; icon-glyph: calculator;
const { hour, start, end } = args.shortcutParameter;

/**
 * Is given value between provided range.
 * @function
 *
 * @param {number} num evaluating value
 * @param {number} min starting value
 * @param {number} max ending value
 * @returns {boolean} is given value in the range
 */
const between = (num, min, max) => num >= min && num <= max;

Script.setShortcutOutput(between(hour, start, end));
Script.complete();
