!function() {

  var Ombu = {};

  Ombu.create = function create() {
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
