import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.query('post', {include: 'comments,comments.author'});
  },

  setupController(controller, model) {
    this._super(...arguments);
    controller.set('posts', model);
  }
});
