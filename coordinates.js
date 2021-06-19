// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: green; icon-glyph: map-marked;
const roundTo = importModule("roundTo");

const location = await Location.current();
const coordinates = {
  latitude: roundTo(location.latitude, 2),
  longitude: roundTo(location.longitude, 2),
};

module.exports = coordinates;
