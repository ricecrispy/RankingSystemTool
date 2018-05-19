"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Season = function Season() {
    _classCallCheck(this, Season);

    var today = new Date();
    this.createdMonth = today.getUTCMonth() + 1;
    this.createdYear = today.getUTCFullYear();
    this.rankedPlayerList = new Array();
    this.allPlayerList = new Array();
};

exports.default = Season;