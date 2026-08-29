/**
 * DevSamp Ecosystem Master Directory & Registry
 * Single Source of Truth for all 12 Blueprint Sections and 80+ ecosystem pages.
 * Used for Navigation, Mega-Menus, Command Palette (Ctrl+K), Footer, and Sitemap.
 */

export const ECOSYSTEM_SECTIONS = [
  {
    id: "public",
    name: "Public & Main Website",
    code: "01",
    description: "Brand positioning, vision, company identity, and primary engagement entry points.",
    badge: "PUBLIC",
    color: "indigo"
  },
  {
    id: "products-hub",
    name: "Products Hub",
    code: "02",
    description: "Searchable catalog of proprietary software platforms, comparisons, and release roadmaps.",
    badge: "PRODUCTS",
    color: "blue"
  },
  {
    id: "product-template",
    name: "Product Templates",
    code: "03",
    description: "Standardized multi-view architectures for MedERP Pro and all future software products.",
    badge: "SaaS",
    color: "cyan"
  },
  {
    id: "services",
    name: "Engineering Services",
    code: "04",
    description: "Dedicated full-stack engineering pods, custom platforms, cloud gateways, and AI workflows.",
    badge: "SERVICES",
    color: "emerald"
  },
  {
    id: "customer-portal",
    name: "Customer Portal & Account",
    code: "05",
    description: "Centralized client management for products, subscriptions, invoices, licenses, and API keys.",
    badge: "PORTAL",
    color: "violet"
  },
  {
    id: "support-center",
    name: "Support & Help Center",
    code: "06",
    description: "Search-first customer knowledge base, task guides, troubleshooting, and live tickets.",
    badge: "SUPPORT",
    color: "amber"
  },
  {
    id: "developer-portal",
    name: "Developer Portal",
    code: "07",
    description: "Developer hub with REST APIs, Webhooks, client SDKs, sandbox environments, and CLI tools.",
    badge: "DEVELOPERS",
    color: "rose"
  },
  {
    id: "platform-core",
    name: "Ecosystem Core & Platform",
    code: "08",
    description: "Shared multi-tenant identity, RBAC, billing abstraction, and event notification mesh.",
    badge: "PLATFORM",
    color: "teal"
  },
  {
    id: "company",
    name: "Company & Culture",
    code: "09",
    description: "Executive leadership, engineering pods culture, press kit, events, and pod hiring.",
    badge: "COMPANY",
    color: "sky"
  },
  {
    id: "trust-legal",
    name: "Trust, Security & Legal",
    code: "10",
    description: "SOC-2/MFA security controls, responsible disclosure, GDPR/DPA, terms, and privacy.",
    badge: "TRUST",
    color: "slate"
  },
  {
    id: "knowledge",
    name: "Content & Knowledge",
    code: "11",
    description: "Engineering devlogs, case studies, technical glossary, and architectural guides.",
    badge: "CONTENT",
    color: "orange"
  },
  {
    id: "scale-ready",
    name: "Scale-Ready & Future Hub",
    code: "12",
    description: "Integration marketplace, app directory, open-source repos, experimental labs, and global scale.",
    badge: "SCALE",
    color: "fuchsia"
  }
];

export const ECOSYSTEM_PAGES = [
  // ==========================================
  // SECTION 1: PUBLIC / MAIN WEBSITE
  // ==========================================
  {
    title: "Home",
    href: "/",
    sectionId: "public",
    category: "Main Website",
    description: "DevSamp main entry point: brand positioning, products, services, and ecosystem CTA.",
    keywords: ["home", "main", "landing", "devsamp", "software", "ecosystem"],
    icon: "Home",
    badge: "ENTRY",
    featured: true
  },
  {
    title: "About DevSamp",
    href: "/about",
    sectionId: "public",
    category: "Main Website",
    description: "Company story, founders, engineering capabilities, and long-term vision.",
    keywords: ["about", "company", "story", "founders", "leadership", "craft"],
    icon: "Info",
    badge: "STORY",
    featured: true
  },
  {
    title: "Vision 2035",
    href: "/vision",
    sectionId: "public",
    category: "Main Website",
    description: "10–15 year roadmap: evolving DevSamp into a global software + SaaS ecosystem.",
    keywords: ["vision", "2035", "future", "roadmap", "strategy", "expansion"],
    icon: "Compass",
    badge: "2035",
    featured: true
  },
  {
    title: "Our Mission",
    href: "/mission",
    sectionId: "public",
    category: "Main Website",
    description: "Building reliable, scalable, and secure digital platforms for modern businesses.",
    keywords: ["mission", "purpose", "reliability", "standards", "values"],
    icon: "Target",
    badge: "CORE"
  },
  {
    title: "Why DevSamp",
    href: "/why-devsamp",
    sectionId: "public",
    category: "Main Website",
    description: "Trust, 100% in-house engineering, zero technical debt, and ecosystem advantages.",
    keywords: ["why", "advantages", "trust", "quality", "performance", "benefits"],
    icon: "ShieldCheck",
    badge: "ADVANTAGE",
    featured: true
  },
  {
    title: "Connected Ecosystem",
    href: "/ecosystem",
    sectionId: "public",
    category: "Main Website",
    description: "Live interactive map connecting products, services, accounts, developers, and partners.",
    keywords: ["ecosystem", "topology", "connected", "mesh", "architecture", "map"],
    icon: "Cpu",
    badge: "CORE",
    featured: true
  },
  {
    title: "Commercial Pricing",
    href: "/pricing",
    sectionId: "public",
    category: "Main Website",
    description: "Transparent pricing models for SaaS platforms, engineering pods, and enterprise tiers.",
    keywords: ["pricing", "plans", "cost", "subscription", "quotes", "tiers"],
    icon: "CreditCard",
    badge: "PLANS",
    featured: true
  },
  {
    title: "Customers & Clients",
    href: "/customers",
    sectionId: "public",
    category: "Main Website",
    description: "Enterprises, clinics, and startups powering their infrastructure with DevSamp.",
    keywords: ["customers", "clients", "organizations", "logos", "partners"],
    icon: "Users",
    badge: "CLIENTS"
  },
  {
    title: "Case Studies",
    href: "/case-studies",
    sectionId: "public",
    category: "Main Website",
    description: "Real-world engineering case studies with problem, solution, and impact analysis.",
    keywords: ["case studies", "projects", "portfolio", "outcomes", "results"],
    icon: "Briefcase",
    badge: "IMPACT",
    featured: true
  },
  {
    title: "Testimonials & Reviews",
    href: "/testimonials",
    sectionId: "public",
    category: "Main Website",
    description: "Verified customer reviews and feedback across healthcare, retail, and tech sectors.",
    keywords: ["testimonials", "reviews", "feedback", "ratings", "customer voice"],
    icon: "Sparkles",
    badge: "REVIEWS"
  },
  {
    title: "Engineering Devlogs & Blog",
    href: "/blog",
    sectionId: "public",
    category: "Main Website",
    description: "Technical articles, system designs, product releases, and software engineering deep-dives.",
    keywords: ["blog", "devlogs", "articles", "news", "engineering", "technical"],
    icon: "Rss",
    badge: "BLOG",
    featured: true
  },
  {
    title: "News & Announcements",
    href: "/news",
    sectionId: "public",
    category: "Main Website",
    description: "Official DevSamp company announcements, product launches, and quarterly updates.",
    keywords: ["news", "announcements", "press", "launches", "releases"],
    icon: "Bell",
    badge: "NEWS"
  },
  {
    title: "Careers & Engineering Pods",
    href: "/careers",
    sectionId: "public",
    category: "Main Website",
    description: "Join high-performance engineering pods building mission-critical software systems.",
    keywords: ["careers", "jobs", "hiring", "positions", "engineering", "culture"],
    icon: "Briefcase",
    badge: "HIRING",
    featured: true
  },
  {
    title: "Partners & Alliances",
    href: "/partners",
    sectionId: "public",
    category: "Main Website",
    description: "Technology alliances, system integration partners, and reseller channels.",
    keywords: ["partners", "alliances", "technology", "integrators", "resellers"],
    icon: "Handshake",
    badge: "PARTNERS"
  },
  {
    title: "Contact & Pod Inquiry",
    href: "/contact",
    sectionId: "public",
    category: "Main Website",
    description: "Direct routing to engineering leads, project architects, and partnership directors.",
    keywords: ["contact", "inquiry", "email", "phone", "support", "talk"],
    icon: "Mail",
    badge: "CONNECT",
    featured: true
  },
  {
    title: "Book a Demo",
    href: "/book-demo",
    sectionId: "public",
    category: "Main Website",
    description: "Schedule a live, interactive 1-on-1 walkthrough of any DevSamp software platform.",
    keywords: ["demo", "book", "schedule", "walkthrough", "preview", "live"],
    icon: "Calendar",
    badge: "DEMO",
    featured: true
  },
  {
    title: "Brand Assets & Media Kit",
    href: "/brand-assets",
    sectionId: "public",
    category: "Main Website",
    description: "Official logos, brand palettes, typography guidelines, and approved media assets.",
    keywords: ["brand", "assets", "logo", "media kit", "colors", "guidelines"],
    icon: "Palette",
    badge: "MEDIA"
  },
  {
    title: "Security Center",
    href: "/security",
    sectionId: "public",
    category: "Main Website",
    description: "Enterprise security architecture, encryption standards, SOC-2 readiness, and audits.",
    keywords: ["security", "encryption", "compliance", "soc2", "mfa", "audit"],
    icon: "ShieldCheck",
    badge: "SECURE"
  },
  {
    title: "Privacy Policy",
    href: "/privacy",
    sectionId: "public",
    category: "Main Website",
    description: "Comprehensive privacy standards, data sovereignty, and telemetry policies.",
    keywords: ["privacy", "gdpr", "data", "policy", "legal", "tracking"],
    icon: "Lock",
    badge: "LEGAL"
  },
  {
    title: "Terms of Service",
    href: "/terms",
    sectionId: "public",
    category: "Main Website",
    description: "Master service agreement, SLA terms, software licensing, and acceptable use policy.",
    keywords: ["terms", "sla", "service agreement", "legal", "contracts"],
    icon: "FileText",
    badge: "LEGAL"
  },
  {
    title: "Cookie Policy",
    href: "/cookie-policy",
    sectionId: "public",
    category: "Main Website",
    description: "Information regarding cookie usage, analytics cookies, and consent management.",
    keywords: ["cookies", "tracking", "consent", "analytics", "privacy"],
    icon: "Cookie",
    badge: "LEGAL"
  },
  {
    title: "Accessibility Statement",
    href: "/accessibility",
    sectionId: "public",
    category: "Main Website",
    description: "Commitment to WCAG 2.1 AA accessibility standards across all platforms.",
    keywords: ["accessibility", "a11y", "wcag", "inclusive", "standards"],
    icon: "Eye",
    badge: "A11Y"
  },
  {
    title: "Platform Status & Uptime",
    href: "/status",
    sectionId: "public",
    category: "Main Website",
    description: "Real-time service health, cluster latency, scheduled maintenance, and incidents.",
    keywords: ["status", "uptime", "health", "incidents", "latency", "maintenance"],
    icon: "Activity",
    badge: "LIVE",
    featured: true
  },
  {
    title: "Ecosystem Sitemap",
    href: "/sitemap",
    sectionId: "public",
    category: "Main Website",
    description: "Complete indexed tree of every public URL and resource in the DevSamp network.",
    keywords: ["sitemap", "directory", "index", "all pages", "navigation"],
    icon: "Network",
    badge: "DIRECTORY"
  },

  // ==========================================
  // SECTION 2: PRODUCTS HUB
  // ==========================================
  {
    title: "Products Catalog",
    href: "/products",
    sectionId: "products-hub",
    category: "Products Hub",
    description: "Searchable and filterable master catalog of proprietary DevSamp software platforms.",
    keywords: ["products", "catalog", "software", "saas", "solutions", "apps"],
    icon: "Boxes",
    badge: "HUB",
    featured: true
  },
  {
    title: "Product Categories",
    href: "/products/categories",
    sectionId: "products-hub",
    category: "Products Hub",
    description: "Explore software by domain: Healthcare ERP, Retail POS, HRMS, CRM, and AI workflows.",
    keywords: ["categories", "erp", "pos", "crm", "hrms", "ai", "finance"],
    icon: "Layers",
    badge: "DOMAINS"
  },
  {
    title: "Product Comparison Matrix",
    href: "/products/compare",
    sectionId: "products-hub",
    category: "Products Hub",
    description: "Side-by-side feature, entitlement, and architectural comparison between platforms.",
    keywords: ["compare", "matrix", "features", "comparison", "plans", "versus"],
    icon: "Scale",
    badge: "COMPARE"
  },
  {
    title: "Product Roadmap",
    href: "/products/roadmap",
    sectionId: "products-hub",
    category: "Products Hub",
    description: "Public feature pipeline, quarterly milestones, and upcoming ecosystem capabilities.",
    keywords: ["roadmap", "pipeline", "features", "quarterly", "milestones", "upcoming"],
    icon: "Flag",
    badge: "ROADMAP",
    featured: true
  },
  {
    title: "Product Changelog",
    href: "/products/changelog",
    sectionId: "products-hub",
    category: "Products Hub",
    description: "Version releases, security patches, new capabilities, and performance optimizations.",
    keywords: ["changelog", "releases", "versions", "updates", "fixes", "patches"],
    icon: "History",
    badge: "UPDATES"
  },
  {
    title: "Product Integrations",
    href: "/products/integrations",
    sectionId: "products-hub",
    category: "Products Hub",
    description: "Pre-built connectors for payment gateways, WhatsApp, ERPs, CRMs, and webhooks.",
    keywords: ["integrations", "connectors", "webhooks", "plugins", "third-party", "apis"],
    icon: "Workflow",
    badge: "CONNECT"
  },

  // ==========================================
  // SECTION 3: PRODUCT TEMPLATES (MEDERP & FUTURE PRODUCTS)
  // ==========================================
  {
    title: "MedERP Pro Clinical Suite",
    href: "/products/mederp-pro",
    sectionId: "product-template",
    category: "Flagship Software",
    description: "Flagship hospital, clinic, diagnostic, and pharmacy management ERP system.",
    keywords: ["mederp", "mederp pro", "hospital", "clinic", "pharmacy", "healthcare"],
    icon: "Activity",
    badge: "FLAGSHIP",
    featured: true
  },
  {
    title: "MedERP Pro - Features",
    href: "/products/mederp-pro?view=features",
    sectionId: "product-template",
    category: "Flagship Software",
    description: "Deep dive into OPD, IPD, OT, Laboratory, Pathology, Pharmacy, and Billing modules.",
    keywords: ["mederp features", "opd", "ipd", "pharmacy", "laboratory", "billing"],
    icon: "Sparkles",
    badge: "MODULES"
  },
  {
    title: "MedERP Pro - Use Cases",
    href: "/products/mederp-pro?view=use-cases",
    sectionId: "product-template",
    category: "Flagship Software",
    description: "How multi-specialty hospitals, chain diagnostic labs, and daycare centers scale.",
    keywords: ["use cases", "hospitals", "chains", "diagnostics", "multi-branch"],
    icon: "CheckCircle2",
    badge: "SCENARIOS"
  },
  {
    title: "MedERP Pro - Pricing & Plans",
    href: "/products/mederp-pro?view=pricing",
    sectionId: "product-template",
    category: "Flagship Software",
    description: "Cloud tier, multi-branch clinic tier, and custom private on-premise deployments.",
    keywords: ["mederp pricing", "hospital erp cost", "plans", "licensing"],
    icon: "CreditCard",
    badge: "PRICING"
  },
  {
    title: "MedERP Pro - Interactive Demo",
    href: "/products/mederp-pro?view=demo",
    sectionId: "product-template",
    category: "Flagship Software",
    description: "Live interactive preview with sample patient records and billing simulations.",
    keywords: ["mederp demo", "live preview", "walkthrough", "screenshots", "sandbox"],
    icon: "Eye",
    badge: "DEMO"
  },

  // ==========================================
  // SECTION 4: SERVICES
  // ==========================================
  {
    title: "Services Overview",
    href: "/services",
    sectionId: "services",
    category: "Engineering Services",
    description: "Comprehensive overview of dedicated senior software pods and custom capabilities.",
    keywords: ["services", "engineering", "custom software", "development", "consulting"],
    icon: "Code2",
    badge: "SERVICES",
    featured: true
  },
  {
    title: "Fullstack Web Development",
    href: "/services/web-development",
    sectionId: "services",
    category: "Engineering Services",
    description: "Modern SSR/SSG platforms built with Next.js 15, React, Node.js, and high-speed edge caching.",
    keywords: ["web development", "nextjs", "react", "frontend", "ssr", "edge"],
    icon: "Globe",
    badge: "WEB",
    featured: true
  },
  {
    title: "Multi-Tenant SaaS Engineering",
    href: "/services/saas-development",
    sectionId: "services",
    category: "Engineering Services",
    description: "Cloud architectures engineered for multi-tenant isolation, RBAC, and subscription metering.",
    keywords: ["saas", "multitenant", "cloud", "software as a service", "tenants"],
    icon: "Layers",
    badge: "SaaS",
    featured: true
  },
  {
    title: "Mobile App Development",
    href: "/services/mobile-app-development",
    sectionId: "services",
    category: "Engineering Services",
    description: "High-performance iOS and Android applications with offline sync and 60fps animations.",
    keywords: ["mobile app", "ios", "android", "react native", "flutter", "apps"],
    icon: "Smartphone",
    badge: "MOBILE",
    featured: true
  },
  {
    title: "UI/UX & Design Systems",
    href: "/services/ui-ux-design",
    sectionId: "services",
    category: "Engineering Services",
    description: "World-class design tokens, interactive prototypes, and atomic design systems.",
    keywords: ["ui ux", "design", "figma", "design system", "prototype", "interaction"],
    icon: "Sparkles",
    badge: "DESIGN"
  },
  {
    title: "AI Solutions & Neural Workflows",
    href: "/services/ai-solutions",
    sectionId: "services",
    category: "Engineering Services",
    description: "LLM integration, automated agent workflows, semantic search, and predictive models.",
    keywords: ["ai", "machine learning", "llm", "automation", "rag", "agents"],
    icon: "Brain",
    badge: "AI",
    featured: true
  },
  {
    title: "Business Process Automation",
    href: "/services/automation",
    sectionId: "services",
    category: "Engineering Services",
    description: "End-to-end webhook triggers, automated data reconciliations, and ERP sync pipelines.",
    keywords: ["automation", "workflows", "pipelines", "reconciliation", "sync", "bot"],
    icon: "Zap",
    badge: "AUTO"
  },
  {
    title: "API & Backend Architecture",
    href: "/services/api-backend-development",
    sectionId: "services",
    category: "Engineering Services",
    description: "Low-latency REST and GraphQL gateways, microservices, and database clustering.",
    keywords: ["api", "backend", "microservices", "database", "graphql", "rest"],
    icon: "Terminal",
    badge: "API"
  },
  {
    title: "Cloud & DevOps Infrastructure",
    href: "/services/cloud-deployment",
    sectionId: "services",
    category: "Engineering Services",
    description: "Zero-downtime CI/CD pipelines, Docker/Kubernetes container clusters, and AWS/GCP setups.",
    keywords: ["cloud", "devops", "aws", "gcp", "docker", "kubernetes", "ci cd"],
    icon: "Cloud",
    badge: "CLOUD"
  },
  {
    title: "Maintenance & 24/7 Support",
    href: "/services/maintenance-support",
    sectionId: "services",
    category: "Engineering Services",
    description: "SLA-backed uptime guarantees, continuous security patching, and monitoring.",
    keywords: ["maintenance", "support", "sla", "monitoring", "patches", "uptime"],
    icon: "ShieldAlert",
    badge: "SUPPORT"
  },
  {
    title: "Custom Enterprise Software",
    href: "/services/custom-software",
    sectionId: "services",
    category: "Engineering Services",
    description: "Tailored enterprise solutions built from the ground up to solve bespoke operational bottlenecks.",
    keywords: ["custom software", "enterprise", "bespoke", "tailored", "solutions"],
    icon: "Cpu",
    badge: "CUSTOM"
  },
  {
    title: "Service Engineering Process",
    href: "/services/process",
    sectionId: "services",
    category: "Engineering Services",
    description: "Our 6-stage engineering lifecycle: Discovery -> Design -> Build -> Test -> Launch -> Retainer.",
    keywords: ["process", "lifecycle", "stages", "agile", "workflow", "delivery"],
    icon: "Workflow",
    badge: "PROCESS"
  },
  {
    title: "Service Pricing & Retainers",
    href: "/services/pricing",
    sectionId: "services",
    category: "Engineering Services",
    description: "Dedicated pod retainer tiers, fixed-scope sprints, and custom quotation estimator.",
    keywords: ["service pricing", "retainer", "costs", "calculator", "quotes", "packages"],
    icon: "CreditCard",
    badge: "PACKAGES"
  },

  // ==========================================
  // SECTION 5: CUSTOMER PORTAL / ACCOUNT
  // ==========================================
  {
    title: "Customer Account Dashboard",
    href: "/account",
    sectionId: "customer-portal",
    category: "Customer Portal",
    description: "Centralized client management console: active licenses, pod retainers, and subscriptions.",
    keywords: ["account", "dashboard", "portal", "client", "subscriptions", "my products"],
    icon: "LayoutDashboard",
    badge: "PORTAL",
    featured: true
  },
  {
    title: "My Subscribed Products",
    href: "/account/products",
    sectionId: "customer-portal",
    category: "Customer Portal",
    description: "Manage deployed software instances, branch licenses, and tenant domains.",
    keywords: ["my products", "instances", "deployments", "licenses", "apps"],
    icon: "Boxes",
    badge: "LICENSES"
  },
  {
    title: "Subscriptions & Plans",
    href: "/account/subscriptions",
    sectionId: "customer-portal",
    category: "Customer Portal",
    description: "Active plan renewals, upgrade options, tier limits, and billing cycle dates.",
    keywords: ["subscriptions", "renewals", "upgrades", "tiers", "billing cycle"],
    icon: "CreditCard",
    badge: "BILLING"
  },
  {
    title: "Billing & Invoices",
    href: "/account/invoices",
    sectionId: "customer-portal",
    category: "Customer Portal",
    description: "Payment methods, tax invoices, GST downloads, and receipts history.",
    keywords: ["billing", "invoices", "receipts", "gst", "payments", "downloads"],
    icon: "FileText",
    badge: "INVOICES"
  },
  {
    title: "Downloads & Releases",
    href: "/account/downloads",
    sectionId: "customer-portal",
    category: "Customer Portal",
    description: "Desktop installers, local backup utilities, mobile APKs, and resource files.",
    keywords: ["downloads", "installers", "backup", "apk", "tools", "files"],
    icon: "Download",
    badge: "FILES"
  },
  {
    title: "Support Tickets",
    href: "/account/tickets",
    sectionId: "customer-portal",
    category: "Customer Portal",
    description: "Submit urgent support tickets, track resolution status, and chat with pod engineers.",
    keywords: ["tickets", "support", "helpdesk", "issues", "bugs", "resolution"],
    icon: "LifeBuoy",
    badge: "TICKETS",
    featured: true
  },
  {
    title: "Team & Permissions (RBAC)",
    href: "/account/team",
    sectionId: "customer-portal",
    category: "Customer Portal",
    description: "Invite organization members, configure Owner/Admin/Viewer roles, and manage access.",
    keywords: ["team", "members", "rbac", "roles", "permissions", "invite"],
    icon: "Users",
    badge: "ACCESS"
  },
  {
    title: "Developer API Keys",
    href: "/account/api-keys",
    sectionId: "customer-portal",
    category: "Customer Portal",
    description: "Generate and rotate live and sandbox API credentials for third-party integrations.",
    keywords: ["api keys", "credentials", "tokens", "secrets", "developer", "auth"],
    icon: "Key",
    badge: "KEYS"
  },
  {
    title: "Security & MFA Settings",
    href: "/account/security",
    sectionId: "customer-portal",
    category: "Customer Portal",
    description: "Two-factor authentication (2FA), active login sessions, and password management.",
    keywords: ["security settings", "mfa", "2fa", "sessions", "password", "audit"],
    icon: "ShieldCheck",
    badge: "SECURITY"
  },
  {
    title: "Audit & Activity Log",
    href: "/account/audit-log",
    sectionId: "customer-portal",
    category: "Customer Portal",
    description: "Immutable organization audit log tracking logins, permissions changes, and exports.",
    keywords: ["audit log", "activity", "events", "history", "security log"],
    icon: "History",
    badge: "AUDIT"
  },

  // ==========================================
  // SECTION 6: SUPPORT CENTER
  // ==========================================
  {
    title: "Help Center Home",
    href: "/support",
    sectionId: "support-center",
    category: "Support Center",
    description: "Search-first customer support portal, documentation guides, and instant troubleshooting.",
    keywords: ["support", "help center", "knowledge base", "guides", "faq"],
    icon: "HelpCircle",
    badge: "SUPPORT",
    featured: true
  },
  {
    title: "Getting Started Guides",
    href: "/support/getting-started",
    sectionId: "support-center",
    category: "Support Center",
    description: "Step-by-step onboarding walkthroughs for first-time administrators and pod partners.",
    keywords: ["getting started", "onboarding", "setup", "quickstart", "first steps"],
    icon: "BookOpen",
    badge: "GUIDES"
  },
  {
    title: "Product Task Guides",
    href: "/support/guides",
    sectionId: "support-center",
    category: "Support Center",
    description: "Task-based manuals for billing, patient admission, inventory reconciliation, and reporting.",
    keywords: ["guides", "manuals", "tasks", "tutorials", "documentation", "how to"],
    icon: "FileText",
    badge: "DOCS"
  },
  {
    title: "Frequently Asked Questions",
    href: "/support/faqs",
    sectionId: "support-center",
    category: "Support Center",
    description: "Quick answers to common questions about deployment, data safety, and subscriptions.",
    keywords: ["faq", "frequently asked questions", "answers", "questions", "help"],
    icon: "MessageSquare",
    badge: "FAQS",
    featured: true
  },
  {
    title: "Troubleshooting & Fixes",
    href: "/support/troubleshooting",
    sectionId: "support-center",
    category: "Support Center",
    description: "Known edge cases, sync recovery instructions, printer setup, and error code fixes.",
    keywords: ["troubleshooting", "errors", "fixes", "debugging", "issues"],
    icon: "Wrench",
    badge: "FIXES"
  },
  {
    title: "Video Tutorials",
    href: "/support/videos",
    sectionId: "support-center",
    category: "Support Center",
    description: "High-definition video walkthroughs explaining advanced features and workflows.",
    keywords: ["videos", "tutorials", "walkthroughs", "screencasts", "youtube"],
    icon: "Video",
    badge: "VIDEOS"
  },
  {
    title: "Contact Support Pod",
    href: "/support/contact",
    sectionId: "support-center",
    category: "Support Center",
    description: "Reach our dedicated technical support specialists via ticket, phone, or WhatsApp.",
    keywords: ["contact support", "helpdesk", "phone", "whatsapp", "assistance"],
    icon: "PhoneCall",
    badge: "ASSIST"
  },
  {
    title: "DevSamp Community",
    href: "/community",
    sectionId: "support-center",
    category: "Support Center",
    description: "Connect with fellow software builders, healthcare operators, and product architects.",
    keywords: ["community", "forum", "discussions", "discord", "exchange", "users"],
    icon: "Users",
    badge: "COMMUNITY"
  },

  // ==========================================
  // SECTION 7: DEVELOPER PORTAL
  // ==========================================
  {
    title: "Developer Portal Home",
    href: "/developers",
    sectionId: "developer-portal",
    category: "Developer Portal",
    description: "Developer headquarters: technical documentation, API specifications, and SDK packages.",
    keywords: ["developers", "api", "docs", "sdks", "webhooks", "integration"],
    icon: "Terminal",
    badge: "DEV HUB",
    featured: true
  },
  {
    title: "API Reference & Endpoints",
    href: "/developers/api-reference",
    sectionId: "developer-portal",
    category: "Developer Portal",
    description: "Interactive OpenAPI/Swagger documentation with cURL and JavaScript code examples.",
    keywords: ["api reference", "endpoints", "swagger", "openapi", "rest", "requests"],
    icon: "Code",
    badge: "REST API",
    featured: true
  },
  {
    title: "Developer Quickstart",
    href: "/developers/quickstart",
    sectionId: "developer-portal",
    category: "Developer Portal",
    description: "Make your first authenticated DevSamp API call in under 3 minutes.",
    keywords: ["quickstart", "fast onboarding", "first call", "setup", "tutorial"],
    icon: "Zap",
    badge: "QUICKSTART"
  },
  {
    title: "Authentication & OAuth2",
    href: "/developers/authentication",
    sectionId: "developer-portal",
    category: "Developer Portal",
    description: "API Key headers, Bearer tokens, OAuth2 authorization flows, and token refresh logic.",
    keywords: ["authentication", "oauth", "jwt", "bearer token", "api key", "auth"],
    icon: "Lock",
    badge: "AUTH"
  },
  {
    title: "Client SDKs & Libraries",
    href: "/developers/sdks",
    sectionId: "developer-portal",
    category: "Developer Portal",
    description: "Official client libraries for Node.js, Python, React, Go, and Flutter.",
    keywords: ["sdks", "libraries", "npm", "python", "golang", "react", "packages"],
    icon: "Boxes",
    badge: "SDKS",
    featured: true
  },
  {
    title: "Webhooks & Event Bus",
    href: "/developers/webhooks",
    sectionId: "developer-portal",
    category: "Developer Portal",
    description: "Listen to real-time events: patient admitted, payment settled, invoice created, inventory low.",
    keywords: ["webhooks", "events", "listener", "payloads", "signatures", "http post"],
    icon: "Activity",
    badge: "EVENTS"
  },
  {
    title: "DevSamp CLI Tools",
    href: "/developers/cli",
    sectionId: "developer-portal",
    category: "Developer Portal",
    description: "Command-line interface to scaffold integrations, test webhooks, and sync schemas.",
    keywords: ["cli", "terminal", "command line", "tools", "scaffold"],
    icon: "Terminal",
    badge: "CLI"
  },
  {
    title: "Rate Limits & Quotas",
    href: "/developers/rate-limits",
    sectionId: "developer-portal",
    category: "Developer Portal",
    description: "API throttling limits, bucket token algorithms, and high-throughput quotas.",
    keywords: ["rate limits", "quotas", "throttling", "headers", "limits"],
    icon: "Gauge",
    badge: "LIMITS"
  },
  {
    title: "Error Codes & Troubleshooting",
    href: "/developers/errors",
    sectionId: "developer-portal",
    category: "Developer Portal",
    description: "Standard HTTP status codes, error payload schemas, and resolution guides.",
    keywords: ["error codes", "http errors", "debugging", "status 400", "status 500"],
    icon: "AlertTriangle",
    badge: "ERRORS"
  },
  {
    title: "API Migration Guides",
    href: "/developers/migration",
    sectionId: "developer-portal",
    category: "Developer Portal",
    description: "Breaking changes, deprecated fields, and smooth version upgrade walkthroughs.",
    keywords: ["migration", "upgrades", "breaking changes", "versioning", "v1 to v2"],
    icon: "RefreshCw",
    badge: "MIGRATION"
  },

  // ==========================================
  // SECTION 8: ECOSYSTEM CORE / PLATFORM
  // ==========================================
  {
    title: "Ecosystem Platform Core",
    href: "/platform",
    sectionId: "platform-core",
    category: "Platform Core",
    description: "The underlying architecture powering all DevSamp software: unified identity and event bus.",
    keywords: ["platform", "core", "architecture", "foundation", "mesh"],
    icon: "Cpu",
    badge: "PLATFORM",
    featured: true
  },
  {
    title: "Central Identity & Auth",
    href: "/platform/identity",
    sectionId: "platform-core",
    category: "Platform Core",
    description: "One single identity layer granting seamless access across all subscribed DevSamp software.",
    keywords: ["identity", "sso", "single sign on", "central auth", "accounts"],
    icon: "ShieldCheck",
    badge: "SSO"
  },
  {
    title: "Organizations & Multi-Tenancy",
    href: "/platform/tenants",
    sectionId: "platform-core",
    category: "Platform Core",
    description: "Complete tenant isolation, customizable subdomains, and organization hierarchies.",
    keywords: ["tenants", "organizations", "isolation", "subdomains", "multi-tenant"],
    icon: "Building2",
    badge: "TENANTS"
  },
  {
    title: "Roles & Permissions Engine",
    href: "/platform/roles",
    sectionId: "platform-core",
    category: "Platform Core",
    description: "Granular RBAC model controlling module access, record visibility, and actions.",
    keywords: ["roles", "rbac", "permissions", "acl", "access control"],
    icon: "Lock",
    badge: "RBAC"
  },
  {
    title: "Product Entitlements",
    href: "/platform/entitlements",
    sectionId: "platform-core",
    category: "Platform Core",
    description: "Feature flag gating, license provisioning, and automated capability unlocks.",
    keywords: ["entitlements", "licensing", "feature flags", "provisioning"],
    icon: "Key",
    badge: "ACCESS"
  },
  {
    title: "Central Subscriptions & Billing",
    href: "/platform/billing",
    sectionId: "platform-core",
    category: "Platform Core",
    description: "Unified billing abstraction layer decoupling payment gateways from business apps.",
    keywords: ["billing platform", "subscription engine", "invoicing", "metering"],
    icon: "CreditCard",
    badge: "BILLING"
  },
  {
    title: "Ecosystem Analytics & Telemetry",
    href: "/platform/analytics",
    sectionId: "platform-core",
    category: "Platform Core",
    description: "Real-time usage metrics, cluster load, active user sessions, and error telemetry.",
    keywords: ["analytics", "telemetry", "metrics", "usage", "monitoring"],
    icon: "BarChart3",
    badge: "METRICS"
  },
  {
    title: "Feature Flags & Gradual Rollouts",
    href: "/platform/feature-flags",
    sectionId: "platform-core",
    category: "Platform Core",
    description: "A/B testing, canary deployments, and zero-downtime feature rollouts.",
    keywords: ["feature flags", "canary", "rollouts", "ab testing", "switches"],
    icon: "Sliders",
    badge: "FLAGS"
  },
  {
    title: "Integrations & Webhook Hub",
    href: "/platform/integrations-hub",
    sectionId: "platform-core",
    category: "Platform Core",
    description: "Centralized routing mesh dispatching webhooks and bidirectional data syncs.",
    keywords: ["integrations hub", "event bus", "mesh", "dispatcher", "sync"],
    icon: "Workflow",
    badge: "MESH"
  },
  {
    title: "Audit & Compliance Engine",
    href: "/platform/compliance",
    sectionId: "platform-core",
    category: "Platform Core",
    description: "Immutable cryptographically signed audit records adhering to compliance standards.",
    keywords: ["compliance", "audit", "security logs", "immutable", "governance"],
    icon: "ShieldAlert",
    badge: "GOVERNANCE"
  },

  // ==========================================
  // SECTION 9: COMPANY
  // ==========================================
  {
    title: "Company Overview",
    href: "/company",
    sectionId: "company",
    category: "Company",
    description: "Official DevSamp overview, founding principles, engineering pods, and executive story.",
    keywords: ["company", "overview", "about", "mission", "founding"],
    icon: "Building2",
    badge: "CORP"
  },
  {
    title: "Engineering Pods & Leadership",
    href: "/about#leadership",
    sectionId: "company",
    category: "Company",
    description: "Meet the senior architects, system engineers, and product designers behind DevSamp.",
    keywords: ["leadership", "team", "founders", "architects", "engineers"],
    icon: "Users",
    badge: "LEADERSHIP",
    featured: true
  },
  {
    title: "Company Culture & Values",
    href: "/culture",
    sectionId: "company",
    category: "Company",
    description: "Extreme craftsmanship, zero technical debt, direct ownership, and engineering excellence.",
    keywords: ["culture", "values", "craftsmanship", "engineering ethos"],
    icon: "Heart",
    badge: "CULTURE"
  },
  {
    title: "Internships & Apprenticeships",
    href: "/careers/internships",
    sectionId: "company",
    category: "Company",
    description: "Elite training ground for student developers and junior architects to build real software.",
    keywords: ["internships", "apprenticeships", "students", "training", "junior engineers"],
    icon: "GraduationCap",
    badge: "PROGRAM"
  },
  {
    title: "Press & Media Resources",
    href: "/press",
    sectionId: "company",
    category: "Company",
    description: "Official press releases, brand guidelines, media contacts, and executive bios.",
    keywords: ["press", "media", "pr", "newsroom", "assets", "contacts"],
    icon: "Newspaper",
    badge: "PRESS"
  },
  {
    title: "Webinars & Ecosystem Events",
    href: "/events",
    sectionId: "company",
    category: "Company",
    description: "Join upcoming live engineering deep-dives, product keynote launches, and meetups.",
    keywords: ["events", "webinars", "keynotes", "meetups", "livestreams"],
    icon: "Calendar",
    badge: "EVENTS"
  },
  {
    title: "Partner Ecosystem Program",
    href: "/partners/portal",
    sectionId: "company",
    category: "Company",
    description: "Implementation, referral, and reseller partner tiers with revenue share benefits.",
    keywords: ["partner portal", "reseller", "referral", "affiliate", "commissions"],
    icon: "Handshake",
    badge: "ALLIANCE"
  },

  // ==========================================
  // SECTION 10: TRUST, SECURITY & LEGAL
  // ==========================================
  {
    title: "Security Practices & Standards",
    href: "/security/practices",
    sectionId: "trust-legal",
    category: "Trust & Legal",
    description: "AES-256 encryption at rest, TLS 1.3 in transit, role separation, and vulnerability scans.",
    keywords: ["security practices", "encryption", "tls", "aes256", "vulnerability"],
    icon: "ShieldCheck",
    badge: "SECURITY"
  },
  {
    title: "Responsible Disclosure",
    href: "/security/responsible-disclosure",
    sectionId: "trust-legal",
    category: "Trust & Legal",
    description: "Security vulnerability reporting protocol, PGP keys, and bug bounty guidelines.",
    keywords: ["responsible disclosure", "bug bounty", "vulnerability report", "security bug"],
    icon: "Bug",
    badge: "BOUNTY"
  },
  {
    title: "Data Processing Agreement (DPA)",
    href: "/legal/dpa",
    sectionId: "trust-legal",
    category: "Trust & Legal",
    description: "Standard data protection agreement covering GDPR, HIPAA, and Indian DPDP compliance.",
    keywords: ["dpa", "data processing", "gdpr", "hipaa", "dpdp", "compliance"],
    icon: "FileCheck",
    badge: "DPA"
  },
  {
    title: "Authorized Subprocessors",
    href: "/legal/subprocessors",
    sectionId: "trust-legal",
    category: "Trust & Legal",
    description: "Transparent listing of cloud hosting, CDN, and payment processing infrastructure providers.",
    keywords: ["subprocessors", "cloud infrastructure", "vendors", "third-parties"],
    icon: "Server",
    badge: "VENDORS"
  },
  {
    title: "Compliance & Certifications",
    href: "/compliance",
    sectionId: "trust-legal",
    category: "Trust & Legal",
    description: "Verified certifications, data residency standards, and operational audit reports.",
    keywords: ["compliance", "certifications", "iso", "soc2", "hipaa", "audit report"],
    icon: "Award",
    badge: "AUDIT"
  },

  // ==========================================
  // SECTION 11: CONTENT / KNOWLEDGE
  // ==========================================
  {
    title: "Technical Engineering Articles",
    href: "/blog/engineering",
    sectionId: "knowledge",
    category: "Content & Knowledge",
    description: "Deep-dives into database indexing, distributed locking, Next.js caching, and cloud mesh.",
    keywords: ["engineering blog", "system design", "architecture articles", "coding"],
    icon: "Cpu",
    badge: "TECH"
  },
  {
    title: "Product Release Notes",
    href: "/updates",
    sectionId: "knowledge",
    category: "Content & Knowledge",
    description: "Comprehensive release notes and feature write-ups for every software update.",
    keywords: ["release notes", "updates", "features", "launches"],
    icon: "BellRing",
    badge: "RELEASES"
  },
  {
    title: "Business & Digital Guides",
    href: "/guides",
    sectionId: "knowledge",
    category: "Content & Knowledge",
    description: "Actionable guides on clinic digitization, retail inventory optimization, and SaaS scaling.",
    keywords: ["guides", "playbooks", "handbooks", "strategies", "whitepapers"],
    icon: "BookMarked",
    badge: "GUIDES"
  },
  {
    title: "Technology Glossary",
    href: "/glossary",
    sectionId: "knowledge",
    category: "Content & Knowledge",
    description: "A-Z encyclopedia of modern SaaS, healthcare IT, and cloud architecture terminology.",
    keywords: ["glossary", "terms", "definitions", "dictionary", "saas terms"],
    icon: "HelpCircle",
    badge: "A-Z"
  },
  {
    title: "Resources & Checklists",
    href: "/resources",
    sectionId: "knowledge",
    category: "Content & Knowledge",
    description: "Downloadable architecture blueprints, hospital audit checklists, and RFP templates.",
    keywords: ["resources", "checklists", "templates", "blueprints", "rfp"],
    icon: "FolderDown",
    badge: "FREE"
  },
  {
    title: "Engineering Newsletter",
    href: "/newsletter",
    sectionId: "knowledge",
    category: "Content & Knowledge",
    description: "Monthly dispatch covering architectural patterns, SaaS trends, and internal breakthroughs.",
    keywords: ["newsletter", "subscribe", "digest", "monthly update", "dispatch"],
    icon: "Mail",
    badge: "MONTHLY"
  },

  // ==========================================
  // SECTION 12: FUTURE / SCALE-READY PAGES
  // ==========================================
  {
    title: "DevSamp Marketplace",
    href: "/marketplace",
    sectionId: "scale-ready",
    category: "Scale-Ready Hub",
    description: "Discover community apps, verified extensions, ERP themes, and plug-in connectors.",
    keywords: ["marketplace", "extensions", "plugins", "addons", "store"],
    icon: "ShoppingBag",
    badge: "ECOSYSTEM",
    featured: true
  },
  {
    title: "App & Integrations Directory",
    href: "/apps",
    sectionId: "scale-ready",
    category: "Scale-Ready Hub",
    description: "Searchable directory of verified third-party connectors and certified ecosystem tools.",
    keywords: ["app directory", "integrations", "tools", "connectors", "ecosystem apps"],
    icon: "Grid",
    badge: "APPS"
  },
  {
    title: "Affiliate & Referral Program",
    href: "/affiliate",
    sectionId: "scale-ready",
    category: "Scale-Ready Hub",
    description: "Earn recurring commissions by referring businesses and hospitals to DevSamp software.",
    keywords: ["affiliate", "referral", "commissions", "partner", "earn"],
    icon: "DollarSign",
    badge: "REWARDS"
  },
  {
    title: "Open Source Projects",
    href: "/open-source",
    sectionId: "scale-ready",
    category: "Scale-Ready Hub",
    description: "Our open-source UI libraries, database utilities, and developer tooling contributions.",
    keywords: ["open source", "github", "oss", "libraries", "tools", "community code"],
    icon: "Github",
    badge: "OSS"
  },
  {
    title: "DevSamp Labs (R&D)",
    href: "/labs",
    sectionId: "scale-ready",
    category: "Scale-Ready Hub",
    description: "Experimental prototypes, edge AI agents, and emerging hardware-software experiments.",
    keywords: ["labs", "experimental", "r&d", "research", "prototypes", "innovation"],
    icon: "FlaskConical",
    badge: "LABS",
    featured: true
  },
  {
    title: "Investor & Corporate Relations",
    href: "/investors",
    sectionId: "scale-ready",
    category: "Scale-Ready Hub",
    description: "Long-term vision deck, governance model, financial growth, and ecosystem roadmap.",
    keywords: ["investors", "corporate", "shareholders", "governance", "funding"],
    icon: "TrendingUp",
    badge: "CORP"
  },
  {
    title: "Global & Regional Availability",
    href: "/global",
    sectionId: "scale-ready",
    category: "Scale-Ready Hub",
    description: "Multi-region cloud nodes, local payment gateway support, and localization languages.",
    keywords: ["global", "regions", "datacenters", "localization", "languages"],
    icon: "Globe",
    badge: "GLOBAL"
  },
  {
    title: "Enterprise Custom Deployments",
    href: "/enterprise",
    sectionId: "scale-ready",
    category: "Scale-Ready Hub",
    description: "Dedicated single-tenant infrastructure, air-gapped private cloud, and custom SLA pods.",
    keywords: ["enterprise", "private cloud", "dedicated cluster", "air gapped", "sla"],
    icon: "ShieldAlert",
    badge: "ENTERPRISE",
    featured: true
  }
];

/**
 * Ecosystem Portals Switcher list
 */
export const ECOSYSTEM_PORTALS = [
  {
    id: "public",
    name: "DevSamp Public Website",
    badge: "MAIN HUB",
    href: "/",
    desc: "Brand positioning, software catalog, and engineering services.",
    icon: "Globe",
    activeMatch: ["/", "/about", "/vision", "/mission", "/why-devsamp", "/pricing", "/customers", "/contact", "/case-studies"]
  },
  {
    id: "products",
    name: "Products & Templates Hub",
    badge: "SOFTWARE",
    href: "/products",
    desc: "MedERP Pro, FlowPulse POS, and modular SaaS products.",
    icon: "Boxes",
    activeMatch: ["/products", "/products/categories", "/products/compare", "/products/roadmap", "/products/changelog", "/products/mederp-pro"]
  },
  {
    id: "services",
    name: "Engineering Services Hub",
    badge: "SERVICES",
    href: "/services",
    desc: "Fullstack Web, SaaS, Mobile, AI solutions, and dedicated pods.",
    icon: "Code2",
    activeMatch: ["/services", "/services/process", "/services/pricing", "/services/web-development", "/services/saas-development"]
  },
  {
    id: "developers",
    name: "Developer Portal",
    badge: "DEV HUB",
    href: "/developers",
    desc: "REST APIs, Webhook events, client SDKs, and CLI tools.",
    icon: "Terminal",
    activeMatch: ["/developers", "/docs", "/developers/api-reference", "/developers/sdks", "/developers/webhooks"]
  },
  {
    id: "portal",
    name: "Customer Account Portal",
    badge: "CLIENT CONSOLE",
    href: "/account",
    desc: "Manage deployed software, branch licenses, billing, and tickets.",
    icon: "LayoutDashboard",
    activeMatch: ["/account", "/dashboard", "/account/products", "/account/subscriptions", "/account/invoices", "/account/tickets"]
  },
  {
    id: "support",
    name: "Support & Help Center",
    badge: "HELP DESK",
    href: "/support",
    desc: "Knowledge base, getting started guides, troubleshooting, and FAQs.",
    icon: "LifeBuoy",
    activeMatch: ["/support", "/support/getting-started", "/support/guides", "/support/faqs", "/community"]
  },
  {
    id: "platform",
    name: "Platform Core Architecture",
    badge: "ECOSYSTEM MESH",
    href: "/platform",
    desc: "Shared multi-tenant identity, RBAC, billing, and telemetry.",
    icon: "Cpu",
    activeMatch: ["/platform", "/platform/identity", "/platform/tenants", "/platform/roles", "/platform/billing"]
  }
];
