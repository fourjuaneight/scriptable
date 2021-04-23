// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: sort-alpha-down;
const code = args.shortcutParameter;
const objKey = args.plainTexts;

/**
 * Sort object by key.
 * @function
 *
 * @param {object} obj object to sort
 * @param {string} key key to sort by
 * @returns {object} sorted object
 */
const sortByKey = (obj, key) => {
  const sorted = obj.sort((a, b) => {
    const x = a[key];
    const y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });

  return sorted;
};

const uglyJSON = sortByKey(code, objKey);
const pretty = JSON.stringify(uglyJSON, undefined, 2);

Script.setShortcutOutput(pretty);
Script.complete();
