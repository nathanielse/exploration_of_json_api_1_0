import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'exploration/tests/helpers/start-app';

module('Acceptance | display of a post', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('a user can display a post', function(assert) {
  const post = server.create('post');

  const john_doe = server.create('user', {'first-name': 'john', 'last-name': 'doe'});
  const comments = server.createList('comment', 3, {post_id: post.id, user_id: john_doe.id});

  visit('/');
  click('.post:first a');

  andThen(function() {
    assert.equal(currentURL(), `/posts/${post.id}`);

    assert.equal(find('.title').text(), post.title);
    assert.equal(find('.body').text(), post.body);

    assert.equal(find('.comment .content').length, 3);
    assert.equal(find('.comment .author:first').text().trim(), 'John Doe');
    assert.equal(find('.comment:first .content').text(), comments[0].content);
  });
});
