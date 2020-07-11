// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: feather;
const clean = importModule('emojiToUnicode');

const text = args.shortcutParameter;
const cleanText = clean(text);
// Expand shortend URLs
const expandLinks = async url => {
  const request = new Request(url);
  const response = await request.load();
 
  return request.response.url;
}

// Async find and replace from string
const asyncReplace = async (str, regex, fn) => {
  const promises = [];
  str.replace(regex, (match, ...args) => {
    const promise = fn(match, ...args);
    promises.push(promise);
  });
  const data = await Promise.all(promises);

  return str.replace(regex, () => data.shift());
};

Script.setShortcutOutput(await asyncReplace(cleanText, /(https:\/\/t.co\/[a-zA-z0-9]+)/g, expandLinks).then(result => result));
Script.complete();