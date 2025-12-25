import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../components/MovieCard";
import type { AppDispatch, RootState } from "../store";
import { useFetchMovies } from "../repositories/useFetchMovies";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { list, page, loading, hasMore, totalResults, keyword } = useSelector(
    (state: RootState) => state.movies
  );

  const canScroll = () => {
    const { scrollHeight, clientHeight } = document.documentElement;
    return scrollHeight > clientHeight;
  };

  useEffect(() => {
    if (list.length === 0 && !loading) {
      dispatch(useFetchMovies({ page: 1, keyword }));
    }
  }, [dispatch, list.length, loading, keyword]);

  useEffect(() => {
    if (!loading && hasMore && list.length > 0 && !canScroll()) {
      dispatch(useFetchMovies({ page, keyword }));
    }
  }, [list.length, loading, hasMore, page, keyword, dispatch]);

  const handleScroll = useCallback(() => {
    if (!hasMore || loading) return;

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 200) {
      dispatch(useFetchMovies({ page, keyword }));
    }
  }, [dispatch, hasMore, loading, page, keyword]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="w-screen">
      <div className="w-full max-w-310 m-auto border-x border-gray-100">
        <div className="p-4 md:p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {list.map((movie, idx) => (
            <MovieCard
              key={`${movie.imdbID}-${idx}`}
              title={movie.Title}
              poster={movie.Poster}
              id={movie.imdbID}
              type={movie.Type}
              year={movie.Year}
            />
          ))}

          <div className="col-span-full text-center text-gray-400">
            {loading
              ? "Loading..."
              : `Showing ${list.length} of ${totalResults} results`}
          </div>
        </div>
      </div>
    </div>
  );
}
