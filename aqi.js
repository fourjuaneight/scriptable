// widget code by Jason Snell <jsnell@sixcolors.com>
// based on code by Matt Silverlock
// gradient routine contributed by Rob Silverii

const API_URL = 'https://www.purpleair.com/json?show=';
// const CACHE_FILE = "aqi_data.json"
// Find a nearby PurpleAir sensor ID via https://fire.airnow.gov/
// Click a sensor near your location: the ID is the trailing integers
// https://www.purpleair.com/json has all sensors by location & ID.
const SENSOR_ID = '30169';

const getSensorData = async (url, id) => {
  const req = new Request(`${url}${id}`);
  const json = await req.loadJSON();

  return {
    adj1: json.results[0].pm2_5_cf_1,
    adj2: json.results[1].pm2_5_cf_1,
    hum: json.results[0].humidity,
    lat: json.results[0].Lat,
    loc: json.results[0].Label,
    lon: json.results[0].Lon,
    ts: json.results[0].LastSeen,
    val: json.results[0].Stats,
  };
};

// Widget attributes: AQI level threshold, text label, gradient start and end colors, text color
const levelAttributes = [
  {
    endColor: '7e0023',
    label: 'Hazardous',
    startColor: '9e2043',
    textColor: 'ffffff',
    threshold: 300,
  },
  {
    endColor: '6f1f77',
    label: 'Very Unhealthy',
    startColor: '8f3f97',
    textColor: 'ffffff',
    threshold: 200,
  },
  {
    endColor: 'D60000',
    label: 'Unhealthy',
    startColor: 'FF3D3D',
    textColor: '000000',
    threshold: 150,
  },
  {
    endColor: 'D67200',
    label: 'Unhealthy (S.G.)',
    startColor: 'FFA63D',
    textColor: '000000',
    threshold: 100,
  },
  {
    endColor: 'cccc00',
    label: 'Moderate',
    startColor: 'ffff00',
    textColor: '000000',
    threshold: 50,
  },
  {
    endColor: '00bb00',
    label: 'Good',
    startColor: '00e400',
    textColor: '000000',
    threshold: 0,
  },
];

// Get level attributes for AQI
const getLevelAttributes = (level, attributes) =>
  attributes
    .filter(c => level > c.threshold)
    .sort((a, b) => b.threshold - a.threshold)[0];

// Calculates the AQI level based on
// https://cfpub.epa.gov/airnow/index.cfm?action=aqibasics.aqi#unh
const calculateLevel = aqi => {
  let res = {
    endColor: 'white',
    label: 'fine',
    level: 'OK',
    startColor: 'white',
  };

  const level = parseInt(aqi, 10) || 0;

  // Set attributes
  res = getLevelAttributes(level, levelAttributes);
  // Set level
  res.level = level;
  return res;
};

//Function to get AQI number from PPM reading
const aqiFromPM = pm => {
  if (pm > 350.5) {
    return calcAQI(pm, 500.0, 401.0, 500.0, 350.5);
  } else if (pm > 250.5) {
    return calcAQI(pm, 400.0, 301.0, 350.4, 250.5);
  } else if (pm > 150.5) {
    return calcAQI(pm, 300.0, 201.0, 250.4, 150.5);
  } else if (pm > 55.5) {
    return calcAQI(pm, 200.0, 151.0, 150.4, 55.5);
  } else if (pm > 35.5) {
    return calcAQI(pm, 150.0, 101.0, 55.4, 35.5);
  } else if (pm > 12.1) {
    return calcAQI(pm, 100.0, 51.0, 35.4, 12.1);
  } else if (pm >= 0.0) {
    return calcAQI(pm, 50.0, 0.0, 12.0, 0.0);
  }
  return '-';
};

//Function that actually calculates the AQI number
const calcAQI = (Cp, Ih, Il, BPh, BPl) => {
  const a = Ih - Il;
  const b = BPh - BPl;
  const c = Cp - BPl;
  return Math.round((a / b) * c + Il);
};

const run = async () => {
  const wg = new ListWidget();
  wg.setPadding(20, 15, 10, 10);
  try {
    console.info(`Using sensor ID: ${SENSOR_ID}`);
    const data = await getSensorData(API_URL, SENSOR_ID);
    console.info(data);
    const stats = JSON.parse(data.val);
    const partLive = parseInt(stats.v1, 10);
    const partTime = parseInt(stats.v2, 10);
    const partDelta = partTime - partLive;

    if (partDelta > 5) {
      theTrend = ' Improving';
    } else if (partDelta < -5) {
      theTrend = ' Worsening';
    } else {
      theTrend = '';
    }

    console.info(theTrend);

    const adj1 = parseInt(data.adj1, 10);
    const adj2 = parseInt(data.adj2, 10);
    const hum = parseInt(data.hum, 10);
    const dataAverage = (adj1 + adj2) / 2;

    // Apply EPA draft adjustment for wood smoke and PurpleAir
    // from https://cfpub.epa.gov/si/si_public_record_report.cfm?dirEntryId=349513&Lab=CEMM&simplesearch=0&showcriteria=2&sortby=pubDate&timstype=&datebeginpublishedpresented=08/25/2018

    const epaPM = 0.524 * dataAverage - 0.0085 * hum + 5.71;

    console.info(epaPM);

    const aqi = aqiFromPM(epaPM);
    const level = calculateLevel(aqi);
    const aqitext = aqi.toString();
    console.info(aqi);
    console.info(level.level);
    const startColor = new Color(level.startColor);
    const endColor = new Color(level.endColor);
    const gradient = new LinearGradient();
    gradient.colors = [startColor, endColor];
    gradient.locations = [0.0, 1];
    console.info(gradient);

    wg.backgroundGradient = gradient;

    const header = wg.addText('AQI' + theTrend);
    header.textColor = new Color(level.textColor);
    header.font = Font.regularSystemFont(15);

    const content = wg.addText(aqitext);
    content.textSize = 45;
    content.textColor = new Color(level.textColor);
    content.font = Font.semiboldRoundedSystemFont(45);

    const wordLevel = wg.addText(level.label);
    wordLevel.textColor = new Color(level.textColor);
    wordLevel.font = Font.boldSystemFont(15);

    const spacerOne = wg.addSpacer(10);

    const id = wg.addText(data.loc);
    id.textColor = new Color(level.textColor);
    id.font = Font.mediumSystemFont(12);

    const updatedAt = new Date(data.ts * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'PST',
    });
    const ts = wg.addText(`Updated ${updatedAt}`);
    ts.textColor = new Color(level.textColor);
    ts.font = Font.lightSystemFont(10);

    const spacerTop = wg.addSpacer();

    const purpleMap =
      'https://www.purpleair.com/map?opt=1/i/mAQI/a10/cC0&select=' +
      SENSOR_ID +
      '#14/' +
      data.lat +
      '/' +
      data.lon;

    wg.url = purpleMap;
  } catch (error) {
    console.error(error);
    const err = wg.addText(`error: ${e}`);
    err.textSize = 10;
    err.textColor = Color.red();
    err.textOpacity = 30;
  }

  wg.presentSmall();
  Script.setWidget(wg);
  Script.complete();
};

await run();
