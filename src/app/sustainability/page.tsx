"use client";

import GlobalHeader from "@/components/GlobalHeader";
import Footer from "@/components/Footer";
import { Zap, Award, Factory, Cog } from "lucide-react";
import Image from "next/image";


export default function SustainabilityPage() {
  

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
                   ENVIRONMENTAL RESPONSIBILITY
                </div>
                <h1 className="text-hero-inner font-serif font-bold tracking-tight mb-6">
                   We Cleaner Processes, <span className="text-brand-primary">Greener Casting.</span>
                </h1>
                <p className="text-brand-ash/80 text-lg md:text-xl font-sans font-normal max-w-2xl leading-relaxed">
                 Sustainability engineered into every furnace, facility, and product — from raw material to final delivery.
                </p>
            </div>
            
            
        </div>
      </div>
    </section>

<section className="py-24 px-6 md:px-12 lg:px-16 bg-white relative -mt-12 rounded-t-[3rem] z-20 shadow-[0_-20px_40px_rgba(0,0,0,0.05)] border-t border-brand-ash/10">
<div className="max-w-[1400px] mx-auto">

 <div className="flex flex-col gap-6 md:grid md:grid-cols-2">

      {/* Card 1 — Certifications (Full width on desktop) */}
      <div className="md:col-span-1 bg-text-dark-bg border border-brand-ash/20 shadow-sm rounded-3xl p-8 md:p-12 flex flex-col gap-8">
        <div>
          <h3 className="text-section-h3 font-serif font-semibold text-text-light-bg tracking-tight mb-4">
            Certifications
          </h3>
          <p className="text-text-light-bg/70 font-sans text-body-lg leading-relaxed max-w-3xl">
            Certified across environmental management, product quality, and workplace safety — globally recognized, independently audited.
          </p>
        </div>

        {/* Logo Row */}
        <div className="flex flex-wrap items-center gap-6">
          <div className="px-6 py-4 bg-white rounded-2xl border border-brand-primary/20 text-text-light-bg font-semibold font-sans text-sm h-full grid place-items-center">
            <img src="certified/iso-14001-2015.webp" alt="ISO 14001" width={100} height={100} />
          </div>
          <div className="px-6 py-4 bg-white rounded-2xl border border-brand-primary/20 text-text-light-bg font-semibold font-sans text-sm h-full grid place-items-center">
            <img src="certified/ISO_9001-2015.svg" alt="ISO 9001" width={100} height={100} />
          </div>
          <div className="px-6 py-4 bg-white rounded-2xl border border-brand-primary/20 text-text-light-bg font-semibold font-sans text-sm h-full grid place-items-center">
            <img src="certified/ISO-45001-2018.png" alt="ISO 45001" width={100} height={100} />
          </div>
        </div>
      </div>

      {/* Card 2 — Zero-Coal Foundry */}
      <div className="bg-text-dark-bg border border-brand-ash/20 shadow-sm rounded-3xl p-8 flex flex-col gap-4">
        <h3 className="text-section-h3 font-serif font-semibold text-text-light-bg tracking-tight">
          Zero-Coal Foundry
        </h3>
        <p className="text-text-light-bg/70 font-sans text-body-lg leading-relaxed">
          Electrical induction furnaces replace coal-fired melting. Rooftop solar powers operations. Foundry sand is fully recycled and reused. The result — drastically lower emissions without compromising output.
        </p>
      </div>

      {/* Card 3 — Environmental Policy */}
      <div className="bg-text-dark-bg border border-brand-ash/20 shadow-sm rounded-3xl p-8 flex flex-col gap-4">
        <h3 className="text-section-h3 font-serif font-semibold text-text-light-bg tracking-tight">
          Environmental Policy
        </h3>
        <p className="text-text-light-bg/70 font-sans text-body-lg leading-relaxed">
          We don't just comply, we lead. Every facility is continuously upgraded with eco-friendly machinery. Air, land, and water pollution are actively prevented through stringent controls. All environmental data is shared transparently with customers and partners.
        </p>
      </div>

      {/* Card 4 — Standards & Declarations */}
      <div className="bg-text-dark-bg border border-brand-ash/20 shadow-sm rounded-3xl p-8 flex flex-col gap-6">
        <h3 className="text-section-h3 font-serif font-semibold text-text-light-bg tracking-tight">
          Standards & Declarations
        </h3>
        <div className="flex flex-col gap-3 text-text-light-bg/80 font-sans text-body-lg">
          <div>
            <span className="font-semibold">EN 15804 (EPD)</span> — full life-cycle transparency
          </div>
          <div>
            <span className="font-semibold">REACH & RoHS</span> — zero hazardous substances
          </div>
          <div>
            <span className="font-semibold">BS-EN-124</span> — European municipal casting compliance
          </div>
        </div>
      </div>

    </div>

</div>


</section>

    
    

      
     
  

   

      <Footer />
    </main>
  );
}
