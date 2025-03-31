import { combineReducers } from "@reduxjs/toolkit";
import power from "@/services/power";
import soccer from "@/services/soccer";
import tournamed from "@/services/tournamed";

export interface Reducers {
  tournamed: ReturnType<typeof tournamed>;
  soccer: ReturnType<typeof soccer>;
  power: ReturnType<typeof power>;
}

const rootReducer = combineReducers({
  tournamed,
  soccer,
  power,
});

export default rootReducer;
