"use client";

import { useState } from "react";
import { ChevronRight, Globe, ExternalLink, Plus, ArrowRight, FileDown, ChevronDown } from "lucide-react";

export default function ProductDetails() {
  const [isTechSheetOpen, setIsTechSheetOpen] = useState(false);
  const [openType, setOpenType] = useState<string | null>(null);

  const toggleType = (type: string) => {
    setOpenType(openType === type ? null : type);
  };

  const techSheetData = [
    { type: "B125", sizes: ["30*30", "40*40", "50*50", "60*60", "70*70", "80*80", "90*90", "100*100"] },
    { type: "C250", sizes: ["50", "60", "70", "80", "90"] },
    { type: "D400", sizes: ["40", "50", "60", "70", "90", "100", "110"] }
  ];

  return (
    <section className="w-full font-sans py-8 px-4 md:px-8 max-w-[1400px] mx-auto min-h-screen">
      
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-text-light-bg/60 font-medium mb-8">
        <a href="/" className="hover:text-bg-dark transition-colors">Home</a>
        <ChevronRight className="w-4 h-4" />
        <a href="/products" className="hover:text-bg-dark transition-colors">Covers</a>
        <ChevronRight className="w-4 h-4" />
        <span className="text-bg-dark font-semibold">Benor Certified Cover - D400</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* Main Product Content */}
        <div className="flex-1 flex flex-col">
          
          {/* Main Image */}
          <div className="w-full bg-brand-ash/10 rounded-3xl overflow-hidden relative mb-12 aspect-4/3 lg:aspect-auto lg:h-[600px] flex items-center justify-center">
            {/* Using the placeholder image style from the design to show the boat ropes, but usually it would be the real product */}
             <img 
               src="/products/manhole-cover.png" 
               alt="Hero Product Image" 
               className="w-full h-full object-contain p-12 lg:p-24 mix-blend-multiply"
             />
             <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md rounded-full px-5 py-2.5 flex items-center gap-2 shadow-sm border border-brand-ash/20">
               <Globe className="w-4 h-4 text-brand-primary" />
               <span className="text-xs font-bold tracking-widest text-bg-dark uppercase">Benor</span>
             </div>
          </div>

          {/* Title & Description Block */}
          <div className="border-b border-brand-ash/20 pb-12 mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-serif font-bold text-bg-dark tracking-tight mb-4">
              Benor Certified Cover - D400
            </h1>
            
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <p className="text-text-light-bg/60 font-sans font-normal text-lg leading-relaxed max-w-2xl">
                Heavy-duty municipal cover with Benor certification for Belgian infrastructure.
              </p>
              
              <div className="shrink-0 bg-brand-primary/10 border border-brand-primary/20 rounded-full px-6 py-3 flex items-center justify-center">
                <span className="text-brand-primary text-xs font-bold tracking-widest uppercase text-center leading-tight">
                  Manufacturer<br />Direct
                </span>
              </div>
            </div>
          </div>
        </div>


        {/* Sidebar */}
        <aside className="w-full lg:w-[400px] shrink-0 flex flex-col gap-8">
          
          {/* Documentation Card */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-brand-ash/20">
            <h3 className="flex items-center gap-3 text-bg-dark font-sans font-semibold text-xl mb-8">
               <ExternalLink className="w-6 h-6 text-brand-primary" />
               Documentation
            </h3>
            
            <div className="flex flex-col gap-4">
              
              {/* Tech Sheet Dropdown Container */}
              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => setIsTechSheetOpen(!isTechSheetOpen)}
                  className="w-full group flex items-center justify-between p-5 bg-[#f8f9fc] rounded-xl hover:bg-white hover:shadow-md hover:border-brand-primary/30 border border-transparent transition-all"
                >
                  <div className="flex items-center gap-4">
                    <Plus className="w-5 h-5 text-[#ef4444]" />
                    <div className="flex flex-col items-start">
                      <span className="font-semibold text-sm text-bg-dark mb-1">Technical Sheet</span>
                      <span className="text-[10px] font-bold tracking-widest text-brand-ash uppercase">Multiple Options</span>
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-brand-ash group-hover:text-brand-primary transition-transform duration-300 ${isTechSheetOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Content */}
                {isTechSheetOpen && (
                  <div className="flex flex-col gap-2 pl-4 border-l-2 border-brand-ash/20 ml-6 py-2">
                    {techSheetData.map((category) => (
                      <div key={category.type} className="flex flex-col gap-2">
                        <button 
                          onClick={() => toggleType(category.type)}
                          className="flex items-center justify-between text-left p-3 rounded-lg hover:bg-[#f8f9fc] transition-colors group/type"
                        >
                          <span className="text-sm font-semibold text-bg-dark font-sans group-hover/type:text-brand-primary transition-colors">
                            Type: {category.type}
                          </span>
                          <ChevronDown className={`w-4 h-4 text-brand-ash transition-transform duration-300 ${openType === category.type ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {openType === category.type && (
                          <div className="flex flex-col gap-1 pl-4 mb-2">
                            {category.sizes.map((size) => (
                              <a 
                                key={size}
                                href={`/downloads/tech_sheet_${category.type}_${size}.pdf`}
                                className="flex items-center justify-between p-3 rounded-lg text-sm font-sans text-text-light-bg/70 hover:text-brand-primary hover:bg-brand-primary/5 transition-colors group/size"
                                download
                              >
                                <span className="font-medium">Size: {size}</span>
                                <FileDown className="w-4 h-4 opacity-0 group-hover/size:opacity-100 transition-opacity" />
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Doc Item */}
              <a href="#" className="group flex items-center justify-between p-5 bg-[#f8f9fc] rounded-xl hover:bg-white hover:shadow-md hover:border-brand-primary/30 border border-transparent transition-all">
                <div className="flex items-center gap-4">
                  <Plus className="w-5 h-5 text-brand-primary" />
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm text-bg-dark mb-1">CAD Drawing</span>
                    <span className="text-[10px] font-bold tracking-widest text-brand-ash uppercase">DWG • 12.8 MB</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-brand-ash group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
              </a>

              {/* Doc Item */}
              <a href="#" className="group flex items-center justify-between p-5 bg-[#f8f9fc] rounded-xl hover:bg-white hover:shadow-md hover:border-brand-primary/30 border border-transparent transition-all">
                <div className="flex items-center gap-4">
                  <Plus className="w-5 h-5 text-[#10b981]" />
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm text-bg-dark mb-1">Maintenance Manual</span>
                    <span className="text-[10px] font-bold tracking-widest text-brand-ash uppercase">PDF • 5.1 MB</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-brand-ash group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
              </a>
              
            </div>

            <div className="mt-12 pt-8 border-t border-brand-ash/20">
              <div className="text-[10px] font-bold tracking-widest text-brand-ash uppercase mb-4">
                Request Support
              </div>
              <button className="w-full bg-bg-dark text-white hover:bg-brand-primary transition-colors py-4 rounded-xl font-bold text-sm shadow-[0_4px_14px_rgba(0,0,0,0.15)] hover:shadow-none">
                Contact Engineering
              </button>
              <p className="text-[11px] text-brand-ash font-medium text-center mt-6 italic">
                Architecture concrete textures & proprietary molding used in production.
              </p>
            </div>
          </div>

        </aside>
      </div>

    </section>
  );
}
