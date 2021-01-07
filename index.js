import FinalsRoundsMatches from './classes/Matches.js'
import KnockoutRounds from './classes/KnockoutRounds.js'

const ROUNDS= 4
const nextRoundTeams= new KnockoutRounds;

console.log ('============================================')
console.log ('=== COMIENZO DE LA FASE DE ELIMINATORIAS ===')
console.log ('============================================')

for (let round=0;round<ROUNDS;round++){

    switch(round){
        case 0:
            nextRoundTeams.nameRound='OCTAVOS'
            break
        case 1:
            nextRoundTeams.nameRound='CUARTOS'
            break  
        case 2:
            nextRoundTeams.nameRound='SEMIFINALES'
            break 
        case 3:
            nextRoundTeams.nameRound='FINAL'
            break 
    }
    const nextRound = new FinalsRoundsMatches(nextRoundTeams.nameRound, nextRoundTeams.listNextRoundTeams) 

    nextRound.scheduleMatchDays()
// Mostramos por pantala las jornadas y sus partidos
    nextRoundTeams.showTeamsKnockout(nextRound.matchDaySchedule)
// Comenzamos la liga
    nextRound.start()
// mostrar por pantalla los resultados de cada jornada y la clasificación
    nextRoundTeams.resultsMatchKnockout(nextRound.summaries)

}

console.log ('================= GANADOR ==================')
console.log (nextRoundTeams.listNextRoundTeams[0] + ' es campeona del mundo')




