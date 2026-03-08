import { Suspense } from "react";
import GlobalHeader from "@/components/GlobalHeader";
import ProductsHero from "@/components/products/ProductsHero";
import ProductGrid from "@/components/products/ProductGrid";
import Footer from "@/components/Footer";

export default function ProductsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <GlobalHeader />
      <ProductsHero />
      <Suspense fallback={<div className="py-24 text-center text-brand-ash">Loading products…</div>}>
        <ProductGrid />
      </Suspense>
      <Footer />
    </main>
  );
}
