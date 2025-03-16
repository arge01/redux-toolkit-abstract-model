import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { Method, Model } from "..";

export const name = "test";
export const method: Method = "GET";
export const url: string = "https://jsonplaceholder.typicode.com/posts";

export interface IModel {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const initialState: Model<IModel[]> = {
  data: [] as IModel[],
  status: "invited",
  error: undefined,
};

const slice = createSlice({
  name,
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
