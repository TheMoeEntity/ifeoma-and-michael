import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: "#1a1208",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1.5px solid rgba(235,172,25,0.65)",
        }}
      >
        <span
          style={{
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            fontSize: 11,
            color: "#EBAC19",
            letterSpacing: "0.5px",
            lineHeight: 1,
            marginTop: 1,
          }}
        >
          I&M
        </span>
      </div>
    ),
    { ...size },
  );
}
