import { AWAY_TEAM } from './League.js'
import {setLocalTeamsConfig,play} from './LocalAwaysTeams.js'

    export default class Matches{

        constructor(name, teams=[]) {
            this.name = name
            this.matchDaySchedule = []
            this.setupTeams(teams)
            this.summaries = []
        }
    
    
        setupTeams(teamNames) {
            this.teams = []
            for (const teamName of teamNames) {
                const team = {
                    name: teamName
                }
                this.teams.push(team)
            }
            this.teams.shuffle()
        }
    

    
        initScheduleMatches(round) {

            const numberOfMatchesPerMatchDay = this.teams.length / 2
           
                const matchDay = []  // jornada vacía
                for (let j = 0; j < numberOfMatchesPerMatchDay; j++) {
                    const match = ['Equipo local', 'Equipo visitante']  // partido
                    matchDay.push(match)
                }
                // una vez añadidos todos los partidos a la jornada
                round.push(matchDay)  // añadimos la ronda a la planificación
           
        }
    
        getTeamNames() {
            return this.teams.map(team => team.name)
        }
        
        getTeamNamesForSchedule() {
            const teamNames = this.getTeamNames()
            if (teamNames.length % 2 == 0) { // son pares
                return teamNames
            } else {
                return [...teamNames, null]
            }
        }
    
        setLocalTeams(round) {
            const teamNames = this.getTeamNamesForSchedule()
            setLocalTeamsConfig(round,teamNames)
            
        }
    
        setAwayTeams(round) {
            const teamNames = this.getTeamNamesForSchedule()
            const maxAwayTeams = teamNames.length - 1
            let teamIndex = maxAwayTeams
            round.forEach(matchDay => {
                let firstMatchFound = false
                matchDay.forEach(match => {
                        match[AWAY_TEAM] = teamNames[teamIndex]
                        teamIndex--
                        if (teamIndex < 0) {
                            teamIndex = maxAwayTeams
                        }
                })
            })
        }
    

    
        scheduleMatchDaysMatches() {
            
                const newRound = this.createRound()
                this.matchDaySchedule = this.matchDaySchedule.concat(newRound)
         
        }
    
        createRound() {
           
            const newRound = []
            this.initScheduleMatches(newRound)
            this.setLocalTeams(newRound)
            this.setAwayTeams(newRound)
            return newRound
        }

    
        start() {
            for (const matchDay of this.matchDaySchedule) {
                const matchDaySummary = {
                    results: [],
                    standings: undefined
                }
                for (const match of matchDay) {
                    let result = play(match)
                    while(result.homeGoals == result.awayGoals){
                        result = play(match)
                    }  
                    
                    this.updateTeamsMatches(result)  // actualizamos los equipos con el resultado de partido
                    matchDaySummary.results.push(result)
                    
                }
                
                // Guardar resumen de la jornada
                this.summaries.push(matchDaySummary)
            }
        }
    
  
    
        updateTeamsMatches(result) {
            // buscar el equipo por su nombre en el array de equipos
            const homeTeam = this.getTeamForName(result.homeTeam)
            const awayTeam = this.getTeamForName(result.awayTeam)
            const match = [homeTeam,awayTeam]
            if (homeTeam && awayTeam) { // si ecuentra ambos equipos
    
                homeTeam.goalsFor += result.homeGoals
                homeTeam.goalsAgainst += result.awayGoals
                awayTeam.goalsFor += result.awayGoals
                awayTeam.goalsAgainst += result.homeGoals
            }
        }

        getTeamForName(name) {
            return this.teams.find(team => team.name == name)
        }

        
}