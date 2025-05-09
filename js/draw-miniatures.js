import { openPost } from './full-size-mode';

const drawMiniatures = (posts) => {
  const similarListElement = document.querySelector('.pictures');
  const similarPictureTemplate = document.querySelector('#picture').content;

  const similarListFragment = document.createDocumentFragment();

  posts.forEach((post) => {
    const { id, url, description, likes, comments } = post;
    const pictureTemplate = similarPictureTemplate.cloneNode(true);
    const pictureEl = pictureTemplate.querySelector('.picture');
    const pictureImg = pictureTemplate.querySelector('.picture__img');

    pictureEl.id = id;
    pictureImg.src = url;
    pictureImg.alt = description;

    pictureTemplate.querySelector('.picture__likes').textContent = likes;
    pictureTemplate.querySelector('.picture__comments').textContent = comments;

    pictureEl.addEventListener('click', (evt) => {
      evt.preventDefault();
      openPost(post);
    });

    similarListFragment.appendChild(pictureTemplate);
  });

  similarListElement.appendChild(similarListFragment);
};

export { drawMiniatures };
