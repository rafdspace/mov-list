import { useCallback, useEffect, useState } from "react";
import type { MovieDetail } from "../types/movie";
import { omdbAPI } from "../lib/api";

export const useFetchMovieDetail = (id?: string) => {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMovieDetail = useCallback(async (movieId: string) => {
    try {
      setLoading(true);
      setError(null);

      const res = await omdbAPI.get<MovieDetail>("", {
        params: { i: movieId },
      });

      if (res.data.Response === "False") {
        throw new Error(res.data.Error);
      }

      setMovie(res.data);
    } catch (err: unknown) {
      setError((err as Error).message || "Failed to fetch movie detail");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!id) return;
    fetchMovieDetail(id);
  }, [id]);

  return { movie, loading, error };
};
