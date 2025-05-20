export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const webhookURL = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookURL) {
    return res.status(500).json({ error: "Webhook URL não configurada." });
  }

  try {
    const response = await fetch(webhookURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      throw new Error("Erro ao enviar para o Discord.");
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: "Erro interno no servidor." });
  }
}
