import { Modal } from './modal.js';
import * as imageProcessing from './image-proccessing.js';
import { api } from './api.js';
import { notification } from './notification.js';

const uploadInputEl = document.querySelector('input.img-upload__input');
const uploadOverlayEl = document.querySelector('.img-upload__overlay');
const uploadCancelEl = document.querySelector('.img-upload__cancel');

const formEl = document.querySelector('.img-upload__form');
const hashtagsEl = document.querySelector('.text__hashtags');
const descriptionEl = document.querySelector('.text__description');

const submitEl = document.querySelector('.img-upload__submit');

imageProcessing.initialize();

const pristine = new Pristine(formEl);

const ERROR_CLASSNAME = 'pristine-error img-upload__field-wrapper--error';

const addValidator = (inputEl, callback, message) => {
  pristine.addValidator(
    inputEl,
    (value) => {
      const res = callback(value) ?? true;
      return res;
    },
    message
  );
};

const modal = new Modal(uploadOverlayEl, uploadCancelEl, {
  onClose: () => {
    uploadInputEl.value = '';
    imageProcessing.reset();
    formEl.reset();
    resetErrors();
  },
});

submitEl.addEventListener('click', (evt) => {
  evt.preventDefault();
  if (!pristine.validate()) {
    return;
  }
  const body = new FormData(formEl);
  api
    .post('/', body)
    .then(() => {
      notification.success();
      modal.close();
    })
    .catch(() => {
      notification.error();
    });
});

const initializeForm = () => {
  uploadInputEl.addEventListener('change', (evt) => {
    imageProcessing.setImage(evt.target.files?.[0]);
    modal.open();
  });
};

const stopPropagation = (evt) => {
  evt.stopPropagation();
};

hashtagsEl.addEventListener('keydown', stopPropagation);
descriptionEl.addEventListener('keydown', stopPropagation);

const descriptionError = document.createElement('div');
descriptionError.className = ERROR_CLASSNAME;
descriptionError.style.display = 'none';
descriptionEl.parentElement.appendChild(descriptionError);

addValidator(
  descriptionEl,
  (value) => {
    if (value?.length > 140) {
      descriptionError.textContent =
        'Длина комментария не может составлять больше 140 символов';
      descriptionError.style.display = 'block';
      return false;
    }
    descriptionError.style.display = 'none';
  },
  ''
);

const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;

const hashtagError = document.createElement('div');
hashtagError.className = ERROR_CLASSNAME;
hashtagError.style.display = 'none';
hashtagsEl.parentElement.appendChild(hashtagError);

addValidator(
  hashtagsEl,
  (value) => {
    const hashtags = value.trim().toLowerCase().split(/\s+/);
    if (hashtags.length > 5) {
      hashtagError.textContent = 'Кол-во хештегов не должно быть больше 5-ти';
      hashtagError.style.display = 'block';
      return false;
    }

    for (const hashtag of hashtags) {
      if (hashtag && !hashtagRegex.test(hashtag)) {
        hashtagError.textContent =
          'Хештег должен начинаться с #, иметь длину не более 20 символов и не состоять лишь из одного символа #';
        hashtagError.style.display = 'block';
        return false;
      }
    }
    const unique = new Set(hashtags);
    if (unique.size < hashtags.length) {
      hashtagError.textContent = 'Не должно быть повторяющихся хештегов';
      hashtagError.style.display = 'block';
      return false;
    }

    hashtagError.style.display = 'none';
  },
  ''
);

function resetErrors() {
  descriptionError.style.display = 'none';
  hashtagError.style.display = 'none';
}

export { initializeForm };
