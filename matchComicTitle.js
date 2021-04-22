// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: green; icon-glyph: magic;
const params = args.shortcutParameter;

// match given url with options and pull title
const match = params.options.filter((item) => params.url.includes(item.url));
const results = match[0].title;

Script.setShortcutOutput(results);
Script.complete();