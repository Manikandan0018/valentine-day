import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import confetti from "canvas-confetti";

export const LoveBtn = () => {
  const [isAccepted, setIsAccepted] = useState(false);
  const containerRef = useRef(null);

  // CLICK HANDLER
  const handleFinalSurprise = () => {
    setIsAccepted(true);

    // ❤️ Confetti
    confetti({
      particleCount: 160,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#ff4d6d", "#fb7185", "#fda4af"],
    });

    // ✨ Light burst
    gsap.fromTo(
      ".light-effect",
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1.4, duration: 1.5, ease: "power4.out" },
    );
  };

  // 🦋 BUTTERFLY ANIMATION (runs AFTER render)
  useEffect(() => {
    if (!isAccepted) return;

    gsap.fromTo(
      ".butterfly",
      {
        opacity: 0,
        y: 0,
        x: 0,
        scale: 0.6,
      },
      {
        opacity: 1,
        x: () => gsap.utils.random(-300, 300),
        y: () => gsap.utils.random(-600, -window.innerHeight),
        rotation: () => gsap.utils.random(-360, 360),
        scale: () => gsap.utils.random(0.8, 1.3),
        duration: () => gsap.utils.random(3, 6),
        stagger: 0.08,
        ease: "power2.out",
      },
    );
  }, [isAccepted]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-white overflow-hidden flex items-center justify-center px-4"
    >
      {/* LIGHT EFFECT */}
      <div className="light-effect fixed inset-0 z-40 pointer-events-none opacity-0 bg-gradient-radial from-white via-rose-200 to-transparent mix-blend-screen" />

      {/* BUTTERFLIES */}
      {isAccepted && (
        <div className="fixed inset-0 z-30 pointer-events-none">
          {[...Array(18)].map((_, i) => (
            <span
              key={i}
              className="butterfly absolute bottom-20 left-1/2 text-3xl"
              style={{ transform: "translateX(-50%)" }}
            >
              🦋
            </span>
          ))}
        </div>
      )}

      {/* PROPOSAL BOX */}
      <div
        className={`relative z-20 transition-all duration-1000 ${
          isAccepted
            ? "opacity-0 scale-150 blur-xl pointer-events-none"
            : "opacity-100 scale-100"
        }`}
      >
        <div className="relative flex items-center justify-center">
          {/* 🌸 ROSE BOKEH GLOW (BEHIND BUTTON) */}
          <div className="absolute -inset-20 rounded-full bg-gradient-to-r from-rose-300 via-pink-400 to-rose-300 blur-[120px] opacity-60 animate-pulse pointer-events-none" />

          <div className="absolute -inset-32 rounded-full bg-rose-400 blur-[180px] opacity-30 pointer-events-none" />

          {/* ❤️ MAIN BUTTON */}
          <button
            onClick={handleFinalSurprise}
            className="relative cursor-pointer merienda-uniquifier z-10 px-14 py-5 rounded-full 
               bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600
               text-white font-semibold text-lg tracking-wide
               shadow-[0_20px_60px_rgba(244,63,94,0.6)]
               transition-all duration-300
               hover:scale-110 active:scale-95
               focus:outline-none"
          >
            <span className="flex items-center gap-3">🌹 YES, FOREVER ❤️</span>
          </button>
        </div>
      </div>

      {/* FINAL MESSAGE */}
      {isAccepted && (
        <div className="fixed z-50 text-center animate-[fadeIn_2s_ease-in_forwards]">
          <h1 className="lavishly-yours-regular text-5xl sm:text-7xl md:text-9xl text-rose-600 drop-shadow-[0_0_30px_rgba(255,255,255,1)]">
            I Love You!
          </h1>
          <p className="mt-4 text-rose-400 tracking-[0.5em] uppercase animate-pulse text-xs sm:text-sm">
            Forever Starts Now
          </p>
        </div>
      )}

      {/* STYLES */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lavishly+Yours&display=swap');

        .lavishly-yours-regular {
          font-family: "Lavishly Yours", cursive;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }

        .bg-gradient-radial {
          background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(253,164,175,0.8) 40%, transparent 70%);
        }
      `}</style>
    </div>
  );
};
