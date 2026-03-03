import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

const GRADIENTS: Record<string, [string, string]> = {
  zodiac:    ["#7C3AED", "#4C1D95"],
  education: ["#2563EB", "#1E3A8A"],
  love:      ["#EC4899", "#9D174D"],
  career:    ["#10B981", "#064E3B"],
  kculture:  ["#F59E0B", "#78350F"],
  default:   ["#7C3AED", "#1A1A2E"],
};

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title    = searchParams.get("title")    ?? "Saju Reading";
  const category = searchParams.get("category") ?? "default";

  const [colorA, colorB] = GRADIENTS[category] ?? GRADIENTS.default;

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0A0A0F",
          padding: "64px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Gradient accent bar top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: `linear-gradient(to right, ${colorA}, ${colorB})`,
          }}
        />

        {/* Glow circle */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-120px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${colorA}33, transparent 70%)`,
          }}
        />

        {/* Top: logo text */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: `2px solid ${colorA}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: colorA,
              fontSize: "18px",
            }}
          >
            ✦
          </div>
          <span style={{ color: "#ffffff", fontSize: "22px", fontWeight: 700, letterSpacing: "3px" }}>
            SAJU
          </span>
          <span style={{ color: colorA, fontSize: "22px", fontWeight: 400, letterSpacing: "3px" }}>
            MUSE
          </span>
        </div>

        {/* Center: title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <div
            style={{
              color: colorA,
              fontSize: "16px",
              fontWeight: 700,
              letterSpacing: "4px",
              textTransform: "uppercase",
            }}
          >
            {category.toUpperCase()}
          </div>
          <div
            style={{
              color: "#ffffff",
              fontSize: title.length > 50 ? "42px" : "52px",
              fontWeight: 800,
              lineHeight: 1.2,
              maxWidth: "900px",
            }}
          >
            {title}
          </div>
        </div>

        {/* Bottom: domain */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <span style={{ color: "#6B7280", fontSize: "18px" }}>
            sajumuse.com
          </span>
        </div>

        {/* Gradient accent bar bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: `linear-gradient(to right, ${colorA}44, ${colorB}44)`,
          }}
        />
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
