import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Icon component
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0A1628 0%, #0F2847 100%)",
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 900,
            color: "white",
            display: "flex",
            letterSpacing: "-0.5px",
          }}
        >
          SORT
          <span style={{ color: "#14F1D9" }}>I</span>S
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
