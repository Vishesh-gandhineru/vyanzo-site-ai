"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef, useEffect, useState } from "react";

const products = [
  {
    id: 1,
    name: "Hydraulic Covers",
    image: "/products/hydraulic-cover.png",
  },
  {
    id: 2,
    name: "Manhole Covers",
    image: "/products/manhole-cover.png",
  },
  {
    id: 3,
    name: "Siphons",
    image: "/products/siphon.png",
  },
  {
    id: 4,
    name: "Surface Boxes",
    image: "/products/surface-box.png",
  },
];

export default function ProductSection() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current) {
        setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <section className="w-full bg-white py-24 font-sans overflow-hidden border-t border-black/5">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="mb-12 flex items-center justify-between gap-4">
            <div>
               <h2 className="text-3xl md:text-5xl font-semibold text-bg-dark tracking-tight">Our Core Products</h2>
               <p className="text-bg-dark/60 mt-3 md:text-lg">Premium casting solutions built for the world's most demanding infrastructure.</p>
            </div>
        </div>
      </div>

      {/* Draggable Carousel Container */}
      <div ref={carouselRef} className="overflow-hidden w-full cursor-grab active:cursor-grabbing pb-8">
        <motion.div 
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          whileTap={{ cursor: "grabbing" }}
          className="flex gap-4 md:gap-6 w-max px-4 md:px-8"
          // Add padding matching the max-w container alignment on larger screens
          style={{ paddingLeft: "calc(max(1rem, (100vw - 1400px) / 2 + 2rem))", paddingRight: "calc(max(1rem, (100vw - 1400px) / 2 + 2rem))" }}
        >
          
          {/* Action Card: See All Products */}
          <div 
             className="min-w-[280px] md:min-w-[320px] lg:min-w-[360px] min-h-[320px] md:min-h-[380px] bg-brand-primary rounded-xl md:rounded-3xl p-8 md:p-10 flex flex-col justify-between shrink-0 shadow-lg shadow-brand-primary/20 pointer-events-none"
          >
             <div>
                <h3 className="text-white text-3xl font-bold uppercase tracking-tight leading-none mb-2 pointer-events-auto">View All<br />Products</h3>
                <p className="text-white/80 font-medium mt-4 pointer-events-auto">Explore our complete catalog of industrial castings.</p>
             </div>
             
             <div className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center text-white backdrop-blur-sm self-start mt-auto pointer-events-auto">
                <ArrowRight className="w-5 h-5" />
             </div>
          </div>

          {/* Product Cards */}
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="min-w-[260px] md:min-w-[300px] lg:min-w-[340px] min-h-[320px] md:min-h-[380px] bg-[#eef5ff] rounded-xl md:rounded-3xl p-6 md:p-8 flex flex-col items-center justify-center shrink-0 relative group overflow-hidden pointer-events-none"
            >
              {/* Image Container */}
              <div className="flex-1 w-full flex items-center justify-center mb-16 px-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-out pointer-events-none"
                  draggable="false"
                />
              </div>

              {/* Product Info (pinned to bottom) */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 pt-0 pointer-events-none">
                <h3 className="text-xl md:text-2xl font-semibold text-bg-dark tracking-tight">{product.name}</h3>
              </div>
            </motion.div>
          ))}
          
        </motion.div>
      </div>
    </section>
  );
}
