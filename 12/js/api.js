const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const getUrl = (endpoint) =>
  `${BASE_URL}/${endpoint[0] === '/' ? endpoint.slice(1) : endpoint}`;

const isSuccess = (response) => {
  // Статусы 200..299 считаем успешными (https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status)
  if (response.status >= 200 && response.status < 300) {
    return true;
  }
  return false;
};

const isError = (response) => {
  // 400 и далее - ошибка (всё та же спецификация)
  if (response.status >= 400) {
    return true;
  }
  return false;
};

const dataHandler = async (response) => {
  if (isSuccess(response)) {
    return response.json();
  } else if (isError(response)) {
    const text = await response.text();
    throw new Error(text);
  }
};

/** axios at home */
const api = {
  get: (endpoint, config) => fetch(getUrl(endpoint), config).then(dataHandler),
  post: (endpoint, body, config) =>
    fetch(getUrl(endpoint), {
      method: 'POST',
      body,
      ...config,
    }).then(dataHandler),
};

export { api };
