import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { omdbAPI } from "../../lib/api";
import { useSearchMovies } from "../useSearchMovie";

vi.mock("../../lib/api", () => ({
  omdbAPI: { get: vi.fn() },
}));

vi.mock("../lib/hooks/useDebounce", () => ({
  useDebounce: (value: string) => value,
}));

describe("useSearchMovies", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns empty results when keyword length < 2", async () => {
    const { result } = renderHook(() => useSearchMovies("a"));
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.results).toEqual([]);
    expect(omdbAPI.get).not.toHaveBeenCalled();
  });

  it("sets results when API returns Response=True", async () => {
    (omdbAPI.get as any).mockResolvedValueOnce({
      data: {
        Response: "True",
        Search: [{ Title: "Avatar" }, { Title: "Avatar 2" }],
      },
    });
    const { result } = renderHook(() => useSearchMovies("avatar"));
    expect(result.current.loading).toBe(true);
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(omdbAPI.get).toHaveBeenCalledWith("", {
      params: { s: "avatar", page: 1 },
      signal: expect.any(AbortSignal),
    });
    expect(result.current.results).toEqual([
      { Title: "Avatar" },
      { Title: "Avatar 2" },
    ]);
  });

  it("sets empty results when API returns Response=False", async () => {
    (omdbAPI.get as any).mockResolvedValueOnce({
      data: { Response: "False", Error: "Movie not found" },
    });
    const { result } = renderHook(() => useSearchMovies("zzzz"));
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.results).toEqual([]);
  });

  it("sets empty results when request throws error", async () => {
    (omdbAPI.get as any).mockRejectedValueOnce(new Error("Network error"));
    const { result } = renderHook(() => useSearchMovies("avatar"));
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.results).toEqual([]);
  });

  it("sets empty results when Response=True but Search is undefined", async () => {
    (omdbAPI.get as any).mockResolvedValueOnce({ data: { Response: "True" } });
    const { result } = renderHook(() => useSearchMovies("avatar"));
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.results).toEqual([]);
  });
});
