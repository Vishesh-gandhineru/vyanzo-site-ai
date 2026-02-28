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

export type Product = {
  id: number;
  title: string;
  sku: string;
  description: string;
  image: string;
  isBenor: boolean;
  category: string;
  docsTree?: DocFolder;
};

// Helper to find the correct folder tree from the JSON map
function getDocsTree(folderName: string): DocFolder | undefined {
  return (docsMap as DocFolder[]).find(f => f.name === folderName);
}

export const products: Product[] = [
  {
    id: 1,
    title: "Benor Certified Cover - D400",
    sku: "BE-CV-01",
    description: "Heavy-duty municipal cover with Benor certification for Belgian infrastructure.",
    image: "/products/manhole-cover.png",
    isBenor: true,
    category: "Covers",
    docsTree: getDocsTree("Manhole covers - wegenisdeksels - regards"),
  },
  {
    id: 2,
    title: "Benor Certified Cover - E600",
    sku: "BE-CV-02",
    description: "Extra heavy-duty cover for industrial and high-traffic areas.",
    image: "/products/hydraulic-cover.png",
    isBenor: true,
    category: "Covers",
    docsTree: getDocsTree("Hydraulic covers - hydraulische deksels - regards hydrauliques"),
  },
  {
    id: 3,
    title: "Benor Siphon - Plat Recht",
    sku: "BE-SP-01",
    description: "High-capacity siphon with multiple version options for versatile installation.",
    image: "/products/siphon.png",
    isBenor: true,
    category: "Siphons",
    docsTree: getDocsTree("Siphons - Kolken - Avaloirs"),
  },
  {
    id: 4,
    title: "Benor Surface Box",
    sku: "BE-SB-01",
    description: "Standard surface box for utility access and protection.",
    image: "/products/surface-box.png",
    isBenor: true,
    category: "Surface boxes",
    docsTree: getDocsTree("Surface boxes - Huisaansluitputjes - Regards de branchement"),
  },
];
