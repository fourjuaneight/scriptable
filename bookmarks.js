// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// always-run-in-app: true; icon-color: pink;
// icon-glyph: bookmark; share-sheet-inputs: url;
const sort = importModule('sortJSON');
const commit = importModule('commitPush');

const FM = FileManager.iCloud();

// Get bookmarks JSON from repo.
const repo = FM.bookmarkedPath(`Bookmarks`);
const json = FM.readString(`${repo}/web.json`);
const web = JSON.parse(json);

const entry = Pasteboard.paste();
const newBookmark = JSON.parse(entry);
const category = newBookmark.Category;
const bookmarkSection = web[category.toLowerCase()];

delete newBookmark.Category;
bookmarkSection.push(newBookmark);

// Alpha sort based on author name.
const keys = Object.keys(web);

for (const key of keys) {
  sort.sortByKey(json, web[key], 'Creator');
}

// Save to JSON bookmark file.
const pretty = JSON.stringify(web, undefined, 2);
FM.writeString(`${repo}/web.json`, pretty);

// Back to Safari
Safari.open(`shortcuts://`);