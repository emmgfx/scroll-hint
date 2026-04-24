import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "scroll-hint — Scroll edge indicators for React";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#08060d",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(170,59,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(170,59,255,0.07) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: -200,
            left: "50%",
            transform: "translateX(-50%)",
            width: 800,
            height: 500,
            background: "radial-gradient(ellipse, rgba(170,59,255,0.25) 0%, transparent 70%)",
          }}
        />

        {/* npm badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "8px 20px",
            borderRadius: 999,
            border: "1px solid rgba(170,59,255,0.4)",
            background: "rgba(170,59,255,0.1)",
            marginBottom: 32,
          }}
        >
          <span style={{ fontFamily: "monospace", fontSize: 22, color: "#c084fc" }}>
            npm install @emmgfx/scroll-hint
          </span>
        </div>

        {/* Title */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 0, marginBottom: 20 }}>
          <span style={{ fontSize: 96, fontWeight: 500, color: "#f3f4f6", letterSpacing: "-4px" }}>
            scroll-
          </span>
          <span style={{ fontSize: 96, fontWeight: 500, color: "#aa3bff", letterSpacing: "-4px" }}>
            hint
          </span>
        </div>

        {/* Description */}
        <p
          style={{
            fontSize: 26,
            color: "#9ca3af",
            margin: 0,
            textAlign: "center",
            maxWidth: 700,
            lineHeight: 1.5,
          }}
        >
          Scroll edge indicators for React — no scroll events, just IntersectionObserver.
        </p>
      </div>
    ),
    size
  );
}
