import { describe, expect, it } from "vitest";
import { localize } from "../src/localize/localize";

describe("localize", () => {
  it("resolves a key in the user's language", () => {
    expect(localize({ locale: { language: "fr" } }, "card.off")).toBe("Éteint");
  });

  it("falls back to English for an unknown language", () => {
    expect(localize({ locale: { language: "de" } }, "card.off")).toBe("Off");
  });
});
