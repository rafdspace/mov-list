import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Badge } from "../Badge";

describe("Badge", () => {
  it("renders children content", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("uses default variant when variant prop is not provided", () => {
    render(<Badge>Default</Badge>);
    const badge = screen.getByText("Default");
    expect(badge).toHaveClass("bg-gray-100");
    expect(badge).toHaveClass("text-gray-700");
    expect(badge).toHaveClass("border-gray-200");
  });

  it("applies primary variant classes", () => {
    render(<Badge variant="primary">Primary</Badge>);
    const badge = screen.getByText("Primary");
    expect(badge).toHaveClass("bg-blue-100");
    expect(badge).toHaveClass("text-blue-700");
    expect(badge).toHaveClass("border-blue-200");
  });

  it("applies success variant classes", () => {
    render(<Badge variant="success">Success</Badge>);
    const badge = screen.getByText("Success");
    expect(badge).toHaveClass("bg-green-100");
    expect(badge).toHaveClass("text-green-700");
    expect(badge).toHaveClass("border-green-200");
  });

  it("applies warning variant classes", () => {
    render(<Badge variant="warning">Warning</Badge>);
    const badge = screen.getByText("Warning");
    expect(badge).toHaveClass("bg-yellow-100");
    expect(badge).toHaveClass("text-yellow-700");
    expect(badge).toHaveClass("border-yellow-200");
  });

  it("always renders base badge classes", () => {
    render(<Badge>Base</Badge>);
    const badge = screen.getByText("Base");
    expect(badge).toHaveClass(
      "inline-flex",
      "items-center",
      "px-2",
      "py-0.5",
      "text-xs",
      "font-medium",
      "rounded-full",
      "border"
    );
  });
});
