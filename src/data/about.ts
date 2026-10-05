export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  credentials: string;
  avatarPlaceholder: string;
  initials: string;
}

export interface CompanyValue {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export const COMPANY_VALUES: CompanyValue[] = [
  {
    id: "precision",
    title: "Precision Over Assumptions",
    description:
      "We don't guess what your metrics mean. We trace numbers back to source systems, eliminate edge-case errors, and verify every formula so you make decisions with 100% confidence.",
    iconName: "check-circle",
  },
  {
    id: "pragmatism",
    title: "Pragmatism Over Complexity",
    description:
      "We do not sell over-engineered enterprise platforms when a lean database and an elegant dashboard solve the problem in 3 weeks. We build what your team will actually use every day.",
    iconName: "lightning-bolt",
  },
  {
    id: "speed",
    title: "Speed as a Feature",
    description:
      "Our tools are built for the real world — loading instantly on mobile devices, low-bandwidth 3G connections, and without battery drain. Fast software means higher adoption.",
    iconName: "chart-bar",
  },
  {
    id: "transparency",
    title: "Complete Client Ownership",
    description:
      "No vendor lock-in. You own your code, your data models, and your infrastructure from day one, accompanied by clear documentation so your internal team is empowered.",
    iconName: "shield-check",
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "founder",
    name: "Dennis Koech [REPLACE: Founder / Principal Lead]",
    role: "Founder & Lead Data Architect",
    bio: "Over 10 years of experience building data pipelines, business intelligence tools, and custom web platforms across East Africa and Europe. Passionate about turning messy field records into high-velocity operational decisions.",
    credentials: "BSc Computer Science, Certified Data Management Professional (CDMP)",
    avatarPlaceholder: "[REPLACE: Headshot photo of Founder]",
    initials: "DK",
  },
  {
    id: "data-lead",
    name: "Faith Wanjiku [REPLACE: Senior Data Analyst]",
    role: "Senior Data Scientist & Analytics Lead",
    bio: "Specializes in statistical modeling, inventory forecasting, and data pipeline normalization in PostgreSQL and Python. Previously designed telemetry models for high-growth logistics and agritech ventures.",
    credentials: "MSc Statistics & Machine Learning, Nairobi",
    avatarPlaceholder: "[REPLACE: Headshot photo of Analytics Lead]",
    initials: "FW",
  },
  {
    id: "web-lead",
    name: "Brian Otieno [REPLACE: Full-Stack Engineer]",
    role: "Lead Front-End & Visualization Engineer",
    bio: "Front-end specialist with deep expertise in Next.js, SVG animations, and D3.js. Obsessed with sub-second page performance, accessibility (WCAG AA), and responsive design on mobile networks.",
    credentials: "Full-Stack Web Architect, 8+ Years Production Engineering",
    avatarPlaceholder: "[REPLACE: Headshot photo of Lead Engineer]",
    initials: "BO",
  },
];

export const COMPANY_STORY = {
  foundedYear: "2023",
  headquarters: "Nairobi, Kenya",
  serviceScope: "East Africa & Worldwide (Remote-Ready)",
  mission:
    "To help small and mid-sized organizations, startups, and NGOs break free from brittle spreadsheets and chaotic records through clear, human-centered data analysis and bespoke web engineering.",
  narrative: [
    "Landometrix was founded out of a recurring frustration: watching talented business owners and non-profit leaders across Kenya and beyond make critical decisions using fragmented, error-riddled spreadsheets that crashed on mobile phones.",
    "While high-end Silicon Valley consulting firms charge prohibitive retainers and deliver bloated 80-page slide decks, Landometrix takes a hands-on, engineering-first approach. We dig into your actual raw files, automate the ingest, clean the duplicates, and build the custom web dashboards your team needs to act immediately.",
    "Headquartered in Nairobi's vibrant tech corridor, we combine deep local operational understanding of African market infrastructure (low-bandwidth realities, mobile money workflows, distributed supply chains) with world-class engineering standards for clients across Africa, Europe, and North America.",
  ],
};
