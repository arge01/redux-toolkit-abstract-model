import { ColumnProps } from "@/components/datatable";
import { ImpService } from "../imp/ImpService";

export interface MODEL {
  id: number;
  name: string;
  key: string;
  desc: string;
}

export interface REQUEST {
  name: string;
  desc: string;
}

export interface DELETE {
  id: number;
}

export const columns: ColumnProps[] = [
  {
    key: "name",
    title: "Name",
  },
  {
    key: "desc",
    title: "Desc",
  },
];

export class Service extends ImpService<MODEL> {
  constructor() {
    super("tournamed", "/tournamed");
  }
}

export const service: ImpService<MODEL> = new Service();
export const slice = service.getSlice();

export const actions = slice.actions;
export const { pending, success, failure } = actions;

export const services = service.getService();

export default slice.reducer;
