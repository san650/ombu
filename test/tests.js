module('Unit');

test('returns a string', function(assert) {
  var tree = Ombu.create('/path');

  assert.equal(tree, 'value');
});
