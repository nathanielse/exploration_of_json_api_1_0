import DS from 'ember-data';

export default DS.Model.extend({
  content: DS.attr('string'),
  post: DS.belongsTo('post'),
  author: DS.belongsTo('user')
});
