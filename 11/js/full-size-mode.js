import { Modal } from './modal.js';

const INITIAL_COMMENTS_COUNT = 5;
const LOAD_MORE_COMMENTS_COUNT = 5;

const userModalElement = document.querySelector('.big-picture');
const closeBtnEl = userModalElement.querySelector('#picture-cancel');
const mainImgEl = userModalElement.querySelector('.big-picture__img > img');
const likesCountEl = userModalElement.querySelector('.likes-count');
const shownCommentsCountEl = userModalElement.querySelector(
  '.social__comment-shown-count'
);
const totalCommentsCountEl = userModalElement.querySelector(
  '.social__comment-total-count'
);
const descriptionEl = userModalElement.querySelector('.social__caption');
const commentsContainerEl = userModalElement.querySelector('.social__comments');
const loadMoreEl = userModalElement.querySelector('.social__comments-loader');

const modal = new Modal(userModalElement, closeBtnEl);

const appendComment = (comment) => {
  const commentEl = document.createElement('li');
  commentEl.classList.add('social__comment');

  const imgEl = document.createElement('img');
  imgEl.classList.add('social__picture');
  imgEl.src = comment.avatar;
  imgEl.alt = comment.name;
  imgEl.width = 35;
  imgEl.height = 35;
  commentEl.appendChild(imgEl);

  const textEl = document.createElement('p');
  textEl.classList.add('social__text');
  textEl.textContent = comment.message;
  commentEl.appendChild(textEl);

  commentsContainerEl.appendChild(commentEl);
};

let post;
let shownCommentsCount;

const setShownCommentsCount = (count) => {
  const prevCount = shownCommentsCount;
  shownCommentsCount = Math.min(count, post.comments.length);
  shownCommentsCountEl.textContent = shownCommentsCount;
  if (shownCommentsCount < post.comments.length) {
    loadMoreEl.classList.remove('hidden');
  } else {
    loadMoreEl.classList.add('hidden');
  }
  const start = prevCount < shownCommentsCount ? prevCount : 0;
  if (start === 0) {
    commentsContainerEl.textContent = '';
  }
  post.comments.slice(start, shownCommentsCount).forEach(appendComment);
};

loadMoreEl.addEventListener('click', (evt) => {
  evt.preventDefault();
  setShownCommentsCount(shownCommentsCount + LOAD_MORE_COMMENTS_COUNT);
});

const refreshModal = () => {
  mainImgEl.src = post.url;
  likesCountEl.textContent = post.likes;

  totalCommentsCountEl.textContent = post.comments.length;
  descriptionEl.textContent = post.description;

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
