# HomeShift Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)

A clean, compact Lovelace card for Home Assistant to control the **HomeShift** integration from a single visual component.

![Card Preview](assets/card_preview.png)

---

## Overview

HomeShift Card gives you full control over your HomeShift-managed thermostat and daily schedule in one place: a compact list of labelled rows, with the less frequent settings folded away until you need them.

---

## Features

### Thermostat mode

The first row is a segmented control with one button per thermostat mode; the active mode is filled with its colour. Tap a mode to activate it instantly, or reach it with Tab and press Enter or Space. The buttons are disabled while the thermostat mode entity is unavailable.

| Mode        | Colour of the active button |
| ----------- | --------------------------- |
| Off         | Gray                        |
| Heating     | Red (HA heating colour)     |
| Cooling     | Blue (HA cooling colour)    |
| Ventilation | Green (HA fan colour)       |

Mode names are translated by the card (English, French) from the keys of the integration's `option_map`; any other mode keeps the name given in the integration.

### Day mode

A dropdown switches the daily profile (e.g. Home, Work, Remote, Away) without leaving the dashboard.

### Next mode

The **Next** row shows the next scheduled mode and its time, as Today / Tomorrow + time (or the date when further away), in the 12 h / 24 h format of your Home Assistant profile. The row is hidden while no switch is scheduled (sensors `unknown` or `unavailable`).

### Keep my manual choice / Start events early

Two collapsible rows show their current value at a glance ("No" when disabled). Tap one to open a stepper and a sentence explaining the effect of the value: until what time a manual change is kept, or at what time the next event really starts. The row folds back after a few seconds without interaction.

- **Keep my manual choice** (override duration): 15 min to 12 h.
- **Start events early** (early switch): 15 min to 4 h.

A value set elsewhere that is not one of the steps (e.g. 25 min) is shown as is, and the stepper moves to the nearest step in the direction asked for. While the number entity is `unknown` or `unavailable` the row reads "Unavailable" and cannot be opened.

### Covers

The **Covers** row shows the scheduled opening and closing times of the daily covers. When the HomeShift integration exposes its `button.homeshift_open_covers` / `button.homeshift_close_covers` entities (created when daily covers are configured), each time is a button: tap it, or focus it and press Enter, to open or close the covers right away. It shows "Sending…" while Home Assistant handles the request, and a failure is reported in the usual Home Assistant notification toast. No confirmation is asked: the action is reversible with the other button. When the button entities are missing or unavailable the times stay plain labels.

If the legacy `cover_entity` option is set, it takes priority over the buttons: the times then call `cover.open_cover` / `cover.close_cover` on that entity, as in previous versions.

### Alerts

At the bottom of the card, a chip appears while the heat protection keeps the covers down, and a blinking chip names the covers tonight's close had to leave open (window open). Past three covers the chip shows a count; tap it (or focus it and press Enter) to read the names. Nothing is shown while everything is in order.

---

## Requirements

This card requires the [HomeShift integration](https://github.com/Gamso/homeshift) to be installed and configured. The card reads directly from the entities exposed by the integration.

---

## Installation

### HACS (recommended)

<a href="https://my.home-assistant.io/redirect/hacs_repository/?owner=Gamso&repository=homeshift_card&category=plugin"><img src="https://my.home-assistant.io/badges/hacs_repository.svg"></a>

### Manual

1. Download `homeshift-card.js` from the [latest release](https://github.com/Gamso/homeshift_card/releases/latest)
2. Copy it to `config/www/homeshift_card/homeshift-card.js`
3. Add the resource in **Settings → Dashboards → Resources**:
   ```
   /local/homeshift_card/homeshift-card.js
   ```

---

## Adding the card

1. Open your Home Assistant dashboard
2. Click **Edit Dashboard**
3. Click **Add Card**
4. Search for **HomeShift Card**
5. Configure the entities in the dialog (see below)
6. Save

---

## Configuration

```yaml
type: custom:homeshift-card
day_mode_entity: select.homeshift_day_mode
thermostat_mode_entity: select.homeshift_thermostat_mode
override_duration_entity: number.homeshift_override_duration
early_switch_entity: number.homeshift_early_switch
next_mode_entity: sensor.homeshift_next_mode
next_mode_at_entity: sensor.homeshift_next_mode_at
heat_protection_entity: binary_sensor.homeshift_cover_heat_active
cover_open_time_entity: sensor.homeshift_cover_open_time
cover_close_time_entity: sensor.homeshift_cover_close_time
open_covers_entity: button.homeshift_open_covers
close_covers_entity: button.homeshift_close_covers
covers_left_open_entity: binary_sensor.homeshift_covers_left_open
```

Every entity option defaults to the entity the HomeShift integration creates, so a plain `type: custom:homeshift-card` works with a default installation. Set an option to an empty string to hide the corresponding element. If the day mode or thermostat mode entity does not exist, the card shows an "Entity not found" message instead of the controls.

### Options

| Option                     | Type    | Default                                    | Description                                                                  |
| -------------------------- | ------- | ------------------------------------------ | ---------------------------------------------------------------------------- |
| `name`                     | string  | `"Thermostat"`                             | Accepted for compatibility; the list layout shows no title                   |
| `day_mode_entity`          | string  | `select.homeshift_day_mode`                | Day mode select entity                                                       |
| `thermostat_mode_entity`   | string  | `select.homeshift_thermostat_mode`         | Thermostat mode select entity                                                |
| `override_duration_entity` | string  | `number.homeshift_override_duration`       | Override duration number entity                                              |
| `early_switch_entity`      | string  | `number.homeshift_early_switch`            | Early switch number entity                                                   |
| `next_mode_entity`         | string  | `sensor.homeshift_next_mode`               | Next scheduled mode sensor                                                   |
| `next_mode_at_entity`      | string  | `sensor.homeshift_next_mode_at`            | Next scheduled time sensor                                                   |
| `heat_protection_entity`   | string  | `binary_sensor.homeshift_cover_heat_active` | Heat protection chip                                                         |
| `cover_open_time_entity`   | string  | `sensor.homeshift_cover_open_time`         | Scheduled cover opening time                                                 |
| `cover_close_time_entity`  | string  | `sensor.homeshift_cover_close_time`        | Scheduled cover closing time                                                 |
| `open_covers_entity`       | string  | `button.homeshift_open_covers`             | Button pressed by the opening time ("open now")                              |
| `close_covers_entity`      | string  | `button.homeshift_close_covers`            | Button pressed by the closing time ("close now")                             |
| `cover_entity`             | string  | _(none)_                                   | Legacy: cover opened/closed by the times; overrides the two buttons when set |
| `covers_left_open_entity`  | string  | `binary_sensor.homeshift_covers_left_open` | "Not closed" chip                                                            |

All options can also be set from the visual editor.

## Development

```bash
npm ci
npm run build      # dist/homeshift-card.js (committed, served by HACS)
npm run typecheck
npm run lint
npm test
```

CI runs the same commands, checks that the committed `dist/` matches a fresh build, and validates the repository with the HACS action.

---

## License

MIT
