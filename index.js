!function() {
  function merge() {
    var target = arguments[0];
    var sources = Array.prototype.slice.call(arguments, 1);
    var source;

    for(var i = 0; i < sources.length; i++) {
      source = sources[i];

      if (!source) {
        continue;
      }

      for(var attr in source) {
        if (source.hasOwnProperty(attr) && !/^[0-9]+$/.test(attr)) {
          target[attr] = source[attr];
        }
      }
    }

    return target;
  }

  function getPath(node) {
    var values = [],
        current = node;

    if (node.length) {
      values.push(node);
    }

    while(current = Ceibo.parent(current)) {
      if (current.__scope) {
        values.unshift(current.__scope);
      }
    }

    return values;
  }

  var FIRST;
  function buildObject(node, blueprintKey, blueprint) {
    var value;

    if (FIRST && blueprint.visit) {
      FIRST = false;
      value = new String(blueprint.visit);
      delete blueprint.visit;
      Ceibo.defineProperty(node, blueprintKey, value);
    } else {
      value = new String(blueprint.scope || '');
      value.__scope = blueprint.scope;
      value.__blueprint = blueprint;
      delete blueprint.scope;

      Ceibo.defineProperty(node, blueprintKey, undefined, function() {
        var path = getPath(node);

        if (value.length) {
          path.push(value + '');
        }

        var newvalue = new String(path.join(' '));
        merge(newvalue, value);

        return newvalue;
      });
    }

    return [value, blueprint];
  }

  function buildString(node, blueprintKey, str) {
    var value = new String(str);

    Ceibo.defineProperty(node, blueprintKey, undefined, function() {
      var path = getPath(node);
      path.push(value);

      return path.join(' ');
    });
  }

  var Ombu = {};

  Ombu.create = function create(definition) {
    FIRST = true;

    var tree = Ceibo.create(definition || {}, {
      builder: {
        object: buildObject,
        string: buildString
      }
    });

    return tree;
  };

  if (typeof define === 'function') {
    define('ombu', ['exports'], function(__exports__) {
      'use strict';
      __exports__.Ombu = Ombu;
      __exports__.default = Ombu;
    });
  } else {
    window.Ombu = Ombu;
  }
}();
