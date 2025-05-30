import { isEscapeKey } from './util';

const MILLISECONDS_PER_SECOND = 1000;
const DEFAULT_TIMEOUT = 5; // в секундах

const dataErrorTemplate = document.getElementById('data-error').content;
const errorTemplate = document.getElementById('error').content;
const successTemplate = document.getElementById('success').content;

const showMessage = (template, config = {}) => {
  const timeout = (config.timeout ?? DEFAULT_TIMEOUT) * MILLISECONDS_PER_SECOND;
  const message = template.cloneNode(true).children[0];
  document.body.appendChild(message);
  const previousOnkeydown = document.onkeydown;
  const close = () => {
    message?.remove();
    document.onkeydown = previousOnkeydown;
  };
  document.onkeydown = (evt) => {
    if (!isEscapeKey(evt)) {
      return;
    }
    close();
  };
  message.onclick = (evt) => {
    if (evt.target === message) {
      close();
    }
  };
  setTimeout(() => {
    close();
  }, timeout);
  return message;
};

const notification = {
  dataError: (config = {}) => {
    showMessage(dataErrorTemplate, config);
  },
  error: (config = {}) => {
    const message = showMessage(errorTemplate, config);
    const button = message.querySelector('button.error__button');
    button.onclick = (evt) => {
      if (!config.onRetry?.(evt)) {
        message.remove();
      }
    };
  },
  success: (config = {}) => {
    const message = showMessage(successTemplate, config);
    const button = message.querySelector('button.success__button');
    button.onclick = (evt) => {
      if (!config.onClose?.(evt)) {
        message.remove();
      }
    };
  },
};

export { notification };
