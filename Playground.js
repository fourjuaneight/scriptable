// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: vials;
// share-sheet-inputs: url;
const dateSplit = () => {
  const offset = new Date().getTimezoneOffset() * 60000;
  const iso = new Date(Date.now() - offset).toISOString().substring(0, 16).replace(/(T|:)/g, `-`);
  const arrDate = iso.match(/\d{2,4}/g);
  const intArr = arrDate.map(Number);
  const hexArr = [];
  for (const i in intArr) {
    if (Object.prototype.hasOwnProperty.call(intArr, i)) {
      const hexDt = intArr[i].toString(16);
      hexArr.push(hexDt);
    }
  }
  return hexArr.join(``);
};