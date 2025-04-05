export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { style } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.error("FALTA LA OPENAI_API_KEY en las variables de entorno");
    return res.status(500).json({ error: "No se encontró la API Key en el servidor" });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt: `Camiseta retro de estilo ${style} para un equipo deportivo local. Diseño llamativo, estilo años 90, tipo NBA.`,
        n: 1,
        size: '512x512',
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error("Error de OpenAI:", data.error.message);
      throw new Error(data.error.message);
    }

    return res.status(200).json({ image: data.data[0].url });
  } catch (error) {
    console.error("Error generando imagen:", error.message);
    return res.status(500).json({ error: error.message });
  }
}
