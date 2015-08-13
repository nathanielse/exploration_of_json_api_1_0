export default function(server) {

  // Seed your development database using your factories. This
  // data will not be loaded in your tests.

  // server.createList('contact', 10);
  const posts = server.createList('post', 10);
  server.createList('comment', 5, {post_id: posts[0].id});
  server.createList('comment', 5, {post_id: posts[1].id});
}
