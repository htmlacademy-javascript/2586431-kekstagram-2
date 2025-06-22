import { EscManager } from './esc-manager.js';

const MILLISECONDS_PER_SECOND = 1000;
const DEFAULT_TIMEOUT = 5; // в секундах

const dataErrorTemplate = document.getElementById('data-error').content;
const errorTemplate = document.getElementById('error').content;
const successTemplate = document.getElementById('success').content;

const escManager = new EscManager();

const showMessage = (template, config = {}) => {
  const timeout = (config.timeout ?? DEFAULT_TIMEOUT) * MILLISECONDS_PER_SECOND;
  const message = template.cloneNode(true).children[0];
  document.body.appendChild(message);

  const handleClick = (evt) => {
    if (evt.target === message) {
      close();
    }
  };
  message.addEventListener('click', handleClick);

  escManager.addLayer(close);

  setTimeout(() => {
    close();
  }, timeout);

  function close() {
    message?.removeEventListener('click', handleClick);
    escManager.removeLayer(close);
    message?.remove();
  }

  return { element: message, close };
};

const notification = {
  dataError: (config = {}) => {
    showMessage(dataErrorTemplate, config);
  },
  error: (config = {}) => {
    const { element, close } = showMessage(errorTemplate, config);
    const button = element.querySelector('button.error__button');
    button.addEventListener(
      'click',
      (evt) => {
        if (!config.onRetry?.(evt)) {
          close();
        }
      },
      { once: true }
    );
  },
  success: (config = {}) => {
    const { element, close } = showMessage(successTemplate, config);
    const button = element.querySelector('button.success__button');
    button.addEventListener(
      'click',
      (evt) => {
        if (!config.onClose?.(evt)) {
          close();
        }
      },
      { once: true }
    );
  },
};

export { notification };
