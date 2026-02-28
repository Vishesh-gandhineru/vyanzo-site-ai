import HeroSection from "@/components/HeroSection";
import MarqueeLogos from "@/components/MarqueeLogos";
import BentoGrid from "@/components/BentoGrid";
import ProductSection from "@/components/ProductSection";
import AboutSection from "@/components/AboutSection";
import EnvironmentSection from "@/components/EnvironmentSection";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <MarqueeLogos />
      <BentoGrid />
      <ProductSection />
      <AboutSection />
      <EnvironmentSection />
      <ServicesSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
