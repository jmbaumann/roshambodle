import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge",
};

export default function handler() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#2d2d2d",
          fontSize: 100,
          fontWeight: 600,
        }}
      >
        <div style={{ marginTop: 40 }}>🪨 📄 ✂️</div>
      </div>
    ),
  );
}
