// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: calendar-alt;
const offset = new Date().getTimezoneOffset() * 60000;
const iso = new Date(Date.now() - offset).toISOString().substring(0, 10);
const arrDate = iso.match(/\d{2,4}/g);
  
const dateSplit = () => {
  const intArr = arrDate.map(Number);
  const hexArr = [];
  for (let i = 0; i < intArr.length; i += 1) {
    const hexDt = intArr[i].toString(16);
    hexArr.push(hexDt);
  }
  return hexArr.join('');
};

const today = dateSplit();