// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-brown; icon-glyph: vials;
// share-sheet-inputs: url;
const objectsEqual = importModule("objectsEqual.js");

const data1 = [  
  { title: 'hi', tags: [1,2,3] },
  { title: 'hello', tags: [1,2,3] },
];
const data2 = [
  { title: 'hi', tags: [1,2,3] },
  { title: 'hey', tags: [1,2,3] },
];

const objInArr = (arr, obj) =>
  arr.some(elem => objectsEqual.deep(elem, obj));

const result = objInArr(data1, data2[0]);

console.log(result);