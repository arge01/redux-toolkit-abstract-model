/* eslint-disable @typescript-eslint/no-explicit-any */
import { MODEL as Matches } from "@/services/matches";
import { MODEL as Soccer } from "@/services/soccer";

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
