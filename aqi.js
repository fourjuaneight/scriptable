// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-brown; icon-glyph: helicopter;
// widget code by Jason Snell <jsnell@sixcolors.com>
// based on code by Matt Silverlock
// gradient routine contributed by Rob Silverii
// pretty formatting and functioning by Adam Lickel

const API_URL = "https://www.purpleair.com/json?show=";

// Find a nearby PurpleAir sensor ID via https://fire.airnow.gov/
// Click a sensor near your location: the ID is the trailing integers
// https://www.purpleair.com/json has all sensors by location & ID.
const SENSOR_ID = args.widgetParameter || "12276";

// widget attributes: AQI level threshold, text label, gradient start and end colors, text color
const levelAttributes = [
  {
    endColor: "7e0023",
    label: "Hazardous",
    startColor: "9e2043",
    textColor: "ffffff",
    threshold: 300,
  },
  {
    endColor: "6f1f77",
    label: "Very Unhealthy",
    startColor: "8f3f97",
    textColor: "ffffff",
    threshold: 200,
  },
  {
    endColor: "D60000",
    label: "Unhealthy",
    startColor: "FF3D3D",
    textColor: "000000",
    threshold: 150,
  },
  {
    endColor: "D67200",
    label: "Unhealthy (S.G.)",
    startColor: "FFA63D",
    textColor: "000000",
    threshold: 100,
  },
  {
    endColor: "cccc00",
    label: "Moderate",
    startColor: "ffff00",
    textColor: "000000",
    threshold: 50,
  },
  {
    endColor: "00bb00",
    label: "Good",
    startColor: "00e400",
    textColor: "000000",
    threshold: 0,
  },
];

/**
 * Fetch content from PurpleAir.
 * @function
 *
 * @param {string} url API endpoint
 * @param {string} id sensor ID number
 * @returns {object} senor data
 */
const getSensorData = async (url, id) => {
  const request = new Request(`${url}${id}`);
  const response = await request.loadJSON();

  return {
    adj1: response.results[0].pm2_5_cf_1,
    adj2: response.results[1].pm2_5_cf_1,
    hum: response.results[0].humidity,
    lat: response.results[0].Lat,
    loc: response.results[0].Label,
    lon: response.results[0].Lon,
    ts: response.results[0].LastSeen,
    val: response.results[0].Stats,
  };
};

/**
 * Get level attributes for AQI.
 * @function
 *
 * @param {number} level AQI level
 * @param {object[]} attributes widget attributes
 * @returns {object} AQI attributes
 */
const getLevelAttributes = (level, attributes) => {
  const applicableAttributes = attributes
    .filter((c) => level > c.threshold)
    .sort((a, b) => b.threshold - a.threshold);

  return applicableAttributes[0];
};

/**
 * Function to get the EPA adjusted PPM.
 * @function
 *
 * @param {object} data AQI attributes
 * @returns {number} pollutant PPM
 */
const computePPM = (data) => {
  const adj1 = parseInt(data.adj1, 10);
  const adj2 = parseInt(data.adj2, 10);
  const hum = data.hum ? parseInt(data.hum, 10) : 0;
  const dataAverage = (adj1 + adj2) / 2;

  // Apply EPA draft adjustment for wood smoke and PurpleAir
  // from https://cfpub.epa.gov/si/si_public_record_report.cfm?dirEntryId=349513&Lab=CEMM&simplesearch=0&showcriteria=2&sortby=pubDate&timstype=&datebeginpublishedpresented=08/25/2018

  return 0.524 * dataAverage - 0.0085 * hum + 5.71;
};

/**
 * Function calculating AQI number.
 * @function
 *
 * @param {number} Cp rounded concentration of the pollutant
 * @param {number} IHi AQI value corresponding to BPhi
 * @param {number} Ilo AQI value corresponding to BPLo
 * @param {number} BPHi breakpoint that is greater than or equal to Cp
 * @param {number} BPLo breakpoint that is less than or equal to Cp
 * @returns {number} AQI value
 */
const calcAQI = (Cp, IHi, Ilo, BPHi, BPLo) => {
  const a = IHi - Ilo;
  const b = BPHi - BPLo;
  const c = Cp - BPLo;

  return Math.round((a / b) * c + Ilo);
};

/**
 * Function to get AQI number from PPM reading.
 * @function
 *
 * @param {number} pm pollutant PPM
 * @returns {number|string} AQI extracted from PPM
 */
const AQIFromPM = (pm) => {
  switch (true) {
    case pm > 350.5:
      return calcAQI(pm, 500.0, 401.0, 500.0, 350.5);
    case pm > 250.5:
      return calcAQI(pm, 400.0, 301.0, 350.4, 250.5);
    case pm > 150.5:
      return calcAQI(pm, 300.0, 201.0, 250.4, 150.5);
    case pm > 55.5:
      return calcAQI(pm, 200.0, 151.0, 150.4, 55.5);
    case pm > 35.5:
      return calcAQI(pm, 150.0, 101.0, 55.4, 35.5);
    case pm > 12.1:
      return calcAQI(pm, 100.0, 51.0, 35.4, 12.1);
    case pm >= 0.0:
      return calcAQI(pm, 50.0, 0.0, 12.0, 0.0);
    default:
      return "-";
  }
};

/**
 * Calculates the AQI level based on.
 * resource: https://cfpub.epa.gov/airnow/index.cfm?action=AQIbasics.AQI#unh
 * @function
 *
 * @param {number|string} AQI AQI value
 * @returns {number} AQI base level
 */
const calculateLevel = (AQI) => {
  const level = parseInt(AQI, 10) || 0;
  const baseRes = {
    level: "OK",
    label: "fine",
    startColor: "white",
    endColor: "white",
  };
  let res = baseRes;

  // set attributes
  res = getLevelAttributes(level, levelAttributes);
  // set level
  res.level = level;

  return res;
};

/**
 * Function to get the AQI trends suffix.
 * @function
 *
 * @param {object} stats AQI stats
 * @returns {string} AQI trend
 */
const trendsFromStats = (stats) => {
  const partLive = parseInt(stats.v1, 10);
  const partTime = parseInt(stats.v2, 10);
  const partDelta = partTime - partLive;

  if (partDelta > 5) {
    theTrend = " Improving";
  } else if (partDelta < -5) {
    theTrend = " Worsening";
  } else {
    theTrend = "";
  }

  return theTrend;
};

/**
 * Generate widget.
 * @function
 *
 * @returns {void}
 */
const run = async () => {
  const wg = new ListWidget();
  wg.setPadding(20, 15, 10, 10);

  try {
    // calculate values
    const data = await getSensorData(API_URL, SENSOR_ID);
    const stats = JSON.parse(data.val);
    const theTrend = trendsFromStats(stats);
    const epaPM = computePPM(data);
    const AQI = AQIFromPM(epaPM);
    const level = calculateLevel(AQI);

    // generate widget background
    const AQIText = AQI.toString();
    const startColor = new Color(level.startColor);
    const endColor = new Color(level.endColor);
    const textColor = new Color(level.textColor);
    const gradient = new LinearGradient();
    gradient.colors = [startColor, endColor];
    gradient.locations = [0.0, 1];
    wg.backgroundGradient = gradient;

    // add widget header
    const header = wg.addText("AQI" + theTrend);
    header.textColor = textColor;
    header.font = Font.regularSystemFont(15);

    // add widget content
    const content = wg.addText(AQIText);
    content.textColor = textColor;
    content.font = Font.semiboldRoundedSystemFont(45);

    // add AQI level to widget
    const wordLevel = wg.addText(level.label);
    wordLevel.textColor = textColor;
    wordLevel.font = Font.boldSystemFont(15);

    wg.addSpacer(10);

    // add location to widget
    const location = wg.addText(data.loc);
    location.textColor = textColor;
    location.font = Font.mediumSystemFont(12);

    // add timestamp to widget
    const updatedAt = new Date(data.ts * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const ts = wg.addText(`Updated ${updatedAt}`);
    ts.textColor = textColor;
    ts.font = Font.lightSystemFont(10);

    wg.addSpacer(10);

    // add source url to widget
    const purpleMap =
      "https://www.purpleair.com/map?opt=1/i/mAQI/a10/cC0&select=" +
      SENSOR_ID +
      "#14/" +
      data.lat +
      "/" +
      data.lon;
    wg.url = purpleMap;
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
