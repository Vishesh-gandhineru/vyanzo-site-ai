"use client";

import { useState } from "react";
import { Globe, Folder, ArrowDown, ChevronDown, Plus, Check, LocationEdit, MapPin } from "lucide-react";

import { products } from "@/data/products";

export default function ProductGrid() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCertifications, setSelectedCertifications] = useState<string[]>([]);
  const [selectedGeoLocations, setSelectedGeoLocations] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("newest");
  const [isSortOpen, setIsSortOpen] = useState(false);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

    const GEO_TO_CERT: Record<string, string[]> = {
      'Belgium': ['Copro', 'Benor', 'Vyanzo'],
      'Scandinavia': ['EN 124:2015']
    };

    const CERT_TO_GEO: Record<string, string[]> = {
      'Copro': ['Belgium'],
      'Benor': ['Belgium'],
      'Vyanzo': ['Belgium'],
      'EN 124:2015': ['Scandinavia']
    };

    const toggleCertification = (cert: string) => {
        setSelectedCertifications(prev => {
            const next = prev.includes(cert) ? prev.filter(c => c !== cert) : [...prev, cert];
            if (next.length > 0) {
                const validGeos = new Set(next.flatMap(c => CERT_TO_GEO[c] || []));
                setSelectedGeoLocations(geos => geos.filter(g => validGeos.has(g)));
            }
            return next;
        });
    };

    const toggleGeoLocation = (geo: string) => {
        setSelectedGeoLocations(prev => {
            const next = prev.includes(geo) ? prev.filter(g => g !== geo) : [...prev, geo];
            if (next.length > 0) {
                const validCerts = new Set(next.flatMap(g => GEO_TO_CERT[g] || []));
                setSelectedCertifications(certs => certs.filter(c => validCerts.has(c)));
            }
            return next;
        });
    };

    const resetFilters = () => {
        setSelectedCategories([]);
        setSelectedCertifications([]);
        setSelectedGeoLocations([]);
    };

    const ALL_GEOS = Object.keys(GEO_TO_CERT);
    const ALL_CERTS = Object.keys(CERT_TO_GEO);
    const ALL_CATEGORIES = Array.from(new Set(products.map(p => p.category)));

    const availableGeos = selectedCertifications.length === 0 
      ? ALL_GEOS 
      : Array.from(new Set(selectedCertifications.flatMap(cert => CERT_TO_GEO[cert] || [])));

    const availableCerts = selectedGeoLocations.length === 0
      ? ALL_CERTS
      : Array.from(new Set(selectedGeoLocations.flatMap(geo => GEO_TO_CERT[geo] || [])));

    // Filter and sort products
    const filteredProducts = products
        .filter(p => selectedCategories.length === 0 || selectedCategories.includes(p.category))
        .filter(p => {
            // As requested, make all products show up under the Belgium geo-location
            const pGeos = ['Belgium']; 
            
            // Certifications remain tied to isBenor status, with Vyanzo as a default generic cert
            const pCerts = p.isBenor ? ['Benor', 'Copro', 'Vyanzo'] : ['Vyanzo'];
            
            const geoMatch = selectedGeoLocations.length === 0 || selectedGeoLocations.some(g => pGeos.includes(g));
            const certMatch = selectedCertifications.length === 0 || selectedCertifications.some(c => pCerts.includes(c));
            
            return geoMatch && certMatch;
        })
        .sort((a, b) => {
            if (sortBy === "name-asc") return a.title.localeCompare(b.title);
            if (sortBy === "name-desc") return b.title.localeCompare(a.title);
            return b.id - a.id; 
        });

  return (
    <section  className="py-24 px-6 md:px-12 lg:px-16 bg-white relative -mt-12 rounded-t-[3rem] z-20 shadow-[0_-20px_40px_rgba(0,0,0,0.05)] border-t border-brand-ash/10">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-[300px] shrink-0 flex flex-col gap-6">
            
           

            {/* Geo Location Filter */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-brand-ash/20">
                <h3 className="flex items-center gap-3 text-bg-dark font-sans font-semibold text-lg mb-6">
                   <MapPin className="w-5 h-5 text-brand-primary" />
                   Geo Location
                </h3>
                <div className="flex flex-col gap-4">
                    {availableGeos.map(geo => {
                        const isChecked = selectedGeoLocations.includes(geo);
                        return (
                          <label key={geo} className="flex items-center gap-3 cursor-pointer group">
                             <div className="w-5 h-5 rounded border border-brand-ash/40 flex items-center justify-center group-hover:border-brand-primary transition-colors relative">
                                <input 
                                   type="checkbox"
                                   className="absolute opacity-0 w-full h-full cursor-pointer"
                                   checked={isChecked}
                                   onChange={() => toggleGeoLocation(geo)}
                                />
                                {isChecked && <Check className="w-3.5 h-3.5 text-brand-primary" strokeWidth={3} />}
                             </div>
                             <span className="text-text-light-bg/80 font-sans font-normal text-sm">{geo}</span>
                          </label>
                        )
                    })}
                </div>
            </div>

             {/* Certifications Filter */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-brand-ash/20">
                <h3 className="flex items-center gap-3 text-bg-dark font-sans font-semibold text-lg mb-6">
                   <Globe className="w-5 h-5 text-brand-primary" />
                   Certifications
                </h3>
                <div className="flex flex-col gap-4">
                    {availableCerts.map(cert => {
                        const isChecked = selectedCertifications.includes(cert);
                        return (
                          <label key={cert} className="flex items-center gap-3 cursor-pointer group">
                             <div className="w-5 h-5 rounded border border-brand-ash/40 flex items-center justify-center group-hover:border-brand-primary transition-colors relative">
                                <input 
                                   type="checkbox"
                                   className="absolute opacity-0 w-full h-full cursor-pointer"
                                   checked={isChecked}
                                   onChange={() => toggleCertification(cert)}
                                />
                                {isChecked && <Check className="w-3.5 h-3.5 text-brand-primary" strokeWidth={3} />}
                             </div>
                             <span className="text-text-light-bg/80 font-sans font-normal text-sm">{cert}</span>
                          </label>
                        )
                    })}
                </div>
            </div>

            {/* Category Filter */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-brand-ash/20">
                <h3 className="flex items-center gap-3 text-bg-dark font-sans font-semibold text-lg mb-6">
                   <Folder className="w-5 h-5 text-brand-primary" />
                   Category
                </h3>
                <div className="flex flex-col gap-4">
                    {ALL_CATEGORIES.map(cat => {
                        const isChecked = selectedCategories.includes(cat);
                        return (
                          <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                             <div className="w-5 h-5 rounded border border-brand-ash/40 flex items-center justify-center group-hover:border-brand-primary transition-colors relative">
                                <input 
                                   type="checkbox"
                                   className="absolute opacity-0 w-full h-full cursor-pointer"
                                   checked={isChecked}
                                   onChange={() => toggleCategory(cat)}
                                />
                                {isChecked && <Check className="w-3.5 h-3.5 text-brand-primary" strokeWidth={3} />}
                             </div>
                             <span className="text-text-light-bg/80 font-sans font-normal text-sm">{cat}</span>
                          </label>
                        )
                    })}
                </div>
                
                <button 
                  onClick={resetFilters}
                  className="flex items-center gap-2 text-brand-primary text-sm font-sans font-semibold mt-8 hover:opacity-80 transition-opacity"
                >
                    <ArrowDown className="w-4 h-4" />
                    Reset Filters
                </button>
            </div>

          

        </aside>

        {/* Main Product Area */}
        <div className="flex-1 flex flex-col">
          
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 relative">
            <div className="text-text-light-bg/60 font-sans font-normal text-sm">
                Showing <span className="font-semibold text-bg-dark text-base">{filteredProducts.length}</span> of {products.length} products
            </div>
            
            <div className="flex items-center gap-2 text-sm text-text-light-bg/60 font-sans font-normal relative">
                Sort by: 
                <button 
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="flex items-center gap-1 font-semibold text-bg-dark hover:text-brand-primary transition-colors"
                >
                   {sortBy === "newest" && "Newest Arrivals"}
                   {sortBy === "name-asc" && "Name: A - Z"}
                   {sortBy === "name-desc" && "Name: Z - A"}
                   <ChevronDown className="w-4 h-4" />
                </button>
                
                {isSortOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-brand-ash/20 shadow-xl rounded-xl overflow-hidden z-20 font-sans font-medium text-sm">
                     <button 
                       className={`w-full text-left px-4 py-3 hover:bg-[#f8f9fc] transition-colors ${sortBy === "newest" ? "text-brand-primary" : "text-bg-dark"}`}
                       onClick={() => { setSortBy("newest"); setIsSortOpen(false); }}
                     >
                       Newest Arrivals
                     </button>
                     <button 
                       className={`w-full text-left px-4 py-3 hover:bg-[#f8f9fc] transition-colors ${sortBy === "name-asc" ? "text-brand-primary" : "text-bg-dark"}`}
                       onClick={() => { setSortBy("name-asc"); setIsSortOpen(false); }}
                     >
                       Name: A - Z
                     </button>
                     <button 
                       className={`w-full text-left px-4 py-3 hover:bg-[#f8f9fc] transition-colors ${sortBy === "name-desc" ? "text-brand-primary" : "text-bg-dark"}`}
                       onClick={() => { setSortBy("name-desc"); setIsSortOpen(false); }}
                     >
                       Name: Z - A
                     </button>
                  </div>
                )}
            </div>
          </div>

          {/* Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                  <a href={`/products/${product.slug}`} key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-brand-ash/20 group hover:shadow-lg hover:border-brand-primary/30 transition-all flex flex-col cursor-pointer">
                      {/* Image Area */}
                      <div className="w-full h-[280px] relative overflow-hidden bg-brand-ash/10">
                          <img 
                             src={product.image} 
                             alt={product.title} 
                             className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-700 mix-blend-multiply"
                          />
                          {product.isBenor && (
                              <div className="absolute top-4 right-4 bg-bg-dark text-white text-[10px] font-sans font-bold tracking-widest uppercase px-3 py-1.5 rounded-full z-10">
                                  Benor
                              </div>
                          )}
                      </div>
                      
                      {/* Content Area */}
                      <div className="p-6 flex flex-col flex-1">
                          <div className="flex justify-between items-start gap-4 mb-3">
                              <h3 className="font-sans font-semibold text-bg-dark text-xl leading-snug">
                                  {product.title}
                              </h3>
                              <span className="text-[10px] font-sans font-bold tracking-widest text-brand-ash/80 mt-1 whitespace-nowrap uppercase">
                                  {product.sku}
                              </span>
                          </div>
                          
                          <p className="text-text-light-bg/60 font-sans font-normal text-sm leading-relaxed mb-6 flex-1">
                              {product.description}
                          </p>                          
                          
                          
                          <button className="w-full py-3 px-4 border border-brand-ash/30 rounded-xl text-bg-dark font-sans font-bold text-sm tracking-wide group-hover:border-brand-primary group-hover:bg-brand-primary/5 transition-colors">
                              View Technical Specs
                          </button>
                      </div>
                  </a>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-brand-ash/20 py-24 text-center">
               <div className="w-16 h-16 bg-brand-ash/10 rounded-full flex items-center justify-center mb-6">
                 <Folder className="w-8 h-8 text-brand-ash" />
               </div>
               <h3 className="text-xl font-serif font-semibold text-bg-dark mb-2">No products found</h3>
               <p className="text-text-light-bg/60 font-sans font-normal mb-8">Try adjusting your filters to find what you're looking for.</p>
               <button 
                 onClick={resetFilters}
                 className="bg-brand-accent hover:opacity-90 transition-opacity text-bg-dark font-sans font-bold text-sm tracking-widest uppercase py-3 px-6 rounded-lg"
               >
                 Clear Filters
               </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
