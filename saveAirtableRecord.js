// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-purple; icon-glyph: cloud-upload-alt;
const params = args.shortcutParameter;

/**
 * Upload record to Airtbale base table.
 * @function
 *
 * @param {string} table
 * @param {string} tableName
 * @param {string} key auth token
 * @param {object} fields record to be saved
 * @returns {void}
 */
const saveRecord = async (table, tableName, key, fields) => {
  const endpoint = `${table}/${tableName}`;
  const payload = {
    records: [
      {
        fields,
      },
    ],
  };
  const request = new Request(endpoint);

  request.method = "POST";
  request.headers = {
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };
  request.body = JSON.stringify(payload);

  try {
    const response = await request.loadJSON();

    return {
      status: "ok",
      data: response.records[0].fields,
    };
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

const results = await saveRecord(
  params.table,
  params.tableName,
  params.key,
  params.fields
);

Script.setShortcutOutput(results);
Script.complete();
