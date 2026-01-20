import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import confetti from "canvas-confetti";

// images
import c1 from "./image/c1.jpg";
import c2 from "./image/c2.jpg";
import c3 from "./image/c3.jpg";
import { LoveBtn } from "./LoveBtn";

gsap.registerPlugin(ScrollTrigger);

export default function ValentineHero() {
  const containerRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ===============================
         1. HERO TEXT SHOW / HIDE
      ================================*/
      gsap.fromTo(
        ".hero-text",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power4.out" },
      );

      ScrollTrigger.create({
        trigger: triggerRef.current,
        start: "top top",
        end: "+=250%",
        onLeave: () => {
          gsap.to(".hero-text", {
            opacity: 0,
            y: -60,
            duration: 0.6,
            ease: "power3.in",
          });
        },
        onEnterBack: () => {
          gsap.to(".hero-text", {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power4.out",
          });
        },
      });

      /* ===============================
         2. IMAGE ASSEMBLY (PINNED)
      ================================*/
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 1,
        },
      });

      tl.fromTo(
        ".img-left",
        { x: "-120vw", rotate: -30 },
        { x: "0%", rotate: -8, duration: 1.5 },
      )
        .fromTo(
          ".img-right",
          { x: "120vw", rotate: 30 },
          { x: "0%", rotate: 8, duration: 1.5 },
          "<",
        )
        .fromTo(
          ".img-center",
          { y: "120vh", scale: 0.5 },
          {
            y: "0%",
            scale: 1.05,
            duration: 2,
            ease: "back.out(1.7)",
          },
          "-=0.8",
        );

      /* ===============================
         3. PROPOSAL SURPRISE REVEAL
      ================================*/
      gsap.fromTo(
        ".proposal-box",
        {
          y: 150,
          opacity: 0,
          scale: 0.8,
          rotateX: -30,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".proposal-container",
            start: "top 70%",
            toggleActions: "play none none reverse",
            onEnter: triggerHearts,
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  /* ===============================
     CONFETTI FUNCTION
  ================================*/
  const triggerHearts = () => {
    const end = Date.now() + 3000;
    const colors = ["#ff4d6d", "#fb7185", "#fda4af"];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  return (
    <div ref={containerRef} className="bg-[#fff5f5] overflow-x-hidden">
      {/* ================= HERO SECTION ================= */}
      <section
        ref={triggerRef}
        className="relative min-h-screen flex items-center justify-center"
      >
        {/* Always visible intro */}
        <div className="absolute top-8 text-center z-20 px-4">
          <p className="lavishly-yours-regular text-rose-400 text-xl sm:text-2xl md:text-3xl">
            From the moment I met you…
          </p>
          <p className="mt-1 text-rose-300 text-[10px] tracking-widest uppercase">
            my heart knew ❤️
          </p>
        </div>

        {/* Animated hero text */}
        <div className="hero-text absolute top-28 sm:top-32 text-center z-30 px-4">
          <p className="text-rose-400 tracking-[0.3em] uppercase text-[10px] mb-3">
            Our Love Story
          </p>
          <h1 className="lavishly-yours-regular text-rose-600 text-5xl sm:text-7xl md:text-9xl leading-tight">
            Made for Each Other
          </h1>
          <p className="mt-3 text-rose-300 italic text-sm sm:text-lg">
            Every heartbeat led me to you
          </p>
        </div>

        {/* Image assembly */}
        <div className="relative w-full max-w-[280px] sm:max-w-md md:max-w-4xl aspect-square flex items-center justify-center mt-40">
          <div className="img-left absolute w-36 sm:w-44 md:w-72">
            <PolaroidFrame image={c1} caption="The Beginning" />
          </div>
          <div className="img-right absolute w-36 sm:w-44 md:w-72">
            <PolaroidFrame image={c3} caption="The Memories" />
          </div>
          <div className="img-center absolute w-44 sm:w-56 md:w-96 shadow-2xl">
            <PolaroidFrame image={c2} caption="Our Forever" isMain />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 animate-bounce text-rose-300 text-xs tracking-widest uppercase">
          Scroll
        </div>
      </section>

      {/* ================= PROPOSAL SECTION ================= */}
      <section className="proposal-container min-h-screen flex items-center justify-center bg-white px-4 py-20">
        <div className="proposal-box w-full max-w-xl md:max-w-2xl text-center p-8 sm:p-12 md:p-20 rounded-[30px] md:rounded-[40px] shadow-xl border">
          <span className="text-4xl">💍</span>

          <p className="lavishly-yours-regular text-2xl sm:text-3xl text-rose-400 mt-4">
            My Dearest…
          </p>

          <h2 className="emilys-candy-regular text-4xl sm:text-6xl md:text-[90px] leading-tight mt-4 text-rose-600">
            Will You Marry Me?
          </h2>

         <LoveBtn/>
        </div>
      </section>

      {/* ================= FONT ================= */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lavishly+Yours&display=swap');
        .lavishly-yours-regular {
          font-family: "Lavishly Yours", cursive;
        }
      `}</style>
    </div>
  );
}

/* ================= PHOTO FRAME ================= */
function PolaroidFrame({ image, caption, isMain = false }) {
  return (
    <div className="bg-white p-2 sm:p-3 pb-8 sm:pb-10 shadow-xl border rounded-sm">
      <img
        src={image}
        alt=""
        className="w-full h-full object-cover aspect-[4/5]"
      />
      <p
        className={`lavishly-yours-regular text-center mt-3 sm:mt-4 text-rose-600 ${
          isMain ? "text-2xl sm:text-3xl md:text-4xl" : "text-lg sm:text-xl"
        }`}
      >
        {caption}
      </p>
    </div>
  );
}
