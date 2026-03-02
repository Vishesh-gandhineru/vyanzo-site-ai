"use client";

import { motion } from "framer-motion";

// Logos from public/certified
const logos = [
  "/certified/BENOR.png",
  "/certified/COPRO.svg",
  "/certified/ISO-45001-2018.png",
  "/certified/ISO_9001-2015.png",
  "/certified/iso-14001-2015.webp",
];

// Combine to create an infinite loop array
const infiniteLogos = [...logos, ...logos, ...logos, ...logos];

export default function MarqueeLogos() {
  return (
    <section className="w-full bg-text-dark-bg py-10 border-b border-brand-ash/20 overflow-hidden flex flex-col items-center">
      <div className="text-xl font-sans font-semibold tracking-widest text-text-light-bg/40 uppercase mb-8">
        Certifications
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
          {infiniteLogos.map((src, index) => (
            <div
              key={`logo-${index}`}
              className="flex justify-center items-center min-w-[120px] md:min-w-[150px]"
            >
              <img
                src={src}
                alt={`Certification ${index}`}
                className="h-12 md:h-16 w-auto object-contain grayscale opacity-60 hover:opacity-100 transition-opacity duration-300"
                draggable="false"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
