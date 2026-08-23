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

  console.log("\n🎉 DevSamp Ecosystem Baseline Seed Completed Successfully!\n");
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
