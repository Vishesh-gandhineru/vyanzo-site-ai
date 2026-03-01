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

// Helper to find the correct folder tree from the JSON map
function getDocsTree(folderName: string): DocFolder | undefined {
  return (docsMap as DocFolder[]).find(f => f.name === folderName);
}

export const products: Product[] = [
  {
    id: 1,
    title: "Benor Certified Cover - D400",
    slug: "manhole-covers",
    sku: "BE-CV-01",
    description: "Heavy-duty municipal cover with Benor certification for Belgian infrastructure.",
    image: "/products/manhole-cover.png",
    isBenor: true,
    category: "Covers",
    docsTree: getDocsTree("Manhole covers - wegenisdeksels - regards"),
    specifications: [
      { parameter: "Certification", value: "Benor" },
      { parameter: "Frame height", value: "20cm" },
      { parameter: "Load category", value: "D400 – heavy duty" },
      { parameter: "Inscriptions", value: "D/RWA, EU/P, Aquafin, optional customer logo" },
    ],
    features: [
      {
        title: "Production Excellence",
        description: "Utilizing Inductotherm furnaces and DISA 280c vertical moulding lines for unsurpassed precision.",
        iconName: "factory"
      },
      {
        title: "Eco-Friendly Casting",
        description: "Powered by rooftop solar energy and electrical induction furnaces to minimize environmental impact.",
        iconName: "globe"
      }
    ]
  },
  {
    id: 2,
    title: "Benor Certified Cover - E600",
    slug: "hydraulic-covers",
    sku: "BE-CV-02",
    description: "Extra heavy-duty cover for industrial and high-traffic areas.",
    image: "/products/hydraulic-cover.png",
    isBenor: true,
    category: "Covers",
    docsTree: getDocsTree("Hydraulic covers - hydraulische deksels - regards hydrauliques"),
    specifications: [
      { parameter: "Certification", value: "Benor" },
      { parameter: "Frame height", value: "20cm" },
      { parameter: "Load category", value: "E600 – extra heavy duty" },
      { parameter: "Inscriptions", value: "Custom logo available" },
    ],
    features: [
      {
        title: "Production Excellence",
        description: "Utilizing Inductotherm furnaces and DISA 280c vertical moulding lines for unsurpassed precision.",
        iconName: "factory"
      },
      {
        title: "Eco-Friendly Casting",
        description: "Powered by rooftop solar energy and electrical induction furnaces to minimize environmental impact.",
        iconName: "globe"
      }
    ]
  },
  {
    id: 3,
    title: "Benor Siphon - Plat Recht",
    slug: "siphons",
    sku: "BE-SP-01",
    description: "High-capacity siphon with multiple version options for versatile installation.",
    image: "/products/siphon.png",
    isBenor: true,
    category: "Siphons",
    docsTree: getDocsTree("Siphons - Kolken - Avaloirs"),
    specifications: [
      { parameter: "Certification", value: "Benor" },
      { parameter: "Material", value: "Ductile Iron" },
      { parameter: "Type", value: "Flat Straight (Plat Recht)" },
    ],
    features: [
      {
        title: "High Performance",
        description: "Designed for optimal flow and clog resistance in demanding environments.",
        iconName: "activity"
      }
    ]
  },
  {
    id: 4,
    title: "Benor Surface Box",
    slug: "surface-boxes",
    sku: "BE-SB-01",
    description: "Standard surface box for utility access and protection.",
    image: "/products/surface-box.png",
    isBenor: true,
    category: "Surface boxes",
    docsTree: getDocsTree("Surface boxes - Huisaansluitputjes - Regards de branchement"),
    specifications: [
      { parameter: "Certification", value: "Benor" },
      { parameter: "Load category", value: "B125" },
      { parameter: "Usage", value: "Gas and water valves" },
    ],
  },
];
