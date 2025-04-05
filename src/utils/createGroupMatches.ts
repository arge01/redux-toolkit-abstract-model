import { MODEL as G } from "@/services/groups";
import { MODEL as M } from "@/services/matches";
import { MODEL as S } from "@/services/soccer";
import { MODEL as T } from "@/services/tournamed";
import { simulateMatch } from "./simulationMatch";

export function createGroupMatches(groups: G[], soccers: S[], tournamed: T) {
  const newMatches: M[] = [];

  groups.forEach((group) => {
    const groupTeams = soccers.filter((s) => s.groups?.id === group.id);

    for (let i = 0; i < groupTeams.length; i++) {
      for (let j = i + 1; j < groupTeams.length; j++) {
        const simulate = simulateMatch(groupTeams[i], groupTeams[j]);
        newMatches.push({
          id: i,
          groups: group,
          field: groupTeams[i],
          outfield: groupTeams[j],
          tournamed: tournamed,
          goalField: simulate.goalField,
          goalOutField: simulate.goalOutField,
        });
      }
    }
  });

  return newMatches;
}

export function createGroupMatchesForWeek(
  groups: G[],
  soccers: S[],
  tournamed: T,
  week: number
) {
  const newMatches: (M & { week: number })[] = [];

  // Validate week number (1-6 for 4-team groups)
  if (week < 1 || week > 6) {
    console.error("Invalid week number. Must be between 1-6 for 4-team groups");
    return newMatches;
  }

  groups.forEach((group) => {
    const groupTeams = soccers.filter((s) => s.groups?.id === group.id);

    if (groupTeams.length !== 4) {
      console.warn(`Group ${group.name} doesn't have exactly 4 teams`);
      return;
    }

    const weeklyPairs = [
      // Week 1
      [
        { home: 0, away: 1 },
        { home: 2, away: 3 },
      ],
      // Week 2
      [
        { home: 1, away: 2 },
        { home: 3, away: 0 },
      ],
      // Week 3
      [
        { home: 0, away: 2 },
        { home: 1, away: 3 },
      ],
      // Week 4
      [
        { home: 1, away: 0 },
        { home: 3, away: 2 },
      ],
      // Week 5
      [
        { home: 2, away: 1 },
        { home: 0, away: 3 },
      ],
      // Week 6
      [
        { home: 2, away: 0 },
        { home: 3, away: 1 },
      ],
    ];

    weeklyPairs[week - 1].forEach((pair, index) => {
      const homeTeam = groupTeams[pair.home];
      const awayTeam = groupTeams[pair.away];

      const simulate = simulateMatch(homeTeam, awayTeam);
      newMatches.push({
        id: group.id * 100 + (week - 1) * 2 + index,
        groups: group,
        field: homeTeam,
        outfield: awayTeam,
        tournamed: tournamed,
        goalField: simulate.goalField,
        goalOutField: simulate.goalOutField,
        week: week,
      });
    });
  });

  return newMatches;
}
