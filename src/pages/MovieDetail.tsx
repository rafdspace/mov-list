import { useParams, useNavigate } from "react-router";
import MoviePoster from "../components/MoviePoster";
import { Badge } from "../components/Badge";
import { formatRuntime } from "../lib/utils/formatRuntime";
import MovieDetailItem from "../components/MovieDetailItem";
import { useFetchMovieDetail } from "../repositories/useFetchMovieDetail";

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { movie, loading, error } = useFetchMovieDetail(id);

  if (loading)
    return (
      <div className="p-6 w-screen h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="p-6 text-red-500 w-screen h-screen flex items-center justify-center">
        {error}
      </div>
    );

  if (!movie) return null;

  return (
    <div className="w-screen">
      <div className="w-full max-w-310 m-auto border-x border-gray-100">
        <div className="p-4 md:p-6 flex flex-col gap-6">
          <button
            onClick={() => navigate("/")}
            className="text-gray-500 hover:text-gray-700 self-start cursor-pointer font-semibold"
          >
            ← Back
          </button>

          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold m-0">{movie.Title}</h1>
            <p className="text-sm text-gray-500 capitalize">
              {movie.Type} • {movie.Year} • {formatRuntime(movie.Runtime)} •{" "}
              {movie.Rated}
            </p>
          </div>

          <div className="w-full bg-gray-900 flex items-center justify-center rounded-xl">
            <MoviePoster
              src={movie.Poster}
              alt={movie.Title}
              imageClassName="!h-[350px] !object-contain"
            />
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                {movie.Genre !== "N/A" && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {movie.Genre.split(", ").map((genre: string) => (
                      <Badge key={genre}>{genre}</Badge>
                    ))}
                  </div>
                )}

                <p className="mt-2">{movie.Plot}</p>
              </div>

              {movie.imdbRating && (
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">IMDb rating</p>
                  <div className="flex gap-2">
                    <p className="text-[32px]">⭐</p>
                    <div className="flex flex-col">
                      <p className="text-[20px] font-semibold">
                        {movie.imdbRating}{" "}
                        <span className="text-[16px] text-gray-500">/10</span>
                      </p>
                      <p className="text-[12px] text-gray-500">
                        ({movie.imdbVotes} votes)
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <MovieDetailItem label="Released" value={movie.Released} />
              <MovieDetailItem label="Director" value={movie.Director} />
              <MovieDetailItem label="Writer" value={movie.Writer} />
              <MovieDetailItem label="Actors" value={movie.Actors} />
              <MovieDetailItem label="Awards" value={movie.Awards} />
              <MovieDetailItem label="Language" value={movie.Language} />
              <MovieDetailItem label="Country" value={movie.Country} />
              <MovieDetailItem label="Box Office" value={movie.BoxOffice} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
