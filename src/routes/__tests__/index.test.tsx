import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, it, expect, vi } from "vitest";
import AppRoutes from "..";

vi.mock("../../pages/Home", () => ({
  default: () => <div>Home Page</div>,
}));

vi.mock("../../pages/MovieDetail", () => ({
  default: () => <div>Movie Detail Page</div>,
}));

vi.mock("../../pages/NotFound", () => ({
  default: () => <div>Not Found Page</div>,
}));

describe("AppRoutes", () => {
  it("renders Home page on /", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });

  it("renders MovieDetail page on /movie/:id", () => {
    render(
      <MemoryRouter initialEntries={["/movie/tt123456"]}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByText("Movie Detail Page")).toBeInTheDocument();
  });

  it("renders NotFound page on unknown route", () => {
    render(
      <MemoryRouter initialEntries={["/unknown-route"]}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByText("Not Found Page")).toBeInTheDocument();
  });
});
