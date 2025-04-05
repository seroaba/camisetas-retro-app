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

  const generate = async () => {
    const prompt = `A 1990s vintage sports t-shirt design in style: ${selected}. Central image of a Spanish player celebrating, retro typography with name and number, worn-out textures, lightning, flames, stars or local pride depending on the style. Collage style, for printing on black t-shirts.`;

    const response = await fetch("https://69d84f25-6ade-44af-b875-d57087462b8e-00-v5b8y1m7nl4w.riker.replit.dev/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();
    setImages(data.images);
  };

  return (
    <div style={{ padding: 20 }}>
      <Head>
        <title>Camisetas Retro con IA</title>
      </Head>
      <h1>Generador de camisetas retro</h1>
      <p>Selecciona un estilo:</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {styles.map(style => (
          <button
            key={style}
            onClick={() => setSelected(style)}
            style={{
              padding: 10,
              backgroundColor: selected === style ? '#cceeff' : 'white',
              border: '1px solid #ccc',
              borderRadius: 5
            }}
          >
            {style}
          </button>
        ))}
      </div>

      <button
        onClick={generate}
        style={{
          marginTop: 20,
          padding: 10,
          fontSize: 16,
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: 5
        }}
      >
        Generar diseños
      </button>

      <div style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {images.map((url, i) => (
          <img key={i} src={url} alt={`Diseño ${i}`} width={200} />
        ))}
      </div>
    </div>
  );
}
