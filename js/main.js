const getRangeArr = (len) => {
  const res = [];
  for (let i = 0; i < len; i++) {
    res.push(i + 1);
  }
  return res;
};

const ID = getRangeArr(25);

const DESCRIPTION = [
  '5 минут, полет нормальный',
  'Терпение и труд-инфаркт и инсульт',
  'Никогда такого не было и вот опять',
  'Утро началось с третьей попытки',
  'В 20:31 прибыл Годжо Сатору',
  'Сидим с бобром за столом',
];

const LIKES_MIN = 15;
const LIKES_MAX = 200;

const LIKES = [];
for (let i = LIKES_MIN; i <= LIKES_MAX; ++i) {
  LIKES.push(i);
}

const NUMBER_COMMENTS_MIN = 0;
const NUMBER_COMMENTS_MAX = 30;

const AVATAR = [1, 2, 3, 4, 5, 6];
const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!',
];
const NAME = [
  'Александр',
  'Егор',
  'Леонид',
  'Иван',
  'Максим',
  'Владислав',
  'Фёдор',
  'Алексей',
  'Матвей',
  'Никита',
  'Илья',
  'Евгений',
  'Михаил',
  'Даниил',
  'Кирилл',
  'Ксения',
  'Матвей',
  'Юлия',
  'Татьяна',
  'Дарья',
  'Галима',
  'Маргарита',
  'Алиса',
  'Виктория',
  'Мила',
  'Елизавета',
  'Ольга',
  'Кира',
  'Нина',
  'Злата',
];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

let lastCommentId = 1;

const createComment = () => ({
  id: ++lastCommentId, // 1
  avatar: `img/avatar-${getRandomArrayElement(AVATAR)}.svg`,
  message: getRandomArrayElement(MESSAGE),
  name: getRandomArrayElement(NAME),
});

const getRandomSimilarComments = () =>
  Array.from(
    { length: getRandomInteger(NUMBER_COMMENTS_MIN, NUMBER_COMMENTS_MAX) },
    createComment
  );

const createPost = () => ({
  id: getRandomArrayElement(ID),
  url: `photos/${getRandomArrayElement(ID)}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomArrayElement(LIKES),
  similarComments: getRandomSimilarComments(),
});

const getPosts = (length) => Array.from({ length }, createPost);

const data = getPosts(25);

console.log(JSON.stringify(data, undefined, 4));
