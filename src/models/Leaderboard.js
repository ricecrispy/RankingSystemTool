import Season from "../models/Season";

export default class Leaderboard {
    constructor(name) {
        this.leaderboardName = name;

        let newSeason = new Season();
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
}