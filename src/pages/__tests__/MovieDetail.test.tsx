import { render, screen } from "@testing-library/react";
import MovieDetail from "../MovieDetail";
import { useParams } from "react-router";
import { useFetchMovieDetail } from "../../repositories/useFetchMovieDetail";
import type { Mock } from "vitest";

vi.mock("react-router", () => ({
  useParams: vi.fn(),
}));

vi.mock("../../repositories/useFetchMovieDetail", () => ({
  useFetchMovieDetail: vi.fn(),
}));

vi.mock("../../components/MoviePoster", () => ({
  default: ({ alt }: any) => <img alt={alt} />,
}));

vi.mock("../../components/Badge", () => ({
  Badge: ({ children }: any) => <span>{children}</span>,
}));

vi.mock("../../components/MovieDetailItem", () => ({
  default: ({ label, value }: any) => (
    <div>
      {label}: {value}
    </div>
  ),
}));

vi.mock("../../lib/utils/formatRuntime", () => ({
  formatRuntime: vi.fn(() => "2h 30m"),
}));

describe("MovieDetail Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useParams as unknown as Mock).mockReturnValue({ id: "tt123" });
  });

  it("renders loading state", () => {
    (useFetchMovieDetail as unknown as Mock).mockReturnValue({
      movie: null,
      loading: true,
      error: null,
    });
    render(<MovieDetail />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error state", () => {
    (useFetchMovieDetail as unknown as Mock).mockReturnValue({
      movie: null,
      loading: false,
      error: "Movie not found",
    });
    render(<MovieDetail />);
    expect(screen.getByText("Movie not found")).toBeInTheDocument();
  });

  it("returns null when movie is not available", () => {
    (useFetchMovieDetail as unknown as Mock).mockReturnValue({
      movie: null,
      loading: false,
      error: null,
    });
    const { container } = render(<MovieDetail />);
    expect(container.firstChild).toBeNull();
  });

  it("renders movie detail correctly", () => {
    (useFetchMovieDetail as unknown as Mock).mockReturnValue({
      loading: false,
      error: null,
      movie: {
        Title: "Avatar",
        Type: "movie",
        Year: "2009",
        Runtime: "150 min",
        Rated: "PG-13",
        Poster: "poster.jpg",
        Genre: "Action, Adventure",
        Plot: "Epic sci-fi movie",
        imdbRating: "7.8",
        imdbVotes: "1,200,000",
        Released: "18 Dec 2009",
        Director: "James Cameron",
        Writer: "James Cameron",
        Actors: "Sam Worthington",
        Awards: "3 Oscars",
        Language: "English",
        Country: "USA",
        BoxOffice: "$2.7B",
      },
    });
    render(<MovieDetail />);
    expect(screen.getByText("Avatar")).toBeInTheDocument();
    expect(
      screen.getByText(/movie • 2009 • 2h 30m • PG-13/i)
    ).toBeInTheDocument();
    expect(screen.getByAltText("Avatar")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
    expect(screen.getByText("Adventure")).toBeInTheDocument();
    expect(screen.getByText("Epic sci-fi movie")).toBeInTheDocument();
    expect(screen.getByText("IMDb rating")).toBeInTheDocument();
    expect(screen.getByText("7.8")).toBeInTheDocument();
    expect(screen.getByText("(1,200,000 votes)")).toBeInTheDocument();
    expect(screen.getByText("Director: James Cameron")).toBeInTheDocument();
    expect(screen.getByText("Box Office: $2.7B")).toBeInTheDocument();
  });
});
