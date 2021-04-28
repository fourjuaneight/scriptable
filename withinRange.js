// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: calculator;
const { hour, start, end } = args.shortcutParameter;
const txtParams = args.plainTexts;
const reverse =
  txtParams.length > 0 ? (txtParams[0] === "reverse" ? true : false) : false;


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

const results = reverse
  ? !between(hour, start, end)
  : between(hour, start, end);

Script.setShortcutOutput(results);
Script.complete();
