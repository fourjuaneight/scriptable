// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: code-branch;
// Commit changes with enconded message and push changes
module.exports.save = async (repo, message) => {
  const secretKey = `RP72JUCGLD`;
  const encodedMessage = ``;

  // Backup scripts
  const url = `working-copy://x-callback-url/chain`;
  const callback = new CallbackURL(url);
  callback.addParameter(`key`, secretKey);
  callback.addParameter(`repo`, repo);
  callback.addParameter(`command`, `commit`);
  callback.addParameter(`message`, message);
  callback.addParameter(`limit`, `999`);
  callback.addParameter(`command`, `push`);
  await callback.open();
};
