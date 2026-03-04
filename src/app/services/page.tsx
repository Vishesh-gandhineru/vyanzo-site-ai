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

// Service Data
const services = [
  {
    id: "development",
    title: "Product Development",
    icon: <PenTool className="w-6 h-6" />,
    description:
      "Vyanzo provides a high-level engineering resource to help clients design or optimize products.",
    highlights: [
      { label: "Expertise", value: "Access to a team of over 10 engineers." },
      {
        label: "Experience",
        value: "A combined 150 years of experience in the casting industry.",
      },
      {
        label: "Focus",
        value:
          "Designing and optimizing products to specifically suit customer needs and technical requirements.",
      },
    ],
  },
  {
    id: "production",
    title: "A-Z Production Excellence",
    icon: <Factory className="w-6 h-6" />,
    description:
      "Vyanzo manages the entire manufacturing lifecycle, ensuring quality at every stage according to specific client requirements.",
    highlights: [
      {
        label: "Pattern Making",
        value: "Creating the initial molds and patterns.",
      },
      {
        label: "Sampling",
        value: "Producing prototypes and samples for approval.",
      },
      {
        label: "Quality Control",
        value: "Rigorous testing and inspection throughout the production run.",
      },
      {
        label: "Finishing & Coating",
        value:
          "Offering various painting and coating options, including: Water-based paint, KTL (E-coating), Epoxy coatings.",
      },
      {
        label: "Assembly",
        value: "Final assembly of components before shipment.",
      },
    ],
  },
  {
    id: "logistics",
    title: "Custom Packaging & Delivery Options",
    icon: <Package className="w-6 h-6" />,
    description:
      "Clients have full control over how their products are protected and branded during transit.",
    highlights: [
      {
        label: "Packaging Specs",
        value: "Customized number of items per pallet or box.",
      },
      {
        label: "Protection",
        value: "Options for plastic wrap or specialized shielding.",
      },
      { label: "Branding", value: "Custom design and content for labels." },
      {
        label: "Logistics",
        value:
          "Shipments scheduled according to client timelines, utilizing 20-foot and 40-foot containers.",
      },
    ],
  },
  {
    id: "certification",
    title: "Product Certification",
    icon: <ShieldCheck className="w-6 h-6" />,
    description:
      "Vyanzo offers specialized assistance with international certification processes to ensure products meet global safety and quality standards.",
    highlights: [
      {
        label: "Available Certifications",
        value: "EN124-2 (Ductile iron manhole covers)",
      },
      { label: "BENOR", value: "Belgian certification" },
      { label: "Other (On Request)", value: "BS-Kitemark / KOMO / ICMQ / MPA" },
    ],
  },
];

export default function ServicesPage() {
  // Service strings extracted directly on outer component.

  const productCategories = [
    {
      name: "Manhole & Hydraulic Covers",
      icon: <CircleDot className="w-8 h-8" />,
    },
    {
      name: "Surface Boxes",
      icon: <Settings2 className="w-8 h-8" />,
    },
    { name: "Siphons", icon: <Wrench className="w-8 h-8" /> },
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
                Services Portfolio
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight mb-6 leading-[1.1] ">
                Excellence Forged,
                <br />
                <span className="text-brand-primary italic">
                  Service Perfected.
                </span>
              </h1>
              <p className="text-brand-ash/80 text-body-xl font-sans font-normal max-w-2xl leading-relaxed">
                Vyanzo offers a comprehensive suite of services designed to
                streamline the casting and manufacturing process, from initial
                design to final delivery.
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
                {"Our Services"}
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-auto">
                          {service.highlights.map((highlight, idx) => (
                            <div
                              key={idx}
                              className="bg-white p-6 rounded-2xl shadow-sm border border-brand-ash/10 hover:-translate-y-1 transition-transform"
                            >
                              <div className="flex items-start gap-4">
                                <CheckCircle2 className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                                <div>
                                  <h4 className="font-bold text-bg-dark mb-1">
                                    {highlight.label}
                                  </h4>
                                  <p className="text-text-light-bg/70 text-sm leading-relaxed">
                                    {highlight.value}
                                  </p>
                                </div>
                              </div>
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
              Other Product Categories Served
            </h2>
            <p className="text-body-xl text-text-light-bg/70">
              While providing these services, Vyanzo focuses on the following
              primary product lines:
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
