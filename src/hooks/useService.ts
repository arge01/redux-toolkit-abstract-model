import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { Method, Model, Pagination, ReducerAction } from "@/services";
import { actions as actionsType } from "@/services/imp";

export type UseServiceOptions = {
  name: keyof RootState;
  url?: string;
  actions?: typeof actionsType;
};

export type Patch<T> = { [K in keyof T]?: T[K] };
export type Del = number;

export type Dispatch<T, R> = {
  all: () => void;
  get: (id: number | string) => void;
  getCriteria: (c: Patch<T>) => void;
  criteria: (c: Patch<T>[], pagination?: Pagination) => void;
  post: (req: R) => void;
  put: (id: number | string, req: R) => void;
  delete: (id: Del) => void;
  patch: (id: number | string, req: Patch<T>) => void;
};

export type UseServiceReturn<T, R = unknown> = [
  data: Model<T>,
  trigger: Dispatch<T, R>,
];

export function useService<T, R = unknown>({
  name,
  url,
  actions,
}: UseServiceOptions): UseServiceReturn<T, R> {
  const [u, setU] = useState<string>(url as "");
  const [trigger, setTrigger] = useState<boolean>(false);
  const [requestData, setRequestData] = useState<
    R | T | Patch<T> | Patch<T>[] | undefined
  >(undefined);
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

  const triggerGetRequest = useCallback(
    (method: Method, id: number | string) => {
      setU(`${url}/${id}`);
      setRequestData(undefined);
      setMethod(method);
      setTrigger(true);
    },
    []
  );

  const triggerPutRequest = useCallback(
    (method: Method, id: number | string, req: R) => {
      setU(`${url}/${id}`);
      setRequestData(req);
      setMethod(method);
      setTrigger(true);
    },
    []
  );

  const triggerPatchRequest = useCallback(
    (method: Method, id: number | string, req: Patch<T>) => {
      setU(`${url}/${id}`);
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
    setU(`${url}/${id}`);
    setRequestData(undefined);
    setMethod(method);
    setTrigger(true);
  }, []);

  const triggerCriteriaRequest = useCallback(
    (method: Method, req: Patch<T>[], pagination?: Pagination) => {
      setU(`${url}/criteria`);

      if (pagination) {
        setU(
          `${url}/criteria/pagination/${pagination.page}/${pagination.size}?page=${pagination.page}`
        );
      }

      setRequestData(req);
      setMethod(method);
      setTrigger(true);
    },
    []
  );

  const triggerGetCriteriaRequest = useCallback(
    (method: Method, c: Patch<T>) => {
      const keys = Object.keys(c);
      if (keys.length === 0) {
        throw new Error("Empty object provided");
      }
      const key = keys[0];

      setU(`${url}/get-criteria/${key}/${c[key as keyof typeof c]}`);
      setRequestData(c);
      setMethod(method);
      setTrigger(true);
    },
    []
  );

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
      get: (id: number | string) => triggerGetRequest("GET", id),
      getCriteria: (c: Patch<T>) => triggerGetCriteriaRequest("GET", c),
      criteria: (req: Patch<T>[], pagination?: Pagination) =>
        triggerCriteriaRequest("POST", req, pagination),
      post: (req: R) => triggerRequest("POST", req),
      put: (id: number | string, req: R) => triggerPutRequest("PUT", id, req),
      delete: (req: Del) => triggerDeleteRequest("DELETE", req),
      patch: (id: number | string, req: Patch<T>) =>
        triggerPatchRequest("PATCH", id, req),
    },
  ];
}
