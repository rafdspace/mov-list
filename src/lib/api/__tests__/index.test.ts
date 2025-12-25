import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";

const mockAxiosInstance = {
  get: vi.fn(),
  post: vi.fn(),
};

vi.mock("axios", async () => {
  const actual = await vi.importActual<typeof import("axios")>("axios");
  return {
    ...actual,
    default: {
      ...actual.default,
      create: vi.fn(() => mockAxiosInstance),
    },
  };
});

describe("omdbAPI", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    import.meta.env.VITE_OMDB_BASE_URL = "https://www.omdbapi.com";
    import.meta.env.VITE_OMDB_API_KEY = "test-api-key";
  });

  it("creates axios instance with correct baseURL and params", async () => {
    const { omdbAPI } = await import("..");
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: "https://www.omdbapi.com",
      params: {
        apikey: "test-api-key",
      },
    });
    expect(omdbAPI).toBe(mockAxiosInstance);
  });
});
