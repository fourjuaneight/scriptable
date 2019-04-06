// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: vials;
// share-sheet-inputs: url;
const sort = importModule('sortJSON');
// const commit = importModule('commitPush');

const FM = FileManager.iCloud();

// Get bookmarks JSON from repo.
const repo = FM.bookmarkedPath(`Bookmarks`);
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
  const section = await selectCategory();
  
  // Get webpage meta.
  // const url = args.urls[0];
  const url = `https://arstechnica.com/information-technology/2017/08/tales-of-an-it-professional-sailing-around-the-antarctic-loop/`;
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
    const category = web[section];
    category.push(newEntry);
  } else console.log(`Cancelled`);
}

// Sort, save, and format
const addToBookmarks = async () => {
  // Run prompts
  await verifyParams();
  
  console.log(web);
  
  // Alpha sort based on author name.
//   const keys = Object.keys(web);
  
//   for (const key of keys) {
//     sort.sortByKey(json, web[key], 'Creator');
//   }
  
  // Save to JSON bookmark file.
//   const pretty = JSON.stringify(web, undefined, 2);
//   FM.writeString(`${repo}/web.json`, pretty);
};

addToBookmarks();

// Commit changes with enconded message and push changes
// commit.save(`Bookmarks-repo`, `New ${section} bookmark saved.`);