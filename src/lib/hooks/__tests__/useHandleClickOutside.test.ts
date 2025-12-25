import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useRef } from "react";
import { useHandleClickOutside } from "../useHandleClickOutside";

describe("useHandleClickOutside", () => {
  it("calls handler when clicking outside the element", () => {
    const handler = vi.fn();
    const div = document.createElement("div");
    document.body.appendChild(div);
    renderHook(() => {
      const ref = useRef<HTMLDivElement>(div);
      useHandleClickOutside(ref, handler);
    });
    document.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    expect(handler).toHaveBeenCalledTimes(1);
    document.body.removeChild(div);
  });

  it("does NOT call handler when clicking inside the element", () => {
    const handler = vi.fn();
    const div = document.createElement("div");
    const child = document.createElement("span");
    div.appendChild(child);
    document.body.appendChild(div);
    renderHook(() => {
      const ref = useRef<HTMLDivElement>(div);
      useHandleClickOutside(ref, handler);
      return ref;
    });
    child.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    expect(handler).not.toHaveBeenCalled();
    document.body.removeChild(div);
  });

  it("does NOT call handler when ref is null", () => {
    const handler = vi.fn();
    renderHook(() => {
      const ref = { current: null };
      useHandleClickOutside(ref, handler);
      return ref;
    });
    document.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    expect(handler).not.toHaveBeenCalled();
  });

  it("removes event listener on unmount", () => {
    const handler = vi.fn();
    const removeSpy = vi.spyOn(document, "removeEventListener");
    const div = document.createElement("div");
    document.body.appendChild(div);
    const { unmount } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(div);
      useHandleClickOutside(ref, handler);
      return ref;
    });
    unmount();
    expect(removeSpy).toHaveBeenCalledWith("mousedown", expect.any(Function));
    document.body.removeChild(div);
    removeSpy.mockRestore();
  });
});
