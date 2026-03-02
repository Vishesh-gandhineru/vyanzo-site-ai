import GlobalHeader from "@/components/GlobalHeader";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";


export default function ContactPage() {
  

  return (
    <main className="min-h-screen bg-[#f8f9fc] font-sans flex flex-col">
      <GlobalHeader />

      {/* Hero / Header Space for the contact page */}
      <section className="relative pt-32 pb-12 px-6 md:px-12 lg:px-16 overflow-hidden bg-white">
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div>
            <h1 className="text-sm font-serif font-semibold tracking-[0.2em] text-brand-primary uppercase mb-6 flex items-center gap-4">
              <span className="w-12 h-px bg-brand-primary"></span>
              {"heroPreTitle"}
            </h1>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-bg-dark leading-[1.1] mb-6 tracking-tight">
              {"heroTitle"}
            </h2>
          </div>
        </div>
      </section>

      {/* Reusing existing ContactSection but without its own top-padding if it looks wrong, but ContactSection has py-24 so it will flow naturally */}
      <ContactSection />

      <Footer />
    </main>
  );
}
