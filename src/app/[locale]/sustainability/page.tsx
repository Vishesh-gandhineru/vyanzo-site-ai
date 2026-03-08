"use client";

import GlobalHeader from "@/components/GlobalHeader";
import Footer from "@/components/Footer";
import { Zap, Award, Factory, Cog } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function SustainabilityPage() {
  const t = useTranslations("SustainabilityPage");

  return (
    <main className="min-h-screen bg-[#f8f9fc] font-sans flex flex-col">
      <GlobalHeader />

      {/* Hero / Overview Section */}

      <section className="w-full bg-bg-dark text-white py-24 px-4 md:px-8 font-sans relative overflow-hidden">
        {/* Background Graphic */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-3xl -mr-[200px] -mt-[200px] pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <div className="flex items-center gap-3 text-brand-primary text-sm font-sans font-bold tracking-widest uppercase mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary"></span>
                {t("hero.subtitle")}
              </div>
              <h1 className="text-hero-inner font-serif font-bold tracking-tight mb-6">
                {t("hero.titleStart")}
                <span className="text-brand-primary">
                  {t("hero.titleHighlight")}
                </span>
              </h1>
              <p className="text-brand-ash/80 text-lg md:text-xl font-sans font-normal max-w-2xl leading-relaxed">
                {t("hero.description")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-xl bg-white relative -mt-12 rounded-t-[3rem] z-20 shadow-[0_-20px_40px_rgba(0,0,0,0.05)] border-t border-brand-ash/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col gap-6 md:grid md:grid-cols-2">
            {/* Card 1 — Certifications (Full width on desktop) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="md:col-span-1 bg-text-dark-bg border border-brand-ash/20 shadow-sm rounded-3xl p-8 md:p-12 flex flex-col gap-8"
            >
              <div>
                <h3 className="text-section-h3 font-serif font-semibold text-text-light-bg tracking-tight mb-4 flex items-center gap-3">
                  <Award className="w-7 h-7 text-brand-primary shrink-0" />
                  {t("cards.certifications.title")}
                </h3>
                <p className="text-text-light-bg/70 font-sans text-body-lg leading-relaxed max-w-3xl">
                  {t("cards.certifications.description")}
                </p>
              </div>

              {/* Logo Row */}
              <div className="flex flex-wrap items-center gap-6">
                <div className="px-4 py-4 bg-white rounded-2xl border border-brand-primary/20 flex items-center justify-center w-28 h-28 shrink-0">
                  <img
                    src="certified/iso-14001-2015.webp"
                    alt="ISO 14001"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="px-4 py-4 bg-white rounded-2xl border border-brand-primary/20 flex items-center justify-center w-28 h-28 shrink-0">
                  <img
                    src="certified/ISO_9001-2015.svg"
                    alt="ISO 9001"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="px-4 py-4 bg-white rounded-2xl border border-brand-primary/20 flex items-center justify-center w-28 h-28 shrink-0">
                  <img
                    src="certified/ISO-45001-2018.png"
                    alt="ISO 45001"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </motion.div>

            {/* Card 2 — Zero-Coal Foundry */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-text-dark-bg border border-brand-ash/20 shadow-sm rounded-3xl p-8 flex flex-col gap-4"
            >
              <h3 className="text-section-h3 font-serif font-semibold text-text-light-bg tracking-tight flex items-center gap-3">
                <Zap className="w-7 h-7 text-brand-primary shrink-0" />
                {t("cards.zeroCoal.title")}
              </h3>
              <p className="text-text-light-bg/70 font-sans text-body-lg leading-relaxed">
                {t("cards.zeroCoal.description")}
              </p>
            </motion.div>

            {/* Card 3 — Environmental Policy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-text-dark-bg border border-brand-ash/20 shadow-sm rounded-3xl p-8 flex flex-col gap-4"
            >
              <h3 className="text-section-h3 font-serif font-semibold text-text-light-bg tracking-tight flex items-center gap-3">
                <Factory className="w-7 h-7 text-brand-primary shrink-0" />
                {t("cards.environmentalPolicy.title")}
              </h3>
              <p className="text-text-light-bg/70 font-sans text-body-lg leading-relaxed">
                {t("cards.environmentalPolicy.description")}
              </p>
            </motion.div>

            {/* Card 4 — Standards & Declarations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-text-dark-bg border border-brand-ash/20 shadow-sm rounded-3xl p-8 flex flex-col gap-6"
            >
              <h3 className="text-section-h3 font-serif font-semibold text-text-light-bg tracking-tight flex items-center gap-3">
                <Cog className="w-7 h-7 text-brand-primary shrink-0" />
                {t("cards.standards.title")}
              </h3>
              <div className="flex flex-col gap-3 text-text-light-bg/80 font-sans text-body-lg">
                <div>
                  <span className="font-semibold">EN 15804 (EPD)</span>{" "}
                  {t("cards.standards.en15804")}
                </div>
                <div>
                  <span className="font-semibold">REACH & RoHS</span>{" "}
                  {t("cards.standards.reach")}
                </div>
                <div>
                  <span className="font-semibold">BS-EN-124</span>{" "}
                  {t("cards.standards.bsEn124")}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
