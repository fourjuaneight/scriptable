// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-brown; icon-glyph: plug;
const params = args.shortcutParameter;

// match given url with options and pull title
const match = params.options.filter((item) => params.url.includes(item.url));
const results = match.length !== 0 ? match[0].title : null;

Script.setShortcutOutput(results);
Script.complete();
