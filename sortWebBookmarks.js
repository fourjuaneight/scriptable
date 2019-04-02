// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: pink; icon-glyph: sort-alpha-down;
const sort = importModule('sortJSON');

const FM = FileManager.iCloud();
const local = FM.bookmarkedPath(`Scriptable`);
const json = FM.readString(`${local}/web.json`);
const web = JSON.parse(json);
const keys = Object.keys(web);
const { articles, comics, podcasts, tweets, videos } = web;


for (const key of keys) {
  sort.sortByKey(json, web[key], 'Creator');
}

const pretty = JSON.stringify(web, undefined, 2);

FM.writeString(`${repo}/web.json`, pretty);