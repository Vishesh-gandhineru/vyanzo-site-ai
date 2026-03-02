import docsMap from "./docsMap.json";

export type DocFile = {
  name: string;
  type: "file";
  path: string;
  size: string;
};

export type DocFolder = {
  name: string;
  type: "folder";
  children: (DocFile | DocFolder)[];
};

export type ProductFeature = {
  title: string;
  description: string;
  iconName?: string;
};

export type ProductSpecification = {
  parameter: string;
  value: string;
};

export type Product = {
  id: number;
  title: string;
  slug: string;
  sku: string;
  description: string;
  image: string;
  isBenor: boolean;
  category: string;
  docsTree?: DocFolder;
  specifications?: ProductSpecification[];
  features?: ProductFeature[];
};

export const products: Product[] = (docsMap as DocFolder[]).flatMap((categoryFolder, catIndex) => {
  const categoryName = categoryFolder.name;
  
  // Create a base slug for the category (e.g., "Manhole covers" -> "manhole-covers")
  const categorySlug = categoryName.split(' - ')[0].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
  // Assign generic images based on category or fallback
  let categoryImage = "/products/manhole-cover.png";
  if (categoryName.toLowerCase().includes("hydraulic")) categoryImage = "/products/hydraulic-cover.png";
  else if (categoryName.toLowerCase().includes("siphon")) categoryImage = "/products/siphon.png";
  else if (categoryName.toLowerCase().includes("surface box")) categoryImage = "/products/surface-box.png";

  const isCategoryBenor = categoryName.toLowerCase().includes("benor");

  // Push the main Category itself as a "parent" product
  const categoryProduct: Product = {
      id: parseInt(`${catIndex + 1}000`),
      title: categoryName.split(' - ')[0], // Use the short name for the title
      slug: categorySlug,
      sku: `VY-${categoryName.substring(0,3).toUpperCase()}-MSTR`,
      description: `Explore our complete range of high-quality ${categoryName.split(' - ')[0].toLowerCase()}.`,
      image: categoryImage,
      isBenor: isCategoryBenor,
      category: categoryName,
      docsTree: categoryFolder,
      specifications: [
        { parameter: "Category", value: categoryName },
        { parameter: "Type", value: "Product Range" }
      ],
      features: [
        {
          title: "Production Excellence",
          description: "Utilizing modern induction furnaces for unsurpassed precision.",
          iconName: "factory"
        }
      ]
  };

  // The children (level 2) become the individual sub-products
  const productFolders = categoryFolder.children.filter(c => c.type === "folder") as DocFolder[];
  
  const childProducts = productFolders.map((productFolder, prodIndex) => {
    const title = productFolder.name;
    const isBenor = title.toLowerCase().includes("benor") || isCategoryBenor;
    const slug = `${categorySlug}-${title}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const sku = `VY-${categoryName.substring(0,3).toUpperCase()}-${title.substring(0,3).toUpperCase()}-${prodIndex + 1}`;
    
    return {
      id: parseInt(`${catIndex + 1}00${prodIndex + 1}`),
      title: title,
      slug: slug,
      sku: sku,
      description: `High-quality ${title} from our ${categoryName.split(' - ')[0]} range.`,
      image: categoryImage, // Inherit category image
      isBenor: isBenor,
      category: categoryName,
      docsTree: productFolder,
      specifications: [
        { parameter: "Category", value: categoryName },
        { parameter: "Product Type", value: title },
        { parameter: "Certification", value: isBenor ? "Benor" : "Standard" }
      ],
      features: [
        {
          title: "Production Excellence",
          description: "Utilizing modern induction furnaces for unsurpassed precision.",
          iconName: "factory"
        }
      ]
    };
  });

  // Return the main category product PLUS all of its child products
  return [categoryProduct, ...childProducts];
});
