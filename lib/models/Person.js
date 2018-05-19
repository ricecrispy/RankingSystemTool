"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Person = function Person(newId) {
  _classCallCheck(this, Person);

  this.userId = newId;
  this.totalWin = 0;
  this.totalLoss = 0;
  this.ranking = 0;
};

exports.default = Person;