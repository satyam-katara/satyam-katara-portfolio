"use client";

import { useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Send, TriangleAlert } from "lucide-react";
import { contactSchema, type ContactFormValues } from "@/lib/validation";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "success" | "error";

/** Contact form — only rendered when the Resend backend is configured. */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(
      contactSchema,
    ) as unknown as Resolver<ContactFormValues>,
    defaultValues: { name: "", email: "", message: "", website: "" },
  });

  async function onSubmit(values: ContactFormValues) {
    setStatus("sending");
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "Something went wrong.");
      }
      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setServerError(
        err instanceof Error ? err.message : "Something went wrong.",
      );
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="glass flex flex-col items-center gap-3 rounded-2xl p-10 text-center"
      >
        <CheckCircle2 size={40} aria-hidden="true" className="text-emerald-300" />
        <h3 className="font-display text-xl font-semibold text-white">
          Message sent!
        </h3>
        <p className="max-w-sm text-sm text-slate-300">
          Thanks for reaching out — I&apos;ll get back to you as soon as I can.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 inline-flex min-h-[44px] items-center rounded-full border border-white/15 px-5 text-sm font-medium text-white hover:bg-white/10"
        >
          Send another message
        </button>
      </div>
    );
  }

  const inputClass = (hasError: boolean) =>
    cn(
      "min-h-[44px] w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 transition-colors focus:border-cyan-glow/60 focus:outline-none",
      hasError ? "border-red-400/60" : "border-white/15",
    );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="glass space-y-5 rounded-2xl p-6 md:p-8"
      aria-label="Contact form"
    >
      <div>
        <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-white">
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          className={inputClass(!!errors.name)}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          {...register("name")}
        />
        {errors.name && (
          <p id="contact-name-error" role="alert" className="mt-1.5 text-xs text-red-300">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-white">
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          className={inputClass(!!errors.email)}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          {...register("email")}
        />
        {errors.email && (
          <p id="contact-email-error" role="alert" className="mt-1.5 text-xs text-red-300">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-white">
          Message
        </label>
        <textarea
          id="contact-message"
          rows={5}
          placeholder="Tell me about your data challenge…"
          className={cn(inputClass(!!errors.message), "min-h-[120px] resize-y")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          {...register("message")}
        />
        {errors.message && (
          <p id="contact-message-error" role="alert" className="mt-1.5 text-xs text-red-300">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Honeypot — invisible to humans, catches bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-0 overflow-hidden">
        <label>
          Website
          <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>

      {status === "error" && (
        <p role="alert" className="flex items-start gap-2 text-sm text-red-300">
          <TriangleAlert size={16} aria-hidden="true" className="mt-0.5 shrink-0" />
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-electric-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-electric-600 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? (
          <>
            <Loader2 size={16} aria-hidden="true" className="animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send size={16} aria-hidden="true" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
