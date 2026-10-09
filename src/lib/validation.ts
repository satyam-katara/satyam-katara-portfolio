import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Please enter your name (at least 2 characters).")
    .max(80, "Name is too long."),
  email: z.string().email("Please enter a valid email address.").max(120),
  message: z
    .string()
    .min(10, "Please write a message of at least 10 characters.")
    .max(2000, "Message is too long (max 2000 characters)."),
  /** Honeypot — must stay empty. Bots fill it; humans never see it.
   *  A filled value is silently accepted but never emailed (see /api/contact). */
  website: z.string().optional().default(""),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
