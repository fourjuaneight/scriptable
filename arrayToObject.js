// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-brown; icon-glyph: project-diagram;
const params = args.shortcutParameter;

/**
 * Convert array to object sorted by given key value.
 * @function
 *
 * @param {array} array raw data source
 * @param {string} key kay-value to re-organize by
 * @returns {object} record by title key
 */
const arrToObj = (array, key = 'title') => {
  const initialValue = {};

  return array.reduce(
    (obj, item) => ({
      ...obj,
      [item[key]]: item,
    }),
    initialValue
  );
};

const results = arrToObj(params.data, params.key);

Script.setShortcutOutput(results);
Script.complete();