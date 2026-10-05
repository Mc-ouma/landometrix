export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  headline: string;
  targetAudience: string;
  deliverables: string[];
  outcomes: string[];
  toolsUsed: string[];
  typicalTimeline: string;
  iconSvg: string;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "analytics",
    slug: "data-analytics",
    title: "Data Analytics",
    headline: "Transform unorganized records into accurate, forward-looking business intelligence.",
    shortDescription:
      "We clean, audit, and analyze your disparate operational data so you make timely, evidence-backed decisions instead of working on guesswork.",
    targetAudience:
      "Mid-sized businesses, startups, and NGOs managing multi-channel operations (sales, logistics, inventory, donor reporting) across spreadsheets and separate software.",
    deliverables: [
      "End-to-end data audit and cleaning pipeline",
      "Predictive trend modeling & demand forecasting",
      "Automated weekly/monthly KPI executive reporting",
      "Customer lifetime value & cohort retention models",
      "Documented data dictionary & data hygiene SOPs",
    ],
    outcomes: [
      "Eliminated 15+ hours/week of manual spreadsheet re-entry",
      "Rapid anomaly and leakage detection in under 48 hours",
      "99.4% data consistency across core operational reporting",
    ],
    toolsUsed: ["Python", "SQL / PostgreSQL", "Pandas", "DuckDB", "R"],
    typicalTimeline: "3 to 6 weeks",
    iconSvg: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  },
  {
    id: "visualization",
    slug: "data-visualization",
    title: "Data Visualization",
    headline: "Custom interactive dashboards engineered for clarity, speed, and mobile responsiveness.",
    shortDescription:
      "We design purpose-built visual dashboards that communicate complex metrics instantly, loading effortlessly even on low-bandwidth mobile connections.",
    targetAudience:
      "Founders, executive boards, operational managers, and field staff who need immediate visual answers without wading through rows of raw numbers.",
    deliverables: [
      "Custom interactive dashboard with role-based access",
      "Bespoke chart libraries tailored to your business model",
      "Mobile-optimized progressive web view for field personnel",
      "Automated PDF executive digest generation",
      "Accessible charts with WCAG 2.1 AA screen-reader tables",
    ],
    outcomes: [
      "Dashboard load times dropped from 8.2s to 450ms",
      "100% executive adoption within the first 14 days",
      "Immediate clarity on regional performance and supply bottlenecks",
    ],
    toolsUsed: ["D3.js", "Observable Plot", "React / Next.js", "Tailwind CSS", "SVG"],
    typicalTimeline: "2 to 4 weeks",
    iconSvg: "M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z",
  },
  {
    id: "web-development",
    slug: "web-development",
    title: "Custom Web Development",
    headline: "Fast, reliable web applications designed to deliver your data and power your operations.",
    shortDescription:
      "From client portals and data collection tools to conversion-optimized company platforms, we engineer modern web products with zero bloat.",
    targetAudience:
      "Agencies, B2B companies, and NGOs needing bespoke web platforms that load instantly across Africa and globally, without ongoing plugin maintenance nightmares.",
    deliverables: [
      "Custom Next.js / TypeScript web application",
      "Integrated database (PostgreSQL / Supabase / Cloudflare D1)",
      "Secure user authentication and permission tiers",
      "Custom REST or GraphQL API endpoints",
      "Automated CI/CD pipeline, SSL, and edge CDN hosting",
    ],
    outcomes: [
      "Lighthouse 95+ score across Performance, A11y, and SEO",
      "Sub-second page loads on 3G/4G networks",
      "Scalable infrastructure with zero server maintenance costs",
    ],
    toolsUsed: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Cloudflare Pages"],
    typicalTimeline: "4 to 8 weeks",
    iconSvg: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
  },
];
