import { Modal } from './modal.js';

const INITIAL_COMMENTS_COUNT = 5;
const LOAD_MORE_COMMENTS_COUNT = 5;

const userModalElement = document.querySelector('.big-picture');
const closeButtonElement = userModalElement.querySelector('#picture-cancel');
const mainImgElement = userModalElement.querySelector(
  '.big-picture__img > img'
);
const likesCountElement = userModalElement.querySelector('.likes-count');
const shownCommentsCountElement = userModalElement.querySelector(
  '.social__comment-shown-count'
);
const totalCommentsCountElement = userModalElement.querySelector(
  '.social__comment-total-count'
);
const descriptionElement = userModalElement.querySelector('.social__caption');
const commentsContainerElement =
  userModalElement.querySelector('.social__comments');
const loadMoreElement = userModalElement.querySelector(
  '.social__comments-loader'
);

const modal = new Modal(userModalElement, closeButtonElement);

const appendComment = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const imgElement = document.createElement('img');
  imgElement.classList.add('social__picture');
  imgElement.src = comment.avatar;
  imgElement.alt = comment.name;
  imgElement.width = 35;
  imgElement.height = 35;
  commentElement.appendChild(imgElement);

  const textElement = document.createElement('p');
  textElement.classList.add('social__text');
  textElement.textContent = comment.message;
  commentElement.appendChild(textElement);

  commentsContainerElement.appendChild(commentElement);
};

let post;
let shownCommentsCount;

const setShownCommentsCount = (count) => {
  const prevCount = shownCommentsCount;
  shownCommentsCount = Math.min(count, post.comments.length);
  shownCommentsCountElement.textContent = shownCommentsCount;
  if (shownCommentsCount < post.comments.length) {
    loadMoreElement.classList.remove('hidden');
  } else {
    loadMoreElement.classList.add('hidden');
  }
  const start = prevCount < shownCommentsCount ? prevCount : 0;
  if (start === 0) {
    commentsContainerElement.textContent = '';
  }
  post.comments.slice(start, shownCommentsCount).forEach(appendComment);
};

loadMoreElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  setShownCommentsCount(shownCommentsCount + LOAD_MORE_COMMENTS_COUNT);
});

const refreshModal = () => {
  mainImgElement.src = post.url;
  likesCountElement.textContent = post.likes;

  totalCommentsCountElement.textContent = post.comments.length;
  descriptionElement.textContent = post.description;

  setShownCommentsCount(INITIAL_COMMENTS_COUNT);
};

const setPost = (nextPost) => {
  post = nextPost;
  refreshModal();
};

const openPost = (nextPost) => {
  setPost(nextPost);
  modal.open();
};

export { openPost };
