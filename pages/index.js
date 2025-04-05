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

  const generate = async () => {
    const prompt = `A 1990s vintage sports t-shirt design in style: ${selected}. Central image of a Spanish player celebrating, retro typography with name and number, worn-out textures, lightning, flames, stars or local pride depending on the style. Collage style, for printing on black t-shirts.`;

    const response = await fetch("https://69d84f25-6ade-44af-b
