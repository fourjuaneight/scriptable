// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-brown; icon-glyph: helicopter;
// widget code by Jason Snell <jsnell@sixcolors.com>
// based on code by Matt Silverlock
// gradient routine contributed by Rob Silverii
// pretty formatting and functioning by Adam Lickel
const getAirData = importModule("getAirData");
const roundTo = importModule("roundTo");
const toCapitalized = importModule("toCapitalized");

// Get AQI data by plant type.
const aqiData = async () => {
  const location = await Location.current();
  const coordinates = {
    latitude: roundTo(location.latitude, 2),
    longitude: roundTo(location.longitude, 2),
  };
  const data = await getAirData(coordinates.latitude, coordinates.longitude);
  const aqi = data.aqi.indexes.baqi;

  return {
    timestamp: data.aqi.datetime,
    ...aqi,
    severity: aqi.category
      .split(" ")
      .map((str) => toCapitalized(str))
      .join(" "),
  };
};

// Generate widget.
const run = async () => {
  const wg = new ListWidget();
  wg.setPadding(20, 15, 10, 10);

  try {
    // calculate values
    const data = await aqiData();

    // generate widget background
    const index = data.aqi.toString();
    const textColor = new Color("000000");
    const bgColor = new Color(data.color);
    wg.backgroundColor = bgColor;

    // add widget header
    const header = wg.addText("AQI");
    header.textColor = textColor;
    header.font = Font.regularSystemFont(15);

    // add AQI to widget
    const content = wg.addText(index);
    content.textColor = textColor;
    content.font = Font.semiboldRoundedSystemFont(45);

    // add AQ severity to widget
    const wordLevel = wg.addText(data.severity);
    wordLevel.textColor = textColor;
    wordLevel.font = Font.boldSystemFont(15);

    wg.addSpacer(10);

    // add dominant pollutant to widget
    const allergen = wg.addText(`Dominant: ${data.dominant_pollutant.toUpperCase()}`);
    allergen.textColor = textColor;
    allergen.font = Font.mediumSystemFont(12);

    // add timestamp to widget
    const updatedAt = new Date(data.timestamp).toLocaleTimeString([], {
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
