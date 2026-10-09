"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { identity, navLinks } from "@/data/content";

/**
 * Accessible mobile menu: full-screen overlay with focus trap,
 * Esc to close, body scroll lock, closes on link click.
 */
export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus();
    document.body.style.overflow = "hidden";

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 bg-ink-950/95 backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div
            ref={panelRef}
            className="flex h-full flex-col items-center justify-center gap-2 px-8"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="absolute right-5 top-5 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-white/15 text-white"
            >
              <X size={22} aria-hidden="true" />
            </button>
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                ref={i === 0 ? firstLinkRef : undefined}
                href={link.href}
                onClick={onClose}
                className="rounded-lg px-4 py-3 font-display text-3xl font-semibold text-white transition-colors hover:text-cyan-glow"
              >
                {link.label}
              </a>
            ))}
            <a
              href={identity.resumePath}
              download
              onClick={onClose}
              className="mt-6 inline-flex min-h-[44px] items-center rounded-full bg-electric-500 px-8 py-3 text-base font-semibold text-white"
            >
              Resume
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
