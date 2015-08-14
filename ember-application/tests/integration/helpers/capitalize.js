import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('capitalize', 'helper:capitalize', {
  integration: true
});

test('it capitalizes words', function(assert) {
  this.set('doctor who');
  this.render(hbs`{{capitalize doctor who}}`);
  assert.equal(this.$().text(), 'Doctor Who');
});
