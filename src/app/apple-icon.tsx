import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

// Apple Icon component
export default function AppleIcon() {
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
          position: "relative",
        }}
      >
        {/* Background glows */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "15%",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(20, 241, 217, 0.3) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "15%",
            right: "20%",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(96, 165, 250, 0.3) 0%, transparent 70%)",
          }}
        />

        {/* Logo text */}
        <div
          style={{
            fontSize: 48,
            fontWeight: 900,
            color: "white",
            display: "flex",
            letterSpacing: "-1px",
          }}
        >
          SORT
          <span style={{ color: "#14F1D9" }}>I</span>S
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "30%",
            fontSize: 28,
            fontWeight: 700,
            color: "white",
            letterSpacing: "2px",
          }}
        >
          IQ
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
