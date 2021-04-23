// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-brown; icon-glyph: flask;
const BACKGROUND_DARK_MODE = "system";
// options: "yes", "no", "system"

let RANDOM = false;
// show the alt text at the bottom of the image.
const SHOW_ALT = false;

// default is current comic
// set the Parameter value to "random" in the
// Edit Widget screen to use a random comic
if (args.widgetParameter === "random") {
  RANDOM = true;
}

/**
 * Check if OS is using dark mode.
 * @function
 *
 * @returns {boolean} system color scheme
 */
const isUsingDarkAppearance = async () => {
  // yes there's a Device.isUsingDarkAppearance() method
  // but I find it unreliable
  const view = new WebView();
  const js =
    "(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)";
  const resp = await view.evaluateJavaScript(js);

  return resp;
};

/**
 * Generate new linear gradient from start/end hex color values.
 * @function
 *
 * @param {string} from gradient hex value start
 * @param {string} to gradient hex value end
 * @returns {object} linear gradient
 */
const newLinearGradient = (from, to) => {
  const gradient = new LinearGradient();
  gradient.locations = [0, 1];
  gradient.colors = [new Color(from), new Color(to)];

  return gradient;
};

/**
 * Download image from url.
 * @function
 *
 * @param {string} imgurl comic url
 * @returns {blob} image file
 */
const downloadImage = async (imgurl) => {
  const imgReq = new Request(imgurl);
  const img = await imgReq.loadImage();

  return img;
};

/**
 * Generate comic widget.
 * @function
 *
 * @param {object} data comic website data
 * @returns {object} widget
 */
const createWidget = async (data) => {
  const widget = new ListWidget();

  // add background gradient based on system color scheme
  const isDarkMode =
    BACKGROUND_DARK_MODE == "system"
      ? await isUsingDarkAppearance()
      : BACKGROUND_DARK_MODE == "yes";

  if (isDarkMode) {
    widget.backgroundGradient = newLinearGradient("#010c1ee6", "#001e38b3");
  } else {
    widget.backgroundGradient = newLinearGradient("#b00a0fe6", "#b00a0fb3");
  }

  // add widget title
  const titleTxt = widget.addText(data.safe_title);
  titleTxt.font = Font.boldSystemFont(14);
  titleTxt.centerAlignText();
  titleTxt.textColor = Color.white();

  widget.addSpacer(2);

  // add comic to widget
  const img = await downloadImage(data.img);
  const pic = widget.addImage(img);
  pic.centerAlignImage();

  widget.addSpacer();

  // add optional alt text
  if (SHOW_ALT) {
    const subTxt = widget.addText(data.alt);
    subTxt.font = Font.mediumSystemFont(10);
    subTxt.textColor = Color.white();
    subTxt.textOpacity = 0.9;
    subTxt.centerAlignText();
  }

  return widget;
};

/**
 * Get random or specific comic.
 * @function
 *
 * @param {boolean} random randomize comic or not
 * @returns {object} xkcd comic data
 */
const xkcd = async (random) => {
  let url = "https://xkcd.com/info.0.json";
  let req = new Request(url);
  let json = await req.loadJSON();

  if (random) {
    const rnd = Math.floor(Math.random() * (json.num - 1 + 1)) + 1;
    url = `https://xkcd.com/${rnd}/info.0.json`;
    req = new Request(url);
    json = await req.loadJSON();
  }

  return json;
};

// load data and create widget
const loadData = async () => await xkcd(RANDOM);
const data = await loadData();
const widget = await createWidget(data);

if (config.runsInWidget) {
  Script.setWidget(widget);
  Script.complete();
} else {
  Safari.open(`https://xkcd.com/${data.num}`);
}
