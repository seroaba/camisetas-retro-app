export default function handler(req, res) {
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({ error: 'No permitido en producción' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'No se ha detectado la API Key' });
  }

  return res.status(200).json({ message: 'API Key detectada correctamente' });
}
