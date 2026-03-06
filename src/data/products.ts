import productData from "./productdata.json";

// ─── Types ────────────────────────────────────────────────────────────────────

export type DriveLink = {
  label: string;
  url: string;
  downloadUrl: string;
};

/** One key-value row from the product's Google Sheet specs table */
export type SheetRow = {
  key: string;
  value: string;
};

export type Product = {
  id: number;
  no: number;
  title: string;        // = name from JSON
  slug: string;
  sku: string;
  description: string;
  image: string;
  subImages: string[];
  category: string;     // = product_category
  subCategory: string | null;
  certificationType: string;
  isBenor: boolean;
  specificationFiles: DriveLink[];
  certificationFiles: DriveLink[];
  tableLink: string | null;
  sizes?: string[];
  variants?: Variant[];
};

export type Variant = {
  name: string;
  kn: string;
  application: string;
  description: string;
  sizes: string[];
  specifications: Record<string, string | null>;
  image_link: Record<string, string> | null;
  catalog_link?: string | null;
  specificationFiles: DriveLink[];
  image: string;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Convert a Google Drive share URL to a direct download URL */
function toDownloadUrl(viewUrl: string): string {
  const m = viewUrl.match(/\/file\/d\/([^/]+)\//);
  return m ? `https://drive.google.com/uc?export=download&id=${m[1]}` : viewUrl;
}

/** Convert a name + index to a sane display label */
function fileLabel(name: string, idx: number, docType: string): string {
  return `${name} — ${docType} ${idx + 1}`;
}

/** Build a DriveLink array from an object of { file_1, file_2, ... } */
function buildLinks(name: string, files: Record<string, string | null>, docType: string): DriveLink[] {
  return Object.values(files)
    .filter((url): url is string => !!url)
    .map((url, i) => ({
      label: fileLabel(name, i, docType),
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
  image_link: Record<string, string> | null;
  table_link: string | null;
  sizes?: string[];
  variants?: {
    name: string;
    kn: string;
    application: string;
    description: string;
    sizes: string[];
    specifications: Record<string, string | null>;
    image_link: Record<string, string> | null;
    catalog_link: string | null;
  }[];
};

export const products: Product[] = (productData as unknown as RawEntry[]).map((p) => {
  const certFiles  = buildLinks(p.name, p.certifications, "Certification");
  const specFiles  = buildLinks(p.name, p.specifications, "Specification");

  const imageKeys = p.image_link ? Object.keys(p.image_link).sort() : [];
  const primaryImage = imageKeys.length > 0 ? p.image_link![imageKeys[0]] : imageForCategory(p.product_category, p.sub_category);
  const subImages = imageKeys.length > 1 ? imageKeys.slice(1).map(k => p.image_link![k]) : [];

  return {
    id:                p.no,
    no:                p.no,
    title:             p.name,
    slug:              slugify(`${p.product_category}-${p.sub_category ?? ""}-${p.name}`),
    sku:               `VY-${p.product_category.substring(0, 3).toUpperCase()}-${String(p.no).padStart(2, "0")}`,
    description:       `High-quality ${p.name} from our ${p.product_category} range${p.sub_category ? ` (${p.sub_category})` : ""}.`,
    image:             primaryImage,
    subImages:         subImages,
    category:          p.product_category,
    subCategory:       p.sub_category,
    certificationType: p.certification_type,
    isBenor:           p.certification_type.toLowerCase() === "benor",
    specificationFiles: specFiles,
    certificationFiles: certFiles,
    tableLink:         p.table_link,
    sizes:             p.sizes,
    variants: p.variants?.map((v) => {
      const vSpecFiles = buildLinks(v.name, v.specifications, "Specification");
      const vImageKeys = v.image_link ? Object.keys(v.image_link).sort() : [];
      const vImage = vImageKeys.length > 0 ? v.image_link![vImageKeys[0]] : primaryImage;

      return {
        name: v.name,
        kn: v.kn,
        application: v.application,
        description: v.description,
        sizes: v.sizes,
        specifications: v.specifications,
        image_link: v.image_link,
        catalog_link: v.catalog_link,
        specificationFiles: vSpecFiles,
        image: vImage,
      };
    }),
  };
});

// ─── Derived filter lists (used by ProductGrid) ───────────────────────────────

export const ALL_CATEGORIES    = Array.from(new Set(products.map(p => p.category)));
export const ALL_SUB_CATEGORIES = Array.from(
  new Set(products.map(p => p.subCategory).filter((s): s is string => !!s))
);
export const ALL_CERT_TYPES    = Array.from(new Set(products.map(p => p.certificationType)));
