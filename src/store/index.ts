import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import threadsReducer from "./threads";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    threads: threadsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
