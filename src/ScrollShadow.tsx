import { useEffect, useRef, useState } from "react";

export type ScrollShadowDirection = "vertical" | "horizontal" | "both";

export interface ScrollShadowProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: ScrollShadowDirection;
  shadowColor?: string;
  shadowSize?: number;
}

export function ScrollShadow({
  direction = "vertical",
  shadowColor = "rgba(0, 0, 0, 0.15)",
  shadowSize = 20,
  children,
  style,
  ...props
}: ScrollShadowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
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
  }, [direction]);

  return (
    <div style={{ position: "relative", overflow: "hidden", ...style }} {...props}>
      <div
        ref={containerRef}
        style={{
          overflowY: vertical ? "auto" : "hidden",
          overflowX: horizontal ? "auto" : "hidden",
          height: "100%",
          width: "100%",
        }}
      >
        <div
          style={{
            position: "relative",
            minHeight: "100%",
            minWidth: "100%",
            ...(horizontal && { display: "inline-block", verticalAlign: "top" }),
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

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: shadowSize,
          background: `linear-gradient(to bottom, ${shadowColor}, transparent)`,
          pointerEvents: "none",
          opacity: shadows.top ? 1 : 0,
          transition: "opacity 0.2s",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: shadowSize,
          background: `linear-gradient(to top, ${shadowColor}, transparent)`,
          pointerEvents: "none",
          opacity: shadows.bottom ? 1 : 0,
          transition: "opacity 0.2s",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: shadowSize,
          background: `linear-gradient(to right, ${shadowColor}, transparent)`,
          pointerEvents: "none",
          opacity: shadows.left ? 1 : 0,
          transition: "opacity 0.2s",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: shadowSize,
          background: `linear-gradient(to left, ${shadowColor}, transparent)`,
          pointerEvents: "none",
          opacity: shadows.right ? 1 : 0,
          transition: "opacity 0.2s",
          zIndex: 1,
        }}
      />
    </div>
  );
}
