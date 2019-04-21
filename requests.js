// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: angle-down;
module.exports = {
  post: async ({ url, body, headers = {} }) => {
    const request = new Request(url);
    request.body = JSON.stringify(body);
    request.method = methods.post;
    request.headers = {
      ...defaultHeaders,
      ...headers
    };
    return await request.loadJSON();
  },
  put: async ({ url, body, headers = {} }) => {
    const request = new Request(url);
    request.body = JSON.stringify(body);
    request.method = methods.put;
    request.headers = {
      ...defaultHeaders,
      ...headers
    };
    return await request.loadJSON();
  },
  get: async ({ url, headers = {} }) => {
    const request = new Request(url);
    request.method = methods.get;
    request.headers = {
      ...defaultHeaders,
      ...headers
    };
    return await request.loadJSON();
  }
};

const defaultHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json"
}

const methods = {
  get: "GET",
  post: "POST",
  put: "PUT"
};
