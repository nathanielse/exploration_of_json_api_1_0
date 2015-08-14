import Mirage, { faker } from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  'first-name': faker.name.firstName,
  'last-name': faker.name.lastName
});
