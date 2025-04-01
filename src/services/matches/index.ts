import { ColumnProps } from "@/components/datatable";
import { MODEL as Groups } from "../groups";
import { ImpService } from "../imp/ImpService";
import { MODEL as Soccer } from "../soccer";
import { MODEL as Tournamed } from "../tournamed";

export interface MODEL {
  id: number;
  groups: Groups;
  field: Soccer;
  goalField: number;
  goalOutField: number;
  outfield: Soccer;
  tournamed: Tournamed;
  created_at?: Date;
}

export interface REQUEST {
  groups: number;
  field: number;
  outfield: number;
  goal_field: number;
  goal_outfield: number;
  tournamed: number;
}

export interface DELETE {
  id: number;
}

export const columns: ColumnProps[] = [
  {
    key: "groups",
    title: "Groups",
  },
  {
    key: "field",
    title: "Field",
  },
  {
    key: "outField",
    title: "Out Field",
  },
];

export class Service extends ImpService<MODEL> {
  constructor() {
    super("matches", "/matches");
  }
}

export const service: ImpService<MODEL> = new Service();
export const slice = service.getSlice();

export const actions = slice.actions;
export const { pending, success, failure } = actions;

export const services = service.getService();

export default slice.reducer;
