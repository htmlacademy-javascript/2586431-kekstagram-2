import { drawMiniatures } from './draw-miniatures.js';
import { initializeForm } from './form.js';
import { getPosts } from './get-posts.js';
import { debounce, getRandomUniqueNumbers } from './util.js';

const RANDOM_POSTS_COUNT = 10;

const filtersWrapper = document.querySelector('.img-filters');
const filterButtons = [...document.querySelectorAll('.img-filters__button')];

const filters = {
  default: (posts) => posts,
  random: (posts) =>
    getRandomUniqueNumbers(posts.length, RANDOM_POSTS_COUNT).map(
      (number) => posts[number]
    ),
  discussed: (posts) =>
    posts.sort((a, b) => b.comments?.length - a.comments?.length),
};

const setActiveFilter = (value) => {
  filterButtons.forEach((button) => {
    if (button.id === `filter-${value}`) {
      button.classList.add('img-filters__button--active');
    } else {
      button.classList.remove('img-filters__button--active');
    }
  });
};

const loadPosts = debounce((filter = 'default') => {
  getPosts()
    .then(filters[filter])
    .then((posts) => {
      drawMiniatures(posts);
      filtersWrapper.classList.remove('img-filters--inactive');
      setActiveFilter(filter);
    });
}, 500);

filterButtons.forEach((button) => {
  button.onclick = () => {
    const filter = button.id.split('-')[1];
    loadPosts(filter);
  };
});

loadPosts();
initializeForm();
