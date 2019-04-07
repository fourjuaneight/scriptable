// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// always-run-in-app: true; icon-color: pink;
// icon-glyph: bookmark; share-sheet-inputs: url;
const url = args.urls[0];
const sort = importModule('sortJSON');
const commit = importModule('commitPush');

const FM = FileManager.iCloud();

// Get bookmarks JSON from repo.
const repo = FM.bookmarkedPath(`Test`);
const json = FM.readString(`${repo}/web.json`);
const web = JSON.parse(json);

// Choose category
const selectCategory = async () => {
  const select = new Alert();
  const categories = [
    'Articles',
    'Comics',
    'Podcasts',
    'Videos'
  ];
  select.addAction(`Articles`);
  select.addAction(`Comics`);
  select.addAction(`Podcasts`);
  select.addAction(`Videos`);
  const category = select.presentSheet().then(section => {
    return categories[section];
  });
  return category;
};

// Verify new bookmark parameter.
const verifyParams = async () => {
  // Get webpage meta.
  const req = new Request(url);
  const html = await req.loadString();
  const titleRegExp = new RegExp("<title>(.*)</title>");
  const titleMatch = html.match(titleRegExp);
  const title = titleMatch[1];
  
  // Verify params.
  const prompt = new Alert();
  prompt.title = `Bookmark`;
  prompt.addTextField(`URL`, url);
  prompt.addTextField(`Title`, title);
  prompt.addTextField(`Creator`);
  prompt.addCancelAction(`Cancel`);
  prompt.addAction(`Submit`);
  if (await prompt.present() == 0) {
    // Verify url and title. Add creator name. 
    const link = prompt.textFieldValue(0);
    const heading = prompt.textFieldValue(1);
    const name = prompt.textFieldValue(2);
    // Build new object entry.
    const newEntry = {
      "URL": link,
      "Title": heading,
      "Creator": name
    };
    return newEntry;
  } else console.log(`Cancelled`);
}

const section = await selectCategory();
const newBookmark = await verifyParams();
const bookmarkSection = web[section.toLowerCase()];
bookmarkSection.push(newBookmark);

// Alpha sort based on author name.
const keys = Object.keys(web);

for (const key of keys) {
  sort.sortByKey(json, web[key], 'Creator');
}

// Save to JSON bookmark file.
const pretty = JSON.stringify(web, undefined, 2);
FM.writeString(`${repo}/web.json`, pretty);

// Commit changes with enconded message and push changes
commit.save(`Test`, `New ${section} bookmark saved.`);

// Back to Safari
Safari.open(url);