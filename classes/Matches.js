Array.prototype.shuffle = function()
    {
        var i = this.length;
        while (i)
        {
            var j = Math.floor(Math.random() * i);
            var t = this[--i];
            this[i] = this[j];
            this[j] = t;
        }
        return this;
    }
    export const LOCAL_TEAM = 0
    export const AWAY_TEAM = 1
export default class Matches{

 
    
        constructor(name, teams=[], config={}) {
            this.name = name
            this.matchDaySchedule = []
            this.setup(config)
            this.setupTeams(teams)
            this.summaries = []
        }
    
        setup(config) {
            const defaultConfig = { rounds: 1 }
            this.config = Object.assign(defaultConfig, config)
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
    

    
        initSchedule(round) {

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
    

    
        scheduleMatchDays() {
            
                const newRound = this.createRound()
                this.matchDaySchedule = this.matchDaySchedule.concat(newRound)
         
        }
    
        createRound() {
           
            const newRound = []
            this.initSchedule(newRound)
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
                    let result = this.play(match)
                    while(result.homeGoals == result.awayGoals){
                        result = this.play(match)
                    }  
                    
                    this.updateTeams(result)  // actualizamos los equipos con el resultado de partido
                    matchDaySummary.results.push(result)
                    
                }
                
                // Guardar resumen de la jornada
                this.summaries.push(matchDaySummary)
            }
        }
    
  
    
        updateTeams(result) {
            // buscar el equipo por su nombre en el array de equipos
            const homeTeam = this.getTeamForName(result.homeTeam)
            const awayTeam = this.getTeamForName(result.awayTeam)
            const match = [homeTeam,awayTeam]
            if (homeTeam && awayTeam) { // si ecuentra ambos equipos
    
                homeTeam.goalsFor += result.homeGoals
                homeTeam.goalsAgainst += result.awayGoals
                awayTeam.goalsFor += result.awayGoals
                awayTeam.goalsAgainst += result.homeGoals
    
                // if (result.homeGoals > result.awayGoals) { // gana equipo local
                //     homeTeam.points += this.config.pointsPerWin
                //     homeTeam.matchesWon += 1
                //     awayTeam.points += this.config.pointsPerLose
                //     awayTeam.matchesLost += 1
                // } else if (result.homeGoals < result.awayGoals) { // gana equipo visitante
                //     homeTeam.points += this.config.pointsPerLose
                //     homeTeam.matchesLost += 1
                //     awayTeam.points += this.config.pointsPerWin
                //     awayTeam.matchesWon += 1
                // }
            }
        }

        getTeamForName(name) {
            return this.teams.find(team => team.name == name)
        }

        play(match) {
            const homeGoals = this.generateGoals()
            const awayGoals = this.generateGoals()
            return {
                homeTeam: match[LOCAL_TEAM],
                homeGoals,
                awayTeam: match[AWAY_TEAM],
                awayGoals
            }
        }
    
  
    
    generateGoals() {
        return Math.round(Math.random() * 10)
    }
}