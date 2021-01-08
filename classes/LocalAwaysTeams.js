    export {setLocalTeamsConfig, fixLastTeamScheduleConfig}
    import { LOCAL_TEAM, AWAY_TEAM } from './League.js'
   

    function setLocalTeamsConfig(round,teamNames) {
        const maxHomeTeams = teamNames.length - 2
        let teamIndex = 0
        round.forEach(matchDay => { // por cada jornada
            matchDay.forEach(match => { // por cada partido de cada jornada
                // establecer el equipo local
                match[LOCAL_TEAM] = teamNames[teamIndex]
                teamIndex++
                if (teamIndex > maxHomeTeams) {
                    teamIndex = 0
                }
            })
        })
    }


    function fixLastTeamScheduleConfig(round,teamNames) {
        let matchDayNumber = 1
        const lastTeamName = teamNames[teamNames.length - 1]
        round.forEach(matchDay => {
            const firstMatch = matchDay[0]
            if (matchDayNumber % 2 == 0) { // si jornada par -> juega en casa
                firstMatch[AWAY_TEAM] = firstMatch[LOCAL_TEAM]
                firstMatch[LOCAL_TEAM] = lastTeamName
            } else { // jornada impar -> juega fuera
                firstMatch[AWAY_TEAM] = lastTeamName
            }
            matchDayNumber++
        })
    }
