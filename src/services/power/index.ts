import { ColumnProps } from "@/components/datatable";
import { ImpService } from "../imp/ImpService";

export interface MODEL {
  id: number;
  field: number;
  outfield: number;
  power: number;
  playing: number;
  fortunate: number;
}

export interface REQUEST {
  field: number;
  outfield: number;
  power: number;
  playing: number;
  fortunate: number;
}

export interface DELETE {
  id: number;
}

export const columns: ColumnProps[] = [
  {
    key: "field",
    title: "Field",
  },
  {
    key: "outfield",
    title: "Outfield",
  },
  {
    key: "power",
    title: "Power",
  },
  {
    key: "playing",
    title: "Playing",
  },
  {
    key: "fortunate",
    title: "Fortunate",
  },
];

export class Service extends ImpService<MODEL> {
  constructor() {
    super("power", "/soccer/power");
  }
}

export const service: ImpService<MODEL> = new Service();
export const slice = service.getSlice();

export const actions = slice.actions;
export const { pending, success, failure } = actions;

export const services = service.getService();

export default slice.reducer;
