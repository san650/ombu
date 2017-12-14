# Ombu

![Latest version](https://img.shields.io/npm/v/ombu.svg)

JavaScript micro library to help modelling really simple page objects.

## Synopsis

```js
var page = Ombu.create({
  visit: '/path',

  foo: {
    scope: '.a-foo',

    bar: '.a-bar'
  }
});

console.log(page); // "/path"
console.log(page.foo); // ".a-foo"
console.log(page.foo.bar); // ".a-foo .a-bar"
```

## Usage

Ombu depends on [`Ceibo`](https://github.com/san650/ceibo) library. You need to load this library before Ombu.

```html
<html>
  <head>
    ...
    <script src="/path_to_ceibo/index.js"></script>
    <script src="/path_to_ombu/index.js"></script>
  </head>
  ...
</html>
```

## API

### `Ombu.create(object)`

TBA

### `normalize(text)`

Trim whitespaces at both ends and normalize whitespaces inside `text`.

Due to variations in the HTML parsers in different browsers, the text returned may vary in newlines and other white space.

See [http://api.jquery.com/text/](http://api.jquery.com/text/).

```js
normalize('Hello   \n\nWorld!\n') === 'Hello World!'
```

## Project's health

[![Build Status](https://travis-ci.org/san650/ombu.svg?branch=master)](https://travis-ci.org/san650/ombu)

## License

Ombu is licensed under the MIT license.

See [LICENSE](./LICENSE) for the full license text.
