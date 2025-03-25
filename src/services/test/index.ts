import { ImpService } from "../imp/ImpService";

export interface MODEL {
  id: number;
  title: string;
  desc: string;
}

export interface REQUEST {
  title: string;
  desc: string;
}

export interface DELETE {
  id: number;
}

export class Service extends ImpService<MODEL> {
  constructor() {
    super("test", "/test");
  }
}

export const service: ImpService<MODEL> = new Service();
export const slice = service.getSlice();

export const actions = slice.actions;
export const { pending, success, failure } = actions;

export const services = service.getService();

export default slice.reducer;
