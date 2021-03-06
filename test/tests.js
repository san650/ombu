module('Unit | Ombu.create');

test('uses `visit` as root string', function(assert) {
  var tree = Ombu.create({
    visit: '/path'
  });

  assert.equal(tree, '/path');
});

test('read scope for root', function(assert) {
  var tree = Ombu.create({
    scope: '.a-root'
  });

  assert.equal(tree, '.a-root');
});

test('uses visits if both are defined', function(assert) {
  var tree = Ombu.create({
    visit: '/path',
    scope: '.a-root'
  });

  assert.equal(tree, '/path');
});

test('leaf nodes return a string', function(assert) {
  var tree = Ombu.create({
    foo: '.a-foo'
  });

  assert.equal(tree.foo, '.a-foo');
});

test('appends scope to leafs', function(assert) {
  var tree = Ombu.create({
    foo: {
      scope: '.a-foo',

      bar: '.a-bar'
    }
  });

  assert.equal(tree.foo, '.a-foo');
  assert.equal(tree.foo.bar, '.a-foo .a-bar');
});

test('appends scope to nodes', function(assert) {
  var tree = Ombu.create({
    foo: {
      scope: '.a-foo',

      bar: {
        scope: '.a-bar',

        baz: '.a-baz'
      }
    }
  });

  assert.equal(tree.foo.bar, '.a-foo .a-bar');
  assert.equal(tree.foo.bar.baz, '.a-foo .a-bar .a-baz');
});

test('multiple levels', function(assert) {
  var tree = Ombu.create({
    foo: {
      scope: '.a-foo',

      bar: {
        scope: '.a-bar',

        baz: {
          qux: '.a-qux'
        }
      }
    }
  });

  assert.equal(tree, '');
  assert.equal(tree.foo, '.a-foo');
  assert.equal(tree.foo.bar, '.a-foo .a-bar');
  assert.equal(tree.foo.bar.baz, '.a-foo .a-bar');
  assert.equal(tree.foo.bar.baz.qux, '.a-foo .a-bar .a-qux');
});

test('string property and visit', function(assert) {
  var tree = Ombu.create({
    visit: '/path',
    foo: '.a-foo'
  });

  assert.equal(tree.foo, '.a-foo');
});

module('Unit | .normalize');

test('normalize spaces', function(assert) {
  assert.equal(normalize('Hello   \n\nWorld!\n'), 'Hello World!');
});
