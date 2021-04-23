// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: equals;
/**
 * Determine param is an object.
 * @function
 *
 * @param {object} obj param to check against
 * @returns {boolean} is param an object
 */
const isObj = (obj) => obj != null && typeof obj === "object";

/**
 * Determine if two objects are the same. Shallow check.
 * @function
 *
 * @param {object} obj1 main object to compare
 * @param {object} obj2 secondary object to compare
 * @returns {boolean} are objects equal
 */
const shallow = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
};

/**
 * Determine if two objects are the same. Deep check.
 * @function
 *
 * @param {object} obj1 main object to compare
 * @param {object} obj2 secondary object to compare
 * @returns {boolean} are objects equal
 */
const deep = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = obj1[key];
    const val2 = obj2[key];
    const areObjs = isObj(val1) && isObj(val2);

    if ((areObjs && !deep(val1, val2)) || (!areObjs && val1 !== val2)) {
      return false;
    }
  }

  return true;
};

exports.shallow = shallow;
exports.deep = deep;
