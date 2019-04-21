// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: vector-square;
const getString = importModule('getString');

const documentDirectory = FileManager.iCloud().documentsDirectory();

const header = `// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-gray; icon-glyph: file-code;`;

module.exports = async ({moduleName, url}) => {
  const moduleString = await getString({ url });
  FileManager.iCloud().writeString(`${documentDirectory}/${moduleName}.js`, `${header}\n${moduleString}`);
  return importModule(moduleName);
};

