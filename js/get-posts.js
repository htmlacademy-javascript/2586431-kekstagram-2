import { api } from './api.js';
import { notification } from './notification.js';

const getPosts = () =>
  api.get('data').catch(() => {
    notification.dataError();
  });

export { getPosts };
