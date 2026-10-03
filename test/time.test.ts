import { afterEach, describe, expect, it, vi } from "vitest";
import { $, entity, homeshiftStates, makeHass, renderCard } from "./helpers";

afterEach(() => {
  vi.useRealTimers();
  document.body.innerHTML = "";
});

describe("next mode time", () => {
  it("rolls Tomorrow over to Today at midnight, without polling", async () => {
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout", "setInterval", "Date"] });
    vi.setSystemTime(new Date(2026, 0, 10, 23, 58));
    const states = homeshiftStates();
    states["sensor.homeshift_next_mode_at"] = entity(
      "sensor.homeshift_next_mode_at",
      new Date(2026, 0, 11, 8, 0).toISOString(),
    );
    const card = await renderCard(makeHass(states));
    expect($(card, ".next-mode-at-state")?.textContent).toMatch(/^Tomorrow /);
    expect(vi.getTimerCount()).toBe(1);

    await vi.advanceTimersByTimeAsync(3 * 60 * 1000);
    await card.updateComplete;
    expect($(card, ".next-mode-at-state")?.textContent).toMatch(/^Today /);

    card.remove();
    expect(vi.getTimerCount()).toBe(0);
  });
});
