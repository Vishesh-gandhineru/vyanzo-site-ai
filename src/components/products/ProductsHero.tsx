import { ArrowRight } from "lucide-react";

export default function ProductsHero() {
  return (
    <section className="w-full bg-bg-dark text-white py-24 px-4 md:px-8 font-sans relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-3xl -mr-[200px] -mt-[200px] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl">
                <div className="flex items-center gap-3 text-brand-primary text-sm font-sans font-bold tracking-widest uppercase mb-6">
                   <span className="w-1.5 h-1.5 rounded-full bg-brand-primary"></span>
                   Our Products
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight mb-6">
                   Engineered for Infrastructure.
                </h1>
                <p className="text-brand-ash/80 text-lg md:text-xl font-sans font-normal max-w-2xl leading-relaxed">
                   Discover our complete range of heavily certified municipal castings, designed for extreme durability and seamless global distribution.
                </p>
            </div>
            
            <div className="shrink-0">
               <button className="bg-brand-accent hover:opacity-90 transition-opacity text-bg-dark font-sans font-bold text-sm tracking-widest uppercase py-4 px-8 flex items-center gap-3 rounded-lg group">
                 Download Full Catalog
                 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </button>
            </div>
        </div>
      </div>
    </section>
  );
}
