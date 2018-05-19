export default class Season {
    constructor() {
        var today = new Date();
        this.createdMonth = today.getUTCMonth() + 1;
        this.createdYear = today.getUTCFullYear();
        this.rankedPlayerList = new Array();
        this.allPlayerList = new Array();
    }
}