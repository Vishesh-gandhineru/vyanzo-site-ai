"use client";

import { useState } from "react";
import {
  ChevronRight, Globe, ExternalLink, ArrowRight,
  Factory, ShieldCheck, AlertCircle, Settings2,
  FileText, CheckCircle2, Download, Award
} from "lucide-react";
import { Product, DriveLink } from "@/data/products";
import Link from "next/link";
import { products } from "@/data/products";

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
          <p className="text-sm font-semibold text-bg-dark font-sans">{file.label}</p>
      
        </div>
      </div>
      <Download className="w-4 h-4 text-brand-ash group-hover:text-brand-primary transition-colors shrink-0" />
    </a>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function ProductDetails({ product }: { product: Product }) {
  const [activeTab, setActiveTab] = useState<"specifications" | "certifications">("specifications");

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

                {/* Dimension Table link */}
                {/* {product.tableLink && (
                  <a
                    href={product.tableLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-brand-primary/5 rounded-xl border border-brand-primary/20 hover:bg-brand-primary/10 transition-all group mt-2"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-brand-primary/20 flex items-center justify-center shrink-0">
                        <ExternalLink className="w-4 h-4 text-brand-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-bg-dark font-sans">Dimension Table</p>
                        <p className="text-xs text-brand-ash font-sans mt-0.5">Google Sheets</p>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-brand-ash group-hover:text-brand-primary transition-colors shrink-0" />
                  </a>
                )} */}
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
        <p className="text-text-light-bg/70 font-sans font-normal text-lg leading-relaxed max-w-2xl">
          {product.description}
        </p>
      </div>

      {/* ── Info Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-24">

        {/* Technical Specifications */}
        <div className="bg-white rounded-4xl p-8 md:p-10 border border-brand-ash/20 shadow-sm flex flex-col">
          <h3 className="flex items-center gap-3 text-xl md:text-2xl font-bold text-bg-dark font-sans tracking-tight mb-8">
            <Settings2 className="w-5 h-5 text-brand-primary" />
            Product Details
          </h3>
          <div className="bg-[#f8f9fc] rounded-2xl border border-brand-ash/10 overflow-hidden">
            {[
              { label: "Category",      value: product.category },
              { label: "Sub-Category",  value: product.subCategory ?? "—" },
              { label: "Certification", value: product.certificationType },
              { label: "SKU",           value: product.sku },
              { label: "Spec Files",    value: `${product.specificationFiles.length} available` },
              { label: "Cert Files",    value: `${product.certificationFiles.length} available` },
            ].map((row, idx, arr) => (
              <div
                key={idx}
                className={`flex flex-col sm:flex-row sm:items-center justify-between py-4 px-6 hover:bg-white transition-colors gap-2 sm:gap-4 ${idx !== arr.length - 1 ? "border-b border-brand-ash/10" : ""}`}
              >
                <span className="text-text-light-bg/70 font-medium text-sm">{row.label}</span>
                <span className="text-bg-dark font-bold font-sans text-sm uppercase">{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications & Compliance */}
        <div className="bg-white rounded-4xl p-8 md:p-10 border border-brand-ash/20 shadow-sm flex flex-col">
          <h3 className="flex items-center gap-3 text-xl md:text-2xl font-bold text-bg-dark tracking-tight font-sans mb-6">
            <CheckCircle2 className="w-5 h-5 text-brand-primary" />
            Certifications & Compliance
          </h3>

          {certFiles.length > 0 ? (
            <div className="flex flex-col gap-3">
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold tracking-wider uppercase self-start mb-2 ${certChipClass(product.certificationType)}`}>
                <ShieldCheck className="w-3 h-3" />
                {product.certificationType} Certified
              </div>
              {certFiles.map((file, idx) => (
                <DriveRow key={idx} file={file} icon={<ShieldCheck className="w-4 h-4 text-brand-primary" />} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-y-8 gap-x-4 flex-1 items-center justify-center pt-4">
              {[
                { icon: <Factory className="w-6 h-6" />,     label: "ISO 9001:2015" },
                { icon: <ShieldCheck className="w-6 h-6" />, label: product.certificationType },
                { icon: <Globe className="w-6 h-6" />,       label: "EN 124 Standard" },
                { icon: <AlertCircle className="w-6 h-6" />, label: "REACH Compliant" },
              ].map((cert, idx) => (
                <div key={idx} className="flex flex-col items-center gap-3 group">
                  <div className="w-16 h-16 rounded-[1.25rem] border border-brand-ash/20 bg-[#f8f9fc] flex items-center justify-center text-bg-dark group-hover:border-brand-primary group-hover:bg-brand-primary/5 transition-colors shadow-sm">
                    {cert.icon}
                  </div>
                  <span className="text-[10px] font-bold tracking-[0.1em] text-brand-ash uppercase leading-tight text-center max-w-[100px]">
                    {cert.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Similar Products ── */}
      <div className="border-t border-brand-ash/20 pt-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-serif font-bold text-bg-dark tracking-tight mb-2">Similar Products</h2>
            <p className="text-text-light-bg/70 text-sm">Explore alternative configurations for your infrastructure needs.</p>
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
              className="group bg-white border border-brand-ash/20 rounded-[2rem] p-8 hover:shadow-lg hover:border-brand-primary transition-all flex flex-col relative overflow-hidden"
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
