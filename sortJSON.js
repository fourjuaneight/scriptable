// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: filter;
const cont = Pasteboard.paste();
const json = JSON.parse(cont)
const { records } = json;

const sortByKey = (array, key) => {
  const arr = array.sort((a, b) => {
    const x = a[key];
    const y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });
  return JSON.stringify(arr);
};

const sorted = sortByKey(records, 'Category');
const objected = `{"records":${sorted}}`;
const parsed = JSON.parse(objected);
const pretty = JSON.stringify(parsed, undefined, 2);
const shortcuts = 'shortcuts://';

Pasteboard.copy(pretty);
Safari.open(shortcuts);
// console.log(pretty)