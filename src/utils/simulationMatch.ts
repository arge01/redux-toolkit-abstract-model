import { MODEL as S } from "@/services/soccer";

export function simulateMatch(homeTeam: S, awayTeam: S) {
  const homePower =
    (homeTeam.power.field + homeTeam.power.playing + homeTeam.power.fortunate) /
    3;
  const awayPower =
    (awayTeam.power.field + awayTeam.power.playing + awayTeam.power.fortunate) /
    3;

  const homeGoalProb = homePower / (homePower + awayPower);
  const awayGoalProb = awayPower / (homePower + awayPower);

  let homeGoals = 0;
  let awayGoals = 0;

  for (let i = 0; i < 90; i++) {
    if (Math.random() < homeGoalProb * 0.01) homeGoals++;
    if (Math.random() < awayGoalProb * 0.01) awayGoals++;
  }

  return {
    field: homeTeam,
    outfield: awayTeam,
    goalField: homeGoals,
    goalOutField: awayGoals,
    winner: homeGoals > awayGoals ? homeTeam : awayTeam,
  };
}
