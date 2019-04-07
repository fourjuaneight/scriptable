// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: pink; icon-glyph: bookmark;
const sort = importModule('sortJSON');

const FM = FileManager.iCloud();

// Get bookmarks JSON from repo.
const repo = FM.bookmarkedPath(`Bookmarks`);
const json = FM.readString(`${repo}/web.json`);
const web = JSON.parse(json);

// Get new bookmark.
const clip = Pasteboard.paste();
const newBookmark = JSON.parse(clip);
// Get section from object and then remove it.
const section = newBookmark.Category;
delete newBookmark["Category"];
// Add new bookmark to JSON.
const bookmarkSection = web[section.toLowerCase()];
bookmarkSection.push(newBookmark);

// Alpha sort based on author name.
const keys = Object.keys(web);

for (const key of keys) {
  sort.sortByKey(json, web[key], 'Creator');
}

// Format and save to JSON.
const pretty = JSON.stringify(web, undefined, 2);
FM.writeString(`${repo}/web.json`, pretty);

// Back to Shortcuts
const shortcuts = `shortcuts://`;
Safari.open(shortcuts);