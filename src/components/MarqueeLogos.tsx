"use client";

import { motion } from "framer-motion";

// Placeholder for real logos
const logos = [
  "ACME CORP",
  "QUANTUM",
  "ECHO VALLEY",
  "NEXUS",
  "NEBULA",
  "TESSERACT",
  "ZEPHYR",
  "VORTEX",
];

// Transform logos into clients array with name property
const clients = logos.map((logo) => ({ name: logo }));

export default function MarqueeLogos() {
  return (
    <section className="w-full bg-text-dark-bg py-10 border-b border-brand-ash/20 overflow-hidden flex flex-col items-center">
      <div className="text-sm font-semibold tracking-widest text-text-light-bg/40 uppercase mb-8">
        Trusted by Industry Leaders
      </div>

      {/* The mask-image creates a fade out effect on the left and right edges */}
      <div className="relative w-full overflow-hidden flex mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <motion.div
          className="flex gap-16 md:gap-24 items-center whitespace-nowrap pl-16 md:pl-24"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 25,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {/* We duplicate the array to create a seamless infinite loop */}
          {[...clients, ...clients, ...clients].map((client) => (
            <div
              key={`dup-${client.name}`}
              className="flex whitespace-nowrap items-center justify-center min-w-[200px] text-2xl font-serif font-bold text-text-light-bg/20 tracking-tighter"
            >
              {client.name}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
