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
