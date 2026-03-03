"use client";

import { useState, useEffect } from "react";
import {
  ChevronRight, Globe, ExternalLink, ArrowRight,
  Factory, ShieldCheck, AlertCircle, Settings2,
  FileText, CheckCircle2, Download, Award
} from "lucide-react";
import { Product, DriveLink, SheetRow } from "@/data/products";
import Link from "next/link";
import { products } from "@/data/products";

// ─── Resolve the real Google Drive filename via our API route ─────────────────
function useDriveFileName(driveUrl: string, fallback: string): { name: string; loading: boolean } {
  const [name, setName] = useState(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Extract file ID from the Drive share URL
    const m = driveUrl.match(/\/file\/d\/([^/]+)\//);
    if (!m) { setLoading(false); return; }
    const id = m[1];

    let cancelled = false;
    fetch(`/api/drive-name?id=${id}`)
      .then(r => r.json())
      .then(data => { if (!cancelled && data.name) setName(data.name); })
      .catch(() => { /* keep fallback */ })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [driveUrl]);

  return { name, loading };
}

// ─── Fetch and parse specs from a Google Sheet table_link ───────────────────────
function useSheetSpecs(tableLink: string | null): { rows: SheetRow[]; loading: boolean } {
  const [rows, setRows] = useState<SheetRow[]>([]);
  const [loading, setLoading] = useState(!!tableLink);

  useEffect(() => {
    if (!tableLink) { setLoading(false); return; }
    let cancelled = false;
    fetch(`/api/sheet-specs?url=${encodeURIComponent(tableLink)}`)
      .then(r => r.json())
      .then(data => { if (!cancelled && data.rows) setRows(data.rows); })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [tableLink]);

  return { rows, loading };
}

// ─── Certification chip colour ────────────────────────────────────────────────
function certChipClass(type: string): string {
  switch (type.toLowerCase()) {
    case "benor":    return "bg-blue-50 text-blue-700 border-blue-200";
    case "copro":    return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "en124-2":
    case "en 124-2": return "bg-amber-50 text-amber-700 border-amber-200";
    default:         return "bg-brand-ash/10 text-brand-ash border-brand-ash/20";
  }
}

// ─── Reusable download row ────────────────────────────────────────────────────
function DriveRow({ file, icon }: { file: DriveLink; icon: React.ReactNode }) {
  const { name, loading } = useDriveFileName(file.url, file.label);

  return (
    <a
      href={file.downloadUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between p-4 bg-[#f8f9fc] rounded-xl border border-transparent hover:border-brand-primary/30 hover:bg-white hover:shadow-sm transition-all group"
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-brand-primary/10 flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div>
          {loading ? (
            <div className="h-4 w-40 bg-brand-ash/20 rounded animate-pulse" />
          ) : (
            <p className="text-sm font-semibold text-bg-dark font-sans">{name}</p>
          )}
        </div>
      </div>
      <Download className="w-4 h-4 text-brand-ash group-hover:text-brand-primary transition-colors shrink-0" />
    </a>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function ProductDetails({ product }: { product: Product }) {
  const [activeTab, setActiveTab] = useState<"specifications" | "certifications">("specifications");
  const { rows: sheetRows, loading: sheetLoading } = useSheetSpecs(product.tableLink);

  const specFiles = product.specificationFiles;
  const certFiles = product.certificationFiles;

  // Similar products: same category, excluding self, max 3
  const similarProducts = products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  // Fallback if not enough same-category
  const relatedProducts = similarProducts.length >= 3
    ? similarProducts
    : [
        ...similarProducts,
        ...products.filter(p => p.id !== product.id && p.category !== product.category),
      ].slice(0, 3);

  return (
    <section className="w-full font-sans py-8 px-4 md:px-8 max-w-[1400px] mx-auto min-h-screen">

      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-text-light-bg/60 font-medium mb-8 overflow-x-auto whitespace-nowrap pb-2">
        <Link href="/" className="hover:text-bg-dark transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4 shrink-0" />
        <Link href="/products" className="hover:text-bg-dark transition-colors">Products</Link>
        <ChevronRight className="w-4 h-4 shrink-0" />
        <span className="text-brand-primary font-semibold">{product.category}</span>
        {product.subCategory && (
          <>
            <ChevronRight className="w-4 h-4 shrink-0" />
            <span className="text-text-light-bg/80">{product.subCategory}</span>
          </>
        )}
        <ChevronRight className="w-4 h-4 shrink-0" />
        <span className="text-bg-dark font-semibold">{product.title}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 mb-10">

        {/* ── Left: Product Image ── */}
        <div className="flex-1 flex flex-col">
          <div className="flex flex-col gap-4 mb-16">

            {/* Main image */}
            <div className="w-full bg-[#f8f9fc] rounded-4xl overflow-hidden relative aspect-square lg:h-[480px] lg:aspect-auto flex items-center justify-center border border-brand-ash/10 group">
              {/* Cert chip */}
              <div className={`absolute top-5 left-5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-sans font-bold tracking-wider uppercase z-10 ${certChipClass(product.certificationType)}`}>
                <ShieldCheck className="w-3.5 h-3.5" />
                {product.certificationType}
              </div>

              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain p-12 md:p-16 mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>

            {/* Thumbnail row (4 placeholders) */}
            <div className="grid grid-cols-4 gap-4 w-full h-[110px]">
              {[0, 1, 2, 3].map(idx => (
                <button
                  key={idx}
                  className={`w-full h-full rounded-2xl flex items-center justify-center p-3 transition-all border
                  ${idx === 0
                    ? "bg-white border-brand-primary/40 shadow-sm"
                    : "bg-[#f8f9fc] border-brand-ash/10 hover:border-brand-primary/30 hover:bg-white"} group`}
                >
                  <img
                    src={product.image}
                    alt="thumbnail"
                    className={`w-full h-full object-contain mix-blend-multiply transition-opacity ${idx === 0 ? "opacity-100" : "opacity-40 group-hover:opacity-100"}`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right Sidebar: Documentation ── */}
        <aside className="w-full lg:w-[420px] shrink-0 flex flex-col gap-8">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-brand-ash/20 h-fit">

            <h3 className="flex items-center gap-3 text-bg-dark font-sans font-semibold text-xl mb-6 tracking-tight">
              <ExternalLink className="w-5 h-5 text-brand-primary" />
              Documentation
            </h3>

            {/* Tab switcher */}
            <div className="flex gap-2 mb-6 bg-[#f8f9fc] rounded-xl p-1">
              {(["specifications", "certifications"] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold font-sans capitalize transition-all ${
                    activeTab === tab
                      ? "bg-white text-bg-dark shadow-sm"
                      : "text-text-light-bg/60 hover:text-bg-dark"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Specifications tab */}
            {activeTab === "specifications" && (
              <div className="flex flex-col gap-2">
                {specFiles.length > 0 ? (
                  specFiles.map((f, i) => (
                    <DriveRow key={i} file={f} icon={<FileText className="w-4 h-4 text-brand-primary" />} />
                  ))
                ) : (
                  <p className="text-center py-8 text-text-light-bg/40 text-sm font-sans">
                    No specification files available.
                  </p>
                )}

              </div>
            )}

            {/* Certifications tab */}
            {activeTab === "certifications" && (
              <div className="flex flex-col gap-2">
                {certFiles.length > 0 ? (
                  certFiles.map((f, i) => (
                    <DriveRow key={i} file={f} icon={<Award className="w-4 h-4 text-brand-primary" />} />
                  ))
                ) : (
                  <p className="text-center py-8 text-text-light-bg/40 text-sm font-sans">
                    No certification files available.
                  </p>
                )}
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* ── Title & Description ── */}
      <div className="mb-16">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold tracking-wider uppercase ${certChipClass(product.certificationType)}`}>
            <ShieldCheck className="w-3 h-3" />
            {product.certificationType}
          </span>
          {product.subCategory && (
            <span className="text-xs font-bold tracking-widest text-brand-ash uppercase">
              {product.subCategory}
            </span>
          )}
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-[4rem] leading-[1.05] font-serif font-bold text-bg-dark tracking-tight mb-6">
          {product.title}
        </h1>
        <p className="text-text-light-bg/70 font-sans font-normal text-body-xl leading-relaxed max-w-2xl">
          {product.description}
        </p>
      </div>

      {/* ── Info Grid ── */}
      <div className={`grid grid-cols-1 ${certFiles.length > 0 ? "md:grid-cols-2" : ""} gap-6 lg:gap-8 mb-24`}>

        {/* Technical Specifications */}
        <div className="bg-white rounded-4xl p-8 md:p-10 border border-brand-ash/20 shadow-sm flex flex-col">
          <h3 className="flex items-center gap-3 text-xl font-bold text-bg-dark font-sans tracking-tight mb-8">
            <Settings2 className="w-8 h-8 text-brand-primary" />
            Product Details
          </h3>
          <div className="bg-[#f8f9fc] rounded-2xl border border-brand-ash/10 overflow-hidden">

            {/* Live rows from Google Sheet */}
            {sheetLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between py-4 px-6 border-b border-brand-ash/10 gap-4">
                  <div className="h-3.5 w-28 bg-brand-ash/20 rounded animate-pulse" />
                  <div className="h-3.5 w-36 bg-brand-ash/20 rounded animate-pulse" />
                </div>
              ))
            ) : sheetRows.length > 0 ? (
              sheetRows.map((row, idx, arr) => (
                <div
                  key={idx}
                  className={`flex flex-col sm:flex-row sm:items-start justify-between py-4 px-6 hover:bg-white transition-colors gap-2 sm:gap-4 ${
                    idx !== arr.length - 1 ? "border-b border-brand-ash/10" : ""
                  }`}
                >
                  <span className="text-text-light-bg/70 font-medium text-body-lg shrink-0">{row.key}</span>
                  <span className="text-bg-dark font-bold font-sans text-body-sm text-left sm:text-right whitespace-pre-line max-w-[60%]">{row.value}</span>
                </div>
              ))
            ) : (
              // Fallback when no table_link / sheet unavailable
              [
                { label: "Category",      value: product.category },
                { label: "Sub-Category",  value: product.subCategory ?? "—" },
                { label: "Certification", value: product.certificationType },
                { label: "SKU",           value: product.sku },
              ].map((row, idx, arr) => (
                <div
                  key={idx}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between py-4 px-6 hover:bg-white transition-colors gap-2 sm:gap-4 ${
                    idx !== arr.length - 1 ? "border-b border-brand-ash/10" : ""
                  }`}
                >
                  <span className="text-text-light-bg/70 font-medium text-body-lg">{row.label}</span>
                  <span className="text-bg-dark font-bold font-sans text-body-sm uppercase">{row.value}</span>
                </div>
              ))
            )}

          </div>
        </div>

        {/* Certifications & Compliance */}
        {certFiles.length > 0 && (
          <div className="bg-white rounded-4xl p-8 md:p-10 border border-brand-ash/20 shadow-sm flex flex-col">
            <h3 className="flex items-center gap-3 text-xl font-bold text-bg-dark tracking-tight font-sans mb-6">
              <CheckCircle2 className="w-8 h-8 text-brand-primary" />
              Certifications & Compliance
            </h3>

            <div className="flex flex-col gap-3">
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold tracking-wider uppercase self-start mb-2 ${certChipClass(product.certificationType)}`}>
                <ShieldCheck className="w-3 h-3" />
                {product.certificationType} Certified
              </div>
              {certFiles.map((file, idx) => (
                <DriveRow key={idx} file={file} icon={<ShieldCheck className="w-4 h-4 text-brand-primary" />} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ── Similar Products ── */}
      <div className="border-t border-brand-ash/20 pt-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-section-h2 font-serif text-bg-dark tracking-tight mb-2">Similar Products</h2>
            <p className="text-text-light-bg/70 text-body-xl">Explore alternative configurations for your infrastructure needs.</p>
          </div>
          <Link href="/products" className="text-xs font-bold tracking-[0.15em] text-brand-primary uppercase hover:text-bg-dark transition-colors shrink-0">
            View All Products
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedProducts.map(p => (
            <Link
              href={`/products/${p.slug}`}
              key={p.id}
              className="group bg-white border border-brand-ash/20  rounded-4xl p-8 hover:shadow-lg hover:border-brand-primary transition-all flex flex-col relative overflow-hidden"
            >
              <div className="w-full h-48 bg-[#f8f9fc] rounded-2xl mb-8 flex items-center justify-center p-6 border border-brand-ash/10 group-hover:bg-white transition-colors">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-contain mix-blend-multiply opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 ease-out"
                />
              </div>
              <div className={`self-start mb-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold tracking-wider uppercase ${certChipClass(p.certificationType)}`}>
                <ShieldCheck className="w-3 h-3" />
                {p.certificationType}
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
