"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download, Menu } from "lucide-react";
import { identity, navLinks } from "@/data/content";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";

/**
 * Sticky nav: transparent at top, blurred glass after ~24px scroll.
 * Active section gets an animated underline (layoutId).
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-300",
          scrolled
            ? "border-b border-white/10 bg-ink-950/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 md:px-8"
        >
          <a
            href="#home"
            aria-label={`${identity.name} — home`}
            className="flex min-h-[44px] min-w-[44px] items-center gap-2.5"
          >
            <span
              aria-hidden="true"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-electric-500 to-cyan-glow font-display text-sm font-bold text-white"
            >
              {identity.monogram}
            </span>
            <span className="hidden font-display text-base font-semibold text-white sm:inline">
              {identity.name}
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive = active === link.href;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative rounded-md px-3.5 py-2.5 text-sm font-medium transition-colors",
                      isActive ? "text-white" : "text-slate-300 hover:text-white",
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-cyan-glow"
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={identity.resumePath}
              download
              className="hidden min-h-[44px] items-center gap-2 rounded-full bg-electric-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-electric-600 md:inline-flex"
            >
              <Download size={15} aria-hidden="true" />
              Resume
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-white/15 text-white md:hidden"
            >
              <Menu size={20} aria-hidden="true" />
            </button>
          </div>
        </nav>
      </motion.header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
