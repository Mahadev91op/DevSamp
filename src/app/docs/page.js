import EcosystemPageShell from "@/components/EcosystemPageShell";
import Link from "next/link";
import { BookOpen, Code2, Terminal, Zap, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Technical Documentation | DevSamp Ecosystem",
  description: "Comprehensive technical guides, architecture overviews, and API references for the DevSamp Ecosystem.",
};

export default function DocsPage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[{ label: "Documentation", href: "/docs" }]}
      badge="TECHNICAL DOCUMENTATION"
      title="DevSamp Architecture & Integration Docs"
      subtitle="Complete documentation for system engineers, product architects, and integrators building on DevSamp."
      primaryAction={{ label: "REST API Reference", href: "/developers/api-reference" }}
      secondaryAction={{ label: "Developer Quickstart", href: "/developers/quickstart" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        <Link
          href="/developers/quickstart"
          className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all space-y-2 group"
        >
          <div className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-700 w-fit">
            <Zap size={20} />
          </div>
          <h2 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
            Developer Quickstart (3 Mins)
          </h2>
          <p className="text-xs text-slate-600 font-normal">
            Authenticate and make your first REST API call with Node.js, Python, or cURL.
          </p>
        </Link>

        <Link
          href="/developers/api-reference"
          className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all space-y-2 group"
        >
          <div className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-700 w-fit">
            <Code2 size={20} />
          </div>
          <h2 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
            REST API Endpoints Reference
          </h2>
          <p className="text-xs text-slate-600 font-normal">
            Explore JSON request/response schemas for hospital admissions, pharmacy POS, and billing.
          </p>
        </Link>

        <Link
          href="/developers/webhooks"
          className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all space-y-2 group"
        >
          <div className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-700 w-fit">
            <Terminal size={20} />
          </div>
          <h2 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
            Webhooks & Real-Time Events
          </h2>
          <p className="text-xs text-slate-600 font-normal">
            Subscribe to event streams with HMAC-SHA256 signature verification and automated retries.
          </p>
        </Link>

        <Link
          href="/developers/sdks"
          className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all space-y-2 group"
        >
          <div className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-700 w-fit">
            <BookOpen size={20} />
          </div>
          <h2 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
            Client SDKs & Package Managers
          </h2>
          <p className="text-xs text-slate-600 font-normal">
            Install official @devsamp/sdk client packages via npm, pip, go get, and cargo.
          </p>
        </Link>
      </div>
    </EcosystemPageShell>
  );
}
