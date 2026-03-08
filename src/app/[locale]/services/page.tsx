"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlobalHeader from "@/components/GlobalHeader";
import Footer from "@/components/Footer";
import {
  PenTool,
  Factory,
  Package,
  ShieldCheck,
  Wrench,
  Settings,
  CircleDot,
  Grid,
  Settings2,
  CheckCircle2,
} from "lucide-react";
import { useTranslations } from "next-intl";

export default function ServicesPage() {
  const t = useTranslations("ServicesPage");

  // Service Data
  const services = [
    {
      id: "development",
      title: t("servicesList.development.title"),
      icon: <PenTool className="w-6 h-6" />,
      description: t("servicesList.development.description"),
      highlights: [
        {
          label: t("servicesList.development.highlights.expertise.label"),
          value: t("servicesList.development.highlights.expertise.value"),
        },
        {
          label: t("servicesList.development.highlights.experience.label"),
          value: t("servicesList.development.highlights.experience.value"),
        },
        {
          label: t("servicesList.development.highlights.focus.label"),
          value: t("servicesList.development.highlights.focus.value"),
        },
      ],
    },
    {
      id: "production",
      title: t("servicesList.production.title"),
      icon: <Factory className="w-6 h-6" />,
      description: t("servicesList.production.description"),
      highlights: [
        {
          label: t("servicesList.production.highlights.pattern.label"),
          value: t("servicesList.production.highlights.pattern.value"),
        },
        {
          label: t("servicesList.production.highlights.sampling.label"),
          value: t("servicesList.production.highlights.sampling.value"),
        },
        {
          label: t("servicesList.production.highlights.quality.label"),
          value: t("servicesList.production.highlights.quality.value"),
        },
        {
          label: t("servicesList.production.highlights.finishing.label"),
          value: t("servicesList.production.highlights.finishing.value"),
        },
        {
          label: t("servicesList.production.highlights.assembly.label"),
          value: t("servicesList.production.highlights.assembly.value"),
        },
      ],
    },
    {
      id: "logistics",
      title: t("servicesList.logistics.title"),
      icon: <Package className="w-6 h-6" />,
      description: t("servicesList.logistics.description"),
      highlights: [
        {
          label: t("servicesList.logistics.highlights.packaging.label"),
          value: t("servicesList.logistics.highlights.packaging.value"),
        },
        {
          label: t("servicesList.logistics.highlights.protection.label"),
          value: t("servicesList.logistics.highlights.protection.value"),
        },
        {
          label: t("servicesList.logistics.highlights.branding.label"),
          value: t("servicesList.logistics.highlights.branding.value"),
        },
        {
          label: t("servicesList.logistics.highlights.schedule.label"),
          value: t("servicesList.logistics.highlights.schedule.value"),
        },
      ],
    },
    {
      id: "certification",
      title: t("servicesList.certification.title"),
      icon: <ShieldCheck className="w-6 h-6" />,
      description: t("servicesList.certification.description"),
      highlights: [
        {
          label: t("servicesList.certification.highlights.copro.label"),
          value: t("servicesList.certification.highlights.copro.value"),
          icon: (
            <img
              src="/certified/COPRO.svg"
              alt="Copro"
              className="h-16 w-auto object-contain mx-auto"
            />
          ),
        },
        {
          label: t("servicesList.certification.highlights.benor.label"),
          value: t("servicesList.certification.highlights.benor.value"),
          icon: (
            <img
              src="/certified/BENOR.png"
              alt="BENOR"
              className="h-16 w-auto object-contain mx-auto"
            />
          ),
        },
        {
          label: t("servicesList.certification.highlights.en124.label"),
          value: t("servicesList.certification.highlights.en124.value"),
          icon: <ShieldCheck className="w-6 h-6" />,
        },
        {
          label: t("servicesList.certification.highlights.mpa.label"),
          value: t("servicesList.certification.highlights.mpa.value"),
          icon: (
            <img
              src="/certified/MPA-Bremen-logo.webp"
              alt="MPA Bremen"
              className="h-16 w-auto object-contain mx-auto"
            />
          ),
        },
        {
          label: t("servicesList.certification.highlights.icmq.label"),
          value: t("servicesList.certification.highlights.icmq.value"),
          icon: (
            <img
              src="/certified/logo1-default.png"
              alt="ICMQ"
              className="h-16 w-auto object-contain mx-auto"
            />
          ),
        },
      ],
    },
    {
      id: "foundry-certifications",
      title: t("servicesList.foundry.title"),
      icon: <ShieldCheck className="w-6 h-6" />,
      description: t("servicesList.foundry.description"),
      highlights: [
        {
          label: t("servicesList.foundry.highlights.iso9001.label"),
          value: t("servicesList.foundry.highlights.iso9001.value"),
          icon: (
            <img
              src="/certified/ISO_9001-2015.svg"
              alt="ISO 9001"
              className="h-[130px] p-[6px] w-auto object-contain mx-auto"
            />
          ),
        },
        {
          label: t("servicesList.foundry.highlights.iso14001.label"),
          value: t("servicesList.foundry.highlights.iso14001.value"),
          icon: (
            <img
              src="/certified/iso-14001-2015.webp"
              alt="ISO 14001"
              className="h-[130px] p-[8px] w-auto object-contain mx-auto"
            />
          ),
        },
        {
          label: t("servicesList.foundry.highlights.iso45001.label"),
          value: t("servicesList.foundry.highlights.iso45001.value"),
          icon: (
            <img
              src="/certified/ISO-45001-2018.png"
              alt="ISO 45001"
              className="h-[130px] w-auto object-contain mx-auto"
            />
          ),
        },
      ],
    },
  ];

  const productCategories = [
    {
      name: t("categories.manhole"),
      icon: <CircleDot className="w-8 h-8" />,
    },
    {
      name: t("categories.surfaceBoxes"),
      icon: <Settings2 className="w-8 h-8" />,
    },
    { name: t("categories.siphons"), icon: <Wrench className="w-8 h-8" /> },
  ];

  const [activeTab, setActiveTab] = useState(services[0].id);

  return (
    <main className="min-h-screen bg-[#f8f9fc] font-sans flex flex-col">
      <GlobalHeader />

      {/* Hero Section */}

      <section className="w-full bg-bg-dark text-white py-24 px-4 md:px-8 font-sans relative overflow-hidden">
        {/* Background Graphic */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-3xl -mr-[200px] -mt-[200px] pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 text-brand-primary text-sm font-sans font-bold tracking-widest uppercase mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary"></span>
                {t("hero.subtitle")}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight mb-6 leading-[1.1] ">
                {t("hero.titleStart")}
                <br />
                <span className="text-brand-primary italic">
                  {t("hero.titleHighlight")}
                </span>
              </h1>
              <p className="text-brand-ash/80 text-body-xl font-sans font-normal max-w-2xl leading-relaxed">
                {t("hero.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Services Tabs Section */}
      <section className="section-xl bg-white relative -mt-12 rounded-t-[3rem] z-20 shadow-[0_-20px_40px_rgba(0,0,0,0.05)] border-t border-brand-ash/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
            {/* Sidebar Navigation */}
            <div className="lg:w-1/3 shrink-0 flex flex-col gap-4 sticky top-32 h-fit">
              <h3 className="text-section-h2 font-serif text-bg-dark mb-4">
                {t("tabs.title")}
              </h3>
              {services.map((service) => {
                const isActive = activeTab === service.id;
                return (
                  <button
                    key={service.id}
                    onClick={() => setActiveTab(service.id)}
                    className={`relative p-6 rounded-2xl flex items-center gap-4 text-left transition-all duration-300 w-full group overflow-hidden ${
                      isActive
                        ? "bg-bg-dark text-white shadow-xl"
                        : "bg-[#f8f9fc] text-bg-dark hover:bg-brand-primary/10 hover:text-bg-dark"
                    }`}
                  >
                    {/* Active State Background Animation */}
                    {isActive && (
                      <motion.div
                        layoutId="active-tab-indicator"
                        className="absolute inset-0 bg-bg-dark z-0 rounded-2xl"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}

                    <div
                      className={`relative z-10 flex items-center gap-4 w-full ${isActive ? "text-white" : ""}`}
                    >
                      <div
                        className={`shrink-0 p-3 rounded-xl transition-colors ${
                          isActive
                            ? "bg-brand-primary/20 text-brand-primary"
                            : "bg-white text-brand-ash group-hover:text-brand-primary border border-brand-ash/20"
                        }`}
                      >
                        {service.icon}
                      </div>
                      <span className="font-bold text-body-lg">
                        {service.title}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Content Display Area */}
            <div className="flex-1 min-h-[500px] relative">
              <AnimatePresence mode="wait">
                {services.map(
                  (service) =>
                    service.id === activeTab && (
                      <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{
                          opacity: 0,
                          y: -20,
                          filter: "blur(10px)",
                          display: "none",
                        }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="bg-[#f8f9fc] rounded-[3rem] p-10 md:p-16 border border-brand-ash/10 shadow-sm flex flex-col h-full"
                      >
                        <div className="w-20 h-20 bg-brand-primary/10 rounded-2xl flex items-center justify-center mb-8 text-brand-primary border border-brand-primary/20">
                          {service.icon}
                        </div>
                        <h3 className="text-section-h3 font-serif font-bold text-bg-dark mb-6">
                          {service.title}
                        </h3>
                        <p className="text-body-xl text-text-light-bg/70 leading-relaxed font-light mb-12">
                          {service.description}
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-auto">
                          {service.highlights.map((highlight, idx) => (
                            <div
                              key={idx}
                              className="bg-white p-6 rounded-2xl shadow-sm border border-brand-ash/10 hover:-translate-y-1 transition-transform flex flex-col items-center justify-start text-center gap-3"
                            >
                              {"icon" in highlight ? (
                                highlight.icon
                              ) : (
                                <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0" />
                              )}
                              <h4 className="font-bold text-bg-dark">
                                {highlight.label}
                              </h4>
                              {highlight.value &&
                                typeof highlight.value === "string" &&
                                !("icon" in highlight) && (
                                  <p className="text-text-light-bg/70 text-sm leading-relaxed">
                                    {highlight.value}
                                  </p>
                                )}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ),
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Core Product Categories Served */}
      <section className="section-xl bg-[#f8f9fc]">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-section-h2 font-serif font-bold text-bg-dark mb-6">
              {t("categories.title")}
            </h2>
            <p className="text-body-xl text-text-light-bg/70">
              {t("categories.description")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {productCategories.map((cat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-3xl p-8 flex flex-col items-center justify-center text-center gap-6 shadow-sm border border-brand-ash/10 hover:border-brand-primary/30 hover:shadow-[0_10px_40px_rgba(253,231,76,0.15)] hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="w-20 h-20 bg-[#f8f9fc] rounded-full flex items-center justify-center text-brand-ash group-hover:bg-bg-dark group-hover:text-brand-primary transition-colors duration-300">
                  {cat.icon}
                </div>
                <h4 className="font-bold text-bg-dark font-sans text-body-lg">
                  {cat.name}
                </h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
