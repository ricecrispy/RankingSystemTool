"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Season = require("../models/Season");

var _Season2 = _interopRequireDefault(_Season);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Leaderboard = function Leaderboard(name) {
    _classCallCheck(this, Leaderboard);

    this.leaderboardName = name;

    var newSeason = new _Season2.default();
    this.currentMonth = newSeason.createdMonth;
    this.currentYear = newSeason.createdYear;

    this.seasonList = new Array();

    this.seasonList.push(newSeason);
}

// CreateNewSeason() {
//     let leaderboard = new leaderboard();
//     this.currentMonth = leaderboard.createdMonth;
//     this.currentYear = leaderboard.createdYear;
//     this.seasonList.push(leaderboard);
// }
;

exports.default = Leaderboard;