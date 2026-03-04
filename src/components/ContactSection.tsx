"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Warehouse } from "lucide-react";

export default function ContactSection() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://server.fillout.com/embed/v1/";
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <section className="w-full bg-white font-sans relative overflow-hidden">
      {/* Background Graphic */}
    

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Column: Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 flex flex-col justify-center"
          >
            <h2 className="text-body-lg font-serif font-semibold tracking-[0.15em] text-brand-primary mb-6 flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary"></span>
            Your Next Step
            </h2>
            
            <h3 className="text-section-h2 font-serif font-bold text-bg-dark leading-[1.1] mb-8">
             Drop us a line, <span className="text-brand-primary italic">we'll take it from there.</span>
            </h3>
            
            <p className="text-body-lg text-bg-dark/60 font-sans font-normal leading-relaxed mb-12 max-w-xl">
              Custom quotes, technical specs, or bulk orders — fill in the details and our team gets back to you within 24 hours.
            </p>

            <div className="flex flex-col gap-8">
              <div className="flex flex-col lg:flex-row items-start gap-16 group">
                <div className="flex items-start gap-4">

                <div className="w-12 h-12 rounded-full bg-text-dark-bg flex items-center justify-center shrink-0 group-hover:bg-brand-primary/10 transition-colors">
                  <MapPin className="w-5 h-5 text-bg-dark group-hover:text-brand-primary transition-colors" />
                </div>
                <div>
                  <h4 className="text-bg-dark font-serif font-semibold text-lg mb-1">Headquarters</h4>
                  <p className="text-bg-dark/70 font-sans font-normal leading-relaxed">
                    Botermelkbaan 51 <br />
                    2900 Schoten <br />
                    Belgium 
                  </p>
                </div>

                </div>

                <div className="flex items-start gap-4">

                <div className="w-12 h-12 rounded-full bg-text-dark-bg flex items-center justify-center shrink-0 group-hover:bg-brand-primary/10 transition-colors">
                  <MapPin className="w-5 h-5 text-bg-dark group-hover:text-brand-primary transition-colors" />
                </div>
                <div>
                  <h4 className="text-bg-dark font-serif font-semibold text-lg mb-1">Warehouse</h4>
                  <p className="text-bg-dark/70 font-sans font-normal leading-relaxed">
                    Kluizenmeersen 10 <br />
                    9170 Sint-Gillis-Waas <br />
                    Belgium 
                  </p>
                </div>

                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-text-dark-bg flex items-center justify-center shrink-0 group-hover:bg-brand-primary/10 transition-colors">
                  <Mail className="w-5 h-5 text-bg-dark group-hover:text-brand-primary transition-colors" />
                </div>
                <div>
                  <h4 className="text-bg-dark font-serif font-semibold text-lg mb-1">Email Us</h4>
                  <a href="mailto:info@vyanzo.be" className="text-bg-dark/70 font-sans font-normal hover:text-brand-primary transition-colors">
                     info@vyanzo.be
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-text-dark-bg flex items-center justify-center shrink-0 group-hover:bg-brand-primary/10 transition-colors">
                  <Phone className="w-5 h-5 text-bg-dark group-hover:text-brand-primary transition-colors" />
                </div>
                <div>
                  <h4 className="text-bg-dark font-serif font-semibold text-lg mb-1">Call / Whatsapp Us</h4>
                  <p className="text-bg-dark/70 font-sans font-normal">
                    + 32 475 26 47 52
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-text-dark-bg flex items-center justify-center shrink-0 group-hover:bg-brand-primary/10 transition-colors">
                  <Warehouse className="w-5 h-5 text-bg-dark group-hover:text-brand-primary transition-colors" />
                
                  
                </div>
                <div>
                  <h4 className="text-bg-dark font-serif font-semibold text-lg mb-1">Belgian distribution and warehouse </h4>
                  <a href="https://viateq.be" target="_blank" rel="noopener noreferrer" className="text-bg-dark/70 font-sans font-normal hover:text-brand-primary transition-colors">
                    VIATEQ bv
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/2 w-full"
          >
            <div className="bg-text-dark-bg p-8 md:p-12 rounded-3xl border border-black/5 shadow-xl shadow-black/2">
              <h3 className="text-section-h3 font-serif font-bold text-bg-dark mb-8">Send us a message</h3>
              
              <div 
                style={{ width: "100%", height: "500px" }} 
                data-fillout-id="og6zZBZdi1us" 
                data-fillout-embed-type="standard" 
                data-fillout-inherit-parameters 
                data-fillout-dynamic-resize
                suppressHydrationWarning
              ></div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
