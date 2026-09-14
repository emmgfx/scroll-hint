# @emmgfx/scroll-hint

Scroll edge indicators for React. Shows shadows and/or solid lines on the edges of a scrollable container to hint that there's more content — no scroll events, no polling, just [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).

## Installation

```bash
npm install @emmgfx/scroll-hint
```

## Usage

```jsx
import { ScrollHint } from "@emmgfx/scroll-hint";

<ScrollHint>
  {/* your scrollable content */}
</ScrollHint>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `"vertical" \| "horizontal" \| "both"` | `"vertical"` | Which axes to observe and show indicators on |
| `shadowColor` | `string` | `"rgba(0, 0, 0, 0.15)"` | CSS color for the gradient shadow. Set to `""` to disable |
| `shadowSize` | `number` | `20` | Height/width of the shadow overlays in pixels |
| `lineColor` | `string` | `undefined` | CSS color for a solid line at the edge. Omit to disable |
| `lineSize` | `number` | `1` | Thickness of the solid line in pixels |
| `transitionDuration` | `string` | `"0.2s"` | How long the indicators take to fade in and out. Set to `"0s"` for no fade |
| `scrollerRef` | `RefObject<HTMLDivElement \| null>` | `undefined` | Ref to the scrolling element, to drive it from outside. Must be a stable object ref: it is used as the internal ref, not copied into it |
| `scrollerProps` | `HTMLAttributes<HTMLDivElement>` | `undefined` | Props for the scrolling element — `className` for scroll-snap, `tabIndex` and `aria-label` to make it keyboard reachable... `flex: 1`, `minWidth: 0`, `minHeight: 0` and both `overflow` axes are set by the component and cannot be overridden |
| `onEdgesChange` | `(edges: ScrollHintEdges) => void` | `undefined` | Called on mount and whenever an edge changes, with `{ top, bottom, left, right }`: `true` means there is more content past that edge. Same state that drives the indicators |

All standard `div` props are forwarded to the outer wrapper element.

## Examples

**Horizontal scroll:**
```jsx
<ScrollHint direction="horizontal">
  <div style={{ display: "flex" }}>
    {/* columns */}
  </div>
</ScrollHint>
```

The row is yours: the component handles scrolling and indicators, not the layout of the content. Drop that wrapper and block-level children stack into a column, which never overflows, so nothing scrolls and no indicator shows. In development the component logs an error when it sees that happen.

**Both directions:**
```jsx
<ScrollHint direction="both" style={{ height: 300 }}>
  {/* 2D scrollable content */}
</ScrollHint>
```

**Solid line instead of shadow:**
```jsx
<ScrollHint shadowColor="" lineColor="rgba(0,0,0,0.1)">
  {/* content */}
</ScrollHint>
```

**Line + shadow combined:**
```jsx
<ScrollHint lineColor="rgba(0,0,0,0.1)">
  {/* content */}
</ScrollHint>
```

**Your own arrows:** the indicators are decoration — they carry `pointer-events: none`. For clickable controls, put your own on top: `onEdgesChange` tells you when to show each one, and `scrollerRef` scrolls.

```jsx
const scroller = useRef(null);
const [edges, setEdges] = useState({ left: false, right: false });

const scrollBy = (sign) =>
  scroller.current?.scrollBy({ left: (sign * scroller.current.clientWidth) / 2, behavior: "smooth" });

<div style={{ position: "relative" }}>
  <ScrollHint direction="horizontal" scrollerRef={scroller} onEdgesChange={setEdges}>
    {/* content */}
  </ScrollHint>
  {edges.left && <button onClick={() => scrollBy(-1)}>←</button>}
  {edges.right && <button onClick={() => scrollBy(1)}>→</button>}
</div>
```

**Keyboard reachable and snapping:**
```jsx
<ScrollHint
  direction="horizontal"
  scrollerProps={{ tabIndex: 0, "aria-label": "Photos", className: "snap-x snap-mandatory" }}
>
  {/* content */}
</ScrollHint>
```

## Dark mode

`shadowColor` and `lineColor` accept any CSS value, including variables. Define a variable in your stylesheet and update it per color scheme:

```css
:root { --hint-shadow: rgba(0, 0, 0, 0.15); }
@media (prefers-color-scheme: dark) {
  :root { --hint-shadow: rgba(255, 255, 255, 0.1); }
}
```

```jsx
<ScrollHint shadowColor="var(--hint-shadow)">
  {/* content */}
</ScrollHint>
```

Works with any dark mode strategy — media query, class-based (`class="dark"`), or data attributes.

## Tailwind CSS

Define the variable inline using Tailwind's dark mode variant:

```jsx
<ScrollHint
  shadowColor="var(--hint-shadow)"
  className="[--hint-shadow:var(--color-slate-200)] dark:[--hint-shadow:var(--color-slate-800)]"
>
  {/* content */}
</ScrollHint>
```

## License

MIT © [Josep Viciana](https://www.viciana.me)
