import FootballLeague from './classes/Matches.js'
import KnockoutRounds from './classes/KnockoutRounds.js'

const ROUNDS= 4
const config = { roundsLeague: 1 }
const nextRoundTeams= new KnockoutRounds;


for (let i=0;i<ROUNDS;i++){
    const nextRound = new FootballLeague('World Cup', nextRoundTeams.listNextRoundTeams, config) 

    nextRound.scheduleMatchDays()
// Mostramos por pantala las jornadas y sus partidos
    nextRoundTeams.showTeamsKnockout(nextRound.matchDaySchedule)
// Comenzamos la liga
    nextRound.start()
// mostrar por pantalla los resultados de cada jornada y la clasificación
    nextRoundTeams.resultsMatchKnockout(nextRound.summaries)

}

console.log (' --------GANADOR---------')
console.log (nextRoundTeams.listNextRoundTeams[0])




