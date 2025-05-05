import getPosts from './get-posts.js';

const data = getPosts(25);

console.log(JSON.stringify(data, undefined, 4));
