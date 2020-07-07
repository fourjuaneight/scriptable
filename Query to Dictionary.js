// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-purple; icon-glyph: paint-brush;
const params = args.shortcutParameter;
const response = JSON.parse(params.data);
const category = params.category;
const key = params.key.length > 0 ? params.key : "url";

// extract fields dictionary inside each object
const fields = response.records.map((record) => record.fields);
// create object with title as the key and url (or other specified param) as the value
const list = Object.assign(
  {},
  ...fields.map((item) => ({ [item.title]: item[key] }))
);

Script.setShortcutOutput(JSON.stringify(list, undefined, 2));
Script.complete();
