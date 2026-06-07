"use client";

import { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "სერვისები", href: "#features" },
  { label: "პროცესი", href: "#timeline" },
  { label: "ფასები", href: "#pricing" },
  { label: "კითხვები", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    handler();

    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed left-0 right-0 top-0 z-[9999] transition-all duration-500"
      style={{
        background: scrolled ? "rgba(5,5,10,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="#" className="group flex items-center gap-2.5">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg transition-opacity group-hover:opacity-80"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
            }}
          >
            <Sparkles size={15} className="text-white" />
          </div>

          <span
            className="text-[17px] font-bold tracking-tight text-white"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Giorgi.dev
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white/50 transition-colors duration-200 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="tel:+995555137003"
            className="px-4 py-2 text-sm text-white/50 transition-colors hover:text-white"
          >
            +995 555 137 003
          </a>

          <Button variant="brand" size="sm" asChild>
            <a href="#contact">დამიკავშირდი</a>
          </Button>
        </div>

        <button
          type="button"
          className="text-white/70 transition-colors hover:text-white md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-3 border-t border-white/5 px-6 py-4 md:hidden"
            style={{
              background: "rgba(5,5,10,0.97)",
              backdropFilter: "blur(20px)",
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block py-1.5 text-sm text-white/60 transition-colors hover:text-white"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}

            <a href="tel:+995555137003" className="block py-1.5 text-sm text-white/60">
              +995 555 137 003
            </a>

            <Button variant="brand" className="mt-2 w-full" asChild>
              <a href="#contact">დამიკავშირდი</a>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}