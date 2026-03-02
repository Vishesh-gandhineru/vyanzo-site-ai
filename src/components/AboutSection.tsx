"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="w-full bg-text-dark-bg text-text-light-bg py-24 px-4 md:px-8 overflow-hidden font-sans border-t border-brand-ash/20">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Column: Heading and Highlight */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:w-[45%] flex flex-col justify-center"
          >
            <h2 className="text-sm font-serif font-semibold tracking-widest text-brand-primary uppercase mb-6 flex items-center gap-4">
              <span className="w-8 h-px bg-brand-primary"></span>
              About Vyanzo
            </h2>
            <h3 className="text-4xl md:text-5xl lg:text-[3.5rem] font-serif font-bold text-bg-dark leading-tight mb-8">
              Discover our range of meticulously designed and manufactured products.
            </h3>
            <div className="border-l-4 border-brand-primary pl-6 py-2">
              <p className="text-xl md:text-2xl text-text-light-bg/90 font-sans font-medium leading-relaxed">
                Vyanzo delivers top quality castings to the most demanding customers. Consistent quality and service level are paramount to what we do.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Detailed Text */}
            <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-[55%] flex flex-col justify-center gap-6 text-text-light-bg/70 text-lg md:text-xl font-sans font-normal leading-relaxed"
          >
            <p>
              Since its inception in 2018, Vyanzo has evolved from an OEM supplier to become a leading manufacturer of its own range of Manhole Covers, Grates and other municipal casting products that are now supplied across Europe.
            </p>
            <p>
              We offer end-to-end services to customers around the world who share our business philosophy: Quality, Service & Reliability at a correct price – and that with relentless consistency.
            </p>
            
            <button className="bg-brand-primary text-white px-6 py-3 rounded-full hover:bg-brand-primary/90 transition-colors">Meet the team</button>
           
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
