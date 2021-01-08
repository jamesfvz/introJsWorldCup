import {classified} from '../index.js'
export default class KnockoutRounds{

    constructor() {
        this.nameRound
        this.listNextRoundTeams =  classified
    }

    showTeamsKnockout (teams){

        teams.forEach(matchDay => {
            console.log(`----- EQUIPOS ${this.nameRound} -----`) 

            matchDay.forEach(match => {
                const home = match[0] 
                const away = match[1]
                console.log(`${home} vs ${away}`)
            })
        })
    }

    resultsMatchKnockout(matches){
        matches.forEach(summary => {
            console.log(`----- RESULTADOS ${this.nameRound} -----`) 
            this.listNextRoundTeams=[]
    summary.results.forEach(result => {
        //console.log(`${result.homeTeam} ${result.homeGoals} - ${result.awayGoals} ${result.awayTeam}`)
        
        if (result.homeGoals>result.awayGoals){
        console.log(`${result.homeTeam} ${result.homeGoals} - ${result.awayGoals} ${result.awayTeam} =>  ${result.homeTeam}`)
        this.listNextRoundTeams.push(result.homeTeam)
        }
        else{
        console.log(`${result.homeTeam} ${result.homeGoals} - ${result.awayGoals} ${result.awayTeam} =>  ${result.awayTeam}`)
        this.listNextRoundTeams.push(result.awayTeam)
        }
   
    })
})

    }
}