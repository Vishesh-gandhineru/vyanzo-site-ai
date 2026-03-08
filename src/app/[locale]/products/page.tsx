import { Suspense } from "react";
import GlobalHeader from "@/components/GlobalHeader";
import ProductsHero from "@/components/products/ProductsHero";
import ProductGrid from "@/components/products/ProductGrid";
import Footer from "@/components/Footer";
import { getProducts, getDerivedLists } from "@/data/products";
import { getAllLocations } from "@/api/products";

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const products = await getProducts(locale);
  const locationsData = await getAllLocations();
  const ALL_LOCATIONS = locationsData.map((loc: any) => loc.name);

  const { ALL_CATEGORIES, ALL_SUB_CATEGORIES, ALL_CERT_TYPES } =
    getDerivedLists(products);

  return (
    <main className="min-h-screen flex flex-col">
      <GlobalHeader />
      <ProductsHero />
      <Suspense
        fallback={
          <div className="py-24 text-center text-brand-ash">
            Loading products…
          </div>
        }
      >
        <ProductGrid
          products={products}
          ALL_CATEGORIES={ALL_CATEGORIES}
          ALL_SUB_CATEGORIES={ALL_SUB_CATEGORIES}
          ALL_CERT_TYPES={ALL_CERT_TYPES}
          ALL_LOCATIONS={ALL_LOCATIONS}
        />
      </Suspense>
      <Footer />
    </main>
  );
}
