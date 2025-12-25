import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useFetchMovieDetail } from "../useFetchMovieDetail";
import { omdbAPI } from "../../lib/api";
import type { MovieDetail } from "../../types/movie";

const mockMovie: MovieDetail = {
  Title: "Avatar",
  Year: "2009",
  Rated: "PG-13",
  Released: "18 Dec 2009",
  Runtime: "162 min",
  Genre: "Action",
  Director: "James Cameron",
  Writer: "James Cameron",
  Actors: "Sam Worthington",
  Plot: "A paraplegic Marine...",
  Language: "English",
  Country: "USA",
  Awards: "Won 3 Oscars",
  Poster: "https://image.jpg",
  Ratings: [],
  Metascore: "83",
  imdbRating: "7.8",
  imdbVotes: "1,000,000",
  imdbID: "tt0499549",
  Type: "movie",
  DVD: "N/A",
  BoxOffice: "N/A",
  Production: "N/A",
  Website: "N/A",
  Response: "True",
};

vi.mock("../../lib/api", () => ({
  omdbAPI: { get: vi.fn() },
}));

describe("useFetchMovieDetail", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch movie detail successfully", async () => {
    (omdbAPI.get as any).mockResolvedValueOnce({ data: mockMovie });
    const { result } = renderHook(() => useFetchMovieDetail("tt0499549"));
    expect(result.current.loading).toBe(true);
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(omdbAPI.get).toHaveBeenCalledWith("", {
      params: { i: "tt0499549" },
    });
    expect(result.current.movie).toEqual(mockMovie);
    expect(result.current.error).toBeNull();
  });

  it("should handle API error (Response === 'False')", async () => {
    (omdbAPI.get as any).mockResolvedValueOnce({
      data: { Response: "False", Error: "Movie not found!" },
    });
    const { result } = renderHook(() => useFetchMovieDetail("invalid-id"));
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.movie).toBeNull();
    expect(result.current.error).toBe("Movie not found!");
  });

  it("should handle network error", async () => {
    (omdbAPI.get as any).mockRejectedValueOnce(new Error("Network error"));
    const { result } = renderHook(() => useFetchMovieDetail("tt0499549"));
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.movie).toBeNull();
    expect(result.current.error).toBe("Network error");
  });

  it("should not fetch when id is undefined", async () => {
    const { result } = renderHook(() => useFetchMovieDetail(undefined));
    expect(result.current.loading).toBe(false);
    expect(result.current.movie).toBeNull();
    expect(result.current.error).toBeNull();
    expect(omdbAPI.get).not.toHaveBeenCalled();
  });

  it("should use fallback error message when err.message is undefined", async () => {
    (omdbAPI.get as any).mockRejectedValueOnce({});
    const { result } = renderHook(() => useFetchMovieDetail("tt0499549"));
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.movie).toBeNull();
    expect(result.current.error).toBe("Failed to fetch movie detail");
  });
});
