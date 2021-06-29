// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-brown; icon-glyph: tree;
const getAirData = importModule("getAirData");
const roundTo = importModule("roundTo");
const toCapitalized = importModule("toCapitalized");

/**
 * Get average from array of numbers.
 * @function
 *
 * @param {number[]} arr
 * @returns {number} average value
 */
const arrAvg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

// Get pollen data by plant type.
const pollenData = async () => {
  const location = await Location.current();
  const coordinates = {
    latitude: roundTo(location.latitude, 2),
    longitude: roundTo(location.longitude, 2),
  };
  const data = await getAirData(coordinates.latitude, coordinates.longitude);

  return {
    timestamp: data.pollen.date,
    types: data.pollen.types,
  };
};

// Get average pollen data.
const pollenDetails = async () => {
  const data = await pollenData();
  const keys = Object.keys(data.types);
  const inSeason = keys
    .filter((type) => Boolean(data.types[type].index.value))
    .map((type) => ({ ...data.types[type].index, type }));

  if (inSeason.length) {
    const values = inSeason.map((allergen) => allergen.value);
    const topAllergen = inSeason.sort((a, b) =>
      a.value > b.value ? 1 : -1
    )[0];
    const average = values.length === 1 ? values[0] : arrAvg(values);

    return {
      timestamp: data.timestamp,
      average,
      severity: topAllergen.category,
      color: topAllergen.color.replace("#", ""),
      dominant_allergen: toCapitalized(topAllergen.type),
    };
  }

  return null;
};

// Generate widget.
const run = async () => {
  const wg = new ListWidget();
  wg.setPadding(20, 15, 10, 10);

  try {
    // calculate values
    const data = await pollenDetails();

    // generate widget background
    const index = data ? data.average.toString() : "0";
    const textColor = new Color(data ? "000000" : "FFFFFF");
    const bgColor = new Color(data ? data.color : "0B0D0F");
    wg.backgroundColor = bgColor;

    if (data) {
      // add widget header
    const header = wg.addText("Pollen");
    header.textColor = textColor;
    header.font = Font.regularSystemFont(15);

      // add pollen index to widget
      const content = wg.addText(index);
      content.textColor = textColor;
      content.font = Font.semiboldRoundedSystemFont(45);

      // add pollen severity to widget
      const wordLevel = wg.addText(data.severity);
      wordLevel.textColor = textColor;
      wordLevel.font = Font.boldSystemFont(15);

      wg.addSpacer(10);

      // add dominant allergen to widget
      const allergen = wg.addText(`Dominant: ${data.dominant_allergen}`);
      allergen.textColor = textColor;
      allergen.font = Font.mediumSystemFont(12);
    } else {
      const wordLevel = wg.addText("No Pollen Data Available");
      wordLevel.textColor = textColor;
      wordLevel.font = Font.boldSystemFont(15);
  
      wg.addSpacer(60);
    }

    // add timestamp to widget
    const date = data ? new Date(data.timestamp) : new Date();
    const updatedAt = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const ts = wg.addText(`Updated ${updatedAt}`);
    ts.textColor = textColor;
    ts.font = Font.lightSystemFont(10);

    wg.addSpacer(10);
  } catch (e) {
    console.error(e);

    // add error to widget
    const err = wg.addText(`${e}`);
    err.textColor = Color.red();
    err.textOpacity = 30;
    err.font = Font.regularSystemFont(10);
  }

  if (config.runsInApp) {
    wg.presentSmall();
  }

  Script.setWidget(wg);
  Script.complete();
};

await run();
