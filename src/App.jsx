import React, { useEffect, useState, useRef } from "react";
import "./App.css";

export default function App() {
  const [entered, setEntered] = useState(false);
  const [current, setCurrent] = useState(0);
  const [letterOpen, setLetterOpen] = useState(false);
  const [typedText, setTypedText] = useState("");
  const audioRef = useRef(null);

  const fullText = `
Your love is my strength.
Your smile is my peace.

NEELIMA, you are my heart,
my home, and my greatest blessing.

May your life shine as beautifully
as the love you give every day.
`;

  const images = [
    "mom/1.jpeg",
    "mom/2.jpeg",
    "mom/3.jpeg",
    "mom/4.jpeg",
    "mom/5.jpeg",
  ];

  // Slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Music Fade-in
  useEffect(() => {
    if (entered && audioRef.current) {
      const audio = audioRef.current;
      audio.volume = 0;
      audio.play().catch(() => {});
      let vol = 0;
      const fade = setInterval(() => {
        if (vol < 1) {
          vol += 0.05;
          audio.volume = vol;
        } else {
          clearInterval(fade);
        }
      }, 200);
    }
  }, [entered]);

  // Typewriter effect when letter opens
  useEffect(() => {
    if (!letterOpen) return;

    let i = 0;
    setTypedText("");
    const typing = setInterval(() => {
      setTypedText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(typing);
    }, 40);

    return () => clearInterval(typing);
  }, [letterOpen]);

  return (
    <div className="container">
      {!entered && (
        <div className="intro" onClick={() => setEntered(true)}>
          <h1>For My Dearest Amma</h1>
          <p>Tap to Begin ❤️</p>
        </div>
      )}

      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}music.mp3`}
        loop
      />

      {entered && (
        <>
          <div className="petals"></div>

          <div className="hero">
            <h1 className="title">Happy Birthday</h1>
            <h2 className="name">NEELIMA</h2>
          </div>

          <div className="slideshow">
            {images.map((img, index) => (
              <img
                key={index}
                src={`${import.meta.env.BASE_URL}${img}`}
                className={index === current ? "active" : ""}
                alt="amma"
              />
            ))}
          </div>

          {/* LETTER TRIGGER */}
          {!letterOpen && (
            <div className="open-letter">
              <button onClick={() => setLetterOpen(true)}>
                📜 Open Letter
              </button>
            </div>
          )}

          {/* LETTER CONTENT */}
          {letterOpen && (
            <div className="letter-section">
              <div className="letter fadeInLetter">
                <h3>To My Dearest Amma,</h3>
                <p className="typewriter">{typedText}</p>
                <p className="signature">
                  With Endless Love,<br />Your Child ❤️
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
