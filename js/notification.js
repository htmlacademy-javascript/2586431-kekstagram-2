const dataErrorTemplate = document.getElementById('data-error').content;
const errorTemplate = document.getElementById('error').content;
const successTemplate = document.getElementById('success').content;

const showMessage = (template, config = {}) => {
  const timeout = (config.timeout ?? 5) * 1000;
  const message = template.cloneNode(true).children[0];
  document.body.appendChild(message);
  setTimeout(() => {
    message?.remove();
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
