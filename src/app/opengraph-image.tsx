import { ImageResponse } from "next/og";

export const alt = "Anshul Palarpwar — Software Engineer, Backend & AI/ML";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0c0a08",
        color: "#f3eee6",
        padding: "72px",
      }}
    >
      <div
        style={{
          fontSize: 22,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "#d08a3c",
        }}
      >
        Available now · Hyderabad or remote
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 92,
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
            fontFamily: "Georgia, serif",
          }}
        >
          Anshul Palarpwar
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 32,
            color: "#a8a095",
          }}
        >
          Software Engineer · Backend & AI/ML · ETHSanFrancisco 2025 1st Prize
        </div>
      </div>
    </div>,
    { ...size },
  );
}
