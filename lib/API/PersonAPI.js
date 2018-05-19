"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Person = require("../models/Person");

var _Person2 = _interopRequireDefault(_Person);

var _Season = require("../models/Season");

var _Season2 = _interopRequireDefault(_Season);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PersonAPI = function () {
  function PersonAPI(season) {
    _classCallCheck(this, PersonAPI);

    //TODO - replace this to the leaderboard object
    this.season = season;
  }

  _createClass(PersonAPI, [{
    key: "CreatePerson",
    value: function CreatePerson(id) {
      if (!this.PersonExistsInList(id, this.season.allPlayerList)) {
        var newPerson = new _Person2.default(id);
        this.season.allPlayerList.push(newPerson);
        return newPerson;
      }
    }
  }, {
    key: "PersonExistsInList",
    value: function PersonExistsInList(id, playerList) {
      var result = false;
      playerList.forEach(function (person) {
        if (person.userId === id) {
          result = true;
        }
      });

      return result;
    }
  }, {
    key: "GotAWin",
    value: function GotAWin(id) {
      if (this.PersonExistsInList(id, this.season.allPlayerList)) {
        var person = this.GetPersonFromAllPlayersList(id);
        person.totalWin++;
      }
    }
  }, {
    key: "GotALoss",
    value: function GotALoss(id) {
      if (this.PersonExistsInList(id, this.season.allPlayerList)) {
        var person = this.GetPersonFromAllPlayersList(id);
        person.totalLoss++;
      }
    }
  }, {
    key: "GetTotalGamesPlayed",
    value: function GetTotalGamesPlayed(id) {
      if (this.PersonExistsInList(id, this.season.allPlayerList)) {
        var person = this.GetPersonFromAllPlayersList(id);
        return person.totalLoss + person.totalWin;
      }
    }
  }, {
    key: "GetWinRate",
    value: function GetWinRate(id) {
      if (this.PersonExistsInList(id, this.season.allPlayerList)) {
        if (this.GetTotalGamesPlayed(id) === 0) {
          return 0;
        } else {
          var person = this.GetPersonFromAllPlayersList(id);
          return (person.totalWin / this.GetTotalGamesPlayed(id)).toFixed(2);
        }
      }
    }
  }, {
    key: "PrintAllParticipantsID",
    value: function PrintAllParticipantsID() {
      if (this.season.allPlayerList.length == 0) {
        return "the list is empty!";
      } else {
        var result = "Participants:";
        this.season.allPlayerList.forEach(function (person) {
          result = result + "\n" + person.userId;
        });
        return result;
      }
    }
  }, {
    key: "GetPersonFromAllPlayersList",
    value: function GetPersonFromAllPlayersList(id) {
      var user = this.season.allPlayerList.find(function (person) {
        return person.userId === id;
      });

      return user;
    }
  }, {
    key: "GetPersonFromRankedPlayersList",
    value: function GetPersonFromRankedPlayersList(id) {
      var user = this.season.rankedPlayerList.find(function (person) {
        return person.userId === id;
      });

      return user;
    }
  }, {
    key: "GetPersonStat",
    value: function GetPersonStat(id) {
      if (this.PersonExistsInList(id, this.season.allPlayerList)) {
        var user = this.GetPersonFromAllPlayersList(id);
        var userStat = {
          userId: user.userId,
          wins: user.totalWin,
          losses: user.totalLoss,
          TotalGamesPlayed: this.GetTotalGamesPlayed(user.userId),
          winrate: this.GetWinRate(user.userId)
        };

        return userStat;
      }
    }
  }, {
    key: "ReportMatchResult",
    value: function ReportMatchResult(playerOneId, playerTwoId, playerOneWins) {
      var playerOne = void 0;
      var playerTwo = void 0;

      if (this.PersonExistsInList(playerOneId, this.season.allPlayerList)) {
        playerOne = this.GetPersonFromAllPlayersList(playerOneId);
      } else {
        playerOne = this.CreatePerson(playerOneId);
      }

      if (this.PersonExistsInList(playerTwoId, this.season.allPlayerList)) {
        playerTwo = this.GetPersonFromAllPlayersList(playerTwoId);
      } else {
        playerTwo = this.CreatePerson(playerTwoId);
      }

      if (playerOneWins) {
        this.GotAWin(playerOne.userId);
        this.GotALoss(playerTwo.userId);
      } else {
        this.GotALoss(playerOne.userId);
        this.GotAWin(playerTwo.userId);
      }

      this.UpdateRankedPlayersList(playerOne);
      this.UpdateRankedPlayersList(playerTwo);
    }
  }, {
    key: "UpdateRankedPlayersList",
    value: function UpdateRankedPlayersList(player) {
      if (this.GetTotalGamesPlayed(player.userId) >= 10) {
        if (this.PersonExistsInList(player.userId, this.season.rankedPlayerList)) {
          var oldPlayer = this.GetPersonFromRankedPlayersList(player.userId);
          oldPlayer = player;
        } else {
          this.season.rankedPlayerList.push(player);
        }

        console.log("Printing players in rankedPlayerList...");
        this.season.rankedPlayerList.forEach(function (person) {
          console.log(person);
        });
      } else {
        console.log("Player " + player.userId + " has only played " + this.GetTotalGamesPlayed(player.userId) + " games. He/she needs to play at least 10 games to be ranked!");
      }
    }
  }]);

  return PersonAPI;
}();

exports.default = PersonAPI;