// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: tree;
const toCapitalized = importModule("toCapitalized.js");

const params = args.shortcutParameter;

const pollenLevel = {
  0: "Good",
  1: "Very Low",
  2: "Low",
  3: "Moderate",
  4: "High",
  5: "Very High",
};

/**
 * Generate pollen level natural language response.
 * @function
 *
 * @param {string} type pollen type
 * @param {string | null} value type index
 * @returns {string} natural laguange pollen level
 */
const getPollenLevel = (type, value) => {
  const level = value ? pollenLevel[value] : null;
  const response = level
    ? `${toCapitalized(type)} pollen is currently ${level}.`
    : "";

  return response;
};

const results = getPollenLevel(params.type, params.value);

Script.setShortcutOutput(results);
Script.complete();
