export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  publishedDate: string;
  readTime: string;
  author: {
    name: string;
    title: string;
  };
  tags: string[];
  content: {
    sectionHeading?: string;
    paragraphs: string[];
  }[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "why-kenyan-businesses-lose-value-in-spreadsheets",
    title: "Why Kenyan Businesses Lose Value in Untracked Spreadsheets (And How to Fix It)",
    excerpt:
      "Spreadsheets are the world's most popular business tool, but when your revenue depends on three people not breaking row 42, you have a structural risk. Here is how growing businesses transition to resilient data workflows.",
    publishedDate: "March 15, 2026",
    readTime: "5 min read",
    author: {
      name: "David Ochieng [REPLACE: Author Name]",
      title: "Lead Data Engineer, Landometrix",
    },
    tags: ["Data Analytics", "Operations", "SMEs", "Kenya"],
    content: [
      {
        sectionHeading: "The Silent Cost of the 'Master File'",
        paragraphs: [
          "Walk into almost any growing company in Nairobi — whether in manufacturing, agriculture, micro-lending, or logistics — and you will find an indispensable file with a name like 'Sales_Master_Final_v3_UPDATED.xlsx'.",
          "It starts innocently. A spreadsheet is fast to set up, requires zero IT approval, and lets anyone enter data immediately. But as your team expands from five people to fifty, the cracks appear: formulas get accidentally overwritten, cell formats drift, version drift leads to conflicting numbers during board meetings, and vital operational knowledge stays locked inside one person's head.",
          "According to regional operational studies, mid-market businesses lose an average of 14 hours per department per week simply reconciling discrepancies between different internal sheets. That is time stolen from strategic decisions and customer service.",
        ],
      },
      {
        sectionHeading: "Three Symptoms That Your Spreadsheets Have Reached Their Limit",
        paragraphs: [
          "1. Multiple versions of the truth: When finance reports quarterly revenue at KES 42M and sales insists it was KES 46M, you do not have a communication problem; you have a single-point-of-failure data problem.",
          "2. Latency in operational decisions: If finding out how many inventory units are currently stored in your Kisumu warehouse takes three phone calls and waiting until 6 PM for an email attachment, your business is operating in the rearview mirror.",
          "3. Fragile key-person dependency: If operations grind to a halt because one analyst took sick leave and only they understand the nested VLOOKUP formulas, your business has an unhedged operational risk.",
        ],
      },
      {
        sectionHeading: "The Pragmatic Path to Clean Data",
        paragraphs: [
          "Fixing this does not require buying a multi-million-shilling ERP system that takes 18 months to deploy. The pragmatic approach is incremental:",
          "Step 1: Centralize storage. Move raw transactional records into a lightweight cloud relational database (such as PostgreSQL) with enforced validation rules.",
          "Step 2: Automate data ingest. Connect direct feeds from your point-of-sale, mobile money API, or simple web collection forms directly into the database.",
          "Step 3: Serve purpose-built dashboards. Give stakeholders single-click visual answers accessible securely on desktop and mobile, with role-based access.",
          "When data moves automatically, your analysts stop being human data copiers and start acting like strategic advisors.",
        ],
      },
    ],
  },
  {
    slug: "building-low-bandwidth-dashboards-emerging-markets",
    title: "Building Fast, Low-Bandwidth Dashboards for Emerging Markets",
    excerpt:
      "A business dashboard that takes 15 seconds to load over 3G in Nakuru or Mombasa is a dashboard that won't be used. Here are the front-end design principles we use to achieve sub-second visual analytics.",
    publishedDate: "February 28, 2026",
    readTime: "6 min read",
    author: {
      name: "Mercy Mwangi [REPLACE: Author Name]",
      title: "Senior UI/UX & Visualization Architect",
    },
    tags: ["Data Visualization", "Performance", "Web Development", "Mobile-First"],
    content: [
      {
        sectionHeading: "The Disconnect in Standard BI Tools",
        paragraphs: [
          "Commercial enterprise BI platforms are built for engineers sitting in offices with fiber-optic gigabit internet and 32GB RAM machines. They ship heavy client bundles (often 5MB to 12MB of uncompressed JavaScript) that attempt to compute thousands of data points directly in the user's browser.",
          "In Kenya and emerging markets, executive leaders and field supervisors frequently check metrics on mid-range Android devices over fluctuating 3G and 4G connections. When a dashboard stutters, drains battery, or shows a blank loading spinner for ten seconds, users abandon it and revert to phone calls.",
        ],
      },
      {
        sectionHeading: "The Core Principles of Low-Bandwidth Data Visualization",
        paragraphs: [
          "1. Precompute on the edge: Never send 100,000 raw rows to the browser to do a simple GROUP BY. Run aggregations in your serverless database and deliver lightweight JSON payloads consisting solely of the pre-summarized points (often less than 8 KB).",
          "2. Zero-dependency SVG rendering: Rather than importing monolithic 800KB charting suites with dozens of unused features, render clean, accessible SVG directly with React or lightweight D3 modules. SVG scales infinitely, sharpens on high-DPI screens, and weighs virtually nothing.",
          "3. Island architecture & selective hydration: Static page structures should render as pure HTML. Only the interactive chart element needs client-side JavaScript. This preserves battery life and guarantees instant first contentful paint (FCP).",
          "4. Offline resiliency: Cache the most recent successful sync locally in IndexedDB or service workers so field teams can review yesterday's metrics even during network dead zones.",
        ],
      },
      {
        sectionHeading: "Speed Is an Accessibility Requirement",
        paragraphs: [
          "When dashboards load in under 500 milliseconds, decision-makers check them before every client meeting, suppliers verify inventory in real-time at the loading bay, and confidence in the company's data shoots up. Speed is not a luxury; it is the difference between data adoption and shelfware.",
        ],
      },
    ],
  },
  {
    slug: "from-excel-to-custom-web-application",
    title: "From Excel to Web App: When to Stop Patching Sheets and Start Building",
    excerpt:
      "There is a moment in every growing company's journey when adding another tab or macro does more harm than good. Here is our decision framework for knowing when custom web software pays for itself.",
    publishedDate: "January 20, 2026",
    readTime: "4 min read",
    author: {
      name: "David Ochieng [REPLACE: Author Name]",
      title: "Lead Data Engineer, Landometrix",
    },
    tags: ["Web Development", "Product Engineering", "Tech Strategy"],
    content: [
      {
        sectionHeading: "The Spreadsheet Ceiling",
        paragraphs: [
          "Every great venture was likely planned in a spreadsheet. But spreadsheets are designed for ad-hoc personal analysis, not multi-user transactional workflows with concurrent edits, strict security roles, and automated notifications.",
          "How do you know when your company has hit the spreadsheet ceiling? We use a simple 4-factor test with our clients.",
        ],
      },
      {
        sectionHeading: "The 4-Factor Evaluation Test",
        paragraphs: [
          "Factor 1: User Concurrency & Conflicts. If two team members cannot input records at the same time without file lockups or conflicting copies, a web application with row-level transaction safety is overdue.",
          "Factor 2: Granular Access Control. If junior staff or external contractors need to view certain fields (e.g. delivery status) but should never see confidential fields (e.g. margins, wholesale pricing, customer contact lists), spreadsheets cannot protect you. A web application enforces strict role-based access at the database level.",
          "Factor 3: Mobile Input Requirements. If staff are in the field (inspectors, delivery drivers, agronomists, loan officers) trying to pinch-and-zoom a complex sheet on a 6-inch phone screen, data quality will plummet. A responsive web form with input masks and immediate validation cuts entry errors by 80%.",
          "Factor 4: Automated Event Triggers. Spreadsheets cannot easily trigger an SMS confirmation via Africa's Talking when an order is flagged as 'Shipped', or ping a Slack channel when inventory drops below safety thresholds. Custom web products do this automatically.",
        ],
      },
      {
        sectionHeading: "The Return on Investment",
        paragraphs: [
          "Building a targeted, clean web application for a specific operational bottleneck rarely needs to take months. A focused 4-to-6 week build usually pays for itself in avoided human error, recovered staff hours, and faster customer turnarounds within the first two quarters.",
        ],
      },
    ],
  },
];
