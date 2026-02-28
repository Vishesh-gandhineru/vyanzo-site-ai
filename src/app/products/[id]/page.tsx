import GlobalHeader from "@/components/GlobalHeader";
import Footer from "@/components/Footer";
import ProductDetails from "@/components/products/ProductDetails";

// In a real app, this would receive params
export default function SingleProductPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#f8f9fc]">
      <GlobalHeader />
      <ProductDetails />
      <Footer />
    </main>
  );
}
