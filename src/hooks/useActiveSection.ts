"use client";

import { useEffect, useState } from "react";
import { navLinks } from "@/data/content";

/**
 * Tracks which section is currently in view for the nav active indicator.
 * Uses IntersectionObserver with a root margin that favors the section
 * occupying the middle of the viewport.
 */
export function useActiveSection(): string {
  const [active, setActive] = useState<string>("#home");

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    const elements: Element[] = [];
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        elements.push(el);
      }
    }
    return () => {
      for (const el of elements) observer.unobserve(el);
      observer.disconnect();
    };
  }, []);

  return active;
}
