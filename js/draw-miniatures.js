import { openPost } from './full-size-mode.js';

const miniaturesContainer = document.querySelector('.pictures');
const miniatureTemplate = document.querySelector('#picture').content;

const clearPreviousMiniatures = () => {
  const miniatures = [...miniaturesContainer.querySelectorAll('a.picture')];
  miniatures.forEach((miniature) => {
    miniature.remove();
  });
};

const drawMiniatures = (posts) => {
  if (!posts?.length) {
    return;
  }

  const similarListFragment = document.createDocumentFragment();

  clearPreviousMiniatures();
  posts.forEach((post) => {
    const { id, url, description, likes, comments } = post;
    const pictureTemplate = miniatureTemplate.cloneNode(true);
    const pictureElement = pictureTemplate.querySelector('.picture');
    const pictureImg = pictureTemplate.querySelector('.picture__img');

    pictureElement.id = id;
    pictureImg.src = url;
    pictureImg.alt = description;

    pictureTemplate.querySelector('.picture__likes').textContent = likes;
    pictureTemplate.querySelector('.picture__comments').textContent =
      comments.length;

    pictureElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      openPost(post);
    });

    similarListFragment.appendChild(pictureTemplate);
  });

  miniaturesContainer.appendChild(similarListFragment);
};

export { drawMiniatures };
