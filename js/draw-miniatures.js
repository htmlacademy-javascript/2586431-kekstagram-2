import getPosts from './get-posts.js';

const drawMiniatures = () => {
  const similarListElement = document.querySelector('.pictures');
  const similarPictureTemplate = document.querySelector('#picture').content;
  const similarPosts = getPosts(25);

  const similarListFragment = document.createDocumentFragment();

  similarPosts.forEach(({ url, description, likes, comments }) => {
    const pictureElement = similarPictureTemplate.cloneNode(true);
    const pictureImg = pictureElement.querySelector('.picture__img');
    pictureImg.src = url;
    pictureImg.alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments;
    similarListFragment.appendChild(pictureElement);
  });

  similarListElement.appendChild(similarListFragment);
};

export default drawMiniatures;
