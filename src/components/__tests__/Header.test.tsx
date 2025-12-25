import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router";
import Header from "../Header";

vi.mock("../Search", () => ({
  default: () => <div data-testid="search-component">Search</div>,
}));

describe("Header", () => {
  const renderHeader = () =>
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

  it("renders header element", () => {
    renderHeader();
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("renders logo link pointing to home", () => {
    renderHeader();
    const logoLink = screen.getByRole("link");
    expect(logoLink).toHaveAttribute("href", "/");
    expect(logoLink).toHaveTextContent("MOV");
  });

  it("renders Search component", () => {
    renderHeader();
    expect(screen.getByTestId("search-component")).toBeInTheDocument();
  });

  it("has correct layout containers", () => {
    renderHeader();
    const header = screen.getByRole("banner");
    expect(header).toHaveClass("sticky", "top-0", "z-50");
  });
});
