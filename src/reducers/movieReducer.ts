import { createSlice } from "@reduxjs/toolkit";
import type { Movie } from "../types/movie";
import { useFetchMovies } from "../repositories/useFetchMovies";

interface MovieState {
  list: Movie[];
  page: number;
  loading: boolean;
  hasMore: boolean;
  totalResults: number;
  keyword: string;
}

const initialState: MovieState = {
  list: [],
  page: 1,
  loading: false,
  hasMore: true,
  totalResults: 0,
  keyword: "avatar",
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setKeyword: (state, action) => {
      state.keyword = action.payload;
      state.list = [];
      state.page = 1;
      state.hasMore = true;
    },
    resetMovies: (state) => {
      state.list = [];
      state.page = 1;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(useFetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(useFetchMovies.fulfilled, (state, action) => {
        state.loading = false;

        const { Search, totalResults } = action.payload;

        if (state.page === 1 && totalResults) {
          state.totalResults = Number(totalResults);
          state.hasMore = Number(totalResults) > 5;
        }

        if (Search?.length) {
          state.list.push(...Search);
          state.page += 1;
        } else {
          state.hasMore = false;
        }
      });
  },
});

export const { resetMovies, setKeyword } = movieSlice.actions;
export default movieSlice.reducer;
