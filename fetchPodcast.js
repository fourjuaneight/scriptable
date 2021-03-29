// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-purple; icon-glyph: cloud-download-alt;
const params = args.shortcutParameter;

// test: https://castro.fm/episode/aSwDMX

// list of regular expressions to find and replace
const parsing = {
  castro: {
    title: new RegExp(/<h1>(.*)<\/h1>/, "g"),
    creator: new RegExp(/<h2><a\shref=".*"\salt=".*">(.*)<\/a><\/h2>/, "g"),
    url: new RegExp(/<source\ssrc="(.*)"\stype="audio\/mp3">/, "g"),
  },
  overcast: {
    title: new RegExp(
      /<h2\sclass="margintop0 marginbottom0"\sclass="title">(.*)<\/h2>/,
      "g"
    ),
    creator: new RegExp(/<a\shref="\/itunes\d+.*"\s?>(.*)<\/a>/, "g"),
    url: new RegExp(/<source\ssrc="(.*)"\stype="audio\/mp3"\s?\/>/, "g"),
  },
  title: [
    new RegExp(/^S\d+\s/, "g"),
    new RegExp(/^([a-zA-Z\D\s]+)?#\d{1,3}:?\s/, "g"),
    new RegExp(/^Ep\.\d{1,3}\s?/, "g"),
    new RegExp(/^Hasty Treat\s-\s/, "g"),
    new RegExp(/^(Bonus|BONUS)\:\s?/, "g"),
    new RegExp(/\s—\sOvercast/, "g"),
    new RegExp(/\s-\sYouTube/, "g"),
    new RegExp(/\s+on Vimeo/, "g"),
    new RegExp(/\s-\sEp\.?\s\d+$/, "g"),
    new RegExp(/\:\sArticles\sof\sInterest\s#\d+$/, "g"),
    new RegExp(/\s\D\s([0-9A-Za-z]+\s)+\D\s(Overcast)/, "g"),
    new RegExp(
      /(\D\d{1,3}\s\D\s)|(\d{1,3}\s\D\s)|(\w\d\D\w\d\s\D\s)|(\w+\s\d{1,3}\D\s)|(\d{1,3}\D\s)/,
      "g"
    ),
    new RegExp(/\s(—)(\s[A-Za-z]+)+/, "g"),
    new RegExp(/\s$/, "g"),
  ],
};

/**
 * Extract parameter from data source.
 * @function
 *
 * @param {string} data raw data source
 * @param {RegExp} pattern regular expression to replace for
 * @returns {string} extracted string
 */
const paramCleaner = (data, pattern) => {
  const match = data.match(pattern);

  if (match.length > 0) {
    return match[0].replace(pattern, "$1");
  } else {
    const error = "Param Cleaner: Unable to find match.";

    console.error(error);
    throw new Error(error);
  }
};

/**
 * Clean title based on list of patterns.
 * @function
 *
 * @param {string} string data source
 * @param {RegExp[]} patterns list of regular expressions to replace for
 * @returns {string} cleaned string
 */
const titleCleaner = (string, patterns) => {
  let cleanTitle = string;

  patterns.forEach((regexp) => {
    cleanTitle = cleanTitle.replace(regexp, "");
  });

  return cleanTitle.replace(/"/g, '"');
};

/**
 * Get podcast details from HTML via RegEx.
 * @function
 *
 * @param {string} url episode url
 * @param {string} source episode source; castro || overcast
 * @returns {Promise<object>} episode title, podcast, and url
 */
const getPodcastDetails = async (url, source) => {
  const request = new Request(url);

  try {
    const response = await request.loadString();
    // flatten doc; remove breakpoints and excessive spaces
    const post = response
      .replace(/\n\s+/g, "")
      .replace(/\n/g, "")
      .replace(/\s+/g, " ");
    // extract details from doc
    const title = paramCleaner(post, parsing[source].title);
    const creator = paramCleaner(post, parsing[source].creator);
    const link = paramCleaner(post, parsing[source].url).replace(
      /^(.*)\.(mp3).*/g,
      "$1.$2"
    );

    return {
      title: titleCleaner(title, parsing.title),
      creator,
      url: link,
      category: "Podcasts",
    };
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

if (params) {
  const results = await getPodcastDetails(params.url, params.source);
  Script.setShortcutOutput(results);
  Script.complete();
}

module.exports = getPodcastDetails;
