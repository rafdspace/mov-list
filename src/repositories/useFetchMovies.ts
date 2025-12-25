import { createAsyncThunk } from "@reduxjs/toolkit";
import { omdbAPI } from "../lib/api";

export const useFetchMovies = createAsyncThunk(
  "movies/useFetchMovies",
  async (page: number) => {
    const res = await omdbAPI.get("", {
      params: {
        s: "Batman",
        page,
      },
    });
    return res.data;
  }
);
