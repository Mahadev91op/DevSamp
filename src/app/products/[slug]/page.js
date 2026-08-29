import EcosystemPageShell from "@/components/EcosystemPageShell";
import Link from "next/link";
import {
  Activity,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Boxes,
  HelpCircle,
  FileText,
  CreditCard,
  Video,
  Layers,
  TrendingUp,
  Cpu
} from "lucide-react";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const productName = slug === "mederp-pro" ? "MedERP Pro Clinical Suite" : `${slug.replace(/-/g, " ").toUpperCase()} Platform`;
  return {
    title: `${productName} | DevSamp Ecosystem`,
    description: `Complete overview, features, use cases, pricing, and documentation for ${productName}.`,
  };
}

export default async function ProductDetailPage({ params, searchParams }) {
  const { slug } = await params;
  const sParams = await searchParams;
  const activeView = sParams?.view || "overview";

  const isMedERP = slug === "mederp-pro" || slug === "mederp";
  const productName = isMedERP ? "MedERP Pro Clinical Suite" : `${slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())}`;

  const tabs = [
    { id: "overview", label: "Overview", href: `/products/${slug}` },
    { id: "features", label: "Features & Modules", href: `/products/${slug}?view=features` },
    { id: "use-cases", label: "Use Cases", href: `/products/${slug}?view=use-cases` },
    { id: "pricing", label: "Pricing & Plans", href: `/products/${slug}?view=pricing` },
    { id: "demo", label: "Interactive Demo", href: `/products/${slug}?view=demo` },
  ];

  return (
    <EcosystemPageShell
      breadcrumbs={[
        { label: "Products", href: "/products" },
        { label: productName, href: `/products/${slug}` }
      ]}
      badge="FLAGSHIP VERTICAL SaaS"
      title={productName}
      subtitle={
        isMedERP
          ? "Next-generation hospital, clinical diagnostics, laboratory, and pharmacy management ERP engineered for zero-latency operations."
          : `High-performance modular enterprise software platform engineered by DevSamp for high-concurrency workflows.`
      }
      primaryAction={{ label: "Book a Live Demo", href: "/book-demo" }}
      secondaryAction={{ label: "Compare Plans", href: "/products/compare" }}
      relatedSection={{
        badge: "DEPLOYMENT READY",
        title: `Deploy ${productName} for Your Organization`,
        description: "Get started with custom onboarding, data migration from legacy software, and 24/7 SLA support.",
        href: "/book-demo",
        actionLabel: "Schedule Onboarding"
      }}
    >
      <div className="space-y-8">
        
        {/* Sub-Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto no-scrollbar pb-1">
          {tabs.map((tab) => {
            const isActive = activeView === tab.id;
            return (
              <Link
                key={tab.id}
                href={tab.href}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>

        {/* Dynamic View Switcher */}
        {activeView === "features" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <span className="text-[10px] font-black uppercase text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">OPD & IPD</span>
              <h3 className="text-base font-bold text-slate-900">Bed Allocation & Triage</h3>
              <p className="text-xs text-slate-600">Real-time floor map, discharge checklist automation, and nurse station monitors.</p>
            </div>
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <span className="text-[10px] font-black uppercase text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">LAB & PATHOLOGY</span>
              <h3 className="text-base font-bold text-slate-900">Bidirectional Machine Sync</h3>
              <p className="text-xs text-slate-600">Direct integration with Roche, Beckman, and Mindray laboratory analyzers.</p>
            </div>
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <span className="text-[10px] font-black uppercase text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">PHARMACY POS</span>
              <h3 className="text-base font-bold text-slate-900">Batch & Expiry Controls</h3>
              <p className="text-xs text-slate-600">Sub-second barcode sales, automatic reordering alerts, and GST tax invoice generation.</p>
            </div>
          </div>
        )}

        {activeView === "use-cases" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <h3 className="text-lg font-bold text-slate-900">Multi-Specialty 50–500 Bed Hospitals</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Coordinate doctors, nurses, laboratories, OT schedules, and insurance claim approvals on a single unified interface with zero paperwork.
              </p>
            </div>
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <h3 className="text-lg font-bold text-slate-900">Diagnostic & Pathology Chains</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Connect multiple satellite sample collection centers to central processing labs with instant digital report dispatch via WhatsApp and SMS.
              </p>
            </div>
          </div>
        )}

        {activeView === "pricing" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <span className="text-xs font-bold text-slate-500 uppercase">Single Clinic / Lab</span>
              <h3 className="text-2xl font-black text-slate-950">₹2,999 <span className="text-xs text-slate-400 font-normal">/ month</span></h3>
              <p className="text-xs text-slate-600">For individual doctor clinics and independent diagnostic labs.</p>
              <Link href="/book-demo" className="block w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-center font-bold text-xs">
                Start Trial
              </Link>
            </div>

            <div className="p-6 rounded-3xl bg-indigo-50 border-2 border-indigo-600 shadow-md space-y-4 relative">
              <span className="text-[9px] font-black uppercase tracking-widest text-white bg-indigo-600 px-2 py-0.5 rounded-full absolute top-4 right-4">
                POPULAR
              </span>
              <span className="text-xs font-bold text-indigo-700 uppercase">Hospital Cloud Pro</span>
              <h3 className="text-2xl font-black text-slate-950">₹7,999 <span className="text-xs text-slate-400 font-normal">/ month</span></h3>
              <p className="text-xs text-slate-600">Up to 100 beds, full OT, IPD, lab sync, and pharmacy modules.</p>
              <Link href="/book-demo" className="block w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-center font-bold text-xs">
                Deploy Cloud Pro
              </Link>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900 text-white shadow-md space-y-4">
              <span className="text-xs font-bold text-indigo-300 uppercase">Enterprise Dedicated</span>
              <h3 className="text-2xl font-black text-white">Custom</h3>
              <p className="text-xs text-slate-300">Multi-branch hospital chains, private cloud, and on-premise deployments.</p>
              <Link href="/contact" className="block w-full py-2.5 rounded-xl bg-white text-slate-950 hover:bg-slate-100 text-center font-bold text-xs">
                Contact Architects
              </Link>
            </div>
          </div>
        )}

        {(activeView === "overview" || activeView === "demo") && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-slate-900">Why Modern Organizations Choose {productName}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Zap size={16} className="text-indigo-600" />
                    <h4 className="text-xs font-bold text-slate-900">Sub-Second Execution</h4>
                  </div>
                  <p className="text-xs text-slate-600">Zero lag even with hundreds of concurrent staff and heavy laboratory data loads.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-indigo-600" />
                    <h4 className="text-xs font-bold text-slate-900">HIPAA & DPDP Compliant</h4>
                  </div>
                  <p className="text-xs text-slate-600">Encrypted records, biometric login support, and automated immutable audit trails.</p>
                </div>
              </div>

              {/* Demo Simulation Box */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-950 to-indigo-950 text-white space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                    Live Sandbox Instance
                  </span>
                  <span className="text-xs font-mono text-slate-400">Node: us-east-1a</span>
                </div>
                <h3 className="text-base font-bold">Interactive Sandbox Environment</h3>
                <p className="text-xs text-slate-300">
                  Try sample patient check-in, prescription generation, and revenue analytics right in your browser.
                </p>
                <div className="pt-2">
                  <Link href="/book-demo">
                    <button className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all shadow-md">
                      Launch Interactive Sandbox
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Links Sidebar */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">Product Navigation</h4>
                <div className="space-y-2 text-xs">
                  <Link href={`/products/${slug}?view=features`} className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 text-slate-700 font-medium">
                    <span>Feature List</span>
                    <ArrowRight size={12} />
                  </Link>
                  <Link href={`/products/${slug}?view=pricing`} className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 text-slate-700 font-medium">
                    <span>Pricing Plans</span>
                    <ArrowRight size={12} />
                  </Link>
                  <Link href="/products/integrations" className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 text-slate-700 font-medium">
                    <span>Integrations & Connectors</span>
                    <ArrowRight size={12} />
                  </Link>
                  <Link href="/support/faqs" className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 text-slate-700 font-medium">
                    <span>Common Questions (FAQ)</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </EcosystemPageShell>
  );
}
