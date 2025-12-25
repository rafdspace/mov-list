import { describe, it, expect, vi, afterEach, type Mock } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "../Home";
import { useFetchMovies } from "../../repositories/useFetchMovies";
import { useSelector } from "react-redux";

const mockDispatch = vi.fn();
const mockState = (overrides?: Partial<any>) => ({
  movies: {
    list: [],
    page: 1,
    loading: false,
    hasMore: true,
    totalResults: 100,
    keyword: "avatar",
    ...overrides,
  },
});

vi.mock("../../components/MovieCard", () => ({
  default: ({ title }: any) => <div data-testid="movie-card">{title}</div>,
}));

vi.mock("../../repositories/useFetchMovies", () => ({
  useFetchMovies: vi.fn((payload) => ({
    type: "movies/useFetchMovies",
    payload,
  })),
}));


vi.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
  useSelector: vi.fn(),
}));


describe("Home Page", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("dispatches fetch on mount when list is empty", () => {
    (useSelector as unknown as Mock).mockImplementation((fn) =>
      fn(mockState())
    );
    render(<Home />);
    expect(mockDispatch).toHaveBeenCalledWith(
      useFetchMovies({ page: 1, keyword: "avatar" })
    );
  });

  it("renders movie cards", () => {
    (useSelector as unknown as Mock).mockImplementation((fn) =>
      fn(
        mockState({
          list: [
            {
              imdbID: "1",
              Title: "Avatar",
              Poster: "poster.jpg",
              Type: "movie",
              Year: "2009",
            },
          ],
        })
      )
    );
    render(<Home />);
    expect(screen.getByTestId("movie-card")).toHaveTextContent("Avatar");
  });

  it("shows loading indicator when loading", () => {
    (useSelector as unknown as Mock).mockImplementation((fn) =>
      fn(mockState({ loading: true, list: [] }))
    );
    render(<Home />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("shows results count when not loading", () => {
    (useSelector as unknown as Mock).mockImplementation((fn) =>
      fn(mockState({ list: Array(5).fill({}), totalResults: 50 }))
    );
    render(<Home />);
    expect(screen.getByText("Showing 5 of 50 results")).toBeInTheDocument();
  });

  it("dispatches fetch when list exists but page does not fill viewport", () => {
    Object.defineProperty(document.documentElement, "scrollHeight", {
      value: 500,
      configurable: true,
    });
    Object.defineProperty(document.documentElement, "clientHeight", {
      value: 800,
      configurable: true,
    });
    (useSelector as unknown as Mock).mockImplementation((fn) =>
      fn(mockState({ list: [{ imdbID: "1" }], page: 2 }))
    );
    render(<Home />);
    expect(mockDispatch).toHaveBeenCalledWith(
      useFetchMovies({ page: 2, keyword: "avatar" })
    );
  });

  it("dispatches fetch on scroll near bottom", () => {
    (useSelector as unknown as Mock).mockImplementation((fn) =>
      fn(mockState({ list: [{ imdbID: "1" }], page: 2 }))
    );
    Object.defineProperty(document.documentElement, "scrollTop", {
      value: 1000,
      writable: true,
      configurable: true,
    });
    Object.defineProperty(document.documentElement, "scrollHeight", {
      value: 1200,
      configurable: true,
    });
    Object.defineProperty(document.documentElement, "clientHeight", {
      value: 400,
      configurable: true,
    });
    render(<Home />);
    window.dispatchEvent(new Event("scroll"));
    expect(mockDispatch).toHaveBeenCalledWith(
      useFetchMovies({ page: 2, keyword: "avatar" })
    );
  });

  it("does NOT dispatch fetch when scroll is above threshold", () => {
    const dispatch = vi.fn();
    (useSelector as unknown as Mock).mockImplementation((fn) =>
      fn({
        movies: {
          list: [{ imdbID: "1" }],
          page: 2,
          keyword: "batman",
          loading: false,
          hasMore: true,
          totalResults: "100",
        },
      })
    );
    Object.defineProperty(document.documentElement, "scrollTop", {
      value: 200,
      writable: true,
      configurable: true,
    });
    Object.defineProperty(document.documentElement, "clientHeight", {
      value: 400,
      configurable: true,
    });
    Object.defineProperty(document.documentElement, "scrollHeight", {
      value: 1200,
      configurable: true,
    });
    render(<Home />);
    window.dispatchEvent(new Event("scroll"));
    expect(dispatch).not.toHaveBeenCalled();
  });

  it("does not fetch on scroll when loading or hasMore is false", () => {
    (useSelector as unknown as Mock).mockImplementation((fn) =>
      fn(mockState({ loading: true, hasMore: false, list: [{ imdbID: "1" }] }))
    );
    render(<Home />);
    window.dispatchEvent(new Event("scroll"));
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
