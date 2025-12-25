import { describe, it, expect } from "vitest";
import { store } from "../index";

describe("Redux Store", () => {
  it("creates store with movies reducer", () => {
    const state = store.getState();
    expect(state).toHaveProperty("movies");
  });

  it("initializes movies state correctly", () => {
    const state = store.getState().movies;
    expect(state).toEqual({
      list: [],
      page: 1,
      loading: false,
      hasMore: true,
      totalResults: 0,
      keyword: "batman",
    });
  });

  it("allows dispatching actions", () => {
    store.dispatch({ type: "movies/setKeyword", payload: "batman" });
    const state = store.getState().movies;
    expect(state.keyword).toBe("batman");
    expect(state.page).toBe(1);
    expect(state.list).toEqual([]);
    expect(state.hasMore).toBe(true);
  });
});
