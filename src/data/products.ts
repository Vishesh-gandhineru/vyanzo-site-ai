import productData from "./productdata.json";

// ─── Types ────────────────────────────────────────────────────────────────────

export type DriveLink = {
  label: string;
  url: string;
  downloadUrl: string;
};

export type Product = {
  id: number;
  no: number;
  title: string;        // = name from JSON
  slug: string;
  sku: string;
  description: string;
  image: string;
  category: string;     // = product_category
  subCategory: string | null;
  certificationType: string;
  isBenor: boolean;
  specificationFiles: DriveLink[];
  certificationFiles: DriveLink[];
  tableLink: string | null;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Convert a Google Drive share URL to a direct download URL */
function toDownloadUrl(viewUrl: string): string {
  const m = viewUrl.match(/\/file\/d\/([^/]+)\//);
  return m ? `https://drive.google.com/uc?export=download&id=${m[1]}` : viewUrl;
}

/** Convert a name + index to a sane display label */
function fileLabel(name: string, idx: number): string {
  return `${name} — Document ${idx + 1}`;
}

/** Build a DriveLink array from an object of { file_1, file_2, ... } */
function buildLinks(name: string, files: Record<string, string | null>): DriveLink[] {
  return Object.values(files)
    .filter((url): url is string => !!url)
    .map((url, i) => ({
      label: fileLabel(name, i),
      url,
      downloadUrl: toDownloadUrl(url),
    }));
}

/** Pick the right product image based on category */
function imageForCategory(cat: string, sub: string | null): string {
  const c = cat.toLowerCase();
  const s = (sub ?? "").toLowerCase();
  if (s.includes("hydraulic")) return "/products/hydraulic-cover.png";
  if (c.includes("siphon"))    return "/products/siphon.png";
  if (c.includes("surface"))   return "/products/surface-box.png";
  return "/products/manhole-cover.png";
}

/** Slugify a string */
function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// ─── Build products array ─────────────────────────────────────────────────────

type RawEntry = {
  no: number;
  product_category: string;
  sub_category: string | null;
  name: string;
  certification_type: string;
  certifications: Record<string, string | null>;
  specifications: Record<string, string | null>;
  image_link: string | null;
  table_link: string | null;
};

export const products: Product[] = (productData as RawEntry[]).map((p) => {
  const certFiles  = buildLinks(p.name, p.certifications);
  const specFiles  = buildLinks(p.name, p.specifications);

  return {
    id:                p.no,
    no:                p.no,
    title:             p.name,
    slug:              slugify(`${p.product_category}-${p.sub_category ?? ""}-${p.name}`),
    sku:               `VY-${p.product_category.substring(0, 3).toUpperCase()}-${String(p.no).padStart(2, "0")}`,
    description:       `High-quality ${p.name} from our ${p.product_category} range${p.sub_category ? ` (${p.sub_category})` : ""}.`,
    image:             imageForCategory(p.product_category, p.sub_category),
    category:          p.product_category,
    subCategory:       p.sub_category,
    certificationType: p.certification_type,
    isBenor:           p.certification_type.toLowerCase() === "benor",
    specificationFiles: specFiles,
    certificationFiles: certFiles,
    tableLink:         p.table_link,
  };
});

// ─── Derived filter lists (used by ProductGrid) ───────────────────────────────

export const ALL_CATEGORIES    = Array.from(new Set(products.map(p => p.category)));
export const ALL_SUB_CATEGORIES = Array.from(
  new Set(products.map(p => p.subCategory).filter((s): s is string => !!s))
);
export const ALL_CERT_TYPES    = Array.from(new Set(products.map(p => p.certificationType)));
