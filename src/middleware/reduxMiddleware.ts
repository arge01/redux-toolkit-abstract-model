import { Middleware } from "@reduxjs/toolkit";
import axios from "axios";
import { ReducerAction } from "@/services";

export const apiMiddleware: Middleware =
  (store) => (next) => async (action) => {
    const apiAction = action as ReducerAction;

    if (apiAction.type === "api/request") {
      const { url, method, data, onPending, onSuccess, onError } =
        apiAction.payload;

      store.dispatch({ type: onPending, payload: apiAction.payload.data });

      try {
        const response = await axios({
          method,
          url,
          data,
        });
        store.dispatch({ type: onSuccess, payload: response.data });
      } catch (error) {
        store.dispatch({ type: onError, payload: error });
      }
    }

    return next(action);
  };
