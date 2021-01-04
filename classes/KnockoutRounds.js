import { octavosTeams } from '../teams.js'
export default class KnockoutRounds{

    constructor() {
        this.round=1
        this.nameRound
        this.listNextRoundTeams =  octavosTeams
    }

    showTeamsKnockout (teams){
        let i=1;
        teams.forEach(matchDay => {
            switch(this.round){
                case 1:
                    console.log(`----- EQUIPOS OCTAVOS -----`)
                    this.nameRound='OCTAVOS'
                    this.round++
                    break
                case 2:
                    console.log(`----- EQUIPOS CUARTOS -----`)
                    this.nameRound='CUARTOS'
                    this.round++
                    break  
                case 3:
                    console.log(`----- EQUIPOS SEMIFINALES -----`)
                    this.nameRound='SEMIFINALES'
                    this.round++
                    break 
                case 4:
                    console.log(`----- EQUIPOS FINAL -----`)
                    this.nameRound='FINAL'
                    this.round++
                    break 
            }

            
            matchDay.forEach(match => {
                const home = match[0] 
                const away = match[1]
                console.log(`${home} vs ${away}`)
            })
            i++
        })
    }

    resultsMatchKnockout(matches){
        matches.forEach(summary => {
            console.log(`----- RESULTADOS ${this.nameRound} -----`) 
            this.listNextRoundTeams=[]
    summary.results.forEach(result => {
        console.log(`${result.homeTeam} ${result.homeGoals} - ${result.awayGoals} ${result.awayTeam}`)
        
        if (result.homeGoals>result.awayGoals)
        this.listNextRoundTeams.push(result.homeTeam)
        else
        this.listNextRoundTeams.push(result.awayTeam)

   
    })
})

    }
}