// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-purple; icon-glyph: expand;
const { data } = args.shortcutParameter;

// add id and sort tags alphabetically for all records
const cleanRecords = data.map((record) => ({
  id: UUID.string(),
  ...record.fields,
  tags: record.fields.tags.sort(),
}));

Script.setShortcutOutput(cleanRecords);
Script.complete();
