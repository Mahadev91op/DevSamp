import EcosystemPageShell from "@/components/EcosystemPageShell";
import Link from "next/link";
import {
  Cpu,
  ShieldCheck,
  Building2,
  Lock,
  Key,
  CreditCard,
  Bell,
  BarChart3,
  Sliders,
  Workflow,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

const PLATFORM_DETAILS = {
  "identity": {
    name: "Central Identity & Authentication (SSO)",
    badge: "SSO CORE",
    desc: "Single Sign-On and centralized identity management for all DevSamp applications.",
    points: [
      "JWT and opaque session token management with multi-device session revocation.",
      "Support for OAuth2, SAML 2.0 (Okta/Azure AD), and Google Workspace login.",
      "Hardware security key (WebAuthn/FIDO2) and TOTP two-factor authentication."
    ]
  },
  "tenants": {
    name: "Organizations & Multi-Tenancy Engine",
    badge: "TENANT ISOLATION",
    desc: "Logical and physical tenant separation guaranteeing enterprise data privacy.",
    points: [
      "Custom subdomain routing (e.g. apexcare.mederp.online) with automated SSL provisioning.",
      "Hierarchical parent-organization and satellite branch tenancy models.",
      "Automated tenant database provisioning and schema migration pipelines."
    ]
  },
  "roles": {
    name: "Roles & Permissions Engine (RBAC)",
    badge: "ACCESS CONTROL",
    desc: "Fine-grained permissions governing module access, record visibility, and actions.",
    points: [
      "Declarative policy evaluation supporting Owner, Admin, Clinician, Billing, and Viewer roles.",
      "Field-level redaction for sensitive patient records and financial ledgers.",
      "Cryptographic audit log entry generated on every permission change."
    ]
  },
  "entitlements": {
    name: "Product Entitlements & Licensing",
    badge: "LICENSING",
    desc: "Dynamic feature flag gating based on subscribed product tiers and active seats.",
    points: [
      "Zero-downtime capability unlocking upon plan upgrade.",
      "Real-time seat metering with automatic overage notifications.",
      "Trial period grace management and automated license verification."
    ]
  },
  "billing": {
    name: "Central Billing & Subscriptions Engine",
    badge: "BILLING ABSTRACTION",
    desc: "Decoupled billing architecture abstracting Stripe, Razorpay, and regional banks.",
    points: [
      "Unified GST and international VAT tax invoice generation.",
      "Usage-based metering for SMS/WhatsApp notifications and API transactions.",
      "Automated retry logic and dunning workflows for failed payment collections."
    ]
  },
  "analytics": {
    name: "Ecosystem Analytics & Telemetry",
    badge: "TELEMETRY",
    desc: "Real-time cluster health, usage metrics, and business intelligence.",
    points: [
      "Sub-millisecond Prometheus latency metrics and Grafana dashboards.",
      "Aggregated patient throughput, daily active doctors, and retail GMV metrics.",
      "Privacy-first anonymized telemetry ensuring zero PII leakages."
    ]
  },
  "feature-flags": {
    name: "Feature Flags & Gradual Rollouts",
    badge: "CANARY DEPLOYMENTS",
    desc: "Safely deploy new software capabilities with targeted canary percentage rollouts.",
    points: [
      "Targeted rollouts by tenant tier, region, or specific beta customer groups.",
      "Instant 1-click global kill switch for faulty features.",
      "A/B experimentation testing framework with conversion metrics."
    ]
  },
  "integrations-hub": {
    name: "Integrations Hub & Event Mesh",
    badge: "EVENT BUS",
    desc: "Centralized event dispatcher routing webhooks and bidirectional data syncs.",
    points: [
      "Distributed Redis Streams and Kafka event queue for zero message loss.",
      "HMAC-SHA256 signature verification on all outgoing webhook dispatches.",
      "Pre-built connectors for WhatsApp, payment gateways, and hospital lab analyzers."
    ]
  },
  "compliance": {
    name: "Audit & Compliance Engine",
    badge: "GOVERNANCE",
    desc: "Immutable compliance records adhering to HIPAA, SOC-2, and Indian DPDP standards.",
    points: [
      "Cryptographically signed audit logs with write-once-read-many (WORM) storage.",
      "Automated compliance report generation for security audits.",
      "Real-time anomaly detection alerting on suspicious export activities."
    ]
  }
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = PLATFORM_DETAILS[slug] || { name: "Platform Architecture" };
  return {
    title: `${page.name} | Platform Core • DevSamp`,
    description: page.desc || "DevSamp Platform Core Architecture.",
  };
}

export default async function PlatformSubPage({ params }) {
  const { slug } = await params;
  const page = PLATFORM_DETAILS[slug] || {
    name: slug.replace(/-/g, " ").toUpperCase(),
    badge: "PLATFORM",
    desc: "Foundational architecture component of the DevSamp Ecosystem.",
    points: ["High-scale reliability", "Tenant isolation", "Continuous telemetry"]
  };

  return (
    <EcosystemPageShell
      breadcrumbs={[
        { label: "Platform Core", href: "/platform" },
        { label: page.name, href: `/platform/${slug}` }
      ]}
      badge={page.badge}
      title={page.name}
      subtitle={page.desc}
      primaryAction={{ label: "Platform Architecture", href: "/platform" }}
      secondaryAction={{ label: "Developer APIs", href: "/developers" }}
    >
      <div className="space-y-6 max-w-4xl">
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900">Architectural Guarantees</h2>
          <div className="space-y-3">
            {page.points.map((pt, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                <CheckCircle2 size={18} className="text-indigo-600 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">{pt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </EcosystemPageShell>
  );
}
