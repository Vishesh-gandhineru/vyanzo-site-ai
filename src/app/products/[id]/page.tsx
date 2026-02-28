import GlobalHeader from "@/components/GlobalHeader";
import Footer from "@/components/Footer";
// import ProductDetails from "@/components/products/ProductDetails";
import ProductDetails from "@/components/products/ProductDetails";

import { products } from "@/data/products";
import { notFound } from "next/navigation";

export default async function SingleProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = products.find(p => p.id === parseInt(resolvedParams.id));

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen flex flex-col bg-[#f8f9fc]">
      <GlobalHeader />
      <ProductDetails product={product} />
      <Footer />
    </main>
  );
}
