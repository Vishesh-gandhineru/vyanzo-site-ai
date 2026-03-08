"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function EnvironmentSection() {
  const t = useTranslations("EnvironmentSection");

  return (
    <section className="w-full section-xl bg-white overflow-hidden font-sans border-t border-black/5">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          {/* Left Column: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 flex flex-col justify-center"
          >
            <h2 className="text-body-lg font-serif font-semibold tracking-widest  text-brand-primary mb-8 flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary"></span>
              {t("subtitle")}
            </h2>

            <h3 className="text-section-h2 font-serif font-bold text-bg-dark leading-[1.1] mb-8">
              {t("titleStart")}
              <span className="text-brand-primary italic">
                {t("titleHighlight")}
              </span>
              {t("titleEnd")}
            </h3>

            <p className="text-body-lg text-bg-dark/60 font-sans font-normal leading-relaxed mb-12 max-w-xl">
              {t("description")}
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <div className="flex items-center gap-3 bg-brand-primary/10 px-5 py-3 rounded-full">
                <span className="w-2 h-2 rounded-full bg-brand-primary"></span>
                <span className="text-xs font-sans font-bold tracking-wide text-bg-dark">
                  {t("badges.coal")}
                </span>
              </div>
              <div className="flex items-center gap-3 bg-brand-primary/10 px-5 py-3 rounded-full">
                <span className="w-2 h-2 rounded-full bg-brand-primary"></span>
                <span className="text-xs font-sans font-bold tracking-wide text-bg-dark ">
                  {t("badges.solar")}
                </span>
              </div>
              <div className="flex items-center gap-3 bg-brand-primary/10 px-5 py-3 rounded-full">
                <span className="w-2 h-2 rounded-full bg-brand-primary"></span>
                <span className="text-xs font-sans font-bold tracking-wide text-bg-dark ">
                  {t("badges.iso")}
                </span>
              </div>
            </div>
            <Link href="/sustainability" className="w-full md:w-auto">
              <button className="btn-primary">{t("cta")}</button>
            </Link>
          </motion.div>

          {/* Right Column: Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/2 w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-4xl overflow-hidden"
          >
            <img
              src="/solar_panal.jpg"
              alt="Sustainable environmental road"
              className="w-full h-full object-cover grayscale-30"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
