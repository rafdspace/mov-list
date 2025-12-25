import { Link } from "react-router";
import MoviePoster from "./MoviePoster";
import PlaceholderImg from "../assets/placeholder.jpg";

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
    <div className="bg-gray-900 text-white rounded-xl hover:scale-101 transition flex flex-col gap-2">
      <MoviePoster
        src={poster !== "N/A" ? poster : PlaceholderImg}
        alt={title}
      />

      <Link to={`/movie/${id}`} className="px-3 pb-3 flex-1">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-400 capitalize">
          {type} • {year}
        </p>
      </Link>
    </div>
  );
}
