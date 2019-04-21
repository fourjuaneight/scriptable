// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: window-minimize;
module.exports = async ({ url, headers = {} }) => {
  const request = new Request(url);
  request.method = methods.get;
  request.headers = {
    ...headers
  };
  return await request.loadString();
};

const methods = {
  get: "GET"
}
