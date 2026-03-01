"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import Script from "next/script";

export default function ContactSection() {
  return (
    <section className="w-full bg-white py-24 px-4 md:px-8 border-t border-black/5 font-sans relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-text-dark-bg rounded-full blur-3xl -mr-[400px] -mt-[400px] opacity-70 pointer-events-none"></div>

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
            <h2 className="text-xs font-serif font-semibold tracking-[0.15em] text-brand-primary uppercase mb-6 flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary"></span>
              Get in Touch
            </h2>
            
            <h3 className="text-4xl md:text-5xl lg:text-[3.5rem] font-serif font-bold text-bg-dark leading-[1.1] mb-8">
              Let's build the <br />
              <span className="text-brand-primary italic">future of infrastructure</span> <br />
              together.
            </h3>
            
            <p className="text-lg text-bg-dark/60 font-sans font-normal leading-relaxed mb-12 max-w-xl">
              Whether you're looking for custom casting solutions, need a quote for a large municipal project, or want to explore our end-to-end production capabilities, our team of experts is ready to assist you.
            </p>

            <div className="flex flex-col gap-8">
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-text-dark-bg flex items-center justify-center shrink-0 group-hover:bg-brand-primary/10 transition-colors">
                  <MapPin className="w-5 h-5 text-bg-dark group-hover:text-brand-primary transition-colors" />
                </div>
                <div>
                  <h4 className="text-bg-dark font-serif font-semibold text-lg mb-1">Headquarters</h4>
                  <p className="text-bg-dark/70 font-sans font-normal leading-relaxed">
                    123 Industrial Avenue<br />
                    Brussels, B-1000<br />
                    Belgium
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-text-dark-bg flex items-center justify-center shrink-0 group-hover:bg-brand-primary/10 transition-colors">
                  <Mail className="w-5 h-5 text-bg-dark group-hover:text-brand-primary transition-colors" />
                </div>
                <div>
                  <h4 className="text-bg-dark font-serif font-semibold text-lg mb-1">Email Us</h4>
                  <a href="mailto:info@vyanzo.com" className="text-bg-dark/70 font-sans font-normal hover:text-brand-primary transition-colors">
                    info@vyanzo.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-text-dark-bg flex items-center justify-center shrink-0 group-hover:bg-brand-primary/10 transition-colors">
                  <Phone className="w-5 h-5 text-bg-dark group-hover:text-brand-primary transition-colors" />
                </div>
                <div>
                  <h4 className="text-bg-dark font-serif font-semibold text-lg mb-1">Call Us</h4>
                  <p className="text-bg-dark/70 font-sans font-normal">
                    +32 (0) 2 123 45 67
                  </p>
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
              <h3 className="text-2xl font-serif font-bold text-bg-dark mb-8">Send us a message</h3>
              
              <div 
                style={{ width: "100%", height: "500px" }} 
                data-fillout-id="og6zZBZdi1us" 
                data-fillout-embed-type="standard" 
                data-fillout-inherit-parameters 
                data-fillout-dynamic-resize
                suppressHydrationWarning
              ></div>
              <Script src="https://server.fillout.com/embed/v1/" strategy="lazyOnload" />
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
