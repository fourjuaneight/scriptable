// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-brown; icon-glyph: feather;
/**
 * Expand shortend URLs.
 * @function
 *
 * @param {string} url shortned url string
 * @returns {Promise<string>} expanded URL
 */
const expandLinks = async (url) => {
  try {
    const request = new Request(url);
    await request.load();

    if (!request.response.url) {
      console.error({
        message: "Expand Links: unable to expand URL.",
        status: request.response.statusCode,
      });
      return url;
    }

    return request.response.url;
  } catch (error) {
    console.error("Expand Links:", error);
    return url;
  }
};

/**
 * Get expanded URLs.
 * @function
 *
 * @param {string} str string to replace
 * @param {RegExp} regex pattern to match
 * @returns {Promise<string>} list of expanded URLs from str
 */
const expandShortLink = async (str, regex) => {
  const promises = [];
  const pattern = new RegExp(regex);

  str.replace(pattern, (match, ...args) => {
    const promise = expandLinks(match);
    promises.push(promise);

    return match;
  });

  const data = await Promise.all(promises);
  const replacer = () => data.shift() ?? "";

  return str.replace(regex, replacer);
};

module.exports = expandShortLink;
