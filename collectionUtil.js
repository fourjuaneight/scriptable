/**
 * Gets the value at path of object
 * @function
 *
 * @param {object} obj given object to get value from
 * @param {string} path where to find value
 * @param {any} [defaultValue] default value returned
 * @return {any} value obtained, if any
 */
const get = (obj, path, defaultValue = undefined) => {
  const travel = regexp =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce(
        (res, key) => (res !== null && res !== undefined ? res[key] : res),
        obj
      );
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);

  return result === undefined || result === obj ? defaultValue : result;
};

/**
 * Checks if `key` is a direct property of `object`. Key may be a path of a value separated by `.`
 * @function
 *
 * @param {object} obj object to check key for
 * @param {string} key key in object to find
 * @return {boolean} was key found in object
 */
const has = (obj, key) => {
  const keyParts = key.split('.');

  return (
    !!obj &&
    (keyParts.length > 1
      ? has(obj[key.split('.')[0]], keyParts.slice(1).join('.'))
      : hasOwnProperty.call(obj, key))
  );
};

/**
 * Checks if value is an empty object or collection
 * @function
 *
 * @param {object} obj collect to check if empty or not
 * @returns {boolean} is collection empty
 */
const isEmpty = obj =>
  [Object, Array].includes((obj || {}).constructor) &&
  !Object.entries(obj || {}).length;

/**
 * Sort arry by given key in ascending/descending order
 * @function
 *
 * @param {array} list array to be re-ordered
 * @param {string} key array key to sort by
 * @param {boolean} asc sort array in ascending or descending
 *
 * @return {array} order array
 */
const sortBy = (list, key, asc = true) => {
  const arrayCopy = [...list];

  arrayCopy.sort((a, b) => {
    if (asc) {
      if (a[key] > b[key]) {
        return -1;
      }
      if (a[key] < b[key]) {
        return 1;
      }
    } else {
      if (a[key] > b[key]) {
        return 1;
      }
      if (a[key] < b[key]) {
        return -1;
      }
    }

    return 0;
  });

  return arrayCopy;
};

module.exports = get;
module.exports = has;
module.exports = isEmpty;
module.exports = sortBy;
