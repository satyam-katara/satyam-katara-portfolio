/**
 * content.ts — the single source of truth for the portfolio.
 *
 * Every component reads copy from here; nothing user-facing is hardcoded
 * in components. Facts marked TODO / null are unverified: components must
 * render a graceful fallback (usually: hide the element) rather than a
 * broken or empty one.
 */

// ---------------------------------------------------------------------------
// Identity & links
// ---------------------------------------------------------------------------

export interface Availability {
  enabled: boolean;
  label: string;
}

export interface Identity {
  name: string;
  monogram: string;
  title: string;
  location: string;
  email: string;
  linkedin: string;
  github: string;
  /** Public resume path. Replace `public/resume.pdf` with the real file. */
  resumePath: string;
  availability: Availability;
  /**
   * Canonical site URL, used for metadata (canonical, OG, sitemap, JSON-LD).
   * TODO: set to the real deployed domain after Vercel deployment.
   * Leave empty to omit canonical URLs rather than publish a wrong one.
   */
  siteUrl: string;
}

export const identity: Identity = {
  name: "Satyam Katara",
  monogram: "SK",
  title: "Data Analyst | Aspiring Data Scientist",
  location: "Agra, Uttar Pradesh, India",
  email: "satyam.katara1620@gmail.com",
  linkedin: "https://linkedin.com/in/satyamkatara",
  github: "https://github.com/satyam-katara",
  resumePath: "/resume.pdf",
  availability: {
    enabled: true,
    label: "Open to Data Analyst roles · Graduating 2027",
  },
  siteUrl: "https://satyam-katara-portfolio.vercel.app",
};

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export interface HeroCopy {
  headline: string;
  subheadline: string;
  ctas: { label: string; href: string; download?: boolean }[];
}

export const hero: HeroCopy = {
  headline: "Turning Raw Data Into Actionable Insights.",
  subheadline:
    "I'm Satyam Katara, a Data Analyst passionate about transforming complex datasets into clear insights, interactive dashboards, and data-driven business decisions.",
  ctas: [
    { label: "Explore My Projects", href: "#projects" },
    { label: "Download Resume", href: "/resume.pdf", download: true },
    { label: "Let's Connect", href: "#contact" },
  ],
};

// ---------------------------------------------------------------------------
// About
// ---------------------------------------------------------------------------

export const aboutCopy: string =
  "I'm a Computer Science and Engineering student specializing in Data Science. I enjoy exploring datasets, identifying trends, building analytical solutions, and communicating insights through visual storytelling. My goal is to help businesses make better decisions using data.";

export const aboutToolChips: string[] = [
  "Python",
  "SQL",
  "Excel",
  "Power BI",
  "Data Cleaning",
  "EDA",
  "Statistical Analysis",
  "BI",
];

// ---------------------------------------------------------------------------
// Education
// ---------------------------------------------------------------------------

export interface Education {
  degree: string;
  field: string;
  school: string;
  schoolShort: string;
  location: string;
  graduating: string;
  cgpa: string;
  showCgpa: boolean;
}

export const education: Education = {
  degree: "B.Tech",
  field: "Computer Science and Engineering (Data Science)",
  school: "Hindustan College of Science and Technology",
  schoolShort: "HCST",
  location: "Mathura, Uttar Pradesh",
  graduating: "2027",
  cgpa: "7.45",
  showCgpa: true,
};

// ---------------------------------------------------------------------------
// Experience
// ---------------------------------------------------------------------------

export interface Experience {
  role: string;
  company: string;
  location?: string;
  startDate: string;
  endDate: string;
  /** Verified bullets. Empty + `detailsTodo` renders a neutral fallback line. */
  bullets: string[];
  detailsTodo?: boolean;
}

export const experience: Experience[] = [
  {
    role: "Data Analyst Intern",
    company: "Bluestock Fintech",
    startDate: "Jun 2026",
    endDate: "Aug 2026",
    bullets: [
      "Built mutual fund analytics: ETL pipelines, risk and return metrics, and interactive Power BI dashboards.",
      "Developed the Nifty 100 financial analytics platform for end-to-end equity research.",
    ],
  },
  {
    role: "Data Science Intern",
    company: "iStudio",
    location: "Remote",
    startDate: "Oct 2025",
    endDate: "Jan 2026",
    bullets: [],
    // TODO: add 2–3 verified bullets. Until then the timeline renders a
    // neutral single line without invented claims.
    detailsTodo: true,
  },
];

export const experienceFallbackLine =
  "Contributed to data science initiatives as part of the team.";

// ---------------------------------------------------------------------------
// Skills
// ---------------------------------------------------------------------------

export type SkillLevel = "Daily use" | "Project-proven" | "Familiar";

export interface Skill {
  name: string;
  level: SkillLevel;
}

export interface SkillGroup {
  title: string;
  /** Key into the icon map in the Skills section (lucide icons). */
  icon: "code" | "chart" | "analytics" | "wrench";
  skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Programming & Data",
    icon: "code",
    skills: [
      { name: "Python", level: "Daily use" },
      { name: "SQL", level: "Daily use" },
      { name: "Pandas", level: "Daily use" },
      { name: "NumPy", level: "Project-proven" },
    ],
  },
  {
    title: "Visualization & BI",
    icon: "chart",
    skills: [
      { name: "Power BI (DAX, Power Query)", level: "Daily use" },
      { name: "Matplotlib", level: "Project-proven" },
      { name: "Seaborn", level: "Project-proven" },
      { name: "Plotly", level: "Project-proven" },
      { name: "Excel (Advanced)", level: "Daily use" },
      { name: "Streamlit", level: "Project-proven" },
      { name: "Tableau", level: "Familiar" },
    ],
  },
  {
    title: "Analytics",
    icon: "analytics",
    skills: [
      { name: "EDA", level: "Daily use" },
      { name: "Data Cleaning & Validation", level: "Daily use" },
      { name: "Statistical Analysis", level: "Project-proven" },
      { name: "Hypothesis Testing", level: "Project-proven" },
      { name: "KPI Reporting", level: "Project-proven" },
      { name: "Business Intelligence", level: "Project-proven" },
    ],
  },
  {
    title: "Additional",
    icon: "wrench",
    skills: [
      { name: "Jupyter", level: "Daily use" },
      { name: "Git & GitHub", level: "Daily use" },
      { name: "SQLite", level: "Project-proven" },
      { name: "ML Fundamentals", level: "Project-proven" },
      { name: "scikit-learn", level: "Project-proven" },
      { name: "NLP (Basics)", level: "Familiar" },
      { name: "SQL Server", level: "Project-proven" },
      { name: "dbt", level: "Familiar" },
    ],
  },
];

// ---------------------------------------------------------------------------
// Certifications
// ---------------------------------------------------------------------------

export interface Certification {
  title: string;
  issuer: string;
  /** Optional link to the credential. Null renders no link. */
  credentialUrl: string | null;
  /** Optional certificate image under /public/certificates. Null hides it. */
  certificateImage: string | null;
}

export const certifications: Certification[] = [
  {
    title: "SQL (Advanced)",
    issuer: "HackerRank",
    credentialUrl: null,
    certificateImage: null,
  },
  {
    title: "Microsoft Certified: Azure AI Fundamentals (AI-900)",
    issuer: "Microsoft",
    // TODO: add credential URL / issue year when available.
    credentialUrl: null,
    certificateImage: null,
  },
  {
    title: "SQL and Relational Databases 101",
    issuer: "IBM",
    credentialUrl: null,
    certificateImage: null,
  },
  {
    title: "Python for Data Analysis",
    issuer: "IBM",
    credentialUrl: null,
    certificateImage: null,
  },
  {
    title: "Data Visualization with Python",
    issuer: "IBM",
    credentialUrl: null,
    certificateImage: null,
  },
  {
    title: "GenAI Powered Data Analytics Job Simulation",
    issuer: "Tata (Forage)",
    credentialUrl: null,
    certificateImage: null,
  },
  {
    title: "Generative AI and AI Native Development",
    issuer: "TransOrg Analytics",
    credentialUrl: null,
    certificateImage: null,
  },
];

export interface Workshop {
  title: string;
  provider: string;
}

export const workshops: Workshop[] = [
  { title: "Generative AI Workshop", provider: "Outskill" },
];

/** In-progress learning. Section is hidden while empty. */
export const inProgressCertifications: Certification[] = [];

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

export type ProjectFilter = "All" | "Python" | "SQL" | "Power BI" | "EDA";

export const projectFilters: ProjectFilter[] = [
  "All",
  "Python",
  "SQL",
  "Power BI",
  "EDA",
];

export interface ProjectPreview {
  type: "screenshot" | "generated";
  /** Path under /public when type is "screenshot". */
  src?: string;
  alt: string;
}

export interface Project {
  slug: string;
  title: string;
  /** Short category label shown as a chip. */
  category: string;
  /** Must only use values from `projectFilters` (minus "All"). */
  tags: Exclude<ProjectFilter, "All">[];
  problem: string;
  approach: string[];
  /** Only include when backed by real findings — never invented. */
  keyFindings?: string[];
  tools: string[];
  /** Null hides the GitHub button (never link to a guessed URL). */
  github: string | null;
  liveUrl: string | null;
  preview: ProjectPreview;
  /** Concept/exploratory work is badged as such. */
  concept?: boolean;
}

export const projects: Project[] = [
  {
    slug: "rfm-customer-segmentation",
    title: "RFM Customer Segmentation",
    category: "Customer Analytics",
    tags: ["SQL"],
    problem:
      "An online retailer with ~1.06M transactions could not tell its most valuable customers from one-time buyers, so retention spend went to the wrong people.",
    approach: [
      "Segmented 5,878 customers from ~1.06M Online Retail II transactions in pure T-SQL (SQL Server), cleaning cancellations, returns and missing-customer rows.",
      "Scored Recency, Frequency and Monetary with NTILE(5) into 5 rule-based segments.",
      "Extended the project with a 12-month forward CLV model built on retention-adjusted segment value.",
    ],
    keyFindings: [
      "Champions, the top 21.6% of customers, drive 67.9% of gross purchase value (total 17,743,429.08).",
      "Champions average CLV 5,821.12 per customer and 52.27% of retention-adjusted forward value (total 14,122,577.24).",
      "At Risk and Hibernating segments show 0.00 adjusted CLV, so their value is recoverable only through win-back.",
    ],
    tools: ["T-SQL", "SQL Server"],
    github: "https://github.com/satyam-katara/rfm-customer-segmentation",
    liveUrl: null,
    preview: {
      type: "generated",
      alt: "Abstract preview: RFM customer segmentation motif",
    },
  },
  {
    slug: "excel-report-automation",
    title: "Excel Report Automation",
    category: "MIS Automation",
    tags: ["Python", "EDA"],
    problem:
      "A monthly Superstore MIS report took ~3.5 hours of manual work every month: cleaning, KPI calculations, and workbook formatting.",
    approach: [
      "Built a pandas pipeline for cleaning, KPI and breakdown calculations over 9,994 transactions (2014-2017).",
      "Generated an openpyxl workbook with 8 sheets, KPI cards and charts.",
      "Added a VBA control panel (month picker + one-click GENERATE MIS REPORT button) and a monthly Windows Task Scheduler job.",
      "Added run logging: a dated log per run, with failures writing an ALERT file with traceback and exit code 1.",
    ],
    keyFindings: [
      "Cut report generation from ~3.5 hours to 2.71 seconds.",
      "Report covers Sales $2,297,200.86 and Profit $286,397.02.",
    ],
    tools: ["Python", "Pandas", "OpenPyXL", "VBA", "Excel"],
    github: "https://github.com/satyam-katara/excel-report-automation",
    liveUrl: null,
    preview: {
      type: "generated",
      alt: "Abstract preview: Excel report automation motif",
    },
  },
  {
    slug: "telecom-customer-churn-analysis",
    title: "Telecom Customer Churn Analysis",
    category: "Churn Analytics",
    tags: ["SQL", "Python"],
    problem:
      "A telecom operator was losing over a quarter of its customers without knowing which segments were leaving or why.",
    approach: [
      "Analyzed 7,043 telecom customers end-to-end in SQL Server + Python, profiling and cleaning the data.",
      "Segmented churn by contract, tenure, payment method and internet service.",
      "Validated 11 churn patterns with Chi-square / Mann-Whitney U tests (Holm-corrected) and built 3 data-backed retention strategies with KPIs and treatment-vs-control pilots.",
      "Extended with ML: a Gradient Boosting churn model ranking the top 100 at-risk customers for targeted win-back.",
    ],
    keyFindings: [
      "Month-to-month contracts churn at 42.71% and new-tenure customers at 47.44%; $139,130.85 in monthly charge exposure.",
      "Contract is the strongest churn driver (Cramer's V = 0.41).",
      "Gradient Boosting model: test ROC-AUC 0.8434, top-decile lift 2.91x; top 100 at-risk customers worth $7,782/month.",
    ],
    tools: ["SQL Server", "Python", "scikit-learn", "Pandas"],
    github: "https://github.com/satyam-katara/telecom-customer-churn-analysis",
    liveUrl: null,
    preview: {
      type: "generated",
      alt: "Abstract preview: telecom churn analysis motif",
    },
  },
  {
    slug: "ab-test-design-sizing",
    title: "A/B Test Design and Sizing",
    category: "Experimentation",
    tags: ["Python"],
    problem:
      "A checkout change promised a conversion lift, but nobody knew how many users the test needed or how to avoid false positives from peeking at results early.",
    approach: [
      "Designed an A/B test for a checkout conversion lift (10% to 12%), computing the required sample size at 5% significance and 80% power, with a sensitivity table across 1-3 point MDEs.",
      "Verified the design with 10,000 Monte Carlo simulations.",
      "Extended with sequential testing: a simulation-calibrated O'Brien-Fleming-style boundary to control false positives under interim looks.",
      "Includes a sizing calculator notebook and a reusable one-page test plan template.",
    ],
    keyFindings: [
      "Required sample size: 3,839 users per group (7,678 total).",
      "Simulations confirmed the design: false-alarm rate 4.78%, power 80.75%.",
      "8 unadjusted interim checks inflate false positives from ~5% to 17.68% (3.7x); the calibrated boundary brought the false-alarm rate back to 4.88% on fresh independent evaluation.",
    ],
    tools: ["Python", "Statistics", "Monte Carlo Simulation"],
    github: "https://github.com/satyam-katara/ab-test-design-sizing",
    liveUrl: null,
    preview: {
      type: "generated",
      alt: "Abstract preview: A/B test design motif",
    },
  },
  {
    slug: "olist-ecommerce-analytics",
    title: "Olist E-commerce Analytics",
    category: "E-commerce Analytics",
    tags: ["SQL", "Power BI"],
    problem:
      "A Brazilian e-commerce marketplace needed one trusted view of revenue, delivery, and customer satisfaction across 99,441 orders.",
    approach: [
      "Built a SQL Server star schema (5 dimensions, 4 facts) with 5 analytical views over the Olist dataset.",
      "Built a 5-page Power BI dashboard covering revenue, orders, freight, reviews and delivery performance.",
      "Validated the pipeline end-to-end, reconciling source-to-fact revenue and freight to the cent with zero duplicate OrderIDs and zero missing dimension keys.",
      "Extended with DAX time intelligence: Revenue and Orders YTD/MTD, last-year comparisons and YoY growth measures.",
    ],
    keyFindings: [
      "R$13,591,643.70 in item revenue, AOV R$136.68, freight R$2,251,909.54.",
      "Average review 4.09/5 and 93.23% on-time delivery across 99,441 orders.",
    ],
    tools: ["SQL Server", "T-SQL", "Power BI", "DAX"],
    github: "https://github.com/satyam-katara/olist-ecommerce-analytics",
    liveUrl: null,
    preview: {
      type: "generated",
      alt: "Abstract preview: Olist e-commerce analytics motif",
    },
  },
  {
    slug: "marketing-ab-test-analysis",
    title: "Reading a Real A/B Test",
    category: "Experimentation",
    tags: ["SQL", "Python"],
    problem:
      "A marketing A/B test with 588,101 users claimed the ad worked, but the result needed a full read: was the lift real, how big was it, and was a rollout justified?",
    approach: [
      "Ran SQL Server integrity checks (0 missing, 0 duplicate user IDs) plus Python statistics on the full test data.",
      "Measured conversion lift with a z-test, confidence interval and effect size.",
      "Sized the business impact in incremental conversions and checked dose-response across ad exposure levels.",
    ],
    keyFindings: [
      "Ad converted at 2.5547% vs 1.7854% for the PSA control: absolute lift +0.7692 pp (+43.09% relative), z = 7.3701, p < 0.001.",
      "~4,343 incremental conversions (7.69 per 1,000 users).",
      "Recommended a CONDITIONAL rollout only, flagging the small effect (Cohen's h = 0.053) and missing cost data.",
    ],
    tools: ["SQL Server", "Python", "Statistics"],
    github: "https://github.com/satyam-katara/marketing-ab-test-analysis",
    liveUrl: null,
    preview: {
      type: "generated",
      alt: "Abstract preview: marketing A/B test analysis motif",
    },
  },
  {
    slug: "mutual-fund-analytics-dashboard",
    title: "Mutual Fund Analytics Dashboard",
    category: "Fintech Analytics",
    tags: ["Python", "SQL", "Power BI", "EDA"],
    problem:
      "Retail investors struggle to compare mutual fund schemes across risk, return, and consistency using scattered factsheets.",
    approach: [
      "Built an ETL pipeline over 10+ datasets plus live NAV data from the mfapi.in API covering 40 fund schemes.",
      "Modeled a SQLite star schema and ran 15+ EDA visualizations to profile scheme behavior.",
      "Engineered risk/return metrics: CAGR, Sharpe, Sortino, alpha/beta, maximum drawdown, historical VaR/CVaR, and rolling Sharpe.",
      "Created a composite fund scorecard, investor cohort analysis, and a risk-based fund recommender.",
      "Shipped a 4-page interactive Power BI dashboard with drill-through and cross-filtering.",
    ],
    tools: ["Python", "SQL", "SQLite", "Power BI", "DAX", "Pandas"],
    github: "https://github.com/satyam-katara/mutual-fund-analytics",
    liveUrl: null,
    // TODO: add a real screenshot at /public/projects/mutual-fund-analytics-dashboard.png
    // and switch `type` to "screenshot" with `src` set.
    preview: {
      type: "generated",
      alt: "Abstract preview: mutual fund analytics dashboard motif",
    },
  },
  {
    slug: "nifty-100-financial-analytics-platform",
    title: "Nifty 100 Financial Analytics Platform",
    category: "Equity Research",
    tags: ["Python", "SQL", "EDA"],
    problem:
      "Equity research across 100 large-cap stocks means juggling ratios, peers, and valuations from disconnected sources.",
    approach: [
      "Built an end-to-end ETL pipeline feeding a SQLite store guarded by 15 data-quality checks.",
      "Implemented a financial ratio engine covering CAGR, profitability, and capital allocation.",
      "Built a multi-metric stock screener with composite scoring and peer comparison.",
      "Added an NLP-driven insights engine and automated PDF reporting across 92 companies and 10 sectors.",
      "Delivered a Streamlit dashboard with a dedicated valuation module.",
    ],
    tools: ["Python", "SQL", "SQLite", "Streamlit", "Pandas", "NLP"],
    github: "https://github.com/satyam-katara/nifty100-financial-intelligence-platform",
    liveUrl: null,
    preview: {
      type: "generated",
      alt: "Abstract preview: equity research platform motif",
    },
  },
  {
    slug: "sales-performance-analysis-dashboard",
    title: "Sales Performance Analysis Dashboard",
    category: "Business Intelligence",
    tags: ["Power BI"],
    problem:
      "Sales teams need a single view of KPIs to track performance against targets.",
    approach: [
      "Designed a sales KPI dashboard in Power BI with clear performance tracking views.",
    ],
    tools: ["Power BI", "DAX"],
    github: "https://github.com/satyam-katara/sales-performance-analysis-dashboard",
    liveUrl: null,
    preview: {
      type: "generated",
      alt: "Abstract preview: sales KPI dashboard motif",
    },
  },
  {
    slug: "superstore-sales-analysis",
    title: "Superstore Sales Analysis",
    category: "Exploratory Analysis",
    tags: ["Python", "EDA"],
    problem:
      "Understanding what drives sales patterns, product performance, and profitability in retail superstore data.",
    approach: [
      "Performed exploratory data analysis on superstore sales data covering sales patterns, product performance, and profitability.",
    ],
    tools: ["Python", "Pandas", "Matplotlib", "Seaborn"],
    // TODO: verify the repository URL before linking.
    github: null,
    liveUrl: null,
    preview: {
      type: "generated",
      alt: "Abstract preview: superstore sales analysis motif",
    },
  },
  {
    slug: "insurance-claims-analytics",
    title: "Insurance Claims Analytics",
    category: "Dashboard Concept",
    tags: ["Power BI"],
    problem: "Insurance claims dashboard concept for claims trend analysis.",
    approach: ["Concept-stage dashboard design for insurance claims analytics."],
    tools: ["Power BI"],
    github: null,
    liveUrl: null,
    concept: true,
    preview: {
      type: "generated",
      alt: "Abstract preview: insurance claims dashboard concept motif",
    },
  },
  {
    slug: "upi-transaction-analytics",
    title: "UPI Transaction Analytics",
    category: "Exploratory Concept",
    tags: ["Python", "EDA"],
    problem: "Exploratory analysis of UPI transaction trends.",
    approach: ["Concept-stage exploratory analysis of UPI transaction trends."],
    tools: ["Python", "Pandas"],
    github: null,
    liveUrl: null,
    concept: true,
    preview: {
      type: "generated",
      alt: "Abstract preview: UPI transaction analytics concept motif",
    },
  },
];

/** Optional 7th card. Hidden unless explicitly enabled. */
export const showCyberGuard = false;

export const cyberGuardProject: Project = {
  slug: "cyberguard-ai",
  title: "CyberGuard AI",
  category: "Final-Year Project · In progress (2026-27)",
  tags: ["Python"],
  problem:
    "Phishing URLs are hard to triage without understanding why a model flags them.",
  approach: [
    "Building an ML-based phishing URL detector with SHAP explainability.",
    "FastAPI backend, React frontend, PostgreSQL storage.",
  ],
  tools: ["Python", "FastAPI", "React", "PostgreSQL", "SHAP"],
  github: null,
  liveUrl: null,
  concept: true,
  preview: {
    type: "generated",
    alt: "Abstract preview: phishing detection project motif",
  },
};

// ---------------------------------------------------------------------------
// Contact
// ---------------------------------------------------------------------------

export const contactCopy = {
  heading: "Have a Data Challenge? Let's Talk.",
  closing:
    "Open to Data Analyst and Data Science opportunities. I'd love to hear what you're working on.",
};

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

// ---------------------------------------------------------------------------
// Derived helpers (used by components; never hardcode these numbers)
// ---------------------------------------------------------------------------

export const statsConfig = {
  internships: 2,
  certifications: certifications.length,
};

export function featuredProjectCount(): number {
  return projects.length + (showCyberGuard ? 1 : 0);
}

export function dailyUseToolCount(): number {
  return skillGroups.flatMap((g) => g.skills).filter((s) => s.level === "Daily use")
    .length;
}
