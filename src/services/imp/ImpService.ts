/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { Method, Model, PayloadAction } from "..";

export interface ApiRequestStartAction {
  type: "api/request_START";
  payload: { url: string; method: Method };
}

export interface ApiRequestSuccessAction<T> {
  type: "api/request_SUCCESS";
  payload: T;
}

export interface ApiRequestErrorAction {
  type: "api/request_ERROR";
  payload: Error;
}

export abstract class ImpService<T> {
  protected name: string;
  protected url: string;
  protected initialState: Model<T>;

  constructor(name: string, url: string) {
    this.name = name;
    this.url = url;
    this.initialState = {
      entity: {} as T,
      entities: [] as T[],
      loading: false,
      success: false,
      error: undefined,
    };
  }

  private getReducers(): any {
    return {
      pending: (state: Model<T>) => ({
        ...state,
        loading: true,
      }),
      all: (state: Model<T>, action: PayloadAction<T[]>) => ({
        ...state,
        loading: false,
        success: true,
        entities: action.payload,
      }),
      get: (state: Model<T>, action: PayloadAction<T>) => ({
        ...state,
        loading: false,
        success: true,
        entity: action.payload,
      }),
      post: (state: Model<T>, action: PayloadAction<T>) => ({
        ...state,
        loading: false,
        success: true,
        entity: action.payload,
      }),
      put: (state: Model<T>, action: PayloadAction<T>) => ({
        ...state,
        loading: false,
        success: true,
        entity: action.payload,
      }),
      delete: (state: Model<T>, action: PayloadAction<boolean>) => ({
        ...state,
        loading: false,
        success: true,
        entity: action.payload,
      }),
      patch: (state: Model<T>, action: PayloadAction<T>) => ({
        ...state,
        loading: false,
        success: true,
        entity: action.payload,
      }),
    };
  }

  public getService() {
    return {
      name: this.name as keyof RootState,
      url: this.url,
      actions: this.getSlice().actions,
    };
  }

  public getSlice(): any {
    const slice = createSlice({
      name: this.name,
      initialState: this.initialState,
      reducers: this.getReducers(),
      extraReducers: (builder: ActionReducerMapBuilder<Model<T>> | any) => {
        builder.addCase("api/request_START", (state: Model<T>) => {
          state.loading = true;
          state.error = undefined;
        });
        builder
          .addCase(
            "api/request_SUCCESS",
            (state: Model<T>, action: PayloadAction<T | T[]>) => {
              state.loading = false;
              state.success = true;
              state.error = undefined;

              const method = action.meta?.method;
              const payload = action.payload;

              switch (method) {
                case "GET":
                  if ((action.meta?.url || "").search("/all") > -1) {
                    state.entities = payload as T[];
                  } else {
                    state.entity = payload as T;
                  }
                  break;
                case "POST":
                  state.entity = payload as T;
                  break;
                case "PUT":
                  state.entity = payload as T;
                  break;
                case "PATCH":
                  state.entity = payload as T;
                  break;
                case "DELETE":
                  state.deleted = (payload as boolean) || false;
                  break;
                default:
                  break;
              }
            }
          )
          .addCase(
            "api/request_ERROR",
            (state: Model<T>, action: PayloadAction<Error>) => {
              state.loading = false;
              state.error = action.payload as Model<T>["error"];
            }
          );
      },
    });

    const actions = slice.actions;

    return {
      name: this.name as keyof RootState,
      reducer: slice.reducer,
      actions,
      services: {
        name: this.name as keyof RootState,
        url: this.url,
        actions,
      },
    };
  }
}
