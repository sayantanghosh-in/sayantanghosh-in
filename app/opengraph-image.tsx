import { ImageResponse } from "next/og";

import { SITE } from "@/lib/site";

export const alt = `${SITE.name} — ${SITE.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#faf5ea",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#8a7a63",
            }}
          >
            Tech Lead · Synup · Bengaluru
          </div>
          <div
            style={{
              fontSize: 104,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#241a10",
              marginTop: 26,
              lineHeight: 1,
            }}
          >
            {SITE.name}
          </div>
          <div
            style={{
              fontSize: 34,
              color: "#5b4b36",
              marginTop: 28,
              maxWidth: 880,
              lineHeight: 1.35,
            }}
          >
            I build AI agents — and the evals, tooling and inference behind
            them.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 96, height: 8, background: "#d2601f" }} />
          <div style={{ fontSize: 26, color: "#8a7a63" }}>sayantanghosh.in</div>
        </div>
      </div>
    ),
    size,
  );
}
