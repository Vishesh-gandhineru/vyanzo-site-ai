import { getAllProducts, getProductBySlug, parseMetaItems } from "@/api/products";
import { getTranslations } from "next-intl/server";

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
  productDetails?: { name: string; value: string }[]; 
  image: string;
  subImages: string[];
  category: string;     // = product_category
  subCategory: string | null;
  certificationType: string;
  location?: string | null;
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

// ─── Map WP GraphQL Node to Product Type ──────────────────────────────────────

function mapNodeToProduct(node: any): Product {
    const id = node.databaseId || 0;
    const certs = node.certifications?.nodes || [];
    const certType = certs.length > 0 ? certs[0].name : "None";
    
    // Attempting to extract location from a custom taxonomy or meta field if it exists
    const location = node.locations?.nodes?.[0]?.name || null;

    const specFiles: DriveLink[] = Array.isArray(node.specification) 
      ? node.specification.map((item: any) => ({
          label: item.name || '',
          url: item.url || '', 
          downloadUrl: item.url || ''
        }))
      : [];

    const certFiles: DriveLink[] = Array.isArray(node.cerification)
      ? node.cerification.map((item: any) => ({
          label: item.name || '',
          url: item.url || '',
          downloadUrl: item.url || ''
        }))
      : [];

    const productDetails = Array.isArray(node.productDetails) ? node.productDetails : [];

    let subImages: string[] = [];
    if (typeof node.productGallery === 'string') {
      try {
        const parsed = JSON.parse(node.productGallery);
        if (Array.isArray(parsed)) {
          subImages = parsed.map((item: any) => typeof item === 'string' ? item : (item?.url || item?.sourceUrl || '')).filter(Boolean);
        } else if (typeof parsed === 'object' && parsed !== null) {
          subImages = Object.values(parsed).map((item: any) => typeof item === 'string' ? item : (item?.url || item?.sourceUrl || '')).filter(Boolean);
        } else {
          subImages = node.productGallery.split(',').map((url: string) => url.trim()).filter(Boolean);
        }
      } catch (e) {
        subImages = node.productGallery.split(',').map((url: string) => url.trim()).filter(Boolean);
      }
    } else if (Array.isArray(node.productGallery)) {
      subImages = node.productGallery.map((item: any) => typeof item === 'string' ? item : (item?.url || item?.sourceUrl || '')).filter(Boolean);
    } else if (node.productGallery && typeof node.productGallery === 'object') {
      if (node.productGallery.nodes) {
        subImages = node.productGallery.nodes.map((n: any) => n.sourceUrl || n.mediaItemUrl || "").filter(Boolean);
      } else {
        subImages = Object.values(node.productGallery).map((item: any) => typeof item === 'string' ? item : (item?.url || item?.sourceUrl || '')).filter(Boolean);
      }
    }

    // Provide default layout images for category types if no featured image exists
    let cat = node.productCategories?.nodes?.[0]?.name || "Uncategorized";
    let defaultImg = "/products/manhole-cover.png";
    if (cat.toLowerCase().includes("siphon")) defaultImg = "/products/siphon.png";
    if (cat.toLowerCase().includes("surface")) defaultImg = "/products/surface-box.png";
    if (cat.toLowerCase().includes("hydraulic")) defaultImg = "/products/hydraulic-cover.png";

    return {
      id,
      no: id,
      title: node.title,
      slug: node.slug,
      sku: `VY-${Math.floor(Math.random() * 10000)}`,
      description: node.productDescription || "",
      productDetails,
      image: node.featuredImage?.node?.sourceUrl || defaultImg,
      subImages,
      category: cat,
      subCategory: null,
      certificationType: certType,
      location: typeof location === 'string' ? location : null,
      isBenor: certType.toLowerCase().includes("benor"),
      specificationFiles: specFiles,
      certificationFiles: certFiles,
      tableLink: null,
      variants: []
    };
}

import STATIC_PRODUCTS from './productdata.json';

// ─── API Wrapper Functions ─────────────────────────────────────────────────────

async function getStaticHydraulicCover(locale: string): Promise<Product | null> {
    const raw = STATIC_PRODUCTS.find((p: any) => p.no === 9);
    if (!raw) return null;

    const t = await getTranslations({ locale, namespace: 'HydraulicCovers' });

    const subImages = Object.values(raw.image_link || {}).filter(Boolean) as string[];
    const variants: Variant[] = (raw.variants || []).map((v: any) => {
      const specFiles = v.sizes.map((_: any, i: number) => {
        const fileUrl = (v.specifications as any)[`file_${i + 1}`];
        if (!fileUrl) return null;
        return { label: `Spec for ${v.sizes[i]}`, url: fileUrl, downloadUrl: fileUrl } as DriveLink;
      });
      
      let img = "";
      if (v.image_link) {
        img = Object.values(v.image_link)[0] as string || "";
      }
      
      const variantKey = v.name.replace(/ /g, '_');

      return {
        name: v.name,
        kn: v.kn,
        application: t(`variants.${variantKey}.application`),
        description: t(`variants.${variantKey}.description`),
        sizes: v.sizes,
        specifications: v.specifications || {},
        image_link: v.image_link || null,
        catalog_link: v.catalog_link || null,
        specificationFiles: specFiles,
        image: img
      } as Variant;
    });

    return {
      id: 9999,
      no: 9,
      title: t("title"),
      slug: "hydraulic-covers",
      sku: `VY-HYC`,
      description: "",
      productDetails: [],
      image: subImages.length > 0 ? subImages[0] : "",
      subImages,
      category: raw.product_category,
      subCategory: raw.sub_category,
      certificationType: raw.certification_type,
      location: null,
      isBenor: false,
      specificationFiles: [],
      certificationFiles: [],
      tableLink: raw.table_link || null,
      variants
    };
}

export async function getProducts(locale: string = "EN"): Promise<Product[]> {
    const nodes = await getAllProducts(locale.toUpperCase());
    const products = nodes.map(mapNodeToProduct);
    
    // Inject the complex nested variant product
    const hydraulic = await getStaticHydraulicCover(locale);
    if (hydraulic && !products.some((p: Product) => p.slug === "hydraulic-covers")) {
        products.push(hydraulic);
    }
    
    return products;
}

export async function getProduct(slug: string, locale: string = "EN"): Promise<Product | null> {
    if (slug === "hydraulic-covers") {
      const hydraulic = await getStaticHydraulicCover(locale);
      if (hydraulic) return hydraulic;
    }

    const node = await getProductBySlug(slug);
    if (!node) return null;
    return mapNodeToProduct(node);
}

export function getDerivedLists(productsList: Product[]) {
    const ALL_CATEGORIES = Array.from(new Set(productsList.map(p => p.category)));
    const ALL_SUB_CATEGORIES = Array.from(
      new Set(productsList.map(p => p.subCategory).filter((s): s is string => !!s))
    );
    const ALL_CERT_TYPES = Array.from(new Set(productsList.map(p => p.certificationType)));
    
    return { ALL_CATEGORIES, ALL_SUB_CATEGORIES, ALL_CERT_TYPES };
}
