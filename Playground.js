// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-brown; icon-glyph: vials;
// share-sheet-inputs: url;
// response.request.res.responseUrl

const fetch = async url => {
  const request = new Request(url);
  const response = await request.load();
 
  return request.response.url;
}

fetch('https://t.co/Ls0QcDVNzq');