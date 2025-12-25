import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../reducers/movieReducer";

export const store = configureStore({
  reducer: {
    movies: movieReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;