import FootballLeague from './classes/PointsBasedLeague.js'
import { europeanTeams } from './teams.js'

const config = { roundsLeague: 1 }
const octavosRound = new FootballLeague('World Cup', europeanTeams, config)

const teamNames = octavosRound.teams.map(team => team.name)
/*
teamNames.forEach(function(equipo) {
    console.log(equipo)
})
*/

octavosRound.scheduleMatchDays()

// Mostramos por pantala las jornadas y sus partidos
let i = 1
octavosRound.matchDaySchedule.forEach(matchDay => {
    console.log(`JORNADA ${i}`)
    matchDay.forEach(match => {
        const home = match[0] != null ? match[0] : 'DESCANSA'
        const away = match[1] != null ? match[1] : 'DESCANSA'
        console.log(`${home} vs ${away}`)
    })
    i++
})


// Comenzamos la liga
europeanTeams.start()

// mostrar por pantalla los resultados de cada jornada y la clasificación
i = 1
europeanTeams.summaries.forEach(summary => {
    console.log(`RESUMEN JORNADA ${i}`)
    summary.results.forEach(result => {
        console.log(`${result.homeTeam} ${result.homeGoals} - ${result.awayGoals} ${result.awayTeam}`)
    })
    console.table(summary.standings)
    i++
})
