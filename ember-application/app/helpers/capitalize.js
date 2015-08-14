import Ember from 'ember';

export default Ember.Helper.helper(function([sentence]) {
  const words = sentence.split(/\s+/);
  return words.reduce((capitalizedSentenceWords, word) => {
    return capitalizedSentenceWords + ' ' + (word[0].toUpperCase() + word.substring(1));
  }, '');
});
