// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: ship;
const params = args.shortcutParameter;

const FM = FileManager.iCloud();
const logs = FM.bookmarkedPath("Captain's_Log");
const path = `${logs}/${params.path}`;
const exists = FM.isDirectory(path);

if (!exists) {
  FM.createDirectory(path);
}

FM.writeString(`${logs}/${params.path}/${params.filename}.md`, params.content);
Script.complete();