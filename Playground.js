// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: teal; icon-glyph: vials; share-sheet-inputs: url;
const params = args.shortcutParameter;
const dataStr = args.plainTexts;

Script.setShortcutOutput({ params, data: dataStr[0] });
Script.complete();