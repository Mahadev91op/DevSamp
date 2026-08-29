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
  ArrowRight,
  Sparkles
} from "lucide-react";
import ApiPlayground from "@/components/ApiPlayground";

export const metadata = {
  title: "Developer Portal | DevSamp Ecosystem",
  description: "Developer headquarters: REST API reference, Webhooks event mesh, client SDKs, sandbox environments, and CLI tools.",
};

const DEV_HUBS = [
  { id: "quickstart", name: "Developer Quickstart", desc: "Make your first authenticated DevSamp API call in under 3 minutes.", icon: Zap, badge: "3 MIN" },
  { id: "api-reference", name: "REST API Reference", desc: "Interactive OpenAPI/Swagger documentation with cURL and Node.js code snippets.", icon: Code2, badge: "OPENAPI" },
  { id: "authentication", name: "Authentication & OAuth2", desc: "API Key headers, Bearer tokens, and token refresh mechanisms.", icon: Lock, badge: "AUTH" },
  { id: "sdks", name: "Client SDKs & Libraries", desc: "Official libraries for Node.js, Python, React, Go, and Flutter.", icon: Boxes, badge: "SDKS" },
  { id: "webhooks", name: "Webhooks & Event Bus", desc: "Subscribe to real-time events: patient admitted, payment captured, invoice generated.", icon: Activity, badge: "EVENTS" },
  { id: "cli", name: "DevSamp CLI Tools", desc: "Scaffold integration projects and test webhooks locally from your terminal.", icon: Terminal, badge: "CLI" },
  { id: "rate-limits", name: "Rate Limits & Quotas", desc: "Token bucket rate limiting rules, burst capacities, and quota headers.", icon: Gauge, badge: "LIMITS" },
  { id: "errors", name: "Error Codes & Debugging", desc: "Standardized HTTP status codes, error payload schemas, and resolution guides.", icon: AlertTriangle, badge: "ERRORS" }
];

export default function DevelopersPage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[{ label: "Developer Portal", href: "/developers" }]}
      badge="DEVELOPER HEADQUARTERS"
      title="Build on the DevSamp Platform"
      subtitle="Integrate proprietary hospital databases, retail POS billing engines, and multi-tenant SaaS features into your custom applications using our low-latency APIs and SDKs."
      primaryAction={{ label: "View API Reference", href: "/developers/api-reference" }}
      secondaryAction={{ label: "Quickstart Guide", href: "/developers/quickstart" }}
      relatedSection={{
        badge: "CREDENTIALS",
        title: "Generate API Keys in Customer Portal",
        description: "Need production credentials? Log in to your client console to generate API keys and configure webhook URLs.",
        href: "/account/api-keys",
        actionLabel: "Generate Keys"
      }}
    >
      <div className="space-y-12">
        
        {/* Live Interactive API Playground */}
        <ApiPlayground />

        {/* Developer Hubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DEV_HUBS.map((hub) => {
            const Icon = hub.icon;
            return (
              <Link
                key={hub.id}
                href={`/developers/${hub.id}`}
                className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-2xl bg-slate-100 group-hover:bg-blue-600 group-hover:text-white text-slate-700 transition-colors">
                      <Icon size={18} />
                    </div>
                    <span className="text-[9px] font-black uppercase text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                      {hub.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {hub.name}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    {hub.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700 group-hover:text-blue-600">
                  <span>Explore Specs</span>
                  <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </EcosystemPageShell>
  );
}
