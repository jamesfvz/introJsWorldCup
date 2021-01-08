import FinalsRoundsMatches from "./classes/Matches.js";
import KnockoutRounds from "./classes/KnockoutRounds.js";
import FootballLeague from "./classes/PointsBasedLeague.js";
import { worldCupTeams } from "./teams.js";

const config = { rounds: 1 };

worldCupTeams.shuffle();
const groupATeams = worldCupTeams.slice(0, 4);
const groupBTeams = worldCupTeams.slice(4, 8);
const groupCTeams = worldCupTeams.slice(8, 12);
const groupDTeams = worldCupTeams.slice(12, 16);
const groupETeams = worldCupTeams.slice(16, 20);
const groupFTeams = worldCupTeams.slice(20, 24);
const groupGTeams = worldCupTeams.slice(24, 28);
const groupHTeams = worldCupTeams.slice(28, 32);

export const classified = [];

const allGroupsLeague = [
  groupATeams,
  groupBTeams,
  groupCTeams,
  groupDTeams,
  groupETeams,
  groupFTeams,
  groupGTeams,
  groupHTeams,
];

var iterator = 0;
var groupName;
for (const group of allGroupsLeague) {
  switch (iterator) {
    case 0:
      groupName = "Grupo A";
      break;
    case 1:
      groupName = "Grupo B";
      break;
    case 2:
      groupName = "Grupo C";
      break;
    case 3:
      groupName = "Grupo D";
      break;
    case 4:
      groupName = "Grupo E";
      break;
    case 5:
      groupName = "Grupo F";
      break;
    case 6:
      groupName = "Grupo G";
      break;
    case 7:
      groupName = "Grupo H";
      break;
  }

  console.log("==================== " + groupName + " ==================");
  console.log("===============================================");

  const leagueGroup = new FootballLeague(groupName, group, config);

  leagueGroup.scheduleMatchDays();

  // Mostramos por pantala las jornadas y sus partidos
  let i = 1;
  leagueGroup.matchDaySchedule.forEach((matchDay) => {
    console.log(`JORNADA ${i}`);
    matchDay.forEach((match) => {
      const home = match[0] != null ? match[0] : "DESCANSA";
      const away = match[1] != null ? match[1] : "DESCANSA";
      console.log(`${home} vs ${away}`);
    });
    i++;
  });

  leagueGroup.start();

  // mostrar por pantalla los resultados de cada jornada y la clasificación
  i = 1;
  leagueGroup.summaries.forEach((summary) => {
    console.log(`RESUMEN JORNADA ${i}`);
    summary.results.forEach((result) => {
      console.log(
        `${result.homeTeam} ${result.homeGoals} - ${result.awayGoals} ${result.awayTeam}`
      );
    });
    console.table(
      summary.standings.map((team) => {
        return {
          Team: team.name,
          Points: team.points,
          PlayedMatches: team.matchesWon + team.matchesDrawn + team.matchesLost,
          Won: team.matchesWon,
          Drawn: team.matchesDrawn,
          Lost: team.matchesLost,
          GoalsFor: team.goalsFor,
          GoalsAgainst: team.goalsAgainst,
          GoalsDiff: team.goalsFor - team.goalsAgainst,
        };
      })
    );
    i++;
  });

  classified.push(leagueGroup.teams[0].name);
  classified.push(leagueGroup.teams[1].name);
  iterator++;
}

console.log("============================================");
console.log("=== COMIENZO DE LA FASE DE ELIMINATORIAS ===");
console.log("============================================");

const ROUNDS = 4;
const nextRoundTeams = new KnockoutRounds();

for (let round = 0; round < ROUNDS; round++) {
  switch (round) {
    case 0:
      nextRoundTeams.nameRound = "OCTAVOS";
      break;
    case 1:
      nextRoundTeams.nameRound = "CUARTOS";
      break;
    case 2:
      nextRoundTeams.nameRound = "SEMIFINALES";
      break;
    case 3:
      nextRoundTeams.nameRound = "FINAL";
      break;
  }
  const nextRound = new FinalsRoundsMatches(
    nextRoundTeams.nameRound,
    nextRoundTeams.listNextRoundTeams
  );

  nextRound.scheduleMatchDaysMatches();
  // Mostramos por pantala las jornadas y sus partidos
  nextRoundTeams.showTeamsKnockout(nextRound.matchDaySchedule);
  // Comenzamos la liga
  nextRound.start();
  // mostrar por pantalla los resultados de cada jornada y la clasificación
  nextRoundTeams.resultsMatchKnockout(nextRound.summaries);
}

console.log("================= GANADOR ==================");
console.log(nextRoundTeams.listNextRoundTeams[0] + " es campeona del mundo");
