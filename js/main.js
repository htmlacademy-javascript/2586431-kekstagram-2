import { drawMiniatures } from './draw-miniatures.js';
import { getPosts } from './get-posts.js';

const posts = getPosts(25);

drawMiniatures(posts);
