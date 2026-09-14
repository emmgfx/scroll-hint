import { useEffect, useRef, useState } from "react";

export type ScrollHintDirection = "vertical" | "horizontal" | "both";

/** Whether there is more content past each edge — the same state that drives the indicators. */
export type ScrollHintEdges = { top: boolean; bottom: boolean; left: boolean; right: boolean };

export interface ScrollHintProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: ScrollHintDirection;
  shadowColor?: string;
  shadowSize?: number;
  lineColor?: string;
  lineSize?: number;
  /** How long the indicators take to fade in and out. Set to "0s" for no fade. */
  transitionDuration?: string;
  /** Ref to the scrolling element, to drive it from outside (scrollBy, scrollTo...). Pass a
   * stable object ref: it is used as the internal ref, not copied into it. */
  scrollerRef?: React.RefObject<HTMLDivElement | null>;
  /** Props for the scrolling element: className for scroll-snap, tabIndex and aria-label to make it keyboard reachable... */
  scrollerProps?: React.HTMLAttributes<HTMLDivElement>;
  /** Called on mount and whenever an edge changes, to render your own controls. */
  onEdgesChange?: (edges: ScrollHintEdges) => void;
}

export function ScrollHint({
  direction = "vertical",
  shadowColor = "rgba(0, 0, 0, 0.15)",
  shadowSize = 20,
  lineColor,
  lineSize = 1,
  transitionDuration = "0.2s",
  scrollerRef,
  scrollerProps,
  onEdgesChange,
  children,
  style,
  ...props
}: ScrollHintProps) {
  // The caller's ref, when given, is the internal one: a single ref, no copying
  const internalRef = useRef<HTMLDivElement>(null);
  const containerRef = scrollerRef ?? internalRef;
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const [shadows, setShadows] = useState({ top: false, bottom: false, left: false, right: false });

  const vertical = direction === "vertical" || direction === "both";
  const horizontal = direction === "horizontal" || direction === "both";

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const visible = entry.isIntersecting;
          if (entry.target === topRef.current) setShadows((s) => ({ ...s, top: !visible }));
          else if (entry.target === bottomRef.current) setShadows((s) => ({ ...s, bottom: !visible }));
          else if (entry.target === leftRef.current) setShadows((s) => ({ ...s, left: !visible }));
          else if (entry.target === rightRef.current) setShadows((s) => ({ ...s, right: !visible }));
        });
      },
      { root: container, threshold: 0 }
    );

    if (vertical) {
      if (topRef.current) observer.observe(topRef.current);
      if (bottomRef.current) observer.observe(bottomRef.current);
    }
    if (horizontal) {
      if (leftRef.current) observer.observe(leftRef.current);
      if (rightRef.current) observer.observe(rightRef.current);
    }

    return () => observer.disconnect();
  }, [direction, containerRef]);

  // The component scrolls and paints the indicators, it does not lay out the
  // content: with `horizontal`, block-level siblings stack into a column and
  // nothing overflows, so there is no scrolling and no indicator ever shows.
  // Nothing errors either, so the only clue is the layout itself.
  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    if (!horizontal) return;

    const content = containerRef.current?.firstElementChild;
    if (!content) return;

    // The sentinels are absolutely positioned, so they are not part of any row
    const items = [...content.children].filter(
      (child) => getComputedStyle(child).position !== "absolute"
    );
    if (items.length < 2) return;

    // Everything measures zero while hidden, and zero-height items would read
    // as stacked
    if (items.some((item) => item.getBoundingClientRect().height === 0)) return;

    const stacked = items.every(
      (item, index) =>
        index === 0 ||
        item.getBoundingClientRect().top >= items[index - 1].getBoundingClientRect().bottom
    );

    if (stacked)
      console.error(
        "[ScrollHint] The children of a horizontal ScrollHint are stacked in a column, so there is nothing to scroll and no indicator will ever show. Wrap them in a row of your own, with display: flex or a grid flowing in columns: the component handles scrolling and indicators, not the layout of the content."
      );
  }, [horizontal, containerRef]);

  // Kept in a ref so an inline callback does not fire this on every render
  const onEdgesChangeRef = useRef(onEdgesChange);
  useEffect(() => {
    onEdgesChangeRef.current = onEdgesChange;
  });
  useEffect(() => {
    onEdgesChangeRef.current?.(shadows);
  }, [shadows]);

  const overlay = (active: boolean, style: React.CSSProperties) => ({
    position: "absolute" as const,
    pointerEvents: "none" as const,
    zIndex: 1,
    opacity: active ? 1 : 0,
    transition: `opacity ${transitionDuration}`,
    ...style,
  });

  return (
    <div style={{ position: "relative", display: "flex", flexDirection: "column", overflow: "hidden", isolation: "isolate", ...style }} {...props}>
      <div
        {...scrollerProps}
        ref={containerRef}
        style={{
          // Last on purpose: these five are what makes the scroller scroll, so
          // they win over anything scrollerProps brings
          ...scrollerProps?.style,
          flex: 1,
          minHeight: 0,
          minWidth: 0,
          overflowY: vertical ? "auto" : "hidden",
          overflowX: horizontal ? "auto" : "hidden",
        }}
      >
        <div
          style={{
            position: "relative",
            minHeight: "100%",
            minWidth: "100%",
            // width: max-content is what keeps the right sentinel at the end of
            // the content. Without it, inline-block shrink-to-fit caps this
            // wrapper at the visible width whenever a block-level child
            // overflows instead of widening (a grid, a table, a flex row), and
            // the sentinel sits at the edge of the viewport: the right
            // indicator would only appear after scrolling a full viewport.
            ...(horizontal && { display: "inline-block", verticalAlign: "top", width: "max-content" }),
          }}
        >
          {vertical && (
            <>
              <div ref={topRef} style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1 }} />
              <div ref={bottomRef} style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1 }} />
            </>
          )}
          {horizontal && (
            <>
              <div ref={leftRef} style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 1 }} />
              <div ref={rightRef} style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 1 }} />
            </>
          )}
          {children}
        </div>
      </div>

      {/* Top */}
      {vertical && shadowColor && <div style={overlay(shadows.top, { top: 0, left: 0, right: 0, height: shadowSize, background: `linear-gradient(to bottom, ${shadowColor}, transparent)` })} />}
      {vertical && lineColor && <div style={overlay(shadows.top, { top: 0, left: 0, right: 0, height: lineSize, background: lineColor })} />}

      {/* Bottom */}
      {vertical && shadowColor && <div style={overlay(shadows.bottom, { bottom: 0, left: 0, right: 0, height: shadowSize, background: `linear-gradient(to top, ${shadowColor}, transparent)` })} />}
      {vertical && lineColor && <div style={overlay(shadows.bottom, { bottom: 0, left: 0, right: 0, height: lineSize, background: lineColor })} />}

      {/* Left */}
      {horizontal && shadowColor && <div style={overlay(shadows.left, { left: 0, top: 0, bottom: 0, width: shadowSize, background: `linear-gradient(to right, ${shadowColor}, transparent)` })} />}
      {horizontal && lineColor && <div style={overlay(shadows.left, { left: 0, top: 0, bottom: 0, width: lineSize, background: lineColor })} />}

      {/* Right */}
      {horizontal && shadowColor && <div style={overlay(shadows.right, { right: 0, top: 0, bottom: 0, width: shadowSize, background: `linear-gradient(to left, ${shadowColor}, transparent)` })} />}
      {horizontal && lineColor && <div style={overlay(shadows.right, { right: 0, top: 0, bottom: 0, width: lineSize, background: lineColor })} />}
    </div>
  );
}
