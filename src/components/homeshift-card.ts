import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { localize } from "../localize/localize";
import "./homeshift-card-editor";
import { ENTITY_FIELDS, HomeShiftCardConfig } from "../types";
import { formatMinutes, isUsable, numericState } from "../state";
import { formatShortDate, formatTime } from "../time";

type CoverAction = "open" | "close";

class HomeShiftCard extends LitElement {
  /** Minimum time the "sending" state of a cover button stays visible. */
  static COVER_FEEDBACK_MS = 600;

  // Override duration steps in minutes (0 = disabled).
  private static readonly OVERRIDE_PRESETS = [0, 15, 30, 60, 120, 240, 480, 720];

  // Early-switch anticipation steps in minutes (0 = disabled).
  private static readonly EARLY_SWITCH_PRESETS = [
    0, 15, 30, 45, 60, 90, 120, 180, 240,
  ];

  @property({ attribute: false }) public hass!: any;
  /** Set by Home Assistant in the card picker and the editor preview. */
  @property({ type: Boolean }) public preview = false;
  @state() private _config!: HomeShiftCardConfig;
  @state() private _openSetting: "override" | "early" | null = null;
  /** Cover button whose service call is in flight. */
  @state() private _coverPending?: CoverAction;
  /** Whether the full list behind a "Not closed: N covers" chip is shown. */
  @state() private _coversExpanded = false;
  /** Bumped at midnight so the "Today" / "Tomorrow" prefixes roll over. */
  @state() private _day = 0;
  private _midnightTimer?: ReturnType<typeof setTimeout>;
  private _settingTimeout?: ReturnType<typeof setTimeout>;

  connectedCallback() {
    super.connectedCallback();
    this._scheduleMidnightRefresh();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearTimeout(this._midnightTimer);
    clearTimeout(this._settingTimeout);
  }

  /**
   * Entity changes already trigger renders, and so does opening a setting
   * (its "until {time}" text is computed then); the only output that goes
   * stale on its own is the day prefix of the next-mode time, at midnight.
   */
  private _scheduleMidnightRefresh() {
    clearTimeout(this._midnightTimer);
    const now = new Date();
    const nextMidnight = new Date(now);
    nextMidnight.setHours(24, 0, 1, 0);
    this._midnightTimer = setTimeout(() => {
      this._day++;
      this._scheduleMidnightRefresh();
    }, nextMidnight.getTime() - now.getTime());
  }

  public static getStubConfig(): HomeShiftCardConfig {
    return {
      name: "Thermostat",
      day_mode_entity: "select.homeshift_day_mode",
      thermostat_mode_entity: "select.homeshift_thermostat_mode",
      override_duration_entity: "number.homeshift_override_duration",
      early_switch_entity: "number.homeshift_early_switch",
      next_mode_entity: "sensor.homeshift_next_mode",
      next_mode_at_entity: "sensor.homeshift_next_mode_at",
      heat_protection_entity:
        "binary_sensor.homeshift_cover_heat_active",
      cover_open_time_entity: "sensor.homeshift_cover_open_time",
      cover_close_time_entity: "sensor.homeshift_cover_close_time",
      covers_left_open_entity: "binary_sensor.homeshift_covers_left_open",
    };
  }

  public static getConfigElement() {
    return document.createElement("homeshift-card-editor");
  }

  public setConfig(config: HomeShiftCardConfig): void {
    if (!config) {
      throw new Error("Missing configuration");
    }
    const normalized: HomeShiftCardConfig = {
      name: config.name ?? "Thermostat",
    };
    for (const field of ENTITY_FIELDS) {
      normalized[field.key] = config[field.key] ?? field.default;
    }
    this._config = normalized;
  }

  public getCardSize(): number {
    return 4;
  }

  protected shouldUpdate(changedProps: Map<string, unknown>): boolean {
    if (changedProps.has("_config") || changedProps.has("preview")) return true;
    if (
      changedProps.has("_day") ||
      changedProps.has("_openSetting") ||
      changedProps.has("_coversExpanded") ||
      changedProps.has("_coverPending")
    )
      return true;
    if (changedProps.has("hass")) {
      const oldHass = changedProps.get("hass") as any;
      if (!oldHass) return true;
      const watchedEntities = ENTITY_FIELDS.map(
        (field) => this._config?.[field.key],
      ).filter(Boolean) as string[];
      return watchedEntities.some(
        (id) => oldHass.states[id] !== this.hass.states[id],
      );
    }
    return false;
  }

  /** Colour class for a preset: its key, or the display name it was given.

   * A select exposing option_map hands over stable keys (off, heating, …).
   * Without it, the only thing left is the display value, which is the
   * user's own wording — so known labels are mapped back to a key, and
   * anything else falls through to the neutral colour rather than breaking
   * the class name.
   */
  private _presetClass(key: string, display: string): string {
    const slug = (text: string) =>
      text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .replace(/[^a-z0-9]+/g, "-");
    const known = ["off", "heating", "cooling", "ventilation"];
    if (known.includes(slug(key))) return slug(key);
    const byLabel: Record<string, string> = {
      eteint: "off",
      arret: "off",
      off: "off",
      chauffage: "heating",
      heat: "heating",
      heating: "heating",
      climatisation: "cooling",
      clim: "cooling",
      cool: "cooling",
      cooling: "cooling",
      ventilation: "ventilation",
      ventilateur: "ventilation",
      fan: "ventilation",
    };
    return byLabel[slug(display)] ?? slug(key);
  }

  private getEntityState(entityId?: string) {
    if (!entityId) return undefined;
    return this.hass?.states?.[entityId];
  }

  /** The covers tonight's close had to leave up, by friendly name. */
  private getCoversLeftOpen(): string[] {
    const covers = this.getEntityState(this._config?.covers_left_open_entity)
      ?.attributes?.covers;
    if (!Array.isArray(covers)) return [];
    return covers.map(
      (id: string) =>
        this.hass?.states?.[id]?.attributes?.friendly_name ?? id,
    );
  }

  private onSelect(entityId: string, ev: Event) {
    const target = ev.target as HTMLSelectElement;
    const option = target?.value;
    if (!option) return;
    this.hass.callService("select", "select_option", {
      entity_id: entityId,
      option,
    });
  }

  private onThermostatSelect(entityId: string, option: string) {
    this.hass.callService("select", "select_option", {
      entity_id: entityId,
      option,
    });
  }

  /**
   * Service call behind the "open now" / "close now" buttons, or undefined
   * when the cover time must stay a plain label.
   *
   * Priority: a legacy `cover_entity`, when set, wins (cover.open_cover /
   * close_cover on that cover, kept for existing dashboards); otherwise the
   * integration's buttons (`open_covers_entity` / `close_covers_entity`)
   * are pressed. A button's state is the time of its last press ("unknown"
   * if never pressed), so only a missing or unavailable button disables it.
   */
  private _coverCall(
    action: CoverAction,
  ): { domain: string; service: string; entity_id: string } | undefined {
    const coverId = this._config.cover_entity;
    if (coverId) {
      return isUsable(this.getEntityState(coverId))
        ? { domain: "cover", service: `${action}_cover`, entity_id: coverId }
        : undefined;
    }
    const buttonId =
      action === "open"
        ? this._config.open_covers_entity
        : this._config.close_covers_entity;
    const button = this.getEntityState(buttonId);
    return button && button.state !== "unavailable"
      ? { domain: "button", service: "press", entity_id: buttonId! }
      : undefined;
  }

  private async onCoverAction(action: CoverAction) {
    const call = this._coverCall(action);
    if (!call || this._coverPending) return;
    this._coverPending = action;
    try {
      // Keep the "sending" state visible briefly even when HA answers at
      // once, so the tap gets a feedback.
      await Promise.all([
        this.hass.callService(call.domain, call.service, {
          entity_id: call.entity_id,
        }),
        new Promise((resolve) =>
          setTimeout(resolve, HomeShiftCard.COVER_FEEDBACK_MS),
        ),
      ]);
    } catch (err: any) {
      // Same toast Home Assistant uses for its own failed actions.
      this.dispatchEvent(
        new CustomEvent("hass-notification", {
          detail: {
            message: localize(this.hass, `card.cover_${action}_failed`, {
              error: err?.message ?? String(err),
            }),
          },
          bubbles: true,
          composed: true,
        }),
      );
    } finally {
      this._coverPending = undefined;
    }
  }

  private _renderCoverTime(action: CoverAction, time: string) {
    const icon =
      action === "open" ? "mdi:roller-shade" : "mdi:roller-shade-closed";
    if (!this._coverCall(action)) {
      return html`<span
        class="cover-time"
        title=${localize(this.hass, `card.cover_${action}_time`)}
      >
        <ha-icon icon=${icon}></ha-icon>${time}
      </span>`;
    }
    const pending = this._coverPending === action;
    const label = localize(this.hass, `card.cover_${action}_action`, { time });
    return html`<button
      type="button"
      class="cover-time actionable ${pending ? "pending" : ""}"
      title=${label}
      aria-label=${label}
      aria-busy=${pending ? "true" : "false"}
      ?disabled=${this._coverPending !== undefined}
      @click=${() => this.onCoverAction(action)}
    >
      <ha-icon icon=${icon}></ha-icon>${pending
        ? localize(this.hass, "card.cover_sending")
        : time}
    </button>`;
  }

  private _formatAbsoluteTime(isoString?: string): string {
    if (!isoString) return "";
    const dt = new Date(isoString);
    if (isNaN(dt.getTime())) return "";
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const timeStr = formatTime(dt, this.hass?.locale);
    if (dt.toDateString() === now.toDateString()) {
      return `${localize(this.hass, "card.today")} ${timeStr}`;
    }
    if (dt.toDateString() === tomorrow.toDateString()) {
      return `${localize(this.hass, "card.tomorrow")} ${timeStr}`;
    }
    return `${formatShortDate(dt, this.hass?.locale)} ${timeStr}`;
  }

  private _settingLabel(minutes: number | undefined): string {
    if (minutes === undefined) return localize(this.hass, "card.unavailable");
    if (!minutes) return localize(this.hass, "card.duration_off");
    return formatMinutes(minutes);
  }

  private _clockIn(minutes: number): string {
    return formatTime(
      new Date(Date.now() + minutes * 60000),
      this.hass?.locale,
    );
  }

  private _clockAt(isoString: string, shiftMinutes = 0): string {
    const at = new Date(new Date(isoString).getTime() + shiftMinutes * 60000);
    return formatTime(at, this.hass?.locale);
  }

  /** Open one setting at a time, and fold it back once it is left alone. */
  private _toggleSetting(name: "override" | "early") {
    this._openSetting = this._openSetting === name ? null : name;
    this._armSettingTimeout();
  }

  private _armSettingTimeout() {
    clearTimeout(this._settingTimeout);
    if (!this._openSetting) return;
    this._settingTimeout = setTimeout(() => {
      this._openSetting = null;
    }, 6000);
  }

  private _stepSetting(
    name: "override" | "early",
    presets: number[],
    current: number,
    direction: 1 | -1,
  ) {
    const entityId =
      name === "override"
        ? this._config.override_duration_entity
        : this._config.early_switch_entity;
    if (!entityId) return;
    // The stored value may sit between two presets (25 min set from the
    // entity page): land on the nearest preset in the direction asked for,
    // 30 going up and 15 going down.
    const next =
      direction > 0
        ? presets.find((value) => value > current)
        : [...presets].reverse().find((value) => value < current);
    if (next === undefined) return;
    this._armSettingTimeout();
    this.hass.callService("number", "set_value", {
      entity_id: entityId,
      value: next,
    });
  }

  /**
   * Collapsible minutes setting. `current` is undefined while the number
   * entity is unknown or unavailable: the value then reads "Unavailable",
   * is not highlighted and the setting cannot be opened (no NaN, no
   * stepping from a value that does not exist).
   */
  private _renderSetting(
    name: "override" | "early",
    icon: string,
    label: string,
    effect: string,
    presets: number[],
    current: number | undefined,
  ) {
    const open = current !== undefined && this._openSetting === name;
    return html`<div class="setting ${open ? "open" : ""}">
      <button
        class="setting-head"
        aria-expanded=${open ? "true" : "false"}
        ?disabled=${current === undefined}
        @click=${() => this._toggleSetting(name)}
      >
        <ha-icon icon="${icon}"></ha-icon>
        <span class="setting-label">${label}</span>
        <span class="setting-value ${current ? "set" : ""}"
          >${this._settingLabel(current)}</span
        >
        <ha-icon class="chevron" icon="mdi:chevron-down"></ha-icon>
      </button>
      ${open
        ? html`<div class="setting-body">
            <div class="stepper">
              <button
                aria-label="-"
                ?disabled=${current <= presets[0]}
                @click=${() =>
                  this._stepSetting(name, presets, current, -1)}
              >
                −
              </button>
              <span class="stepper-value">${this._settingLabel(current)}</span>
              <button
                aria-label="+"
                ?disabled=${current >= presets[presets.length - 1]}
                @click=${() => this._stepSetting(name, presets, current, 1)}
              >
                +
              </button>
            </div>
            <p class="setting-effect">${effect}</p>
          </div>`
        : nothing}
    </div>`;
  }

  /**
   * Minutes held by a number entity, as `_renderSetting` expects them, or
   * null when the setting gets no row at all: not configured, or configured
   * but missing outside the card picker preview.
   */
  private _minutes(entityId?: string): number | undefined | null {
    if (!entityId) return null;
    const stateObj = this.getEntityState(entityId);
    if (!stateObj) return this.preview ? 0 : null;
    return numericState(stateObj);
  }

  private _renderMain(
    thermo: any,
    day: any,
    heatProtectionActive: boolean,
    coversLeftOpen: string[],
    coverOpenTime?: string,
    coverCloseTime?: string,
  ) {
    // Day mode options from option_map attribute (HomeShift integration ≥ 1.1.0).
    const dayModeMap: Record<string, string> = day.attributes?.option_map ?? {};
    const dayEntries: [string, string][] =
      Object.keys(dayModeMap).length > 0
        ? (Object.entries(dayModeMap) as [string, string][])
        : (day.attributes?.options ?? []).map(
            (o: string) => [o, o] as [string, string],
          );

    // Thermostat presets, keyed so each can carry its own colour and its own
    // translation regardless of the display values set in the integration.
    const thermoModeMap: Record<string, string> =
      thermo.attributes?.option_map ?? {};
    const thermoEntries: [string, string][] =
      Object.keys(thermoModeMap).length > 0
        ? (Object.entries(thermoModeMap) as [string, string][])
        : (thermo.attributes?.options ?? []).map(
            (o: string) => [o, o] as [string, string],
          );

    const nextMode = this.getEntityState(this._config.next_mode_entity);
    const nextModeAt = this.getEntityState(this._config.next_mode_at_entity);
    const earlySwitch = this._minutes(this._config.early_switch_entity);
    const override = this._minutes(this._config.override_duration_entity);

    // The next-mode sensors are unknown when no switch is scheduled.
    const hasNextMode = isUsable(nextMode);
    const nextModeName = hasNextMode ? nextMode!.state : "";
    const nextModeAtText = isUsable(nextModeAt)
      ? this._formatAbsoluteTime(nextModeAt!.state)
      : "";
    const hasNextAt = nextModeAtText !== "";

    const overrideEffect = override
      ? localize(this.hass, "card.override_effect", {
          duration: this._settingLabel(override),
          time: this._clockIn(override),
        })
      : localize(this.hass, "card.override_none");
    const earlyEffect = !hasNextAt
      ? localize(this.hass, "card.early_no_event")
      : earlySwitch
        ? localize(this.hass, "card.early_effect", {
            mode: nextModeName,
            time: this._clockAt(nextModeAt!.state),
            scheduled: this._clockAt(nextModeAt!.state, earlySwitch),
          })
        : localize(this.hass, "card.early_none", {
            mode: nextModeName,
            time: this._clockAt(nextModeAt!.state),
          });

    const hasCoverOpenTime = isUsable(coverOpenTime);
    const hasCoverCloseTime = isUsable(coverCloseTime);
    const coversFull = localize(this.hass, "card.covers_left_open", {
      covers: coversLeftOpen.join(", "),
    });
    // Past three, the names stop fitting on one line: the chip shows a count
    // and becomes a button that reveals the names (touch has no hover).
    const coversTruncated = coversLeftOpen.length > 3;
    const coversSummary = coversTruncated
      ? localize(this.hass, "card.covers_left_open_count", {
          count: String(coversLeftOpen.length),
        })
      : coversFull;

    const activeKey: string | undefined = thermo.attributes?.current_key;
    const thermoUsable = isUsable(thermo);

    return html`
      <div class="rows">
        <div
          class="presets"
          role="group"
          aria-label=${localize(this.hass, "card.thermostat_mode")}
        >
          ${thermoEntries.map(([key, display]) => {
            const active =
              thermoUsable &&
              (activeKey ? key === activeKey : display === thermo.state);
            return html`<button
              class="preset preset--${this._presetClass(key, display)} ${active
                ? "on"
                : ""}"
              aria-pressed=${active ? "true" : "false"}
              ?disabled=${!thermoUsable}
              @click=${() => this.onThermostatSelect(thermo.entity_id, display)}
            >
              ${localize(this.hass, `thermostat.${key}`, undefined, display)}
            </button>`;
          })}
        </div>

        <div class="row">
          <span class="row-key">${localize(this.hass, "card.day_mode")}</span>
          <select
            aria-label=${localize(this.hass, "card.day_mode")}
            .value=${day.state}
            ?disabled=${!isUsable(day)}
            @change=${(e: Event) => this.onSelect(day.entity_id, e)}
          >
            ${dayEntries.map(
              ([_key, display]) => html`<option
                value="${display}"
                ?selected=${display === day.state}
              >
                ${display}
              </option>`,
            )}
          </select>
        </div>

        ${hasNextMode || hasNextAt
          ? html`<div class="row next-row">
              <span class="row-key">${localize(this.hass, "card.next")}</span>
              <span
                >${nextModeName}${hasNextMode && hasNextAt
                  ? " · "
                  : ""}${nextModeAtText}</span
              >
            </div>`
          : nothing}

        ${override !== null
          ? this._renderSetting(
              "override",
              "mdi:hand-back-left",
              localize(this.hass, "card.override_label"),
              overrideEffect,
              HomeShiftCard.OVERRIDE_PRESETS,
              override,
            )
          : nothing}
        ${earlySwitch !== null
          ? this._renderSetting(
              "early",
              "mdi:clock-fast",
              localize(this.hass, "card.early_label"),
              earlyEffect,
              HomeShiftCard.EARLY_SWITCH_PRESETS,
              earlySwitch,
            )
          : nothing}

        ${hasCoverOpenTime || hasCoverCloseTime
          ? html`<div class="row">
              <span class="row-key">${localize(this.hass, "card.covers")}</span>
              <span class="cover-times">
                ${hasCoverOpenTime
                  ? this._renderCoverTime("open", coverOpenTime!)
                  : nothing}
                ${hasCoverCloseTime
                  ? this._renderCoverTime("close", coverCloseTime!)
                  : nothing}
              </span>
            </div>`
          : nothing}

        ${heatProtectionActive || coversLeftOpen.length > 0
          ? html`<div class="alerts">
              ${heatProtectionActive
                ? html`<span class="chip chip--heat">
                    <ha-icon icon="mdi:window-shutter"></ha-icon>
                    ${localize(this.hass, "card.heat_protection_active")}
                  </span>`
                : nothing}
              ${coversLeftOpen.length > 0 && !coversTruncated
                ? html`<span class="chip chip--covers">
                    <ha-icon icon="mdi:window-shutter-alert"></ha-icon>
                    ${coversSummary}
                  </span>`
                : nothing}
              ${coversTruncated
                ? html`<button
                    type="button"
                    class="chip chip--covers"
                    title=${coversFull}
                    aria-label=${coversFull}
                    aria-expanded=${this._coversExpanded ? "true" : "false"}
                    @click=${() =>
                      (this._coversExpanded = !this._coversExpanded)}
                  >
                    <ha-icon icon="mdi:window-shutter-alert"></ha-icon>
                    ${coversSummary}
                  </button>`
                : nothing}
            </div>
            ${coversTruncated && this._coversExpanded
              ? html`<p class="covers-detail">${coversFull}</p>`
              : nothing}`
          : nothing}
      </div>
    `;
  }

  protected render() {
    if (!this.hass || !this._config) return nothing;

    const dayRaw = this.getEntityState(this._config.day_mode_entity);
    const thermoRaw = this.getEntityState(this._config.thermostat_mode_entity);

    // Stub data is only for the card picker / editor preview: on a real
    // dashboard a missing entity (typo, integration not loaded) must say so
    // rather than show a card that looks functional.
    if (!this.preview) {
      const missing = [
        [this._config.day_mode_entity, dayRaw],
        [this._config.thermostat_mode_entity, thermoRaw],
      ]
        .filter(([, stateObj]) => !stateObj)
        .map(([entityId]) => entityId || "?");
      if (missing.length > 0) {
        return html`
          <ha-card>
            ${missing.map(
              (entity) =>
                html`<div class="error">
                  ${localize(this.hass, "card.entity_not_found", { entity })}
                </div>`,
            )}
          </ha-card>
        `;
      }
    }

    const day = dayRaw ?? {
      entity_id: this._config.day_mode_entity,
      state: localize(this.hass, "preview.work"),
      attributes: {
        option_map: Object.fromEntries(
          ["home", "work", "remote", "away"].map((key) => [
            key,
            localize(this.hass, `preview.${key}`),
          ]),
        ),
      },
    };

    const thermo = thermoRaw ?? {
      entity_id: this._config.thermostat_mode_entity,
      state: localize(this.hass, "thermostat.heating"),
      attributes: {
        option_map: Object.fromEntries(
          ["off", "heating", "cooling", "ventilation"].map((key) => [
            key,
            localize(this.hass, `thermostat.${key}`),
          ]),
        ),
        current_key: "heating",
      },
    };

    const heatProtectionActive =
      this.getEntityState(this._config.heat_protection_entity)?.state === "on";
    const coverOpenTime = this.getEntityState(
      this._config.cover_open_time_entity,
    )?.state;
    const coverCloseTime = this.getEntityState(
      this._config.cover_close_time_entity,
    )?.state;

    return html`
      <ha-card>
        <div class="container">
          ${this._renderMain(
            thermo,
            day,
            heatProtectionActive,
            this.getCoversLeftOpen(),
            coverOpenTime,
            coverCloseTime,
          )}
        </div>
      </ha-card>
    `;
  }

  static styles = css`
    ha-card {
      padding: 12px;
      position: relative;
    }

    .container {
      width: 100%;
    }

    .rows {
      display: flex;
      flex-direction: column;
    }

    /* Thermostat presets — one segmented control, one colour per mode. */
    .presets {
      display: grid;
      grid-auto-flow: column;
      grid-auto-columns: 1fr;
      border: 1px solid var(--divider-color, #ccc);
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 4px;
    }

    .preset {
      border: 0;
      border-left: 1px solid var(--divider-color, #ccc);
      background: transparent;
      color: var(--secondary-text-color, #666);
      font-size: 13px;
      font-family: inherit;
      padding: 8px 4px;
      cursor: pointer;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      transition:
        background 0.2s ease,
        color 0.2s ease;
    }

    .preset:first-child {
      border-left: 0;
    }

    .preset:hover {
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
    }

    .preset:disabled {
      cursor: default;
      opacity: 0.6;
    }

    .preset:focus-visible,
    .setting-head:focus-visible,
    .stepper button:focus-visible,
    .cover-time.actionable:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -2px;
    }

    .preset.on {
      background: var(--secondary-text-color, #666);
      color: var(--text-primary-color, #fff);
    }

    .preset--heating.on {
      background: var(--state-climate-heat-color, #e24b4a);
    }

    .preset--cooling.on {
      background: var(--state-climate-cool-color, #378add);
    }

    .preset--ventilation.on {
      background: var(--state-fan-active-color, #1d9e75);
    }

    .preset--off.on {
      background: var(--divider-color, #9e9e9e);
      color: var(--primary-text-color);
    }

    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 8px 0;
      border-top: 1px solid var(--divider-color, #e0e0e0);
      font-size: 13px;
    }

    .row-key {
      color: var(--secondary-text-color, #666);
    }

    /* Collapsed by default: the value is readable without opening anything. */
    .setting {
      border-top: 1px solid var(--divider-color, #e0e0e0);
    }

    .setting-head {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      padding: 8px 0;
      border: 0;
      background: transparent;
      color: var(--primary-text-color);
      font-size: 13px;
      font-family: inherit;
      text-align: left;
      cursor: pointer;
    }

    .setting-head:disabled {
      cursor: default;
    }

    .setting-head:disabled .chevron {
      visibility: hidden;
    }

    .setting-head ha-icon {
      --mdc-icon-size: 18px;
      color: var(--secondary-text-color, #666);
      flex-shrink: 0;
    }

    .setting-label {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .setting-value {
      color: var(--secondary-text-color, #666);
    }

    .setting-value.set {
      color: var(--primary-text-color);
      font-weight: 500;
    }

    .setting .chevron {
      transition: transform 0.15s ease;
    }

    .setting.open .chevron {
      transform: rotate(180deg);
    }

    .setting-body {
      padding: 0 0 10px 26px;
      animation: fadeIn 0.15s ease;
    }

    .stepper {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .stepper button {
      width: 34px;
      height: 34px;
      border-radius: 8px;
      border: 1px solid var(--divider-color, #ccc);
      background: var(--card-background-color);
      color: var(--primary-text-color);
      font-size: 18px;
      line-height: 1;
      cursor: pointer;
    }

    .stepper button:hover:not(:disabled) {
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
    }

    .stepper button:disabled {
      opacity: 0.4;
      cursor: default;
    }

    .stepper-value {
      min-width: 64px;
      text-align: center;
      font-size: 15px;
      font-weight: 500;
    }

    .setting-effect {
      margin: 8px 0 0;
      font-size: 12px;
      line-height: 1.4;
      color: var(--secondary-text-color, #666);
    }

    .cover-times {
      display: flex;
      gap: 6px;
    }

    .cover-time {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 8px;
      border-radius: 8px;
      border: 1px solid var(--divider-color, #ccc);
      background: var(--card-background-color);
      color: var(--primary-text-color);
      font-size: 13px;
      font-family: inherit;
    }

    .cover-time ha-icon {
      --mdc-icon-size: 16px;
      color: var(--secondary-text-color, #666);
    }

    .cover-time.actionable {
      cursor: pointer;
    }

    .cover-time.actionable:hover:not(:disabled) {
      border-color: var(--primary-color);
    }

    .cover-time.actionable:disabled {
      cursor: progress;
    }

    .cover-time.pending {
      border-color: var(--primary-color);
      color: var(--primary-color);
      animation: cover-pending 0.8s ease-in-out infinite alternate;
    }

    @keyframes cover-pending {
      from {
        opacity: 1;
      }
      to {
        opacity: 0.5;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .cover-time.pending {
        animation: none;
      }
    }

    .error {
      color: var(--error-color);
      padding: 4px;
    }

    /* Alerts only exist while something is wrong; nothing is shown otherwise. */
    .alerts {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      padding-top: 10px;
      border-top: 1px solid var(--divider-color, #e0e0e0);
    }

    .chip {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 8px;
      border-radius: 8px;
      font-size: 12px;
      animation: fadeIn 0.3s ease;
    }

    .chip ha-icon {
      --mdc-icon-size: 16px;
    }

    button.chip {
      border: 0;
      font-family: inherit;
      cursor: pointer;
    }

    button.chip:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }

    .covers-detail {
      margin: 6px 0 0;
      font-size: 12px;
      line-height: 1.4;
      color: var(--primary-text-color);
    }

    .chip--heat {
      background: var(--error-color, #e7973c);
      color: var(--text-primary-color, #fff);
    }

    /* Pulses between orange and yellow: a cover left up is something to act
       on tonight, not a steady status. */
    .chip--covers {
      background: var(--warning-color, #ff9800);
      color: #412402;
      animation:
        fadeIn 0.3s ease,
        covers-left-open-blink 1.2s ease-in-out infinite;
    }

    @keyframes covers-left-open-blink {
      0%,
      100% {
        background: var(--warning-color, #ff9800);
        opacity: 1;
      }
      50% {
        background: #ffd54f;
        opacity: 0.55;
      }
    }

    /* A blinking chip is exactly what reduced-motion asks us not to do;
       the colour alone still reads as a warning. */
    @media (prefers-reduced-motion: reduce) {
      .chip--covers {
        animation: fadeIn 0.3s ease;
      }
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(3px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    select {
      padding: 6px 8px;
      border-radius: 8px;
      border: 1px solid var(--divider-color, #ccc);
      background: var(--card-background-color);
      color: var(--primary-text-color);
      font-size: 13px;
      font-family: inherit;
    }
  `;
}

if (!customElements.get("homeshift-card")) {
  customElements.define("homeshift-card", HomeShiftCard);
}

export { HomeShiftCard };
