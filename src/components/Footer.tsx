"use client";

import Link from "next/link";
import { Linkedin, Phone } from "lucide-react"; // Using Phone or MessageCircle as WhatsApp replacement since lucide doesn't have a specific whatsapp icon by default. Let's use a generic MessageCircle or an SVG if needed.

// We will use standard Svgs or Lucide icons for social.
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full pt-12 pb-12 px-4 md:px-8 font-sans">
      <div className="max-w-[1400px] mx-auto bg-brand-primary rounded-4xl p-8 md:p-12 lg:p-16 flex flex-col md:flex-row justify-between relative overflow-hidden">
        
        {/* Left Section: Logo */}
        <div className="shrink-0 mb-12 md:mb-0">
          {/* Logo with brightness-0 to make it black/dark */}
          <Link href="/" className="block">
            <img 
              src="/logo.svg" 
              alt="Vyanzo Quality Castings" 
              className="h-10 md:h-12 w-auto brightness-0" 
            />
          </Link>
        </div>

        {/* Middle Section: Links Grid */}
        <div className="grow flex flex-col md:flex-row md:justify-center gap-12 md:gap-24 lg:gap-32 mb-16 md:mb-0">
          
          {/* Column 1 */}
          <div className="flex flex-col gap-4">
            <Link href="/about" className="text-bg-dark font-sans font-bold text-lg hover:opacity-70 transition-opacity">
              About
            </Link>
            <Link href="/products" className="text-bg-dark font-sans font-bold text-lg hover:opacity-70 transition-opacity whitespace-nowrap">
              Products
            </Link>
            
            {/* Social Icons positioned below first column */}
            <div className="flex items-center gap-3 mt-8">
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-bg-dark flex items-center justify-center text-white hover:opacity-80 transition-opacity"
              >
                <Linkedin className="w-5 h-5" fill="currentColor" strokeWidth={0} />
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-bg-dark flex items-center justify-center text-white hover:opacity-80 transition-opacity"
              >
                <WhatsAppIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-4">
            <Link href="/about/#team" className="text-bg-dark font-sans font-bold text-lg hover:opacity-70 transition-opacity">
              Team
            </Link>
            <Link href="/contact" className="text-bg-dark font-sans font-bold text-lg hover:opacity-70 transition-opacity">
              Contact
            </Link>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-4">
            <Link href="/services" className="text-bg-dark font-sans font-bold text-lg hover:opacity-70 transition-opacity">
              Services
            </Link>

          </div>

        </div>

        {/* Bottom Right Copyright */}
        <div className="absolute bottom-8 right-8 md:bottom-12 md:right-16">
          <p className="text-bg-dark font-sans font-medium text-sm md:text-base">
            Copyright @Vyanzo {currentYear}
          </p>
        </div>

      </div>
    </footer>
  );
}
