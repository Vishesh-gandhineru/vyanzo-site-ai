"use client";

import { motion } from "framer-motion";
import GlobalHeader from "@/components/GlobalHeader";
import Footer from "@/components/Footer";
import TeamSection from "@/components/TeamSection";
import { CheckCircle2, ShieldCheck, TrendingUp, Cpu, Users2, Building2, Globe, Wrench } from "lucide-react";


export default function AboutPage() {
  

  return (
    <main className="min-h-screen bg-[#f8f9fc] font-sans flex flex-col">
      <GlobalHeader />

      {/* Hero / Overview Section */}
      <section className="relative pt-32 pb-24 px-6 md:px-12 lg:px-16 overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="text-sm font-serif font-semibold tracking-[0.2em] text-brand-primary uppercase mb-6 flex items-center gap-4">
              <span className="w-12 h-px bg-brand-primary"></span>
              {"Company Profile"}
            </h1>
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-bg-dark leading-[1.1] mb-8 tracking-tight">
              {"We are"} <span className="text-transparent bg-clip-text bg-gradient-to-r from-bg-dark to-brand-primary">Vyanzo.</span>
            </h2>
            <p className="text-xl md:text-2xl text-text-light-bg/80 leading-relaxed font-light">
              {"A premier global manufacturing partner specializing in the casting industry. Strategic bridge between high-quality manufacturing hubs in Asia and Eastern Europe and clients in the European and North American markets."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy & Meaning */}
      <section className="py-24 px-6 md:px-12 lg:px-16 bg-white border-y border-brand-ash/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="flex-1 w-full"
            >
              <div className="aspect-square md:aspect-[4/3] bg-bg-dark rounded-[2.5rem] p-12 relative overflow-hidden flex flex-col justify-center shadow-2xl">
                 <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 to-transparent mix-blend-overlay"></div>
                 <Globe className="w-16 h-16 text-brand-primary mb-8" />
                 <h3 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
                   "{"Buy globally by dealing locally."}"
                 </h3>
                 <p className="text-text-dark-bg/80 text-lg">
                   The name <strong className="text-white font-medium">Vyanzo</strong> is derived from the Swahili word for <strong className="text-white font-medium">new source,</strong> reflecting our mission to provide an innovative, customer-centric approach to global sourcing.
                 </p>
              </div>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="flex-1"
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-bg-dark mb-6">{"Seamless Experience"}</h2>
              <p className="text-lg text-text-light-bg/70 leading-relaxed mb-8">
                {"Vyanzo combines the cost-efficiencies of global manufacturing with the ease and reliability of a local partner. By managing multiple time zones and providing multi-lingual support, Vyanzo ensures a seamless, \"headache-free\" experience for its clients."}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20">
                  <ShieldCheck className="w-6 h-6 text-brand-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-bg-dark">{"COPRO BENOR Certified"}</h4>
                  <p className="text-sm text-text-light-bg/60">{"For the Belgian market, distributed via Viateq"}</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Key Offerings & Products */}
      <section className="py-24 px-6 md:px-12 lg:px-16 bg-bg-dark text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-primary to-transparent opacity-20" />
        <div className="max-w-[1400px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">{"Key Offerings"}</h2>
            <p className="text-xl text-text-dark-bg/70">
              {"Vyanzo is a leading supplier of premium casting products, engineered for scale and durability."}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm"
            >
              <div className="w-14 h-14 bg-brand-primary rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(253,231,76,0.2)]">
                <div className="w-6 h-6 border-4 border-bg-dark rounded-full" />
              </div>
              <h3 className="text-2xl font-bold mb-4 font-serif">{"Manhole Covers & Grates"}</h3>
              <p className="text-text-dark-bg/60 leading-relaxed">{"Heavy-duty, robust solutions engineered for high traffic and demanding infrastructural applications."}</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm"
            >
              <div className="w-14 h-14 bg-brand-primary rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(253,231,76,0.2)]">
                <Wrench className="w-6 h-6 text-bg-dark" />
              </div>
              <h3 className="text-2xl font-bold mb-4 font-serif">{"Valves"}</h3>
              <p className="text-text-dark-bg/60 leading-relaxed">{"Precision-engineered valves designed to strict European and North American standards."}</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/20 blur-[50px] group-hover:scale-150 transition-transform duration-700" />
              <div className="w-14 h-14 bg-brand-primary rounded-2xl flex items-center justify-center mb-8 relative z-10 shadow-[0_0_30px_rgba(253,231,76,0.2)]">
                <Cpu className="w-6 h-6 text-bg-dark" />
              </div>
              <h3 className="text-2xl font-bold mb-4 font-serif relative z-10">{"OEM Services"}</h3>
              <p className="text-text-dark-bg/60 leading-relaxed relative z-10">{"Specializing in custom manufacturing, operating as the silent partner for leading suppliers globally."}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Vyanzo Advantage */}
      <section className="py-24 px-6 md:px-12 lg:px-16 bg-[#f8f9fc]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-bg-dark mb-6">{"The Vyanzo Advantage"}</h2>
              <p className="text-xl text-text-light-bg/70 mb-12">
                {"A relentless focus on quality, scale, and long-term partnership stability."}
              </p>

              <div className="flex flex-col gap-8">
                <div className="flex gap-6">
                  <div className="shrink-0 mt-1">
                    <div className="w-12 h-12 bg-white rounded-full shadow-sm border border-brand-ash/20 flex items-center justify-center text-brand-primary font-bold">01</div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-bg-dark mb-2">{"Strategic Manufacturing"}</h4>
                    <p className="text-text-light-bg/70 leading-relaxed">{"Over a decade of experience collaborating exclusively with top-tier manufacturers in India, Turkey, and China."}</p>
                  </div>
                </div>
                
                <div className="flex gap-6">
                  <div className="shrink-0 mt-1">
                    <div className="w-12 h-12 bg-white rounded-full shadow-sm border border-brand-ash/20 flex items-center justify-center text-brand-primary font-bold">02</div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-bg-dark mb-2">{"Full-Service Management"}</h4>
                    <p className="text-text-light-bg/70 leading-relaxed">{"We handle the entire lifecycle of the sourcing process, from initial design to final logistics."}</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="shrink-0 mt-1">
                    <div className="w-12 h-12 bg-white rounded-full shadow-sm border border-brand-ash/20 flex items-center justify-center text-brand-primary font-bold">03</div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-bg-dark mb-2">{"Stability & Expertise"}</h4>
                    <p className="text-text-light-bg/70 leading-relaxed">{"Exceptional team with a 15-year track record and zero churn, ensuring consistent quality."}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 content-center">
              <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-brand-ash/10 hover:-translate-y-2 transition-transform duration-300">
                <TrendingUp className="w-8 h-8 text-brand-primary mb-6" />
                <div className="text-4xl font-serif font-bold text-bg-dark mb-2">+20<span className="text-brand-primary">%</span></div>
                <div className="text-text-light-bg/60 font-medium">{"Annual Growth Rate"}</div>
              </div>
              <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-brand-ash/10 hover:-translate-y-2 transition-transform duration-300 sm:translate-y-12">
                <Building2 className="w-8 h-8 text-brand-primary mb-6" />
                <div className="text-4xl font-serif font-bold text-bg-dark mb-2">20k<span className="text-brand-primary">+</span></div>
                <div className="text-text-light-bg/60 font-medium">{"Tons of Castings Annually"}</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <TeamSection />

      <Footer />
    </main>
  );
}
