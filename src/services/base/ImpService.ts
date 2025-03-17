/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { Method, Model } from "..";

export abstract class ImpService<T> {
  protected name: string;
  protected method: Method;
  protected url: string;
  protected initialState: Model<T>;

  constructor(
    name: string,
    method: Method,
    url: string,
    initialState: Model<T>
  ) {
    this.name = name;
    this.method = method;
    this.url = url;
    this.initialState = initialState;
  }

  private getReducers(): any {
    return {
      pending: (state: Model<T>) => {
        state.status = "loading";
        state.data = this.initialState.data;
      },
      success: (state: Model<T>, action: PayloadAction<T>) => {
        state.status = "success";
        state.data = action.payload;
      },
      failure: (state: Model<T>, action: PayloadAction<string>) => {
        state.status = "failed";
        state.error = action.payload;
      },
    };
  }

  public getService() {
    return {
      name: this.name as keyof RootState,
      url: this.url,
      method: this.method,
      actions: this.getSlice().actions,
    };
  }

  public getSlice() {
    const slice = createSlice({
      name: this.name,
      initialState: this.initialState,
      reducers: this.getReducers(),
    });

    const actions = slice.actions;

    return {
      name: this.name as keyof RootState,
      reducer: slice.reducer,
      actions,
      services: {
        name: this.name as keyof RootState,
        url: this.url,
        method: this.method,
        actions,
      },
    };
  }
}
