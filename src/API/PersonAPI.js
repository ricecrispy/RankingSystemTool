import Person from "../models/Person";
import Season from "../models/Season";

export default class PersonAPI {
  constructor(season) {
    //TODO - replace this to the leaderboard object
    this.season = season;
  }

  CreatePerson(id) {
    if (!this.PersonExistsInList(id, this.season.allPlayerList)) {
      let newPerson = new Person(id);
      this.season.allPlayerList.push(newPerson);
      return newPerson;
    }
  }

  PersonExistsInList(id, playerList) {
    let result = false;
    playerList.forEach(person => {
      if (person.userId === id) {
        result = true;
      }
    });

    return result;
  }

  GotAWin(id) {
    if (this.PersonExistsInList(id, this.season.allPlayerList)) {
      let person = this.GetPersonFromAllPlayersList(id);
      person.totalWin++;
    }
  }

  GotALoss(id) {
    if (this.PersonExistsInList(id, this.season.allPlayerList)) {
      let person = this.GetPersonFromAllPlayersList(id);
      person.totalLoss++;
    }
  }

  GetTotalGamesPlayed(id) {
    if (this.PersonExistsInList(id, this.season.allPlayerList)) {
      let person = this.GetPersonFromAllPlayersList(id);
      return person.totalLoss + person.totalWin;
    }
  }

  GetWinRate(id) {
    if (this.PersonExistsInList(id, this.season.allPlayerList)) {
      if (this.GetTotalGamesPlayed(id) === 0) {
        return 0;
      }
      else {
        let person = this.GetPersonFromAllPlayersList(id);
        return ((person.totalWin) / this.GetTotalGamesPlayed(id)).toFixed(2);
      }
    }
  }

  PrintAllParticipantsID() {
    if (this.season.allPlayerList.length == 0) {
      return `the list is empty!`;
    } else {
      let result = "Participants:";
      this.season.allPlayerList.forEach(person => {
        result = `${result}\n${person.userId}`;
      });
      return result;
    }
  }

  GetPersonFromAllPlayersList(id) {
    let user = this.season.allPlayerList.find(person => {
      return person.userId === id;
    });

    return user;
  }

  GetPersonFromRankedPlayersList(id) {
    let user = this.season.rankedPlayerList.find(person => {
      return person.userId === id;
    })

    return user;
  }

  GetPersonStat(id) {
    if (this.PersonExistsInList(id, this.season.allPlayerList)) {
      let user = this.GetPersonFromAllPlayersList(id);
      let userStat = {
        userId: user.userId,
        wins: user.totalWin,
        losses: user.totalLoss,
        TotalGamesPlayed: this.GetTotalGamesPlayed(user.userId),
        winrate: this.GetWinRate(user.userId)
      };

      return userStat;
    }
  }

  ReportMatchResult(playerOneId, playerTwoId, playerOneWins) {
    let playerOne;
    let playerTwo;

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

UpdateRankedPlayersList(player) {
  if (this.GetTotalGamesPlayed(player.userId) >= 10) {
    if (this.PersonExistsInList(player.userId, this.season.rankedPlayerList)) {
      let oldPlayer = this.GetPersonFromRankedPlayersList(player.userId);
      oldPlayer = player;
    }
    else {
      this.season.rankedPlayerList.push(player);
    }

    console.log(`Printing players in rankedPlayerList...`);
    this.season.rankedPlayerList.forEach(person => {
      console.log(person);
    });
  }
  else {
    console.log(`Player ${player.userId} has only played ${this.GetTotalGamesPlayed(player.userId)} games. He/she needs to play at least 10 games to be ranked!`)
  }
}








}
