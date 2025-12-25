import { describe, it, expect } from "vitest";
import { formatRuntime } from "../formatRuntime";

describe("formatRuntime", () => {
  it('returns "N/A" when runtime is undefined', () => {
    expect(formatRuntime()).toBe("N/A");
  });
  it('returns "N/A" when runtime is "N/A"', () => {
    expect(formatRuntime("N/A")).toBe("N/A");
  });
  it("returns minutes only when runtime is less than 1 hour", () => {
    expect(formatRuntime("45 min")).toBe("45m");
  });
  it("returns hours only when runtime is exactly multiple of 60", () => {
    expect(formatRuntime("120 min")).toBe("2h");
  });
  it("returns hours and minutes when runtime has both", () => {
    expect(formatRuntime("135 min")).toBe("2h 15m");
  });
  it("returns original runtime when value cannot be parsed", () => {
    expect(formatRuntime("unknown")).toBe("unknown");
  });
  it("handles zero minutes correctly", () => {
    expect(formatRuntime("0 min")).toBe("0m");
  });
});
