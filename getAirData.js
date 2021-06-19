// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: purple; icon-glyph: air-freshener;

/**
 * Get air data from coordinates.
 * @function
 *
 * @param {number} lat
 * @param {number} long
 * @returns {object} Breezometer AQI and Pollen data
 */
const getAirData = async (lat, long) => {
  const TYPE_DATA = `
    in_season
    index {
      value
      category
      color
    }
  `;

  try {
    const request = new Request("https://api.mapmyair.com/graphql");

    request.method = "POST";
    request.headers = {
      "Content-Type": "application/json",
    };
    request.body = JSON.stringify({
      query: `
        query {
          pollen(lat: ${lat}, lon: ${long}, days: 1) {
            date
            types {
              tree {
                ${TYPE_DATA}
              }
              grass {
                ${TYPE_DATA}
              }
              weed {
                ${TYPE_DATA}
              }
            }
          }
          airquality(lat: ${lat}, lon: ${long}) {
            datetime
            indexes {
              baqi {
                aqi
                color
                category
                dominant_pollutant
              }
            }
          }
        }
      `,
    });

    const results = await request.loadJSON();
    const pollen = results.data.pollen;
    const aqi = results.data.airquality;

    return {
      pollen: pollen[0],
      aqi,
    };
  } catch (error) {
    console.error(error);
    return { error };
  }
};

module.exports = getAirData;
