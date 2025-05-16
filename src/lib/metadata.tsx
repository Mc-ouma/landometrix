import type { Metadata } from 'next';

type Props = {
  params: { id: string };
};

// Default metadata for the site
export const defaultMetadata = {
  title: 'Landometrix | Data Analysis & Web Services',
  description: 'Professional data analysis and web services for businesses. Transform your data into actionable insights with Landometrix.',
  keywords: ['data analysis', 'web services', 'business intelligence', 'data visualization', 'web development'],
  authors: [{ name: 'Landometrix Team' }],
  creator: 'Landometrix',
  publisher: 'Landometrix',
  metadataBase: new URL('https://landometrix.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Landometrix | Data Analysis & Web Services',
    description: 'Professional data analysis and web services. Transform your data into actionable insights.',
    url: 'https://landometrix.com',
    siteName: 'Landometrix',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://landometrix.com/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Landometrix - Data Analysis & Web Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Landometrix | Data Analysis & Web Services',
    description: 'Professional data analysis and web services. Transform your data into actionable insights.',
    creator: '@landometrix',
    images: ['https://landometrix.com/images/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Helper function to generate page metadata
export function generateMetadata({ title, description, path = '/' }: { 
  title: string; 
  description: string; 
  path?: string;
}): Metadata {
  const fullTitle = title !== defaultMetadata.title ? `${title} | Landometrix` : title;
  
  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      ...defaultMetadata.openGraph,
      title: fullTitle,
      description,
      url: `https://landometrix.com${path}`,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: fullTitle,
      description,
    },
  };
}

// Generate JSON-LD Structured Data for organization
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Landometrix',
    url: 'https://landometrix.com',
    logo: 'https://landometrix.com/images/logo.png',
    sameAs: [
      'https://twitter.com/landometrix',
      'https://www.facebook.com/landometrix',
      'https://www.linkedin.com/company/landometrix',
      'https://www.instagram.com/landometrix',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-555-123-4567',
      contactType: 'customer service',
      email: 'info@landometrix.com',
      areaServed: 'Worldwide',
      availableLanguage: 'English',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Business Avenue',
      addressLocality: 'Tech City',
      addressRegion: 'CA',
      postalCode: '90210',
      addressCountry: 'US',
    },
  };
}

// Generate JSON-LD Structured Data for services
export function generateServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Data Analysis & Web Services',
    provider: {
      '@type': 'Organization',
      name: 'Landometrix',
      url: 'https://landometrix.com',
    },
    description: 'Professional data analysis and web development services for businesses of all sizes.',
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Landometrix Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Data Analysis',
            description: 'Turn your raw data into actionable insights with our comprehensive data analysis services.',
            url: 'https://landometrix.com/services#data-analysis',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Data Visualization',
            description: 'Present your data in clear, compelling visualizations that communicate insights effectively.',
            url: 'https://landometrix.com/services#data-visualization',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Web Development',
            description: 'Custom web applications and websites designed to showcase your brand and engage your audience.',
            url: 'https://landometrix.com/services#web-development',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Consulting',
            description: 'Expert advice on data strategy, web presence, and digital transformation for your business.',
            url: 'https://landometrix.com/services#consulting',
          },
        },
      ],
    },
  };
}

export default function Metadata() {
  return null; // This is just a utility component, not meant to be rendered
}
