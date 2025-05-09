import { isEscapeKey } from './util.js';

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

const setData = (post) => {
  mainImgEl.src = post.url;
  likesCountEl.textContent = post.likes;
  shownCommentsCountEl.textContent = Math.min(5, post.comments);
  totalCommentsCountEl.textContent = post.comments;
  descriptionEl.textContent = post.description;

  commentsContainerEl.innerHTML = post.similarComments
    .map(getCommentHtml)
    .join('\n');

  // временно прячем кол-во комментариев и кнопку их подгрузки
  userModalElement
    .querySelector('.social__comment-count')
    .classList.add('hidden');
  userModalElement
    .querySelector('.social__comments-loader')
    .classList.add('hidden');
};

const openPost = (post) => {
  setData(post);
  openUserModal();
};

export { openPost };
