import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { localize } from "../localize/localize";
import "./circular-slider";
import "./homeshift-card-editor";
import { ENTITY_FIELDS, HomeShiftCardConfig } from "../types";
import { formatMinutes, isUsable, numericState } from "../state";
import { formatShortDate, formatTime } from "../time";

class HomeShiftCard extends LitElement {
  // Predefined override duration values in minutes (0 = disabled).
  private static readonly OVERRIDE_PRESETS: { label: string; value: number }[] =
    [
      { label: "--", value: 0 },
      { label: "15min", value: 15 },
      { label: "30min", value: 30 },
      { label: "1h", value: 60 },
      { label: "2h", value: 120 },
      { label: "4h", value: 240 },
      { label: "8h", value: 480 },
      { label: "12h", value: 720 },
    ];

  // Predefined early-switch anticipation values in minutes (0 = disabled).
  private static readonly EARLY_SWITCH_PRESETS: {
    label: string;
    value: number;
  }[] = [
    { label: "--", value: 0 },
    { label: "15min", value: 15 },
    { label: "30min", value: 30 },
    { label: "45min", value: 45 },
    { label: "1h", value: 60 },
    { label: "1h30", value: 90 },
    { label: "2h", value: 120 },
    { label: "3h", value: 180 },
    { label: "4h", value: 240 },
  ];

  @property({ attribute: false }) public hass!: any;
  /** Set by Home Assistant in the card picker and the editor preview. */
  @property({ type: Boolean }) public preview = false;
  @state() private _config!: HomeShiftCardConfig;
  /** Bumped at midnight so the "Today" / "Tomorrow" prefixes roll over. */
  @state() private _day = 0;
  private _midnightTimer?: ReturnType<typeof setTimeout>;

  connectedCallback() {
    super.connectedCallback();
    this._scheduleMidnightRefresh();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearTimeout(this._midnightTimer);
  }

  /**
   * Entity changes already trigger renders; the only time-dependent output
   * is the day prefix of the next-mode time, which changes at midnight.
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
      cover_entity: "cover.homeshift_daily_covers",
      covers_left_open_entity: "binary_sensor.homeshift_covers_left_open",
      show_title: true,
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
      show_title: config.show_title !== false,
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
    if (changedProps.has("_day")) return true;
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

  private onCircularSliderSelect(entityId: string, option: string) {
    this.hass.callService("select", "select_option", {
      entity_id: entityId,
      option,
    });
  }

  private onCoverAction(action: "open_cover" | "close_cover") {
    const entityId = this._config.cover_entity;
    if (!entityId) return;
    this.hass.callService("cover", action, { entity_id: entityId });
  }

  private onPresetSelect(entityId: string, ev: Event) {
    const value = Number((ev.target as HTMLSelectElement).value);
    if (!Number.isFinite(value)) return;
    this.hass.callService("number", "set_value", {
      entity_id: entityId,
      value,
    });
  }

  /**
   * Dropdown for a minutes number entity (override duration, early switch).
   * Highlighted only for a real non-zero value; a value set outside the
   * presets (e.g. 25 min from the entity page) gets its own option so the
   * dropdown shows what is actually active. Disabled while unavailable.
   */
  private _renderPresetSelect(
    entityId: string | undefined,
    presets: { label: string; value: number }[],
    modifierClass: string,
  ) {
    if (!entityId) return nothing;
    const current = numericState(this.getEntityState(entityId));
    const options =
      current !== undefined && !presets.some((p) => p.value === current)
        ? [...presets, { label: formatMinutes(current), value: current }].sort(
            (a, b) => a.value - b.value,
          )
        : presets;
    const active = current !== undefined && current !== 0;
    return html`<select
      .value=${current === undefined ? "" : String(current)}
      class="list-select ${modifierClass} ${active ? "active" : ""}"
      ?disabled=${current === undefined}
      @change=${(e: Event) => this.onPresetSelect(entityId, e)}
    >
      ${options.map(
        ({ label, value }) =>
          html`<option value="${value}" ?selected=${current === value}>
            ${label}
          </option>`,
      )}
    </select>`;
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

  private _renderMain(
    thermo: any,
    day: any,
    heatProtectionActive: boolean,
    coversLeftOpen: string[],
    coverOpenTime?: string,
    coverCloseTime?: string,
  ) {
    // Day mode options from option_map attribute (HomeShift integration ≥ 1.1.0).
    // Falls back to options list if option_map is not yet available.
    const dayModeMap: Record<string, string> = day.attributes?.option_map ?? {};
    const dayEntries: [string, string][] =
      Object.keys(dayModeMap).length > 0
        ? (Object.entries(dayModeMap) as [string, string][])
        : (day.attributes?.options ?? []).map(
            (o: string) => [o, o] as [string, string],
          );

    // Thermostat mode options from option_map attribute (HomeShift integration ≥ 1.1.0).
    // Falls back to attributes.options (first entry = "off" mode, rest = active modes).
    const thermoModeMap: Record<string, string> =
      thermo.attributes?.option_map ?? {};
    const hasThermoMap = Object.keys(thermoModeMap).length > 0;

    // Display value for the "off" key — sent to select.select_option when off is pressed.
    // The internal key for the off mode is always "off" (THERMOSTAT_OFF_KEY in the integration).
    const offDisplay: string = hasThermoMap
      ? (thermoModeMap["off"] ?? thermo.attributes?.options?.[0] ?? "")
      : (thermo.attributes?.options?.[0] ?? "");

    // Options for the circular slider: off mode first, then active modes.
    const thermoSliderOptions: string[] = hasThermoMap
      ? [
          offDisplay,
          ...Object.entries(thermoModeMap)
            .filter(([key]) => key !== "off")
            .map(([, display]) => display),
        ]
      : (thermo.attributes?.options ?? []);

    // Localized labels for the circular slider arc (translated in the card, regardless
    // of the display values configured in the integration).
    // Standard internal keys from HomeShift: heating, cooling, ventilation.
    const THERMOSTAT_ACTIVE_KEYS = ["heating", "cooling", "ventilation"];
    const thermoLocalizedLabels: string[] = hasThermoMap
      ? [
          localize(this.hass, "card.off"),
          ...Object.entries(thermoModeMap)
            .filter(([key]) => key !== "off")
            .map(([key, display]) =>
              localize(this.hass, `thermostat.${key}`, undefined, display),
            ),
        ]
      : [
          localize(this.hass, "card.off"),
          ...THERMOSTAT_ACTIVE_KEYS.map((key) =>
            localize(this.hass, `thermostat.${key}`),
          ),
        ];

    const nextMode = this.getEntityState(this._config.next_mode_entity);
    const nextModeAt = this.getEntityState(this._config.next_mode_at_entity);
    // The next-mode sensors are unknown when no switch is scheduled.
    const hasNextMode = isUsable(nextMode);
    const nextModeAtText = isUsable(nextModeAt)
      ? this._formatAbsoluteTime(nextModeAt.state)
      : "";

    const hasCoverOpenTime = isUsable(coverOpenTime);
    const hasCoverCloseTime = isUsable(coverCloseTime);

    const canControlCover = Boolean(this._config.cover_entity);

    return html`
      <div class="thermo-section">
        ${hasCoverOpenTime || hasCoverCloseTime
          ? html`<div class="cover-times">
              ${hasCoverOpenTime
                ? html`<div
                    class="cover-time-row ${canControlCover ? "actionable" : ""}"
                    title="${canControlCover
                      ? localize(this.hass, "card.cover_open_action")
                      : localize(this.hass, "card.cover_open_time")}"
                    @click=${() => this.onCoverAction("open_cover")}
                  >
                    <ha-icon icon="mdi:roller-shade"></ha-icon>
                    <span>${coverOpenTime}</span>
                  </div>`
                : nothing}
              ${hasCoverCloseTime
                ? html`<div
                    class="cover-time-row ${canControlCover ? "actionable" : ""}"
                    title="${canControlCover
                      ? localize(this.hass, "card.cover_close_action")
                      : localize(this.hass, "card.cover_close_time")}"
                    @click=${() => this.onCoverAction("close_cover")}
                  >
                    <ha-icon icon="mdi:roller-shade-closed"></ha-icon>
                    <span>${coverCloseTime}</span>
                  </div>`
                : nothing}
            </div>`
          : nothing}
        ${heatProtectionActive || coversLeftOpen.length > 0
          ? html`<div class="badge-stack">
              ${heatProtectionActive
                ? html`<div
                    class="badge heat-protection-badge"
                    title="${localize(
                      this.hass,
                      "card.heat_protection_active",
                    )}"
                  >
                    <ha-icon icon="mdi:window-shutter"></ha-icon>
                  </div>`
                : nothing}
              ${coversLeftOpen.length > 0
                ? html`<div
                    class="badge covers-left-open-badge"
                    title="${localize(
                      this.hass,
                      "card.covers_left_open",
                      { covers: coversLeftOpen.join(", ") },
                    )}"
                  >
                    <ha-icon icon="mdi:window-shutter-alert"></ha-icon>
                  </div>`
                : nothing}
            </div>`
          : nothing}
        <homeshift-circular-slider
          .currentValue=${thermo.state}
          .options=${thermoSliderOptions}
          .labels=${thermoLocalizedLabels}
          @option-selected=${(e: any) =>
            this.onCircularSliderSelect(thermo.entity_id, e.detail.option)}
        ></homeshift-circular-slider>

        <div class="next-info-group">
          ${hasNextMode || nextModeAtText
            ? html`<div class="next-info">
                ${hasNextMode
                  ? html`<span class="next-mode-state"
                      >${nextMode!.state}</span
                    >`
                  : nothing}
                ${nextModeAtText
                  ? html`<span class="next-mode-at-state"
                      >${nextModeAtText}</span
                    >`
                  : nothing}
              </div>`
            : nothing}
          ${this._renderPresetSelect(
            this._config.early_switch_entity,
            HomeShiftCard.EARLY_SWITCH_PRESETS,
            "list-select--early",
          )}
        </div>

        <div class="thermo-bottom">
          <div class="bottom-controls">
            <div class="day-section">
              <select
                .value=${day.state}
                @change=${(e: Event) => this.onSelect(day.entity_id, e)}
              >
                ${dayEntries.map(
                  ([_key, display]) =>
                    html`<option
                      value="${display}"
                      ?selected=${display === day.state}
                    >
                      ${display}
                    </option>`,
                )}
              </select>
            </div>

            ${this._renderPresetSelect(
              this._config.override_duration_entity,
              HomeShiftCard.OVERRIDE_PRESETS,
              "list-select--override",
            )}
          </div>
        </div>
      </div>
    `;
  }

  protected render() {
    if (!this.hass || !this._config) return nothing;

    const title = this._config.name ?? localize(this.hass, "card.title");

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
          <ha-card .header=${this._config.show_title ? title : undefined}>
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
        option_map: {
          off: localize(this.hass, "card.off"),
          heating: localize(this.hass, "thermostat.heating"),
          cooling: localize(this.hass, "thermostat.cooling"),
          ventilation: localize(this.hass, "thermostat.ventilation"),
        },
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
      <ha-card .header=${this._config.show_title ? title : undefined}>
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
      padding: 8px;
      position: relative;
      min-height: 240px;
      text-align: center;
    }

    .container {
      display: flex;
      justify-content: center;
      width: 100%;
    }

    /* SLIDER VIEW */
    .thermo-section {
      position: relative;
      width: 100%;
      max-width: 240px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    homeshift-circular-slider {
      width: 100%;
    }

    .thermo-bottom {
      position: absolute;
      bottom: 16px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      z-index: 2;
      width: 90%;
    }

    .bottom-controls {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .day-section {
      flex: 1;
      min-width: 0;
    }

    .day-section select {
      width: 100%;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(5px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* UI ELEMENTS */
    select {
      padding: 8px;
      border-radius: 6px;
      border: 1px solid var(--divider-color, #ccc);
      background: var(--card-background-color);
      color: var(--primary-text-color);
    }

    .list-select {
      flex-shrink: 0;
      align-self: stretch;
      padding: 0 8px;
      border-radius: 6px;
      border: 1px solid var(--divider-color, #ccc);
      background: var(--card-background-color);
      color: var(--primary-text-color);
      font-size: 13px;
      cursor: pointer;
      transition:
        background 0.2s ease,
        border-color 0.2s ease,
        color 0.2s ease;
    }

    .list-select--override.active {
      border-color: var(--primary-color);
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }

    .list-select--early.active {
      border-color: var(--accent-color, var(--primary-color));
      background: var(--accent-color, var(--primary-color));
      color: var(--text-primary-color, #fff);
    }

    .list-select--early {
      padding: 8px;
    }

    .next-info-group {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      z-index: 2;
      text-align: center;
      background: rgba(128, 128, 128, 0.12);
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.1));
      border-radius: 10px;
      padding: 6px 12px;
    }

    .next-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      pointer-events: none;
    }

    .next-mode-state {
      font-size: 13px;
      font-weight: 600;
      color: var(--primary-text-color);
    }

    .next-mode-at-state {
      font-size: 11px;
      color: var(--secondary-text-color);
    }

    .error {
      color: var(--error-color);
      padding: 16px;
    }

    .cover-times {
      position: absolute;
      right: 100%;
      margin-right: 8px;
      top: 4%;
      display: flex;
      flex-direction: column;
      gap: 4px;
      z-index: 2;
      animation: fadeIn 0.3s ease;
    }

    .cover-time-row {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 2px 6px;
      border-radius: 10px;
      background: rgba(128, 128, 128, 0.12);
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.1));
      font-size: 11px;
      color: var(--secondary-text-color);
      white-space: nowrap;
    }

    .cover-time-row.actionable {
      cursor: pointer;
      transition:
        border-color 0.2s ease,
        background 0.2s ease;
    }

    .cover-time-row.actionable:hover {
      border-color: var(--primary-color);
      background: rgba(128, 128, 128, 0.22);
    }

    .cover-time-row ha-icon {
      color: var(--secondary-text-color);
      --mdi-icon-size: 14px;
    }

    /* Badges sit beside the dial and stack downwards, so heat protection
       and covers left open can be raised at the same time without one
       covering the other. */
    .badge-stack {
      position: absolute;
      left: 100%;
      margin-left: 8px;
      top: 4%;
      display: flex;
      flex-direction: column;
      gap: 8px;
      z-index: 3;
    }

    .badge {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      color: var(--text-primary-color, #fff);
      animation: fadeIn 0.3s ease;
    }

    .badge ha-icon {
      color: var(--text-primary-color, #fff);
      --mdi-icon-size: 20px;
    }

    .heat-protection-badge {
      background: var(--error-color, #e7973c);
      pointer-events: none;
    }

    /* Pulses between orange and yellow: a cover left up is something to act
       on tonight, not a steady status. Hoverable, so the tooltip can name
       the covers. */
    .covers-left-open-badge {
      background: var(--warning-color, #ff9800);
      cursor: help;
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

    /* A blinking badge is exactly what reduced-motion asks us not to do;
       the colour alone still reads as a warning. */
    @media (prefers-reduced-motion: reduce) {
      .covers-left-open-badge {
        animation: fadeIn 0.3s ease;
      }
    }
  `;
}

if (!customElements.get("homeshift-card")) {
  customElements.define("homeshift-card", HomeShiftCard);
}

export { HomeShiftCard };
