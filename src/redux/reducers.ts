import { combineReducers } from "@reduxjs/toolkit";
import test from "@/services/test";

export interface Reducers {
  test: ReturnType<typeof test>;
}

const rootReducer = combineReducers({
  test,
});

export default rootReducer;
