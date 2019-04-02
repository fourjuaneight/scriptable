// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: pink; icon-glyph: sort-alpha-down;
const sort = importModule('sortJSON');

const FM = FileManager.iCloud();
const repo = FM.bookmarkedPath(`Bookmarks`);
const json = FM.readString(`${repo}/web.json`);
const web = JSON.parse(json);
const keys = Object.keys(web);

for (const key of keys) {
  sort.sortByKey(json, web[key], 'Creator');
}

const pretty = JSON.stringify(web, undefined, 2);

FM.writeString(`${repo}/web.json`, pretty);