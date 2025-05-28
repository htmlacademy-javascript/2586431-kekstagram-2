import { drawMiniatures } from './draw-miniatures.js';
import { initializeForm } from './form.js';
import { getPosts } from './get-posts.js';

getPosts()
  .then((posts) => {
    drawMiniatures(posts);
  })
  .catch(() => {});

initializeForm();
