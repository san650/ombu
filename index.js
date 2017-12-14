!function() {
  function def(exports, Ceibo) {

    if (Ceibo.Ceibo) {
      Ceibo = Ceibo.Ceibo;
    }

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
        if (node.__isRoot) {
          if (node.__scope) {
            values.push(node.__scope);
          }
        } else {
          values.push(node);
        }
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
        value.__isRoot = true;
        Ceibo.defineProperty(node, blueprintKey, value);
      } else {
        value = new String(blueprint.scope || '');

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

      value.__scope = blueprint.scope;
      delete blueprint.scope;

      return [value, blueprint];
    }

    function buildString(node, blueprintKey, str) {
      var value = new String(str);

      Ceibo.defineProperty(node, blueprintKey, undefined, function() {
        var path = getPath(node);
        path.push(value + '');

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

    exports.Ombu = Ombu;

    if (typeof define === 'function') {
      exports.default = Ombu;
    }

    /**
     * Trim whitespaces at both ends and normalize whitespaces inside `text`
     *
     * Due to variations in the HTML parsers in different browsers, the text
     * returned may vary in newlines and other white space.
     *
     * @see http://api.jquery.com/text/
     */
    function normalize(string) {
      if (!string) {
        string = '';
      }

      return string.trim().replace(/\n/g, ' ').replace(/\s\s*/g, ' ');
    }

    exports.normalize = normalize;
  }

  if (typeof define === 'function') {
    define('ombu', ['exports', 'ceibo'], def);
  } else {
    def(window, Ceibo);
  }
}();
