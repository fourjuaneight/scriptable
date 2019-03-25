// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: pink; icon-glyph: filter;
const cont = Pasteboard.paste();
const json = JSON.parse(cont);
let res = {};

for (entry in json) {
  const { resolved_title } = json[entry];
  const { item_id } = json[entry];
  const articles = {[resolved_title]: item_id};
  res = {...res, ...articles};
} 

const pretty = JSON.stringify(res, undefined, 2);
const shortcuts = `shortcuts://`;

Pasteboard.copy(pretty);
Safari.open(shortcuts);
// console.log(pretty);