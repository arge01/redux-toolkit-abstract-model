// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { apiMiddleware } from "@/middleware/reduxMiddleware";
import reducer from "./reducers";

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
