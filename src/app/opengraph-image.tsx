import { ImageResponse } from "next/og";

// Image metadata
export const alt = "SortisIQ - Smarter Leads. Stronger Books.";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

// Open Graph Image
export default async function Image() {
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
        {/* Background glows - top left */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(20, 241, 217, 0.25) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        {/* Background glow - bottom right */}
        <div
          style={{
            position: "absolute",
            bottom: "-150px",
            right: "-100px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(96, 165, 250, 0.3) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />

        {/* Middle accent glow */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            right: "15%",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(20, 241, 217, 0.15) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "40px",
            }}
          >
            <span
              style={{
                fontSize: "120px",
                fontWeight: 900,
                color: "#FFFFFF",
                letterSpacing: "-3px",
                display: "flex",
              }}
            >
              SORT
              <span style={{ color: "#14F1D9" }}>I</span>S
            </span>
          </div>

          {/* IQ */}
          <div
            style={{
              fontSize: "80px",
              fontWeight: 700,
              color: "#FFFFFF",
              letterSpacing: "8px",
              marginTop: "-20px",
              marginBottom: "50px",
            }}
          >
            IQ
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: "40px",
              color: "#D1D5DB",
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            Smarter Leads.
          </div>
          <div
            style={{
              fontSize: "40px",
              color: "#D1D5DB",
              textAlign: "center",
              fontWeight: 500,
              marginTop: "10px",
            }}
          >
            Stronger Books.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
