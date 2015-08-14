import DS from 'ember-data';
import Ember from 'ember';

const { computed } = Ember;

export default DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),

  fullName: computed('firstName', 'lastName', function() {
    const { firstName, lastName } = this.getProperties('firstName', 'lastName');
    return `${firstName} ${lastName}`;
  })
});
