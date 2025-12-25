import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../components/MovieCard";
import type { AppDispatch, RootState } from "../store";
import { useFetchMovies } from "../repositories/useFetchMovies";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { list, page, loading, hasMore, totalResults } = useSelector(
    (state: RootState) => state.movies
  );

  useEffect(() => {
    if (list.length === 0 && !loading) {
      dispatch(useFetchMovies(1));
    }
  }, [dispatch, list.length, loading]);

  const handleScroll = useCallback(() => {
    if (!hasMore || loading) return;
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 200) {
      dispatch(useFetchMovies(page));
    }
  }, [dispatch, hasMore, loading, page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="w-screen">
      <div className="w-full max-w-310 m-auto border-x border-gray-100">
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {list.map((movie, idx) => (
            <MovieCard
              key={`${movie.imdbID}-${idx + 1}`}
              title={movie.Title}
              poster={movie.Poster}
              id={movie.imdbID}
              type={movie.Type}
              year={movie.Year}
            />
          ))}

          {loading ? (
            <div className="col-span-full text-center">Loading...</div>
          ) : (
            <div className="col-span-full text-center text-gray-400">
              Showing {list.length} of {totalResults} results
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
