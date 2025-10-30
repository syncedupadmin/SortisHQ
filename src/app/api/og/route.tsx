import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "SortisIQ - Smarter Leads. Stronger Books.";

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0B1220 0%, #1a2538 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Glows */}
        <div
          style={{
            position: "absolute",
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(0, 211, 192, 0.2) 0%, transparent 70%)",
            filter: "blur(80px)",
            top: "-200px",
            left: "-200px",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "800px",
            height: "800px",
            background: "radial-gradient(circle, rgba(43, 108, 255, 0.25) 0%, transparent 70%)",
            filter: "blur(100px)",
            bottom: "-300px",
            right: "-300px",
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
            padding: "80px",
            textAlign: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", marginBottom: "40px" }}>
            <span style={{ fontSize: "60px", fontWeight: "bold", color: "#FFFFFF" }}>
              SORT<span style={{ color: "#00D3C0" }}>I</span>S
            </span>
            <span
              style={{ fontSize: "40px", fontWeight: "600", color: "#A9B1BC", marginLeft: "10px" }}
            >
              IQ
            </span>
          </div>

          <h1
            style={{
              fontSize: "64px",
              fontWeight: "bold",
              color: "#FFFFFF",
              lineHeight: 1.2,
              maxWidth: "1000px",
              marginBottom: "20px",
            }}
          >
            {title}
          </h1>

          <p style={{ fontSize: "32px", color: "#A9B1BC", marginTop: "20px" }}>
            Predictive signals and conversion playbooks
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
