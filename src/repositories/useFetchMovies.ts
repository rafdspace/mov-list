import { createAsyncThunk } from "@reduxjs/toolkit";
import { omdbAPI } from "../lib/api";

export const useFetchMovies = createAsyncThunk(
  "movies/useFetchMovies",
  async ({ keyword, page }: { keyword: string; page: number }) => {
    const res = await omdbAPI.get("", {
      params: {
        s: keyword,
        page,
      },
    });
    return res.data;
  }
);
