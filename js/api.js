const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const getUrl = (endpoint) =>
  `${BASE_URL}/${endpoint[0] === '/' ? endpoint.slice(1) : endpoint}`;

const dataHandler = async (response) => {
  if (response.status < 400) {
    return response.json();
  } else {
    const text = await response.text();
    throw new Error(text);
  }
};

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
