import { contactCopy, identity } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactIntro } from "./ContactIntro";
import { ContactForm } from "./ContactForm";

/**
 * Contact section (server component). Renders the real form only when the
 * Resend backend is configured; otherwise degrades to mailto + copy-email
 * so there is never a fake, non-functional form.
 */
export function ContactSection() {
  const formConfigured = Boolean(
    process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL,
  );

  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative py-24 md:py-32">
      <div
        aria-hidden="true"
        className="glow-cyan absolute bottom-0 left-1/2 h-[380px] w-[680px] -translate-x-1/2"
      />
      <div className="relative mx-auto max-w-[1200px] px-5 md:px-8">
        <SectionHeading
          id="contact-heading"
          eyebrow="Contact"
          title={contactCopy.heading}
          align="center"
        />

        <ContactIntro />

        <div className="mx-auto mt-10 max-w-2xl">
          {formConfigured ? (
            <ContactForm />
          ) : (
            <p className="glass rounded-2xl p-6 text-center text-sm text-slate-300">
              Prefer writing directly? Email me at{" "}
              <a
                href={`mailto:${identity.email}`}
                className="font-medium text-cyan-glow hover:text-white"
              >
                {identity.email}
              </a>{" "}
              — I read everything.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
