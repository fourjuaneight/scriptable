// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-purple; icon-glyph: paint-brush;
const params = args.shortcutParameter;
const response = JSON.parse(params.data);
const category = params.category;
const key = params.key.length > 0 ? params.key : 'url';
const results = response.data[category];

const list = Object.assign(
  {},
  ...results.map(item => ({ [item.title]: item[key] }))
);

Script.setShortcutOutput(JSON.stringify(list, undefined, 2));
Script.complete();
