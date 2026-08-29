import EcosystemPageShell from "@/components/EcosystemPageShell";
import Link from "next/link";
import {
  Terminal,
  Code2,
  Zap,
  Lock,
  Boxes,
  Activity,
  Key,
  Gauge,
  AlertTriangle,
  RefreshCw,
  CheckCircle2,
  Copy
} from "lucide-react";

const DEV_PAGES = {
  "quickstart": {
    name: "Developer Quickstart",
    badge: "FAST ONBOARDING",
    desc: "Get started making API calls against the DevSamp sandbox environment in under 3 minutes.",
    code: `import { DevSampClient } from "@devsamp/sdk";

const devsamp = new DevSampClient({
  apiKey: process.env.DEVSAMP_API_KEY,
  environment: "sandbox" // or "production"
});

// Fetch active hospital departments
const departments = await devsamp.departments.list();
console.log("Active Pod Departments:", departments);`
  },
  "api-reference": {
    name: "REST API Reference",
    badge: "OPENAPI SPEC",
    desc: "Complete reference for all DevSamp v1 endpoints, request parameters, and response structures.",
    code: `// POST /v1/patients/admission
// Content-Type: application/json
{
  "patient": {
    "fullName": "Jane Doe",
    "gender": "FEMALE",
    "age": 34,
    "contact": "+919876543210"
  },
  "admission": {
    "department": "Cardiology",
    "bedType": "ICU",
    "attendingDoctorId": "DOC-8821"
  }
}`
  },
  "authentication": {
    name: "Authentication & OAuth2",
    badge: "SECURITY",
    desc: "How to authenticate API requests with Bearer tokens and verify webhook signatures.",
    code: `// Pass the API key in the Authorization header:
// Authorization: Bearer devsamp_live_pk_...
// Or for OAuth2 Bearer token:
// Authorization: Bearer eyJhbGciOiJIUzI1NiIs...`
  },
  "sdks": {
    name: "Client SDKs & Libraries",
    badge: "LIBRARIES",
    desc: "Official typed client packages supported across Node.js, Python, Go, and Flutter.",
    code: `# Install via npm:
npm install @devsamp/sdk

# Install via pip:
pip install devsamp-python

# Install via Go:
go get github.com/devsamp/devsamp-go`
  },
  "webhooks": {
    name: "Webhooks & Event Bus",
    badge: "REAL-TIME EVENTS",
    desc: "Listen for asynchronous platform events dispatched with cryptographic HMAC signatures.",
    code: `// Example Webhook Payload
{
  "id": "evt_9918231",
  "event": "invoice.payment_succeeded",
  "createdAt": "2026-08-29T10:00:00Z",
  "data": {
    "invoiceId": "INV-88219",
    "amount": 299900,
    "currency": "INR",
    "status": "PAID"
  }
}`
  },
  "cli": {
    name: "DevSamp CLI Tooling",
    badge: "TERMINAL TOOLS",
    desc: "Command-line utility to test webhook payloads locally and scaffold integration handlers.",
    code: `# Install CLI globally:
npm install -g @devsamp/cli

# Listen to webhooks locally:
devsamp listen --forward-to localhost:3000/api/webhooks`
  },
  "rate-limits": {
    name: "Rate Limits & Quotas",
    badge: "API QUOTAS",
    desc: "Token bucket rate limiting rules: Standard tier allows 1,000 req/min; Enterprise allows 10,000 req/sec.",
    code: `// Response Headers:
// X-RateLimit-Limit: 1000
// X-RateLimit-Remaining: 994
// X-RateLimit-Reset: 1772280000`
  },
  "errors": {
    name: "Error Codes & Troubleshooting",
    badge: "ERROR HANDLING",
    desc: "Standardized RFC-7807 error responses for seamless client-side error handling.",
    code: `{
  "error": {
    "code": "INSUFFICIENT_BED_CAPACITY",
    "message": "Selected ward currently has zero unoccupied beds.",
    "status": 409
  }
}`
  }
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = DEV_PAGES[slug] || { name: "Developer Documentation" };
  return {
    title: `${page.name} | Developer Portal • DevSamp`,
    description: page.desc || "DevSamp Developer Documentation & API Reference.",
  };
}

export default async function DeveloperSubPage({ params }) {
  const { slug } = await params;
  const page = DEV_PAGES[slug] || {
    name: slug.replace(/-/g, " ").toUpperCase(),
    badge: "DEV SPEC",
    desc: "DevSamp developer specifications and integration guides.",
    code: "// Code examples and parameters for " + slug
  };

  return (
    <EcosystemPageShell
      breadcrumbs={[
        { label: "Developer Portal", href: "/developers" },
        { label: page.name, href: `/developers/${slug}` }
      ]}
      badge={page.badge}
      title={page.name}
      subtitle={page.desc}
      primaryAction={{ label: "API Reference", href: "/developers/api-reference" }}
      secondaryAction={{ label: "Developer Home", href: "/developers" }}
      relatedSection={{
        badge: "API CREDENTIALS",
        title: "Generate API Keys in Customer Portal",
        description: "Need API keys? Log in to your client console to generate credentials and configure webhook URLs.",
        href: "/account/api-keys",
        actionLabel: "Generate Keys"
      }}
    >
      <div className="space-y-8 max-w-4xl">
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 text-white shadow-xl space-y-4 border border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500" />
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-xs font-mono text-slate-400 ml-2">Code Snippet</span>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold">Live Specification</span>
          </div>

          <pre className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-mono text-indigo-300 overflow-x-auto leading-relaxed">
            {page.code}
          </pre>
        </div>
      </div>
    </EcosystemPageShell>
  );
}
