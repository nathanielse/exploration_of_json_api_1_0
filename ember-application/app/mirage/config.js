export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */
  // this.namespace = '';    // make this `api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Route shorthand cheatsheet
  */
  /*
    GET shorthands

    // Collections
    this.get('/contacts');
    this.get('/contacts', 'users');
    this.get('/contacts', ['contacts', 'addresses']);

    // Single objects
    this.get('/contacts/:id');
    this.get('/contacts/:id', 'user');
    this.get('/contacts/:id', ['contact', 'addresses']);
  */

  /*
    POST shorthands

    this.post('/contacts');
    this.post('/contacts', 'user'); // specify the type of resource to be created
  */

  /*
    PUT shorthands

    this.put('/contacts/:id');
    this.put('/contacts/:id', 'user'); // specify the type of resource to be updated
  */

  /*
    DELETE shorthands

    this.del('/contacts/:id');
    this.del('/contacts/:id', 'user'); // specify the type of resource to be deleted

    // Single object + related resources. Make sure parent resource is first.
    this.del('/contacts/:id', ['contact', 'addresses']);
  */

  /*
    Function fallback. Manipulate data in the db via

      - db.{collection}
      - db.{collection}.find(id)
      - db.{collection}.where(query)
      - db.{collection}.update(target, attrs)
      - db.{collection}.remove(target)

    // Example: return a single object with related models
    this.get('/contacts/:id', function(db, request) {
      var contactId = +request.params.id;

      return {
        contact: db.contacts.find(contactId),
        addresses: db.addresses.where({contact_id: contactId});
      };
    });

  */
  this.namespace = 'api';

  this.get('/posts', function(db) {

    const data = db.posts.map((post) => {
      const comments = db.comments.where({post_id: post.id});

      return {
        type: 'posts',
        id: post.id,
        attributes: {
          title: post.title,
          body: post.body
        },
        relationships: {
          comments: {
            links: {
              self: `/api/posts/${post.id}/relationships/comments`,
              related: `/api/posts/${post.id}/comments`
            },
            data: comments.map((comment) => { return {type: 'comments', id: comment.id}; })
          },
        }
      };
    });

    const comments = db.comments;
    const included = comments.map((comment) => {
      return {
        type: 'comments',
        id: comment.id,
        attributes: {
          content: comment.content
        }
      };
    });

    return { data: data, included: included };
  });

  this.get('/posts/:id', function(db, request) {
    const post = db.posts.find(request.params.id);
    const comments = db.comments.where({post_id: post.id});

    const data = {
        type: 'posts',
        id: post.id,
        attributes: {
          title: post.title,
          body: post.body
        },
        relationships: {
          comments: {
            links: {
              self: `/api/posts/${post.id}/relationships/comments`,
              related: `/api/posts/${post.id}/comments`
            },
            data: comments.map((comment) => { return {type: 'comments', id: comment.id}; })
          }
        }
    };

    const included = comments.map((comment) => {
      return {
        type: 'comments',
        id: comment.id,
        attributes: {
          content: comment.content
        }
      };
    });

    return { data: data, included: included };
  });

  this.get('/posts/:id/comments', function(db, request) {
    const postId = request.params.id;
    const comments = db.comments.where({post_id: postId});

    const data = {
      data: comments.map((comment) => {
        return {
          type: 'comments',
          id: comment.id,
          attributes: {
            content: comment.content
          }
        };
      })
    };

    return {data: data};
  });
}

/*
You can optionally export a config that is only loaded during tests
export function testConfig() {

}
*/
