import HeroSection from "@/components/HeroSection";
import MarqueeLogos from "@/components/MarqueeLogos";
import BentoGrid from "@/components/BentoGrid";
import ProductSection from "@/components/ProductSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <MarqueeLogos />
      <BentoGrid />
      <ProductSection />
    </main>
  );
}
