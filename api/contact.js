import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const TIPO_LABELS = {
  tractor: "Tractores",
  pala: "Palas cargadoras",
  elevador: "Elevadores",
  vial: "Equipos viales",
  sembradora: "Sembradoras",
  rastra: "Rastras",
  acoplado: "Acoplados",
  implemento: "Implementos",
  usado: "Maquinaria usada",
  repuesto: "Repuestos",
  otro: "Otro / consultar",
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { nombre, tel, email, localidad, tipo, mensaje, financiamiento } =
    req.body;

  if (!nombre || !tel || !mensaje) {
    return res.status(400).json({ error: "Faltan campos requeridos" });
  }

  try {
    await resend.emails.send({
      from: "Ranzuglia SRL <onboarding@resend.dev>",
      to: ["aleranzu@gmail.com", "ranzugliasrl@gmail.com"],
      subject: `Nueva consulta de ${nombre} — Ranzuglia SRL`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="border-bottom: 2px solid #facc15; padding-bottom: 8px;">
            Nueva consulta desde el sitio web
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 140px;">Nombre</td>
              <td style="padding: 8px 0;">${nombre}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 8px 0; font-weight: bold;">Teléfono</td>
              <td style="padding: 8px 0;">${tel}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Email</td>
              <td style="padding: 8px 0;">${email || "—"}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 8px 0; font-weight: bold;">Localidad</td>
              <td style="padding: 8px 0;">${localidad || "—"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Maquinaria</td>
              <td style="padding: 8px 0;">${TIPO_LABELS[tipo] || tipo || "—"}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 8px 0; font-weight: bold;">Financiamiento</td>
              <td style="padding: 8px 0;">${financiamiento ? "Sí, interesado" : "No"}</td>
            </tr>
          </table>
          <div style="margin-top: 16px; padding: 16px; background: #f3f4f6; border-left: 4px solid #facc15;">
            <p style="margin: 0; font-weight: bold;">Mensaje:</p>
            <p style="margin: 8px 0 0;">${mensaje}</p>
          </div>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Resend error:", error);
    return res.status(500).json({ error: "Error al enviar el email" });
  }
}
