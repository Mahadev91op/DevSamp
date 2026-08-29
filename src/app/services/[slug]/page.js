import EcosystemPageShell from "@/components/EcosystemPageShell";
import Link from "next/link";
import {
  Code2,
  Globe,
  Layers,
  Smartphone,
  Sparkles,
  Brain,
  Zap,
  Terminal,
  Cloud,
  ShieldCheck,
  Cpu,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

const SERVICE_META = {
  "web-development": {
    name: "Fullstack Web Development",
    tagline: "Next.js 15, React, Node.js & Ultra-Fast Edge Runtimes",
    desc: "We build sub-second web platforms engineered for maximum SEO, fluid 60fps animations, server actions, and enterprise scalability.",
    badge: "FULLSTACK WEB",
    deliverables: ["SSR/SSG hybrid rendering", "Tailored Vanilla/Atomic CSS design systems", "SEO-optimized semantic HTML architecture", "Sub-second core web vitals"]
  },
  "saas-development": {
    name: "Multi-Tenant SaaS Engineering",
    tagline: "Cloud Architectures with Granular Tenant Isolation",
    desc: "Architecting scalable B2B SaaS platforms from scratch with multi-tenant logical schemas, automated onboarding, Stripe billing, and RBAC.",
    badge: "SaaS ARCHITECTURE",
    deliverables: ["Tenant isolation & subdomain routing", "Subscription metering & automated invoicing", "Role-based access control (RBAC)", "Custom feature flag entitlement engines"]
  },
  "mobile-app-development": {
    name: "Mobile App Development",
    tagline: "High-Performance iOS & Android Solutions",
    desc: "Cross-platform mobile applications with offline SQLite sync, camera barcode scanning, push notifications, and native performance.",
    badge: "MOBILE APPS",
    deliverables: ["React Native & Flutter architectures", "Offline-first SQLite local caching", "Hardware peripheral & bluetooth thermal printer sync", "App Store & Play Store publishing support"]
  },
  "ui-ux-design": {
    name: "UI/UX & Design Systems",
    tagline: "Pixel-Perfect, Accessible & Motion-Driven Design",
    desc: "World-class digital product design. We create comprehensive Figma design tokens, fluid interactive prototypes, and accessible design languages.",
    badge: "DESIGN SYSTEMS",
    deliverables: ["Atomic component libraries & tokens", "High-fidelity clickable Figma prototypes", "WCAG 2.1 AA accessibility compliance", "Micro-interaction & motion choreography"]
  },
  "ai-solutions": {
    name: "AI Solutions & Neural Workflows",
    tagline: "LLM Integrations, Semantic Search & Autonomous Agents",
    desc: "Transforming enterprise workflows by embedding customized large language models, semantic vector indexing, and automated intelligent task routing.",
    badge: "ARTIFICIAL INTELLIGENCE",
    deliverables: ["Custom RAG pipelines with vector databases", "Autonomous agent task execution", "AI clinical notes summarization", "Semantic document indexing & retrieval"]
  },
  "automation": {
    name: "Business Process Automation",
    tagline: "End-to-End Event Triggers & Data Reconciliation",
    desc: "Eliminating manual data entry by synchronizing billing systems, inventory catalogs, WhatsApp triggers, and ERP ledgers automatically.",
    badge: "AUTOMATION",
    deliverables: ["Real-time webhook event meshes", "Automated Tally/ERP ledger sync", "WhatsApp & SMS transactional dispatch", "Reconciliation error detection bots"]
  },
  "api-backend-development": {
    name: "API & Backend Architecture",
    tagline: "Low-Latency REST, GraphQL & Micro-Gateways",
    desc: "High-throughput backend architectures engineered to process tens of thousands of requests per second with zero bottlenecks.",
    badge: "BACKEND APIS",
    deliverables: ["OpenAPI/Swagger documented endpoints", "Rate limiting, Redis caching & token bucket algorithms", "Distributed locking & concurrency control", "Micro-gateway event bus routing"]
  },
  "cloud-deployment": {
    name: "Cloud & DevOps Infrastructure",
    tagline: "Docker, Kubernetes & Zero-Downtime CI/CD",
    desc: "Bulletproof cloud infrastructure setup on AWS, GCP, or DigitalOcean with automated deployment pipelines, geo-redundancy, and monitoring.",
    badge: "CLOUD & DEVOPS",
    deliverables: ["Automated GitHub Actions CI/CD pipelines", "Kubernetes cluster orchestration", "Geo-redundant encrypted database snapshots", "Prometheus & Grafana telemetry dashboards"]
  },
  "maintenance-support": {
    name: "Maintenance & 24/7 SLA Support",
    tagline: "Continuous Uptime, Security Patches & Upgrades",
    desc: "Long-term partnership with guaranteed SLAs. We monitor your cluster health, apply weekly security updates, and resolve incidents in minutes.",
    badge: "SLA SUPPORT",
    deliverables: ["15-minute emergency response SLA", "Proactive uptime & performance monitoring", "Quarterly framework & dependency upgrades", "Dedicated L3 engineer on call"]
  },
  "custom-software": {
    name: "Custom Enterprise Software",
    tagline: "Bespoke Solutions for Unique Operational Workflows",
    desc: "When off-the-shelf software falls short, our senior pods engineer bespoke enterprise systems tailored exactly to your unique organizational rules.",
    badge: "CUSTOM SOFTWARE",
    deliverables: ["100% bespoke architecture & proprietary IP", "Legacy system data extraction & migration", "On-premise air-gapped deployment option", "Comprehensive handover & team training"]
  }
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const meta = SERVICE_META[slug] || { name: "Engineering Service", desc: "DevSamp dedicated engineering capabilities." };
  return {
    title: `${meta.name} | DevSamp Services`,
    description: meta.desc,
  };
}

export default async function ServicePillarPage({ params }) {
  const { slug } = await params;
  const meta = SERVICE_META[slug] || {
    name: slug.replace(/-/g, " ").toUpperCase(),
    tagline: "Dedicated Engineering Pod Capability",
    desc: "High-scale engineering service delivered by DevSamp senior architects.",
    badge: "SERVICES",
    deliverables: ["Architecture design document", "Senior pod sprint delivery", "Automated testing & CI/CD", "SLA maintenance"]
  };

  return (
    <EcosystemPageShell
      breadcrumbs={[
        { label: "Services", href: "/services" },
        { label: meta.name, href: `/services/${slug}` }
      ]}
      badge={meta.badge}
      title={meta.name}
      subtitle={meta.desc}
      primaryAction={{ label: "Commission Pod Sprint", href: "/contact" }}
      secondaryAction={{ label: "View Process", href: "/services/process" }}
      relatedSection={{
        badge: "TRANSPARENT PRICING",
        title: "Explore Dedicated Pod Retainer Packages",
        description: "Choose between rapid fixed-scope MVP sprints or monthly dedicated engineering pods.",
        href: "/services/pricing",
        actionLabel: "View Retainer Tiers"
      }}
    >
      <div className="space-y-10 max-w-4xl">
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-slate-900">What We Deliver for {meta.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {meta.deliverables.map((deliv, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                <CheckCircle2 size={18} className="text-indigo-600 shrink-0 mt-0.5" />
                <span className="text-xs font-semibold text-slate-800">{deliv}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white space-y-4">
          <h3 className="text-base font-bold">Why Partner with DevSamp for {meta.name}?</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            We operate as true engineering partners—not a generic outsourcing shop. You interface directly with senior architects who write clean, modular, zero-debt code designed to power your business for the next 10–15 years.
          </p>
          <div className="pt-2">
            <Link href="/contact">
              <button className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2">
                <span>Talk with Lead Architect</span>
                <ArrowRight size={13} />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </EcosystemPageShell>
  );
}
