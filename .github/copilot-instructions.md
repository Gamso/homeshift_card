# Copilot Instructions for this Repo

These rules guide AI agents working on this Home Assistant custom card. Focus on the current patterns and workflows used here.

## Architecture Overview

- **Entry point:** [src/index.ts](src/index.ts) registers the card in `window.customCards` and imports the implementation module.
- **Config:** [src/types.ts](src/types.ts) exports `HomeShiftCardConfig` and `ENTITY_FIELDS`, the single table of entity options (key, picker domains, default entity). The card's defaults, its watched entities and the editor's pickers are all derived from it.
- **Main card:** [src/components/homeshift-card.ts](src/components/homeshift-card.ts) defines `HomeShiftCard` (Lit 3), registered as `homeshift-card`: a list of rows, i.e. thermostat mode as segmented `<button>`s, day mode `<select>`, next mode, the two collapsible minutes settings (stepper), cover times / "open-close now" buttons, then the alert chips.
- **Editor:** [src/components/homeshift-card-editor.ts](src/components/homeshift-card-editor.ts) defines `homeshift-card-editor`, one `ha-entity-picker` per `ENTITY_FIELDS` entry.
- **State helpers:** [src/state.ts](src/state.ts) (`isUsable`, `numericState`, `formatMinutes`) and [src/time.ts](src/time.ts) (time formatting from `hass.locale`).
- **Localization:** [src/localize/localize.ts](src/localize/localize.ts) provides `localize(hass, key, params?, fallback?)` using [src/localize/en.json](src/localize/en.json) and [src/localize/fr.json](src/localize/fr.json). Lookup: user language, English, `fallback`, then the key.
- **Build artifacts:** Rollup outputs a minified ES module to `dist/homeshift-card.js` (committed, no sourcemap); HA loads it as `/local/homeshift_card/homeshift-card.js` in the DevContainer.

## Build & Dev Workflows

- **Install & build:** `npm ci` then `npm run build` (Rollup; see [rollup.config.js](rollup.config.js)). Commit the rebuilt `dist/`; CI fails if it differs from a fresh build.
- **Checks:** `npm run typecheck`, `npm run lint`, `npm test` (Vitest + happy-dom, tests in `test/`).
- **Watch mode:** `npm run watch` for incremental builds.
- **DevContainer:** see [.devcontainer/README.md](.devcontainer/README.md); `dist/` is mounted on `/config/www/homeshift_card`.

## Card Patterns

- **Registration:** keep the `customElements.get(...)` guards before `customElements.define("homeshift-card", ...)`, and the `window.customCards.push({...})` in [src/index.ts](src/index.ts).
- **Config handling:** add an entity option to `HomeShiftCardConfig` and `ENTITY_FIELDS` (plus an `editor.<key>` label in both JSON files); `setConfig` applies the defaults. Keys: `name` (accepted, not displayed), `day_mode_entity`, `thermostat_mode_entity`, `override_duration_entity`, `early_switch_entity`, `next_mode_entity`, `next_mode_at_entity`, `heat_protection_entity`, `cover_open_time_entity`, `cover_close_time_entity`, `open_covers_entity`, `close_covers_entity`, `cover_entity` (legacy, overrides the buttons), `covers_left_open_entity`.
- **State access:** read entities with `getEntityState()`; filter `unknown` / `unavailable` with `isUsable()` before displaying a state.
- **Missing entities:** stub data is only used when HA sets `preview`; otherwise show `card.entity_not_found`.
- **Service calls:** `select.select_option` (day / thermostat mode), `number.set_value` (steppers), `button.press` on the integration buttons (or `cover.open_cover` / `close_cover` for a legacy `cover_entity`). Report failures with a `hass-notification` event, never leave a promise unhandled.
- **Accessibility:** interactive elements are `<button>` / `<select>` with a localized `aria-label`; no hover-only information.
- **Styling:** add styles under `static styles = css\`...\``; prefer HA CSS variables (`--primary-color`, `--divider-color`) and honour `prefers-reduced-motion`.

## Localization Conventions

- **Keys:** dot paths like `card.entity_not_found`, `editor.day_mode_entity`, `thermostat.heating`.
- **Params:** `localize(this.hass, "card.entity_not_found", { entity: id })`.
- **Both languages:** add every key to `en.json` and `fr.json`; tests enforce identical key sets and fail on a key no source file uses.

## Safe Changes for Agents

- **Minimal diffs:** change only what's needed; preserve the public API (`HomeShiftCard`, tag names, config keys).
- **Tests:** add a Vitest test in `test/` for every bug fix or new option.
- **Build output:** do not rename `dist/homeshift-card.js` (HACS `filename`).
