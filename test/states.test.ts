import { afterEach, describe, expect, it } from "vitest";
import { formatMinutes, isUsable, numericState } from "../src/state";
import { $, $$, entity, homeshiftStates, makeHass, renderCard } from "./helpers";

afterEach(() => {
  document.body.innerHTML = "";
});

describe("state helpers", () => {
  it("rejects unknown, unavailable, empty and missing states", () => {
    expect(isUsable(undefined)).toBe(false);
    expect(isUsable("unknown")).toBe(false);
    expect(isUsable({ state: "unavailable" })).toBe(false);
    expect(isUsable({ state: "" })).toBe(false);
    expect(isUsable({ state: "08:30" })).toBe(true);
  });

  it("reads numbers only from usable finite states", () => {
    expect(numericState({ state: "unavailable" })).toBeUndefined();
    expect(numericState({ state: "abc" })).toBeUndefined();
    expect(numericState({ state: "25" })).toBe(25);
  });

  it("formats minutes like the preset labels", () => {
    expect(formatMinutes(25)).toBe("25min");
    expect(formatMinutes(60)).toBe("1h");
    expect(formatMinutes(90)).toBe("1h30");
  });
});

describe("missing entities (B-3)", () => {
  it("reports a missing entity instead of showing stub data", async () => {
    const states = homeshiftStates();
    delete states["select.homeshift_day_mode"];
    const card = await renderCard(makeHass(states));
    expect($(card, ".error")?.textContent).toContain(
      "Entity not found: select.homeshift_day_mode",
    );
    expect($(card, "homeshift-circular-slider")).toBeNull();
  });

  it("uses localized stub data in the card picker preview", async () => {
    const card = await renderCard(makeHass({}, "fr"), {}, true);
    expect($(card, ".error")).toBeNull();
    const labels = $$(card, ".day-section option").map((o) => o.textContent!.trim());
    expect(labels).toEqual(["Maison", "Travail", "Télétravail", "Absence"]);
    const selected = $(card, ".day-section option[selected]");
    expect(selected?.textContent?.trim()).toBe("Travail");
    const slider = $(card, "homeshift-circular-slider") as any;
    expect(slider.options).toContain(slider.currentValue);
  });
});

describe("unknown / unavailable sensors (B-4)", () => {
  it.each(["unknown", "unavailable"])("hides next mode when %s", async (s) => {
    const states = homeshiftStates();
    states["sensor.homeshift_next_mode"] = entity("sensor.homeshift_next_mode", s);
    states["sensor.homeshift_next_mode_at"] = entity("sensor.homeshift_next_mode_at", s);
    const card = await renderCard(makeHass(states));
    expect($(card, ".next-info")).toBeNull();
    expect(card.shadowRoot!.textContent).not.toContain(s);
  });

  it("hides cover times when unavailable", async () => {
    const states = homeshiftStates();
    states["sensor.homeshift_cover_open_time"].state = "unavailable";
    states["sensor.homeshift_cover_close_time"].state = "unknown";
    const card = await renderCard(makeHass(states));
    expect($(card, ".cover-times")).toBeNull();
  });
});

describe("number dropdowns (B-5)", () => {
  it("is neither highlighted nor NaN when unavailable", async () => {
    const states = homeshiftStates();
    states["number.homeshift_override_duration"].state = "unavailable";
    const card = await renderCard(makeHass(states));
    const select = $(card, ".list-select--override") as HTMLSelectElement;
    expect(select.classList.contains("active")).toBe(false);
    expect(select.disabled).toBe(true);
    expect(card.shadowRoot!.innerHTML).not.toContain("NaN");
  });

  it("shows a value set outside the presets", async () => {
    const states = homeshiftStates();
    states["number.homeshift_early_switch"].state = "25";
    const card = await renderCard(makeHass(states));
    const select = $(card, ".list-select--early") as HTMLSelectElement;
    expect(select.classList.contains("active")).toBe(true);
    // happy-dom miscounts selectedIndex next to Lit's comment markers, so
    // assert on the attribute a browser uses to pick the selected option.
    const selected = select.querySelectorAll("option[selected]");
    expect(selected).toHaveLength(1);
    expect((selected[0] as HTMLOptionElement).value).toBe("25");
    expect(selected[0].textContent!.trim()).toBe("25min");
  });

  it("calls number.set_value with the chosen preset", async () => {
    const hass = makeHass(homeshiftStates());
    const card = await renderCard(hass);
    const select = $(card, ".list-select--override") as HTMLSelectElement;
    select.value = "60";
    select.dispatchEvent(new Event("change"));
    expect(hass.callService).toHaveBeenCalledWith("number", "set_value", {
      entity_id: "number.homeshift_override_duration",
      value: 60,
    });
  });
});
