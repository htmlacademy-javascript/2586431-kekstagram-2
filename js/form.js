import { Modal } from './modal.js';
import * as imageProcessing from './image-proccessing.js';
import { api } from './api.js';
import { notification } from './notification.js';

const uploadInputElement = document.querySelector('input.img-upload__input');
const uploadOverlayElement = document.querySelector('.img-upload__overlay');
const uploadCancelElement = document.querySelector('.img-upload__cancel');

const formElement = document.querySelector('.img-upload__form');
const hashtagsElement = document.querySelector('.text__hashtags');
const descriptionElement = document.querySelector('.text__description');

const submitElement = document.querySelector('.img-upload__submit');

imageProcessing.initialize();

const pristine = new Pristine(formElement);

const ERROR_CLASSNAME = 'pristine-error img-upload__field-wrapper--error';

const addValidator = (inputElement, callback, message) => {
  pristine.addValidator(
    inputElement,
    (value) => {
      const res = callback(value) ?? true;
      return res;
    },
    message
  );
};

const modal = new Modal(uploadOverlayElement, uploadCancelElement, {
  onClose: () => {
    uploadInputElement.value = '';
    imageProcessing.reset();
    formElement.reset();
    resetErrors();
  },
});

submitElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  if (!pristine.validate()) {
    return;
  }
  const body = new FormData(formElement);
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
  uploadInputElement.addEventListener('change', (evt) => {
    imageProcessing.setImage(evt.target.files?.[0]);
    modal.open();
  });
};

const stopPropagation = (evt) => {
  evt.stopPropagation();
};

hashtagsElement.addEventListener('keydown', stopPropagation);
descriptionElement.addEventListener('keydown', stopPropagation);

const descriptionError = document.createElement('div');
descriptionError.className = ERROR_CLASSNAME;
descriptionError.style.display = 'none';
descriptionElement.parentElement.appendChild(descriptionError);

addValidator(
  descriptionElement,
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
hashtagsElement.parentElement.appendChild(hashtagError);

addValidator(
  hashtagsElement,
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
