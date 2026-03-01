"use client";

import { useState } from "react";
import { 
  ChevronRight, Globe, ExternalLink, Plus, ArrowRight, FileDown, ChevronDown, 
  Folder, Factory, Activity, ChevronLeft, Star, ShoppingCart, Download, 
  ShieldCheck, Leaf, AlertCircle, Settings2, FileText, CheckCircle2 
} from "lucide-react";
import { Product, DocFolder } from "@/data/products";
import { Link } from "@/i18n/routing";
import { products } from "@/data/products";

const getIcon = (name?: string) => {
  switch (name) {
    case 'factory': return <Factory className="w-6 h-6 text-bg-dark" />;
    case 'globe': return <Globe className="w-6 h-6 text-bg-dark" />;
    case 'activity': return <Activity className="w-6 h-6 text-bg-dark" />;
    default: return <Plus className="w-6 h-6 text-bg-dark" />;
  }
};

function RecursiveDocsFolder({ folder, defaultOpen = false }: { folder: DocFolder; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="flex flex-col gap-2 w-full">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full group flex items-center justify-between p-3 rounded-lg hover:bg-[#f8f9fc] transition-colors group/type text-left"
      >
        <div className="flex items-center gap-3">
          <Folder className="w-4 h-4 text-brand-ash group-hover/type:text-brand-primary transition-colors" />
          <span className="text-sm font-semibold text-bg-dark font-sans group-hover/type:text-brand-primary transition-colors">
            {folder.name}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 text-brand-ash transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="flex flex-col gap-1 pl-4 border-l-2 border-brand-ash/20 ml-5 py-2">
          {folder.children.map((child, idx) => {
            if (child.type === 'folder') {
              return <RecursiveDocsFolder key={idx} folder={child as DocFolder} />;
            } else {
              return (
                <a 
                  key={idx}
                  href={child.path}
                  className="flex items-center justify-between p-3 rounded-lg text-sm font-sans text-text-light-bg/70 hover:text-brand-primary hover:bg-brand-primary/5 transition-colors group/size"
                  download
                  title={child.name}
                >
                  <span className="font-medium truncate max-w-[180px]">{child.name}</span>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-[10px] font-bold tracking-widest text-brand-ash uppercase">{child.size}</span>
                    <FileDown className="w-4 h-4 opacity-0 group-hover/size:opacity-100 transition-opacity" />
                  </div>
                </a>
              );
            }
          })}
        </div>
      )}
    </div>
  );
}

export default function ProductDetails({ product }: { product: Product }) {
  const [isTechSheetOpen, setIsTechSheetOpen] = useState(false);
  const similarProducts = products.filter(p => p.id !== product.id).slice(0, 3);

  return (
    <section className="w-full font-sans py-8 px-4 md:px-8 max-w-[1400px] mx-auto min-h-screen">
      
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-text-light-bg/60 font-medium mb-8 overflow-x-auto whitespace-nowrap pb-2">
        <Link href="/" className="hover:text-bg-dark transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4 shrink-0" />
        <Link href="/products" className="hover:text-bg-dark transition-colors">{product.category || "Products"}</Link>
        <ChevronRight className="w-4 h-4 shrink-0" />
        <span className="text-bg-dark font-semibold">{product.title}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 mb-10">
        
        {/* Left: Main Product Hero Content */}
        <div className="flex-1 flex flex-col">
          
          {/* Main Image & Gallery Layout */}
          <div className="flex flex-col gap-4 mb-16">
            <div className="w-full bg-[#f8f9fc] rounded-[2rem] md:rounded-[3rem] overflow-hidden relative aspect-square lg:aspect-auto lg:h-[550px] flex items-center justify-center border border-brand-ash/10 group">
               {product.isBenor && (
                 <div className="absolute top-6 left-6 md:top-8 md:left-8 bg-white border border-brand-ash/20 rounded-full px-5 py-2.5 flex items-center gap-2 shadow-sm z-10">
                   <Globe className="w-4 h-4 text-brand-primary" />
                   <span className="text-xs font-bold tracking-[0.15em] text-bg-dark uppercase">BENOR</span>
                 </div>
               )}
               <img 
                 src={product.image} 
                 alt={product.title} 
                 className="w-full h-full object-contain p-12 md:p-16 mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-105"
               />
            </div>
            
            {/* Thumbnail Gallery (Exact match to Ref Image 1 layout) */}
            <div className="grid grid-cols-4 gap-4 w-full h-[120px] md:h-[140px]">
              {[1, 2, 3, 4].map((_, idx) => (
                <button 
                  key={idx} 
                  className={`w-full h-full rounded-2xl md:rounded-[2rem] flex items-center justify-center p-4 cursor-pointer transition-all border
                  ${idx === 0 
                     ? 'bg-white border-brand-primary/40 shadow-sm' 
                     : 'bg-[#f8f9fc] border-brand-ash/10 hover:border-brand-primary/30 hover:bg-white'} group`}
                >
                   <img 
                     src={product.image} 
                     alt="thumbnail" 
                     className={`w-full h-full object-contain mix-blend-multiply transition-opacity ${idx === 0 ? 'opacity-100' : 'opacity-50 group-hover:opacity-100'}`} 
                   />
                </button>
              ))}
            </div>
          </div>

          
        </div>

        {/* Right Sidebar: Documentation */}
        <aside className="w-full lg:w-[420px] shrink-0 flex flex-col gap-8">
          
          {/* Documentation Card (Styled similarly from Image 2 but light) */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-brand-ash/20 h-fit">
            <h3 className="flex items-center gap-3 text-bg-dark font-sans font-semibold text-2xl mb-8 tracking-tight">
               <ExternalLink className="w-6 h-6 text-brand-primary" />
               Documentation
            </h3>
            
            <div className="flex flex-col gap-4">
              
              {/* Tech Sheet Dropdown Container */}
              {product.docsTree && (
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={() => setIsTechSheetOpen(!isTechSheetOpen)}
                    className="w-full group flex items-center justify-between p-5 bg-[#f8f9fc] rounded-[1.5rem] hover:bg-white hover:shadow-md hover:border-brand-primary/30 border border-transparent transition-all"
                  >
                    <div className="flex items-center gap-5">
                      <Plus className="w-6 h-6 text-[#ef4444]" />
                      <div className="flex flex-col items-start text-left">
                        <span className="font-semibold text-base text-bg-dark mb-1">Technical Sheets</span>
                        <span className="text-[10px] font-bold tracking-widest text-brand-ash uppercase">Multiple Options</span>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-brand-ash group-hover:text-brand-primary transition-transform duration-300 ${isTechSheetOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Content */}
                  {isTechSheetOpen && (
                    <div className="bg-white border border-brand-ash/10 rounded-xl p-2 mt-2 shadow-sm">
                      <RecursiveDocsFolder folder={product.docsTree} defaultOpen={true} />
                    </div>
                  )}
                </div>
              )}

              {/* Doc Item */}
              <a href="#" className="group flex items-center justify-between p-5 bg-[#f8f9fc] rounded-[1.5rem] hover:bg-white hover:shadow-md hover:border-brand-primary/30 border border-transparent transition-all">
                <div className="flex items-center gap-5">
                  <Plus className="w-6 h-6 text-brand-primary" />
                  <div className="flex flex-col">
                    <span className="font-semibold text-base text-bg-dark mb-1">CAD Drawing</span>
                    <span className="text-[10px] font-bold tracking-widest text-brand-ash uppercase">DWG • 12.8 MB</span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-brand-ash group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
              </a>

              {/* Doc Item */}
              <a href="#" className="group flex items-center justify-between p-5 bg-[#f8f9fc] rounded-[1.5rem] hover:bg-white hover:shadow-md hover:border-brand-primary/30 border border-transparent transition-all">
                <div className="flex items-center gap-5">
                  <Plus className="w-6 h-6 text-[#10b981]" />
                  <div className="flex flex-col">
                    <span className="font-semibold text-base text-bg-dark mb-1">Maintenance Manual</span>
                    <span className="text-[10px] font-bold tracking-widest text-brand-ash uppercase">PDF • 5.1 MB</span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-brand-ash group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
              </a>
              
            </div>

            <div className="mt-12 pt-8 border-t border-brand-ash/20">
              <div className="text-[10px] font-bold tracking-widest text-brand-ash uppercase mb-4">
                Request Support
              </div>
              <button className="w-full bg-bg-dark text-white hover:bg-brand-primary transition-colors py-4 rounded-xl font-bold text-base shadow-[0_4px_14px_rgba(0,0,0,0.15)] hover:shadow-none">
                Contact Engineering
              </button>
              <p className="text-[11px] text-text-light-bg/60 font-medium text-center mt-6 italic px-4">
                Architecture concrete textures & proprietary molding used in production.
              </p>
            </div>
          </div>

        </aside>
      </div>

{/* Title & Description Block */}
          <div className="mb-24">
            <h1 className="text-4xl md:text-5xl lg:text-[4rem] leading-[1.05] font-serif font-bold text-bg-dark tracking-tight mb-6">
              {product.title}
            </h1>
            
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <p className="text-text-light-bg/70 font-sans font-normal text-lg leading-relaxed max-w-2xl">
                {product.description}
              </p>
              
              <div className="shrink-0 bg-[#eef2f9] border border-brand-primary/20 rounded-full px-8 py-3.5 flex items-center justify-center">
                <span className="text-brand-primary text-[11px] font-bold tracking-widest uppercase text-center leading-tight">
                  Manufacturer<br />Direct
                </span>
              </div>
            </div>
          </div>
      {/* Middle Section: Specs, Materials, Pricing, Certifications Grid (from Image 1 layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-24">
        
        {/* Technical Specifications Box */}
        {product.specifications && product.specifications.length > 0 && (
          <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-8 md:p-10 border border-brand-ash/20 shadow-sm flex flex-col h-full w-full">
            <h3 className="flex items-center gap-3 text-xl md:text-2xl font-bold text-bg-dark font-sans tracking-tight mb-8">
              <Settings2 className="w-5 h-5 text-brand-primary" />
              Technical Specifications
            </h3>
            
            <div className="bg-[#f8f9fc] rounded-[1.5rem] border border-brand-ash/10 overflow-hidden flex flex-col flex-1">
              {product.specifications?.map((spec, idx) => (
                <div 
                  key={idx} 
                  className={`flex flex-col sm:flex-row sm:items-center justify-between py-5 px-6 md:px-8 hover:bg-white transition-colors group gap-2 sm:gap-4 ${idx !== product.specifications!.length - 1 ? 'border-b border-brand-ash/10' : ''}`}
                >
                  <span className="text-text-light-bg/70 font-medium text-sm md:text-[15px] group-hover:text-brand-primary transition-colors hover:cursor-default">
                    {spec.parameter}
                  </span>
                  <span className="text-bg-dark font-bold font-sans text-sm md:text-[15px] uppercase text-left sm:text-right">
                    {spec.value}
                  </span>
                </div>
              ))}
              
              {/* Fallbacks if missing layout length */}
              {(!product.specifications || product.specifications.length < 4) && (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between py-5 px-6 md:px-8 hover:bg-white transition-colors group gap-2 sm:gap-4 border-b border-brand-ash/10">
                    <span className="text-text-light-bg/70 font-medium text-sm md:text-[15px] group-hover:text-brand-primary transition-colors hover:cursor-default">Diameter</span>
                    <span className="text-bg-dark font-bold font-sans text-sm md:text-[15px] uppercase text-left sm:text-right">450 MM</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between py-5 px-6 md:px-8 hover:bg-white transition-colors group gap-2 sm:gap-4">
                    <span className="text-text-light-bg/70 font-medium text-sm md:text-[15px] group-hover:text-brand-primary transition-colors hover:cursor-default">Precision Rating</span>
                    <span className="text-bg-dark font-bold font-sans text-sm md:text-[15px] uppercase text-left sm:text-right">P5 (ISO CLASS 5)</span>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Materials / Features Box */}
        <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-8 md:p-10 border border-brand-ash/20 shadow-sm flex flex-col h-full">
          <h3 className="flex items-center gap-3 text-xl font-serif font-bold text-bg-dark mb-8">
            <Activity className="w-5 h-5 text-brand-primary" />
            Materials & Features
          </h3>
          <div className="flex flex-col gap-6 flex-1 justify-center">
            {product.features?.map((feature, idx) => (
              <div key={idx} className="flex gap-5 items-start group">
                <div className="w-12 h-12 rounded-xl bg-[#f8f9fc] border border-brand-ash/20 flex flex-shrink-0 items-center justify-center group-hover:bg-brand-primary/10 transition-colors">
                  {getIcon(feature.iconName)}
                </div>
                <div>
                  <h4 className="text-bg-dark font-bold text-sm md:text-base mb-1">{feature.title}</h4>
                  <p className="text-text-light-bg/70 text-xs md:text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
            {/* Fallbacks if empty */}
            {(!product.features || product.features.length === 0) && (
              <div className="flex gap-5 items-start group">
                <div className="w-12 h-12 rounded-xl bg-[#f8f9fc] border border-brand-ash/20 flex flex-shrink-0 items-center justify-center group-hover:bg-brand-primary/10 transition-colors">
                  <Leaf className="w-6 h-6 text-bg-dark" />
                </div>
                <div>
                  <h4 className="text-bg-dark font-bold text-sm md:text-base mb-1">High-Grade Nodular Iron</h4>
                  <p className="text-text-light-bg/70 text-xs md:text-sm leading-relaxed">Cast from premium materials to ensure high yield strength and durability.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Pricing Box */}
        <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-8 md:p-10 border border-brand-ash/20 shadow-sm flex flex-col h-full w-full">
            <h3 className="flex items-center gap-3 text-xl md:text-2xl font-bold text-bg-dark font-sans tracking-tight mb-8">
              <ShoppingCart className="w-5 h-5 text-brand-primary" />
              Pricing & Units
            </h3>
            
            <div className="bg-[#f8f9fc] rounded-[1.5rem] border border-brand-ash/10 overflow-hidden flex flex-col">
                <div className="flex items-center justify-between py-5 px-6 md:px-8 border-b border-brand-ash/10 hover:bg-white transition-colors">
                  <span className="text-text-light-bg/70 font-medium text-sm md:text-[15px]">1-10 Units</span>
                  <div className="flex items-center gap-2">
                    <span className="text-bg-dark font-bold font-sans text-sm md:text-[15px]">$1,420.00</span>
                    <span className="text-brand-primary font-bold text-xs uppercase bg-brand-primary/10 px-2 py-0.5 rounded-full">ea</span>
                  </div>
                </div>
                <div className="flex items-center justify-between py-5 px-6 md:px-8 border-b border-brand-ash/10 hover:bg-white transition-colors">
                  <span className="text-text-light-bg/70 font-medium text-sm md:text-[15px]">11-50 Units</span>
                  <div className="flex items-center gap-2">
                    <span className="text-brand-primary font-bold font-sans text-sm md:text-[15px]">$1,280.00</span>
                    <span className="bg-brand-primary/10 text-brand-primary font-bold text-xs uppercase px-2 py-0.5 rounded-full">ea</span>
                  </div>
                </div>
                <div className="flex items-center justify-between py-5 px-6 md:px-8 hover:bg-white transition-colors cursor-pointer group">
                  <span className="text-text-light-bg/70 font-medium text-sm md:text-[15px]">50+ Units</span>
                  <span className="text-brand-primary font-bold font-sans text-sm md:text-[15px] group-hover:underline decoration-2 underline-offset-4">Request Quote</span>
                </div>
            </div>
            
            <p className="text-[10px] font-bold tracking-widest text-brand-ash uppercase mt-8 text-center sm:text-left">
                GLOBAL SHIPPING VIA VYANZO LOGISTICS
            </p>
        </div>
        
        {/* Certifications Box */}
        <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-8 md:p-10 border border-brand-ash/20 shadow-sm flex flex-col h-full">
          <h3 className="flex items-center gap-3 text-xl md:text-2xl font-bold text-bg-dark tracking-tight font-sans mb-8">
            <CheckCircle2 className="w-5 h-5 text-brand-primary" />
            Certifications & Compliance
          </h3>
          <div className="grid grid-cols-2 gap-y-10 gap-x-4 flex-1 items-center justify-center pt-4 pb-4">
            {[
              { icon: <Factory className="w-6 h-6"/>, label: "ISO 9001:2015" },
              { icon: <ShieldCheck className="w-6 h-6"/>, label: "BENOR CERTIFIED" },
              { icon: <Globe className="w-6 h-6"/>, label: "EN 124 STANDARD" },
              { icon: <AlertCircle className="w-6 h-6"/>, label: "REACH COMPLIANT" },
            ].map((cert, idx) => (
              <div key={idx} className="flex flex-col items-center gap-4 group">
                <div className="w-16 h-16 shrink-0 rounded-[1.25rem] border border-brand-ash/20 bg-[#f8f9fc] flex items-center justify-center text-bg-dark group-hover:border-brand-primary group-hover:bg-brand-primary/5 transition-colors shadow-sm">
                  {cert.icon}
                </div>
                <span className="text-[9px] md:text-[10px] font-bold tracking-[0.1em] text-brand-ash uppercase leading-tight text-center max-w-[100px]">
                  {cert.label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>


      {/* Bottom Section: Similar Products */}
      <div className="border-t border-brand-ash/20 pt-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 px-2">
          <div>
            <h2 className="text-3xl font-serif font-bold text-bg-dark tracking-tight mb-2">Similar Products</h2>
            <p className="text-text-light-bg/70 text-sm">Explore alternative configurations for your specific infrastructure needs.</p>
          </div>
          <Link href="/products" className="text-xs font-bold tracking-[0.15em] text-brand-primary uppercase hover:text-bg-dark transition-colors shrink-0">
            View All Products
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {similarProducts.map((p) => (
            <Link href={`/products/${p.slug}`} key={p.id} className="group bg-white border border-brand-ash/20 rounded-[2rem] p-8 hover:shadow-lg hover:border-brand-primary transition-all flex flex-col relative overflow-hidden">
               <div className="w-full h-48 bg-[#f8f9fc] rounded-2xl mb-8 flex items-center justify-center p-6 border border-brand-ash/10 group-hover:bg-white transition-colors">
                  <img src={p.image} alt={p.title} className="w-full h-full object-contain mix-blend-multiply opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 ease-out" />
               </div>
               <h3 className="text-xl font-bold font-sans text-bg-dark mb-2">{p.title}</h3>
               <p className="text-text-light-bg/70 text-sm leading-relaxed mb-6 flex-1 line-clamp-2">{p.description}</p>
               <div className="flex items-center justify-between text-bg-dark font-medium border-t border-brand-ash/10 pt-4">
                 <span className="font-serif font-bold text-lg text-brand-primary">Mfr. Direct</span>
                 <ArrowRight className="w-5 h-5 group-hover:text-brand-primary group-hover:translate-x-1 transition-transform" />
               </div>
            </Link>
          ))}
        </div>
      </div>

    </section>
  );
}
