"use client";

import { motion } from "framer-motion";

export default function EnvironmentSection() {
  return (
    <section className="w-full bg-white py-24 px-4 md:px-8 overflow-hidden font-sans border-t border-black/5">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Text */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 flex flex-col justify-center"
          >
            <h2 className="text-xs font-bold tracking-[0.15em] text-brand-primary uppercase mb-8 flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary"></span>
              Environmental Responsibility
            </h2>
            
            <h3 className="text-4xl md:text-5xl lg:text-[4rem] font-serif text-bg-dark leading-[1.1] mb-8">
              Massively reducing our <br />
              <span className="text-brand-primary italic">environmental impact</span> <br />
              through innovation.
            </h3>
            
            <p className="text-lg md:text-xl text-bg-dark/60 font-light leading-relaxed mb-12 max-w-xl">
              We don’t melt with coal, like they still do in Belgium, but with the latest electrical induction furnaces. This shift, combined with rooftop solar panel green energy, represents our commitment to a sustainable future.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-3 bg-brand-primary/10 px-5 py-3 rounded-full">
                <span className="w-2 h-2 rounded-full bg-brand-primary"></span>
                <span className="text-xs font-bold tracking-wider text-bg-dark uppercase">No Coal Melting</span>
              </div>
              <div className="flex items-center gap-3 bg-brand-primary/10 px-5 py-3 rounded-full">
                <span className="w-2 h-2 rounded-full bg-brand-primary"></span>
                <span className="text-xs font-bold tracking-wider text-bg-dark uppercase">Solar Powered</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Image */}
            <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/2 w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-4xl overflow-hidden"
          >
            <img 
              src="https://images.unsplash.com/photo-1542261623-01053c1ed512?q=80&w=2070&auto=format&fit=crop" 
              alt="Sustainable environmental road"
              className="w-full h-full object-cover grayscale-30"
            />
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
