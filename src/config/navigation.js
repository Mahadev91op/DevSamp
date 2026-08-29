/**
 * Centralized Navigation Configuration for DevSamp Ecosystem
 * Scalable Information Architecture: Products, Services, Industries, Company, Resources, Pricing + CTA.
 * Single Source of Truth for Desktop Navbar, Mega Menus, Mobile Accordions, and Footer Directory.
 */

export const navigationConfig = {
  // Primary desktop navbar items (6 clean top-level categories + Pricing)
  primary: [
    {
      id: "products",
      label: "Products",
      href: "/products",
      match: ["/products", "/products/categories", "/products/compare", "/products/roadmap", "/products/changelog", "/products/integrations", "/products/mederp-pro"],
      enabled: true,
      hasDropdown: true,
      badge: "SaaS",
      description: "Software products engineered for clinical healthcare, multi-branch retail, and modern businesses.",
      viewAll: { label: "View All Products", href: "/products" },
      featuredCard: {
        title: "MedERP Pro Clinical Suite",
        tagline: "Flagship hospital, clinical diagnostics, and pharmacy management ERP.",
        href: "/products/mederp-pro",
        badge: "FLAGSHIP SaaS",
        actionText: "Explore MedERP Pro"
      },
      groups: [
        {
          title: "FLAGSHIP SOFTWARE",
          items: [
            { label: "Products Overview", href: "/products", description: "Searchable master catalog of all software", icon: "Boxes", badge: "CATALOG", enabled: true },
            { label: "MedERP Pro Clinical Suite", href: "/products/mederp-pro", description: "Hospital, clinical diagnostics & pharmacy ERP", icon: "Activity", badge: "FLAGSHIP", enabled: true },
            { label: "Product Categories", href: "/products/categories", description: "Healthcare, Retail POS, ERP, CRM & AI", icon: "Layers", enabled: true },
          ]
        },
        {
          title: "EXPLORE & ROADMAP",
          items: [
            { label: "Product Comparison Matrix", href: "/products/compare", description: "Side-by-side tier and capability matrix", icon: "Scale", enabled: true },
            { label: "Public Product Roadmap", href: "/products/roadmap", description: "Scheduled milestones and upcoming features", icon: "Flag", badge: "ROADMAP", enabled: true },
            { label: "Release Changelog", href: "/products/changelog", description: "Version notes and continuous improvements", icon: "History", enabled: true },
            { label: "Integrations & Connectors", href: "/products/integrations", description: "WhatsApp, payment gateways & lab devices", icon: "Workflow", enabled: true },
          ]
        }
      ]
    },
    {
      id: "services",
      label: "Services",
      href: "/services",
      match: [
        "/services",
        "/services/web-development",
        "/services/saas-development",
        "/services/mobile-app-development",
        "/services/ui-ux-design",
        "/services/ai-solutions",
        "/services/automation",
        "/services/api-backend-development",
        "/services/cloud-deployment",
        "/services/maintenance-support",
        "/services/custom-software",
        "/services/process",
        "/services/pricing"
      ],
      enabled: true,
      hasDropdown: true,
      badge: "PODS",
      description: "Dedicated senior engineering pods building custom scalable platforms and micro-gateways.",
      viewAll: { label: "View All Services", href: "/services" },
      featuredCard: {
        title: "Dedicated Engineering Pods",
        tagline: "Senior full-stack architects delivering zero-debt platforms.",
        href: "/services/process",
        badge: "6-STAGE LIFECYCLE",
        actionText: "View Pod Process"
      },
      groups: [
        {
          title: "CORE ENGINEERING",
          items: [
            { label: "Services Overview", href: "/services", description: "Explore full engineering capabilities", icon: "Code2", badge: "SERVICES", enabled: true },
            { label: "Fullstack Web Development", href: "/services/web-development", description: "Next.js 15, React & Node.js platforms", icon: "Globe", enabled: true },
            { label: "Multi-Tenant SaaS Engineering", href: "/services/saas-development", description: "Multi-tenant isolation & subscription metering", icon: "Layers", badge: "SaaS", enabled: true },
            { label: "Mobile App Development", href: "/services/mobile-app-development", description: "High-performance iOS & Android applications", icon: "Smartphone", enabled: true },
            { label: "UI/UX & Design Systems", href: "/services/ui-ux-design", description: "High-precision 60fps design systems & tokens", icon: "Sparkles", enabled: true },
          ]
        },
        {
          title: "ADVANCED ARCHITECTURE",
          items: [
            { label: "AI Solutions & Workflows", href: "/services/ai-solutions", description: "LLMs, semantic search & AI agents", icon: "Brain", badge: "AI", enabled: true },
            { label: "Business Process Automation", href: "/services/automation", description: "Event triggers, bots & ERP sync", icon: "Zap", enabled: true },
            { label: "Cloud & DevOps Infrastructure", href: "/services/cloud-deployment", description: "Docker, Kubernetes & CI/CD clusters", icon: "Cloud", enabled: true },
            { label: "6-Stage Engineering Process", href: "/services/process", description: "Discovery -> Build -> Launch -> Support", icon: "Workflow", enabled: true },
            { label: "Service Pricing & Retainers", href: "/services/pricing", description: "Pod retainer tiers & custom estimates", icon: "CreditCard", badge: "PACKAGES", enabled: true },
          ]
        }
      ]
    },
    {
      id: "industries",
      label: "Industries",
      href: "/industries",
      match: ["/industries"],
      enabled: true,
      hasDropdown: true,
      badge: "DOMAINS",
      description: "Tailored software architectures and specialized workflows across key industry sectors.",
      viewAll: { label: "View All Industries", href: "/industries" },
      featuredCard: {
        title: "Healthcare & Hospital Systems",
        tagline: "HIPAA-ready clinical ERP, diagnostic labs, and pharmacy POS.",
        href: "/products/mederp-pro",
        badge: "CORE SECTOR",
        actionText: "Explore Healthcare Suite"
      },
      groups: [
        {
          title: "SPECIALIZED SECTORS",
          items: [
            { label: "Industries Overview", href: "/industries", description: "Explore tailored domain solutions", icon: "Building2", badge: "ALL", enabled: true },
            { label: "Healthcare & Diagnostics", href: "/industries#catalog", description: "Hospitals, pathology labs & daycare clinics", icon: "Activity", badge: "HEALTH", enabled: true },
            { label: "Retail & Multi-Branch", href: "/industries#catalog", description: "Offline POS, inventory sync & GST invoicing", icon: "Boxes", enabled: true },
            { label: "Fintech & Enterprise", href: "/industries#catalog", description: "Audited ledgers, subscriptions & billing", icon: "ShieldCheck", enabled: true },
            { label: "High-Growth Startups", href: "/industries#catalog", description: "Rapid MVP to production-scale cloud SaaS", icon: "Zap", enabled: true },
          ]
        }
      ]
    },
    {
      id: "company",
      label: "Company",
      href: "/about",
      match: [
        "/about",
        "/vision",
        "/mission",
        "/why-devsamp",
        "/company",
        "/culture",
        "/careers",
        "/careers/internships",
        "/partners",
        "/partners/portal",
        "/customers",
        "/brand-assets",
        "/security",
        "/security/practices",
        "/security/responsible-disclosure",
        "/privacy",
        "/terms",
        "/cookie-policy",
        "/accessibility",
        "/compliance"
      ],
      enabled: true,
      hasDropdown: true,
      description: "Company identity, engineering leadership, culture, careers, trust, and governance.",
      viewAll: { label: "View All Company Info", href: "/about" },
      groups: [
        {
          title: "STORY & DIRECTION",
          items: [
            { label: "About DevSamp", href: "/about", description: "Who we are and our craft foundations", icon: "Info", enabled: true },
            { label: "Vision 2035", href: "/vision", description: "10–15 year software ecosystem blueprint", icon: "Compass", badge: "2035", enabled: true },
            { label: "Our Mission", href: "/mission", description: "Operational purpose & engineering standards", icon: "Target", badge: "CORE", enabled: true },
            { label: "Why DevSamp", href: "/why-devsamp", description: "100% in-house craft & zero technical debt", icon: "ShieldCheck", badge: "ADVANTAGE", enabled: true },
            { label: "Customers & Clients", href: "/customers", description: "Organizations and clinics powered by DevSamp", icon: "Users", enabled: true },
          ]
        },
        {
          title: "PEOPLE, CULTURE & TRUST",
          items: [
            { label: "Careers & Pod Hiring", href: "/careers", description: "Join our elite engineering pods", icon: "Briefcase", badge: "HIRING", enabled: true },
            { label: "Apprenticeship Program", href: "/careers/internships", description: "Hands-on engineering incubator for builders", icon: "Target", enabled: true },
            { label: "Partners & Alliances", href: "/partners", description: "Technology, implementation & reseller tiers", icon: "Users", enabled: true },
            { label: "Security Center", href: "/security", description: "SOC-2, encryption & responsible disclosure", icon: "ShieldCheck", badge: "SECURE", enabled: true },
            { label: "Brand Assets & Media Kit", href: "/brand-assets", description: "Approved logos, colors & media assets", icon: "Sparkles", enabled: true },
          ]
        }
      ]
    },
    {
      id: "resources",
      label: "Resources",
      href: "/blog",
      match: [
        "/blog",
        "/case-studies",
        "/testimonials",
        "/news",
        "/docs",
        "/developers",
        "/developers/api-reference",
        "/developers/quickstart",
        "/developers/sdks",
        "/developers/webhooks",
        "/developers/cli",
        "/support",
        "/support/getting-started",
        "/support/guides",
        "/support/faqs",
        "/support/troubleshooting",
        "/support/videos",
        "/community",
        "/status",
        "/guides",
        "/glossary",
        "/resources",
        "/newsletter",
        "/marketplace",
        "/apps",
        "/open-source",
        "/labs"
      ],
      enabled: true,
      hasDropdown: true,
      description: "Case studies, technical devlogs, developer APIs, documentation, and customer support.",
      viewAll: { label: "View All Resources", href: "/blog" },
      groups: [
        {
          title: "PUBLICATIONS & PROOF",
          items: [
            { label: "Case Studies & Impact", href: "/case-studies", description: "Real-world engineering project outcomes", icon: "Briefcase", badge: "PROVEN", enabled: true },
            { label: "Engineering Devlogs", href: "/blog", description: "Technical articles & system design deep-dives", icon: "Rss", badge: "BLOG", enabled: true },
            { label: "Customer Testimonials", href: "/testimonials", description: "Verified reviews from healthcare & retail leads", icon: "Sparkles", enabled: true },
            { label: "News & Announcements", href: "/news", description: "Official company dispatches & launches", icon: "Activity", enabled: true },
          ]
        },
        {
          title: "DEVELOPER & SUPPORT",
          items: [
            { label: "Developer Portal & APIs", href: "/developers", description: "REST APIs, Webhooks, client SDKs & CLI", icon: "Terminal", badge: "DEV HUB", enabled: true },
            { label: "Customer Help Center", href: "/support", description: "Task guides, troubleshooting & onboarding", icon: "HelpCircle", badge: "SUPPORT", enabled: true },
            { label: "Community Forum", href: "/community", description: "Discussions, workflows & knowledge sharing", icon: "Users", enabled: true },
            { label: "Platform Status & Uptime", href: "/status", description: "Real-time service health & incidents", icon: "Activity", badge: "LIVE", enabled: true },
          ]
        }
      ]
    },
    {
      id: "pricing",
      label: "Pricing",
      href: "/pricing",
      match: ["/pricing"],
      enabled: true,
      hasDropdown: false,
    }
  ],

  // Primary Call-to-Action
  cta: {
    label: "Start a Project",
    href: "/#contact",
    dataCursor: "Connect"
  },

  // Customer Account Link
  accountLink: {
    label: "Client Portal",
    href: "/account",
    loginHref: "/login"
  },

  // Master Footer Directory Structure (Organized by meaningful categories)
  footer: {
    columns: [
      {
        id: "products",
        title: "Products",
        viewAll: { label: "View All Products →", href: "/products" },
        items: [
          { label: "Products Overview", href: "/products", enabled: true },
          { label: "MedERP Pro Clinical Suite", href: "/products/mederp-pro", badge: "FLAGSHIP", enabled: true },
          { label: "Product Categories", href: "/products/categories", enabled: true },
          { label: "Comparison Matrix", href: "/products/compare", enabled: true },
          { label: "Public Roadmap", href: "/products/roadmap", enabled: true },
          { label: "Release Changelog", href: "/products/changelog", enabled: true },
          { label: "Integrations & Connectors", href: "/products/integrations", enabled: true },
        ]
      },
      {
        id: "services",
        title: "Services",
        viewAll: { label: "View All Services →", href: "/services" },
        items: [
          { label: "Services Overview", href: "/services", enabled: true },
          { label: "Fullstack Web Development", href: "/services/web-development", enabled: true },
          { label: "Multi-Tenant SaaS Engineering", href: "/services/saas-development", enabled: true },
          { label: "Mobile App Development", href: "/services/mobile-app-development", enabled: true },
          { label: "UI/UX & Design Systems", href: "/services/ui-ux-design", enabled: true },
          { label: "AI Solutions & Automation", href: "/services/ai-solutions", enabled: true },
          { label: "6-Stage Engineering Process", href: "/services/process", enabled: true },
          { label: "Service Pricing & Retainers", href: "/services/pricing", enabled: true },
        ]
      },
      {
        id: "industries",
        title: "Industries",
        viewAll: { label: "View All Industries →", href: "/industries" },
        items: [
          { label: "Industries Overview", href: "/industries", enabled: true },
          { label: "Healthcare & Diagnostics", href: "/industries#catalog", enabled: true },
          { label: "Retail & Multi-Branch POS", href: "/industries#catalog", enabled: true },
          { label: "Fintech & Enterprise Ledgers", href: "/industries#catalog", enabled: true },
          { label: "High-Growth Startups", href: "/industries#catalog", enabled: true },
          { label: "Connected Ecosystem Map", href: "/ecosystem", enabled: true },
        ]
      },
      {
        id: "company",
        title: "Company",
        viewAll: { label: "About DevSamp →", href: "/about" },
        items: [
          { label: "About DevSamp", href: "/about", enabled: true },
          { label: "Vision 2035 Blueprint", href: "/vision", badge: "2035", enabled: true },
          { label: "Our Mission", href: "/mission", enabled: true },
          { label: "Why DevSamp", href: "/why-devsamp", enabled: true },
          { label: "Customers & Clients", href: "/customers", enabled: true },
          { label: "Careers & Pod Hiring", href: "/careers", badge: "HIRING", enabled: true },
          { label: "Partners & Alliances", href: "/partners", enabled: true },
          { label: "Brand Assets & Media Kit", href: "/brand-assets", enabled: true },
        ]
      },
      {
        id: "resources",
        title: "Resources & Dev",
        viewAll: { label: "View All Resources →", href: "/blog" },
        items: [
          { label: "Commercial Pricing", href: "/pricing", enabled: true },
          { label: "Case Studies & Impact", href: "/case-studies", enabled: true },
          { label: "Engineering Devlogs", href: "/blog", enabled: true },
          { label: "Developer Portal & APIs", href: "/developers", badge: "DEV HUB", enabled: true },
          { label: "Customer Help Center", href: "/support", enabled: true },
          { label: "Customer Account Portal", href: "/account", enabled: true },
          { label: "Platform Status & Uptime", href: "/status", badge: "LIVE", enabled: true },
        ]
      }
    ],
    legalLinks: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookie-policy" },
      { label: "Security", href: "/security" },
      { label: "Accessibility", href: "/accessibility" },
      { label: "Sitemap", href: "/sitemap" },
    ]
  }
};
