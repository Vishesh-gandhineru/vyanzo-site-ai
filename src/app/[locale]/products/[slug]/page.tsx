import GlobalHeader from "@/components/GlobalHeader";
import Footer from "@/components/Footer";
// import ProductDetails from "@/components/products/ProductDetails";
import ProductDetails from "@/components/products/ProductDetails";

import { getProduct, getProducts } from "@/data/products";
import { notFound } from "next/navigation";

export default async function SingleProductPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const allProducts = await getProducts(resolvedParams.locale);

  const similarProducts = allProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  const relatedProducts =
    similarProducts.length >= 3
      ? similarProducts
      : [
          ...similarProducts,
          ...allProducts.filter(
            (p) => p.id !== product.id && p.category !== product.category,
          ),
        ].slice(0, 3);

  return (
    <main className="min-h-screen flex flex-col bg-[#f8f9fc]">
      <GlobalHeader />
      <ProductDetails product={product} relatedProducts={relatedProducts} />
      <Footer />
    </main>
  );
}
