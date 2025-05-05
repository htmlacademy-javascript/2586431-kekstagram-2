const getRangeArr = (len) => {
  const res = [];
  for (let i = 0; i < len; i++) {
    res.push(i + 1);
  }
  return res;
};

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

export { getRangeArr, getRandomInteger, getRandomArrayElement };
