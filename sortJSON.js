// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: sort-alpha-down;
const code = args.shortcutParameter;
const objKey = args.plainTexts;

const sortByKey = (json, key) => {
  const sorted = json.sort((a, b) => {
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
