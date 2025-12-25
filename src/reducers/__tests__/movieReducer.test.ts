import { describe, it, expect } from "vitest";
import reducer, { resetMovies, setKeyword } from "../movieReducer";
import { useFetchMovies } from "../../repositories/useFetchMovies";
import type { Movie } from "../../types/movie";

const mockMovie: Movie = {
  Title: "Avatar",
  Year: "2009",
  imdbID: "tt0499549",
  Type: "movie",
  Poster: "N/A",
};

const initialState = {
  list: [],
  page: 1,
  loading: false,
  hasMore: true,
  totalResults: 0,
  keyword: "batman",
};

describe("movieSlice reducer", () => {
  it("should return initial state", () => {
    const state = reducer(undefined, { type: "unknown" });
    expect(state).toEqual(initialState);
  });

  describe("reducers", () => {
    it("setKeyword should update keyword and reset list, page, hasMore", () => {
      const prevState = {
        ...initialState,
        list: [mockMovie],
        page: 3,
        hasMore: false,
      };
      const state = reducer(prevState, setKeyword("avatar"));
      expect(state.keyword).toBe("avatar");
      expect(state.list).toEqual([]);
      expect(state.page).toBe(1);
      expect(state.hasMore).toBe(true);
    });

    it("resetMovies should reset list, page, and hasMore", () => {
      const prevState = {
        ...initialState,
        list: [mockMovie],
        page: 2,
        hasMore: false,
      };
      const state = reducer(prevState, resetMovies());
      expect(state.list).toEqual([]);
      expect(state.page).toBe(1);
      expect(state.hasMore).toBe(true);
    });
  });

  describe("extraReducers (useFetchMovies)", () => {
    it("should set loading true on pending", () => {
      const action = { type: useFetchMovies.pending.type };
      const state = reducer(initialState, action);
      expect(state.loading).toBe(true);
    });

    it("should handle fulfilled on first page with results", () => {
      const action = {
        type: useFetchMovies.fulfilled.type,
        payload: { Search: [mockMovie], totalResults: "10" },
      };
      const state = reducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.list).toEqual([mockMovie]);
      expect(state.page).toBe(2);
      expect(state.totalResults).toBe(10);
      expect(state.hasMore).toBe(true);
    });

    it("should append movies on next page", () => {
      const prevState = { ...initialState, list: [mockMovie], page: 2 };
      const newMovie = { ...mockMovie, imdbID: "tt1234567" };
      const action = {
        type: useFetchMovies.fulfilled.type,
        payload: { Search: [newMovie] },
      };
      const state = reducer(prevState, action);
      expect(state.list).toEqual([mockMovie, newMovie]);
      expect(state.page).toBe(3);
    });

    it("should set hasMore false when Search is empty", () => {
      const action = {
        type: useFetchMovies.fulfilled.type,
        payload: { Search: [] },
      };
      const state = reducer(initialState, action);
      expect(state.hasMore).toBe(false);
      expect(state.loading).toBe(false);
    });
  });
});
