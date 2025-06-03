const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
const ERROR_STATUS_START = 400;
const SUCCESS_STATUS_START = 200;
const SUCCESS_STATUS_END = 299;

const getUrl = (endpoint) =>
  `${BASE_URL}/${endpoint[0] === '/' ? endpoint.slice(1) : endpoint}`;

const isSuccess = (response) => {
  if (
    response.status >= SUCCESS_STATUS_START &&
    response.status <= SUCCESS_STATUS_END
  ) {
    return true;
  }
  return false;
};

const isError = (response) => {
  if (response.status >= ERROR_STATUS_START) {
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
