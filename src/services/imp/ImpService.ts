/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { Model, PayloadAction } from "..";

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
      criteria: (state: Model<T>, action: PayloadAction<T>) => ({
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
        builder.addCase(
          `api/request[${this.name}]-pending`,
          (state: Model<T>) => {
            state.loading = true;
            state.error = undefined;
          }
        );
        builder
          .addCase(
            `api/request[${this.name}]-succsess`,
            (state: Model<T>, action: PayloadAction<T | T[]>) => {
              state.findSuccess = undefined;
              state.findAllSuccess = undefined;
              state.findCriteriaSuccess = undefined;
              state.error = undefined;

              state.loading = false;
              state.success = true;

              const method = action.meta?.method;
              const payload = action.payload;

              switch (method) {
                case "GET":
                  if ((action.meta?.url || "").search("/all") > -1) {
                    state.findAllSuccess = true;
                    state.entities = payload as T[];
                  } else if (
                    (action.meta?.url || "").search("/criteria") > -1
                  ) {
                    state.findCriteriaSuccess = true;
                    state.criteria = payload as T[];
                  } else {
                    state.findSuccess = true;
                    state.entity = payload as T;
                  }
                  break;
                case "POST":
                  state.findSuccess = true;
                  state.entity = payload as T;
                  break;
                case "PUT":
                  state.findSuccess = true;
                  state.entity = payload as T;
                  break;
                case "PATCH":
                  state.findSuccess = true;
                  state.entity = payload as T;
                  break;
                case "DELETE":
                  state.findSuccess =
                    (payload as boolean) === true ? true : undefined;
                  state.deleted = (payload as boolean) || false;
                  break;
                default:
                  break;
              }
            }
          )
          .addCase(
            `api/request[${this.name}]-error`,
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
