// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: clock;
// share-sheet-inputs: url;
/**
 * Convert Date to ISO.
 * @function
 *
 * @param {Date} date date to convert
 * @returns {string} ISO date string
 */
const isoDate = (date) =>
  new Date(date - date.getTimezoneOffset() * 60000)
    .toISOString()
    .substring(0, 10);

/**
 * Convert Date to ISO.
 * @function
 *
 * @param {Date} date date to convert
 * @returns {string} ISO datetime string
 */
const isoDateTime = (date) =>
  new Date(date - date.getTimezoneOffset() * 60000)
    .toISOString()
    .substring(0, 19);

// convert date to Unix time string
const unixTime = Date.now();

exports.isoDate = isoDate;
exports.isoDateTime = isoDateTime;
exports.unixTime = unixTime;