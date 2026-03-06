"use client";

import { useState, useEffect } from "react";
import {
  ChevronRight,
  Globe,
  ExternalLink,
  ArrowRight,
  Factory,
  ShieldCheck,
  AlertCircle,
  Settings2,
  FileText,
  CheckCircle2,
  Download,
  Award,
  Maximize,
  Info,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Product, DriveLink, SheetRow } from "@/data/products";
import Link from "next/link";
import { products } from "@/data/products";

// ─── Resolve the real Google Drive filename via our API route ─────────────────
function useDriveFileName(
  driveUrl: string,
  fallback: string,
): { name: string; loading: boolean } {
  const m = driveUrl ? driveUrl.match(/\/file\/d\/([^/]+)\//) : null;
  const fileId = m ? m[1] : null;

  const [name, setName] = useState(fallback);
  const [loading, setLoading] = useState(!!fileId);

  useEffect(() => {
    if (!fileId) return;

    let cancelled = false;
    setLoading(true);

    fetch(`/api/drive-name?id=${fileId}`)
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled && data.name) setName(data.name);
      })
      .catch(() => {
        /* keep fallback */
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [fileId]);

  return { name, loading };
}

// ─── Fetch and parse specs from a Google Sheet table_link ───────────────────────
function useSheetSpecs(tableLink: string | null): {
  rows: SheetRow[];
  loading: boolean;
} {
  const [rows, setRows] = useState<SheetRow[]>([]);
  const [loading, setLoading] = useState(!!tableLink);

  useEffect(() => {
    if (!tableLink) return;

    let cancelled = false;
    setLoading(true);

    fetch(`/api/sheet-specs?url=${encodeURIComponent(tableLink)}`)
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled && data.rows) setRows(data.rows);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [tableLink]);

  return { rows, loading };
}

// ─── Certification chip colour ────────────────────────────────────────────────
function certChipClass(type: string): string {
  switch (type.toLowerCase()) {
    case "benor":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "copro":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "en124-2":
    case "en 124-2":
      return "bg-amber-50 text-amber-700 border-amber-200";
    default:
      return "bg-brand-ash/10 text-brand-ash border-brand-ash/20";
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
            <p className="text-sm font-semibold text-bg-dark font-sans">
              {name}
            </p>
          )}
        </div>
      </div>
      <Download className="w-4 h-4 text-brand-ash group-hover:text-brand-primary transition-colors shrink-0" />
    </a>
  );
}

// ─── Variant Icon Helper ──────────────────────────────────────────────────────
function VariantIcon({ name }: { name: string }) {
  if (name.includes("B125")) {
    return (
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full block"
      >
        <rect
          x="22"
          y="10"
          width="56"
          height="56"
          rx="7"
          stroke="currentColor"
          strokeWidth="2.5"
          fill="none"
        />
        <line
          x1="34"
          y1="22"
          x2="34"
          y2="56"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M34 22 Q34 22 46 22 Q56 22 56 32 Q56 42 46 42 L34 42"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <g
          transform="translate(54, 50) scale(0.48)"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        >
          <rect x="0" y="7" width="30" height="13" rx="3" strokeWidth="2.5" />
          <path d="M5 7 L8 1 L22 1 L25 7" strokeWidth="2.2" />
          <circle cx="7" cy="21" r="3.5" strokeWidth="2.2" />
          <circle cx="23" cy="21" r="3.5" strokeWidth="2.2" />
        </g>
        <text
          x="50"
          y="94"
          textAnchor="middle"
          fontFamily="'DM Sans', sans-serif"
          fontWeight="700"
          fontSize="11"
          fill="currentColor"
          letterSpacing="0.5"
        >
          B125
        </text>
      </svg>
    );
  }
  if (name.includes("C250")) {
    return (
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full block"
      >
        <circle
          cx="50"
          cy="24"
          r="14"
          fill="white"
          stroke="#e63030"
          strokeWidth="2.5"
        />
        <text
          x="50"
          y="29"
          textAnchor="middle"
          fontFamily="'DM Sans', sans-serif"
          fontWeight="700"
          fontSize="13"
          fill="#111"
        >
          30
        </text>
        <line
          x1="10"
          y1="46"
          x2="90"
          y2="46"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <g fill="currentColor">
          <path d="M12 80 L17 48 L23 48 L18 80 Z" />
          <path d="M25 80 L30 48 L36 48 L31 80 Z" />
          <path d="M38 80 L43 48 L49 48 L44 80 Z" />
          <path d="M51 80 L56 48 L62 48 L57 80 Z" />
          <path d="M64 80 L69 48 L75 48 L70 80 Z" />
          <path d="M77 80 L82 48 L88 48 L83 80 Z" />
        </g>
        <text
          x="50"
          y="94"
          textAnchor="middle"
          fontFamily="'DM Sans', sans-serif"
          fontWeight="700"
          fontSize="11"
          fill="currentColor"
          letterSpacing="0.5"
        >
          C250
        </text>
      </svg>
    );
  }
  if (name.includes("D400")) {
    return (
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-full block"
      >
        <line x1="8" y1="38" x2="92" y2="38" strokeWidth="3" />
        <line x1="20" y1="38" x2="20" y2="48" strokeWidth="3" />
        <line x1="80" y1="38" x2="80" y2="48" strokeWidth="3" />
        <path d="M4 78 L32 48 L50 48 L24 78 Z" strokeWidth="2" />
        <path d="M96 78 L68 48 L50 48 L76 78 Z" strokeWidth="2" />
        <path d="M32 38 L42 16 L38 38 Z" strokeWidth="1.8" />
        <path d="M68 38 L58 16 L62 38 Z" strokeWidth="1.8" />
        <line
          x1="50"
          y1="49"
          x2="50"
          y2="58"
          strokeWidth="1.8"
          strokeDasharray="4 3"
        />
        <line
          x1="50"
          y1="63"
          x2="50"
          y2="75"
          strokeWidth="1.8"
          strokeDasharray="4 3"
        />
        <text
          x="50"
          y="94"
          textAnchor="middle"
          fontFamily="'DM Sans', sans-serif"
          fontWeight="700"
          fontSize="11"
          fill="currentColor"
          letterSpacing="0.5"
          stroke="none"
        >
          D400
        </text>
      </svg>
    );
  }
  return null;
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function ProductDetails({ product }: { product: Product }) {
  const hasVariants = product.variants && product.variants.length > 0;
  const allImages = [product.image, ...product.subImages];
  const [selectedImage, setSelectedImage] = useState(allImages[0]);

  // Accordion state: by default, the first variant is open
  const [openVariants, setOpenVariants] = useState<Record<number, boolean>>({
    0: true,
  });

  const toggleVariant = (idx: number) => {
    setOpenVariants((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const [activeTab, setActiveTab] = useState<
    "specifications" | "certifications" | "sizes"
  >("specifications");
  const { rows: sheetRows, loading: sheetLoading } = useSheetSpecs(
    product.tableLink,
  );

  const specFiles = product.specificationFiles;
  const certFiles = product.certificationFiles;

  // Similar products: same category, excluding self, max 3
  const similarProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  // Fallback if not enough same-category
  const relatedProducts =
    similarProducts.length >= 3
      ? similarProducts
      : [
          ...similarProducts,
          ...products.filter(
            (p) => p.id !== product.id && p.category !== product.category,
          ),
        ].slice(0, 3);

  return (
    <section className="w-full font-sans py-8 px-4 md:px-8 max-w-[1400px] mx-auto min-h-screen">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-text-light-bg/60 font-medium mb-8 overflow-x-auto whitespace-nowrap pb-2">
        <Link href="/" className="hover:text-bg-dark transition-colors">
          Home
        </Link>
        <ChevronRight className="w-4 h-4 shrink-0" />
        <Link href="/products" className="hover:text-bg-dark transition-colors">
          Products
        </Link>
        <ChevronRight className="w-4 h-4 shrink-0" />
        <span className="text-brand-primary font-semibold">
          {product.category}
        </span>

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
              <div
                className={`absolute top-5 left-5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-sans font-bold tracking-wider uppercase z-10 ${certChipClass(product.certificationType)}`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                {product.certificationType}
              </div>

              <img
                src={selectedImage}
                alt={product.title}
                className="w-full h-full object-contain p-12 md:p-16 mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>

            {/* Thumbnail row */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-4 w-full h-[110px]">
                {allImages.map((img, idx) => {
                  const isActive = selectedImage === img;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-full h-full rounded-2xl flex items-center justify-center p-3 transition-all border
                      ${
                        isActive
                          ? "bg-white border-brand-primary/40 shadow-sm ring-1 ring-brand-primary/20"
                          : "bg-[#f8f9fc] border-brand-ash/10 hover:border-brand-primary/30 hover:bg-white"
                      } group`}
                    >
                      <img
                        src={img}
                        alt={`${product.title} thumbnail ${idx + 1}`}
                        className={`w-full h-full object-contain mix-blend-multiply transition-opacity ${isActive ? "opacity-100" : "opacity-40 group-hover:opacity-100"}`}
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* ── Right Sidebar: Documentation OR Title ── */}
        <aside className="w-full lg:w-[420px] shrink-0 flex flex-col gap-8">
          {hasVariants ? (
            <div className="flex flex-col pt-4">
              <h1 className="text-4xl md:text-5xl lg:text-[4rem] leading-[1.05] font-serif font-bold text-bg-dark tracking-tight mb-6 mt-4">
                {product.title}
              </h1>
              <p className="text-text-light-bg/70 font-sans font-normal text-body-lg leading-relaxed max-w-2xl">
                {product.description}
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-[2.5rem] p-4 shadow-sm border border-brand-ash/20 h-fit overflow-hidden">
              {specFiles.length > 0 ? (
                (() => {
                  const fileId =
                    specFiles[0].url.match(/\/file\/d\/([^/]+)\//)?.[1];
                  return fileId ? (
                    <iframe
                      src={`https://drive.google.com/file/d/${fileId}/preview`}
                      className="w-full aspect-3/4 rounded-2xl border-none"
                    />
                  ) : (
                    <div className="w-full aspect-square flex items-center justify-center bg-[#f8f9fc] rounded-2xl">
                      <p className="text-text-light-bg/40 text-sm font-sans shrink-0">
                        Invalid spec URL
                      </p>
                    </div>
                  );
                })()
              ) : (
                <div className="w-full aspect-square flex items-center justify-center bg-[#f8f9fc] rounded-2xl">
                  <p className="text-text-light-bg/40 text-sm font-sans shrink-0">
                    No specification available
                  </p>
                </div>
              )}
            </div>
          )}
        </aside>
      </div>

      {/* ── Title & Description (Only for non-variants) ── */}
      {!hasVariants && (
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-[4rem] leading-[1.05] font-serif font-bold text-bg-dark tracking-tight mb-6">
            {product.title}
          </h1>
          <p className="text-text-light-bg/70 font-sans font-normal text-body-xl leading-relaxed max-w-2xl">
            {product.description}
          </p>
        </div>
      )}

      {/* ── Info Grid / Variants Table ── */}
      {product.variants && product.variants.length > 0 ? (
        <div className="flex flex-col gap-12 mb-24">
          {product.variants.map((variant, vIdx) => {
            const isOpen = !!openVariants[vIdx];

            return (
              <div
                key={vIdx}
                className="bg-white rounded-[2.5rem] border border-brand-ash/20 shadow-sm flex flex-col overflow-hidden"
              >
                {/* ── Header ── */}
                <div
                  className="p-8 md:p-10 border-b border-[#1c64f2]/20 flex flex-col md:flex-row md:items-start justify-between gap-6 relative bg-white cursor-pointer hover:bg-[#f8f9fc] transition-colors"
                  onClick={() => toggleVariant(vIdx)}
                >
                  <div className="flex gap-6 items-center w-full pr-12">
                    {/* Icon Circle */}
                    <div className="w-[100px] h-[100px] rounded-full bg-[#eef4fb] border-[2.2px] border-[#6ab0e0] shrink-0 text-[#6ab0e0] overflow-hidden hover:bg-[#d8ecf9] hover:shadow-[0_4px_16px_rgba(106,176,224,0.3)] transition-all relative">
                      <VariantIcon name={variant.name} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-section-h3 text-bg-dark font-sans tracking-tight">
                          {variant.name}
                        </h3>
                        <span className="bg-brand-primary text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
                          {variant.kn}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Chevron Toggle */}
                  <div className="absolute right-8 top-10 md:top-1/2 md:-translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-brand-primary/10 text-brand-primary group-hover:text-brand-primary transition-colors">
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </div>

                {/* ── Table ── */}
                {isOpen && (
                  <div className="overflow-x-auto animate-in fade-in slide-in-from-top-4 duration-300">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                      <thead>
                        <tr className="border-b border-brand-ash/10 bg-[#fbfcfd]">
                          <th className="py-5 px-8 text-[11px] font-bold text-brand-ash tracking-[0.15em] uppercase w-1/3">
                            Class
                          </th>
                          <th className="py-5 px-8 text-[11px] font-bold text-brand-ash tracking-[0.15em] uppercase w-1/3">
                            Size (mm)
                          </th>
                          <th className="py-5 px-8 text-[11px] font-bold text-brand-ash tracking-[0.15em] uppercase w-1/3 text-right">
                            Technical Data
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {variant.sizes.map((size, sIdx) => {
                          const specFile = variant.specificationFiles[sIdx];
                          const identifier = `${variant.name.replace("Class ", "")}-${size.replace(/x/gi, "")}`;
                          return (
                            <tr
                              key={sIdx}
                              className="border-b border-brand-ash/10 hover:bg-[#f8f9fc] transition-colors last:border-0 group/row"
                            >
                              <td className="py-4 px-8 font-mono text-[#a0aabf] font-medium text-sm tracking-wide">
                                {identifier}
                              </td>
                              <td className="py-4 px-8 font-sans font-bold text-[#111827] text-[14px] flex items-center gap-3">
                                <Maximize className="w-4 h-4 text-[#d1d5db]" />
                                {size.toLowerCase()}
                              </td>
                              <td className="py-4 px-8 text-right">
                                <div className="flex items-center justify-end gap-3">
                                  {specFile ? (
                                    <a
                                      href={specFile.downloadUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-2 bg-[#f4f7f9] text-[#6b7280] hover:text-brand-primary hover:bg-[#eaf0f6] transition-colors px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide border border-transparent hover:border-[#1c64f2]/20 shadow-sm"
                                    >
                                      <Download className="w-3.5 h-3.5" />
                                      DOWNLOAD SPEC
                                    </a>
                                  ) : (
                                    <span className="text-text-light-bg/40 text-xs italic px-4 py-2.5">
                                      Not available
                                    </span>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-24">
          {/* Technical Specifications */}
          <div className="bg-white rounded-4xl p-8 md:p-10 border border-brand-ash/20 shadow-sm flex flex-col">
            <h3 className="flex items-center gap-3 text-xl font-bold text-bg-dark font-sans tracking-tight mb-8">
              <Settings2 className="w-8 h-8 text-brand-primary" />
              Product Details
            </h3>
            <div className="bg-[#f8f9fc] rounded-2xl border border-brand-ash/10 overflow-hidden">
              {/* Live rows from Google Sheet */}
              {sheetLoading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-4 px-6 border-b border-brand-ash/10 gap-4"
                    >
                      <div className="h-3.5 w-28 bg-brand-ash/20 rounded animate-pulse" />
                      <div className="h-3.5 w-36 bg-brand-ash/20 rounded animate-pulse" />
                    </div>
                  ))
                : sheetRows.length > 0
                  ? sheetRows.map((row, idx, arr) => (
                      <div
                        key={idx}
                        className={`flex flex-col sm:flex-row sm:items-start justify-between py-4 px-6 hover:bg-white transition-colors gap-2 sm:gap-4 ${
                          idx !== arr.length - 1
                            ? "border-b border-brand-ash/10"
                            : ""
                        }`}
                      >
                        <span className="text-text-light-bg/70 font-medium text-body-lg shrink-0">
                          {row.key}
                        </span>
                        <span className="text-bg-dark font-bold font-sans text-body-sm text-left sm:text-right whitespace-pre-line max-w-[60%]">
                          {row.value}
                        </span>
                      </div>
                    ))
                  : // Fallback when no table_link / sheet unavailable
                    [
                      { label: "Category", value: product.category },
                      {
                        label: "Sub-Category",
                        value: product.subCategory ?? "—",
                      },
                      { label: "SKU", value: product.sku },
                    ].map((row, idx, arr) => (
                      <div
                        key={idx}
                        className={`flex flex-col sm:flex-row sm:items-center justify-between py-4 px-6 hover:bg-white transition-colors gap-2 sm:gap-4 ${
                          idx !== arr.length - 1
                            ? "border-b border-brand-ash/10"
                            : ""
                        }`}
                      >
                        <span className="text-text-light-bg/70 font-medium text-body-lg">
                          {row.label}
                        </span>
                        <span className="text-bg-dark font-bold font-sans text-body-sm uppercase">
                          {row.value}
                        </span>
                      </div>
                    ))}
            </div>
          </div>

          {/* Documentation Section (moved to bottom) */}
          <div className="bg-white rounded-4xl p-8 md:p-10 border border-brand-ash/20 shadow-sm flex flex-col h-fit">
            <h3 className="flex items-center gap-3 text-xl font-bold text-bg-dark tracking-tight font-sans mb-6">
              <ExternalLink className="w-6 h-6 text-brand-primary" />
              Documentation
            </h3>

            {/* Tab switcher */}
            <div className="flex gap-2 mb-6 bg-[#f8f9fc] rounded-xl p-1 w-full md:w-fit">
              {(product.sizes && product.sizes.length > 0
                ? (["specifications", "certifications", "sizes"] as const)
                : (["specifications", "certifications"] as const)
              ).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2.5 px-6 rounded-lg text-sm font-semibold font-sans capitalize transition-all ${
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
              <div className="flex flex-col gap-2 max-h-[350px] overflow-y-auto pr-2 pb-2 custom-scrollbar">
                {specFiles.length > 0 ? (
                  specFiles.map((f, i) => (
                    <DriveRow
                      key={i}
                      file={f}
                      icon={<FileText className="w-4 h-4 text-brand-primary" />}
                    />
                  ))
                ) : (
                  <p className="py-8 text-text-light-bg/40 text-sm font-sans">
                    No specification files available.
                  </p>
                )}
              </div>
            )}

            {/* Certifications tab */}
            {activeTab === "certifications" && (
              <div className="flex flex-col gap-2 max-h-[350px] overflow-y-auto pr-2 pb-2 custom-scrollbar">
                {certFiles.length > 0 ? (
                  certFiles.map((f, i) => (
                    <DriveRow
                      key={i}
                      file={f}
                      icon={<Award className="w-4 h-4 text-brand-primary" />}
                    />
                  ))
                ) : (
                  <p className="py-8 text-text-light-bg/40 text-sm font-sans">
                    No certification files available.
                  </p>
                )}
              </div>
            )}

            {/* Sizes tab */}
            {activeTab === "sizes" && product.sizes && (
              <div className="flex flex-col gap-2 max-h-[350px] overflow-y-auto pr-2 pb-2 custom-scrollbar">
                {product.sizes.length > 0 ? (
                  product.sizes.map((size, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-4 bg-[#f8f9fc] rounded-xl border border-transparent"
                    >
                      <div className="w-9 h-9 rounded-lg bg-brand-primary/10 flex items-center justify-center shrink-0">
                        <Maximize className="w-4 h-4 text-brand-primary" />
                      </div>
                      <p className="text-sm font-semibold text-bg-dark font-sans">
                        {size}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="py-8 text-text-light-bg/40 text-sm font-sans">
                    No sizes available.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Similar Products ── */}
      <div className="border-t border-brand-ash/20 pt-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-section-h2 font-serif text-bg-dark tracking-tight mb-2">
              Similar Products
            </h2>
            <p className="text-text-light-bg/70 text-body-xl">
              Explore alternative configurations for your infrastructure needs.
            </p>
          </div>
          <Link
            href="/products"
            className="text-xs font-bold tracking-[0.15em] text-brand-primary uppercase hover:text-bg-dark transition-colors shrink-0"
          >
            View All Products
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedProducts.map((p) => (
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
              <div
                className={`self-start mb-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold tracking-wider uppercase ${certChipClass(p.certificationType)}`}
              >
                <ShieldCheck className="w-3 h-3" />
                {p.certificationType}
              </div>
              <h3 className="text-xl font-bold font-sans text-bg-dark mb-2">
                {p.title}
              </h3>
              <p className="text-text-light-bg/70 text-sm leading-relaxed mb-6 flex-1 line-clamp-2">
                {p.description}
              </p>
              <div className="flex items-center justify-between text-bg-dark font-medium border-t border-brand-ash/10 pt-4">
                <span className="font-serif font-bold text-lg text-brand-primary">
                  View Technical Specs
                </span>
                <ArrowRight className="w-5 h-5 group-hover:text-brand-primary group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
