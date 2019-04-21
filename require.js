// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: angle-double-down;
const getModule = importModule("getModule");

const documentDirectory = FileManager.iCloud().documentsDirectory();

module.exports = async ({ moduleName, url, forceDownload = false }) => {
  if (moduleExists(moduleName) && !forceDownload) {
    return importModule(moduleName);
  }
  return await getModule({ moduleName, url });
}

const moduleExists = (moduleName) => FileManager.iCloud().fileExists(`${documentDirectory}/${moduleName}.js`);
