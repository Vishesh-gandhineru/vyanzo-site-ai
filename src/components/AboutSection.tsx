"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="w-full section-xl bg-text-dark-bg text-text-light-bg  overflow-hidden font-sans border-t border-brand-ash/20">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Left Column: Heading and Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className=" lg:w-[45%] flex flex-col justify-center"
          >
            <h2 className="text-body-lg font-serif font-semibold tracking-widest text-brand-primary  mb-6 flex items-center gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary"></span>
              About Vyanzo
            </h2>
            <h3 className="text-section-h2 font-serif font-bold text-bg-dark leading-tight mb-8">
              Precision-cast for the{" "}
              <span className="text-brand-primary italic">
                World's Most Demanding
              </span>{" "}
              infrastructure.
            </h3>
          </motion.div>

          {/* Right Column: Detailed Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-[55%] flex flex-col justify-center gap-6 text-text-light-bg/60 text-body-lg font-sans font-normal leading-relaxed"
          >
            <p>
              Born in 2018, Vyanzo manufactures manhole covers, grates, and
              municipal castings: supplied across Europe and beyond. Quality,
              service, and reliability aren't just promises. They're the
              standard.
            </p>
            <Link href="/about/#team" className="w-full md:w-auto">
              <button className="btn-primary w-full">Meet the team</button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
