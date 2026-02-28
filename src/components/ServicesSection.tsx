"use client";

import { motion } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";

const services = [
  {
    title: "Product Development",
  },
  {
    title: "A-Z Production Excellence",
  },
  {
    title: "Custom Packaging &\nDelivery Options",
  },
  {
    title: "Product Certification",
  },
];

export default function ServicesSection() {
  return (
    <section className="w-full bg-[#f8fafc] py-24 px-4 md:px-8 border-t border-black/5 font-sans">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="md:max-w-2xl"
          >
            <h2 className="text-xs font-bold tracking-[0.15em] text-[#d5b060] uppercase mb-6 flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d5b060]"></span>
              Our Services
            </h2>
            <h3 className="text-4xl md:text-5xl lg:text-[3.5rem] font-serif text-bg-dark leading-[1.1] uppercase">
              Discover what we can do for you
            </h3>
          </motion.div>

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="shrink-0"
          >
            <button className="bg-[#d5b060] hover:bg-[#c29e50] transition-colors text-white font-bold text-sm tracking-widest uppercase py-4 px-8 flex items-center gap-3 rounded-sm group">
              Learn More
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="bg-white p-8 md:p-10 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 border border-black/2 flex flex-col items-start min-h-[260px] group cursor-pointer"
            >
              <div className="w-12 h-12 bg-brand-primary/10 group-hover:bg-brand-primary/20 transition-colors rounded-lg flex items-center justify-center mb-auto">
                <Plus className="w-5 h-5 text-brand-primary" />
              </div>
              <h4 className="text-xl md:text-lg lg:text-xl font-semibold text-bg-dark leading-snug mt-12 group-hover:text-brand-primary transition-colors whitespace-pre-line">
                {service.title}
              </h4>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
