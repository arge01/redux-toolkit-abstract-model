import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { Method, Model, ReducerAction } from "@/services";
import { actions as actionsType } from "@/services/imp";

export type UseServiceOptions = {
  name: keyof RootState;
  url?: string;
  actions?: typeof actionsType;
};

export type Patch<T> = { [K in keyof T]?: T[K] };
export type Del = number;

export type UseServiceReturn<T, R = unknown> = [
  data: Model<T>,
  trigger: {
    all: () => void;
    get: () => void;
    post: (req: R) => void;
    put: (req: T | undefined) => void;
    delete: (id: Del) => void;
    patch: (req: Patch<T>) => void;
  },
];

export function useService<T, R = unknown>({
  name,
  url,
  actions,
}: UseServiceOptions): UseServiceReturn<T, R> {
  const [u, setU] = useState<string>(url as "");
  const [trigger, setTrigger] = useState<boolean>(false);
  const [requestData, setRequestData] = useState<R | T | Patch<T> | undefined>(
    undefined
  );
  const [method, setMethod] = useState<Method>("GET");

  const data = useSelector((state: RootState) => state[name]);
  const dispatch = useDispatch();

  const triggerRequest = useCallback(
    (method: Method, req?: R | T | Patch<T>) => {
      setU(url as "");
      setRequestData(req);
      setMethod(method);
      setTrigger(true);
    },
    []
  );

  const triggerAllRequest = useCallback((method: Method) => {
    setU(`${url}/all`);
    setRequestData(undefined);
    setMethod(method);
    setTrigger(true);
  }, []);

  const triggerDeleteRequest = useCallback((method: Method, id: Del) => {
    setU(`${url}/delete?id=${id}`);
    setRequestData(undefined);
    setMethod(method);
    setTrigger(true);
  }, []);

  useEffect(() => {
    if (name && u && actions && trigger) {
      const action: ReducerAction = {
        url: u,
        type: `api/request[${name as string}]`,
        method,
        payload: requestData,
      };

      dispatch({ ...action, name });
      setTrigger(false);
    }
  }, [name, trigger, requestData, u, actions, dispatch, method]);

  return [
    data as Model<T>,
    {
      all: () => triggerAllRequest("GET"),
      get: () => triggerRequest("GET"),
      post: (req: R) => triggerRequest("POST", req),
      put: (req: T | undefined) => triggerRequest("PUT", req),
      delete: (req: Del) => triggerDeleteRequest("DELETE", req),
      patch: (req: Patch<T>) => triggerRequest("PATCH", req),
    },
  ];
}
