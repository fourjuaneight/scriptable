// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-brown; icon-glyph: mortar-pestle;
const params = args.shortcutParameter;

// format record to Airtable upload
const record = {
  ...params.fields,
  tags: params.tags.sort(),
};
delete record.category;

Script.setShortcutOutput(record);
Script.complete();