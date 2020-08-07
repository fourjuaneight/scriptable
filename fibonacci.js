/**
 * Return a fibonacci sequence as an array
 *
 * @param {number} num
 *
 * @return {number[]}
 */
const fibonacci = num => {
  const fibSequence = [1];

  let currentValue = 1;
  let previousValue = 0;

  if (num === 1) {
    return fibSequence;
  }

  let iterationsCounter = num - 1;

  while (iterationsCounter) {
    currentValue += previousValue;
    previousValue = currentValue - previousValue;

    fibSequence.push(currentValue);

    iterationsCounter -= 1;
  }

  return fibSequence;
};

module.exports = fibonacci;
