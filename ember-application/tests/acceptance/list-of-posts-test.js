import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'exploration/tests/helpers/start-app';

module('Acceptance | list of posts', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('a user can see a list of posts', function(assert) {
  const posts = server.createList('post', 3);

  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/posts');
    assert.equal(find('li').length, 3);
    assert.equal(find('li:first').text(), posts[0].title);
  });
});
