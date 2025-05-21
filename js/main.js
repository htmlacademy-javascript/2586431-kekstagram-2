import { drawMiniatures } from './draw-miniatures.js';
import { initializeForm } from './form.js';
import { getPosts } from './get-posts.js';

const posts = getPosts();

drawMiniatures(posts);

initializeForm();
