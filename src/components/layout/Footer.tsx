import { Mail } from "lucide-react";
import { identity, navLinks } from "@/data/content";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 bg-ink-950">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-6 px-5 py-10 md:flex-row md:justify-between md:px-8">
        <div className="text-center md:text-left">
          <p className="font-display text-lg font-semibold text-white">
            {identity.name}
          </p>
          <p className="mt-1 text-sm text-slate-400">{identity.title}</p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded text-sm text-slate-300 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={identity.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-white/15 text-slate-300 transition-colors hover:border-cyan-glow hover:text-cyan-glow"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href={identity.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-white/15 text-slate-300 transition-colors hover:border-cyan-glow hover:text-cyan-glow"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={`mailto:${identity.email}`}
            aria-label="Send email"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-white/15 text-slate-300 transition-colors hover:border-cyan-glow hover:text-cyan-glow"
          >
            <Mail size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="border-t border-white/5 py-5 text-center text-xs text-slate-500">
        © {year} {identity.name} · Built with Next.js
      </div>
    </footer>
  );
}
