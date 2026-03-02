"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ChevronDown } from "lucide-react";

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

const languages = [
  { code: "en", label: "English" },
  { code: "nl", label: "Nederlands" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "sv", label: "Svenska" },
  { code: "da", label: "Dansk" },
];

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");

  useEffect(() => {
    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    // Only inject script if it doesn't exist
    if (!document.querySelector('script[src*="translate.google.com"]')) {
      const script = document.createElement("script");
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }

    // Read language from googtrans cookie if present
    const match = document.cookie.match(/(^|;) ?googtrans=([^;]*)(;|$)/);
    if (match) {
      const selectedLang = match[2].split("/")[2];
      if (selectedLang) {
        setCurrentLang(selectedLang);
      }
    }
  }, []);

  const handleLanguageChange = (langCode: string) => {
    setIsOpen(false);
    
    // Update cookies for both root and specific domain
    document.cookie = `googtrans=/en/${langCode}; path=/`;
    document.cookie = `googtrans=/en/${langCode}; domain=${window.location.hostname}; path=/`;

    setCurrentLang(langCode);
    
    // Force a reload so Google Translate automatically picks up the new cookie
    window.location.reload();
  };

  const activeLanguage = languages.find((l) => l.code === currentLang) || languages[0];

  return (
    <>
      <div id="google_translate_element" className="hidden"></div>
      <div className="relative z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-[#0a1f33]/40 backdrop-blur-xl border border-[#b8c6db] shadow-[0_8px_32px_rgba(0,0,0,0.5)] rounded-md px-4 py-3 flex items-center justify-between gap-2 cursor-pointer hover:bg-[#0a1f33]/60 hover:border-[#ffffff] transition-colors duration-300 min-w-[120px]"
        >
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-white" />
            <span className="text-[11px] font-sans font-medium tracking-widest uppercase text-text-dark-bg">
              {activeLanguage.code}
            </span>
          </div>
          <ChevronDown 
            className={`w-4 h-4 text-white transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} 
          />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full right-0 mt-2 bg-[#f8f9fc] border border-brand-ash/20 rounded-xl shadow-2xl p-2 w-[160px] flex flex-col gap-1 overflow-hidden"
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`text-left px-4 py-2 rounded-lg text-sm font-sans font-medium transition-colors ${
                    currentLang === lang.code 
                      ? "bg-brand-primary text-bg-dark" 
                      : "text-bg-dark hover:bg-brand-ash/10"
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
