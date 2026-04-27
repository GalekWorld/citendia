import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(135deg, #f8fbff 0%, #eef4ff 55%, #dde8ff 100%)",
          padding: "72px",
          fontFamily: "sans-serif"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            borderRadius: "36px",
            border: "1px solid #d9e4f5",
            background: "rgba(255,255,255,0.92)",
            padding: "54px"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #36a2ff 0%, #1854ff 100%)",
                color: "#ffffff",
                fontSize: 34,
                fontWeight: 800
              }}
            >
              C
            </div>
            <span style={{ fontSize: 34, fontWeight: 700, color: "#091126" }}>Citendia</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "18px", maxWidth: "820px" }}>
            <span style={{ color: "#1854ff", fontSize: 24, fontWeight: 600 }}>Agentes de llamadas y mensajes para negocios</span>
            <span style={{ color: "#071027", fontSize: 74, lineHeight: 1.02, fontWeight: 800 }}>
              Automatiza llamadas, mensajes, citas y reservas.
            </span>
            <span style={{ color: "#5b6a84", fontSize: 28, lineHeight: 1.4 }}>
              Atención 24/7 para negocios en España que no quieren perder clientes.
            </span>
          </div>
        </div>
      </div>
    ),
    size
  );
}
