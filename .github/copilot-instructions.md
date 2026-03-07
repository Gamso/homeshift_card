# Copilot Instructions for this Repo

These rules guide AI agents working on this Home Assistant custom card. Focus on the current patterns and workflows used here.

## Architecture Overview

- **Entry point:** [src/index.ts](src/index.ts) registers the card in `window.customCards` and imports the implementation module.
- **Main card:** [src/components/homershiftcard.ts](src/components/homershift-card.ts) defines `HomeShiftCard` (Lit v3) wrapper with `hass` context, grid layout (day mode select + thermostat gauge), and `_config` state.
- **Circular slider:** [src/components/circular-slider.ts](src/components/circular-slider.ts) defines `HomeShiftCircularSlider` (standalone Lit component) for 250° arc gauge with interactive pastilles; used by main card via `<homershift-circular-slider>` custom element.
- **Localization:** [src/localize/localize.ts](src/localize/localize.ts) provides `localize(hass, key, params)` using [src/localize/en.json](src/localize/en.json) and [src/localize/fr.json](src/localize/fr.json). Language resolves from `hass.locale.language`.
- **Build artifacts:** Rollup outputs ES module to `dist/homershift-card.js`; HA loads it as `/local/homershift_card/homershift-card.js` in DevContainer config.

## Build & Dev Workflows

- **Install & build:** `npm install` then `npm run build` (Rollup; see [rollup.config.js](rollup.config.js)).
- **Watch mode:** `npm run watch` for incremental builds.
- **DevContainer:** See [README.md](README.md) for HA dev setup, resource mounting, and dashboard YAML. Do not alter DevContainer paths unless asked.

## Card Patterns

- **Registration:** Ensure `customElements.define("homershift-card", HomeShiftCard)` remains, and keep `window.customCards.push({...})` in [src/index.ts](src/index.ts) when adding metadata.
- **Config handling:** Implement defaults via `getStubConfig()` and normalize in `setConfig(config)`; keep keys `name`, `day_mode_entity`, `hermostat_mode_tentity`.
- **State access:** Read entity state from `this.hass.states[entityId]` via helper `getEntityState()`.
- **Service calls:** Use `this.hass.callService("input_select", "select_option", { entity_id, option })` for updates (examples in `onSelect()` and circular-slider).
- **Rendering:** Use Lit `html` templates with `ha-card` wrapper; render fallback error blocks when entities are missing; return `nothing` when `hass` or `_config` is unavailable.
- **Styling:** Add styles under `static styles = css\`...\``; prefer CSS variables (`--primary-color`, `--divider-color`) to match HA themes.

## Circular Slider Component Pattern

The `HomeShiftCircularSlider` ([src/components/circular-slider.ts](src/components/circular-slider.ts)) is a reusable component for selecting from discrete options via a 250° arc gauge:

- **Constants** (module-level): `MAX_ANGLE = 250` (3/4 circle), `ROTATE_ANGLE = -45` (opens downward), `RADIUS = 85` (arc radius in SVG coordinates).
- **Properties:** `@property hass`, `@property entityId`, `@property options[]`, `@property currentValue`.
- **Key methods:**
  - `_valueToPercentage(index)`: Maps option index to 0-1 range: `index / (options.length - 1)`.
  - `_strokeDashArc(fromIndex, toIndex)`: Calculates `[dasharray, dashoffset]` for stroke-based arc segments using circumference formula: `track = (RADIUS * 2 * π * MAX_ANGLE) / 360`.
  - `_getPercentageFromEvent(e)`: Converts click/touch position to percentage via `atan2` polar conversion (`Math.atan2(y, x)`), then maps angle to option index.
  - `_onSelect(index)`: Calls `hass.callService("input_select", "select_option", { entity_id: entityId, option: options[index] })`.
- **SVG rendering:** Single shared arc path with `stroke-dasharray`/`stroke-dashoffset` per segment; pastilles (circles, 6px radius) at each option; labels with rotation transforms for readability.
- **Usage in main card:** Import path `"./circular-slider"` in homershift-card.ts, then render via `<homershift-circular-slider .hass=${this.hass} .entityId=${thermo.entity_id} .options=${thermoOptions} .currentValue=${thermo.state}></homershift-circular-slider>`.
- **Extending the pattern:** To create similar gauges for other use cases, copy the component structure, adjust `MAX_ANGLE`/`RADIUS` constants, and customize SVG styling (colors, stroke-width) via CSS variables.

## Localization Conventions

- **Keys:** Use dot paths like `card.mode_jour`, `card.entity_not_found`.
- **Params:** Pass values via `localize(this.hass, "card.entity_not_found", { entity: id })`.
- **Language fallback:** `localize()` falls back to English; add keys to both `en.json` and `fr.json`.

## Project Conventions

- **TypeScript:** Strict settings (see [tsconfig.json](tsconfig.json)); target ES2020; modules are ESM.
- **Dependencies:** `lit` for UI; `custom-card-helpers` is available if needed, but not required by current code.
- **Structure:** Keep source under `src/`, output to `dist/`; do not move files arbitrarily.

## Safe Changes for Agents

- **Minimal diffs:** Change only what’s needed; preserve public API (`HomeShiftCard`, tag name, config keys).
- **Feature additions:**
  - Add new localized labels by extending JSON dictionaries and using `localize()` in templates.
  - Extend configuration by updating `HomeShiftCardConfig`, `getStubConfig()`, and `setConfig()` consistently.
  - New interactions should call HA services through `hass.callService` and read entity data via `this.hass.states`.
- **Build output:** Ensure changes still produce `dist/homershift-card.js` via Rollup. Do not rename the output file.

## Practical Examples

- **Add a localized label:**
  - Update [src/localize/en.json](src/localize/en.json) and [src/localize/fr.json](src/localize/fr.json) with `card.new_label`.
  - Use `localize(this.hass, "card.new_label")` in [src/components/homeshift-card.ts](src/components/homeshift-card.ts).
- **Add a new config key:**
  - Extend the `HomeShiftCardConfig` interface and defaults, then reference it in `render()`.

## Debug Notes

- If the card doesn’t appear, confirm HA resource points to `/local/workspaces/homeshift/homeshift-card.js` and that `npm run build` generated `dist/homeshift-card.js`.
- Use `npm run watch` during dev and reload Lovelace to see updates.
