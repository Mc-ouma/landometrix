import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ClientThemeWrapper from "@/components/utils/ClientThemeWrapper";
import DynamicComponents from "@/components/utils/DynamicComponents";
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
  // Generate these once to improve performance
  const organizationSchema = generateOrganizationSchema();
  const serviceSchema = generateServiceSchema();

  return (
    <html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
      <head>
        {/* Preloading critical resources */}
        <link rel="preload" href="/fonts/geist-sans-variable.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preloading critical images */}
        <link rel="preload" as="image" href="/images/og-image.svg" />
        
        {/* Performance-optimized structured data */}
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
        
        {/* Resource hints for faster page navigation */}
        <link rel="prefetch" href="/services" />
        <link rel="prefetch" href="/about" />
        
        {/* Core inline CSS for better FCP */}
        <style dangerouslySetInnerHTML={{
          __html: `
            :root { scroll-behavior: smooth; }
            body { opacity: 0; animation: fade-in 0.2s forwards; }
            @keyframes fade-in { to { opacity: 1; } }
          `
        }} />
        
        {/* Disable unnecessary requests */}
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col transition-colors duration-200`}
        suppressHydrationWarning
      >
        <ClientThemeWrapper>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <div className="mt-12 pt-4 relative z-10"> {/* Enhanced spacing container with z-index */}
            <Footer />
          </div>
          <DynamicComponents />
        </ClientThemeWrapper>
      </body>
    </html>
  );
}
