import { useRef } from "react";
import gsap from "gsap";

export default function ProductCard({ image, title }) {
  const cardRef = useRef(null);

  const hoverIn = () => {
    gsap.to(cardRef.current, {
      scale: 1.05,
      boxShadow: "0px 20px 60px rgba(212,175,55,0.3)",
      duration: 0.4,
    });
  };

  const hoverOut = () => {
    gsap.to(cardRef.current, {
      scale: 1,
      boxShadow: "0px 10px 30px rgba(0,0,0,0.5)",
      duration: 0.4,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={hoverIn}
      onMouseLeave={hoverOut}
      className="bg-black rounded-3xl p-4 cursor-pointer"
    >
      <img
        src={image}
        alt={title}
        className="rounded-2xl object-cover h-64 w-full"
      />
      <h3 className="mt-4 text-lg text-gold font-semibold">{title}</h3>
    </div>
  );
}
