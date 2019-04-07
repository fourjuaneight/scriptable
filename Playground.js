// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: vials;
// share-sheet-inputs: url;
const source = args.;
// const req = new Request(source);
// const html = await req.loadString();
// const urlRegExp = new RegExp(`<a href="(.*)">Share link</a>`);
// const urlMatch = html.match(urlRegExp);
QuickLook.present(source)
// const url = urlMatch[1];

// console.log(url);