// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-brown; icon-glyph: magic;
const uglyJSON = args.shortcutParameter;
const prettyJSON = JSON.stringify(uglyJSON, undefined, 2);

Script.setShortcutOutput(prettyJSON);
Script.complete();
