"use client";

import { Link } from "@/i18n/routing";
import CobeGlobe from "./CobeGlobe";
import {
  ArrowUpRight,
  BarChart3,
  Users,
  Zap,
  Award,
  Factory,
  Cog,
} from "lucide-react";
import { useTranslations } from "next-intl";

export default function BentoGrid() {
  const t = useTranslations("BentoGrid");

  return (
    <section className="w-full section-xl bg-[#f8f9fc] border-t border-black/5 font-sans">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <div className="text-body-lg font-serif font-semibold tracking-widest text-brand-primary  mb-6 flex items-center gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary"></span>
              {t("subtitle")}
            </div>
            <h2 className="text-section-h2 font-serif font-bold text-text-light-bg tracking-tight mb-4">
              {t("titleStart")}
              <span className="text-brand-primary italic">
                {t("titleHighlight")}
              </span>
            </h2>
            <p className="text-body-xl text-bg-dark/60 font-sans font-normal">
              {t("description")}
            </p>
          </div>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-4 gap-4 md:gap-6 md:auto-rows-[240px]">
          {/* Card 1: Top Left (H:2 W:1) */}
          <div className="min-h-[300px] md:min-h-0 md:col-span-1 md:row-span-2 bg-text-dark-bg border border-brand-ash/20 shadow-sm rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group hover:border-brand-primary/30 transition-colors">
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-primary/10 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-brand-primary/20" />
            <div>
              <Zap
                className="w-8 h-8 text-brand-primary mb-6"
                strokeWidth={1.5}
              />
              <h3 className="text-section-h3 font-serif font-semibold text-text-light-bg mb-3 tracking-tight">
                {t("quality.title")}
              </h3>
              <p className="text-text-light-bg/70 font-sans text-body-lg font-normal leading-relaxed">
                {t("quality.description")}
              </p>
            </div>
            <div className="mt-8 z-10">
              <div className="text-5xl lg:text-6xl font-sans font-bold text-brand-primary tracking-tighter">
                {t("quality.stat")}
              </div>
              <div className="text-sm text-bg-dark/80 mt-2 capitalize tracking-normal font-sans font-normal">
                {t("quality.statLabel")}
              </div>
            </div>
          </div>

          {/* Card 2: Top Center (H:1 W:2) */}
          <div className="min-h-[200px] md:min-h-0 md:col-span-2 md:row-span-1 bg-text-dark-bg border border-brand-ash/20 shadow-sm rounded-4xl p-8 flex flex-col justify-center items-center text-center relative overflow-hidden group hover:border-brand-primary/30 transition-colors">
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-brand-primary/5 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <Award
              className="w-8 h-8 text-brand-primary mb-4"
              strokeWidth={1.5}
            />
            <h3 className="text-section-h3 font-serif font-semibold text-text-light-bg z-10 tracking-tight">
              {" "}
              {t("global.title")}
            </h3>
            <p className="text-text-light-bg/70 mt-3 z-10 text-body-lg font-sans font-normal leading-relaxed">
              {t("global.description")}
            </p>
          </div>

          {/* Card 3: Top Right (H:1 W:1) */}
          <div className="min-h-[200px] md:min-h-0 md:col-span-1 md:row-span-1 bg-text-dark-bg border border-brand-ash/20 shadow-sm rounded-3xl p-6 flex flex-col justify-center items-center text-center relative overflow-hidden group hover:border-brand-primary/30 transition-colors">
            <Cog
              className="w-8 h-8 text-brand-primary mb-4"
              strokeWidth={1.5}
            />
            <h3 className="text-section-h3 font-serif font-semibold text-text-light-bg z-10 tracking-tight">
              {t("volume.title")}
            </h3>
            <div className="text-4xl lg:text-5xl font-sans mt-3 font-bold text-brand-primary tracking-tighter drop-shadow-[0_0_15px_rgba(110,176,255,0.4)]">
              {t("volume.stat")}
              <span
                className="
            text-[12px] font-sans font-normal text-bg-dark/80 tracking-wider"
              >
                {t("volume.statLabel")}
              </span>
            </div>
          </div>

          {/* Card 4: Middle Center (GLOBE CARD) (H:2 W:2) */}
          <div className="min-h-[400px] md:min-h-0 md:col-span-2 md:row-span-2 bg-linear-to-b from-white to-text-dark-bg border border-brand-ash/20 shadow-sm rounded-[2.5rem] flex flex-col items-center justify-center relative overflow-hidden group">
            {/* Title overlay at the top of the globe */}
            <div className="absolute top-8 left-8 right-8 z-20 flex justify-between items-start pointer-events-none">
              <div>
                <h3 className="text-section-h3 font-serif font-semibold text-text-light-bg tracking-tight">
                  {t("presence.title")}
                </h3>
              </div>
            </div>

            {/* The Globe */}
            <div className="absolute inset-x-0 -bottom-16 top-0 z-0 flex items-center justify-center">
              <CobeGlobe />
            </div>

            {/* Subtle glow behind globe */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-primary/5 blur-[100px] rounded-full pointer-events-none" />
          </div>

          {/* Card 7: Bottom Right (H:2 W:1) */}
          <div className="min-h-[300px] md:min-h-0 md:col-span-1 md:row-span-2 bg-text-dark-bg border border-brand-ash/20 shadow-sm rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group hover:border-brand-primary/30 transition-colors">
            <div className="absolute -right-4 -bottom-4 w-48 h-48 bg-brand-primary/10 blur-3xl rounded-full transition-all group-hover:bg-brand-primary/20" />
            <div>
              <Factory
                className="w-8 h-8 text-brand-primary mb-6"
                strokeWidth={1.5}
              />
              <h3 className="text-section-h3 font-serif font-semibold text-text-light-bg mb-4 tracking-tight">
                {t("compliance.title")}
              </h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-5 relative z-10 mt-8">
              <img
                src="/certified/BENOR.png"
                alt="BENOR"
                className="h-10 w-auto object-contain mx-auto"
              />
              <img
                src="/certified/COPRO.svg"
                alt="COPRO"
                className="h-14 w-auto object-contain mx-auto"
              />
              <img
                src="/certified/MPA-Bremen-logo.webp"
                alt="MPA Bremen"
                className="h-12 w-auto object-contain mx-auto"
              />
              <img
                src="/certified/logo1-default.png"
                alt="ICMQ"
                className="h-12 w-auto object-contain mx-auto"
              />
            </div>
          </div>

          {/* Card 6: Bottom Left (H:1 W:1) */}
          <Link
            className="min-h-[200px] md:min-h-0 md:col-span-1 md:row-span-1 bg-brand-primary/10 border border-brand-primary/20 rounded-3xl p-6 flex flex-col justify-between hover:bg-brand-primary hover:text-white transition-colors cursor-pointer group shadow-sm text-text-light-bg"
            href="/contact"
          >
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-primary group-hover:text-brand-primary transition-colors mb-4 shadow-sm">
              <ArrowUpRight className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-serif font-semibold group-hover:text-white transition-colors">
                {t("contact.title")}
              </h3>
              <p className="text-sm opacity-80 mt-1 font-sans font-normal">
                {t("contact.description")}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
