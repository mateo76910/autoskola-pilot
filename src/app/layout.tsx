import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-headline",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const SITE_URL = "https://www.autoskola-pilot.hr";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Pilot Autoškola | Preciznost u pokretu",
    template: "%s | Pilot Autoškola",
  },
  description:
    "Profesionalna autoškola za B, A i C kategorije. Ovlašteni HAK instruktori, moderna vozila, teorijska i praktična nastava te povoljne cijene.",
  keywords: [
    "autoškola",
    "vozački ispit",
    "B kategorija",
    "A kategorija",
    "C kategorija",
    "vožnja",
    "instruktor vožnje",
    "HAK",
    "upis u autoškolu",
    "Pilot Autoškola",
  ],
  authors: [{ name: "Pilot Autoškola" }],
  creator: "Pilot Autoškola",
  publisher: "Pilot Autoškola",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "hr_HR",
    url: SITE_URL,
    siteName: "Pilot Autoškola",
    title: "Pilot Autoškola | Preciznost u pokretu",
    description:
      "Profesionalna autoškola za B, A i C kategorije. Ovlašteni HAK instruktori i moderna vozila.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pilot Autoškola",
    description:
      "Profesionalna autoškola za B, A i C kategorije. Ovlašteni HAK instruktori i moderna vozila.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "DrivingSchool",
    name: "Pilot Autoškola",
    url: SITE_URL,
    description:
      "Profesionalna autoškola za B, A i C kategorije u Hrvatskoj. Ovlašteni HAK instruktori, moderna vozila i povoljne cijene.",
    telephone: "+385 1 234 5678",
    email: "info@autoskola-pilot.hr",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ilica 124",
      addressLocality: "Zagreb",
      postalCode: "10000",
      addressCountry: "HR",
    },
    areaServed: "HR",
  };

  return (
    <html
      lang="hr"
      className={`${jakarta.variable} ${manrope.variable} h-full antialiased`}
    >
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-surface font-body text-on-surface">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
