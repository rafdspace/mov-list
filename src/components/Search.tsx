import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setKeyword } from "../reducers/movieReducer";
import { useSearchMovies } from "../repositories/useSearchMovie";
import { useOutsideClick } from "../lib/utils/handleClickOutside";

export default function Search() {
  const [keywordLocal, setKeywordLocal] = useState("");
  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { results, loading } = useSearchMovies(keywordLocal);

  useOutsideClick(containerRef, () => setOpen(false));

  const submitSearch = () => {
    if (!keywordLocal.trim() || !results.length || loading) return;
    dispatch(setKeyword(keywordLocal));
    navigate("/");
    setOpen(false);
    setKeywordLocal("");
  };

  const handleClickSuggestion = (imdbID: string) => {
    navigate(`/movie/${imdbID}`);
    setOpen(false);
    setKeywordLocal("");
  };

  return (
    <div ref={containerRef} className="relative w-full md:w-80">
      <input
        value={keywordLocal}
        onChange={(e) => {
          setKeywordLocal(e.target.value);
          setOpen(true);
        }}
        onKeyDown={(e) => e.key === "Enter" && submitSearch()}
        placeholder="Search movie..."
        className="
          w-full px-4 py-3 md:px-3 md:py-2
          rounded bg-gray-700 text-white outline-none
        "
      />

      {open && keywordLocal && (
        <div
          className="
            z-50 bg-gray-800 border border-gray-600 shadow-xl overflow-y-auto

            fixed left-0 right-0 top-16 max-h-[70vh]
            md:absolute md:top-full md:left-0 md:right-0 md:mt-1 md:max-h-96
            md:rounded
          "
        >
          {loading && (
            <div className="p-4 text-sm text-gray-400">Loading...</div>
          )}

          {!loading &&
            results.map((movie, idx) => (
              <div
                key={`${movie.imdbID}-${idx}`}
                onClick={() => handleClickSuggestion(movie.imdbID)}
                className="flex items-center gap-3 p-4 md:p-2 hover:bg-gray-700 cursor-pointer"
              >
                <img
                  src={
                    movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"
                  }
                  alt={movie.Title}
                  className="w-10 h-14 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="text-sm text-white line-clamp-1">
                    {movie.Title}
                  </p>
                  <p className="text-xs text-gray-400">{movie.Year}</p>
                </div>
              </div>
            ))}

          {!loading && results.length > 0 && (
            <div
              onClick={submitSearch}
              className="p-4 md:p-3 text-sm text-blue-400 hover:bg-gray-700 cursor-pointer border-t border-gray-700"
            >
              See all results for{" "}
              <span className="font-semibold">"{keywordLocal}"</span>
            </div>
          )}

          {!loading && results.length === 0 && (
            <div className="p-4 text-sm text-gray-400">No results found</div>
          )}
        </div>
      )}
    </div>
  );
}
