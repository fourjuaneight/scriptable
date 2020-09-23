const numberDay = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const day = Math.floor(diff / oneDay);

  return day;
};

const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${numberDay()}`;
const req = new Request(pokemonUrl);
const res = await req.loadJSON();

if (config.runsInWidget) {
  const widget = new ListWidget();

  const imgReqBq = await new Request(
    'https://i.pinimg.com/originals/aa/34/e1/aa34e1c76a6569a36499ae86098759ee.jpg'
  );
  const imgBq = await imgReqBq.loadImage();

  widget.backgroundImage = imgBq;

  const title = widget.addText('Pokemon of the day');
  title.textColor = Color.black();
  title.textOpacity = 0.8;
  title.font = new Font('Courier', 16);

  widget.addSpacer(5);

  const namePokemon = widget.addText(`#${res.id} - ${res.name}`);
  namePokemon.textColor = Color.black();
  namePokemon.textOpacity = 0.8;
  namePokemon.font = new Font('Courier', 14);

  const imgReq = await new Request(res.sprites.front_default);
  const img = await imgReq.loadImage();

  const image = widget.addImage(img);
  image.centerAlignImage();

  Script.setWidget(widget);
  Script.complete();
}
