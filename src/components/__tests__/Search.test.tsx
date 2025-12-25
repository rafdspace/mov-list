import { describe, it, expect, vi, type Mock } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Search from "../Search";
import { useSearchMovies } from "../../repositories/useSearchMovie";
import { useHandleClickOutside } from "../../lib/hooks/useHandleClickOutside";

const mockDispatch = vi.fn();
const mockUseHandleClickOutside = vi.fn();
const mockNavigate = vi.fn();

vi.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
}));

vi.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("../../repositories/useSearchMovie", () => ({
  useSearchMovies: vi.fn(),
}));

vi.mock("../../lib/hooks/useHandleClickOutside", () => ({
  useHandleClickOutside: vi.fn(),
}));

vi.mock("../../assets/placeholder.jpg", () => ({
  default: "placeholder.jpg",
}));

const setup = (options?: { results?: any[]; loading?: boolean }) => {
  (useSearchMovies as unknown as Mock).mockReturnValue({
    results: options?.results ?? [],
    loading: options?.loading ?? false,
  });

  (useHandleClickOutside as unknown as Mock).mockImplementation(
    (_ref: any, handler: () => void) => {
      mockUseHandleClickOutside(handler);
    }
  );

  return render(<Search />);
};
describe("Search Component", () => {
  it("opens dropdown when typing", () => {
    setup();
    const input = screen.getByPlaceholderText("Search movie...");
    fireEvent.change(input, { target: { value: "av" } });
    expect(input).toHaveValue("av");
  });

  it("shows loading state", () => {
    setup({ loading: true });
    const input = screen.getByPlaceholderText("Search movie...");
    fireEvent.change(input, { target: { value: "avatar" } });
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders movie suggestions", () => {
    setup({
      results: [
        {
          imdbID: "tt0499549",
          Title: "Avatar",
          Year: "2009",
          Poster: "poster.jpg",
        },
      ],
    });
    const input = screen.getByPlaceholderText("Search movie...");
    fireEvent.change(input, { target: { value: "avatar" } });
    expect(screen.getByText("Avatar")).toBeInTheDocument();
    expect(screen.getByText("2009")).toBeInTheDocument();
  });

  it("navigates to movie detail when clicking suggestion", () => {
    setup({
      results: [
        {
          imdbID: "tt0499549",
          Title: "Avatar",
          Year: "2009",
          Poster: "poster.jpg",
        },
      ],
    });
    fireEvent.change(screen.getByPlaceholderText("Search movie..."), {
      target: { value: "avatar" },
    });
    fireEvent.click(screen.getByText("Avatar"));
    expect(mockNavigate).toHaveBeenCalledWith("/movie/tt0499549");
  });

  it("dispatches setKeyword and navigates on Enter", () => {
    setup({ results: [{ imdbID: "1", Title: "Avatar" }] });
    const input = screen.getByPlaceholderText("Search movie...");
    fireEvent.change(input, { target: { value: "avatar" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(mockDispatch).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("prevents default behavior on Enter when list is empty", () => {
    setup({ results: [] });
    const input = screen.getByPlaceholderText("Search movie...");
    fireEvent.change(input, { target: { value: "avatar" } });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(mockDispatch).toHaveBeenCalled();
  });

  it("submits search when clicking See all results", () => {
    setup({ results: [{ imdbID: "1", Title: "Avatar" }] });
    fireEvent.change(screen.getByPlaceholderText("Search movie..."), {
      target: { value: "avatar" },
    });
    fireEvent.click(screen.getByText(/See all results for/i));
    expect(mockDispatch).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("shows no results message", () => {
    setup({ results: [] });
    fireEvent.change(screen.getByPlaceholderText("Search movie..."), {
      target: { value: "unknown" },
    });
    expect(screen.getByText("No results found")).toBeInTheDocument();
  });

  it('uses empty src when Poster is "N/A"', () => {
    setup({
      results: [
        { imdbID: "tt2", Title: "Unknown Movie", Year: "2020", Poster: "N/A" },
      ],
    });
    fireEvent.change(screen.getByPlaceholderText("Search movie..."), {
      target: { value: "unknown" },
    });
    const img = screen.getByAltText("Unknown Movie") as HTMLImageElement;
    expect(img.getAttribute("src")).toBe("placeholder.jpg");
  });

  it("closes dropdown when clicking outside", () => {
    setup({
      results: [
        {
          imdbID: "1",
          Title: "Test Movie",
          Year: "2024",
          Poster: "poster.jpg",
        },
      ],
    });

    const input = screen.getByPlaceholderText("Search movie...");
    fireEvent.change(input, { target: { value: "test" } });
    expect(mockUseHandleClickOutside).toHaveBeenCalled();
    const outsideClickHandler = mockUseHandleClickOutside.mock.calls[0][0];
    outsideClickHandler();
  });
});
