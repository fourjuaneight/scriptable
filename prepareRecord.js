// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: mortar-pestle;
const params = args.shortcutParameter;

// format record to Airtable upload
const fields = JSON.parse(params.fields);
const tags = JSON.parse(params.tags);
const record = {
  ...params,
  fields: {
    ...fields,
    tags,
  },
};

delete record.fields.category;
delete record.tags;

Script.setShortcutOutput(record);
Script.complete();
