// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: green; icon-glyph: thermometer-quarter;
const params = args.shortcutParameter;

const responses = {
  100: "You'll Die.",
  90: "It's Hot.",
  80: "It's Warm.",
  70: "It's Alright.",
  60: "It's Nice.",
  50: "It's Chilly.",
  40: "It's Cold.",
  30: "It's Freezing.",
  20: "It's a good day to stay inside.",
};

const closest = (ranges, current) => {
  const closest = ranges.reduce((prev, curr) =>
    Math.abs(curr - current) < Math.abs(prev - current) ? curr : prev
  );

  return closest;
};
const filter = closest(Object.keys(responses), params);
const results = responses[filter];

Script.setShortcutOutput(results);
Script.complete();
