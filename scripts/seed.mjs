import dns from "node:dns";
import mongoose from "mongoose";
import * as fs from "node:fs";
import * as path from "node:path";

// Force Google DNS for Atlas querySrv resolution
try {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
} catch (e) {
  // Ignore in environments where setServers is restricted
}

// Load .env.local manually if dotenv is not present
function loadEnv() {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, "utf-8");
    content.split("\n").forEach((line) => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let val = match[2] || "";
        if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
        if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
        process.env[key] = val.trim();
      }
    });
  }
}

loadEnv();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is not defined in .env.local");
  process.exit(1);
}

// Minimal inline Mongoose schemas for CLI execution
const ProductSchema = new mongoose.Schema({}, { strict: false });
const EcosystemItemSchema = new mongoose.Schema({}, { strict: false });
const IndustrySchema = new mongoose.Schema({}, { strict: false });
const CaseStudySchema = new mongoose.Schema({}, { strict: false });
const HomepageSectionSchema = new mongoose.Schema({}, { strict: false });
const SiteSettingSchema = new mongoose.Schema({}, { strict: false });

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
const EcosystemItem = mongoose.models.EcosystemItem || mongoose.model("EcosystemItem", EcosystemItemSchema);
const Industry = mongoose.models.Industry || mongoose.model("Industry", IndustrySchema);
const CaseStudy = mongoose.models.CaseStudy || mongoose.model("CaseStudy", CaseStudySchema);
const HomepageSection = mongoose.models.HomepageSection || mongoose.model("HomepageSection", HomepageSectionSchema);
const SiteSetting = mongoose.models.SiteSetting || mongoose.model("SiteSetting", SiteSettingSchema);

async function seed() {
  console.log("🌱 Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI, {
    bufferCommands: false,
  });
  console.log("✓ Connected to MongoDB Atlas.");

  // 1. Seed Default Homepage Sections
  const defaultSections = [
    { key: "hero", title: "Building, Operating & Scaling Digital Ecosystems with Next-Gen Products & Engineering", badge: "Technology • Products • Ecosystem", order: 1, isActive: true },
    { key: "ecosystem-intro", title: "One ecosystem. Multiple possibilities.", badge: "Connected Architecture", order: 2, isActive: true },
    { key: "featured-products", title: "Flagship Software Products & SaaS", badge: "Software Suite", order: 3, isActive: true },
    { key: "services", title: "Engineering Services & Capabilities", badge: "Capabilities", order: 4, isActive: true },
    { key: "ecosystem-map", title: "The DevSamp Connected Ecosystem", badge: "Interactive Graph", order: 5, isActive: true },
    { key: "why-devsamp", title: "Why High-Growth Teams Choose DevSamp", badge: "Value Matrix", order: 6, isActive: true },
    { key: "industries", title: "Tailored Solutions for Core Industries", badge: "Vertical Solutions", order: 7, isActive: true },
    { key: "case-studies", title: "Customer Impact & Case Studies", badge: "Proven Impact", order: 8, isActive: true },
    { key: "developers", title: "Build, Extend & Integrate with DevSamp", badge: "Developer First", order: 9, isActive: true },
    { key: "trust", title: "Engineered for Security, Speed & Reliability", badge: "Trust & Reliability", order: 10, isActive: true },
    { key: "testimonials", title: "Trusted by Builders & Industry Leaders", badge: "Client Stories", order: 11, isActive: true },
    { key: "latest-updates", title: "Latest Releases & Engineering Devlogs", badge: "Version Logs", order: 12, isActive: true },
    { key: "faq", title: "Frequently Asked Questions", badge: "Diagnostics", order: 13, isActive: true },
    { key: "final-cta", title: "Build what's next with the DevSamp Ecosystem.", badge: "Next Step", order: 14, isActive: true },
  ];

  for (const sec of defaultSections) {
    await HomepageSection.findOneAndUpdate(
      { key: sec.key },
      { $setOnInsert: { ...sec, isDemo: true } },
      { upsert: true, new: true }
    );
  }
  console.log("✓ Homepage sections verified/seeded.");

  // 2. Seed Flagship Products (Tagged with isDemo: true)
  const defaultProducts = [
    {
      name: "MedERP Pro",
      slug: "mederp-pro",
      tagline: "Enterprise Clinical & Hospital Orchestration ERP",
      description: "Complete HIPAA-ready hospital operating system. Unifies IPD/OPD patient workflows, pharmacy supply chain, diagnostic telemetry, and multi-branch insurance billing.",
      category: "Enterprise ERP",
      status: "Live",
      featured: true,
      logoIcon: "Boxes",
      gradient: "from-blue-600 to-cyan-500",
      capabilities: ["EHR Telemetry", "Pharmacy Inventory Mesh", "NABH Compliant", "Multi-Branch Billing"],
      pricingSnippet: "Enterprise Tier Available",
      productUrl: "https://mederppro.online",
      docsUrl: "/#developers",
      version: "v3.2.0",
      isDemo: true,
      order: 1,
      isActive: true
    },
    {
      name: "DevScale Core",
      slug: "devscale-core",
      tagline: "Multi-Tenant SaaS Foundation Engine",
      description: "Pre-architected Next.js 15 + Node.js boilerplates with multi-tenant database isolation, automated RBAC permissions, Stripe webhooks, and audit logs.",
      category: "Developer Tool",
      status: "Live",
      featured: true,
      logoIcon: "Cpu",
      gradient: "from-indigo-600 to-purple-600",
      capabilities: ["Tenant Isolation", "Role-Based RBAC", "Stripe & Razorpay Mesh", "Audit Logging"],
      pricingSnippet: "Developer License",
      productUrl: "/#developers",
      docsUrl: "/#developers",
      version: "v2.1.0",
      isDemo: true,
      order: 2,
      isActive: true
    },
    {
      name: "FlowPulse POS",
      slug: "flowpulse-pos",
      tagline: "Omnichannel Retail & Inventory Point-of-Sale",
      description: "Offline-first cloud point of sale engineered for retail chains and supermarkets. Features sub-second barcode scans, multi-warehouse sync, and automated GST e-invoicing.",
      category: "SaaS",
      status: "Beta",
      featured: true,
      logoIcon: "Layers",
      gradient: "from-purple-600 to-pink-600",
      capabilities: ["Offline-First Sync", "GST E-Invoicing", "Barcode Scan Engine", "Real-Time Stock Mesh"],
      pricingSnippet: "Beta Access",
      productUrl: "/#contact",
      docsUrl: "/#developers",
      version: "v1.4.0",
      isDemo: true,
      order: 3,
      isActive: true
    },
    {
      name: "OmniDesk AI",
      slug: "omnidesk-ai",
      tagline: "Autonomous Customer Experience & Agent Dispatch",
      description: "Context-aware AI support and lead qualification engine that ingests company knowledge bases to resolve client inquiries across WhatsApp, Web, and Email.",
      category: "AI",
      status: "Coming Soon",
      featured: true,
      logoIcon: "Terminal",
      gradient: "from-emerald-500 to-teal-500",
      capabilities: ["LLM Grounding", "Multi-Channel WhatsApp/Web", "CRM Auto-Sync", "Human-in-the-Loop"],
      pricingSnippet: "Private Preview",
      productUrl: "/#contact",
      docsUrl: "/#developers",
      version: "v0.9.0",
      isDemo: true,
      order: 4,
      isActive: true
    }
  ];

  for (const prod of defaultProducts) {
    await Product.findOneAndUpdate(
      { slug: prod.slug },
      { $setOnInsert: prod },
      { upsert: true, new: true }
    );
  }
  console.log("✓ Flagship products verified/seeded.");

  // 3. Seed Ecosystem Items with Structured Relationships
  const defaultEcosystemItems = [
    {
      nodeId: "core",
      title: "DevSamp Hub",
      category: "core",
      shortDesc: "Central orchestration engine coordinating SaaS products, engineering pods, and developer gateways.",
      icon: "Cpu",
      statusBadge: "Active Core",
      metrics: "99.9% Uptime",
      color: "from-blue-600 to-indigo-600",
      connections: [
        { targetId: "products", relation: "powers" },
        { targetId: "services", relation: "extends" },
        { targetId: "developers", relation: "powers" },
        { targetId: "integrations", relation: "connects_to" }
      ],
      linkUrl: "/#ecosystem",
      isDemo: true,
      order: 1,
      isActive: true
    },
    {
      nodeId: "products",
      title: "Software Products",
      category: "product",
      shortDesc: "Production-ready vertical ERPs, multi-tenant SaaS boilerplates, and offline-first POS systems.",
      icon: "Boxes",
      statusBadge: "4 Live Apps",
      metrics: "Enterprise SLA",
      color: "from-indigo-500 to-purple-500",
      connections: [
        { targetId: "core", relation: "supported_by" },
        { targetId: "integrations", relation: "integrates_with" }
      ],
      linkUrl: "/#products",
      isDemo: true,
      order: 2,
      isActive: true
    },
    {
      nodeId: "services",
      title: "Technology Services",
      category: "service",
      shortDesc: "Bespoke full-stack web development, AI workflow automation, and custom software engineering.",
      icon: "Layers",
      statusBadge: "Fullstack Pod",
      metrics: "Custom Scope",
      color: "from-blue-500 to-cyan-500",
      connections: [
        { targetId: "core", relation: "supported_by" },
        { targetId: "customers", relation: "powers" }
      ],
      linkUrl: "/#services",
      isDemo: true,
      order: 3,
      isActive: true
    },
    {
      nodeId: "developers",
      title: "Developer Platform",
      category: "developer",
      shortDesc: "Open REST APIs, event-driven webhooks, modular SDKs, and developer-first boilerplates.",
      icon: "Terminal",
      statusBadge: "Open SDKs",
      metrics: "REST & Webhooks",
      color: "from-purple-500 to-pink-500",
      connections: [
        { targetId: "core", relation: "uses" },
        { targetId: "products", relation: "extends" }
      ],
      linkUrl: "/#developers",
      isDemo: true,
      order: 4,
      isActive: true
    },
    {
      nodeId: "integrations",
      title: "Ecosystem Mesh",
      category: "integration",
      shortDesc: "Deep interoperability connectors for payment gateways, cloud edge nodes, and database clusters.",
      icon: "GitBranch",
      statusBadge: "Universal Mesh",
      metrics: "20+ Protocols",
      color: "from-emerald-500 to-teal-500",
      connections: [
        { targetId: "core", relation: "connects_to" },
        { targetId: "products", relation: "integrates_with" }
      ],
      linkUrl: "/#ecosystem",
      isDemo: true,
      order: 5,
      isActive: true
    },
    {
      nodeId: "customers",
      title: "Client Network",
      category: "customer",
      shortDesc: "Enterprises, clinics, startups, and institutions operating their mission-critical digital workloads.",
      icon: "Users",
      statusBadge: "Global Clients",
      metrics: "150+ Deployed",
      color: "from-amber-500 to-orange-500",
      connections: [
        { targetId: "services", relation: "uses" },
        { targetId: "support", relation: "supported_by" }
      ],
      linkUrl: "/#contact",
      isDemo: true,
      order: 6,
      isActive: true
    },
    {
      nodeId: "support",
      title: "Long-term Support",
      category: "support",
      shortDesc: "Dedicated SLA maintenance, security patch pipelines, and direct engineering escalation.",
      icon: "ShieldCheck",
      statusBadge: "24/7 SLA",
      metrics: "Dedicated Pod",
      color: "from-cyan-500 to-blue-600",
      connections: [
        { targetId: "customers", relation: "powers" },
        { targetId: "core", relation: "supported_by" }
      ],
      linkUrl: "/#contact",
      isDemo: true,
      order: 7,
      isActive: true
    }
  ];

  for (const node of defaultEcosystemItems) {
    await EcosystemItem.findOneAndUpdate(
      { nodeId: node.nodeId },
      { $setOnInsert: node },
      { upsert: true, new: true }
    );
  }
  console.log("✓ Ecosystem topology nodes verified/seeded.");

  // 4. Seed Industry Verticals
  const defaultIndustries = [
    {
      name: "Healthcare & Life Sciences",
      slug: "healthcare",
      summary: "HIPAA-compliant hospital ERP, telemedicine gateways, and automated electronic medical records mesh.",
      icon: "Activity",
      badge: "Clinical Grade",
      useCases: ["Hospital ERP", "Electronic Health Records (EHR)", "Lab Test Telemetry", "Telemedicine"],
      relatedProducts: ["MedERP Pro"],
      relatedServices: ["Custom Web Systems", "Database Optimization"],
      linkUrl: "/#contact",
      isDemo: true,
      order: 1,
      isActive: true
    },
    {
      name: "Financial Tech & Invoicing",
      slug: "fintech",
      summary: "High-security ledger systems, multi-currency invoicing, and real-time payment reconciliation APIs.",
      icon: "CreditCard",
      badge: "PCI DSS Standard",
      useCases: ["Payment Gateway Connectors", "Automated Invoicing", "Subscription Billing Engine"],
      relatedProducts: ["DevScale Core"],
      relatedServices: ["API Architecture", "Security Auditing"],
      linkUrl: "/#contact",
      isDemo: true,
      order: 2,
      isActive: true
    },
    {
      name: "Retail & Omnichannel POS",
      slug: "retail",
      summary: "Omnichannel inventory orchestration, lightning-fast storefronts, and multi-location POS systems.",
      icon: "ShoppingBag",
      badge: "Omnichannel",
      useCases: ["Offline-First POS", "Real-Time Stock Mesh", "Custom Headless Storefronts"],
      relatedProducts: ["FlowPulse POS"],
      relatedServices: ["Fullstack Web Development", "Mobile Applications"],
      linkUrl: "/#contact",
      isDemo: true,
      order: 3,
      isActive: true
    },
    {
      name: "Startups & Emerging SaaS",
      slug: "startups",
      summary: "Rapid prototyping, scalable multi-tenant foundations, and high-conversion product landing architectures.",
      icon: "Rocket",
      badge: "Rapid Launch",
      useCases: ["MVP to Scale Pipeline", "Admin Control Portals", "Lighthouse 100 Performance"],
      relatedProducts: ["DevScale Core", "OmniDesk AI"],
      relatedServices: ["UI/UX System Design", "Cloud Infrastructure"],
      linkUrl: "/#contact",
      isDemo: true,
      order: 4,
      isActive: true
    }
  ];

  for (const ind of defaultIndustries) {
    await Industry.findOneAndUpdate(
      { slug: ind.slug },
      { $setOnInsert: ind },
      { upsert: true, new: true }
    );
  }
  console.log("✓ Industry verticals verified/seeded.");

  // 6. Seed About Page Data
  const AboutPageSchema = new mongoose.Schema({}, { strict: false });
  const AboutPage = mongoose.models.AboutPage || mongoose.model("AboutPage", AboutPageSchema);

  const defaultAboutData = {
    key: "main",
    status: "published",
    isDemo: true,
    hero: {
      eyebrow: "About DevSamp",
      title: "Building the technology layer for the next generation of digital businesses.",
      description: "DevSamp is a connected technology ecosystem combining scalable software products, full-stack digital solutions, and developer infrastructure to empower compounding business growth.",
      badge: "Technology • Products • Ecosystem"
    },
    overview: {
      companyType: "Technology Ecosystem & Software Products Company",
      focus: "SaaS Platforms, Digital Infrastructure & Bespoke Engineering",
      model: "Product-First Engineering & Dedicated Pods",
      orientation: "Multi-Tenant Architecture, Edge Telemetry & High Availability",
      points: [
        {
          title: "4 Flagship SaaS Products",
          description: "Production ERPs, billing engines, and offline-first POS systems in active operation.",
          icon: "Boxes"
        },
        {
          title: "100% In-House Engineering",
          description: "Direct developer pods specializing in Next.js 15, Node microservices, and high-performance databases.",
          icon: "Cpu"
        },
        {
          title: "Standardized API Protocol",
          description: "Interconnected REST gateways, webhooks, and unified RBAC authentication across all products.",
          icon: "Workflow"
        },
        {
          title: "SLA-Backed Reliability",
          description: "24/7 infrastructure telemetry, automated CI/CD patch pipelines, and direct escalation channels.",
          icon: "ShieldCheck"
        }
      ]
    },
    story: {
      title: "From Agile Engineering Pod to an Interconnected Product Ecosystem",
      introduction: "DevSamp began with a fundamental premise: modern high-growth businesses don't just need isolated freelance software builds; they require unified, compounding digital infrastructure and enterprise-grade software products.",
      chapters: [
        {
          year: "2023",
          title: "The Foundation: Specialized Engineering",
          description: "Started as a dedicated full-stack engineering pod building complex web platforms, APIs, and cloud infrastructure for fast-growing businesses.",
          highlight: "Custom Engineering DNA",
          order: 1
        },
        {
          year: "2024",
          title: "First Vertical Product: MedERP Pro",
          description: "Identified deep fragmentation in healthcare clinical operations and engineered MedERP Pro—a full HIPAA-ready hospital orchestration platform.",
          highlight: "First Flagship SaaS",
          order: 2
        },
        {
          year: "2025",
          title: "Ecosystem Architecture & Multi-Tenancy",
          description: "Expanded product portfolio with DevScale Core and FlowPulse POS, while developing our unified developer API gateway and telemetry mesh.",
          highlight: "Multi-Product Mesh",
          order: 3
        },
        {
          year: "2026 & Beyond",
          title: "The Global Connected Ecosystem",
          description: "Unifying products, bespoke engineering pods, and open developer infrastructure to power next-generation business workflows globally.",
          highlight: "The Future Layer",
          order: 4
        }
      ]
    },
    founders: [
      {
        name: "Mahadev Mondal",
        role: "Founder & Lead Architect",
        bio: "Full-stack engineer, systems architect, and product designer passionate about Next.js, multi-tenant cloud ecosystems, and high-performance developer tools.",
        quote: "Software should be engineered as an appreciating asset, not disposable code.",
        expertise: ["Next.js & React 19", "Multi-Tenant Cloud Systems", "API Gateways & Security", "Product Design"],
        socialLinks: {
          linkedin: "https://www.linkedin.com/in/mahadev-mondal",
          github: "https://github.com/Mahadev91op",
          twitter: "https://x.com/devsamp1st"
        },
        order: 1,
        status: "published"
      }
    ],
    mission: {
      title: "Our Mission",
      statement: "To engineer scalable software products and resilient digital infrastructure that empower businesses to compound digital value.",
      description: "We eliminate technical debt and execution friction by unifying SaaS products, bespoke engineering pods, and open developer protocols under one reliable ecosystem.",
      visualBadge: "Operational Focus"
    },
    vision: {
      title: "Our Vision",
      statement: "To become the central technology operating system for modern high-growth enterprises.",
      presentState: "Operating 4 flagship vertical SaaS platforms and deploying custom engineering solutions.",
      buildingState: "Unifying API gateways, multi-tenant boilerplate foundations, and autonomous workflow nodes.",
      futureState: "A global interconnected developer and product ecosystem powering mission-critical commerce, healthcare, and finance."
    },
    visionPillars: [
      {
        title: "Software Products",
        description: "Vertical SaaS applications engineered for specific industry domains with multi-tenant isolation.",
        icon: "Boxes",
        badge: "Core Asset",
        order: 1
      },
      {
        title: "Bespoke Engineering Pods",
        description: "Dedicated development squads tackling high-complexity architectures and custom client platforms.",
        icon: "Layers",
        badge: "Custom Scope",
        order: 2
      },
      {
        title: "Developer Gateway & SDKs",
        description: "Universal REST APIs, webhooks, and type-safe boilerplates to empower internal and third-party devs.",
        icon: "Terminal",
        badge: "Extensibility",
        order: 3
      },
      {
        title: "Interconnected Ecosystem Mesh",
        description: "Cross-product telemetry, shared authentication, and standardized data exchange pipelines.",
        icon: "Workflow",
        badge: "Unified Protocol",
        order: 4
      }
    ],
    capabilities: [
      {
        title: "Full-Stack Web Architecture",
        description: "Next.js 15 App Router, React 19 Server Components, SSR, and micro-frontend orchestration.",
        icon: "Cpu",
        category: "Engineering",
        order: 1
      },
      {
        title: "Multi-Tenant SaaS Engineering",
        description: "Database isolation, automated tenant provisioning, stripe/payment billing meshes, and RBAC.",
        icon: "Boxes",
        category: "SaaS",
        order: 2
      },
      {
        title: "High-Performance Cloud & Edge",
        description: "Global edge caching, serverless compute, containerized deployments, and sub-50ms regional latency.",
        icon: "Server",
        category: "Infrastructure",
        order: 3
      },
      {
        title: "API Gateways & Real-Time Mesh",
        description: "OpenAPI 3.1 specifications, webhook dispatchers, WebSockets, and event-driven architectures.",
        icon: "Workflow",
        category: "APIs",
        order: 4
      },
      {
        title: "High-Precision UI/UX Design",
        description: "Vercel-level interactive design systems, fluid responsive typography, and micro-interactions.",
        icon: "Sparkles",
        category: "Design",
        order: 5
      },
      {
        title: "Enterprise Security & SLA",
        description: "JWT session encryption, automated CI/CD lint pipelines, dependency patching, and 99.9% uptime SLA.",
        icon: "ShieldCheck",
        category: "Security",
        order: 6
      }
    ],
    engineeringPrinciples: [
      {
        title: "Engineered for 10x Scale",
        description: "We architect databases and API contracts anticipating exponential traffic growth from day one.",
        icon: "TrendingUp",
        badge: "Scalability",
        order: 1
      },
      {
        title: "Simplicity Over Cleverness",
        description: "Readable, maintainable codebases with strict conventions always beat overly complex abstractions.",
        icon: "Code2",
        badge: "Maintainability",
        order: 2
      },
      {
        title: "Zero Layout Shift & Instant 60fps",
        description: "Every interaction, animation, and layout must load instantaneously with optimal Core Web Vitals.",
        icon: "Zap",
        badge: "Performance",
        order: 3
      },
      {
        title: "Security & RBAC by Default",
        description: "HTTP-only cookie sessions, granular permission scopes, and strict input sanitization at every layer.",
        icon: "Lock",
        badge: "Security",
        order: 4
      }
    ],
    technologyApproach: {
      title: "Our Approach to Technology Selection",
      description: "We don't chase transient framework trends. We carefully evaluate tools on production stability, long-term maintainability, developer speed, and runtime performance.",
      pillars: [
        {
          title: "Next.js & React Core",
          description: "The premier standard for server-rendered web applications, SEO performance, and dynamic routing.",
          icon: "Cpu"
        },
        {
          title: "MongoDB Atlas & Node.js",
          description: "Battle-tested document storage with optimized index trees and horizontal scale characteristics.",
          icon: "Database"
        },
        {
          title: "Tailwind CSS Design System",
          description: "Utility-first design tokens ensuring micro-precision layout consistency and minimal CSS payload.",
          icon: "Layers"
        },
        {
          title: "Framer Motion Physics",
          description: "GPU-accelerated cubic-bezier and spring physics that enrich user experience without lagging.",
          icon: "Sparkles"
        }
      ]
    },
    milestones: [
      {
        year: "2023",
        title: "DevSamp Inception",
        description: "Founded as an agile technology engineering company.",
        badge: "Foundation",
        order: 1
      },
      {
        year: "2024",
        title: "MedERP Pro Launch",
        description: "Released first flagship vertical SaaS for hospital & clinical management.",
        badge: "Flagship SaaS",
        order: 2
      },
      {
        year: "2025",
        title: "Ecosystem Architecture",
        description: "Unified multi-tenant foundations, developer SDKs, and REST gateway.",
        badge: "Ecosystem",
        order: 3
      },
      {
        year: "2026",
        title: "Global Scaling & Multi-Product Mesh",
        description: "Serving high-growth businesses and scaling the connected software platform.",
        badge: "Scale",
        order: 4
      }
    ],
    culture: {
      title: "Our Culture & Internal DNA",
      description: "We operate with the agility of a startup and the technical discipline of an enterprise engineering firm.",
      values: [
        {
          title: "Extreme Ownership",
          description: "Every team member takes end-to-end responsibility for what they ship.",
          icon: "CheckCircle2"
        },
        {
          title: "Continuous Learning",
          description: "Constantly sharpening our architectural knowledge and adopting better engineering patterns.",
          icon: "BookOpen"
        },
        {
          title: "Speed With Precision",
          description: "Moving fast without breaking architectural integrity or compromising quality.",
          icon: "Zap"
        },
        {
          title: "Transparent Communication",
          description: "Direct, honest feedback and clear documentation for clients and colleagues alike.",
          icon: "MessageSquare"
        }
      ]
    },
    careers: {
      title: "Build the Future of Digital Ecosystems",
      description: "We are always excited to connect with talented full-stack engineers, UI designers, and systems architects who take pride in writing pristine code.",
      cultureStatement: "Distributed team, asynchronous workflow, high agency, and direct impact on real production products.",
      ctaText: "Connect with Our Founders",
      ctaLink: "/#contact",
      openPositionsCount: 0
    },
    community: {
      title: "Community & Knowledge Sharing",
      description: "We regularly publish architectural devlogs, UI libraries, and fullstack tutorials on YouTube and social platforms.",
      initiatives: [
        {
          title: "Engineering Devlogs & YouTube",
          description: "In-depth technical walkthroughs on Next.js, fullstack engineering, and product design.",
          link: "https://www.youtube.com/@DevSamp1st"
        },
        {
          title: "Open Source Boilerplates",
          description: "Curated templates and architectural starter kits for modern web developers.",
          link: "https://github.com/Mahadev91op"
        }
      ]
    },
    faqs: [
      {
        question: "Who is DevSamp and what is your core mission?",
        answer: "DevSamp is a connected technology ecosystem that combines vertical SaaS software products, bespoke engineering services, and developer infrastructure to help businesses build and scale digital assets.",
        order: 1
      },
      {
        question: "Is DevSamp an agency or a product company?",
        answer: "DevSamp is a product-first technology company. We build and operate our own software products (like MedERP Pro) while also deploying dedicated engineering pods for clients who need custom platforms built to SaaS standards.",
        order: 2
      },
      {
        question: "Can we hire DevSamp to build our custom software or SaaS?",
        answer: "Yes. Our engineering pod accepts select custom development projects, applying the same multi-tenant architecture, security standards, and high-performance UI systems we use in our own products.",
        order: 3
      },
      {
        question: "Where is DevSamp based and how do we work together?",
        answer: "DevSamp is headquartered in India and works with clients and partners globally through async communication, sprint milestones, and dedicated SLA retainers.",
        order: 4
      }
    ],
    finalCta: {
      title: "Build what's next with the DevSamp Ecosystem.",
      description: "Whether you are looking to deploy enterprise software products or partner with an elite engineering pod, we are ready to build with you.",
      primaryCta: {
        text: "Explore Products",
        link: "/products"
      },
      secondaryCta: {
        text: "Start a Conversation",
        link: "/#contact"
      }
    }
  };

  await AboutPage.findOneAndUpdate(
    { key: "main" },
    { $setOnInsert: defaultAboutData },
    { upsert: true, new: true }
  );
  console.log("✓ About page content verified/seeded.");

  // 7. Seed Vision Page Default Content
  const VisionPageSchema = new mongoose.Schema({}, { strict: false });
  const VisionPage = mongoose.models.VisionPage || mongoose.model("VisionPage", VisionPageSchema);

  const defaultVisionData = {
    key: "main",
    status: "published",
    isDemo: true,
    hero: {
      eyebrow: "DevSamp Vision 2035",
      title: "Engineering the Global Operating Layer for Connected Enterprise Software.",
      description: "A 10–15 year strategic horizon to unify vertical SaaS applications, autonomous engineering pods, and universal developer protocols into an interconnected software ecosystem.",
      badge: "Strategic Horizon 2026–2035",
      horizonPill: "15-Year Architecture Strategy"
    },
    statement: {
      title: "The Central Thesis",
      statement: "To evolve from an elite product-engineering firm into the decentralized technology backbone that powers modern global digital commerce, healthcare, and infrastructure.",
      description: "Software over the next decade must transition from isolated, brittle monoliths into compounding, interconnected ecosystems with shared intelligence, instant edge sync, and sub-10ms operational latency.",
      highlightBadge: "Decade Horizon"
    },
    reasons: [
      {
        title: "The Problem of Fragmented Toolchains",
        problem: "Modern enterprises stitch together 20+ disparate SaaS subscriptions with brittle zaps and fragile custom glue code.",
        opportunity: "A unified ecosystem layer where multi-tenant apps share authentication, billing, events, and telemetry natively.",
        direction: "DevSamp bridges independent business apps into a single interconnected mesh.",
        icon: "Layers",
        order: 1
      },
      {
        title: "The Compounding Software Dilemma",
        problem: "Most software built today depreciates rapidly into legacy technical debt requiring expensive rewrites.",
        opportunity: "Architecting modular platforms from day one with strict schema contracts, micro-optimizations, and zero layout shift.",
        direction: "Every DevSamp system is engineered as an appreciating asset that scales 10x without architectural rewrites.",
        icon: "TrendingUp",
        order: 2
      },
      {
        title: "The Need for High-Agency Autonomous Infrastructure",
        problem: "Repetitive operational workflows in healthcare, retail, and finance consume massive human engineering overhead.",
        opportunity: "Deterministic, edge-orchestrated workflow nodes that automate mission-critical billing, inventory, and diagnostics.",
        direction: "Embedding safe, sub-50ms automated pipelines directly into core SaaS products.",
        icon: "Cpu",
        order: 3
      }
    ],
    phases: [
      {
        phaseKey: "phase-01",
        title: "Vertical SaaS Foundations",
        timeframe: "2023 – 2025",
        description: "Deploying high-impact vertical products (MedERP Pro, DevScale Core) while executing bespoke enterprise platforms.",
        objectives: [
          "Establish HIPAA-ready hospital ERP architecture",
          "Deploy multi-tenant billing & role-based access",
          "Deliver 100% in-house client platforms with zero technical debt"
        ],
        milestones: [
          "MedERP Pro clinical suite in production",
          "Standardized Next.js 15 + MongoDB core library"
        ],
        badge: "PHASE 01 • ACTIVE FOUNDATION",
        order: 1
      },
      {
        phaseKey: "phase-02",
        title: "The Unified Platform Mesh",
        timeframe: "2026 – 2028",
        description: "Interconnecting all standalone software products through a universal REST API gateway, shared telemetry, and developer SDKs.",
        objectives: [
          "Launch public developer API gateway with sub-25ms response time",
          "Deploy unified identity & single sign-on across all DevSamp apps",
          "Expand vertical SaaS into retail POS (FlowPulse) and invoicing"
        ],
        milestones: [
          "Universal Developer Hub live",
          "Global multi-region edge mesh operational"
        ],
        badge: "PHASE 02 • IN PROGRESS",
        order: 2
      },
      {
        phaseKey: "phase-03",
        title: "Autonomous Workflow Orchestration",
        timeframe: "2029 – 2031",
        description: "Introducing automated event streams, deterministic decision pipelines, and edge-native intelligence across business nodes.",
        objectives: [
          "Automate cross-product financial reconciliation and inventory sync",
          "Deploy zero-configuration developer extensions & plugins",
          "Establish enterprise SLA pods with automated self-healing clusters"
        ],
        milestones: [
          "Real-time event streaming network",
          "Automated operational workflows across 500+ enterprises"
        ],
        badge: "PHASE 03 • PLANNED",
        order: 3
      },
      {
        phaseKey: "phase-04",
        title: "Global Autonomous Operating Layer",
        timeframe: "2032 – 2035",
        description: "DevSamp becomes the default decentralized operating layer for next-generation digital businesses worldwide.",
        objectives: [
          "Power mission-critical operations across 10+ core industries",
          "Sub-10ms global edge synchronization",
          "Fully open-source and modular developer infrastructure"
        ],
        milestones: [
          "Global interconnected technology backbone",
          "Ecosystem powering millions of daily transactional workflows"
        ],
        badge: "PHASE 04 • STRATEGIC DESTINATION",
        order: 4
      }
    ],
    ecosystemLayers: [
      {
        layerName: "DEVSAMP CORE INFRASTRUCTURE",
        role: "Foundation Layer",
        description: "Multi-tenant database clusters, edge CDN, global encryption, and session isolation.",
        components: ["Next.js 15 Hybrid Runtime", "MongoDB Atlas Mesh", "Edge Key-Value Sync", "Zero-Trust RBAC"],
        icon: "Cpu",
        order: 1
      },
      {
        layerName: "UNIFIED APPLICATION & API LAYER",
        role: "Presentation & Integration",
        description: "Vertical SaaS suites and developer gateways communicating over standardized REST and event webhooks.",
        components: ["MedERP Pro Suite", "FlowPulse POS", "DevScale Core", "Open REST Gateway"],
        icon: "Boxes",
        order: 2
      },
      {
        layerName: "ORGANIZATIONS & TENANCY MESH",
        role: "Business Execution",
        description: "Granular enterprise organizations with custom domain routing, SLA retainers, and telemetry streams.",
        components: ["Hospital Networks", "Fintech Operators", "E-Commerce Brands", "Enterprise Engineering Pods"],
        icon: "Building2",
        order: 3
      },
      {
        layerName: "GLOBAL END-USER EXPERIENCES",
        role: "Interaction Layer",
        description: "Sub-50ms web interfaces, mobile web PWA clients, and instant offline-first dashboards.",
        components: ["Doctors & Clinicians", "Store Managers", "Platform Engineers", "End Consumers"],
        icon: "Users",
        order: 4
      }
    ],
    pillars: [
      {
        title: "Product-First Engineering",
        shortDescription: "We build and operate production SaaS platforms before offering architecture services to clients.",
        description: "Every pattern we deploy has been battle-tested on our own revenue-generating software.",
        icon: "Boxes",
        metric: "100% In-House",
        badge: "FOUNDATION",
        order: 1
      },
      {
        title: "Shared Infrastructure Mesh",
        shortDescription: "One reliable multi-tenant backbone powering authentication, billing, and webhooks across all apps.",
        description: "Eliminates duplicate engineering and creates an effortlessly compounding software suite.",
        icon: "Layers",
        metric: "Unified Core",
        badge: "ARCHITECTURE",
        order: 2
      },
      {
        title: "Open Developer Protocols",
        shortDescription: "Comprehensive REST APIs, event-driven webhooks, and SDKs for global developers.",
        description: "Empowering developers to extend, integrate, and automate workflows effortlessly.",
        icon: "Terminal",
        metric: "REST & Webhooks",
        badge: "EXTENSIBILITY",
        order: 3
      },
      {
        title: "Deterministic Automation",
        shortDescription: "Sub-50ms automated decision pipelines eliminating manual operational overhead.",
        description: "Reliable, audit-compliant background workflows that accelerate business velocity.",
        icon: "Cpu",
        metric: "<50ms Latency",
        badge: "EFFICIENCY",
        order: 4
      },
      {
        title: "SLA-Backed Enterprise Pods",
        shortDescription: "Direct access to software architects who write code and guarantee system reliability.",
        description: "Eliminating agency middle-managers and providing dedicated 24/7 technical guardianship.",
        icon: "ShieldCheck",
        metric: "99.9% Uptime",
        badge: "RELIABILITY",
        order: 5
      },
      {
        title: "Zero Architectural Debt",
        shortDescription: "Enforcing strict type safety, clean schemas, and instant 60fps Core Web Vitals.",
        description: "Software engineered as an appreciating asset designed to endure for decades.",
        icon: "TrendingUp",
        metric: "10x Scalability",
        badge: "QUALITY",
        order: 6
      }
    ],
    productVision: {
      title: "The Evolution of DevSamp Software",
      description: "How our software model transitions from custom project development to reusable multi-tenant platforms, specialized vertical SaaS suites, and a self-orchestrating product mesh.",
      evolutionSteps: [
        {
          from: "Isolated Agency Builds",
          to: "Reusable Architectural Foundations",
          description: "Transitioning one-off client builds into standardized, hardened Next.js and MongoDB templates.",
          status: "COMPLETED"
        },
        {
          from: "Fragmented Standalone Tools",
          to: "Vertical SaaS Flagships (MedERP Pro)",
          description: "Engineering dedicated, industry-specific SaaS platforms that solve deep operational workflows.",
          status: "ACTIVE"
        },
        {
          from: "Single-App Deployments",
          to: "The Interconnected Product Mesh",
          description: "Unifying all apps under shared authentication, cross-product data sync, and single billing.",
          status: "IN PROGRESS"
        },
        {
          from: "Manual Business Ops",
          to: "Autonomous Business Operating Layer",
          description: "Software that self-reconciles, monitors telemetry, and triggers deterministic actions globally.",
          status: "2030+ HORIZON"
        }
      ]
    },
    platformVision: {
      title: "One Unified Infrastructure Underneath Multiple Vertical Products",
      description: "Shared core services—including universal authentication, tenant isolation, automated telemetry, global billing, and event webhooks—power every application we ship.",
      sharedCapabilities: [
        { name: "Universal Identity & RBAC", description: "Single sign-on, cryptographic JWT cookie sessions, and granular permission scopes.", icon: "Lock" },
        { name: "Multi-Tenant Isolation", description: "Zero cross-tenant data leakage with automated collection indexing and schema security.", icon: "ShieldCheck" },
        { name: "Event Mesh & Webhooks", description: "Real-time pub/sub event dispatchers with retry backoff and idempotency guarantees.", icon: "Workflow" },
        { name: "Global Telemetry & Health", description: "Sub-second error telemetry, runtime vital logging, and automated SLA health alerts.", icon: "Activity" }
      ]
    },
    aiDirection: {
      title: "Deterministic Autonomous Workflows",
      description: "We focus on high-precision, low-latency automated intelligence—not gimmicks. Our systems eliminate operational bottlenecks in clinical workflows, inventory forecasting, and financial reconciliation.",
      focusAreas: [
        { title: "Clinical & Diagnostic Automation", description: "Automated lab report parsing, diagnostic triage assistance, and patient workflow routing in MedERP Pro.", latencyTarget: "<40ms", icon: "Cpu" },
        { title: "Smart Inventory & Stock Telemetry", description: "Predictive re-ordering algorithms for multi-branch retail and pharmaceutical warehouses.", latencyTarget: "<25ms", icon: "TrendingUp" },
        { title: "Automated DevOps & Anomaly Detection", description: "Continuous index monitoring, slow-query tracing, and automated zero-downtime hot patches.", latencyTarget: "Real-time", icon: "Terminal" }
      ]
    },
    developerVision: {
      title: "An Open Platform for Global Builders",
      description: "Opening our REST gateways, event webhooks, and modular SDKs so external engineering teams can build custom applications directly on DevSamp infrastructure.",
      tools: [
        { name: "Open REST API Gateway", description: "Uniform JSON payloads, rate-limiting, and comprehensive OpenAPI 3.1 documentation.", icon: "Terminal" },
        { name: "Webhook Dispatcher", description: "Cryptographically signed HTTP POST webhooks with delivery guarantees and replay logs.", icon: "Workflow" },
        { name: "Type-Safe Client SDKs", description: "Lightweight JavaScript and Node.js SDKs with zero third-party dependencies.", icon: "Code2" },
        { name: "Starter Architecture Kits", description: "Production boilerplates for Next.js 15, Tailwind, and MongoDB Atlas.", icon: "Boxes" }
      ]
    },
    techDirection: {
      title: "Next-Decade Engineering Standards",
      description: "Building on immutable server state, zero-overhead edge streaming, sub-10ms database indexes, and end-to-end type safety.",
      standards: [
        { title: "Server-First Next.js 15 & React 19", description: "Zero client-side JS bundle bloat with streaming SSR and Suspense boundaries.", icon: "Cpu", badge: "FRAMEWORK" },
        { title: "Optimized Mongo Document Index Trees", description: "Compound index structures guaranteeing sub-10ms query times at 10M+ documents.", icon: "Database", badge: "DATA LAYER" },
        { title: "Instant 60fps & Zero Visual Shift", description: "GPU-accelerated animations, strictly reserved layout boxes, and 100/100 Core Web Vitals.", icon: "Zap", badge: "UI PHYSICS" },
        { title: "End-to-End Type Safety & RBAC", description: "Strict schema contracts, payload validation, and HTTP-only encrypted session cookies.", icon: "Lock", badge: "SECURITY" }
      ]
    },
    roadmap: [
      {
        title: "MedERP Pro Clinical Suite v2.0",
        category: "Product",
        timeframe: "Q2 2026",
        description: "Offline-first clinical synchronization, automated pharmacy billing, and diagnostic PACS integration.",
        status: "in-progress",
        public: true,
        order: 1
      },
      {
        title: "Universal Developer REST Gateway",
        category: "Developer",
        timeframe: "Q3 2026",
        description: "Public API portal with automated API key generation, rate limits, and webhook listeners.",
        status: "planned",
        public: true,
        order: 2
      },
      {
        title: "FlowPulse Multi-Branch Retail POS",
        category: "Product",
        timeframe: "Q4 2026",
        description: "Cloud POS with sub-50ms barcode scanning, thermal printing drivers, and multi-store inventory sync.",
        status: "planned",
        public: true,
        order: 3
      },
      {
        title: "Global Multi-Tenant Edge Mesh",
        category: "Platform",
        timeframe: "2027",
        description: "Decentralized read replicas and global session edge caching for sub-15ms worldwide latency.",
        status: "future",
        public: true,
        order: 4
      }
    ],
    principles: [
      {
        title: "Think in Decades, Build for Tomorrow",
        description: "We make architectural decisions that compound in value over 10+ years rather than taking quick shortcuts.",
        icon: "Compass",
        order: 1
      },
      {
        title: "Radical Simplicity Over Complexity",
        description: "The best systems are readable, modular, and easy to maintain by any senior software engineer.",
        icon: "Code2",
        order: 2
      },
      {
        title: "Build What Solves Real Operational Pain",
        description: "We don't build vaporware or speculative toys. Every tool solves genuine business bottlenecks.",
        icon: "Target",
        order: 3
      },
      {
        title: "Uncompromising Quality & 60fps Speed",
        description: "Every pixel, database query, and animation must be tuned for instantaneous, butter-smooth execution.",
        icon: "Zap",
        order: 4
      }
    ],
    futureState: {
      title: "The DevSamp 2035 Destination",
      visionDestination: "A global interconnected network of vertical SaaS platforms, engineering pods, and developer nodes operating with 99.99% uptime and zero friction.",
      coreOutcomes: [
        { metric: "10+", label: "CORE INDUSTRIES", desc: "Healthcare, retail, finance, supply chain, and education." },
        { metric: "<10ms", label: "GLOBAL EDGE LATENCY", desc: "Instantaneous state synchronization worldwide." },
        { metric: "100%", label: "IN-HOUSE PRECISION", desc: "No outsourced debt, zero compromised quality." }
      ]
    },
    faqs: [
      {
        question: "What is DevSamp's 10–15 year long-term vision?",
        answer: "DevSamp is evolving into a comprehensive connected technology ecosystem that combines vertical SaaS products, bespoke engineering pods, and developer infrastructure into a unified global operating layer.",
        order: 1
      },
      {
        question: "Is DevSamp focused on products or client engineering?",
        answer: "Both. We are a product-first technology company. We build and operate our own software platforms while also deploying dedicated engineering pods for clients who need custom platforms built to SaaS standards.",
        order: 2
      },
      {
        question: "What role will AI and automation play in DevSamp's future?",
        answer: "We focus on deterministic, low-latency workflow automation—such as automated lab report analysis in MedERP Pro, inventory forecasting in FlowPulse, and self-healing system telemetry—without speculative buzzwords.",
        order: 3
      },
      {
        question: "How can businesses collaborate with DevSamp today?",
        answer: "Businesses can deploy our existing vertical SaaS products (like MedERP Pro) or commission a dedicated engineering pod to architect custom software platforms.",
        order: 4
      }
    ],
    finalCta: {
      title: "Shape the Future of Digital Ecosystems with DevSamp.",
      description: "Whether you are looking to deploy enterprise software products or partner with an elite engineering pod, we are ready to build with you.",
      primaryCta: {
        text: "Explore Software Products",
        link: "/products"
      },
      secondaryCta: {
        text: "Initialize Conversation",
        link: "/#contact"
      }
    }
  };

  await VisionPage.findOneAndUpdate(
    { key: "main" },
    { $setOnInsert: defaultVisionData },
    { upsert: true, new: true }
  );
  console.log("✓ Vision page content verified/seeded.");

  console.log("\n🎉 DevSamp Ecosystem Baseline Seed Completed Successfully!\n");
  await mongoose.disconnect();
  process.exit(0);
}


seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});

