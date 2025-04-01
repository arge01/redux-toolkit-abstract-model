import { combineReducers } from "@reduxjs/toolkit";
import groups from "@/services/groups";
import matches from "@/services/matches";
import power from "@/services/power";
import soccer from "@/services/soccer";
import tournamed from "@/services/tournamed";

export interface Reducers {
  tournamed: ReturnType<typeof tournamed>;
  groups: ReturnType<typeof groups>;
  soccer: ReturnType<typeof soccer>;
  power: ReturnType<typeof power>;
  matches: ReturnType<typeof matches>;
}

const rootReducer = combineReducers({
  tournamed,
  soccer,
  power,
  groups,
  matches,
});

export default rootReducer;
