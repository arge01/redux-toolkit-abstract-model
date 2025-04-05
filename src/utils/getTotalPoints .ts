/* eslint-disable @typescript-eslint/no-explicit-any */
import { MODEL as Matches } from "@/services/matches";
import { MODEL as Soccer } from "@/services/soccer";

export type DetailPoints = {
  MP: number;
  W: number;
  D: number;
  L: number;
  GA: number;
  GC: number;
  A: number;
  P: number;
};

export function getTotalPoints(soccer: Soccer, matches: Matches[]): number {
  let points = 0;

  matches.forEach((m: any) => {
    if (m.field.id === soccer.id) {
      if (m.goal_field > m.goal_outfield) {
        points += 3;
      } else if (m.goal_field === m.goal_outfield) {
        points += 1;
      }
    } else if (m.outfield.id === soccer.id) {
      if (m.goal_outfield > m.goal_field) {
        points += 3;
      } else if (m.goal_outfield === m.goal_field) {
        points += 1;
      }
    }
  });

  return points;
}

export function getFindTotalPoints(
  soccer: Soccer,
  matches: Matches[]
): DetailPoints {
  let MP = 0; // Matches Played
  let W = 0; // Wins
  let D = 0; // Draws
  let L = 0; // Losses
  let GA = 0; // Goals For [sometimes shown as GF]
  let GC = 0; // Goals Against [sometimes shown as GA]
  let A = 0; // Goal Difference [often shown as GD]
  let P = 0; // Points

  matches.forEach((match: any) => {
    const isHome = match.field.id === soccer.id;
    const isAway = match.outfield.id === soccer.id;

    if (isHome || isAway) {
      MP += 1;

      const goalsFor = isHome ? match.goal_field : match.goal_outfield;
      const goalsAgainst = isHome ? match.goal_outfield : match.goal_field;

      GA += goalsFor;
      GC += goalsAgainst;

      if (goalsFor > goalsAgainst) {
        W += 1;
        P += 3;
      } else if (goalsFor === goalsAgainst) {
        D += 1;
        P += 1;
      } else {
        L += 1;
      }
    }
  });

  A = GA - GC;

  return {
    MP,
    W,
    D,
    L,
    GA,
    GC,
    A,
    P,
  };
}
