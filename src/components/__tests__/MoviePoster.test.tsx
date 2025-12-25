import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import MoviePoster from "../MoviePoster";

describe("MoviePoster", () => {
  afterEach(() => {
    cleanup();
    document.body.style.overflow = "";
  });

  it('renders "No Image" when src is missing', () => {
    render(<MoviePoster src="" alt="poster" />);
    expect(screen.getByText("No Image")).toBeInTheDocument();
  });

  it('renders "No Image" when src is "N/A"', () => {
    render(<MoviePoster src="N/A" alt="poster" />);
    expect(screen.getByText("No Image")).toBeInTheDocument();
  });

  it("renders image when src is provided", () => {
    render(<MoviePoster src="poster.jpg" alt="Movie Poster" />);
    const image = screen.getByAltText("Movie Poster");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "poster.jpg");
  });

  it("opens modal on image click", () => {
    render(<MoviePoster src="poster.jpg" alt="Movie Poster" />);
    const image = screen.getByAltText("Movie Poster");
    fireEvent.click(image);
    expect(screen.getAllByAltText("Movie Poster")[1]).toBeInTheDocument();
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("closes modal when clicking backdrop", () => {
    render(<MoviePoster src="poster.jpg" alt="Movie Poster" />);
    fireEvent.click(screen.getByAltText("Movie Poster"));
    const backdrop = document.querySelector(".fixed.inset-0");
    expect(backdrop).toBeTruthy();
    fireEvent.click(backdrop!);
    expect(screen.queryByRole("button", { name: "✕" })).not.toBeInTheDocument();

    expect(document.body.style.overflow).toBe("");
  });

  it("closes modal when clicking close button", () => {
    render(<MoviePoster src="poster.jpg" alt="Movie Poster" />);
    fireEvent.click(screen.getByAltText("Movie Poster"));
    const closeButton = screen.getByRole("button", { name: "✕" });
    fireEvent.click(closeButton);
    expect(screen.queryByRole("button", { name: "✕" })).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe("");
  });

  it("does not close modal when clicking image container", () => {
    render(<MoviePoster src="poster.jpg" alt="Movie Poster" />);
    fireEvent.click(screen.getByAltText("Movie Poster"));
    const modalImage = screen.getAllByAltText("Movie Poster")[1];
    fireEvent.click(modalImage);
    expect(screen.getByRole("button", { name: "✕" })).toBeInTheDocument();
  });
});
