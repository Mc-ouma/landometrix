import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import CookieConsent from "@/components/ui/CookieConsent";
import Analytics from "@/components/utils/Analytics";
import AccessibilityEnhancer from "@/components/utils/AccessibilityEnhancer";
import ClientThemeWrapper from "@/components/utils/ClientThemeWrapper";
import CursorEffect from "@/components/ui/CursorEffect";
import { defaultMetadata, generateOrganizationSchema, generateServiceSchema } from "@/lib/metadata";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  ...defaultMetadata,
  icons: {
    icon: [
      { url: '/favicon.svg' }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = generateOrganizationSchema();
  const serviceSchema = generateServiceSchema();

  return (
    <html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceSchema),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col transition-colors duration-200`}
        suppressHydrationWarning
      >
        <ClientThemeWrapper>
          <Analytics />
          <AccessibilityEnhancer />
          <Header />
          <main className="flex-grow pt-24">
            {children}
          </main>
          <Footer />
          <ScrollToTop />
          <CookieConsent />
          <CursorEffect color="rgba(37, 99, 235, 0.5)" trailColor="rgba(59, 130, 246, 0.2)" />
        </ClientThemeWrapper>
      </body>
    </html>
  );
}
