"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Hydraulic Covers",
    slug: "hydraulic-covers",
    image: "/products/hydraulic-cover.png",
  },
  {
    id: 2,
    name: "Manhole Covers",
    slug: "manhole-covers",
    image: "/products/manhole-cover.png",
  },
  {
    id: 3,
    name: "Siphons",
    slug: "siphons",
    image: "/products/siphon.png",
  },
  {
    id: 4,
    name: "Surface Boxes",
    slug: "surface-boxes",
    image: "/products/surface-box.png",
  },
];

export default function ProductSection() {
  return (
    <section className="w-full bg-white py-12 md:py-16 font-sans overflow-hidden border-t border-black/5">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
               <h2 className="text-3xl md:text-5xl font-serif font-semibold text-bg-dark tracking-tight">Our Core Products</h2>
               <p className="text-bg-dark/60 mt-3 md:text-lg font-sans font-normal">Premium casting solutions built for the world's most demanding infrastructure.</p>
            </div>
            
            <Link href="/products" className="shrink-0 flex items-center justify-center gap-2 bg-brand-primary text-white font-sans font-bold px-8 py-3.5 rounded-full hover:bg-brand-primary/90 transition-colors shadow-sm">
                View All Products
                <ArrowRight className="w-4 h-4" />
            </Link>
        </div>

        {/* Product Grid (1 column on mobile, 2 columns on md) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pb-8">
          
          {/* Product Cards */}
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.slug}`} className="pointer-events-auto h-full block">
              <motion.div
                className="w-full min-h-[360px] md:min-h-[440px] bg-brand-primary/5 rounded-2xl md:rounded-3xl p-6 md:p-8 flex flex-col items-center justify-between relative group overflow-hidden border border-brand-ash/10 hover:bg-brand-primary/10 transition-colors duration-300 h-full"
              >
                {/* Product Info (Top) */}
                <div className="w-full flex items-center justify-between z-10 mb-6 md:mb-8">
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-bg-dark tracking-tight">
                    {product.name}
                  </h3>
                  <div className="w-10 h-10 rounded-full bg-white flex shrink-0 items-center justify-center border border-brand-ash/20 text-brand-primary shadow-sm group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                    <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                  </div>
                </div>

                {/* Image Container */}
                <div className="flex-1 w-full flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-2/3 md:w-3/4 max-h-[220px] md:max-h-[300px] object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"
                    draggable="false"
                  />
                </div>
              </motion.div>
            </Link>
          ))}
          
        </div>
      </div>
    </section>
  );
}
