import { LitElement, html, css, nothing } from "lit";
import { property } from "lit/decorators.js";
import { localize } from "../localize/localize";
import {
  DAY_MINUTES,
  Schedule,
  Segment,
  SlotValue,
  daySegments,
  formatMinutes,
  scheduleEntities,
  schedulesFor,
  segmentColors,
} from "./timeline";

const KIND_ICONS: Record<string, string> = {
  heat: "mdi:radiator",
  cool: "mdi:snowflake",
  // A preset alone does not say heating or cooling: heating, as for the exclusion.
  preset: "mdi:radiator",
  on: "mdi:toggle-switch-outline",
  off: "mdi:toggle-switch-off-outline",
  other: "mdi:calendar-clock",
};

/** Schedules sharing a heading: those driving the same room's thermostat. */
interface Room {
  name: string;
  /** Entity the schedules drive, when they drive a single one. */
  entity?: string;
  schedules: Schedule[];
}

/** Whether a timeline heats or cools, for the heating / cooling exclusion. */
function climateSide(kind: string): "heat" | "cool" | undefined {
  if (kind === "cool") return "cool";
  if (kind === "heat" || kind === "preset") return "heat";
  return undefined;
}

/** Order of a room's timelines: heating first, then cooling. */
const KIND_ORDER = ["heat", "preset", "cool", "on", "off", "other"];

/**
 * Kind of a timeline, for its icon: cooling wins, then heating, then
 * presets; turning off alone does not tell what the schedule is for.
 */
function rowKind(segments: Segment[]): string {
  const kinds = new Set(segments.map((s) => s.value.kind));
  return (
    ["cool", "heat", "preset", "on", "off"].find((kind) => kinds.has(kind as any)) ??
    "other"
  );
}

/**
 * 24 h timelines of the schedules tagged with one day mode, grouped by
 * room, each with the switch that enables it. The schedules are handed
 * over by the card, which fetches them once for the whole dashboard view.
 */
export class HomeShiftScheduleTimeline extends LitElement {
  @property({ attribute: false }) public hass!: any;
  @property({ attribute: false }) public schedules: Schedule[] = [];
  /** Scheduler tag of the schedules shown: the day mode. */
  @property() public tag = "";
  /** Only the schedules acting on these entities, when there are some. */
  @property({ attribute: false }) public entities: string[] = [];
  private _clock?: ReturnType<typeof setInterval>;

  connectedCallback() {
    super.connectedCallback();
    // Moves the "now" marker along the timelines.
    this._clock = setInterval(() => this.requestUpdate(), 60_000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this._clock);
  }

  protected render() {
    if (!this.hass) return nothing;
    const schedules = schedulesFor(this.schedules, this.tag, this.entities);
    if (!schedules.length) {
      return html`<div class="empty">
        ${localize(this.hass, "schedule.empty", { mode: this.tag })}
      </div>`;
    }
    const now = new Date();
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    return html`
      ${this._rooms(schedules).map((room) => this._renderRoom(room, nowMinutes))}
      <div class="axis" aria-hidden="true">
        ${[0, 6, 12, 18, 24].map(
          (h) => html`<span style="left: ${(h / 24) * 100}%">${h}h</span>`,
        )}
      </div>
    `;
  }

  /**
   * Schedules grouped by room: those driving the same single entity (e.g.
   * the heating and the cooling of the living room) share a heading; any
   * other schedule is a room of its own, named after itself.
   */
  private _rooms(schedules: Schedule[]): Room[] {
    const rooms = new Map<string, Room>();
    for (const schedule of schedules) {
      const entities = scheduleEntities(schedule, true);
      const entity = entities.length === 1 ? entities[0] : undefined;
      const key = entity ?? schedule.entity_id;
      if (!rooms.has(key)) {
        const name = entity
          ? (this.hass.states[entity]?.attributes?.friendly_name ?? entity)
          : schedule.name;
        rooms.set(key, { name, entity, schedules: [] });
      }
      rooms.get(key)!.schedules.push(schedule);
    }
    for (const room of rooms.values()) {
      room.schedules.sort(
        (a, b) =>
          KIND_ORDER.indexOf(rowKind(daySegments(a))) -
          KIND_ORDER.indexOf(rowKind(daySegments(b))),
      );
    }
    return [...rooms.values()];
  }

  private _renderRoom(room: Room, nowMinutes: number) {
    const measured = room.entity?.startsWith("climate.")
      ? this.hass.states[room.entity]?.attributes?.current_temperature
      : undefined;
    const allDisabled = room.schedules.every((s) => !this._enabled(s));
    return html`
      <div class="room">
        <div class="room-head">
          <span class="room-name ${allDisabled ? "disabled" : ""}">${room.name}</span>
          ${typeof measured === "number"
            ? html`<span class="measured">${this._number(measured)}°</span>`
            : nothing}
        </div>
        ${room.schedules.map((s) => this._renderRow(s, room, nowMinutes))}
      </div>
    `;
  }

  private _enabled(schedule: Schedule): boolean {
    const state = this.hass.states[schedule.entity_id];
    return state ? state.state !== "off" : schedule.enabled;
  }

  /** One schedule: its kind, its timeline and its switch. */
  private _renderRow(schedule: Schedule, room: Room, nowMinutes: number) {
    const segments = daySegments(schedule);
    const kind = rowKind(segments);
    const enabled = this._enabled(schedule);

    return html`
      <div class="row ${enabled ? "" : "disabled"}" title=${schedule.name}>
        <ha-icon class="kind ${kind}" icon=${KIND_ICONS[kind]}></ha-icon>
        <div class="bar">
          ${segments.map((s) => this._renderSegment(s))}
          <div class="now" style="left: ${(nowMinutes / DAY_MINUTES) * 100}%"></div>
        </div>
        <button
          class="switch ${enabled ? "on" : ""}"
          role="switch"
          aria-checked=${enabled ? "true" : "false"}
          aria-label=${schedule.name}
          @click=${() => this._toggle(schedule, room, enabled)}
        ></button>
      </div>
    `;
  }

  private _renderSegment(segment: Segment) {
    const { background, color } = segmentColors(segment.value);
    const width = ((segment.end - segment.start) / DAY_MINUTES) * 100;
    const range = `${formatMinutes(segment.start)} – ${formatMinutes(segment.end)}`;
    const label = this._label(segment.value);
    // The card is narrow: a label is written only where it fits, about 2 %
    // of the bar per character ("18°" fits in 10 %, "Confort" needs 16 %).
    const fits = width >= Math.max(10, label.length * 2.2);
    return html`<div
      class="segment"
      style="left: ${(segment.start / DAY_MINUTES) * 100}%; width: ${width}%; background-color: ${background}; color: ${color}"
      title="${range} · ${label}"
    >
      ${fits ? label : nothing}
    </div>`;
  }

  /** A number in the user's format (20.5 / 20,5). */
  private _number(value: number): string {
    const language = this.hass.locale?.language ?? this.hass.language ?? "en";
    return value.toLocaleString(language, { maximumFractionDigits: 1 });
  }

  /** Text of a value, with the temperature in the user's number format (20.5° / 20,5°). */
  private _label(value: SlotValue): string {
    const stateObj = value.entity ? this.hass.states[value.entity] : undefined;
    if (value.temperature != null) return `${this._number(value.temperature)}°`;
    // Presets and HVAC modes as Home Assistant names them ("Confort", "Éteint"...).
    if (value.preset != null) {
      return stateObj && this.hass.formatEntityAttributeValue
        ? this.hass.formatEntityAttributeValue(stateObj, "preset_mode", value.preset)
        : value.preset;
    }
    if (value.hvacMode != null) {
      return stateObj && this.hass.formatEntityState
        ? this.hass.formatEntityState(stateObj, value.hvacMode)
        : value.hvacMode;
    }
    if (value.kind === "on" || value.kind === "off") {
      return localize(this.hass, `schedule.${value.kind}`);
    }
    return value.label;
  }

  /**
   * Turns a schedule on or off. Heating and cooling the same room at once
   * makes no sense: turning one on first turns off the room's enabled
   * schedules of the other side.
   */
  private async _toggle(schedule: Schedule, room: Room, enabled: boolean) {
    if (enabled) {
      await this.hass.callService("switch", "turn_off", {
        entity_id: schedule.entity_id,
      });
      return;
    }
    const side = climateSide(rowKind(daySegments(schedule)));
    const opposite = side
      ? room.schedules.filter((s) => {
          const other = climateSide(rowKind(daySegments(s)));
          return s !== schedule && other && other !== side && this._enabled(s);
        })
      : [];
    if (opposite.length) {
      await this.hass.callService("switch", "turn_off", {
        entity_id: opposite.map((s) => s.entity_id),
      });
    }
    await this.hass.callService("switch", "turn_on", {
      entity_id: schedule.entity_id,
    });
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .room {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .room-head {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
    }
    .room-name {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: 500;
    }
    .room-name.disabled {
      color: var(--secondary-text-color);
    }
    .row {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .row .bar {
      flex: 1;
    }
    /* A disabled schedule keeps its colors, hatched, so it stays readable. */
    .row.disabled .segment {
      background-image: repeating-linear-gradient(
        135deg,
        rgba(0, 0, 0, 0.3) 0 4px,
        transparent 4px 8px
      );
    }
    .kind {
      flex: none;
      --mdc-icon-size: 18px;
      color: var(--secondary-text-color);
    }
    .kind.heat,
    .kind.preset {
      color: #ef9f27;
    }
    .kind.cool {
      color: #378add;
    }
    .measured {
      flex: none;
      padding: 1px 8px;
      border-radius: 10px;
      background: color-mix(in srgb, var(--primary-text-color) 10%, transparent);
      font-size: 12px;
    }
    .switch {
      position: relative;
      flex: none;
      width: 34px;
      height: 18px;
      border: none;
      border-radius: 9px;
      background: var(--disabled-color, #888);
      cursor: pointer;
      padding: 0;
    }
    .switch::after {
      content: "";
      position: absolute;
      top: 3px;
      left: 3px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #fff;
      transition: left 0.15s;
    }
    .switch.on {
      background: var(--switch-checked-track-color, var(--primary-color));
    }
    .switch.on::after {
      left: 19px;
    }
    .switch:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
    .bar {
      position: relative;
      height: 20px;
      border-radius: 6px;
      background: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
      overflow: hidden;
    }
    .segment {
      position: absolute;
      top: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 600;
      overflow: hidden;
      white-space: nowrap;
      box-shadow: inset -1px 0 0 var(--ha-card-background, var(--card-background-color));
    }
    .now {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 2px;
      margin-left: -1px;
      background: var(--primary-text-color);
    }
    .axis {
      position: relative;
      height: 14px;
      /* Under the bars only: past the kind icon (18 + 8 px) and before the switch (34 + 8 px). */
      margin: -4px 42px 0 26px;
      font-size: 11px;
      color: var(--secondary-text-color);
    }
    .axis span {
      position: absolute;
      transform: translateX(-50%);
    }
    .axis span:first-child {
      transform: none;
    }
    .axis span:last-child {
      transform: translateX(-100%);
    }
    .empty {
      padding: 16px 0;
      text-align: center;
      font-size: 13px;
      color: var(--secondary-text-color);
    }
  `;
}

if (!customElements.get("homeshift-schedule-timeline")) {
  customElements.define("homeshift-schedule-timeline", HomeShiftScheduleTimeline);
}
