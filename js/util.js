const isEscapeKey = (evt) => evt.key === 'Escape';

function debounce(callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

const getRandomUniqueNumbers = (limit, count) => {
  let current = 0;
  const numbers = [];
  for (let i = 0; i < count; i++) {
    do {
      current = Math.floor(Math.random() * limit);
    } while (numbers.includes(current));
    numbers.push(current);
  }
  return numbers;
};

export { isEscapeKey, debounce, getRandomUniqueNumbers };
