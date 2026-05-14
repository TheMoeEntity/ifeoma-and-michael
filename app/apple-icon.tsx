import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: "#1a1208",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Outer ring */}
        <div
          style={{
            position: "absolute",
            width: 164,
            height: 164,
            borderRadius: "50%",
            border: "0.8px solid rgba(235,172,25,0.25)",
          }}
        />
        {/* Main ring */}
        <div
          style={{
            position: "absolute",
            width: 150,
            height: 150,
            borderRadius: "50%",
            border: "1.5px solid rgba(235,172,25,0.65)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              fontSize: 58,
              color: "#EBAC19",
              letterSpacing: "2px",
              lineHeight: 1,
              marginTop: 4,
            }}
          >
            I&M
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
