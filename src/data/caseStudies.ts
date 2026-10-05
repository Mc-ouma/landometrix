export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  clientPlaceholder: string;
  category: "Data Analytics" | "Data Visualization" | "Web Development";
  tagline: string;
  overview: string;
  problem: string;
  approach: string;
  result: string;
  metrics: { label: string; value: string; detail: string }[];
  toolsUsed: string[];
  featured: boolean;
  publishedDate: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "east-africa-agritech-yield-optimization",
    title: "Regional Produce Tracking & Yield Forecasting System",
    client: "KilimoTrack [REPLACE: Client Name - East Africa AgriTech Platform]",
    clientPlaceholder: "[REPLACE: Client Name - East Africa AgriTech Platform]",
    category: "Data Analytics",
    tagline: "Connecting 4,200 smallholder farms to regional markets with predictive dispatch.",
    overview:
      "A fast-growing East African agricultural logistics firm was struggling with high post-harvest loss rates due to siloed WhatsApp spreadsheets and delayed warehouse dispatch reports.",
    problem:
      "Field agronomists in Eldoret and Nakuru logged harvest yields into disparate offline spreadsheets. Operations managers in Nairobi received numbers 3–5 days late, leading to spoilage, over-committed contracts, and unpredictable delivery schedules.",
    approach:
      "Landometrix designed an automated data ingestion pipeline using PostgreSQL and Python. We normalized disparate harvest formats into a centralized data warehouse and deployed a lightweight forecasting model predicting dispatch volumes 72 hours in advance.",
    result:
      "Eliminated manual spreadsheet reconciliation entirely. Warehouse dispatchers gained real-time visibility, reducing perishables wastage by 38% within the first 90 days.",
    metrics: [
      { label: "Wastage Reduction", value: "38%", detail: "From harvest to cold storage transit" },
      { label: "Reporting Delay", value: "48h → 5min", detail: "Near real-time dispatch updates" },
      { label: "Active Farms", value: "4,200+", detail: "Tracked across Western and Central Kenya" },
    ],
    toolsUsed: ["PostgreSQL", "Python", "DuckDB", "Next.js", "Tailwind CSS"],
    featured: true,
    publishedDate: "January 2026",
  },
  {
    slug: "pan-african-fintech-transaction-monitor",
    title: "High-Frequency Transaction Health & Anomaly Dashboard",
    client: "NuruPay [REPLACE: Client Name - Pan-African Payment Provider]",
    clientPlaceholder: "[REPLACE: Client Name - Pan-African Payment Provider]",
    category: "Data Visualization",
    tagline: "Sub-second visual monitoring for cross-border mobile money flows.",
    overview:
      "A payment service provider processing over $12M monthly across Kenya, Uganda, and Rwanda needed an intuitive, real-time command center for their engineering and compliance teams.",
    problem:
      "Existing BI tools were slow, memory-intensive, and crashed on mobile devices. When mobile money gateway timeouts occurred, support engineers took up to 45 minutes to pinpoint which telecom route had degraded.",
    approach:
      "We built a bespoke, hardware-accelerated SVG dashboard powered by D3.js and WebSockets. The UI visualizes transaction latency, approval rates, and route error anomalies with instant color-coded status badges, optimized to load under 1 second even on 3G connections.",
    result:
      "Mean time to resolution (MTTR) on gateway outages dropped from 45 minutes to under 3 minutes. The executive team now tracks revenue flow during all peak transaction windows directly from mobile phones.",
    metrics: [
      { label: "Outage MTTR", value: "45m → 3m", detail: "Faster telecom routing diagnosis" },
      { label: "Dashboard Payload", value: "85 KB", detail: "Gzip compressed visual island" },
      { label: "Monthly Volume", value: "$12M+", detail: "Real-time monitored transaction flow" },
    ],
    toolsUsed: ["D3.js", "Next.js App Router", "TypeScript", "Tailwind CSS", "WebSockets"],
    featured: true,
    publishedDate: "February 2026",
  },
  {
    slug: "healthcare-ngo-donor-impact-portal",
    title: "Public Health Impact Data Portal & Automated Donor Reporting",
    client: "AfyaTrust [REPLACE: Client Name - Health Equity NGO]",
    clientPlaceholder: "[REPLACE: Client Name - Health Equity NGO]",
    category: "Web Development",
    tagline: "Replacing a 60-page static PDF report with an interactive, verified impact portal.",
    overview:
      "A non-governmental organization operating maternal health clinics across informal settlements in Nairobi needed a transparent, modern web product to communicate verified patient outcomes to international funding agencies.",
    problem:
      "Quarterly donor reporting required 3 weeks of manual data compilation by program directors. Donors complained that 60-page PDF attachments were difficult to verify and gave no longitudinal perspective on health interventions.",
    approach:
      "Landometrix developed a custom web application featuring interactive clinic catchment maps, patient intervention metrics, and automated one-click PDF board summary generators, backed by robust data validation and strict patient privacy rules.",
    result:
      "Quarterly reporting time plummeted from 3 weeks to 2 hours. Two major institutional grantors renewed funding ahead of schedule, citing exceptional transparency and real-time accountability.",
    metrics: [
      { label: "Reporting Overhead", value: "120h → 2h", detail: "Per quarterly funding cycle" },
      { label: "Grant Retention", value: "100%", detail: "All institutional donors renewed" },
      { label: "Clinic Coverage", value: "18 Sites", detail: "Automated daily clinic telemetry" },
    ],
    toolsUsed: ["Next.js", "TypeScript", "Tailwind CSS", "Cloudflare Pages", "Observable Plot"],
    featured: true,
    publishedDate: "March 2026",
  },
];
