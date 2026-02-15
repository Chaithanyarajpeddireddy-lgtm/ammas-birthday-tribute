import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// =====================================
// RESPONSIVE CINEMATIC VERSION
// Works on Mobile + Laptop + Tablet
// GitHub / Vercel Ready
// =====================================

// SETUP:
// - Put photos inside: public/mom/
// - Rename as: 1.jpg, 2.jpg, 3.jpg ...
// - Put music file as: public/music.mp3

const images = [
  "/mom/1.jpeg",
  "/mom/2.jpeg",
  "/mom/3.jpeg",
  "/mom/4.jpeg",
  "/mom/5.jpeg",
];

const letterText = `My Dearest Amma Neelima,\n\nYou are the calm in my chaos, the light in my darkest days, and the warmth that makes our house a home.\n\nEvery sacrifice you made silently, every prayer you whispered for me — I carry them in my heart forever.\n\nYou are my strength. My blessing. My forever inspiration.\n\nHappy Birthday, Neelima ❤️\nMay this year bring you peace, health, and beautiful moments.\n\nLove you forever.`;

export default function App() {
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [openLetter, setOpenLetter] = useState(false);
  const [typedText, setTypedText] = useState("");

  // Loader
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Slideshow
  useEffect(() => {
    if (!loading) {
      const interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % images.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [loading]);

  // Typing Effect
  useEffect(() => {
    if (openLetter) {
      let i = 0;
      setTypedText("");
      const typing = setInterval(() => {
        setTypedText(letterText.slice(0, i));
        i++;
        if (i > letterText.length) clearInterval(typing);
      }, 25);
      return () => clearInterval(typing);
    }
  }, [openLetter]);

  if (loading) {
    return (
      <div style={{
        height: "100vh",
        background: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "white",
        textAlign: "center",
        padding: "20px"
      }}>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          style={{ fontSize: "clamp(28px, 6vw, 42px)" }}
        >
          For My Amma
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{ marginTop: "15px", fontSize: "clamp(18px, 4vw, 24px)", color: "#f472b6" }}
        >
          NEELIMA ❤️
        </motion.p>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(to bottom, #000000, #111111)",
      color: "white",
      fontFamily: "Segoe UI, sans-serif",
      overflowX: "hidden",
      position: "relative",
      paddingBottom: "60px"
    }}>

      <audio src="/music.mp3" autoPlay loop />

      {/* Title */}
      <div style={{ textAlign: "center", paddingTop: "60px", paddingInline: "20px" }}>
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          style={{ fontSize: "clamp(30px, 6vw, 52px)" }}
        >
          Happy Birthday
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{ fontSize: "clamp(26px, 5vw, 44px)", color: "#f472b6" }}
        >
          NEELIMA ❤️
        </motion.h2>
      </div>

      {/* Slideshow */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "40px", paddingInline: "20px" }}>
        <div style={{
          width: "100%",
          maxWidth: "900px",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 0 50px rgba(255,105,180,0.3)"
        }}>
          <AnimatePresence mode="wait">
            <motion.img
              key={current}
              src={images[current]}
              alt="Neelima"
              style={{
                width: "100%",
                height: "clamp(250px, 60vw, 520px)",
                objectFit: "cover"
              }}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
            />
          </AnimatePresence>
        </div>
      </div>

      {/* Letter Button */}
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <button
          onClick={() => setOpenLetter(!openLetter)}
          style={{
            padding: "12px 26px",
            fontSize: "clamp(16px, 3.5vw, 18px)",
            borderRadius: "30px",
            border: "none",
            backgroundColor: "#be185d",
            color: "white",
            cursor: "pointer"
          }}
        >
          {openLetter ? "Close Letter" : "Open Special Letter"}
        </button>
      </div>

      {/* Letter */}
      <AnimatePresence>
        {openLetter && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{
              maxWidth: "900px",
              margin: "40px auto",
              backgroundColor: "rgba(255,255,255,0.05)",
              padding: "clamp(20px, 5vw, 40px)",
              borderRadius: "20px",
              lineHeight: "1.8",
              whiteSpace: "pre-line",
              backdropFilter: "blur(10px)",
              fontSize: "clamp(16px, 3.5vw, 18px)",
              marginInline: "20px"
            }}
          >
            {typedText}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Hearts */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "100vh", x: Math.random() * 100 + "%" }}
            animate={{ y: "-10vh" }}
            transition={{ duration: 10 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 5 }}
            style={{ position: "absolute", fontSize: "20px", opacity: 0.3 }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      {/* Cinematic Glow */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 0.2 }}
            transition={{ duration: 4, repeat: Infinity, delay: i * 2 }}
            style={{
              position: "absolute",
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              background: "#ec4899",
              filter: "blur(120px)",
              top: `${Math.random() * 70}%`,
              left: `${Math.random() * 70}%`
            }}
          />
        ))}
      </div>
    </div>
  );
}
