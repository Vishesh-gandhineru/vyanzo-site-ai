"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Globe, Folder, ArrowDown, ChevronDown, Check, ShieldCheck, Tag, MapPin } from "lucide-react";
import Link from "next/link";

import { products, ALL_CATEGORIES, ALL_SUB_CATEGORIES, ALL_CERT_TYPES } from "@/data/products";

// ─── Certification chip colours ───────────────────────────────────────────────
function certChipClass(type: string): string {
  switch (type.toLowerCase()) {
    case "benor":  return "bg-blue-50 text-blue-700 border-blue-200";
    case "copro":  return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "en124-2":
    case "en 124-2": return "bg-amber-50 text-amber-700 border-amber-200";
    default:       return "bg-brand-ash/10 text-brand-ash border-brand-ash/20";
  }
}

// ─── Checkbox helper ──────────────────────────────────────────────────────────
function FilterCheckbox({
  label, checked, onChange,
}: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div className="w-5 h-5 rounded border border-brand-ash/40 flex items-center justify-center group-hover:border-brand-primary transition-colors relative shrink-0">
        <input
          type="checkbox"
          className="absolute opacity-0 w-full h-full cursor-pointer"
          checked={checked}
          onChange={onChange}
        />
        {checked && <Check className="w-3.5 h-3.5 text-brand-primary" strokeWidth={3} />}
      </div>
      <span className="text-text-light-bg/80 font-sans font-normal text-sm">{label}</span>
    </label>
  );
}

// ─── Geo ↔ Certification bidirectional map ────────────────────────────────────
const GEO_TO_CERT: Record<string, string[]> = {
  "Belgium":     ["Benor", "Copro", "EN124-2"],
  "Scandinavia": [],
};
const CERT_TO_GEO: Record<string, string[]> = {
  "Benor":   ["Belgium"],
  "Copro":   ["Belgium"],
  "EN124-2": ["Belgium"],
};
const ALL_GEOS = Object.keys(GEO_TO_CERT);

export default function ProductGrid() {
  const [selectedCategories,    setSelectedCategories]    = useState<string[]>([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);
  const [selectedCertTypes,     setSelectedCertTypes]     = useState<string[]>([]);
  const [selectedGeos,          setSelectedGeos]          = useState<string[]>([]);
  const [sortBy,                setSortBy]                = useState("no-asc");
  const [isSortOpen,            setIsSortOpen]            = useState(false);

  const toggle = (setter: React.Dispatch<React.SetStateAction<string[]>>, value: string) =>
    setter(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);

  // When toggling a geo, remove any selected certs that are incompatible
  const toggleGeo = (geo: string) => {
    setSelectedGeos(prev => {
      const next = prev.includes(geo) ? prev.filter(g => g !== geo) : [...prev, geo];
      if (next.length > 0) {
        const validCerts = new Set(next.flatMap(g => GEO_TO_CERT[g] ?? []));
        setSelectedCertTypes(certs => certs.filter(c => validCerts.has(c)));
      }
      return next;
    });
  };

  // When toggling a cert, remove any selected geos that are incompatible
  const toggleCert = (cert: string) => {
    setSelectedCertTypes(prev => {
      const next = prev.includes(cert) ? prev.filter(c => c !== cert) : [...prev, cert];
      if (next.length > 0) {
        const validGeos = new Set(next.flatMap(c => CERT_TO_GEO[c] ?? []));
        setSelectedGeos(geos => geos.filter(g => validGeos.has(g)));
      }
      return next;
    });
  };

  // Which geos are selectable given current cert selection
  const availableGeos = selectedCertTypes.length === 0
    ? ALL_GEOS
    : Array.from(new Set(selectedCertTypes.flatMap(c => CERT_TO_GEO[c] ?? [])));

  // Which certs are selectable given current geo selection
  const availableCerts = selectedGeos.length === 0
    ? ALL_CERT_TYPES
    : Array.from(new Set(selectedGeos.flatMap(g => GEO_TO_CERT[g] ?? [])));

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedSubCategories([]);
    setSelectedCertTypes([]);
    setSelectedGeos([]);
  };

  const searchParams = useSearchParams();

  // Pre-select category from URL query param (e.g. ?category=Manhole+Covers)
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat && ALL_CATEGORIES.includes(cat)) {
      setSelectedCategories([cat]);
    }
  }, [searchParams]);
  const filtered = products
    .filter(p => selectedCategories.length    === 0 || selectedCategories.includes(p.category))
    .filter(p => selectedSubCategories.length === 0 || (p.subCategory && selectedSubCategories.includes(p.subCategory)))
    .filter(p => selectedCertTypes.length     === 0 || selectedCertTypes.includes(p.certificationType))
    .filter(p => selectedGeos.length          === 0 || (CERT_TO_GEO[p.certificationType] ?? []).some(g => selectedGeos.includes(g)))
    .sort((a, b) => {
      if (sortBy === "name-asc")  return a.title.localeCompare(b.title);
      if (sortBy === "name-desc") return b.title.localeCompare(a.title);
      return a.no - b.no; // default: product number
    });

  return (
    <section className="py-24 px-6 md:px-12 lg:px-16 bg-white relative -mt-12 rounded-t-[3rem] z-20 shadow-[0_-20px_40px_rgba(0,0,0,0.05)] border-t border-brand-ash/10">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-8">

        {/* ── Sidebar Filters ── */}
        <aside className="w-full lg:w-[280px] shrink-0 flex flex-col gap-5">

          {/* Geo Location */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-brand-ash/20">
            <h3 className="flex items-center gap-2 text-bg-dark font-sans font-semibold text-base mb-5">
              <MapPin className="w-4 h-4 text-brand-primary" />
              Geo Location
            </h3>
            <div className="flex flex-col gap-3">
              {availableGeos.map(geo => (
                <FilterCheckbox
                  key={geo}
                  label={geo}
                  checked={selectedGeos.includes(geo)}
                  onChange={() => toggleGeo(geo)}
                />
              ))}
            </div>
          </div>

          {/* Category */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-brand-ash/20">
            <h3 className="flex items-center gap-2 text-bg-dark font-sans font-semibold text-base mb-5">
              <Folder className="w-4 h-4 text-brand-primary" />
              Category
            </h3>
            <div className="flex flex-col gap-3">
              {ALL_CATEGORIES.map(cat => (
                <FilterCheckbox
                  key={cat}
                  label={cat}
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggle(setSelectedCategories, cat)}
                />
              ))}
            </div>
          </div>

          {/* Sub-Category */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-brand-ash/20">
            <h3 className="flex items-center gap-2 text-bg-dark font-sans font-semibold text-base mb-5">
              <Tag className="w-4 h-4 text-brand-primary" />
              Sub-Category
            </h3>
            <div className="flex flex-col gap-3">
              {ALL_SUB_CATEGORIES.map(sub => (
                <FilterCheckbox
                  key={sub}
                  label={sub}
                  checked={selectedSubCategories.includes(sub)}
                  onChange={() => toggle(setSelectedSubCategories, sub)}
                />
              ))}
            </div>
          </div>

          {/* Certification Type */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-brand-ash/20">
            <h3 className="flex items-center gap-2 text-bg-dark font-sans font-semibold text-base mb-5">
              <ShieldCheck className="w-4 h-4 text-brand-primary" />
              Certification
            </h3>
            <div className="flex flex-col gap-3">
              {availableCerts.map(cert => (
                <FilterCheckbox
                  key={cert}
                  label={cert}
                  checked={selectedCertTypes.includes(cert)}
                  onChange={() => toggleCert(cert)}
                />
              ))}
            </div>

            <button
              onClick={resetFilters}
              className="flex items-center gap-2 text-brand-primary text-sm font-sans font-semibold mt-6 hover:opacity-75 transition-opacity"
            >
              <ArrowDown className="w-4 h-4" />
              Reset Filters
            </button>
          </div>

        </aside>

        {/* ── Main Product Area ── */}
        <div className="flex-1 flex flex-col">

          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 relative">
            <div className="text-text-light-bg/60 font-sans font-normal text-sm">
              Showing{" "}
              <span className="font-semibold text-bg-dark text-base">{filtered.length}</span>
              {" "}of {products.length} products
            </div>

            <div className="flex items-center gap-2 text-sm text-text-light-bg/60 font-sans font-normal relative">
              Sort by:
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-1 font-semibold text-bg-dark hover:text-brand-primary transition-colors"
              >
                {sortBy === "no-asc"   && "Default Order"}
                {sortBy === "name-asc" && "Name: A → Z"}
                {sortBy === "name-desc"&& "Name: Z → A"}
                <ChevronDown className="w-4 h-4" />
              </button>

              {isSortOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-brand-ash/20 shadow-xl rounded-xl overflow-hidden z-20 font-sans font-medium text-sm">
                  {[
                    { key: "no-asc",   label: "Default Order" },
                    { key: "name-asc", label: "Name: A → Z" },
                    { key: "name-desc",label: "Name: Z → A" },
                  ].map(o => (
                    <button
                      key={o.key}
                      className={`w-full text-left px-4 py-3 hover:bg-[#f8f9fc] transition-colors ${sortBy === o.key ? "text-brand-primary" : "text-bg-dark"}`}
                      onClick={() => { setSortBy(o.key); setIsSortOpen(false); }}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map(product => (
                <Link
                  href={`/products/${product.slug}`}
                  key={product.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-brand-ash/20 group hover:shadow-lg hover:border-brand-primary/30 transition-all flex flex-col cursor-pointer"
                >
                  {/* Image */}
                  <div className="w-full h-[240px] relative overflow-hidden bg-brand-ash/10">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-700 mix-blend-multiply"
                    />

                    {/* Certification Chip ─ top-right */}
                    <div className={`absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-sans font-bold tracking-wider uppercase ${certChipClass(product.certificationType)}`}>
                      <ShieldCheck className="w-3 h-3" />
                      {product.certificationType}
                    </div>

                    {/* Sub-category pill ─ bottom-left (only if exists) */}
                    {product.subCategory && (
                      <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-bg-dark text-[10px] font-sans font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full border border-brand-ash/20">
                        {product.subCategory}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <h3 className="font-sans font-semibold text-bg-dark text-xl leading-snug">
                        {product.title}
                      </h3>
                      <span className="text-[10px] font-sans font-bold tracking-widest text-brand-ash/70 mt-1 whitespace-nowrap uppercase">
                        {product.sku}
                      </span>
                    </div>

                    <p className="text-text-light-bg/60 font-sans font-normal text-sm leading-relaxed mb-5 flex-1 line-clamp-2">
                      {product.category}{product.subCategory ? ` · ${product.subCategory}` : ""}
                    </p>

                    {/* Docs availability pills */}
                    <div className="flex gap-2 mb-5 flex-wrap">
                      {product.specificationFiles.length > 0 && (
                        <span className="text-[10px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                          {product.specificationFiles.length} Spec{product.specificationFiles.length > 1 ? "s" : ""}
                        </span>
                      )}
                      {product.certificationFiles.length > 0 && (
                        <span className="text-[10px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                          {product.certificationFiles.length} Cert{product.certificationFiles.length > 1 ? "s" : ""}
                        </span>
                      )}
                    </div>

                    <button className="w-full py-3 px-4 border border-brand-ash/30 rounded-xl text-bg-dark font-sans font-bold text-sm tracking-wide group-hover:border-brand-primary group-hover:bg-brand-primary/5 transition-colors">
                      View Technical Specs
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-brand-ash/20 py-24 text-center">
              <div className="w-16 h-16 bg-brand-ash/10 rounded-full flex items-center justify-center mb-6">
                <Folder className="w-8 h-8 text-brand-ash" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-bg-dark mb-2">No products found</h3>
              <p className="text-text-light-bg/60 font-sans font-normal mb-8">Try adjusting your filters to find what you&apos;re looking for.</p>
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
