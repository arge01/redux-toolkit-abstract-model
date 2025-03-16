/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnyAction } from "@reduxjs/toolkit";

export type Type = {
  loading: string;
  success: string;
  error: string;
};

export type Status = "success" | "loading" | "failed" | "invited";

export interface Model<T = undefined> {
  data: T;
  status: Status;
  error?: undefined | string | object;
}

export type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface ReducerAction<T = any> extends AnyAction {
  type: string;
  payload: {
    url: string;
    method: Method;
    data?: T;
    onPending: string;
    onSuccess: string;
    onError: string;
  };
}
