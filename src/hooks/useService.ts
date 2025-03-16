import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { Method, Model, ReducerAction } from "@/services";
import { actions as actionsType } from "@/services/base";

export type UseServiceOptions = {
  name: keyof RootState;
  url?: string;
  method?: Method;
  actions?: typeof actionsType;
};

export type UseServiceReturn<T> = [
  data: Model<T>,
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>,
];

export function useService<T>({
  name,
  url,
  method,
  actions,
}: UseServiceOptions): UseServiceReturn<T> {
  const [trigger, setTrigger] = useState<boolean>(false);

  const data = useSelector((state: RootState) => state[name]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (url) {
      if (method) {
        if (actions) {
          if (trigger) {
            const action: ReducerAction = {
              type: "api/request",
              payload: {
                url,
                method,
                onPending: actions.pending.type,
                onSuccess: actions.success.type,
                onError: actions.failure.type,
              },
            };

            dispatch(action);

            setTrigger(false);
          }
        }
      }
    }
  }, [trigger]);

  return [data as Model<T>, setTrigger];
}
