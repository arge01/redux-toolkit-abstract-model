/* eslint-disable @typescript-eslint/no-explicit-any */
import { ImpService } from "./ImpService";

export type ErrorType = any;

export interface MODEL {
  [key: string]: any;
}

export interface REQUEST {
  [key: string]: any;
}

export interface DELETE {
  id: number;
}

export class Service extends ImpService<MODEL> {
  constructor() {
    super("", "");
  }
}

export const service: ImpService<MODEL> = new Service();
export const slice = service.getSlice();

export const actions = slice.actions;
export const { pending, success, failure } = actions;

export const services = service.getService();

export default slice.reducer;
