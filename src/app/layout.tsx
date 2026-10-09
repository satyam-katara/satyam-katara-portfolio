import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { identity } from "@/data/content";
import { MotionProvider } from "@/components/layout/MotionProvider";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050816",
  width: "device-width",
  initialScale: 1,
};

const siteName = `${identity.name} — Data Analyst`;
const description =
  "Satyam Katara is a Data Analyst (B.Tech CSE Data Science, 2027) turning raw data into actionable insights — Python, SQL, Power BI dashboards, and fintech analytics projects.";

export const metadata: Metadata = {
  title: {
    default: siteName,
    template: `%s | ${identity.name}`,
  },
  description,
  ...(identity.siteUrl
    ? {
        metadataBase: new URL(identity.siteUrl),
        alternates: { canonical: "/" },
      }
    : {}),
  openGraph: {
    type: "website",
    siteName: identity.name,
    title: siteName,
    description,
    ...(identity.siteUrl ? { url: identity.siteUrl } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description,
  },
  robots: { index: true, follow: true },
};

function personJsonLd() {
  const sameAs = [identity.linkedin, identity.github].filter(Boolean);
  const json: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: identity.name,
    jobTitle: "Data Analyst",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Agra",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Hindustan College of Science and Technology, Mathura",
    },
    sameAs,
  };
  if (identity.siteUrl) json.url = identity.siteUrl;
  return json;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
