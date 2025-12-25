import { useCallback, useEffect, useState } from "react";
import type { Movie } from "../types/movie";
import { omdbAPI } from "../lib/api";
import { useDebounce } from "../lib/hooks/useDebounce";

interface SearchResponse {
  Search?: Movie[];
  Response: "True" | "False";
  Error?: string;
}

export const useSearchMovies = (keyword: string) => {
  const debouncedKeyword = useDebounce(keyword, 400);

  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMovies = useCallback(
    async (signal?: AbortSignal) => {
      if (!debouncedKeyword || debouncedKeyword.length < 2) {
        setResults([]);
        return;
      }

      try {
        setLoading(true);

        const res = await omdbAPI.get<SearchResponse>("", {
          params: {
            s: debouncedKeyword,
            page: 1,
          },
          signal,
        });

        if (res.data.Response === "True") {
          setResults(res.data.Search?.slice(0, 10) || []);
        } else {
          setResults([]);
        }
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    },
    [debouncedKeyword]
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchMovies(controller.signal);
    return () => controller.abort();
  }, [fetchMovies]);

  return { results, loading };
};
