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

  this.get('/posts', function(db, request) {

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

    let included_comments;
    if ( /comments/.test(request.queryParams.include) ) {
      included_comments = comments.map((comment) => {
        return {
          type: 'comments',
          id: comment.id,
          attributes: {
            content: comment.content
          },
          relationships: {
            author: {
              links: {
                self: `/api/comments/${comment.id}/relationships/author`,
                related: `api/comments/${comment.id}/author`
              },
              data: { type: 'users', id: comment.user_id }
            }
          }
        };
      });
    }

    let included_users = [];
    if ( /comments\.author/.test(request.queryParams.include) ) {
      let user_ids = {};
      comments.forEach((comment) => { user_ids[comment.user_id] = true; });

      user_ids = Object.keys(user_ids);
      const users = db.users.find(user_ids);

      included_users = users.map((user) => {
        return {
          type: 'users',
          id: user.id,
          attributes: {
            'first-name': user['first-name'],
            'last-name': user['last-name']
          }
        };
      });
    }


    if (request.queryParams.include) {
      const included = included_comments.concat(included_users);
      return { data: data, included: included };
    }

    return { data: data };
  });
}

/*
You can optionally export a config that is only loaded during tests
export function testConfig() {

}
*/
