// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: pencil-alt;
const src = args.shortcutParameter;

const data = {  
  'very fast': 'hurriedly',
  'very happy': 'overjoyed',
  'very hungry': 'famished',
  'very noisy': 'deafening',
  'very odd': 'bizarre',
  'very often': 'frequently',
  'very old': 'ancient',
  'very old-fashioned': 'archaic',
  'very open': 'transparent',
  'very painful': 'excruciating',
  'very pale': 'ashen',
  'very perfect': 'flawless',
  'very poor': 'destitute',
  'very powerful': 'compelling',
  'very pretty': 'beautiful',
  'very quick': 'rapid',
  'very quiet': 'hushed',
  'very rainy': 'pouring',
  'very rich': 'wealthy',
  'very sad': 'sorrowful',
  'very scared': 'petrified',
  'very scary': 'chilling',
  'very serious': 'grave',
  'very sharp': 'keen',
  'very shiny': 'gleaming',
  'very short': 'brief',
  'very shy': 'timid',
  'very simple': 'basic',
  'very slow': 'sluggish'
};

/**
 * Replace multiple instance of a search value in a given string.
 * @function
 *
 * @param   {string} string       value to replace
 * @param   {string} pattern      string to search
 * @param   {string} replaceValue new value
 *
 * @returns {string}              updated string
 */
const multiReplace = (string, pattern, replaceValue) => {
  const regExp = new RegExp(pattern, 'g');
  const newString = string.replace(regExp, replaceValue);

  return newString;
};

/**
 * Replace all words in object list.
 * @function
 *
 * @param   {string} string value to replace
 * @param   {object} list   list of words to be replaced
 *
 * @returns {void}
 */
const replaceAll = (string, list) => {
  let originalString = string;

  for (const toReplace in list) {
      if (Object.hasOwnProperty.call(list, toReplace)) {
          originalString = multiReplace(
              originalString,
              toReplace,
              list[toReplace]
          );
      }
  }

  return originalString;
};

// replace given text on the doc with the matching word back
const results = replaceAll(src, data);

Script.setShortcutOutput(results);
Script.complete();