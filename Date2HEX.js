// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: calendar-alt;
module.exports.dateSplit = () => {
  const offset = new Date().getTimezoneOffset() * 60000;
  const iso = new Date(Date.now() - offset).toISOString().substring(0, 10);
  const arrDate = iso.match(/\d{2,4}/g);
  const intArr = arrDate.map(Number);
  const hexArr = [];
  for (i in intArr) {
    const hexDt = intArr[i].toString(16);
    hexArr.push(hexDt);
  }
  return hexArr.join('');
};
