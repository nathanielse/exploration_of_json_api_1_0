export default function(server) {

  // Seed your development database using your factories. This
  // data will not be loaded in your tests.

  // server.createList('contact', 10);
  const posts = server.createList('post', 10);

  const john_doe = server.create('user', {'first-name': 'john', 'last-name': 'doe'});
  const jane_doe = server.create('user', {'first-name': 'john', 'last-name': 'doe'});

  server.createList('comment', 5, {post_id: posts[0].id, user_id: john_doe.id});
  server.createList('comment', 5, {post_id: posts[1].id, user_id: jane_doe.id});




}
