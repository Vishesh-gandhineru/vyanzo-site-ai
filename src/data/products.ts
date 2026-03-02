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
  
  // The first children (level 2) become the products
  const productFolders = categoryFolder.children.filter(c => c.type === "folder") as DocFolder[];
  
  return productFolders.map((productFolder, prodIndex) => {
    const title = productFolder.name;
    const isBenor = title.toLowerCase().includes("benor") || categoryName.toLowerCase().includes("benor");
    const slug = `${categoryName}-${title}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const sku = `VY-${categoryName.substring(0,3).toUpperCase()}-${title.substring(0,3).toUpperCase()}-${prodIndex + 1}`;
    
    // Assign generic images based on category or fallback
    let image = "/products/manhole-cover.png";
    if (categoryName.toLowerCase().includes("hydraulic")) image = "/products/hydraulic-cover.png";
    else if (categoryName.toLowerCase().includes("siphon")) image = "/products/siphon.png";
    else if (categoryName.toLowerCase().includes("surface box")) image = "/products/surface-box.png";

    return {
      id: parseInt(`${catIndex + 1}${prodIndex + 1}`),
      title: title,
      slug: slug,
      sku: sku,
      description: `High-quality ${title} from our ${categoryName} range.`,
      image: image,
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
});
