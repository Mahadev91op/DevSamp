/**
 * Centralized Navigation Configuration for DevSamp Ecosystem
 * All navbar, mobile drawer, dropdowns, and footer directory structures are defined here.
 */

export const navigationConfig = {
  // Primary desktop navbar items
  primary: [
    {
      id: "home",
      label: "Home",
      href: "/",
      match: "/",
      enabled: true,
    },
    {
      id: "about",
      label: "About",
      href: "/about",
      match: ["/about", "/vision", "/mission", "/why-devsamp"],
      enabled: true,
      hasDropdown: true,
      description: "Company history, foundational engineering, and long-term vision.",
      groups: [
        {
          title: "STORY & DIRECTION",
          items: [
            { label: "About DevSamp", href: "/about", description: "Who we are and our engineering foundations", icon: "Info", enabled: true },
            { label: "Our Mission", href: "/mission", description: "What we build today and operational purpose", icon: "Target", enabled: true, badge: "CORE" },
            { label: "Vision 2035", href: "/vision", description: "Where we are going over the next 10–15 years", icon: "Compass", enabled: true, badge: "2035" },
            { label: "Why DevSamp", href: "/why-devsamp", description: "Architectural advantages and 100% in-house craft", icon: "ShieldCheck", enabled: true, badge: "ADVANTAGE" },
          ]
        },
        {
          title: "ORGANIZATION",
          items: [
            { label: "Engineering Pods", href: "/about#leadership", description: "Core leadership and pod engineers", icon: "Users", enabled: true },
            { label: "Careers & Apprenticeships", href: "/#contact", description: "Join our high-performance engineering pods", icon: "Briefcase", enabled: true },
            { label: "Contact Pod", href: "/#contact", description: "Direct communication with senior architects", icon: "Mail", enabled: true },
          ]
        }
      ]
    },
    {
      id: "ecosystem",
      label: "Ecosystem",
      href: "/ecosystem",
      match: ["/ecosystem", "/#ecosystem"],
      enabled: true,
      hasDropdown: true,
      description: "How our software products, services, and cloud nodes interoperate.",
      groups: [
        {
          title: "TOPOLOGY & ARCHITECTURE",
          items: [
            { label: "Ecosystem Overview", href: "/ecosystem", description: "How everything inside DevSamp connects", icon: "Cpu", enabled: true, badge: "CORE" },
            { label: "Interactive Topology", href: "/ecosystem#topology", description: "Explore the live connected system mesh", icon: "Activity", enabled: true },
            { label: "Platform Foundation", href: "/ecosystem#foundation", description: "Shared identity, multi-tenant isolation, and event bus", icon: "Layers", enabled: true },
            { label: "Engagement Flows", href: "/ecosystem#flow", description: "Product, service, and custom hybrid pathways", icon: "Workflow", enabled: true },
          ]
        }
      ]
    },
    {
      id: "products",
      label: "Products",
      href: "/products",
      match: "/products",
      enabled: true,
      hasDropdown: true,
      description: "Proprietary vertical SaaS platforms and enterprise tools.",
      groups: [
        {
          title: "FLAGSHIP SOFTWARE",
          items: [
            { label: "Products Overview", href: "/products", description: "Explore our software portfolio", icon: "Boxes", enabled: true },
            { label: "MedERP Pro", href: "/products/mederp-pro", description: "Clinical hospital & diagnostics ERP", icon: "Activity", enabled: true, badge: "SaaS" },
            { label: "FlowPulse POS", href: "/products", description: "Multi-branch retail billing & inventory", icon: "TrendingUp", enabled: true, badge: "RETAIL" },
            { label: "Software Roadmap", href: "/vision#roadmap", description: "Scheduled platform updates and releases", icon: "Flag", enabled: true },
          ]
        }
      ]
    },
    {
      id: "services",
      label: "Services",
      href: "/#services",
      match: "/services",
      enabled: true,
      hasDropdown: true,
      description: "Dedicated engineering pods building custom high-scale platforms.",
      groups: [
        {
          title: "CORE CAPABILITIES",
          items: [
            { label: "Services Overview", href: "/#services", description: "Explore our engineering capabilities", icon: "Layers", enabled: true },
            { label: "Fullstack Web & SaaS", href: "/#services", description: "Next.js 15, Node.js, and MongoDB architectures", icon: "Code2", enabled: true },
            { label: "UI/UX & Design Systems", href: "/#services", description: "60fps interactions and accessible interfaces", icon: "Sparkles", enabled: true },
            { label: "API & Cloud Architecture", href: "/#services", description: "Multi-tenant event mesh and micro-gateways", icon: "Workflow", enabled: true },
          ]
        }
      ]
    },
    {
      id: "industries",
      label: "Industries",
      href: "/#industries",
      match: "/#industries",
      enabled: true,
      hasDropdown: true,
      description: "Tailored software orchestration across specialized sectors.",
      groups: [
        {
          title: "SPECIALIZED DOMAINS",
          items: [
            { label: "Healthcare & Diagnostics", href: "/#industries", description: "HIPAA-ready clinical hospital systems", icon: "Activity", enabled: true },
            { label: "Retail & Multi-Branch", href: "/#industries", description: "High-speed offline-first POS & inventory", icon: "Boxes", enabled: true },
            { label: "Fintech & Enterprise", href: "/#industries", description: "Audited ledgers and multi-tenant billing", icon: "ShieldCheck", enabled: true },
            { label: "High-Growth Startups", href: "/#industries", description: "Rapid MVP to production-scale SaaS", icon: "Zap", enabled: true },
          ]
        }
      ]
    },
    {
      id: "more",
      label: "More",
      match: ["/blog", "/privacy", "/terms"],
      enabled: true,
      hasDropdown: true,
      isMore: true,
      description: "Developer hubs, technical publications, security, and legal.",
      groups: [
        {
          title: "DEVELOPER & CONTENT",
          items: [
            { label: "Engineering Devlogs", href: "/blog", description: "Technical articles, release logs, and architectural deep-dives", icon: "Rss", enabled: true },
            { label: "Developer Hub", href: "/#developers", description: "REST APIs, Webhook events, and client SDKs", icon: "Terminal", enabled: true },
            { label: "Client Portal", href: "/dashboard", description: "Manage your deployed systems and active retainers", icon: "LayoutDashboard", enabled: true },
          ]
        },
        {
          title: "TRUST & GOVERNANCE",
          items: [
            { label: "Privacy Policy", href: "/privacy", description: "Data handling and encryption policies", icon: "ShieldCheck", enabled: true },
            { label: "Terms of Service", href: "/terms", description: "Service level agreements and usage terms", icon: "Lock", enabled: true },
            { label: "Sitemap", href: "/sitemap.xml", description: "Complete directory of public website routes", icon: "Compass", enabled: true },
          ]
        }
      ]
    }
  ],

  // Primary Call-to-Action
  cta: {
    label: "Initialize Pod",
    href: "/#contact",
    dataCursor: "Connect"
  },

  // Footer Directory Columns
  footer: {
    columns: [
      {
        id: "devsamp",
        title: "DevSamp",
        items: [
          { label: "About DevSamp", href: "/about", enabled: true },
          { label: "Our Mission", href: "/mission", enabled: true },
          { label: "Vision 2035", href: "/vision", enabled: true },
          { label: "Connected Ecosystem", href: "/ecosystem", enabled: true },
          { label: "Engineering Pods", href: "/about#leadership", enabled: true },
          { label: "Why DevSamp", href: "/why-devsamp", enabled: true },
        ]
      },
      {
        id: "products",
        title: "Products",
        items: [
          { label: "Products Overview", href: "/products", enabled: true },
          { label: "MedERP Pro Clinical Suite", href: "/products/mederp-pro", enabled: true },
          { label: "FlowPulse Multi-Branch POS", href: "/products", enabled: true },
          { label: "Technical Roadmap", href: "/vision#roadmap", enabled: true },
          { label: "Changelog & Releases", href: "/blog", enabled: true },
        ]
      },
      {
        id: "services",
        title: "Services",
        items: [
          { label: "Services Overview", href: "/#services", enabled: true },
          { label: "Fullstack Web Platforms", href: "/#services", enabled: true },
          { label: "SaaS Product Engineering", href: "/#services", enabled: true },
          { label: "Mobile App Development", href: "/#services", enabled: true },
          { label: "UI/UX & Design Systems", href: "/#services", enabled: true },
          { label: "Cloud & Micro-Gateways", href: "/#services", enabled: true },
        ]
      },
      {
        id: "resources",
        title: "Resources",
        items: [
          { label: "Engineering Devlogs", href: "/blog", enabled: true },
          { label: "Case Studies", href: "/#case-studies", enabled: true },
          { label: "Developer APIs & SDKs", href: "/#developers", enabled: true },
          { label: "Client Dashboard", href: "/dashboard", enabled: true },
          { label: "System Status", href: "/#why-devsamp", enabled: true },
        ]
      },
      {
        id: "company",
        title: "Company",
        items: [
          { label: "Engineering Leadership", href: "/about#leadership", enabled: true },
          { label: "Mission Principles", href: "/mission#meanings", enabled: true },
          { label: "Careers & Pod Hiring", href: "/#contact", enabled: true },
          { label: "Contact Pod", href: "/#contact", enabled: true },
        ]
      },
      {
        id: "trust",
        title: "Trust & Legal",
        items: [
          { label: "Privacy Policy", href: "/privacy", enabled: true },
          { label: "Terms of Service", href: "/terms", enabled: true },
          { label: "Security Standards", href: "/mission#reliability", enabled: true },
          { label: "Sitemap", href: "/sitemap.xml", enabled: true },
        ]
      }
    ],
    legalLinks: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Sitemap", href: "/sitemap.xml" },
    ]
  }
};
