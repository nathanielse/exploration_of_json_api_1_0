import Mirage, { faker } from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  content: faker.lorem.sentence
});
