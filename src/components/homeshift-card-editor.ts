import { LitElement, html, css } from "lit";
import { property, state } from "lit/decorators.js";
import { localize } from "../localize/localize";

interface HomeShiftCardConfig {
  name?: string;
  day_mode_entity?: string;
  hermostat_mode_tentity?: string;
  cover_open_time_entity?: string;
  cover_close_time_entity?: string;
  cover_entity?: string;
  covers_left_open_entity?: string;
}

class HomeShiftCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: any;
  @state() private _config!: HomeShiftCardConfig;

  public setConfig(config: HomeShiftCardConfig): void {
    this._config = config;
  }

  private _onNameChanged(ev: Event) {
    if (!this._config || !this.hass) return;
    const target = ev.target as any;
    const newValue = target.value;
    if (this._config.name === newValue) return;

    const newConfig = { ...this._config, name: newValue };
    this._config = newConfig;
    this._dispatchConfigChanged(newConfig);
  }

  private _onEntityChanged(
    ev: CustomEvent,
    fieldName: keyof HomeShiftCardConfig,
  ) {
    if (!this._config || !this.hass) return;
    const newValue = ev.detail.value;
    if ((this._config as any)[fieldName] === newValue) return;

    const newConfig = { ...this._config, [fieldName]: newValue };
    this._config = newConfig;
    this._dispatchConfigChanged(newConfig);
  }

  private _dispatchConfigChanged(newConfig: HomeShiftCardConfig) {
    const event = new CustomEvent("config-changed", {
      detail: { config: newConfig },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  protected render() {
    if (!this.hass || !this._config) {
      return html``;
    }

    return html`
      <div class="card-config">
        <ha-textfield
          label="${localize(this.hass, "editor.name")}"
          .value=${this._config.name || ""}
          @input=${this._onNameChanged}
        ></ha-textfield>

        <ha-entity-picker
          label="${localize(this.hass, "editor.day_mode_entity")}"
          .hass=${this.hass}
          .value=${this._config.day_mode_entity || ""}
          @value-changed=${(e: CustomEvent) =>
            this._onEntityChanged(e, "day_mode_entity")}
          allow-custom-entity
        ></ha-entity-picker>

        <ha-entity-picker
          label="${localize(this.hass, "editor.hermostat_mode_tentity")}"
          .hass=${this.hass}
          .value=${this._config.hermostat_mode_tentity || ""}
          @value-changed=${(e: CustomEvent) =>
            this._onEntityChanged(e, "hermostat_mode_tentity")}
          allow-custom-entity
        ></ha-entity-picker>

        <ha-entity-picker
          label="${localize(this.hass, "editor.cover_open_time_entity")}"
          .hass=${this.hass}
          .value=${this._config.cover_open_time_entity || ""}
          @value-changed=${(e: CustomEvent) =>
            this._onEntityChanged(e, "cover_open_time_entity")}
          allow-custom-entity
        ></ha-entity-picker>

        <ha-entity-picker
          label="${localize(this.hass, "editor.cover_close_time_entity")}"
          .hass=${this.hass}
          .value=${this._config.cover_close_time_entity || ""}
          @value-changed=${(e: CustomEvent) =>
            this._onEntityChanged(e, "cover_close_time_entity")}
          allow-custom-entity
        ></ha-entity-picker>

        <ha-entity-picker
          label="${localize(this.hass, "editor.cover_entity")}"
          .hass=${this.hass}
          .value=${this._config.cover_entity || ""}
          .includeDomains=${["cover"]}
          @value-changed=${(e: CustomEvent) =>
            this._onEntityChanged(e, "cover_entity")}
          allow-custom-entity
        ></ha-entity-picker>

        <ha-entity-picker
          label="${localize(this.hass, "editor.covers_left_open_entity")}"
          .hass=${this.hass}
          .value=${this._config.covers_left_open_entity || ""}
          .includeDomains=${["binary_sensor"]}
          @value-changed=${(e: CustomEvent) =>
            this._onEntityChanged(e, "covers_left_open_entity")}
          allow-custom-entity
        ></ha-entity-picker>
      </div>
    `;
  }

  static styles = css`
    .card-config {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 16px 0;
    }

    ha-textfield,
    ha-entity-picker {
      width: 100%;
    }

    ha-formfield {
      display: flex;
      align-items: center;
      padding: 8px 0;
    }
  `;
}

if (!customElements.get("homeshift-card-editor")) {
  customElements.define("homeshift-card-editor", HomeShiftCardEditor);
}

export { HomeShiftCardEditor };
