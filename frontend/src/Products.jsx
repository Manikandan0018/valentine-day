import ProductCard from "./ProductCard";

export default function Products() {
  const items = [
    { title: "Red Roses Box", image: "/roses.jpg" },
    { title: "Love Crystal", image: "/crystal.jpg" },
    { title: "Flower Card", image: "/card.jpg" },
  ];

  return (
    <section className="py-20 px-8 max-w-7xl mx-auto">
      

      <div className="grid md:grid-cols-3 gap-10">
        {items.map((item, i) => (
          <ProductCard key={i} {...item} />
        ))}
      </div>
    </section>
  );
}
