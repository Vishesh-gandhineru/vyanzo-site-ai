"use client";

import CobeGlobe from "./CobeGlobe";
import { ArrowUpRight, BarChart3, Users, Zap, Award, Factory } from "lucide-react";

export default function BentoGrid() {
  return (
    <section className="w-full bg-[#f8f9fc] py-24 px-4 md:px-8 border-t border-black/5 font-sans">
      <div className="max-w-7xl mx-auto">
        
          {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-text-light-bg tracking-tight mb-6">
                   Built for Global Impact
                </h2>
                <p className="text-bg-dark/70 text-lg md:text-xl font-sans font-normal">
                   Delivering unparalleled casting solutions across the globe with precision, scale, and reliability since 1999.
                </p>
            </div>
           
        </div>

        <div className="flex flex-col md:grid md:grid-cols-4 gap-4 md:gap-6 md:auto-rows-[240px]">
          
          {/* Card 1: Top Left (H:2 W:1) */}
          <div className="min-h-[300px] md:min-h-0 md:col-span-1 md:row-span-2 bg-text-dark-bg border border-brand-ash/20 shadow-sm rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group hover:border-brand-primary/30 transition-colors">
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-primary/10 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-brand-primary/20" />
            <div>
              <Zap className="w-10 h-10 text-brand-primary mb-6" strokeWidth={1.5} />
              <h3 className="text-2xl lg:text-3xl font-serif font-semibold text-text-light-bg mb-3 tracking-tight">Unsurpassed Quality</h3>
              <p className="text-text-light-bg/70 font-sans font-normal leading-relaxed">Engineered for perfection in every dimension and pour.</p>
            </div>
            <div className="mt-8 z-10">
               <div className="text-5xl lg:text-6xl font-sans font-bold text-text-light-bg tracking-tighter">99.9%</div>
               <div className="text-sm text-brand-ash mt-2 uppercase tracking-widest font-sans font-normal">Defect-Free Output</div>
            </div>
          </div>

          {/* Card 2: Top Center (H:1 W:2) */}
          <div className="min-h-[200px] md:min-h-0 md:col-span-2 md:row-span-1 bg-text-dark-bg border border-brand-ash/20 shadow-sm rounded-4xl p-8 flex flex-col justify-center items-center text-center relative overflow-hidden group hover:border-brand-primary/30 transition-colors">
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-brand-primary/5 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <Award className="w-8 h-8 text-brand-primary mb-4" strokeWidth={1.5} />
            <h3 className="text-3xl xl:text-4xl font-serif font-semibold text-text-light-bg z-10 tracking-tight">Vast Global Reach</h3>
            <p className="text-text-light-bg/70 mt-3 z-10 text-base xl:text-lg font-sans font-normal leading-relaxed">Serving customers in Belgium, France, Spain, Italy, Austria, Holland, UK, USA, and Canada.</p>
          </div>

          {/* Card 3: Top Right (H:1 W:1) */}
          <div className="min-h-[200px] md:min-h-0 md:col-span-1 md:row-span-1 bg-text-dark-bg border border-brand-ash/20 shadow-sm rounded-3xl p-6 flex flex-col items-start justify-center group hover:border-brand-primary/30 transition-colors">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-brand-ash/20 mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-5 h-5 text-brand-primary" />
            </div>
            <div className="text-4xl lg:text-5xl font-sans font-bold text-text-light-bg tracking-tighter mb-1">500+</div>
            <div className="text-sm text-brand-ash uppercase tracking-widest font-sans font-normal flex items-center gap-2">
                Active Partners
                <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
            </div>
          </div>

          {/* Card 4: Middle Center (GLOBE CARD) (H:2 W:2) */}
          <div className="min-h-[400px] md:min-h-0 md:col-span-2 md:row-span-2 bg-linear-to-b from-white to-text-dark-bg border border-brand-ash/20 shadow-sm rounded-[2.5rem] flex flex-col items-center justify-center relative overflow-hidden group">
            
            {/* Title overlay at the top of the globe */}
            <div className="absolute top-8 left-8 right-8 z-20 flex justify-between items-start pointer-events-none">
                <div>
                   <h3 className="text-2xl font-serif font-semibold text-text-light-bg tracking-tight">Worldwide Impact</h3>
                   <p className="text-text-light-bg/70 mt-1 font-sans font-normal">Interactive live delivery routes</p>
                </div>
                <div className="px-3 py-1 bg-brand-primary/10 text-brand-primary text-xs font-sans font-bold rounded-full border border-brand-primary/20 uppercase tracking-wider backdrop-blur-md">
                   Live
                </div>
            </div>

            {/* The Globe */}
            <div className="absolute inset-x-0 -bottom-16 top-0 z-0 flex items-center justify-center">
               <CobeGlobe />
            </div>

            {/* Subtle glow behind globe */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-primary/5 blur-[100px] rounded-full pointer-events-none" />

            {/* Labels at bottom */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-col xl:flex-row justify-between z-10 gap-3 pointer-events-none">
               <div className="bg-white/90 backdrop-blur-xl border border-brand-ash/20 shadow-sm px-4 py-3 rounded-2xl flex items-center gap-3 w-fit">
                  <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center">
                     <div className="w-2 h-2 rounded-full bg-brand-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-sans font-medium text-text-light-bg">Supply Chain</div>
                    <div className="text-xs text-brand-ash font-sans font-normal">End-to-end tracking</div>
                  </div>
               </div>
               
               <div className="bg-white/90 backdrop-blur-xl border border-brand-ash/20 shadow-sm px-4 py-3 rounded-2xl flex items-center gap-3 w-fit">
                  <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center">
                     <div className="w-2 h-2 rounded-full bg-brand-primary" />
                  </div>
                  <div>
                     <div className="text-sm font-sans font-medium text-text-light-bg">Production Sites</div>
                     <div className="text-xs text-brand-ash font-sans font-normal">India, Turkey, China & Vietnam</div>
                  </div>
               </div>
            </div>
          </div>

          {/* Card 5: Middle Right (H:1 W:1) */}
          <div className="min-h-[200px] md:min-h-0 md:col-span-1 md:row-span-1 bg-text-dark-bg border border-brand-ash/20 shadow-sm rounded-3xl p-6 flex flex-col justify-center items-center text-center relative overflow-hidden group hover:border-brand-primary/30 transition-colors">
            <div className="text-sm xl:text-xs 2xl:text-sm text-brand-ash uppercase tracking-widest font-sans font-normal mb-4 text-balance">Annual Production Volume</div>
            <div className="text-4xl lg:text-5xl font-sans font-bold text-brand-primary tracking-tighter drop-shadow-[0_0_15px_rgba(110,176,255,0.4)]">&gt;20,000</div>
            <div className="text-sm text-text-light-bg/80 mt-2 font-sans font-medium text-balance">Tons of castings shipped worldwide</div>
          </div>

          {/* Card 6: Bottom Left (H:1 W:1) */}
          <div className="min-h-[200px] md:min-h-0 md:col-span-1 md:row-span-1 bg-brand-primary/10 border border-brand-primary/20 rounded-3xl p-6 flex flex-col justify-between hover:bg-brand-primary hover:text-white transition-colors cursor-pointer group shadow-sm text-text-light-bg">
             <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-primary group-hover:text-brand-primary transition-colors mb-4 shadow-sm">
                <ArrowUpRight className="w-6 h-6" />
             </div>
             <div>
                <h3 className="text-2xl font-serif font-semibold group-hover:text-white transition-colors">Contact Sales</h3>
                <p className="text-sm opacity-80 mt-1 font-sans font-normal">Get custom quotes</p>
             </div>
          </div>

          {/* Card 7: Bottom Right (H:1 W:1) */}
          <div className="min-h-[200px] md:min-h-0 md:col-span-1 md:row-span-1 bg-text-dark-bg border border-brand-ash/20 shadow-sm rounded-3xl p-6 relative overflow-hidden group hover:border-brand-primary/30 transition-colors">
              <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-brand-primary/10 blur-2xl rounded-full transition-all group-hover:bg-brand-primary/20" />
              <Factory className="w-8 h-8 text-brand-primary mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-serif font-semibold text-text-light-bg mb-4">Industry Compliance</h3>
              <div className="flex flex-wrap gap-2 relative z-10">
                 <span className="px-3 py-1.5 bg-white rounded-full text-xs text-brand-ash border border-brand-ash/20 font-sans font-normal">COPRO</span>
                 <span className="px-3 py-1.5 bg-white rounded-full text-xs text-brand-ash border border-brand-ash/20 font-sans font-normal">Benor</span>
                 <span className="px-3 py-1.5 bg-white rounded-full text-xs text-brand-ash border border-brand-ash/20 font-sans font-normal">ISO 9001:2015</span>
                 <span className="px-3 py-1.5 bg-white rounded-full text-xs text-brand-ash border border-brand-ash/20 font-sans font-normal">ISO 14001:2015</span>
                 <span className="px-3 py-1.5 bg-white rounded-full text-xs text-brand-ash border border-brand-ash/20 font-sans font-normal">ISO 45001:2018</span>
              </div>
           </div>

        </div>
      </div>
    </section>
  );
}
