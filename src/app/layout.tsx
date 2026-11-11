import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://landometrix.com"),
  title: {
    default: "Landometrix | Data Analytics, Visualization & Web Development",
    template: "%s | Landometrix IT Solutions",
  },
  description:
    "Landometrix turns messy data into clear decisions and builds the web products to deliver them. Kenya-based data analytics, interactive visualization, and custom web development agency.",
  keywords: [
    "data analytics Kenya",
    "business intelligence Nairobi",
    "data visualization agency",
    "custom web development Africa",
    "interactive dashboards",
    "Next.js web applications",
    "predictive modeling Kenya",
  ],
  authors: [{ name: "Landometrix IT Solutions" }],
  creator: "Landometrix",
  publisher: "Landometrix IT Solutions",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.svg", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    title: "Landometrix | Turn Messy Data Into Clear Decisions",
    description:
      "Data analytics, interactive visualization, and modern web products engineered in Kenya for global clients.",
    url: "https://landometrix.com",
    siteName: "Landometrix IT Solutions",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Landometrix - Data Analytics & Web Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Landometrix | Turn Messy Data Into Clear Decisions",
    description:
      "Data analytics, interactive visualization, and modern web products engineered in Kenya for global clients.",
    images: ["/images/og-image.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD Structured Data for Organization and Services (SEO)
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Landometrix IT Solutions",
    url: "https://landometrix.com",
    logo: "https://landometrix.com/logo.svg",
    description:
      "Landometrix turns messy data into clear decisions and builds the web products to deliver them.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nairobi",
      addressCountry: "KE",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "hello@landometrix.com",
      telephone: "+254-725-492920.",
      availableLanguage: ["English", "Swahili"],
    },
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Data Analytics, Visualization & Web Development",
    provider: {
      "@type": "Organization",
      name: "Landometrix IT Solutions",
      url: "https://landometrix.com",
    },
    areaServed: ["Kenya", "East Africa", "Worldwide"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Core Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Data Analytics",
            description: "End-to-end data audit, normalization, and predictive business intelligence modeling.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Data Visualization",
            description: "Bespoke, low-bandwidth interactive dashboards with WCAG 2.1 AA accessibility.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom Web Development",
            description: "High-performance web applications built with Next.js, TypeScript, and edge infrastructure.",
          },
        },
      ],
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Anti-FOUC script for dark mode preference */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('landometrix-theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
        {/* Structured Data Scripts */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased min-h-screen flex flex-col font-[family-name:var(--font-inter)]`}
      >
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
