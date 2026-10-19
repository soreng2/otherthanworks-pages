import { ImageResponse } from "next/og";
export const alt = "OTHER THAN WORKS — CLASS & DESIGN STUDIO";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: "#FAEBCE",
        color: "#292A30",
        padding: 80,
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", fontSize: 20, letterSpacing: 5 }}>
        CLASS, DESIGN & SOMETHING ELSE
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 100,
          fontWeight: 700,
          lineHeight: 1.05,
          letterSpacing: -6,
        }}
      >
        OTHER
        <br />
        THAN WORKS.
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 21,
        }}
      >
        <span>LEARN. MAKE. GO YOUR OWN WAY.</span>
        <span>↗</span>
      </div>
    </div>,
    size,
  );
}
