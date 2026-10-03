import { describe, expect, it } from "vitest";
import { localize } from "../src/localize/localize";
import en from "../src/localize/en.json";
import fr from "../src/localize/fr.json";

const FR = { locale: { language: "fr" } };

function leafKeys(obj: Record<string, any>, prefix = ""): string[] {
  return Object.entries(obj).flatMap(([k, v]) =>
    typeof v === "object" ? leafKeys(v, `${prefix}${k}.`) : [`${prefix}${k}`],
  );
}

describe("localize", () => {
  it("resolves a key in the user's language", () => {
    expect(localize(FR, "card.off")).toBe("Éteint");
  });

  it("falls back to English for an unknown language", () => {
    expect(localize({ locale: { language: "de" } }, "card.off")).toBe("Off");
  });

  it("uses the region-less language code", () => {
    expect(localize({ locale: { language: "fr-CA" } }, "card.off")).toBe(
      "Éteint",
    );
  });

  it("returns the caller's fallback for a missing key", () => {
    expect(localize(FR, "thermostat.dehumidify", undefined, "Déshu")).toBe(
      "Déshu",
    );
  });

  it("returns the key when nothing else is available", () => {
    expect(localize(FR, "card.does_not_exist")).toBe("card.does_not_exist");
  });

  it("substitutes parameters", () => {
    expect(localize(FR, "card.covers_left_open", { covers: "Salon" })).toBe(
      "Volets non fermés : Salon",
    );
  });

  it("has the same keys in every language", () => {
    expect(leafKeys(fr).sort()).toEqual(leafKeys(en).sort());
  });
});
