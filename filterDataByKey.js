// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-brown; icon-glyph: filter;
const params = args.shortcutParameter;

const data = params.data.filter((item) =>
  item[params.filterKey].some((val) => params.filters.includes(val))
);
const results = {
  ...params,
  data,
};

Script.setShortcutOutput(results);
Script.complete();
