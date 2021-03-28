// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-purple; icon-glyph: expand;
const record = args.shortcutParameter;

// add id and sort tags alphabetically
const cleanRecord = {
  id: UUID.string(),
  ...record,
  tags: record.tags.sort(),
};

Script.setShortcutOutput(cleanRecord);
Script.complete();
