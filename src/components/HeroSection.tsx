"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import MegaMenu from "./MegaMenu";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-bg-dark text-text-dark-bg font-sans selection:bg-brand-primary/30">
      {/* Background Video Simulator */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-80"
        >
          <source src="/hero-background.mp4" type="video/mp4" />
        </video>

      </div>    {/* Soft edge blur and darkened overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/30 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent" />

      {/* Main Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between p-6 md:p-12 lg:p-16">

        {/* Top Navbar */}
        <header className="flex justify-between items-start w-full relative z-60">
          
          {/* Logo container to correctly float next to the absolute mega menu */}
          <div className="w-48">
            <img 
               src="/logo.svg" 
               alt="Vyanzo" 
               className="w-full h-auto invert brightness-0" 
            />
          </div>

          {/* Mega Menu Component */}
          <MegaMenu />
        </header>

        {/* Bottom Content Area */}
        <div className="flex justify-between items-end w-full pb-4 md:pb-8">
          <div className="flex flex-col items-start gap-8 md:gap-12">
            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              className="text-[3.5rem] md:text-7xl lg:text-[7.5rem] font-serif font-bold leading-[1.1] tracking-tight text-text-dark-bg max-w-[80vw] pt-10"
            >
              Factory-Direct Quality at Honest Prices
            </motion.h1>

            {/* Learn More Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
              className="bg-brand-accent hover:bg-brand-accent/90 text-text-light-bg px-8 py-3 rounded-full font-sans font-semibold text-lg tracking-wide transition-all shadow-[0_0_20px_rgba(253,231,76,0.4)]"
            >
              Learn More
            </motion.button>
          </div>

          {/* Scroll Down Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="hidden md:flex flex-col items-center gap-2 pr-6"
          >
            <ArrowDown className="w-6 h-6 text-brand-accent animate-bounce" strokeWidth={1} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
