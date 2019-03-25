// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: calendar-alt;
var dateSplit = () => {
  const date = new Date()
  const iso = date.toISOString().substring(0, 10);
  const arrDate = iso.match(/\d{2,4}/g)
  const intArr = arrDate.map(Number);
  const hexArr = []
  for (let i=0; i<intArr.length; i++) {
    const hexDt = intArr[i].toString(16);
    hexArr.push(hexDt)
  }
  Pasteboard.copy(hexArr.join(''))
}
dateSplit()