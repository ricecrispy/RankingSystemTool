# RankingSystemTool
Implementing my own elo system
## Model
    Person
        Properties:
            - totalWin
            - totalLoss
            - rating
    Season
        Properties:
            - createdMonth
            - createdYear
            - rankedPlayerList
            - allPlayerList
    Leaderboard
        Properties:
            - leaderboardName
            - currentMonth
            - currentYear
            - seasonList
## API
    LeaderboardAPI

    PersonAPI