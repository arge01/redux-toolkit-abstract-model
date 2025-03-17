/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { Method, Model } from "..";

export const name = "" as keyof RootState;
export const method: Method = "GET";
export const url: string = "/api";

const initialState: Model = {
  data: [] as any,
  status: "invited",
  error: undefined,
};

const slice = createSlice({
  name: "" as keyof RootState | any,
  initialState,
  reducers: {
    pending: (state) => {
      state.status = "loading";
      state.data = initialState.data;
    },
    success: (state, action) => {
      state.status = "success";
      state.data = action.payload;
    },
    failure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const actions = slice.actions;
export const { pending, success, failure } = actions;

export const services = {
  name: name as keyof RootState,
  url,
  method,
  actions,
};

export default slice.reducer;
