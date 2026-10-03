import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { localize } from "../localize/localize";
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
  cover_open_time_entity?: string;
  cover_close_time_entity?: string;
  cover_entity?: string;
  covers_left_open_entity?: string;
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
  @state() private _openSetting: "override" | "early" | null = null;
  private _refreshInterval?: ReturnType<typeof setInterval>;
  private _settingTimeout?: ReturnType<typeof setTimeout>;

  connectedCallback() {
    super.connectedCallback();
    this._refreshInterval = setInterval(() => {
      this._tick++;
    }, 30000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this._refreshInterval);
    clearTimeout(this._settingTimeout);
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
        "binary_sensor.homeshift_cover_heat_active",
      cover_open_time_entity:
        config.cover_open_time_entity ?? "sensor.homeshift_cover_open_time",
      cover_close_time_entity:
        config.cover_close_time_entity ?? "sensor.homeshift_cover_close_time",
      cover_entity: config.cover_entity ?? "",
      covers_left_open_entity:
        config.covers_left_open_entity ??
        "binary_sensor.homeshift_covers_left_open",
    };
  }

  public getCardSize(): number {
    return 4;
  }

  protected shouldUpdate(changedProps: Map<string, unknown>): boolean {
    if (changedProps.has("_config")) return true;
    if (changedProps.has("_tick")) return true;
    if (changedProps.has("_openSetting")) return true;
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
        this._config?.cover_open_time_entity,
        this._config?.cover_close_time_entity,
        this._config?.cover_entity,
        this._config?.covers_left_open_entity,
      ].filter(Boolean) as string[];
      return watchedEntities.some(
        (id) => oldHass.states[id] !== this.hass.states[id],
      );
    }
    return false;
  }

  /** localize() echoes the key when a string is missing — treat that as absent. */
  private t(key: string, fallback: string, params?: Record<string, string>) {
    const text = localize(this.hass, key, params);
    return !text || text === key ? fallback : text;
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

  private onOffButtonClick(entityId: string, offOption: string) {
    if (!offOption) return;
    this.hass.callService("select", "select_option", {
      entity_id: entityId,
      option: offOption,
    });
  }

  private onCoverAction(action: "open_cover" | "close_cover") {
    const entityId = this._config.cover_entity;
    if (!entityId) return;
    this.hass.callService("cover", action, { entity_id: entityId });
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

  private _settingLabel(minutes: number): string {
    if (!minutes) return localize(this.hass, "card.duration_off");
    if (minutes < 60) return `${minutes} min`;
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return m ? `${h}h${String(m).padStart(2, "0")}` : `${h}h`;
  }

  private _clockIn(minutes: number): string {
    const at = new Date(Date.now() + minutes * 60000);
    return at.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  private _clockAt(isoString: string, shiftMinutes = 0): string {
    const at = new Date(new Date(isoString).getTime() + shiftMinutes * 60000);
    if (isNaN(at.getTime())) return isoString;
    return at.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
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
    presets: { value: number }[],
    current: number,
    direction: number,
  ) {
    const entityId =
      name === "override"
        ? this._config.override_duration_entity
        : this._config.early_switch_entity;
    if (!entityId) return;
    const values = presets.map((preset) => preset.value);
    // The stored value may sit between two presets; land on the neighbour in
    // the direction asked for rather than on a preset index that never matches.
    const index = values.findIndex((value) => value >= current);
    const from = index === -1 ? values.length - 1 : index;
    const next = Math.min(values.length - 1, Math.max(0, from + direction));
    this._armSettingTimeout();
    this.hass.callService("number", "set_value", {
      entity_id: entityId,
      value: values[next],
    });
  }

  private _renderSetting(
    name: "override" | "early",
    icon: string,
    label: string,
    effect: string,
    presets: { value: number }[],
    current: number,
  ) {
    const open = this._openSetting === name;
    return html`<div class="setting ${open ? "open" : ""}">
      <button
        class="setting-head"
        aria-expanded=${open ? "true" : "false"}
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
                ?disabled=${current <= presets[0].value}
                @click=${() =>
                  this._stepSetting(name, presets, current, -1)}
              >
                −
              </button>
              <span class="stepper-value">${this._settingLabel(current)}</span>
              <button
                aria-label="+"
                ?disabled=${current >= presets[presets.length - 1].value}
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
    const earlySwitch = Number(
      this.getEntityState(this._config.early_switch_entity)?.state ?? 0,
    );
    const override = Number(
      this.getEntityState(this._config.override_duration_entity)?.state ?? 0,
    );

    const hasNextMode =
      nextMode?.state && nextMode.state !== "unknown" && nextMode.state !== "";
    const nextModeName = hasNextMode ? nextMode!.state : "";
    const hasNextAt =
      nextModeAt?.state &&
      nextModeAt.state !== "unknown" &&
      nextModeAt.state !== "unavailable";

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

    const hasCoverOpenTime =
      coverOpenTime && coverOpenTime !== "unknown" && coverOpenTime !== "unavailable";
    const hasCoverCloseTime =
      coverCloseTime && coverCloseTime !== "unknown" && coverCloseTime !== "unavailable";
    const canControlCover = Boolean(this._config.cover_entity);
    // Past three, the names stop fitting on one line; the tooltip keeps them.
    const coversSummary =
      coversLeftOpen.length > 3
        ? localize(this.hass, "card.covers_left_open_count", {
            count: String(coversLeftOpen.length),
          })
        : localize(this.hass, "card.covers_left_open", {
            covers: coversLeftOpen.join(", "),
          });

    const activeKey: string | undefined = thermo.attributes?.current_key;

    return html`
      <div class="rows">
        <div class="presets" role="group">
          ${thermoEntries.map(([key, display]) => {
            const active = activeKey ? key === activeKey : display === thermo.state;
            return html`<button
              class="preset preset--${this._presetClass(key, display)} ${active
                ? "on"
                : ""}"
              @click=${() => this.onThermostatSelect(thermo.entity_id, display)}
            >
              ${this.t(`thermostat.${key}`, display)}
            </button>`;
          })}
        </div>

        <div class="row">
          <span class="row-key">${localize(this.hass, "card.day_mode")}</span>
          <select
            .value=${day.state}
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
          ? html`<div class="row">
              <span class="row-key">${localize(this.hass, "card.next")}</span>
              <span
                >${nextModeName}${hasNextMode && hasNextAt ? " · " : ""}${hasNextAt
                  ? this._formatAbsoluteTime(nextModeAt!.state)
                  : ""}</span
              >
            </div>`
          : nothing}

        ${this._config.override_duration_entity
          ? this._renderSetting(
              "override",
              "mdi:hand-back-left",
              localize(this.hass, "card.override_label"),
              overrideEffect,
              HomeShiftCard.OVERRIDE_PRESETS,
              override,
            )
          : nothing}
        ${this._config.early_switch_entity
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
                  ? html`<button
                      class="cover-time ${canControlCover ? "actionable" : ""}"
                      title="${canControlCover
                        ? localize(this.hass, "card.cover_open_action")
                        : localize(this.hass, "card.cover_open_time")}"
                      ?disabled=${!canControlCover}
                      @click=${() => this.onCoverAction("open_cover")}
                    >
                      <ha-icon icon="mdi:roller-shade"></ha-icon>${coverOpenTime}
                    </button>`
                  : nothing}
                ${hasCoverCloseTime
                  ? html`<button
                      class="cover-time ${canControlCover ? "actionable" : ""}"
                      title="${canControlCover
                        ? localize(this.hass, "card.cover_close_action")
                        : localize(this.hass, "card.cover_close_time")}"
                      ?disabled=${!canControlCover}
                      @click=${() => this.onCoverAction("close_cover")}
                    >
                      <ha-icon icon="mdi:roller-shade-closed"></ha-icon
                      >${coverCloseTime}
                    </button>`
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
              ${coversLeftOpen.length > 0
                ? html`<span
                    class="chip chip--covers"
                    title="${localize(this.hass, "card.covers_left_open", {
                      covers: coversLeftOpen.join(", "),
                    })}"
                  >
                    <ha-icon icon="mdi:window-shutter-alert"></ha-icon>
                    ${coversSummary}
                  </span>`
                : nothing}
            </div>`
          : nothing}
      </div>
    `;
  }
  protected render() {
    if (!this.hass || !this._config) return nothing;


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

    .cover-time.actionable:hover {
      border-color: var(--primary-color);
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

    .chip--heat {
      background: var(--error-color, #e7973c);
      color: var(--text-primary-color, #fff);
    }

    /* Pulses between orange and yellow: a cover left up is something to act
       on tonight, not a steady status. */
    .chip--covers {
      background: var(--warning-color, #ff9800);
      color: #412402;
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
