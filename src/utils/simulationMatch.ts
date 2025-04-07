import { toast } from "react-toastify";
import { MODEL as S } from "@/services/soccer";

export function simulateMatch(homeTeam: S, awayTeam: S) {
  // Contribution ratios of each factor to scoring probability

  // Home advantage (field) - 20%
  const homeFieldAdvantage = homeTeam.power.field * 0.20;

  // Away disadvantage (outfield) - 15%
  const awayFieldDisadvantage = awayTeam.power.outfield * 0.15;

  // General team power (power) - 30%
  const teamPower = homeTeam.power.power * 0.30;

  // Game performance (playing) - 25%
  const playingPerformance = homeTeam.power.playing * 0.25;

  // Luck factor (fortunate) - 10%
  const luckFactor = homeTeam.power.fortunate * 0.10;

  // Home team's goal scoring probability
  const homeScoringProbability =
    (homeFieldAdvantage +
      awayFieldDisadvantage +
      teamPower +
      playingPerformance +
      luckFactor) /
    100; // Convert to 0-1 range

  // Same calculation for away team (with reverse factors)
  const awayScoringProbability =
    (awayTeam.power.field * 0.15 +
      homeTeam.power.outfield * 0.20 +
      awayTeam.power.power * 0.30 +
      awayTeam.power.playing * 0.25 +
      awayTeam.power.fortunate * 0.10) /
    100;

  let homeGoals = 0;
  let awayGoals = 0;

  // Check for goal chance for each "minute" during 90 minutes
  for (let minute = 0; minute < 90; minute++) {
    if (Math.random() < homeScoringProbability * 0.01) homeGoals++;
    if (Math.random() < awayScoringProbability * 0.01) awayGoals++;
  }

  return {
    field: homeTeam,
    outfield: awayTeam,
    goalField: homeGoals,
    goalOutField: awayGoals,
    winner: homeGoals > awayGoals ? homeTeam : awayTeam,
  };
}

export function simulateMatchFinal(homeTeam: S, awayTeam: S) {
  // Contribution ratios of each factor to scoring probability

   // Home advantage (field) - 20%
  const homeFieldAdvantage = homeTeam.power.field * 0.20;

  // Away disadvantage (outfield) - 15%
  const awayFieldDisadvantage = awayTeam.power.outfield * 0.15;

  // General team power (power) - 30%
  const teamPower = homeTeam.power.power * 0.30;

  // Game performance (playing) - 25%
  const playingPerformance = homeTeam.power.playing * 0.25;

  // Luck factor (fortunate) - 10%
  const luckFactor = homeTeam.power.fortunate * 0.10;

  // Home team's goal scoring probability
  const homeScoringProbability =
    (homeFieldAdvantage +
      awayFieldDisadvantage +
      teamPower +
      playingPerformance +
      luckFactor) /
    100; // Convert to 0-1 range

  // Same calculation for away team (with reverse factors)
  const awayScoringProbability =
    (awayTeam.power.field * 0.15 +
      homeTeam.power.outfield * 0.20 +
      awayTeam.power.power * 0.30 +
      awayTeam.power.playing * 0.25 +
      awayTeam.power.fortunate * 0.10) /
    100;

  let homeGoals = 0;
  let awayGoals = 0;

  // Check for goal chance for each "minute" during 90 minutes
  for (let minute = 0; minute < 90; minute++) {
    if (Math.random() < homeScoringProbability * 0.01) homeGoals++;
    if (Math.random() < awayScoringProbability * 0.01) awayGoals++;
  }

  let homePenaltyGoals = 0;
  let awayPenaltyGoals = 0;
  let isPenalty = false;

  if (homeGoals === awayGoals) {
    // Check for goal chance for each "minute" during 90 + 30 minutes
    for (let minute = 0; minute < 15; minute++) {
      if (Math.random() < homeScoringProbability * 0.03) homeGoals++;
      if (Math.random() < awayScoringProbability * 0.03) awayGoals++;
    }
    if (homeGoals) {
      toast.info(`At 90 + 15 ${homeTeam.name} scored an excellent goal.`, {
        autoClose: 10000,
      });
    }

    if (awayGoals) {
      toast.info(`At 90 + 15 ${awayTeam.name} scored an excellent goal.`, {
        autoClose: 10000,
      });
    }
  }

  if (homeGoals === awayGoals) {
    // Check for goal chance for each "minute" during 90 + 30 minutes
    for (let minute = 0; minute < 15; minute++) {
      if (Math.random() < homeScoringProbability * 0.09) homeGoals++;
      if (Math.random() < awayScoringProbability * 0.09) awayGoals++;
    }
    if (homeGoals) {
      toast.info(`At 90 + 30 ${homeTeam.name} scored an excellent goal.`, {
        autoClose: 10000,
      });
    }

    if (awayGoals) {
      toast.info(`At 90 + 30 ${awayTeam.name} scored an excellent goal.`, {
        autoClose: 10000,
      });
    }
  }

  if (homeGoals === awayGoals) {
    isPenalty = true;
    let maxShots = 10;

    for (let shot = 0; shot < 5; shot++) {
      if (Math.random() < 0.7 + (homeTeam.power.fortunate / 100 - 0.5) * 0.2) {
        homePenaltyGoals++;
      }
      if (Math.random() < 0.7 + (awayTeam.power.fortunate / 100 - 0.5) * 0.2) {
        awayPenaltyGoals++;
      }
    }

    // Sudden death
    while (homePenaltyGoals === awayPenaltyGoals && maxShots-- > 0) {
      const homeSuccess =
        Math.random() < 0.7 + (homeTeam.power.fortunate / 100 - 0.5) * 0.2;
      const awaySuccess =
        Math.random() < 0.7 + (awayTeam.power.fortunate / 100 - 0.5) * 0.2;

      if (homeSuccess) homePenaltyGoals++;
      if (awaySuccess) awayPenaltyGoals++;

      if (homePenaltyGoals !== awayPenaltyGoals) break;
    }

    // Random Winner
    if (homePenaltyGoals === awayPenaltyGoals) {
      const random = Math.random();
      if (random > 0.5) {
        homePenaltyGoals += 5;
        awayPenaltyGoals = homePenaltyGoals - 1;
      } else {
        awayPenaltyGoals += 6;
        homePenaltyGoals = awayPenaltyGoals - 1;
      }
    }
  }

  let winner = null;
  if (homeGoals > awayGoals) {
    winner = homeTeam;
  } else if (awayGoals > homeGoals) {
    winner = awayTeam;
  } else {
    winner = homePenaltyGoals > awayPenaltyGoals ? homeTeam : awayTeam;
  }

  return {
    field: homeTeam,
    outfield: awayTeam,
    goalField: homeGoals,
    goalOutField: awayGoals,
    homePenaltyGoals: isPenalty ? homePenaltyGoals : undefined,
    awayPenaltyGoals: isPenalty ? awayPenaltyGoals : undefined,
    isPenalty,
    winner,
    isDraw: homeGoals === awayGoals && homePenaltyGoals === awayPenaltyGoals,
  };
}
