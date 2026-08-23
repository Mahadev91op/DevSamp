import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Pricing from '@/models/Pricing';
import Product from '@/models/Product';
import EcosystemItem from '@/models/EcosystemItem';
import Industry from '@/models/Industry';
import HomepageSection from '@/models/HomepageSection';
import SiteSetting from '@/models/SiteSetting';
import Service from '@/models/Service';

export async function GET() {
  try {
    await connectDB();
    
    // 1. SEED HOMEPAGE SECTIONS CONFIGURATION (CMS Control)
    const existingSections = await HomepageSection.countDocuments();
    if (existingSections === 0) {
      const defaultSections = [
        {
          key: "hero",
          badge: "Technology • Products • Ecosystem",
          title: "Building, Operating & Scaling Digital Ecosystems with Next-Gen Products & Engineering",
          description: "DevSamp powers forward-thinking enterprises with scalable software products, fullstack digital solutions, and an interconnected developer ecosystem.",
          ctaText: "Explore Products",
          ctaLink: "/#products",
          secondaryCtaText: "Explore Ecosystem",
          secondaryCtaLink: "/#ecosystem",
          order: 1,
          isActive: true,
        },
        {
          key: "ecosystem-intro",
          badge: "Architecture",
          title: "One ecosystem. Multiple possibilities.",
          subtitle: "Connected Foundations",
          description: "Discover how DevSamp bridges SaaS products, custom engineering services, developer platforms, and cloud infrastructure under a unified ecosystem.",
          order: 2,
          isActive: true,
        },
        {
          key: "featured-products",
          badge: "Software Suite",
          title: "Flagship Software Products & Platforms",
          subtitle: "Built to Scale",
          description: "Explore our production-grade software applications and SaaS tools engineered for enterprise velocity and reliability.",
          ctaText: "View All Products",
          ctaLink: "/#products",
          order: 3,
          isActive: true,
        },
        {
          key: "services",
          badge: "Capabilities",
          title: "Engineering Services & Capabilities",
          subtitle: "Precision Development",
          description: "Bespoke software development, cloud architectures, and digital product design delivered by seasoned engineers.",
          order: 4,
          isActive: true,
        },
        {
          key: "ecosystem-map",
          badge: "Interactive Graph",
          title: "The DevSamp Connected Ecosystem",
          subtitle: "Live Telemetry",
          description: "Explore how products, services, developers, integrations, and partners interoperate seamlessly within our infrastructure.",
          order: 5,
          isActive: true,
        },
        {
          key: "why-devsamp",
          badge: "Value Matrix",
          title: "Why High-Growth Companies Choose DevSamp",
          subtitle: "Engineered for Growth",
          description: "Combining product DNA with custom engineering rigor to give your organization an unfair technological advantage.",
          order: 6,
          isActive: true,
        },
        {
          key: "industries",
          badge: "Domain Expertise",
          title: "Tailored Solutions for Core Industries",
          subtitle: "Vertical Specialization",
          description: "Proven architectures addressing the operational, security, and scalability demands of modern business sectors.",
          order: 7,
          isActive: true,
        },
        {
          key: "developers",
          badge: "Developer First",
          title: "Build, Extend & Integrate with DevSamp",
          subtitle: "Open Platform",
          description: "Robust REST APIs, event-driven webhooks, modular SDKs, and developer-first tooling to build scalable extensions.",
          ctaText: "Explore Documentation",
          ctaLink: "/#contact",
          order: 8,
          isActive: true,
        },
        {
          key: "trust",
          badge: "Security & SLA",
          title: "Built on Trust, Security & Reliability",
          subtitle: "Zero Compromise",
          description: "Engineered with strict data privacy protocols, resilient uptime architectures, and dedicated enterprise maintenance.",
          order: 9,
          isActive: true,
        },
        {
          key: "testimonials",
          badge: "Client Stories",
          title: "Trusted by Builders & Industry Leaders",
          subtitle: "Client Testimonials",
          description: "Real reviews and feedback from founders and engineering leaders who build with DevSamp.",
          order: 10,
          isActive: true,
        },
        {
          key: "latest-updates",
          badge: "Changelog",
          title: "Latest Releases & Engineering Devlogs",
          subtitle: "Version Control",
          description: "Continuous deployment logs, feature releases, and technical breakdowns from our engineering branches.",
          order: 11,
          isActive: true,
        },
        {
          key: "faq",
          badge: "Diagnostics",
          title: "Frequently Asked Questions & Diagnostics",
          subtitle: "Technical Queries",
          description: "Run diagnostic queries or explore documentation regarding project scoping, integration, and SLA terms.",
          order: 12,
          isActive: true,
        },
        {
          key: "final-cta",
          badge: "Next Step",
          title: "Build what's next with the DevSamp Ecosystem.",
          subtitle: "Start Your Journey",
          description: "Whether you need an enterprise software product or bespoke engineering, our core team is ready to deploy your solution.",
          ctaText: "Explore Products",
          ctaLink: "/#products",
          secondaryCtaText: "Initialize Project",
          secondaryCtaLink: "/#contact",
          order: 13,
          isActive: true,
        },
      ];
      await HomepageSection.insertMany(defaultSections);
    }

    // 2. SEED SITE SETTINGS
    const existingSettings = await SiteSetting.findOne({ key: "main" });
    if (!existingSettings) {
      await SiteSetting.create({
        key: "main",
        siteName: "DevSamp",
        tagline: "Technology • Software Products • SaaS • Digital Solutions Ecosystem",
        contactEmail: "devsamp1st@gmail.com",
        contactPhone: "+91 9330680642",
        address: "India",
        socialLinks: [
          { platform: "Freelancer", url: "https://www.freelancer.in/u/DevSamp" },
          { platform: "YouTube", url: "https://www.youtube.com/@DevSamp1st" },
          { platform: "X", url: "https://x.com/devsamp1st" },
          { platform: "Instagram", url: "https://www.instagram.com/devsamp1st/" },
          { platform: "LinkedIn", url: "https://www.linkedin.com/company/devsamp" }
        ],
        heroEyebrow: "Technology • Software Products • Ecosystem",
        heroTitle: "Building, Operating & Scaling Digital Ecosystems with Next-Gen Products & Engineering",
        heroDescription: "DevSamp powers modern enterprises with high-performance software products, scalable cloud platforms, and bespoke technology services.",
        heroPrimaryCta: { text: "Explore Products", link: "/#products" },
        heroSecondaryCta: { text: "Explore Ecosystem", link: "/#ecosystem" },
        finalCtaTitle: "Build what's next with DevSamp Ecosystem.",
        finalCtaDescription: "Deploy high-scale SaaS products or partner with our engineering squad to compile your architectural vision.",
        finalCtaPrimary: { text: "Explore Products", link: "/#products" },
        finalCtaSecondary: { text: "Initialize Project", link: "/#contact" }
      });
    }

    // 3. SEED INITIAL PRODUCTS (Real flagship product definitions)
    const existingProducts = await Product.countDocuments();
    if (existingProducts === 0) {
      const defaultProducts = [
        {
          name: "MedERP Pro",
          slug: "mederp-pro",
          tagline: "Intelligent Healthcare ERP & Clinic Management System",
          description: "A HIPAA-ready cloud ERP for multi-specialty hospitals and clinics with real-time OPD queues, billing ledger, pharmacy inventory, and telemedicine integration.",
          category: "Healthcare SaaS",
          status: "Live",
          featured: true,
          logoIcon: "Activity",
          capabilities: ["OPD/IPD Management", "Smart Billing & GST", "Pharmacy Stock Sync", "Tele-Consultations"],
          pricingSnippet: "Enterprise Tier",
          productUrl: "https://devsamp.online/products/mederp",
          docsUrl: "#contact",
          gradient: "from-blue-600 to-cyan-500",
          order: 1,
          isActive: true
        },
        {
          name: "DevScale Core",
          slug: "devscale-core",
          tagline: "High-Concurrency Multi-Tenant SaaS Boilerplate & Engine",
          description: "Enterprise foundation with Next.js 15, automated tenant isolation, RBAC permissions, Stripe/Razorpay billing, and pre-built admin diagnostics.",
          category: "Developer Platform",
          status: "Live",
          featured: true,
          logoIcon: "Boxes",
          capabilities: ["Multi-Tenancy Engine", "RBAC & JWT Auth", "Global Webhooks", "Telemetry Dashboard"],
          pricingSnippet: "Developer License",
          productUrl: "https://devsamp.online/products/devscale",
          docsUrl: "#contact",
          gradient: "from-indigo-600 to-purple-600",
          order: 2,
          isActive: true
        },
        {
          name: "FlowPulse POS",
          slug: "flowpulse-pos",
          tagline: "Next-Gen Retail POS & Real-Time Inventory Network",
          description: "Ultra-fast offline-first point-of-sale system with automated stock synchronization, multi-store analytics, and instant invoice generation.",
          category: "Retail & Commerce",
          status: "Live",
          featured: true,
          logoIcon: "CreditCard",
          capabilities: ["Offline First Sync", "Multi-Store Mesh", "Barcode Engine", "Automated Bookkeeping"],
          pricingSnippet: "Subscription",
          productUrl: "https://devsamp.online/products/flowpulse",
          docsUrl: "#contact",
          gradient: "from-emerald-600 to-teal-500",
          order: 3,
          isActive: true
        },
        {
          name: "OmniDesk AI",
          slug: "omnidesk-ai",
          tagline: "Automated Customer Support & AI Workflow Engine",
          description: "AI-assisted ticket triaging, automated client replies, and omnichannel communication bridge powered by customized LLM agents.",
          category: "AI Solutions",
          status: "Beta",
          featured: true,
          logoIcon: "Sparkles",
          capabilities: ["Custom Agent Prompts", "WhatsApp/Email Sync", "Sentiment Diagnostics", "API Connectors"],
          pricingSnippet: "Beta Access",
          productUrl: "https://devsamp.online/products/omnidesk",
          docsUrl: "#contact",
          gradient: "from-purple-600 to-pink-600",
          order: 4,
          isActive: true
        }
      ];
      await Product.insertMany(defaultProducts);
    }

    // 4. SEED ECOSYSTEM ITEMS (Interactive graph nodes)
    const existingEcosystem = await EcosystemItem.countDocuments();
    if (existingEcosystem === 0) {
      const defaultEcosystem = [
        {
          nodeId: "core",
          title: "DevSamp Core Hub",
          category: "core",
          shortDesc: "Central orchestration engine coordinating products, services, API gateways, and developer tools.",
          icon: "Cpu",
          statusBadge: "Active Core",
          connections: ["products", "services", "developers", "customers", "integrations", "support"],
          linkUrl: "/#ecosystem",
          metrics: "99.9% Uptime",
          color: "from-blue-600 to-indigo-600",
          order: 1,
          isActive: true
        },
        {
          nodeId: "products",
          title: "Software Products",
          category: "product",
          shortDesc: "Enterprise SaaS applications, vertical ERPs, and ready-to-deploy platforms built by DevSamp.",
          icon: "Boxes",
          statusBadge: "4+ Live Apps",
          connections: ["core", "customers", "integrations"],
          linkUrl: "/#products",
          metrics: "Production Ready",
          color: "from-indigo-500 to-purple-500",
          order: 2,
          isActive: true
        },
        {
          nodeId: "services",
          title: "Technology Services",
          category: "service",
          shortDesc: "Bespoke full-stack web development, AI workflow automation, and custom software engineering.",
          icon: "Layers",
          statusBadge: "Full-Stack",
          connections: ["core", "customers", "developers"],
          linkUrl: "/#services",
          metrics: "Custom Scope",
          color: "from-blue-500 to-cyan-500",
          order: 3,
          isActive: true
        },
        {
          nodeId: "developers",
          title: "Developer Platform",
          category: "developer",
          shortDesc: "APIs, documentation, webhooks, and SDKs empowering engineers to build custom extensions.",
          icon: "Terminal",
          statusBadge: "REST & Webhooks",
          connections: ["core", "products", "integrations"],
          linkUrl: "/#developers",
          metrics: "Open SDKs",
          color: "from-purple-500 to-pink-500",
          order: 4,
          isActive: true
        },
        {
          nodeId: "integrations",
          title: "Ecosystem Integrations",
          category: "integration",
          shortDesc: "Connectors for payment gateways, cloud providers, ERP systems, CRMs, and messaging channels.",
          icon: "GitBranch",
          statusBadge: "Universal Mesh",
          connections: ["core", "products", "developers"],
          linkUrl: "/#ecosystem",
          metrics: "20+ Protocols",
          color: "from-emerald-500 to-green-500",
          order: 5,
          isActive: true
        },
        {
          nodeId: "customers",
          title: "Customer Network",
          category: "customer",
          shortDesc: "Businesses, clinics, startups, and institutions operating their mission-critical workloads.",
          icon: "Users",
          statusBadge: "Global Clients",
          connections: ["core", "products", "services", "support"],
          linkUrl: "/#work",
          metrics: "150+ Deployed",
          color: "from-amber-500 to-orange-500",
          order: 6,
          isActive: true
        },
        {
          nodeId: "support",
          title: "Long-term Support",
          category: "support",
          shortDesc: "Continuous SLA monitoring, security patch pipelines, and direct engineering escalation.",
          icon: "ShieldCheck",
          statusBadge: "24/7 SLA",
          connections: ["core", "customers", "services"],
          linkUrl: "/#contact",
          metrics: "Dedicated Squad",
          color: "from-cyan-500 to-blue-600",
          order: 7,
          isActive: true
        }
      ];
      await EcosystemItem.insertMany(defaultEcosystem);
    }

    // 5. SEED INDUSTRIES
    const existingIndustries = await Industry.countDocuments();
    if (existingIndustries === 0) {
      const defaultIndustries = [
        {
          name: "Healthcare & Life Sciences",
          slug: "healthcare",
          summary: "HIPAA-compliant hospital management, telemedicine gateways, and automated patient diagnostic portals.",
          icon: "Activity",
          badge: "Clinical Grade",
          useCases: ["Hospital ERP", "Electronic Health Records (EHR)", "Lab Test Telemetry", "Telemedicine"],
          relatedProducts: ["MedERP Pro"],
          relatedServices: ["Custom Web Development", "API/Backend Infrastructure"],
          order: 1,
          isActive: true
        },
        {
          name: "Financial Tech & Billing",
          slug: "fintech",
          summary: "High-security ledger systems, multi-currency invoicing, and real-time payment reconciliation.",
          icon: "CreditCard",
          badge: "PCI DSS Standard",
          useCases: ["Payment Gateway Connectors", "Automated Invoicing", "Subscription Billing Engine"],
          relatedProducts: ["DevScale Core"],
          relatedServices: ["SaaS Architecture", "Database Optimization"],
          order: 2,
          isActive: true
        },
        {
          name: "Retail & E-Commerce",
          slug: "retail",
          summary: "Omnichannel inventory orchestration, lightning-fast storefronts, and multi-location POS systems.",
          icon: "ShoppingBag",
          badge: "Omnichannel",
          useCases: ["Offline-First POS", "Real-Time Stock Mesh", "Custom Headless Storefronts"],
          relatedProducts: ["FlowPulse POS"],
          relatedServices: ["Next.js Applications", "UI/UX Engineering"],
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
          relatedServices: ["Fullstack Development", "Cloud DevOps"],
          order: 4,
          isActive: true
        }
      ];
      await Industry.insertMany(defaultIndustries);
    }

    // 6. Check and preserve existing services/pricing
    const existingPricing = await Pricing.countDocuments();
    if (existingPricing === 0) {
      const defaultPricing = [
        {
          name: "Starter",
          desc: "Perfect for single product landing pages, fast prototypes, and emerging projects.",
          priceMonthly: "299",
          priceYearly: "2900",
          features: [
            "Single Web App Deployment",
            "Responsive Mobile UI System",
            "SEO & PageSpeed 100 Setup",
            "Contact Form & Email SMTP",
            "1 Month SLA Support"
          ],
          missing: [
            "Multi-Tenant Database",
            "Custom REST API Gateway",
            "Dedicated Support Channel"
          ],
          popular: false,
          gradient: "from-blue-500 to-cyan-500"
        },
        {
          name: "Growth & SaaS",
          desc: "Engineered for growing SaaS platforms, database-driven systems, and custom workflows.",
          priceMonthly: "699",
          priceYearly: "6900",
          features: [
            "Next.js App Router Architecture",
            "MongoDB Database & Indexing",
            "Custom Admin CMS Dashboard",
            "Authentication & RBAC Security",
            "REST API & Webhooks Engine",
            "3 Months Priority Support"
          ],
          missing: ["Dedicated Engineering Pod"],
          popular: true,
          gradient: "from-indigo-600 to-purple-600"
        },
        {
          name: "Enterprise Ecosystem",
          desc: "Full bespoke software architecture, multi-product integration, and dedicated maintenance.",
          priceMonthly: "1499",
          priceYearly: "14900",
          features: [
            "Complete Ecosystem Engineering",
            "Custom Microservices & APIs",
            "High-Concurrency DB Scaling",
            "End-to-End Encryption & Security",
            "Dedicated Engineering Pod",
            "24/7 SLA Uptime Guarantee"
          ],
          missing: [],
          popular: false,
          gradient: "from-orange-500 to-red-500"
        }
      ];
      await Pricing.insertMany(defaultPricing);
    }

    return NextResponse.json({ message: "DevSamp Ecosystem Baseline Data Seeded Successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}