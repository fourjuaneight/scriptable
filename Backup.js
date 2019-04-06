// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-gray; icon-glyph: save;
// Save any new changes from iCloud directory to Working Copy repo
const backup = (localPath, repoPath) => {
  const FM = FileManager.iCloud();
  const local = FM.bookmarkedPath(localPath);
  const repo = FM.bookmarkedPath(repoPath);
  const scripts = FM.listContents(local);

  scripts.forEach(s => {
    const updated = FM.readString(`${local}/${s}`);
  
    if (updated !== null) {
      FM.writeString(`${repo}/${s}`, updated);
    }
  });
};
// Commit changes with enconded message and push changes
const save = async repoName => {
  const secretKey = `RP72JUCGLD`;
  const offset = new Date().getTimezoneOffset() * 60000;
  const date = new Date(Date.now() - offset).toISOString().substring(0, 10);
  const encodedMessage = `Scripts backed up on ${date}.`;

  // Backup scripts
  backup(repoName, `${repoName}-repo`)
  const url = `working-copy://x-callback-url/chain`;
  const callback = new CallbackURL(url);
  callback.addParameter(`key`, secretKey);
  callback.addParameter(`repo`, repoName.toLowerCase());
  callback.addParameter(`command`, `commit`);
  callback.addParameter(`message`, encodedMessage);
  callback.addParameter(`limit`, `999`);
  callback.addParameter(`command`, `push`);
  await callback.open();
};

// Backup and save Scripts
save(`Scriptable`);
// save(`Pythonista`);