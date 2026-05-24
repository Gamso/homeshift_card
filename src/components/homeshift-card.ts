import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { localize } from "../localize/localize";
import "./circular-slider";
import "./homeshift-card-editor";

interface HomeShiftCardConfig {
  name?: string;
  day_mode_entity?: string;
  thermostat_mode_entity?: string;
  override_duration_entity?: string;
  early_switch_entity?: string;
  next_mode_entity?: string;
  next_mode_at_entity?: string;
  heat_protection_entity?: string;
  show_title?: boolean;
}

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
  @state() private _config!: HomeShiftCardConfig;
  @state() private _tick = 0;
  private _refreshInterval?: ReturnType<typeof setInterval>;

  connectedCallback() {
    super.connectedCallback();
    this._refreshInterval = setInterval(() => {
      this._tick++;
    }, 30000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this._refreshInterval);
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
        "binary_sensor.homeshift_is_heat_protection_active",
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
    this._config = {
      name: config.name ?? "Thermostat",
      day_mode_entity: config.day_mode_entity ?? "select.homeshift_day_mode",
      thermostat_mode_entity:
        config.thermostat_mode_entity ?? "select.homeshift_thermostat_mode",
      override_duration_entity:
        config.override_duration_entity ?? "number.homeshift_override_duration",
      early_switch_entity:
        config.early_switch_entity ?? "number.homeshift_early_switch",
      next_mode_entity: config.next_mode_entity ?? "sensor.homeshift_next_mode",
      next_mode_at_entity:
        config.next_mode_at_entity ?? "sensor.homeshift_next_mode_at",
      heat_protection_entity:
        config.heat_protection_entity ??
        "binary_sensor.homeshift_is_heat_protection_active",
      show_title: config.show_title !== false,
    };
  }

  public getCardSize(): number {
    return 4;
  }

  protected shouldUpdate(changedProps: Map<string, unknown>): boolean {
    if (changedProps.has("_config")) return true;
    if (changedProps.has("_tick")) return true;
    if (changedProps.has("hass")) {
      const oldHass = changedProps.get("hass") as any;
      if (!oldHass) return true;
      const watchedEntities = [
        this._config?.day_mode_entity,
        this._config?.thermostat_mode_entity,
        this._config?.override_duration_entity,
        this._config?.early_switch_entity,
        this._config?.next_mode_entity,
        this._config?.next_mode_at_entity,
        this._config?.heat_protection_entity,
      ].filter(Boolean) as string[];
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

  private onOffButtonClick(entityId: string, offOption: string) {
    if (!offOption) return;
    this.hass.callService("select", "select_option", {
      entity_id: entityId,
      option: offOption,
    });
  }

  private onOverrideDurationSelect(ev: Event) {
    const entityId = this._config.override_duration_entity;
    if (!entityId) return;
    const value = Number((ev.target as HTMLSelectElement).value);
    this.hass.callService("number", "set_value", {
      entity_id: entityId,
      value,
    });
  }

  private onEarlySwitchSelect(ev: Event) {
    const entityId = this._config.early_switch_entity;
    if (!entityId) return;
    const value = Number((ev.target as HTMLSelectElement).value);
    this.hass.callService("number", "set_value", {
      entity_id: entityId,
      value,
    });
  }

  private _formatRelativeTime(isoString?: string): string {
    if (!isoString) return "";
    const dt = new Date(isoString);
    if (isNaN(dt.getTime())) return isoString;
    const diffMs = dt.getTime() - Date.now();
    const diffMin = Math.round(diffMs / 60000);
    if (diffMin <= 0) return localize(this.hass, "card.past") || "passé";
    if (diffMin < 60)
      return `${localize(this.hass, "card.in") || "dans"} ${diffMin} min`;
    const h = Math.floor(diffMin / 60);
    const m = diffMin % 60;
    return `${localize(this.hass, "card.in") || "dans"} ${h}h${m > 0 ? m.toString().padStart(2, "0") : ""}`;
  }

  private _formatAbsoluteTime(isoString?: string): string {
    if (!isoString) return "";
    const dt = new Date(isoString);
    if (isNaN(dt.getTime())) return isoString;
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const timeStr = dt.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    if (dt.toDateString() === now.toDateString()) {
      return `${localize(this.hass, "card.today") || "Auj."} ${timeStr}`;
    }
    if (dt.toDateString() === tomorrow.toDateString()) {
      return `${localize(this.hass, "card.tomorrow") || "Dem."} ${timeStr}`;
    }
    return `${dt.toLocaleDateString([], { month: "short", day: "numeric" })} ${timeStr}`;
  }

  private _renderMain(thermo: any, day: any, heatProtectionActive: boolean) {
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
          localize(this.hass, "card.off") || offDisplay,
          ...Object.keys(thermoModeMap)
            .filter((key) => key !== "off")
            .map((key) => localize(this.hass, `thermostat.${key}`) || key),
        ]
      : [
          localize(this.hass, "card.off") ||
            (thermo.attributes?.options?.[0] ?? ""),
          ...THERMOSTAT_ACTIVE_KEYS.map(
            (key) => localize(this.hass, `thermostat.${key}`) || key,
          ),
        ];

    const nextMode = this.getEntityState(this._config.next_mode_entity);
    const nextModeAt = this.getEntityState(this._config.next_mode_at_entity);
    const currentEarlySwitch = Number(
      this.getEntityState(this._config.early_switch_entity)?.state ?? 0,
    );

    const hasNextMode =
      nextMode?.state && nextMode.state !== "unknown" && nextMode.state !== "";

    return html`
      <div class="thermo-section">
        ${heatProtectionActive
          ? html`<div
              class="heat-protection-badge"
              title="${localize(this.hass, "card.heat_protection_active") ||
              "Heat protection active"}"
            >
              <ha-icon icon="mdi:window-shutter"></ha-icon>
            </div>`
          : nothing}
        <homeshift-circular-slider
          .hass=${this.hass}
          .entityId=${thermo.entity_id}
          .currentValue=${thermo.state}
          .options=${thermoSliderOptions}
          .labels=${thermoLocalizedLabels}
          @option-selected=${(e: any) =>
            this.onCircularSliderSelect(thermo.entity_id, e.detail.option)}
        ></homeshift-circular-slider>

        <div class="next-info-group">
          ${hasNextMode || nextModeAt?.state
            ? html`<div class="next-info">
                ${hasNextMode
                  ? html`<span class="next-mode-state"
                      >${nextMode!.state}</span
                    >`
                  : nothing}
                ${nextModeAt?.state
                  ? html`<span class="next-mode-at-state"
                      >${this._formatAbsoluteTime(nextModeAt.state)}</span
                    >`
                  : nothing}
              </div>`
            : nothing}
          ${this._config.early_switch_entity
            ? html`<select
                .value=${String(currentEarlySwitch)}
                class="list-select list-select--early ${currentEarlySwitch !== 0
                  ? "active"
                  : ""}"
                @change=${this.onEarlySwitchSelect}
              >
                ${HomeShiftCard.EARLY_SWITCH_PRESETS.map(
                  ({ label, value }) =>
                    html`<option
                      value="${value}"
                      ?selected=${currentEarlySwitch === value}
                    >
                      ${label}
                    </option>`,
                )}
              </select>`
            : nothing}
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

            ${(() => {
              const currentOverride = Number(
                this.getEntityState(this._config.override_duration_entity)
                  ?.state ?? 0,
              );
              return html`<select
                .value=${String(currentOverride)}
                class="list-select list-select--override ${currentOverride !== 0
                  ? "active"
                  : ""}"
                @change=${this.onOverrideDurationSelect}
              >
                ${HomeShiftCard.OVERRIDE_PRESETS.map(({ label, value }) => {
                  const currentVal = currentOverride;
                  return html`<option
                    value="${value}"
                    ?selected=${currentVal === value}
                  >
                    ${label}
                  </option>`;
                })}
              </select>`;
            })()}
          </div>
        </div>
      </div>
    `;
  }

  protected render() {
    if (!this.hass || !this._config) return nothing;

    const title = this._config.name ?? localize(this.hass, "card.title");

    // Use real entities when available, fall back to stub data for the picker preview
    const dayRaw = this.getEntityState(this._config.day_mode_entity);
    const thermoRaw = this.getEntityState(this._config.thermostat_mode_entity);

    const day = dayRaw ?? {
      entity_id: this._config.day_mode_entity ?? "select.homeshift_day_mode",
      state: localize(this.hass, "preview.day_mode_state") || "Travail",
      attributes: {
        options: ["Maison", "Travail", "Télétravail", "Absence"],
        option_map: {
          home: "Maison",
          work: "Travail",
          remote: "Télétravail",
          away: "Absence",
        },
      },
    };

    const thermo = thermoRaw ?? {
      entity_id:
        this._config.thermostat_mode_entity ??
        "select.homeshift_thermostat_mode",
      state: localize(this.hass, "preview.thermostat_state") || "Chauffage",
      attributes: {
        options: ["Eteint", "Chauffage", "Climatisation", "Ventilation"],
        option_map: {
          off: "Eteint",
          heating: "Chauffage",
          cooling: "Climatisation",
          ventilation: "Ventilation",
        },
      },
    };

    const heatProtectionActive =
      this.getEntityState(this._config.heat_protection_entity)?.state === "on";

    return html`
      <ha-card .header=${this._config.show_title ? title : undefined}>
        <div class="container">
          ${this._renderMain(thermo, day, heatProtectionActive)}
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

    .off-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
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

    .center-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 1px solid var(--divider-color, #ccc);
      background: var(--card-background-color, #ffffff);
      cursor: pointer;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      transition:
        background 0.2s,
        border-color 0.2s;
    }

    .center-button ha-icon {
      color: var(--secondary-text-color, #666);
    }

    .center-button.active {
      background: var(--primary-color);
      border-color: var(--primary-color);
    }

    .center-button.active ha-icon {
      color: var(--text-primary-color, #fff);
    }

    hui-card {
      --ha-card-box-shadow: none;
      --ha-card-border-width: 0;
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

    .heat-protection-badge {
      position: absolute;
      right: -4px;
      top: 4%;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: var(--error-color, #e7973c);
      color: var(--text-primary-color, #fff);
      z-index: 3;
      pointer-events: none;
      animation: fadeIn 0.3s ease;
    }

    .heat-protection-badge ha-icon {
      color: var(--text-primary-color, #fff);
      --mdi-icon-size: 20px;
    }
  `;
}

if (!customElements.get("homeshift-card")) {
  customElements.define("homeshift-card", HomeShiftCard);
}

export { HomeShiftCard };
