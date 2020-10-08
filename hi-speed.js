const createEventDate = () => {
  const str = '2020-10-13T17:00:00Z';
  const dateFormatter = new DateFormatter();
  dateFormatter.dateFormat = 'yyyy-MM-dd\'T\'HH:mm:ssZ';

  return dateFormatter.date(str);
};

const capitalizeFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1);

const createRelativeTime = date => {
  const now = new Date();
  const formatter = new RelativeDateTimeFormatter();
  const str = formatter.string(date, now);

  return capitalizeFirstLetter(str);
};

const readBgImage = () => {
  const fm = FileManager.iCloud();
  const dir = fm.documentsDirectory();
  const filePath = fm.joinPath(dir, 'imgs/hispeed.png');

  return fm.readImage(filePath);
};

const createWidget = () => {
  const eventDate = createEventDate();
  const time = createRelativeTime(eventDate);
  const bgImg = readBgImage();

  const wdg = new ListWidget();
  wdg.backgroundImage = bgImg;
  wdg.addSpacer();

  const wtitle = wdg.addText('Apple Event');
  wtitle.font = Font.boldSystemFont(20);
  wtitle.textColor = Color.white();
  wdg.addSpacer(2);

  const wtime = wdg.addText(time);
  wtime.font = Font.mediumSystemFont(18);
  wtime.textColor = Color.white();

  return wdg;
};

const widget = createWidget();
widget.presentMedium();

Script.setWidget(widget);
Script.complete();
