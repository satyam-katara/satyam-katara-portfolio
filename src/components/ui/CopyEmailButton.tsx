"use client";

import { useState } from "react";
import { Check, Copy, Mail } from "lucide-react";
import { identity } from "@/data/content";

interface CopyEmailButtonProps {
  variant?: "primary" | "ghost";
}

/**
 * Copies the email address to the clipboard with a success toast and an
 * aria-live announcement. Falls back gracefully if clipboard is unavailable.
 */
export function CopyEmailButton({ variant = "primary" }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(identity.email);
    } catch {
      // Clipboard API unavailable (permissions / insecure context).
      // Still show the address so the user can copy it manually.
      window.prompt("Copy your email address:", identity.email);
      return;
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  }

  return (
    <div className="relative inline-flex">
      <button
        type="button"
        onClick={handleCopy}
        aria-label={`Copy email address ${identity.email}`}
        className={
          variant === "primary"
            ? "inline-flex min-h-[44px] items-center gap-2 rounded-full bg-electric-500 px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03] hover:bg-electric-600 active:scale-[0.98]"
            : "inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
        }
      >
        {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
        {copied ? "Copied!" : "Copy Email"}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? "Email address copied to clipboard." : ""}
      </span>
      {copied && (
        <span
          role="status"
          className="glass absolute -top-11 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs text-white"
        >
          <Mail size={12} className="mr-1 inline" aria-hidden="true" />
          {identity.email}
        </span>
      )}
    </div>
  );
}
