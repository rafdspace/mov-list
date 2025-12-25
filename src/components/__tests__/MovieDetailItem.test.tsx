import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import MovieDetailItem from "../MovieDetailItem";

describe("MovieDetailItem", () => {
  it("renders label and value when value is provided", () => {
    render(<MovieDetailItem label="Director" value="Christopher Nolan" />);
    expect(screen.getByText("Director")).toBeInTheDocument();
    expect(screen.getByText("Christopher Nolan")).toBeInTheDocument();
  });

  it("renders label and value together in correct format", () => {
    render(<MovieDetailItem label="Year" value="2010" />);
    expect(screen.getByText(/2010/)).toBeInTheDocument();
  });

  it("does not render when value is undefined", () => {
    const { container } = render(
      <MovieDetailItem label="Genre" value={undefined} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("does not render when value is empty string", () => {
    const { container } = render(<MovieDetailItem label="Genre" value="" />);
    expect(container.firstChild).toBeNull();
  });

  it('does not render when value is "N/A"', () => {
    const { container } = render(
      <MovieDetailItem label="Writer" value="N/A" />
    );
    expect(container.firstChild).toBeNull();
  });
});
