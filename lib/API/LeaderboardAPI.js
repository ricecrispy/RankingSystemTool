"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Leaderboard = require("../models/Leaderboard");

var _Leaderboard2 = _interopRequireDefault(_Leaderboard);

var _PersonAPI = require("../API/PersonAPI");

var _PersonAPI2 = _interopRequireDefault(_PersonAPI);

var _Season = require("../models/Season");

var _Season2 = _interopRequireDefault(_Season);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LeaderboardAPI = function () {
  function LeaderboardAPI() {
    _classCallCheck(this, LeaderboardAPI);

    this.AllLeaderboardsList = new Array();
  }

  _createClass(LeaderboardAPI, [{
    key: "CreateNewLeaderboard",
    value: function CreateNewLeaderboard(name) {
      var newLeaderboard = new _Leaderboard2.default(name);
      this.AllLeaderboardsList.push(newLeaderboard);
    }
  }, {
    key: "CreateNewSeasonForLeaderboard",
    value: function CreateNewSeasonForLeaderboard(name) {
      if (this.LeaderboardExists(name)) {
        var leaderboard = this.GetLeaderboardByName(name);
        var newSeason = new _Season2.default();
        leaderboard.seasonList.push(newSeason);
      }
    }
  }, {
    key: "LeaderboardExists",
    value: function LeaderboardExists(name) {
      var result = false;
      this.AllLeaderboardsList.forEach(function (leaderboard) {
        if (leaderboard.leaderboardName === name) {
          result = true;
        }
      });
      return result;
    }
  }, {
    key: "GetLeaderboardByName",
    value: function GetLeaderboardByName(name) {
      var leaderboard = this.AllLeaderboardsList.find(function (leaderboard) {
        return leaderboard.leaderboardName === name;
      });

      return leaderboard;
    }
  }, {
    key: "GetSeasonFromLeaderboardByMonthAndYear",
    value: function GetSeasonFromLeaderboardByMonthAndYear(name, month, year) {
      if (this.LeaderboardExists(name)) {
        var leaderboard = this.GetLeaderboardByName(name);

        var result = leaderboard.seasonList.find(function (season) {
          return season.createdMonth === month && season.createdYear === year;
        });

        return result;
      }
    }
  }, {
    key: "GetAllPlayersListFromSeason",
    value: function GetAllPlayersListFromSeason(name, month, year) {
      var season = this.GetSeasonFromLeaderboardByMonthAndYear(name, month, year);
      if (season !== null) {
        console.log("AllPlayerList:");
        console.log(season.allPlayerList);
        return season.allPlayerList;
      }
    }
  }, {
    key: "GetAllRankedPlayersListFromSeason",
    value: function GetAllRankedPlayersListFromSeason(name, month, year) {
      var season = this.GetSeasonFromLeaderboardByMonthAndYear(name, month, year);
      if (season !== null) {
        console.log("RankedPlayerList");
        console.log(season.rankedPlayerList);
        return season.rankedPlayerList;
      }
    }
  }, {
    key: "ReportMatch",
    value: function ReportMatch(name, month, year, playerOneUserId, playerTwoUserId, didPlayerOneWin) {
      var currentSeason = this.GetSeasonFromLeaderboardByMonthAndYear(name, month, year);
      if (currentSeason !== null) {
        var personApi = new _PersonAPI2.default(currentSeason);
        personApi.ReportMatchResult(playerOneUserId, playerTwoUserId, didPlayerOneWin);
      }
    }
  }, {
    key: "SortLeaderboardByWinRate",
    value: function SortLeaderboardByWinRate() {}
  }, {
    key: "SortLeaderboardByRating",
    value: function SortLeaderboardByRating() {}
  }]);

  return LeaderboardAPI;
}();

exports.default = LeaderboardAPI;