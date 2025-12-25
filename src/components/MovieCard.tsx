import { Link } from "react-router";
import MoviePoster from "./MoviePoster";

interface MovieCardProps {
  title: string;
  poster: string;
  id: string;
  type: string;
  year: string;
}

export default function MovieCard(props: MovieCardProps) {
  const { title, poster, id, type, year } = props;

  return (
    <div className="bg-gray-900 text-white rounded-xl p-3 hover:scale-101 transition">
      <MoviePoster src={poster} alt={title} />

      <Link to={`/movie/${id}`}>
        <div className="mt-2 cursor-pointer">
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-gray-400 capitalize">{type} • {year}</p>
        </div>
      </Link>
    </div>
  );
}
