import { ColumnProps } from "@/components/datatable";
import { ImpService } from "../imp/ImpService";
import { MODEL as Matches } from "../matches";

export interface MODEL {
  id: number;
  name: string;
  matches: Matches[] | null;
}

export interface REQUEST {
  name: string;
  matches: number;
}

export interface DELETE {
  id: number;
}

export const columns: ColumnProps[] = [
  {
    key: "name",
    title: "Name",
  },
];

export class Service extends ImpService<MODEL> {
  constructor() {
    super("groups", "/groups");
  }
}

export const service: ImpService<MODEL> = new Service();
export const slice = service.getSlice();

export const actions = slice.actions;
export const { pending, success, failure } = actions;

export const services = service.getService();

export default slice.reducer;
