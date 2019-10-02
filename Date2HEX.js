// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: calendar-alt;
const offset = new Date().getTimezoneOffset() * 60000;
const iso = new Date(Date.now() - offset).toISOString().substring(0, 10);
const arrDate = iso.match(/\d{2,4}/g);
const intArr = arrDate.map(Number);
const hexArr = [];

for (let i in intArr) {
  if (Object.prototype.hasOwnProperty.call(intArr, i)) {
    const hexDt = intArr[i].toString(16);
    hexArr.push(hexDt);
  }
}
const dateHex = hexArr.join(``);

Script.setShortcutOutput(dateHex);
Script.complete();