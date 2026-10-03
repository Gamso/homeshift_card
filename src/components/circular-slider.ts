import { LitElement, html, css, svg } from "lit";
import { property } from "lit/decorators.js";

/* =======================
   CONFIGURATION
======================= */

const STROKE_WIDTH = 25;
const CLICK_AREA_PADDING = 10;

// 180° arc (opening at the bottom)
const ARC_PATH = "M 30 150 A 85 85 0 1 1 170 150";

/* =======================
   COMPONENT
======================= */

// Segment colours, cycled by index so the component is not coupled to specific mode names.
const SEGMENT_COLORS = [
  "var(--disabled-text-color, #9e9e9e)", // Gray (first active mode, typically off)
  "#e74c3c", // Red (second, typically heating)
  "var(--primary-color, #3b82f6)", // Blue (third, typically cooling)
  "#d4a574", // Beige (fourth, typically ventilation)
];

export class HomeShiftCircularSlider extends LitElement {
  @property() public currentValue!: string;
  @property({ type: Array }) public options: string[] = [];
  /** Optional display labels shown on the arc. Falls back to options[i] when not provided. */
  @property({ type: Array }) public labels: string[] = [];
  /** Accessible name of the whole selector (e.g. "Thermostat mode"). */
  @property() public label = "";
  @property({ type: Number }) private selectedIndex = -1;

  /* =======================
     UTILS
  ======================= */

  private _getColorForIndex(index: number): string {
    return (
      SEGMENT_COLORS[index % SEGMENT_COLORS.length] ?? "var(--primary-color)"
    );
  }

  private _valueToPercentage(index: number): number {
    // Divide by total length to get equal segments
    // Keep left-to-right mapping (0 -> 1)
    return index / this.options.length;
  }

  // Build dasharray for a total length of 1 (via pathLength="1")
  private _strokeDashArc(fromIndex: number, toIndex: number): [string, string] {
    const start = this._valueToPercentage(fromIndex); // e.g. 0.33
    const end = this._valueToPercentage(toIndex); // e.g. 0.66

    const length = end - start; // Segment length (e.g. 0.33)

    // Dasharray: "segment_length  large_gap"
    // Dashoffset: "-start_point" (negative shifts the stroke to the right)
    return [`${length} 10`, `-${start}`];
  }

  private _select(index: number) {
    this.dispatchEvent(
      new CustomEvent("option-selected", {
        detail: { option: this.options[index] },
        bubbles: true,
        composed: true,
      }),
    );
  }

  /**
   * Keyboard support: arrows move the focus along the arc (wrapping),
   * Enter / Space activate the focused mode. Arrows do not activate, so
   * browsing the modes does not switch the thermostat on each key press.
   */
  private _onKeyDown(e: KeyboardEvent, index: number) {
    const n = this.options.length;
    let target: number | undefined;
    switch (e.key) {
      case "ArrowRight":
      case "ArrowUp":
        target = (index + 1) % n;
        break;
      case "ArrowLeft":
      case "ArrowDown":
        target = (index - 1 + n) % n;
        break;
      case "Home":
        target = 0;
        break;
      case "End":
        target = n - 1;
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        this._select(index);
        return;
      default:
        return;
    }
    e.preventDefault();
    this.renderRoot
      .querySelector<SVGGElement>(`.segment[data-index="${target}"]`)
      ?.focus();
  }

  /* =======================
     RENDER
  ======================= */

  protected render() {
    // Guard: nothing to render if no options are provided yet
    if (!this.options || this.options.length === 0)
      return html`<div class="slider-container"></div>`;

    // Sync selectedIndex with currentValue.
    // When the thermostat is in its "off" state (e.g. "Eteint", "Off"), the off option
    // is NOT included in this.options (filtered out by the parent card), so indexOf
    // returns -1 → selectedIndex = -1 → no arc segment is highlighted. This replaces
    // the previous explicit check against hardcoded strings like "Eteint" or "off".
    const currentIndex = this.currentValue
      ? this.options.indexOf(this.currentValue)
      : -1;
    if (currentIndex !== -1) {
      this.selectedIndex = currentIndex;
    } else {
      this.selectedIndex = -1;
    }

    return html`
      <div class="slider-container">
        <svg viewBox="0 0 200 200" role="radiogroup" aria-label=${this.label}>
          <defs>
            <path id="arcPath" d="${ARC_PATH}" pathLength="1" />
          </defs>

          ${svg`
            <path
              d="${ARC_PATH}"
              fill="none"
              stroke="var(--divider-color, #e0e0e0)"
              stroke-width="${STROKE_WIDTH}"
              opacity="0.3"
              pathLength="1" 
            />
          `} ${this.selectedIndex !== -1
            ? (() => {
                const [dasharray, dashoffset] = this._strokeDashArc(
                  this.selectedIndex,
                  this.selectedIndex + 1,
                );

                const strokeColor = this._getColorForIndex(this.selectedIndex);

                return svg`
                  <path
                    d="${ARC_PATH}"
                    fill="none"
                    stroke="${strokeColor}"
                    stroke-width="${STROKE_WIDTH}"
                    stroke-dasharray="${dasharray}"
                    stroke-dashoffset="${dashoffset}"
                    stroke-linecap="butt"
                    pathLength="1"
                  />
                `;
              })()
            : null}
          ${(() => {
            const N = this.options.length;
            if (N < 2) return null;
            const eps = 0.002; // half-width of each separator mark in pathLength units
            const seg = 1 / N;
            // dasharray starts as "drawn", so prepend 0 to make the first value a gap.
            // Pattern: 0 (first_gap) mark (gap) mark ... mark (large trailing gap)
            const parts: number[] = [0, seg - eps];
            for (let s = 0; s < N - 2; s++) {
              parts.push(2 * eps); // mark
              parts.push(seg - 2 * eps); // gap
            }
            parts.push(2 * eps); // last mark
            parts.push(100); // large trailing value to prevent pattern repetition
            return svg`
              <path
                d="${ARC_PATH}"
                fill="none"
                stroke="rgba(150, 150, 150, 0.5)"
                stroke-width="${STROKE_WIDTH}"
                stroke-dasharray="${parts.join(" ")}"
                stroke-dashoffset="0"
                stroke-linecap="butt"
                pathLength="1"
                pointer-events="none"
              />
            `;
          })()}
          ${this.options.map((_mode, i) => {
            const [dasharray, dashoffset] = this._strokeDashArc(i, i + 1);
            // Compute the center position of the segment
            const segmentStart = this._valueToPercentage(i);
            const segmentEnd = this._valueToPercentage(i + 1);
            const segmentCenter = (segmentStart + segmentEnd) / 2;
            const startOffset = segmentCenter * 100;
            // Prefer the translated label when provided, fall back to the raw option value
            const displayLabel = this.labels[i] ?? this.options[i];
            // Roving tabindex: one tab stop, on the active mode (or the first).
            const tabStop =
              this.selectedIndex === -1 ? i === 0 : i === this.selectedIndex;

            return svg`
              <g
                class="segment"
                data-index="${i}"
                role="radio"
                aria-checked="${i === this.selectedIndex}"
                aria-label="${displayLabel}"
                tabindex="${tabStop ? 0 : -1}"
                @click=${(e: Event) => {
                  e.stopPropagation();
                  this._select(i);
                }}
                @keydown=${(e: KeyboardEvent) => this._onKeyDown(e, i)}
              >
                <path
                  class="hit"
                  d="${ARC_PATH}"
                  fill="none"
                  stroke="transparent"
                  stroke-width="${STROKE_WIDTH + CLICK_AREA_PADDING}"
                  stroke-dasharray="${dasharray}"
                  stroke-dashoffset="${dashoffset}"
                  pathLength="1"
                />
                <text
                  font-size="12"
                  font-weight="600"
                  fill="var(--primary-text-color)"
                  text-anchor="middle"
                  dominant-baseline="middle"
                  aria-hidden="true"
                >
                  <textPath href="#arcPath" startOffset="${startOffset}%" text-anchor="middle">
                    ${displayLabel}
                  </textPath>
                </text>
              </g>
            `;
          })}
        </svg>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }

    .slider-container {
      display: flex;
      justify-content: center;
      padding: 8px 0;
    }

    svg {
      width: 100%;
      max-width: 240px;
      aspect-ratio: 1;
    }

    .segment {
      cursor: pointer;
      user-select: none;
      outline: none;
    }

    .segment:focus-visible .hit {
      stroke: var(--primary-text-color, #000);
      stroke-opacity: 0.25;
    }
  `;
}

if (!customElements.get("homeshift-circular-slider")) {
  customElements.define("homeshift-circular-slider", HomeShiftCircularSlider);
}
