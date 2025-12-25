import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useDebounce } from "../useDebounce";

describe("useDebounce", () => {
  it("returns initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("hello"));
    expect(result.current).toBe("hello");
  });

  it("updates value after default delay", async () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(({ value }) => useDebounce(value), {
      initialProps: { value: "hello" },
    });
    rerender({ value: "world" });
    expect(result.current).toBe("hello");
    act(() => {
      vi.advanceTimersByTime(400);
    });
    expect(result.current).toBe("world");
    vi.useRealTimers();
  });

  it("clears previous timer when value changes quickly", () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: "a" } }
    );
    rerender({ value: "ab" });
    rerender({ value: "abc" });
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(result.current).toBe("abc");
    vi.useRealTimers();
  });

  it("respects custom delay", () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 1000),
      { initialProps: { value: "one" } }
    );
    rerender({ value: "two" });
    act(() => {
      vi.advanceTimersByTime(999);
    });
    expect(result.current).toBe("one");
    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current).toBe("two");
    vi.useRealTimers();
  });
});
