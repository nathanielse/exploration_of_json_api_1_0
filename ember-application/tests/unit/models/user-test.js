import { moduleForModel, test } from 'ember-qunit';

moduleForModel('user', 'Unit | Model | user', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it gives the fullname of a user', function(assert) {
  const user = this.subject({firstName: 'john', lastName: 'doe'});
  assert.equal(user.get('fullName'), 'john doe');
});
