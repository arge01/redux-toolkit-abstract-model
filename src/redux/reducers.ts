import { combineReducers } from "@reduxjs/toolkit";
import tournamed from "@/services/tournamed";

export interface Reducers {
  tournamed: ReturnType<typeof tournamed>;
}

const rootReducer = combineReducers({
  tournamed,
});

export default rootReducer;
