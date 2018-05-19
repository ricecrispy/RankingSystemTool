"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _PersonAPI = require("./API/PersonAPI");

var _PersonAPI2 = _interopRequireDefault(_PersonAPI);

var _LeaderboardAPI = require("./API/LeaderboardAPI");

var _LeaderboardAPI2 = _interopRequireDefault(_LeaderboardAPI);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var staticResourcePath = __dirname + "/static/";
console.log("staticResourcePath: " + staticResourcePath);
var port = process.env.port || 3000;
var testPersonApi = new _PersonAPI2.default();
var leaderboardApi = new _LeaderboardAPI2.default();
var server = (0, _express2.default)();
server.use(_bodyParser2.default.json());
server.use(_bodyParser2.default.urlencoded({ extended: true }));

server.get("/", function (req, res) {
  res.sendFile(staticResourcePath + "landingPage.html");
})

//PERSON API STUFF---------------------------------------------------------
.get("/api/printallusers", function (req, res) {
  res.send(testPersonApi.PrintAllParticipantsID());
}).get("/api/getuserstat/:id", function (req, res) {
  res.send(testPersonApi.GetPersonStat(req.params.id));
}).post("/api/createuser", function (req, res) {
  console.log(req.body);
  var userId = req.body.userId;

  var resultString = "";
  var newPerson = testPersonApi.CreatePerson(userId);
  if (newPerson !== null) {
    resultString = "User " + newPerson.userId + " has been created!";
  } else {
    resultString = "User " + newPerson.userId + " has NOT been created. He/she might already exist!";
  }

  res.send(resultString);
})

//PERSON API STUFF ENDS HERE--------------------------------------------------


//LEADERBOARD API STUFF-------------------------------------------------------
.post("/api/createnewgameleaderboard", function (req, res) {
  var leaderboardName = req.body.leaderboardName;
  if (leaderboardApi.LeaderboardExists(leaderboardName)) {
    res.send(leaderboardName + " already exists!");
  } else {
    leaderboardApi.CreateNewLeaderboard(leaderboardName);
    console.log(leaderboardApi.LeaderboardExists(leaderboardName));
    console.log(leaderboardApi.GetLeaderboardByName(leaderboardName));
    res.send(leaderboardName + " has been created");
  }
}).post("/api/reportmatch", function (req, res) {
  var leaderboardName = req.body.leaderboardName;
  var playerOne = req.body.playerOne;
  var playerTwo = req.body.playerTwo;
  var playerOneWins = req.body.playerOneWins;

  var today = new Date();
  var month = today.getUTCMonth() + 1;
  var year = today.getUTCFullYear();

  leaderboardApi.ReportMatch(leaderboardName, month, year, playerOne, playerTwo, playerOneWins);
  res.send("Match reported");
}).post("/api/getleaderboardallplayerslist", function (req, res) {
  var leaderboardName = req.body.leaderboardName;
  var month = req.body.seasonMonth;
  var year = req.body.seasonYear;

  var resultList = leaderboardApi.GetAllPlayersListFromSeason(leaderboardName, month, year);
  res.send("List of all players: " + resultList);
}).post("/api/getleaderboardRankedplayerslist", function (req, res) {
  var leaderboardName = req.body.leaderboardName;
  var month = req.body.seasonMonth;
  var year = req.body.seasonYear;

  var resultList = leaderboardApi.GetAllRankedPlayersListFromSeason(leaderboardName, month, year);
  res.send("List of all ranked players: " + resultList);
})

//Leaderboard API stuff ends here---------------------------------------------------------


.listen(port, function () {
  return console.log("Listening on port: " + port + "...");
});