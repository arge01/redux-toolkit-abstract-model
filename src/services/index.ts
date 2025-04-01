/* eslint-disable @typescript-eslint/no-explicit-any */
export type Type = {
  loading: string;
  success: string;
  error: string;
};

export type Status = "success" | "loading" | "failed" | "invited";

export type Pagination = {
  size: number;
  page: number;
  total?: number;
  showing?: number;
};

export interface EMessage {
  message: string;
}

export interface E {
  message: EMessage["message"];
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
  criteria?: T[];
  loading: boolean;
  findSuccess?: boolean;
  findAllSuccess?: boolean;
  findCriteriaSuccess?: boolean;
  success: boolean;
  error?: EMessage | E | string | undefined;
  deleted?: boolean;
  pagination?: Pagination;
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
