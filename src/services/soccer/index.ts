import { ColumnProps } from "@/components/datatable";
import { REQUEST as Power } from "@/services/power";
import { REQUEST as Tournamed } from "@/services/tournamed";
import { ImpService } from "../imp/ImpService";

export interface MODEL {
  id: number;
  name: string;
  colors: string;
  country: string;
  tournamed: Tournamed;
  power: Power;
}

export interface REQUEST {
  name: string;
  country: string;
  colors: string;
  power: number;
  tournamed: number;
}

export interface DELETE {
  id: number;
}

export const columns: ColumnProps[] = [
  {
    key: "country",
    title: "Country",
  },
  {
    key: "name",
    title: "Name",
  },
  {
    key: "colors",
    title: "Colors",
  },
];

export class Service extends ImpService<MODEL> {
  constructor() {
    super("soccer", "/soccer");
  }
}

export const service: ImpService<MODEL> = new Service();
export const slice = service.getSlice();

export const actions = slice.actions;
export const { pending, success, failure } = actions;

export const services = service.getService();

export default slice.reducer;
