// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-purple; icon-glyph: cloud-download-alt;
const params = args.shortcutParameter;

// test: https://vimeo.com/333319621

/**
 * Convert video url to API ready endpoint. Extracts video ID.
 * @function
 *
 * @param {string} url video url
 * @returns {string} API endpoint to fetch video data
 */
const cleanUrl = (url) => {
  const updatedStr = url.replace(
    /(https\:\/\/vimeo\.com\/)(.*)/g,
    "https://api.vimeo.com/videos/$2"
  );

  return updatedStr;
};

/**
 * Get tweet details via Vimeo API.
 * Docs: https://developer.vimeo.com/api/reference/videos#get_video
 * @function
 *
 * @param {string} url video url
 * @param {string} token auth bearer token
 * @returns {Promise<object>} video title, creator, and url
 */
const getVimeoDetails = async (url, token) => {
  const endpoint = cleanUrl(url);
  const request = new Request(endpoint);

  request.headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await request.loadJSON();

    return {
      title: response.name,
      creator: response.user.name,
      url,
      category: "Videos",
    };
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

if (params) {
  const results = await getVimeoDetails(params.url, params.key);
  Script.setShortcutOutput(results);
  Script.complete();
}

module.exports = getVimeoDetails;
