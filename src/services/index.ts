/* eslint-disable @typescript-eslint/no-explicit-any */
export type Type = {
  loading: string;
  success: string;
  error: string;
};

export type Status = "success" | "loading" | "failed" | "invited";

export interface E {
  message: string;
  name: string;
  stack: string;
  config: Config;
  code: string;
  status: number;
}

export interface Config {
  transitional: Transitional;
  adapter: string[];
  transformRequest: any[];
  transformResponse: any[];
  timeout: number;
  xsrfCookieName: string;
  xsrfHeaderName: string;
  maxContentLength: number;
  maxBodyLength: number;
  env: any;
  headers: Headers;
  method: string;
  url: string;
  allowAbsoluteUrls: boolean;
}

export interface Transitional {
  silentJSONParsing: boolean;
  forcedJSONParsing: boolean;
  clarifyTimeoutError: boolean;
}

export interface Headers {
  Accept: string;
  "Content-Type": string;
}

export interface Model<T> {
  entity?: T;
  entities?: T[];
  loading: boolean;
  success: boolean;
  error?: E | string | undefined;
  deleted?: boolean;
}

export type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface ReducerAction {
  type: string;
  url: string;
  method: Method;
  payload?: unknown;
  [key: string]: unknown;
}

export interface PayloadAction<T = unknown> {
  name: string;
  type: string;
  url: string;
  method: Method;
  payload?: T;
  [key: string]: unknown;
  meta?: {
    method: Method;
    url: string;
  };
}
