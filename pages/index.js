
import Head from 'next/head';
import { useState } from 'react';

const styles = [
  "All-Star Classic",
  "Blacktop Street",
  "Retro Flame",
  "Golden Era",
  "Pixel Ball",
  "Espíritu Local"
];

export default function Home() {
  const [selected, setSelected] = useState(null);
  const [images, setImages] = useState([]);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generate = async () => {
    if (!selected) {
      alert("Selecciona un estilo primero");
      return;
    }

    setLoading(true);
    setImages([]);
    setError(null);

    const prompt = `A 1990s vintage sports t-shirt design in style: ${selected}. Central image of a Spanish player celebrating, retro typography with name and number, worn-out textures, lightning, flames, stars or local pride depending on the style. Collage style, for printing on black t-shirts.`;

    try {
      const response = await fetch("https://69d84f25-6ade-44af-b875-d57087462b8e-00-v5b8y1m7nl4w.riker.replit.dev/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });

      const data = await response.json();
      setImages(data.images || []);
    } catch (err) {
      setError("No se pudo generar la imagen. Revisa el servidor o la API Key.");
    }

    setLoading(false);
    setFormVisible(false);
    setSelectedDesign(null);
    setSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, image: selectedDesign })
    });
    setSubmitted(true);
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif', maxWidth: 900, margin: 'auto' }}>
      <Head>
        <title>Camisetas Retro Personalizadas</title>
      </Head>
      <h1 style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 10 }}>Camisetas Retro con IA</h1>
      <p>Elige un estilo:</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
        {styles.map(style => (
          <button key={style} onClick={() => setSelected(style)} style={{
            padding: 10,
            backgroundColor: selected === style ? '#0070f3' : 'white',
            color: selected === style ? 'white' : 'black',
            border: '1px solid #ccc',
            borderRadius: 5,
            cursor: 'pointer'
          }}>
            {style}
          </button>
        ))}
      </div>

      <button onClick={generate} style={{ padding: 10, fontSize: 16, backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: 5 }}>
        {loading ? "Generando..." : "Generar diseños con IA"}
      </button>

      {error && <p style={{ color: 'red', marginTop: 20 }}>{error}</p>}

      <div style={{ marginTop: 30, display: 'flex', flexWrap: 'wrap', gap: 20 }}>
        {images.map((url, i) => (
          <div key={i} style={{ border: '2px solid #ccc', borderRadius: 10, padding: 10 }}>
            <img src={url} alt={`Diseño ${i}`} width={200} style={{ borderRadius: 5 }} />
            <button onClick={() => { setSelectedDesign(url); setFormVisible(true); }} style={{
              marginTop: 10,
              padding: 8,
              backgroundColor: '#111',
              color: 'white',
              border: 'none',
              borderRadius: 5,
              width: '100%'
            }}>
              Encargar esta camiseta
            </button>
          </div>
        ))}
      </div>

      {formVisible && selectedDesign && (
        <form onSubmit={handleSubmit} style={{ marginTop: 30, padding: 20, border: '1px solid #ccc', borderRadius: 10 }}>
          <h3>Encargar esta camiseta</h3>
          <input type="text" placeholder="Tu nombre" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={{ width: '100%', padding: 8, marginBottom: 10 }} />
          <input type="email" placeholder="Tu correo" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={{ width: '100%', padding: 8, marginBottom: 10 }} />
          <textarea placeholder="Mensaje (equipo, talla, etc)" required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} style={{ width: '100%', padding: 8, marginBottom: 10 }} />
          <button type="submit" style={{ padding: 10, backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: 5 }}>
            Enviar pedido
          </button>
        </form>
      )}

      {submitted && (
        <div style={{ marginTop: 20, padding: 15, backgroundColor: '#dff0d8', border: '1px solid #c3e6cb', borderRadius: 5 }}>
          ¡Gracias! Hemos recibido tu pedido y te contactaremos pronto.
        </div>
      )}
    </div>
  );
}
