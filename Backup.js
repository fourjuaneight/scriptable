// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-gray; icon-glyph: save;
// Save any new changes from iCloud directory to Working Copy repo
const backup = (localPath, repoPath) => {
  const FM = FileManager.iCloud();
  const local = FM.bookmarkedPath(localPath);
  const repo = FM.bookmarkedPath(repoPath);
  const scripts = FM.listContents(local);

  scripts.forEach(script => {
    const updated = FM.readString(`${local}/${script}`);

    if (updated !== null) {
      FM.writeString(`${repo}/${script}`, updated);
    }
  });
};

// Backup and save Scripts
backup('scripts', 'scriptable');
