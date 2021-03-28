// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-purple; icon-glyph: cloud-upload-alt;
const params = args.shortcutParameter;

/**
 * Upload record to Airtbale base table.
 * @function
 *
 * @param {object} data Record to be saved
 * @returns {void}
 */
const saveRecord = async (data) => {
  const endpoint = `${data.table}/${data.tableName}`;
  const payload = {
    records: [
      {
        fields: {
          title: data.record.title,
          creator: data.record.creator,
          url: data.record.url,
          tags: data.record.tags,
        },
      },
    ],
  };
  const request = new Request(endpoint);

  request.method = "POST";
  request.headers = {
    Authorization: `Bearer ${data.key}`,
    "Content-Type": "application/json",
  };
  request.body = JSON.stringify(payload);

  try {
    const response = await request.loadJSON();

    Script.setShortcutOutput({
      status: "ok",
      data: response.records[0].fields,
    });
  } catch (err) {
    console.error(err);
    Script.setShortcutOutput({ status: "error", data: err });
  }
};

await saveRecord(params);

Script.complete();
