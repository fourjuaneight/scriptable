// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-brown; icon-glyph: vials;
// share-sheet-inputs: url;
const uuid = (a, b) =>{
  for (
    b = a = "";
    a++ < 36;
    b +=
      (a * 51) & 52
        ? (a ^ 15 ? 8 ^ (Math.random() * (a ^ 20 ? 16 : 4)) : 4).toString(16)
        : "-"
  );
  return b;
}

const uuidv4 = () => {
  const hex = [...Array(256).keys()].map((index) =>
    index.toString(16).padStart(2, "0")
  );

  const r = crypto.getRandomValues(new Uint8Array(16));

  r[6] = (r[6] & 0x0f) | 0x40;
  r[8] = (r[8] & 0x3f) | 0x80;

  return [...r.entries()]
    .map(([index, int]) =>
      [4, 6, 8, 10].includes(index) ? `-${hex[int]}` : hex[int]
    )
    .join("");
};