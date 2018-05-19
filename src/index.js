import express from "express";
import bodyParser from "body-parser";
import PersonAPI from "./API/PersonAPI";
import LeaderboardAPI from "./API/LeaderboardAPI";

const staticResourcePath = `${__dirname}/static/`;
console.log(`staticResourcePath: ${staticResourcePath}`);
const port = process.env.port || 3000;
const testPersonApi = new PersonAPI();
const leaderboardApi = new LeaderboardAPI();
const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server
  .get("/", (req, res) => {
    res.sendFile(`${staticResourcePath}landingPage.html`);
  })

  //PERSON API STUFF---------------------------------------------------------
  .get("/api/printallusers", (req, res) => {
    res.send(testPersonApi.PrintAllParticipantsID());
  })

  .get("/api/getuserstat/:id", (req, res) => {
    res.send(testPersonApi.GetPersonStat(req.params.id));
  })

  .post("/api/createuser", (req, res) => {
    console.log(req.body);
    let userId = req.body.userId;

    let resultString = "";
    let newPerson = testPersonApi.CreatePerson(userId);
    if (newPerson !== null) {
      resultString = `User ${newPerson.userId} has been created!`;
    } else {
      resultString = `User ${
        newPerson.userId
      } has NOT been created. He/she might already exist!`;
    }

    res.send(resultString);
  })

  

  //PERSON API STUFF ENDS HERE--------------------------------------------------





  //LEADERBOARD API STUFF-------------------------------------------------------
  .post("/api/createnewgameleaderboard", (req, res) => {
    let leaderboardName = req.body.leaderboardName;
    if (leaderboardApi.LeaderboardExists(leaderboardName)) {
      res.send(`${leaderboardName} already exists!`);
    } else {
      leaderboardApi.CreateNewLeaderboard(leaderboardName);
      console.log(
        leaderboardApi.LeaderboardExists(leaderboardName)
      );
      console.log(leaderboardApi.GetLeaderboardByName(leaderboardName));
      res.send(`${leaderboardName} has been created`);
    }
  })

  .post("/api/reportmatch", (req, res) => {
    let leaderboardName = req.body.leaderboardName;
    let playerOne = req.body.playerOne;
    let playerTwo = req.body.playerTwo;
    let playerOneWins = req.body.playerOneWins;

    let today = new Date();
    let month = today.getUTCMonth() + 1;
    let year = today.getUTCFullYear();

    leaderboardApi.ReportMatch(leaderboardName, month, year, playerOne, playerTwo, playerOneWins);
    res.send("Match reported");
  })

  .post("/api/getleaderboardallplayerslist", (req, res) => {
    let leaderboardName = req.body.leaderboardName;
    let month = req.body.seasonMonth;
    let year = req.body.seasonYear;

    let resultList = leaderboardApi.GetAllPlayersListFromSeason(leaderboardName, month, year);
    res.send(`List of all players: ${resultList}`);
  })

  .post("/api/getleaderboardRankedplayerslist", (req, res) => {
    let leaderboardName = req.body.leaderboardName;
    let month = req.body.seasonMonth;
    let year = req.body.seasonYear;

    let resultList = leaderboardApi.GetAllRankedPlayersListFromSeason(leaderboardName, month, year);
    res.send(`List of all ranked players: ${resultList}`);
  })

  //Leaderboard API stuff ends here---------------------------------------------------------

  
  .listen(port, () => console.log(`Listening on port: ${port}...`));
