"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function ProductSection() {
  const t = useTranslations("ProductSection");

  const products = [
    {
      id: 2,
      name: t("products.manhole"),
      category: "Manhole Covers",
      image: "/Manhole_home.png",
    },
    {
      id: 3,
      name: t("products.siphons"),
      category: "Siphons",
      image: "/Siphon_Home.png",
    },
    {
      id: 4,
      name: t("products.surfaceBoxes"),
      category: "Surface Boxes",
      image: "/SurfaceBoxes_home.png",
    },
  ];

  return (
    <section className="w-full bg-white section-xl font-sans overflow-hidden border-t border-black/5">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <div className="text-body-lg font-serif font-semibold tracking-widest text-brand-primary  mb-6 flex items-center gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary"></span>
              {t("subtitle")}
            </div>
            <h2 className="text-section-h2 font-serif text-bg-dark tracking-tight">
              {t("titleStart")}
              <span className="text-brand-primary italic">
                {t("titleHighlight")}
              </span>
            </h2>
            <p className="text-bg-dark/60 mt-3 text-body-xl font-sans font-normal">
              {t("description")}
            </p>
          </div>

          <Link
            href="/products"
            className="btn-primary flex gap-xs  justify-center items-center"
          >
            {t("viewAll")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Product Grid (1 column on mobile, 2 columns on md) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pb-8">
          {/* Product Cards */}
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products?category=${encodeURIComponent(product.category)}`}
              className="pointer-events-auto h-full block"
            >
              <motion.div className="w-full min-h-[360px] md:min-h-[360px] bg-brand-primary/5 rounded-2xl md:rounded-3xl p-6 md:p-8 flex flex-col items-center justify-between relative group overflow-hidden border border-brand-ash/10 hover:bg-brand-primary/10 transition-colors duration-300 h-full">
                {/* Product Info (Top) */}
                <div className="w-full flex items-center justify-between z-10 mb-6 md:mb-8">
                  <h3 className="text-card-title font-serif font-semibold text-bg-dark tracking-tight">
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
                    className="w-2/3 md:w-3/4 max-h-[220px] md:max-h-[240px] object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"
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
