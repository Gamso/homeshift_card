import { afterEach, describe, expect, it, vi } from "vitest";
import { HomeShiftCircularSlider } from "../src/components/circular-slider";
import { $, $$, entity, homeshiftStates, makeHass, renderCard } from "./helpers";

afterEach(() => {
  document.body.innerHTML = "";
});

async function renderSlider(currentValue: string) {
  const slider = document.createElement(
    "homeshift-circular-slider",
  ) as HomeShiftCircularSlider;
  slider.options = ["Off", "Heat", "Cool"];
  slider.currentValue = currentValue;
  slider.label = "Thermostat mode";
  document.body.appendChild(slider);
  await slider.updateComplete;
  return slider;
}

function segments(slider: HomeShiftCircularSlider) {
  return [...slider.shadowRoot!.querySelectorAll(".segment")] as SVGGElement[];
}

describe("circular slider keyboard access (A-2)", () => {
  it("exposes a labelled radio group with one tab stop on the active mode", async () => {
    const slider = await renderSlider("Heat");
    const svg = slider.shadowRoot!.querySelector("svg")!;
    expect(svg.getAttribute("role")).toBe("radiogroup");
    expect(svg.getAttribute("aria-label")).toBe("Thermostat mode");
    const segs = segments(slider);
    expect(segs.map((s) => s.getAttribute("role"))).toEqual(["radio", "radio", "radio"]);
    expect(segs.map((s) => s.getAttribute("aria-checked"))).toEqual(["false", "true", "false"]);
    expect(segs.map((s) => s.getAttribute("tabindex"))).toEqual(["-1", "0", "-1"]);
    expect(segs[2].getAttribute("aria-label")).toBe("Cool");
  });

  it("moves focus with arrows and selects with Enter", async () => {
    const slider = await renderSlider("Off");
    const selected = vi.fn();
    slider.addEventListener("option-selected", (e) =>
      selected((e as CustomEvent).detail.option),
    );
    const segs = segments(slider);
    segs[0].focus();
    segs[0].dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft" }));
    expect(slider.shadowRoot!.activeElement).toBe(segs[2]);
    expect(selected).not.toHaveBeenCalled();
    segs[2].dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
    expect(selected).toHaveBeenCalledWith("Cool");
  });
});

describe("badges (A-2, B-6)", () => {
  it("reveals the covers left open on tap, not only on hover", async () => {
    const states = homeshiftStates();
    states["binary_sensor.homeshift_covers_left_open"] = entity(
      "binary_sensor.homeshift_covers_left_open",
      "on",
      { covers: ["cover.salon"] },
    );
    states["cover.salon"] = entity("cover.salon", "open", { friendly_name: "Salon" });
    const card = await renderCard(makeHass(states));
    const badge = $(card, "button.covers-left-open-badge")!;
    expect(badge.getAttribute("aria-label")).toBe("Covers left open: Salon");
    expect($(card, ".badge-detail")).toBeNull();
    badge.click();
    await card.updateComplete;
    expect($(card, ".badge-detail")?.textContent).toContain("Salon");
    expect(badge.getAttribute("aria-expanded")).toBe("true");
  });

  it("makes the heat protection badge reachable", async () => {
    const states = homeshiftStates();
    states["binary_sensor.homeshift_cover_heat_active"].state = "on";
    const card = await renderCard(makeHass(states));
    const badge = $(card, "button.heat-protection-badge")!;
    expect(badge.getAttribute("aria-label")).toBe("Heat protection active");
    const css = (card.constructor as any).styles.cssText as string;
    expect(css).not.toMatch(/heat-protection-badge\s*\{[^}]*pointer-events:\s*none/);
  });

  it("labels the dropdowns", async () => {
    const card = await renderCard(makeHass(homeshiftStates()));
    expect($$(card, "select").map((s) => s.getAttribute("aria-label"))).toEqual([
      "Early switch",
      "Day mode",
      "Override duration",
    ]);
  });
});
