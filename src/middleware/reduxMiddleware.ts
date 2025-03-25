import { Middleware } from "@reduxjs/toolkit";
import { PayloadAction } from "@/services";
import { fetchMiddleware } from "./fetchMiddleware";

export const apiMiddleware: Middleware =
  (store) => (next) => async (action) => {
    const apiAction = action as PayloadAction;

    const { url, method, payload, name } = apiAction;
    if (apiAction.type === `api/request[${name}]`) {
      store.dispatch({
        type: `api/request[${name}]-pending`,
        payload: { url, method },
      });

      try {
        const response = await fetchMiddleware(url, method, payload);

        store.dispatch({
          type: `api/request[${name}]-succsess`,
          payload: response.data,
          meta: { method, url },
        });
      } catch (error) {
        store.dispatch({
          type: `api/request[${name}]-error`,
          payload: error as Error,
          meta: { method, url },
        });
      }
    }

    return next(action);
  };
