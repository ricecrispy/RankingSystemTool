import Leaderboard from "../models/Leaderboard";
import PersonAPI from "../API/PersonAPI";
import Season from "../models/Season";

export default class LeaderboardAPI {
  constructor() {
    this.AllLeaderboardsList = new Array();
  }

  CreateNewLeaderboard(name) {
    let newLeaderboard = new Leaderboard(name);
    this.AllLeaderboardsList.push(newLeaderboard);
  }

  CreateNewSeasonForLeaderboard(name) {
    if (this.LeaderboardExists(name)) {
      let leaderboard = this.GetLeaderboardByName(name);
      let newSeason = new Season();
      leaderboard.seasonList.push(newSeason);
    }
  }

  LeaderboardExists(name) {
    let result = false;
    this.AllLeaderboardsList.forEach(leaderboard => {
      if (leaderboard.leaderboardName === name) {
        result = true;
      }
    });
    return result;
  }

  GetLeaderboardByName(name) {
    let leaderboard = this.AllLeaderboardsList.find(leaderboard => {
      return leaderboard.leaderboardName === name;
    });

    return leaderboard;
  }

  GetSeasonFromLeaderboardByMonthAndYear(name, month, year) {
    if (this.LeaderboardExists(name)) {
      let leaderboard = this.GetLeaderboardByName(name);

      let result = leaderboard.seasonList.find(season => {
        return season.createdMonth === month && season.createdYear === year;
      });

      return result;
    }
  }

  GetAllPlayersListFromSeason(name, month, year) {
    let season = this.GetSeasonFromLeaderboardByMonthAndYear(name, month, year);
    if (season !== null) {
      console.log(`AllPlayerList:`);
      console.log(season.allPlayerList);
      return season.allPlayerList;
    }
  }

  GetAllRankedPlayersListFromSeason(name, month, year) {
    let season = this.GetSeasonFromLeaderboardByMonthAndYear(name, month, year);
    if (season !== null) {
      console.log(`RankedPlayerList`);
      console.log(season.rankedPlayerList);
      return season.rankedPlayerList;
    }
  }

  ReportMatch(name, month, year, playerOneUserId, playerTwoUserId, didPlayerOneWin) {
    let currentSeason = this.GetSeasonFromLeaderboardByMonthAndYear(name, month, year);
    if (currentSeason !== null) {
      let personApi = new PersonAPI(currentSeason);
      personApi.ReportMatchResult(playerOneUserId, playerTwoUserId, didPlayerOneWin);
    }
  }




  SortLeaderboardByWinRate() {}

  SortLeaderboardByRating() {}
}
