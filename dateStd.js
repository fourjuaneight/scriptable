// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-brown; icon-glyph: clock;
// share-sheet-inputs: url;
const isoDate = date => new Date(date - (date.getTimezoneOffset() * 60000)).toISOString().substring(0, 10);

const isoDateTime = date => new Date(date - (date.getTimezoneOffset() * 60000)).toISOString().substring(0, 19);

const unixTime = Date.now();

module.exports = {
  isoDate,
  isoDateTime,
  unixTime,
};