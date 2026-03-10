"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ChevronDown } from "lucide-react";
import { useRouter, usePathname } from "@/i18n/routing";
import { useLocale } from "next-intl";

const languages = [
  { code: "en", label: "English" },
  { code: "fr", label: "French" },
  { code: "nl", label: "Dutch" },
  { code: "sv", label: "Swedish" },
  { code: "da", label: "Danish" },
];

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const currentLang = useLocale();

  const handleLanguageChange = (langCode: string) => {
    setIsOpen(false);

    // next-intl routing keeps the current pathname but changes the locale
    router.replace(pathname, { locale: langCode });
  };

  const activeLanguage =
    languages.find((l) => l.code === currentLang) || languages[0];

  return (
    <div className="relative z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#0a1f33]/40 backdrop-blur-xl border border-[#b8c6db] shadow-[0_8px_32px_rgba(0,0,0,0.5)] rounded-md px-3 md:px-4 py-2.5 md:py-3 flex items-center justify-between gap-1 md:gap-2 cursor-pointer hover:bg-[#0a1f33]/60 hover:border-[#ffffff] transition-colors duration-300 min-w-fit md:min-w-[120px]"
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
  );
}
