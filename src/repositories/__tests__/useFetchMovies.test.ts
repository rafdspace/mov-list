import { describe, it, expect, vi, beforeEach } from "vitest";
import { useFetchMovies } from "../useFetchMovies";
import { omdbAPI } from "../../lib/api";
import { configureStore } from "@reduxjs/toolkit";

const createTestStore = () =>
  configureStore({ reducer: { movies: (state = {}) => state } });

vi.mock("../../lib/api", () => ({
  omdbAPI: { get: vi.fn() },
}));

describe("useFetchMovies thunk", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("dispatches fulfilled action with API data", async () => {
    const mockResponse = { Search: [{ Title: "Avatar" }], totalResults: "1" };
    (omdbAPI.get as any).mockResolvedValueOnce({ data: mockResponse });
    const store = createTestStore();
    const action = await store.dispatch(
      useFetchMovies({ keyword: "avatar", page: 1 }) as any
    );
    expect(omdbAPI.get).toHaveBeenCalledWith("", {
      params: { s: "avatar", page: 1 },
    });
    expect(action.type).toBe("movies/useFetchMovies/fulfilled");
    expect(action.payload).toEqual(mockResponse);
  });

  it("dispatches rejected action when API fails", async () => {
    (omdbAPI.get as any).mockRejectedValueOnce(new Error("Network error"));
    const store = createTestStore();
    const action = await store.dispatch(
      useFetchMovies({ keyword: "avatar", page: 1 }) as any
    );
    expect(action.type).toBe("movies/useFetchMovies/rejected");
    expect(action.error.message).toBe("Network error");
  });
});
