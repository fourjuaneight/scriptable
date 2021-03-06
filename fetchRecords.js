// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: purple; icon-glyph: cloud-download-alt;
const params = args.shortcutParameter;

let records = [];

/**
 * Query Airtable base table with optional recursion for multi-page results.
 * @function
 *
 * @param {string | null} offset id param to query next page of results
 * @returns {object} Airtable response object
 */
const getBookmarksWithOffset = async (offset = null) => {
  const url = offset
    ? `${params.endpoint}?offset=${offset}`
    : `${params.endpoint}`;
  const request = new Request(url);

  request.method = "GET";
  request.headers = {
    Authorization: `Bearer ${params.auth}`,
    "Content-Type": "application/json",
  };

  try {
    return request.loadJSON().then(async (airtableRes) => {
      records = [...records, ...airtableRes.records];

      if (airtableRes.offset) {
        return getBookmarksWithOffset(airtableRes.offset);
      } else {
        return airtableRes;
      }
    });
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

await getBookmarksWithOffset();
const cleanRecords = records.map((record) => {
  delete record.fields.archive;

  return record.fields;
});

Script.setShortcutOutput({ ...params, records: cleanRecords });
Script.complete();
