import { isEscapeKey } from './util.js';

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

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

function openUserModal() {
  userModalElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
}

function closeUserModal() {
  userModalElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
}

closeBtnEl.addEventListener('click', () => {
  closeUserModal();
});

const getCommentHtml = (comment) => `<li class="social__comment">
  <img
    class="social__picture"
    src="${comment.avatar}"
    alt="${comment.name}"
    width="35" height="35">
  <p class="social__text">${comment.message}</p>
</li>`;

let post;
let shownCommentsCount;

const setShownCommentsCount = (count) => {
  shownCommentsCount = Math.min(count, post.comments.length);
  shownCommentsCountEl.textContent = shownCommentsCount;
  if (shownCommentsCount < post.comments.length) {
    loadMoreEl.classList.remove('hidden');
  } else {
    loadMoreEl.classList.add('hidden');
  }
  commentsContainerEl.innerHTML = post.comments
    .slice(0, shownCommentsCount)
    .map(getCommentHtml)
    .join('\n');
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
  openUserModal();
};

export { openPost };
