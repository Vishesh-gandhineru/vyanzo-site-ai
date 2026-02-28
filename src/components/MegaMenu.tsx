"use client"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, ArrowUpRight } from "lucide-react";

export default function MegaMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="trigger"
            layoutId="menu-wrapper"
            onClick={() => setIsOpen(true)}
            className="bg-[#0a1f33]/40 backdrop-blur-xl border border-[#b8c6db] shadow-[0_8px_32px_rgba(0,0,0,0.5)] rounded-md px-6 py-3 flex items-center justify-center cursor-pointer hover:bg-[#0a1f33]/60 hover:border-[#ffffff] transition-colors duration-300 z-40"
          >
            <motion.div
              layoutId="menu-header"
              className="flex items-center gap-3 text-text-dark-bg font-sans"
            >
              <span className="text-[11px] font-sans font-medium tracking-widest uppercase">
                Menu
              </span>
              <Plus className="w-[14px] h-[14px] font-light" strokeWidth={1.5} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="overlay"
            layoutId="menu-wrapper"
            className="fixed inset-2 md:inset-4 z-50 bg-[#f8f9fc] rounded-xl text-bg-dark font-sans flex flex-col shadow-2xl overflow-hidden"
          >
            <div className="flex-1 overflow-y-auto p-6 md:p-12 lg:p-16 flex flex-col">
              {/* Mega Menu Header */}
              <motion.div
                layoutId="menu-header"
                className="flex justify-between items-center w-full"
              >
                {/* Logo Dark version for overlay */}
                <div className="cursor-pointer group hover:opacity-80 transition-opacity">
                  <img
                    src="/logo.svg"
                    alt="Hark Capital"
                    className="h-8 md:h-10 w-auto brightness-0"
                  />
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 group hover:opacity-70 transition-opacity"
                >
                  <X className="w-5 h-5 font-light" strokeWidth={1.5} />
                  <span className="text-sm font-sans font-medium tracking-wide">
                    Close
                  </span>
                </button>
              </motion.div>

              {/* Mega Menu Inner Content (Fades in) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="flex flex-col flex-1"
              >
                {/* Mega Menu Links */}
                <nav className="flex flex-col gap-1 mt-12 md:mt-24 flex-1">
                  {[
                    { title: "Home", href: "/" },
                    { title: "Products", href: "/products" },
                    { title: "Services", href: "/#services" },
                    { title: "About Us", href: "/#about" },
                    { title: "Contact", href: "/#contact" },
                  ].map((item) => (
                    <motion.a
                      key={item.title}
                      href={item.href}
                      className="text-[2.5rem] md:text-6xl lg:text-[5rem] font-serif font-semibold tracking-tight text-bg-dark hover:text-brand-primary transition-colors leading-[1.1]"
                      whileHover={{ x: 10 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      {item.title}
                    </motion.a>
                  ))}
                </nav>

                {/* Bottom Utilities Area */}
                <div className="mt-12 w-full flex flex-col gap-6">
                  {/* Small Links row */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-bg-dark/10 pb-4 gap-4">
                    <div className="flex flex-col gap-2 text-sm text-bg-dark/60 font-sans font-medium">
                      <a
                        href="#"
                        className="hover:text-bg-dark transition-colors"
                      >
                        Privacy Policy
                      </a>
                      <a
                        href="#"
                        className="hover:text-bg-dark transition-colors"
                      >
                        Legal Disclosure
                      </a>
                      <a
                        href="#"
                        className="hover:text-bg-dark transition-colors"
                      >
                        Accessibility Statement
                      </a>
                    </div>
                    <div className="text-sm text-bg-dark/60 font-sans font-medium tracking-wide">
                      <a
                        href="#"
                        className="hover:text-bg-dark transition-colors"
                      >
                        LinkedIn
                      </a>
                    </div>
                  </div>

                  {/* Action Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a
                      href="#"
                      className="bg-[#f0f2f5] hover:bg-[#e4e7eb] group p-6 md:p-8 flex justify-between items-end rounded-md transition-colors min-h-[120px]"
                    >
                      <span className="font-sans font-semibold text-lg text-bg-dark">
                        Investor Login
                      </span>
                      <ArrowUpRight
                        className="w-5 h-5 text-bg-dark/60 group-hover:text-bg-dark transition-colors"
                        strokeWidth={1.5}
                      />
                    </a>
                    <a
                      href="#"
                      className="bg-[#f0f2f5] hover:bg-[#e4e7eb] group p-6 md:p-8 flex justify-between items-end rounded-md transition-colors min-h-[120px]"
                    >
                      <span className="font-sans font-semibold text-lg text-bg-dark">
                        Data Room
                      </span>
                      <ArrowUpRight
                        className="w-5 h-5 text-bg-dark/60 group-hover:text-bg-dark transition-colors"
                        strokeWidth={1.5}
                      />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
