// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: purple; icon-glyph: flask;
const BACKGROUND_DARK_MODE = 'system';
// options: "yes", "no", "system

let RANDOM = false;
// show the alt text at the bottom of the image.
const SHOW_ALT = true;

// default is current comic
// set the Parameter value to "random" in the
// Edit Widget screen to use a random comic
if (args.widgetParameter == 'random') {
  RANDOM = true;
}

const isUsingDarkAppearance = async () => {
  // yes there's a Device.isUsingDarkAppearance() method
  // but I find it unreliable
  const view = new WebView();
  const js =
    "(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)";
  const resp = await view.evaluateJavaScript(js);
  Ï;
  return resp;
};

const newLinearGradient = (from, to) => {
  const gradient = new LinearGradient();
  gradient.locations = [0, 1];
  gradient.colors = [new Color(from), new Color(to)];

  return gradient;
};

const downloadImage = async imgurl => {
  const imgReq = new Request(imgurl);
  const img = await imgReq.loadImage();

  return img;
};

const createWidget = async data => {
  const widget = new ListWidget();

  const isDarkMode =
    BACKGROUND_DARK_MODE == 'system'
      ? await isUsingDarkAppearance()
      : BACKGROUND_DARK_MODE == 'yes';

  if (isDarkMode) {
    widget.backgroundGradient = newLinearGradient('#010c1ee6', '#001e38b3');
  } else {
    widget.backgroundGradient = newLinearGradient('#b00a0fe6', '#b00a0fb3');
  }

  const titleTxt = widget.addText(data.safe_title);
  titleTxt.font = Font.boldSystemFont(14);
  titleTxt.centerAlignText();
  titleTxt.textColor = Color.white();

  widget.addSpacer(2);

  const img = await downloadImage(data.img);
  const pic = widget.addImage(img);
  pic.centerAlignImage();

  widget.addSpacer();

  if (SHOW_ALT) {
    const subTxt = w.addText(`${data.num}: ${data.alt}`);
    subTxt.font = Font.mediumSystemFont(10);
    subTxt.textColor = Color.white();
    subTxt.textOpacity = 0.9;
    subTxt.centerAlignText();
  }

  return widget;
};

const xkcd = async random => {
  let url = 'https://xkcd.com/info.0.json';
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
  await widget.presentLarge();
}
