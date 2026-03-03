import GlobalHeader from "@/components/GlobalHeader";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";


export default function ContactPage() {
  

  return (
    <main className="min-h-screen bg-[#f8f9fc] font-sans flex flex-col">
      <GlobalHeader />

      {/* Hero / Header Space for the contact page */}

      <section className="w-full bg-bg-dark text-white py-24 px-4 md:px-8 font-sans relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-3xl -mr-[200px] -mt-[200px] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl">
                <div className="flex items-center gap-3 text-brand-primary text-sm font-sans font-bold tracking-widest uppercase mb-6">
                   <span className="w-1.5 h-1.5 rounded-full bg-brand-primary"></span>
                   Get in Touch
                </div>
                <h1 className="text-hero-inner font-serif font-bold tracking-tight mb-6 leading-[1.2]">
                    Get in Touch
                </h1>
                 <p className="text-brand-ash/80 text-lg md:text-xl font-sans font-normal max-w-2xl leading-relaxed">
                We are happy to help you with questions about our products or to book a consultation. Please get in touch and we will get back to you as soon as we can.
                </p>
            </div>
            
            
        </div>
      </div>
    </section>

      {/* Reusing existing ContactSection but without its own top-padding if it looks wrong, but ContactSection has py-24 so it will flow naturally */}
      <div  className="py-24 px-6 md:px-12 lg:px-16 bg-white relative -mt-12 rounded-t-[3rem] z-20 shadow-[0_-20px_40px_rgba(0,0,0,0.05)] border-t border-brand-ash/10">
      <ContactSection />
      </div>

      <Footer />
    </main>
  );
}
