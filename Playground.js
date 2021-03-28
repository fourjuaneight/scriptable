// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-brown; icon-glyph: vials;
// share-sheet-inputs: url;
const params = args.shortcutParameter;
const expandShortenURLs = importModule("expandShortenURLs.js");
const emojiToUnicode = importModule("emojiToUnicode.js");

const test = await emojiToUnicode(params.url);
const result = await expandShortenURLs(params.url, /(https:\/\/t.co\/[a-zA-z0-9]+)/g);
console.log(result);