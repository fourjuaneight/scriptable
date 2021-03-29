// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-purple; icon-glyph: cloud-download-alt;
const params = args.shortcutParameter;

// test: https://youtu.be/YQWLndmkofU

/**
 * Convert video url to API ready endpoint. Extracts youtube ID.
 * @function
 *
 * @param {string} url video url
 * @returns {string} API endpoint to fetch tweet data
 */
const cleanUrl = (url) => {
  const updatedStr = url.replace(
    /(https\:\/\/youtu\.be\/)(.*)/g,
    "https://youtube.googleapis.com/youtube/v3/videos?id=$2"
  );

  return updatedStr;
};

/**
 * Get video details via YouTube API.
 * Docs: https://developers.google.com/youtube/v3/docs/videos/list
 * @function
 *
 * @param {string} url video url
 * @param {string} key auth key
 * @returns {Promise<object>} video title, creator, and url
 */
const getYouTubeDetails = async (url, key) => {
  const endpoint = cleanUrl(url);
  const request = new Request(`${endpoint}&part=snippet&key=${key}`);

  try {
    const response = await request.loadJSON();
    const video = response.items[0].snippet;

    return {
      title: video.title,
      creator: video.channelTitle,
      url,
      category: "Videos",
    };
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

if (params) {
  const results = await getYouTubeDetails(params.url, params.key);
  Script.setShortcutOutput(results);
  Script.complete();
}

module.exports = getYouTubeDetails;
