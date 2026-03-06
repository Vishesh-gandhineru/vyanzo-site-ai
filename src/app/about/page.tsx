"use client";

import { motion } from "framer-motion";
import GlobalHeader from "@/components/GlobalHeader";
import Footer from "@/components/Footer";
import TeamSection from "@/components/TeamSection";
import {
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Users2,
  Building2,
  Globe,
  Wrench,
  CircleDot,
  Settings2,
} from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f8f9fc] font-sans flex flex-col">
      <GlobalHeader />

      {/* Hero / Overview Section */}

      <section className="w-full bg-bg-dark text-white py-24 px-4 md:px-8 font-sans relative overflow-hidden">
        {/* Background Graphic */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-3xl -mr-[200px] -mt-[200px] pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 text-brand-primary text-sm font-sans font-bold tracking-widest uppercase mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary"></span>
                Company Profile
              </div>
              <h1 className="text-hero-inner font-serif font-bold tracking-tight mb-6">
                About <span className="text-brand-primary italic">Vyanzo</span>.
              </h1>
              <p className="text-brand-ash/80 text-body-xl  font-sans font-normal max-w-2xl leading-relaxed">
                Discover our range of meticulously designed and manufactured
                products. Vyanzo delivers top-quality castings to the most
                demanding customers — consistent quality and service level are
                paramount to what we do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy & Meaning */}
      <section className="section-xl bg-white relative -mt-12 rounded-t-[3rem] z-20 shadow-[0_-20px_40px_rgba(0,0,0,0.05)] border-t border-brand-ash/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="flex-1 w-full"
            >
              <div className="w-full h-auto md:aspect-[4/3] bg-bg-dark rounded-[2.5rem] p-8 sm:p-10 md:p-12 relative overflow-hidden flex flex-col justify-center shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 to-transparent mix-blend-overlay"></div>
                <Globe className="w-16 h-16 text-brand-primary mb-6 md:mb-8 shrink-0" />
                <h3 className="text-3xl md:text-section-h3 font-serif font-bold text-white mb-4 md:mb-6 leading-tight">
                  Quality, Service & Reliability with relentless consistency.
                </h3>
                <p className="text-text-dark-bg/80 text-lg md:text-body-xl">
                  Since its inception in 2018, Vyanzo has evolved from an OEM
                  supplier to become a leading manufacturer of its own range of
                  Manhole Covers, Grates and other municipal casting products
                  now supplied across Europe.
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
              <h2 className="text-section-h2 font-serif font-bold text-bg-dark mb-6">
                End-to-End Service
              </h2>
              <p className="text-body-lg text-text-light-bg/70 leading-relaxed mb-8">
                We offer end-to-end services to customers around the world who
                share our business philosophy: Quality, Service & Reliability at
                a correct price — and that with relentless consistency. By
                managing production, quality assurance, and logistics in-house,
                Vyanzo ensures a seamless experience for its clients.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20">
                  <ShieldCheck className="w-6 h-6 text-brand-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-bg-dark">
                    {"COPRO BENOR Certified"}
                  </h4>
                  <p className="text-sm text-text-light-bg/60">
                    {"For the Belgian market, distributed via Viateq"}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Offerings & Products */}
      <section className="section-xl bg-text-dark-bg text-bg-dark relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-primary to-transparent opacity-20" />
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center max-w-3xl mx-auto"
          >
            <h2 className="text-section-h2 font-serif mb-6">Key Offerings</h2>
            <p className="text-body-xl text-text-dark-bg/70">
              Vyanzo is a leading supplier of premium casting products,
              engineered for scale and durability.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0 }}
              className="bg-white rounded-3xl p-8 flex flex-col items-center justify-center text-center gap-6 shadow-sm border border-brand-ash/10 hover:border-brand-primary/30 hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="w-20 h-20 bg-[#f8f9fc] rounded-full flex items-center justify-center text-brand-ash group-hover:bg-bg-dark group-hover:text-brand-primary transition-colors duration-300">
                <CircleDot className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-bg-dark font-sans text-body-lg">
                Manhole Covers
              </h4>
              <p className="text-body-lg text-text-light-bg/70 leading-relaxed">
                Heavy-duty, robust manhole cover solutions engineered for high
                traffic and demanding infrastructural applications.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-3xl p-8 flex flex-col items-center justify-center text-center gap-6 shadow-sm border border-brand-ash/10 hover:border-brand-primary/30 hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="w-20 h-20 bg-[#f8f9fc] rounded-full flex items-center justify-center text-brand-ash group-hover:bg-bg-dark group-hover:text-brand-primary transition-colors duration-300">
                <Wrench className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-bg-dark font-sans text-body-lg">
                Siphons
              </h4>
              <p className="text-body-lg text-text-light-bg/70 leading-relaxed">
                Precision-cast siphon fittings designed to strict European
                standards for reliable drainage and plumbing systems.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-3xl p-8 flex flex-col items-center justify-center text-center gap-6 shadow-sm border border-brand-ash/10 hover:border-brand-primary/30 hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="w-20 h-20 bg-[#f8f9fc] rounded-full flex items-center justify-center text-brand-ash group-hover:bg-bg-dark group-hover:text-brand-primary transition-colors duration-300">
                <Settings2 className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-bg-dark font-sans text-body-lg">
                Surface Boxes
              </h4>
              <p className="text-body-lg text-text-light-bg/70 leading-relaxed">
                Durable cast iron surface boxes built for valve access and
                utility protection in municipal and industrial environments.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Vyanzo Advantage */}
      <section className="section-xl  bg-[#f8f9fc]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-section-h2 font-serif  text-bg-dark mb-6">
                The Vyanzo Advantage
              </h2>
              <p className="text-body-lg text-text-light-bg/70 mb-12">
                A relentless focus on quality, scale, and sustainable
                production.
              </p>

              <div className="flex flex-col gap-8">
                <div className="flex gap-6">
                  <div className="shrink-0 mt-1">
                    <div className="w-12 h-12 bg-white rounded-full shadow-sm border border-brand-ash/20 flex items-center justify-center text-brand-primary font-bold">
                      01
                    </div>
                  </div>
                  <div>
                    <h4 className="text-card-title font-bold text-bg-dark mb-2">
                      State-of-the-Art Facilities
                    </h4>
                    <p className="text-text-light-bg/70 text-body-lg leading-relaxed">
                      We have continuously upgraded our production facilities
                      with the latest machines and technology, always
                      considering the environment and energy efficiency.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="shrink-0 mt-1">
                    <div className="w-12 h-12 bg-white rounded-full shadow-sm border border-brand-ash/20 flex items-center justify-center text-brand-primary font-bold">
                      02
                    </div>
                  </div>
                  <div>
                    <h4 className="text-card-title font-bold text-bg-dark mb-2">
                      Sustainable Manufacturing
                    </h4>
                    <p className="text-text-light-bg/70 text-body-lg leading-relaxed">
                      We don't melt with coal — we use the latest electrical
                      induction furnaces, massively reducing our environmental
                      impact.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="shrink-0 mt-1">
                    <div className="w-12 h-12 bg-white rounded-full shadow-sm border border-brand-ash/20 flex items-center justify-center text-brand-primary font-bold">
                      03
                    </div>
                  </div>
                  <div>
                    <h4 className="text-card-title font-bold text-bg-dark mb-2">
                      Built for the Future
                    </h4>
                    <p className="text-text-light-bg/70 text-body-lg leading-relaxed">
                      Vyanzo's production facilities are state-of-the-art and
                      ready to meet customer volume and quality demands for
                      decades to come.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 content-center">
              <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-brand-ash/10 hover:-translate-y-2 transition-transform duration-300">
                <TrendingUp className="w-8 h-8 text-brand-primary mb-6" />
                <div className="text-4xl font-serif font-bold text-bg-dark mb-2">
                  +20<span className="text-brand-primary">%</span>
                </div>
                <div className="text-text-light-bg/60 font-medium">
                  {"Annual Growth Rate"}
                </div>
              </div>
              <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-brand-ash/10 hover:-translate-y-2 transition-transform duration-300 sm:translate-y-12">
                <Building2 className="w-8 h-8 text-brand-primary mb-6" />
                <div className="text-4xl font-serif font-bold text-bg-dark mb-2">
                  250,000<span className="text-brand-primary">+</span>
                </div>
                <div className="text-text-light-bg/60 font-medium">
                  {"Tons of Castings Annually"}
                </div>
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
