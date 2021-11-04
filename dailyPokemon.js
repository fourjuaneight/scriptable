// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-brown; icon-glyph: gamepad;
/**
 * Get numbered day out of the year.
 * @function
 *
 * @returns {number}
 */
const numberDay = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const day = Math.floor(diff / oneDay);

  return day;
};

/**
 * Capitalize a string.
 * @function
 *
 * @param {string} str string to be capitalized
 * @returns {string} capitalized string
 */
const toCapitalized = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${numberDay()}`;
const request = new Request(pokemonUrl);
const response = await request.loadJSON();

if (config.runsInWidget) {
  // initialize widget
  const widget = new ListWidget();

  const imgReqBq = await new Request(
    "https://i.pinimg.com/originals/aa/34/e1/aa34e1c76a6569a36499ae86098759ee.jpg"
  );
  const imgBq = await imgReqBq.loadImage();

  widget.backgroundImage = imgBq;

  // customize
  const namePokemon = widget.addText(toCapitalized(response.name));
  namePokemon.textColor = Color.black();
  namePokemon.textOpacity = 0.8;
  namePokemon.font = new Font("Courier", 14);
  namePokemon.centerAlignText();

  const imgRequest = await new Request(response.sprites.front_default);
  const imgResponse = await imgRequest.loadImage();

  const image = widget.addImage(imgResponse);
  image.centerAlignImage();

  Script.setWidget(widget);
  Script.complete();
} else {
  const url = `https://serebii.net/pokedex/${numberDay()}.html`;
  Safari.open(url);
}
