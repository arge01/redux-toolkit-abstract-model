import { ImpService } from "../base/ImpService";

export interface IModel {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export class Service extends ImpService<IModel[]> {
  constructor() {
    super("test", "GET", "https://jsonplaceholder.typicode.com/posts", {
      data: [] as IModel[],
      status: "invited",
      error: undefined,
    });
  }
}

export const service: ImpService<IModel[]> = new Service();
export const slice = service.getSlice();

export const actions = slice.actions;
export const { pending, success, failure } = actions;

export const services = service.getService();

export default slice.reducer;
