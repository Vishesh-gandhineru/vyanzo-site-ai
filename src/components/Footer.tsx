"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Linkedin, ChevronUp } from "lucide-react";

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
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
          {/* Social Icons positioned below first column */}
          <div className="flex items-center gap-3 mt-8">
            <a
              href="https://www.linkedin.com/company/vyanzo-castings/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-bg-dark flex items-center justify-center text-white hover:opacity-80 transition-opacity"
            >
              <Linkedin
                className="w-5 h-5"
                fill="currentColor"
                strokeWidth={0}
              />
            </a>
          </div>
        </div>

        {/* Middle Section: Links Grid */}
        <div className="grow flex flex-col md:flex-row md:justify-center gap-4 md:gap-24 lg:gap-32 mb-16 md:mb-0">
          {/* Column 1 */}
          <div className="flex flex-col gap-4">
            <Link
              href="/products"
              className="text-bg-dark font-sans font-bold text-lg hover:opacity-70 transition-opacity whitespace-nowrap"
            >
              Products
            </Link>

            <Link
              href="/services"
              className="text-bg-dark font-sans font-bold text-lg hover:opacity-70 transition-opacity"
            >
              Services
            </Link>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-4">
            <Link
              href="/about"
              className="text-bg-dark font-sans font-bold text-lg hover:opacity-70 transition-opacity"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-bg-dark font-sans font-bold text-lg hover:opacity-70 transition-opacity"
            >
              Contact Us
            </Link>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-4">
            <Link
              href="/about/#team"
              className="text-bg-dark font-sans font-bold text-lg hover:opacity-70 transition-opacity"
            >
              Our Team
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

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 flex flex-col items-center gap-4 z-9999">
        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className={`w-12 h-12 bg-brand-primary text-white rounded-full flex items-center justify-center shadow-lg border border-black/10 transition-all duration-300 ${
            showScroll
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10 pointer-events-none"
          } hover:-translate-y-1 hover:bg-black`}
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6" />
        </button>

        {/* WhatsApp Button */}
        <a
          href="https://wa.link/yemzpo"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 text-white rounded-full flex items-center justify-center shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(37,211,102,0.5)] transition-all duration-300 relative overflow-hidden group"
          aria-label="Contact on WhatsApp"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-label="WhatsApp"
            role="img"
            viewBox="0 0 512 512"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <rect width="512" height="512" rx="15%" fill="#25d366"></rect>
              <path
                fill="#25d366"
                stroke="#ffffff"
                strokeWidth="26"
                d="M123 393l14-65a138 138 0 1150 47z"
              ></path>
              <path
                fill="#ffffff"
                d="M308 273c-3-2-6-3-9 1l-12 16c-3 2-5 3-9 1-15-8-36-17-54-47-1-4 1-6 3-8l9-14c2-2 1-4 0-6l-12-29c-3-8-6-7-9-7h-8c-2 0-6 1-10 5-22 22-13 53 3 73 3 4 23 40 66 59 32 14 39 12 48 10 11-1 22-10 27-19 1-3 6-16 2-18"
              ></path>
            </g>
          </svg>
        </a>
      </div>
    </footer>
  );
}
