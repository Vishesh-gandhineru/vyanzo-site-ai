"use client";

import { useState } from "react";
import { ChevronRight, Globe, ExternalLink, Plus, ArrowRight, FileDown, ChevronDown, Folder } from "lucide-react";
import { Product, DocFolder } from "@/data/products";

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

  return (
    <section className="w-full font-sans py-8 px-4 md:px-8 max-w-[1400px] mx-auto min-h-screen">
      
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-text-light-bg/60 font-medium mb-8 overflow-x-auto whitespace-nowrap pb-2">
        <a href="/" className="hover:text-bg-dark transition-colors">Home</a>
        <ChevronRight className="w-4 h-4 shrink-0" />
        <a href="/products" className="hover:text-bg-dark transition-colors">{product.category}</a>
        <ChevronRight className="w-4 h-4 shrink-0" />
        <span className="text-bg-dark font-semibold">{product.title}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* Main Product Content */}
        <div className="flex-1 flex flex-col">
          
          {/* Main Image */}
          <div className="w-full bg-brand-ash/10 rounded-3xl overflow-hidden relative mb-12 aspect-4/3 lg:aspect-auto lg:h-[600px] flex items-center justify-center">
            {/* Using the placeholder image style from the design to show the boat ropes, but usually it would be the real product */}
             <img 
               src={product.image} 
               alt={product.title} 
               className="w-full h-full object-contain p-12 lg:p-24 mix-blend-multiply"
             />
             {product.isBenor && (
               <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md rounded-full px-5 py-2.5 flex items-center gap-2 shadow-sm border border-brand-ash/20">
                 <Globe className="w-4 h-4 text-brand-primary" />
                 <span className="text-xs font-bold tracking-widest text-bg-dark uppercase">Benor</span>
               </div>
             )}
          </div>

          {/* Title & Description Block */}
          <div className="border-b border-brand-ash/20 pb-12 mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-serif font-bold text-bg-dark tracking-tight mb-4">
              {product.title}
            </h1>
            
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <p className="text-text-light-bg/60 font-sans font-normal text-lg leading-relaxed max-w-2xl">
                {product.description}
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
              {product.docsTree && (
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={() => setIsTechSheetOpen(!isTechSheetOpen)}
                    className="w-full group flex items-center justify-between p-5 bg-[#f8f9fc] rounded-xl hover:bg-white hover:shadow-md hover:border-brand-primary/30 border border-transparent transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <Plus className="w-5 h-5 text-[#ef4444]" />
                      <div className="flex flex-col items-start text-left">
                        <span className="font-semibold text-sm text-bg-dark mb-1">Technical Sheets</span>
                        <span className="text-[10px] font-bold tracking-widest text-brand-ash uppercase">Multiple Options</span>
                      </div>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-brand-ash group-hover:text-brand-primary transition-transform duration-300 ${isTechSheetOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Content */}
                  {isTechSheetOpen && (
                    <div className="bg-white border border-brand-ash/10 rounded-xl p-2 mt-2 shadow-sm">
                      {product.docsTree.children.map((child, idx) => {
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
                              <div className="flex items-center gap-3">
                                <FileDown className="w-4 h-4 text-brand-ash group-hover/size:text-brand-primary transition-colors" />
                                <span className="font-medium truncate max-w-[180px]">{child.name}</span>
                              </div>
                              <span className="text-[10px] font-bold tracking-widest text-brand-ash uppercase">{child.size}</span>
                            </a>
                          );
                        }
                      })}
                    </div>
                  )}
                </div>
              )}

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
