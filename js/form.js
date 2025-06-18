import { Modal } from './modal.js';
import * as imageProcessing from './image-proccessing.js';
import { api } from './api.js';
import { notification } from './notification.js';

const MIN_COMMENT_LENGTH = 140;
const MIN_HASHTAGS_COUNT = 5;
const ERROR_TEXTS = {
  description: {
    length: 'Длина комментария не может составлять больше 140 символов',
  },
  hashtag: {
    count: 'Кол-во хештегов не должно быть больше 5-ти',
    format:
      'Хештег должен начинаться с #, иметь длину не более 20 символов и не состоять лишь из одного символа #',
    unique: 'Не должно быть повторяющихся хештегов',
  },
};

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
  submitElement.disabled = true;
  const body = new FormData(formElement);
  api
    .post('/', body)
    .then(() => {
      modal.close();
      notification.success();
    })
    .catch(() => {
      notification.error();
    })
    .finally(() => {
      submitElement.disabled = false;
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

hashtagsElement.onkeydown = stopPropagation;
descriptionElement.onkeydown = stopPropagation;

let descriptionError;
const setDescriptionError = (message) => {
  descriptionError?.remove();
  if (message) {
    descriptionError = document.createElement('div');
    descriptionError.className = ERROR_CLASSNAME;
    descriptionError.textContent = message;
    descriptionElement.parentElement.appendChild(descriptionError);
  }
};

addValidator(
  descriptionElement,
  (value) => {
    if (value?.length > MIN_COMMENT_LENGTH) {
      setDescriptionError(ERROR_TEXTS.description.length);
      return false;
    }
    setDescriptionError();
  },
  ''
);

const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;

let hashtagError;
const setHashtagError = (message) => {
  hashtagError?.remove();
  if (message) {
    hashtagError = document.createElement('div');
    hashtagError.className = ERROR_CLASSNAME;
    hashtagError.textContent = message;
    hashtagsElement.parentElement.appendChild(hashtagError);
  }
};

addValidator(
  hashtagsElement,
  (value) => {
    const hashtags = value.trim().toLowerCase().split(/\s+/);
    if (hashtags.length > MIN_HASHTAGS_COUNT) {
      setHashtagError(ERROR_TEXTS.hashtag.count);
      return false;
    }

    for (const hashtag of hashtags) {
      if (hashtag && !hashtagRegex.test(hashtag)) {
        setHashtagError(ERROR_TEXTS.hashtag.format);
        return false;
      }
    }
    const unique = new Set(hashtags);
    if (unique.size < hashtags.length) {
      setHashtagError(ERROR_TEXTS.hashtag.unique);
      return false;
    }

    setHashtagError();
  },
  ''
);

function resetErrors() {
  setDescriptionError();
  setHashtagError();
}

export { initializeForm };
