"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import MegaMenu from "./MegaMenu";
import LanguageSwitcher from "./LanguageSwitcher";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function HeroSection() {
  const t = useTranslations("Hero");

  return (
    <section className="relative h-screen w-full overflow-hidden bg-bg-dark text-text-dark-bg font-sans selection:bg-brand-primary/30">
      {/* Background Video Simulator */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-80">
  <source
    src="https://res.cloudinary.com/diwiusdfq/video/upload/vc_auto,q_auto/hero-background_n2tmr1.mp4"
    type="video/mp4"
  />
</video>
       
      </div>{" "}
      {/* Soft edge blur and darkened overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/30 mix-blend-overlay" />
      <div className="absolute inset-0 bg-linear-to-t from-bg-dark/80 via-transparent to-transparent" />
      {/* Main Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between p-4 md:p-12 lg:p-16">
        {/* Top Navbar */}
        <header className="flex justify-between items-center w-full relative z-60 gap-4 ">
          {/* Logo container to correctly float next to the absolute mega menu */}
          <div className="w-38 md:w-64">
            <Link href="/">
              <img src="/logo.svg" alt="Vyanzo" className="w-full h-auto" />
            </Link>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <MegaMenu />
          </div>
        </header>

        {/* Bottom Content Area */}
        <div className="flex justify-between items-end w-full pb-4 md:pb-8">
          <div className="flex flex-col items-start gap-8 md:gap-12">
            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              className="text-hero-home font-serif font-bold leading-[1.1] tracking-tight text-text-dark-bg lg:max-w-[60vw] pt-10"
            >
              {t("headlineStart")}
              <span className="text-brand-primary italic">
                {t("headlineHighlight")}
              </span>
              {t("headlineEnd")}
            </motion.h1>

            {/* Learn More Button */}
            <Link href="/products">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
                className="btn-primary"
              >
                {t("cta")}
              </motion.div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
