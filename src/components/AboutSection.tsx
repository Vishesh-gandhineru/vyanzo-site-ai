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
            <h2 className="text-sm font-semibold tracking-widest text-brand-primary uppercase mb-6 flex items-center gap-4">
              <span className="w-8 h-px bg-brand-primary"></span>
              About Vyanzo
            </h2>
            <h3 className="text-4xl md:text-5xl lg:text-[3.5rem] font-serif text-bg-dark leading-tight mb-8">
              Meticulously designed and manufactured products.
            </h3>
            <div className="border-l-4 border-brand-primary pl-6 py-2">
              <p className="text-xl md:text-2xl text-text-light-bg/90 font-light leading-relaxed">
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
            className="lg:w-[55%] flex flex-col justify-center gap-6 text-text-light-bg/70 text-lg md:text-xl font-light leading-relaxed"
          >
            <p>
              Vyanzo has evolved into a standalone product brand with its own manufacturing capability. We are makers and owners — delivering factory-direct quality without intermediaries.
            </p>
            <p>
              We own our entire value chain from manufacturing to delivery. This vertical integration allows us to deliver factory-direct quality at honest prices, passing on a minimum of 25% savings to our buyers.
            </p>
            
            {/* Sustainability highlighted box */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-brand-ash/20 mt-6 relative overflow-hidden group shadow-lg">
               {/* Decorative gradient */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 rounded-full blur-2xl -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700 ease-out"></div>
               
               <h4 className="text-bg-dark text-base md:text-lg font-semibold mb-4 flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.6)]"></div>
                 Sustainable Manufacturing
               </h4>
               <p className="text-base text-text-light-bg/80 m-0">
                 We have continuously upgraded our production facilities with the latest machines and technology, always considering the environment and energy efficiency. For example, we don’t melt with coal, like they still do in Belgium, but with the latest electrical induction furnaces. Hence reducing massively our environmental impact.
               </p>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
