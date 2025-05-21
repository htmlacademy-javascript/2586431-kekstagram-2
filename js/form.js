import Pristine from '../vendor/pristine/pristine.min.js';
import { Modal } from './modal.js';

const uploadInputEl = document.querySelector('input.img-upload__input');
const uploadOverlayEl = document.querySelector('.img-upload__overlay');
const uploadCancelEl = document.querySelector('.img-upload__cancel');

const formEl = document.querySelector('.img-upload__form');
const hashtagsEl = document.querySelector('.text__hashtags');
const descriptionEl = document.querySelector('.text__description');

const submitEl = document.querySelector('.img-upload__submit');

formEl.method = 'post';
formEl.action = 'https://31.javascript.htmlacademy.pro/kekstagram';
formEl.enctype = 'multipart/form-data';

const pristine = new Pristine(formEl);

const addValidator = (inputEl, callback, message) => {
  pristine.addValidator(
    inputEl,
    (value) => {
      const res = callback(value) ?? true;
      if (!res) {
        inputEl.style.borderColor = 'red';
        inputEl.style.outlineColor = 'red';
        inputEl.title = message;
      } else {
        inputEl.style.borderColor = 'unset';
        inputEl.style.outlineColor = 'unset';
        inputEl.title = '';
      }
      return res;
    },
    message
  );
};

submitEl.addEventListener('click', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

addValidator(
  descriptionEl,
  (value) => {
    if (value?.length > 140) {
      return false;
    }
  },
  'Длина комментария не может составлять больше 140 символов'
);

const modal = new Modal(uploadOverlayEl, uploadCancelEl, {
  onClose: () => {
    uploadInputEl.value = '';
  },
});

const initializeForm = () => {
  uploadInputEl.addEventListener('change', () => {
    modal.open();
  });
};

const stopPropagation = (evt) => {
  evt.stopPropagation();
};

hashtagsEl.addEventListener('keydown', stopPropagation);
descriptionEl.addEventListener('keydown', stopPropagation);

const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;

addValidator(
  hashtagsEl,
  (value) => {
    const hashtags = value.trim().toLowerCase().split(' ');
    if (hashtags.length > 5) {
      return false;
    }

    for (const hashtag of hashtags) {
      if (hashtag && !hashtagRegex.test(hashtag)) {
        return false;
      }
    }
    const unique = new Set(hashtags);
    if (unique.size < hashtags.length) {
      return false;
    }
  },
  'Кол-во хештегов не должно быть больше 5-ти, не должно быть повторяющихся хештегов, хештег должен начинаться с #, иметь длину не более 20 символов и не состоять лишь из одного символа #'
);

export { initializeForm };
