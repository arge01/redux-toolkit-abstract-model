/* eslint-disable @typescript-eslint/no-explicit-any */
import { MODEL as G } from "@/services/groups";
import {
  MODEL as M,
  QUA,
  QUARTER,
  SEMI,
  FINAL,
  MATCHES,
} from "@/services/matches";
import { MODEL as S } from "@/services/soccer";
import { MODEL as T } from "@/services/tournamed";
import { simulateMatchFinal } from "./simulationMatch";

interface GroupStanding {
  team: S;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
}

export function getWinnersFromMatches(matches: MATCHES[]): S[] {
  const winners: S[] = [];

  matches.forEach((match: any) => {
    if (Number(match.is_penalty)) {
      if (
        Number(match.goal_field_penalty) > Number(match.goal_outfield_penalty)
      ) {
        winners.push(match.field);
      }

      if (
        Number(match.goal_outfield_penalty) > Number(match.goal_field_penalty)
      ) {
        winners.push(match.outfield);
      }

      return;
    }

    if (!Number(match.is_penalty)) {
      if (Number(match.goal_field) > Number(match.goal_outfield)) {
        winners.push(match.field);
      }

      if (Number(match.goal_outfield) > Number(match.goal_field)) {
        winners.push(match.outfield);
      }
    }
  });

  return winners;
}

// QUA (8 matches - strict 1st vs 2nd pairings)
export function createQualificationMatches(
  groups: G[],
  soccers: S[],
  tournamed: T,
  matches: M[]
) {
  const newMatches: QUA[] = [];

  // 1. Calculate standings for each group
  const groupStandings: Record<string, GroupStanding[]> = {};

  groups.forEach((group) => {
    const groupTeams = soccers.filter((s) => s.groups?.id === group.id);
    const standings = groupTeams.map((team) => {
      const teamMatches = matches.filter(
        (m) =>
          m.groups?.id === group.id &&
          (m.field.id === team.id || m.outfield.id === team.id)
      );

      let points = 0;
      let goalsFor = 0;
      let goalsAgainst = 0;

      teamMatches.forEach((match: any) => {
        const isHome = match.field.id === team.id;
        const gf = isHome ? match.goal_field : match.goal_outfield;
        const ga = isHome ? match.goal_outfield : match.goal_field;

        goalsFor += gf;
        goalsAgainst += ga;

        if (gf > ga) points += 3;
        else if (gf === ga) points += 1;
      });

      return {
        team,
        points,
        goalsFor,
        goalsAgainst,
        goalDifference: goalsFor - goalsAgainst,
      };
    });

    // Sort by points, then goal difference, then goals scored
    standings.sort((a, b) => b.points - a.points);

    groupStandings[group.name] = standings;
  });

  // 2. Create qualification pairings
  const pairings = [
    // A1 vs B2
    { group1: "A", pos1: 0, group2: "B", pos2: 1 },
    // C1 vs D2
    { group1: "C", pos1: 0, group2: "D", pos2: 1 },
    // E1 vs F2
    { group1: "E", pos1: 0, group2: "F", pos2: 1 },
    // G1 vs H2
    { group1: "G", pos1: 0, group2: "H", pos2: 1 },
    // B1 vs A2
    { group1: "B", pos1: 0, group2: "A", pos2: 1 },
    // D1 vs C2
    { group1: "D", pos1: 0, group2: "C", pos2: 1 },
    // F1 vs E2
    { group1: "F", pos1: 0, group2: "E", pos2: 1 },
    // H1 vs G2
    { group1: "H", pos1: 0, group2: "G", pos2: 1 },
  ];

  // 3. Create matches based on pairings
  pairings.forEach((pairing, index) => {
    const team1 = groupStandings[pairing.group1]?.[pairing.pos1]?.team;
    const team2 = groupStandings[pairing.group2]?.[pairing.pos2]?.team;

    if (team1 && team2) {
      const simulate = simulateMatchFinal(team1, team2);
      newMatches.push({
        id: index, // You might want a better ID generation
        field: team1,
        outfield: team2,
        tournamed: tournamed,
        goalField: simulate.goalField,
        goalOutField: simulate.goalOutField,
        goalOutFieldPenalty: simulate.awayPenaltyGoals,
        goalFieldPenalty: simulate.homePenaltyGoals,
        isPenalty: simulate.isPenalty,
        // Add any other required fields
      });
    }
  });

  return newMatches;
}

// QUA (16 matches - strict 1st vs 2nd pairings)
export function createAllQualificationMatches(
  groups: G[],
  soccers: S[],
  tournamed: T,
  matches: M[]
) {
  const newMatches: QUA[] = [];

  // 1. Calculate standings for each group (1st and 2nd place)
  const groupStandings: Record<string, GroupStanding[]> = {};

  groups.forEach((group) => {
    const groupTeams = soccers.filter((s) => s.groups?.id === group.id);
    const standings = groupTeams.map((team) => {
      const teamMatches = matches.filter(
        (m) =>
          m.groups?.id === group.id &&
          (m.field.id === team.id || m.outfield.id === team.id)
      );

      let points = 0;
      let goalsFor = 0;
      let goalsAgainst = 0;

      teamMatches.forEach((match: any) => {
        const isHome = match.field.id === team.id;
        const gf = isHome ? match.goal_field : match.goal_outfield;
        const ga = isHome ? match.goal_outfield : match.goal_field;

        goalsFor += gf;
        goalsAgainst += ga;

        if (gf > ga) points += 3;
        else if (gf === ga) points += 1;
      });

      return {
        team,
        points,
        goalsFor,
        goalsAgainst,
        goalDifference: goalsFor - goalsAgainst,
      };
    });

    // Sort to get 1st and 2nd place
    standings.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.goalDifference !== a.goalDifference)
        return b.goalDifference - a.goalDifference;
      return b.goalsFor - a.goalsFor;
    });

    // Store only top 2 teams
    groupStandings[group.name] = standings.slice(0, 2);
  });

  // 2. Define 16 strict 1st vs 2nd pairings
  const pairings = [
    // Group A vs Others (4 matches)
    { homeGroup: "A", homePos: 0, awayGroup: "B", awayPos: 1 }, // A1 vs B2
    { homeGroup: "A", homePos: 0, awayGroup: "C", awayPos: 1 }, // A1 vs C2
    { homeGroup: "A", homePos: 0, awayGroup: "D", awayPos: 1 }, // A1 vs D2
    { homeGroup: "A", homePos: 1, awayGroup: "B", awayPos: 0 }, // A2 vs B1

    // Group B vs Others (4 matches)
    { homeGroup: "B", homePos: 0, awayGroup: "C", awayPos: 1 }, // B1 vs C2
    { homeGroup: "B", homePos: 0, awayGroup: "D", awayPos: 1 }, // B1 vs D2
    { homeGroup: "B", homePos: 1, awayGroup: "C", awayPos: 0 }, // B2 vs C1
    { homeGroup: "B", homePos: 1, awayGroup: "D", awayPos: 0 }, // B2 vs D1

    // Group C vs Others (4 matches)
    { homeGroup: "C", homePos: 0, awayGroup: "D", awayPos: 1 }, // C1 vs D2
    { homeGroup: "C", homePos: 0, awayGroup: "E", awayPos: 1 }, // C1 vs E2
    { homeGroup: "C", homePos: 1, awayGroup: "D", awayPos: 0 }, // C2 vs D1
    { homeGroup: "C", homePos: 1, awayGroup: "E", awayPos: 0 }, // C2 vs E1

    // Group D vs Others (4 matches)
    { homeGroup: "D", homePos: 0, awayGroup: "E", awayPos: 1 }, // D1 vs E2
    { homeGroup: "D", homePos: 0, awayGroup: "F", awayPos: 1 }, // D1 vs F2
    { homeGroup: "D", homePos: 1, awayGroup: "E", awayPos: 0 }, // D2 vs E1
    { homeGroup: "D", homePos: 1, awayGroup: "F", awayPos: 0 }, // D2 vs F1
  ];

  // 3. Create matches (strict 1st vs 2nd only)
  pairings.forEach((pairing, index) => {
    const homeTeam = groupStandings[pairing.homeGroup]?.[pairing.homePos]?.team;
    const awayTeam = groupStandings[pairing.awayGroup]?.[pairing.awayPos]?.team;

    if (homeTeam && awayTeam) {
      const simulate = simulateMatchFinal(homeTeam, awayTeam);
      newMatches.push({
        id: index,
        field: homeTeam,
        outfield: awayTeam,
        tournamed: tournamed,
        goalField: simulate.goalField,
        goalOutField: simulate.goalOutField,
        goalOutFieldPenalty: simulate.awayPenaltyGoals,
        goalFieldPenalty: simulate.homePenaltyGoals,
        isPenalty: simulate.isPenalty,
      });
    }
  });

  return newMatches;
}

// QUARTER-FINALS (8 teams)
export function createQuarterFinalMatches(winners: S[], tournamed: T) {
  const newMatches: QUARTER[] = [];

  if (winners.length !== 8) {
    console.error("Quarter-finals require exactly 8 teams");
    return newMatches;
  }

  // Pair teams: 1v2, 3v4, 5v6, 7v8
  for (let i = 0; i < winners.length; i += 2) {
    const team1 = winners[i];
    const team2 = winners[i + 1];

    const simulate = simulateMatchFinal(team1, team2);
    newMatches.push({
      id: 0,
      field: team1,
      outfield: team2,
      tournamed: tournamed,
      goalField: simulate.goalField,
      goalOutField: simulate.goalOutField,
      goalOutFieldPenalty: simulate.awayPenaltyGoals,
      goalFieldPenalty: simulate.homePenaltyGoals,
      isPenalty: simulate.isPenalty,
    });
  }

  return newMatches;
}

// SEMI-FINALS (4 teams)
export function createSemiFinalMatches(quarterFinalWinners: S[], tournamed: T) {
  const newMatches: SEMI[] = [];

  if (quarterFinalWinners.length !== 4) {
    console.error("Semi-finals require exactly 4 teams");
    return newMatches;
  }

  // Pair teams: 1v2, 3v4
  for (let i = 0; i < quarterFinalWinners.length; i += 2) {
    const team1 = quarterFinalWinners[i];
    const team2 = quarterFinalWinners[i + 1];

    const simulate = simulateMatchFinal(team1, team2);
    newMatches.push({
      id: 0,
      field: team1,
      outfield: team2,
      tournamed: tournamed,
      goalField: simulate.goalField,
      goalOutField: simulate.goalOutField,
      goalOutFieldPenalty: simulate.awayPenaltyGoals,
      goalFieldPenalty: simulate.homePenaltyGoals,
      isPenalty: simulate.isPenalty,
    });
  }

  return newMatches;
}

// FINAL (2 teams)
export function createFinalMatch(semiFinalWinners: S[], tournamed: T) {
  const newMatches: FINAL[] = [];

  if (semiFinalWinners.length !== 2) {
    console.error("Final requires exactly 2 teams");
    return newMatches;
  }

  const team1 = semiFinalWinners[0];
  const team2 = semiFinalWinners[1];

  const simulate = simulateMatchFinal(team1, team2);
  newMatches.push({
    id: 0,
    field: team1,
    outfield: team2,
    tournamed: tournamed,
    goalField: simulate.goalField,
    goalOutField: simulate.goalOutField,
    goalOutFieldPenalty: simulate.awayPenaltyGoals,
    goalFieldPenalty: simulate.homePenaltyGoals,
    isPenalty: simulate.isPenalty,
  });

  return newMatches;
}

// Determine Champion (1 team from final result)
export function determineChampion(matches: FINAL[]): S {
  let winners: S = {} as S;

  matches.forEach((match: any) => {
    if (Number(match.is_penalty)) {
      if (
        Number(match.goal_field_penalty) > Number(match.goal_outfield_penalty)
      ) {
        return (winners = match.field);
      }

      if (
        Number(match.goal_outfield_penalty) > Number(match.goal_field_penalty)
      ) {
        return (winners = match.outfield);
      }
    }

    if (!Number(match.is_penalty)) {
      if (Number(match.goal_field) > Number(match.goal_outfield)) {
        return (winners = match.field);
      }

      if (Number(match.goal_outfield) > Number(match.goal_field)) {
        return (winners = match.outfield);
      }
    }
  });

  return winners;
}

// Determine Champion (1 team from final result)
export function determineChampion2(matches: FINAL[]): S {
  let winners: S = {} as S;

  matches.forEach((match: any) => {
    if (Number(match.is_penalty)) {
      if (
        Number(match.goal_field_penalty) > Number(match.goal_outfield_penalty)
      ) {
        return (winners = match.outfield);
      }

      if (
        Number(match.goal_outfield_penalty) > Number(match.goal_field_penalty)
      ) {
        return (winners = match.field);
      }
    }

    if (!Number(match.is_penalty)) {
      if (Number(match.goal_field) > Number(match.goal_outfield)) {
        return (winners = match.outfield);
      }

      if (Number(match.goal_outfield) > Number(match.goal_field)) {
        return (winners = match.field);
      }
    }
  });

  return winners;
}
