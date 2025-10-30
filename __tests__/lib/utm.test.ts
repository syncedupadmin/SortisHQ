import { describe, it, expect, beforeEach, vi } from "vitest";
import { captureUTMParams, getStoredUTMParams, clearUTMParams } from "@/lib/utm";

describe("UTM Tracking", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.stubGlobal("window", {
      location: {
        search: "",
      },
    });
  });

  it("should capture UTM parameters from query string", () => {
    Object.defineProperty(window, "location", {
      value: {
        search: "?utm_source=google&utm_medium=cpc&utm_campaign=test",
      },
      writable: true,
    });

    const result = captureUTMParams();
    expect(result).toEqual({
      utm_source: "google",
      utm_medium: "cpc",
      utm_campaign: "test",
    });
  });

  it("should return null when no UTM params present", () => {
    Object.defineProperty(window, "location", {
      value: { search: "" },
      writable: true,
    });

    const result = captureUTMParams();
    expect(result).toBeNull();
  });

  it("should store and retrieve UTM params from localStorage", () => {
    const testParams = {
      utm_source: "facebook",
      utm_medium: "social",
    };

    localStorage.setItem("sortisiq_utm", JSON.stringify(testParams));

    const result = getStoredUTMParams();
    expect(result).toEqual(testParams);
  });

  it("should clear UTM params from localStorage", () => {
    localStorage.setItem("sortisiq_utm", JSON.stringify({ utm_source: "test" }));

    clearUTMParams();

    expect(localStorage.getItem("sortisiq_utm")).toBeNull();
  });
});
