import { useEffect } from "react";
import gsap from "gsap";

export default function FloatingHearts() {
  useEffect(() => {
    gsap.utils.toArray(".heart").forEach((heart) => {
      gsap.fromTo(
        heart,
        { y: 100, opacity: 0 },
        {
          y: -window.innerHeight,
          opacity: 1,
          duration: gsap.utils.random(6, 10),
          repeat: -1,
          delay: gsap.utils.random(0, 3),
          ease: "none",
        },
      );
    });
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="heart absolute text-xl"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: "-20px",
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
}
