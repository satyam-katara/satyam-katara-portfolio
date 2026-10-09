import { ImageResponse } from "next/og";
import { identity } from "@/data/content";

export const runtime = "edge";
export const alt = "Satyam Katara — Data Analyst";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage(): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #050816 0%, #0A0F24 100%)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #3B82F6, #22D3EE)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              fontWeight: 700,
            }}
          >
            {identity.monogram}
          </div>
          <div style={{ fontSize: "24px", color: "#22D3EE" }}>
            {identity.availability.label}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: "72px",
            fontWeight: 800,
            lineHeight: 1.1,
          }}
        >
          <span>Turning Raw Data Into</span>
          <span>Actionable Insights.</span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "24px",
            fontSize: "30px",
            color: "#94a3b8",
          }}
        >
          <span>
            {identity.name} — {identity.title}
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
