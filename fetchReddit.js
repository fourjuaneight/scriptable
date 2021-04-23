// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: purple; icon-glyph: cloud-download-alt;
const params = args.shortcutParameter;

// test: https://www.reddit.com/r/futureporn/comments/bfm05c/armored_core_by_shuo_shi/

/**
 * Get post details via Reddit API.
 * @function
 *
 * @param {string} url post url
 * @returns {Promise<object>} reddit title, content, subreddit, and url
 */
const getRedditDetails = async (url) => {
  const request = new Request(`${url}.json`);

  try {
    const response = await request.loadJSON();
    const post = response[0].data.children[0].data;

    return {
      title: post.title,
      content: post.selftext || post.url_overridden_by_dest,
      subreddit: `r/${post.subreddit}`,
      url,
      category: "Reddits",
    };
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

if (params) {
  const results = await getRedditDetails(params.url);
  Script.setShortcutOutput(results);
  Script.complete();
}

module.exports = getRedditDetails;
