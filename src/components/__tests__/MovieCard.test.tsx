import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import MovieCard from "../MovieCard";

const mockMoviePoster = vi.fn();

vi.mock("../MoviePoster", () => ({
  default: (props: any) => {
    mockMoviePoster(props);
    return <div data-testid="movie-poster" />;
  },
}));

vi.mock("react-router", () => ({
  Link: ({ to, children, ...rest }: any) => (
    <a href={to} {...rest}>
      {children}
    </a>
  ),
}));

vi.mock("../../assets/placeholder.jpg", () => ({
  default: "placeholder.jpg",
}));

describe("MovieCard", () => {
  it("renders movie title, type, year and link", () => {
    render(
      <MovieCard
        title="Avatar"
        poster="poster.jpg"
        id="tt0499549"
        type="movie"
        year="2009"
      />
    );
    expect(screen.getByText("Avatar")).toBeInTheDocument();
    expect(screen.getByText("movie • 2009")).toBeInTheDocument();
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/movie/tt0499549");
  });

  it("passes poster URL to MoviePoster when poster is valid", () => {
    render(
      <MovieCard
        title="Avatar"
        poster="poster.jpg"
        id="1"
        type="movie"
        year="2009"
      />
    );
    expect(mockMoviePoster).toHaveBeenCalledWith(
      expect.objectContaining({
        src: "poster.jpg",
        alt: "Avatar",
      })
    );
  });

  it('uses placeholder image when poster is "N/A"', () => {
    render(
      <MovieCard
        title="Unknown Movie"
        poster="N/A"
        id="2"
        type="movie"
        year="2020"
      />
    );
    expect(mockMoviePoster).toHaveBeenCalledWith(
      expect.objectContaining({
        src: "placeholder.jpg",
        alt: "Unknown Movie",
      })
    );
  });
});
