import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { localize } from "../localize/localize";
import "./circular-slider";
import "./homeshift-card-editor";
import { ENTITY_FIELDS, HomeShiftCardConfig } from "../types";
import { formatMinutes, isUsable, numericState } from "../state";
import { formatShortDate, formatTime } from "../time";

type CoverAction = "open" | "close";

class HomeShiftCard extends LitElement {
  /** Minimum time the "sending" state of a cover row stays visible. */
  static COVER_FEEDBACK_MS = 600;

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
  /** Cover row whose service call is in flight. */
  @state() private _coverPending?: CoverAction;
  /** Badge whose detail text is expanded (tap / keyboard), if any. */
  @state() private _openBadge?: "heat" | "covers";
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
    if (
      changedProps.has("_day") ||
      changedProps.has("_openBadge") ||
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

  /**
   * Service call behind the "open now" / "close now" rows, or undefined
   * when the row must stay a plain label.
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

  private _renderCoverRow(action: CoverAction, time: string) {
    const icon =
      action === "open" ? "mdi:roller-shade" : "mdi:roller-shade-closed";
    if (!this._coverCall(action)) {
      return html`<div
        class="cover-time-row"
        title=${localize(this.hass, `card.cover_${action}_time`)}
      >
        <ha-icon icon=${icon}></ha-icon>
        <span>${time}</span>
      </div>`;
    }
    const pending = this._coverPending === action;
    const label = localize(this.hass, `card.cover_${action}_action`, { time });
    return html`<button
      type="button"
      class="cover-time-row actionable ${pending ? "pending" : ""}"
      title=${label}
      aria-label=${label}
      aria-busy=${pending ? "true" : "false"}
      ?disabled=${this._coverPending !== undefined}
      @click=${() => this.onCoverAction(action)}
    >
      <ha-icon icon=${icon}></ha-icon>
      <span
        >${pending ? localize(this.hass, "card.cover_sending") : time}</span
      >
    </button>`;
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
    label: string,
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
      aria-label=${label}
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

  /**
   * Status badge beside the dial. A button rather than a hover-only title:
   * tapping it (touch screens have no hover) or pressing Enter shows the
   * detail text inline, and screen readers get it as the accessible name.
   */
  private _renderBadge(
    id: "heat" | "covers",
    modifierClass: string,
    icon: string,
    text: string,
  ) {
    const open = this._openBadge === id;
    return html`<button
        type="button"
        class="badge ${modifierClass}"
        title=${text}
        aria-label=${text}
        aria-expanded=${open ? "true" : "false"}
        @click=${() => (this._openBadge = open ? undefined : id)}
      >
        <ha-icon icon=${icon}></ha-icon>
      </button>
      ${open ? html`<div class="badge-detail">${text}</div>` : nothing}`;
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

    return html`
      <div class="thermo-section">
        ${hasCoverOpenTime || hasCoverCloseTime
          ? html`<div class="cover-times">
              ${hasCoverOpenTime
                ? this._renderCoverRow("open", coverOpenTime!)
                : nothing}
              ${hasCoverCloseTime
                ? this._renderCoverRow("close", coverCloseTime!)
                : nothing}
            </div>`
          : nothing}
        ${heatProtectionActive || coversLeftOpen.length > 0
          ? html`<div class="badge-stack">
              ${heatProtectionActive
                ? this._renderBadge(
                    "heat",
                    "heat-protection-badge",
                    "mdi:window-shutter",
                    localize(this.hass, "card.heat_protection_active"),
                  )
                : nothing}
              ${coversLeftOpen.length > 0
                ? this._renderBadge(
                    "covers",
                    "covers-left-open-badge",
                    "mdi:window-shutter-alert",
                    localize(this.hass, "card.covers_left_open", {
                      covers: coversLeftOpen.join(", "),
                    }),
                  )
                : nothing}
            </div>`
          : nothing}
        <homeshift-circular-slider
          .label=${localize(this.hass, "card.thermostat_mode")}
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
            localize(this.hass, "card.early_switch"),
          )}
        </div>

        <div class="thermo-bottom">
          <div class="bottom-controls">
            <div class="day-section">
              <select
                aria-label=${localize(this.hass, "card.day_mode")}
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
              localize(this.hass, "card.override_duration"),
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

    button.cover-time-row {
      font: inherit;
      font-size: 11px;
    }

    .cover-time-row.actionable {
      cursor: pointer;
      transition:
        border-color 0.2s ease,
        background 0.2s ease,
        opacity 0.2s ease;
    }

    .cover-time-row.actionable:hover:not(:disabled) {
      border-color: var(--primary-color);
      background: rgba(128, 128, 128, 0.22);
    }

    .cover-time-row.actionable:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 1px;
    }

    .cover-time-row.actionable:disabled {
      cursor: progress;
    }

    .cover-time-row.pending {
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
      .cover-time-row.pending {
        animation: none;
      }
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
      padding: 0;
      border: none;
      border-radius: 50%;
      color: var(--text-primary-color, #fff);
      cursor: pointer;
      font: inherit;
      animation: fadeIn 0.3s ease;
    }

    .badge:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }

    .badge-detail {
      max-width: 140px;
      padding: 4px 8px;
      border-radius: 8px;
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.1));
      color: var(--primary-text-color);
      font-size: 11px;
      text-align: left;
      animation: fadeIn 0.2s ease;
    }

    .badge ha-icon {
      color: var(--text-primary-color, #fff);
      --mdi-icon-size: 20px;
    }

    .heat-protection-badge {
      background: var(--error-color, #e7973c);
    }

    /* Pulses between orange and yellow: a cover left up is something to act
       on tonight, not a steady status. Tapping it names the covers. */
    .covers-left-open-badge {
      background: var(--warning-color, #ff9800);
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
