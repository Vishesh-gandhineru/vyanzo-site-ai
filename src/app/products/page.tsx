import GlobalHeader from "@/components/GlobalHeader";
import ProductsHero from "@/components/products/ProductsHero";
import ProductGrid from "@/components/products/ProductGrid";
import Footer from "@/components/Footer";

export default function ProductsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <GlobalHeader />
      <ProductsHero />
      <ProductGrid />
      <Footer />
    </main>
  );
}
