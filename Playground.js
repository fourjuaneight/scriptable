// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: vials;
const sort = importModule('sortJSON');
const commit = importModule('commitPush');

const FM = FileManager.iCloud();
const prompt = new Alert();
let section;

// Get webpage meta.
const url = `https://arstechnica.com/information-technology/2017/08/tales-of-an-it-professional-sailing-around-the-antarctic-loop/`;
const req = new Request(url);
const html = await req.loadString();
const titleRegExp = new RegExp("<title>(.*)</title>");
const titleMatch = html.match(titleRegExp);
const title = titleMatch[1];

// Get bookmarks JSON from repo.
const repo = FM.bookmarkedPath(`Bookmarks`);
const json = FM.readString(`${repo}/web.json`);
const web = JSON.parse(json);

// Ask for creator.
prompt.title = `Bookmark`;
prompt.addTextField(`Category`, `articles`);
prompt.addTextField(`URL`, url);
prompt.addTextField(`Title`, title);
prompt.addTextField(`Creator`);
prompt.addCancelAction(`Cancel`);
prompt.addAction(`Submit`);
if (await prompt.present() == 0) {
  // Verify url and title. Add creator name. 
  section = prompt.textFieldValue(0);
  const link = prompt.textFieldValue(1);
  const heading = prompt.textFieldValue(2);
  const name = prompt.textFieldValue(3);
  // Build new object entry.
  const newEntry = {
    "URL": link,
    "Title": heading,
    "Creator": name
  };
  const category = web[section];
  category.push(newEntry);
} else console.log(`Cancelled`);


// Alpha sort based on author name.
const keys = Object.keys(web);

for (const key of keys) {
  sort.sortByKey(json, web[key], 'Creator');
}

// Save to JSON bookmark file.
const pretty = JSON.stringify(web, undefined, 2);
FM.writeString(`${repo}/web.json`, pretty);

// Commit changes with enconded message and push changes
commit.save(`Bookmarks-repo`, `New ${section} bookmark saved.`);