// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: vials;
// share-sheet-inputs: url;
const url = `https://audm.herokuapp.com/player-embed/?pub=wired&amp;articleID=fresh-hell-fb`;
const req = new Request(url);
const html = await req.loadString();
const titleRegExp = new RegExp("<title>(.*)</title>");
const titleMatch = html.match(titleRegExp);
// const title = titleMatch[1];

console.log(html);