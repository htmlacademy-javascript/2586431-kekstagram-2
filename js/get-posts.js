import { getRandomArrayElement, getRandomInteger } from './util.js';

const DESCRIPTION = [
  '5 минут, полет нормальный',
  'Терпение и труд-инфаркт и инсульт',
  'Никогда такого не было и вот опять',
  'Утро началось с третьей попытки',
  'В 20:31 прибыл Годжо Сатору',
  'Сидим с бобром за столом',
];
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

const LIKES = [];
for (let i = 15; i <= 200; ++i) {
  LIKES.push(i);
}

const NUMBER_COMMENTS_MIN = 0;
const NUMBER_COMMENTS_MAX = 30;

const ID = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25,
];

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
  comments: getRandomSimilarComments(),
});

const getPosts = (length) => Array.from({ length }, createPost);

export { getPosts };
