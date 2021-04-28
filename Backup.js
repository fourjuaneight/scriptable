// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: teal; icon-glyph: save;
// Save any new changes from iCloud directory to Working Copy repo
/**
 * Backup all iCloud script to a repo managed by WorkingCopy.
 * @function
 *
 * @param {string} localPath iCloud path to Scritable scripts
 * @param {string} repoPath WorkinCopy path to repo
 * @returns {void}
 */
const backup = (localPath, repoPath) => {
  const FM = FileManager.iCloud();
  const local = FM.bookmarkedPath(localPath);
  const repo = FM.bookmarkedPath(repoPath);
  const scripts = FM.listContents(local);

  scripts.forEach((script) => {
    const updated = FM.readString(`${local}/${script}`);

    if (updated !== null) {
      FM.writeString(`${repo}/${script}`, updated);
    }
  });
};

// Backup and save Scripts
backup("scripts", "scriptable");
Script.complete();
