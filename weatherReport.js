// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: green; icon-glyph: thermometer-quarter;
const params = args.shortcutParameter;

const responses = {
  20: "It's a good day to stay inside.",
  30: "It's Freezing.",
  40: "It's Cold.",
  50: "It's Chilly.",
  60: "It's Nice.",
  70: "It's Alright.",
  80: "It's Warm.",
  90: "It's Hot.",
  100: "You'll Die.",
};

const closest = (ranges, current) => {
  const result = ranges.reduce((prev, curr) =>
    Math.abs(curr - current) < Math.abs(prev - current) ? curr : prev,
  );

  return result;
};
const filter = closest(Object.keys(responses), params);
const results = responses[filter];

Script.setShortcutOutput(results);
Script.complete();
