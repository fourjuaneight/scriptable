// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-purple; icon-glyph: cloud-download-alt;
const emojiToUnicode = importModule("emojiToUnicode.js");
const expandShortenURLs = importModule("expandShortenURLs.js");
const params = args.shortcutParameter;
QuickLook.present(params.key, true);
// test: https://twitter.com/fourjuaneight/status/1375312420583976960?s=20

/**
 * Convert tweet url to API ready endpoint. Extracts tweet ID.
 * @function
 *
 * @param {string} url tweet url
 * @returns {string} API endpoint to fetch tweet data
 */
const cleanUrl = (url) => {
  const updatedStr = url.replace(
    /(https\:\/\/twitter\.com\/).*\/status\/([0-9]+)(.*)?/g,
    "https://api.twitter.com/2/tweets/$2"
  );

  return updatedStr;
};

/**
 * Get tweet details via Twitter API.
 * Docs: https://developer.twitter.com/en/docs/twitter-api/tweets/lookup/api-reference
 * @function
 *
 * @param {string} url tweet url
 * @param {string} token auth bearer token
 * @returns {Promise<object>} tweet text, poster, and url
 */
const getTweetDetails = async (url, token) => {
  const endpoint = cleanUrl(url);
  const request = new Request(
    `${endpoint}?tweet.fields=created_at&user.fields=username&expansions=author_id`
  );

  request.headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await request.loadJSON();
    const username = response.includes.users[0].username;
    const formattedText = emojiToUnicode(response.data.text);
    const cleanText = await expandShortenURLs(
      formattedText,
      /(https:\/\/t.co\/[a-zA-z0-9]+)/g
    );

    return {
      tweet: cleanText,
      creator: `@${username}`,
      url: `https://twitter.com/${username}/status/${response.data.id}`,  
      category: "Tweets",
    };
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

if (params) {
  const results = await getTweetDetails(params.url, params.key);
  console.log(results);
  Script.setShortcutOutput(results);
  Script.complete();
}

module.exports = getTweetDetails;
