import EcosystemPageShell from "@/components/EcosystemPageShell";
import Link from "next/link";
import { Briefcase, ArrowUpRight, CheckCircle2, TrendingUp, Sparkles } from "lucide-react";

export const metadata = {
  title: "Case Studies & Impact | DevSamp Ecosystem",
  description: "Real-world engineering case studies: problem, architectural solution, and measurable business outcomes.",
};

const CASE_STUDIES = [
  {
    title: "Digitizing 120-Bed Multi-Specialty Hospital with MedERP Pro",
    client: "Apex Care Healthcare Network",
    category: "Healthcare SaaS",
    metrics: "45% Reduction in Discharge Time • 100% Paperless OPD",
    problem: "Disconnected pharmacy, OPD queues, and manual lab billing caused 3-hour patient discharge delays and stock leakages.",
    solution: "Deployed MedERP Pro Clinical Suite with automated lab machine bidirectional sync, barcode prescription dispensing, and real-time bed allocation.",
    tag: "HEALTHCARE"
  },
  {
    title: "Multi-Branch Offline-First Retail POS for 18 Outlet Chain",
    client: "UrbanMart Superstores",
    category: "Retail Architecture",
    metrics: "0.2s Billing Speed • 99.99% Offline Uptime",
    problem: "Frequent internet drops caused long queues at peak hours, and stock reconciliation across 18 branches took 48 hours.",
    solution: "Architected local SQLite offline synchronization with automated background conflict resolution to the central cloud cluster.",
    tag: "RETAIL POS"
  },
  {
    title: "Micro-Gateway Event Bus & Automated Billing Platform",
    client: "NovaScale Cloud Systems",
    category: "Enterprise Cloud",
    metrics: "10,000+ Req/Sec • Zero Dropped Events",
    problem: "Legacy monolithic architecture failed under spike loads with duplicated invoices and webhook timeouts.",
    solution: "Designed distributed Redis Streams and Kafka event mesh with idempotent billing webhooks and automatic exponential retries.",
    tag: "CLOUD ARCHITECTURE"
  }
];

export default function CaseStudiesPage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[{ label: "Case Studies", href: "/case-studies" }]}
      badge="PROVEN OUTCOMES"
      title="Engineering Impact & Case Studies"
      subtitle="Detailed breakdowns of how our proprietary software and dedicated engineering pods solve mission-critical operational bottlenecks."
      primaryAction={{ label: "Commission a Pod", href: "/book-demo" }}
      secondaryAction={{ label: "Customer List", href: "/customers" }}
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CASE_STUDIES.map((study, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100">
                    {study.tag}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{study.category}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 leading-snug">
                  {study.title}
                </h3>

                <div className="p-3 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-xs font-bold text-indigo-950 flex items-center gap-2">
                  <TrendingUp size={15} className="text-indigo-600 shrink-0" />
                  <span>{study.metrics}</span>
                </div>

                <div className="space-y-2 text-xs text-slate-600">
                  <p>
                    <strong className="text-slate-900">Challenge:</strong> {study.problem}
                  </p>
                  <p>
                    <strong className="text-slate-900">Architecture:</strong> {study.solution}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">{study.client}</span>
                <Link
                  href="/contact"
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                >
                  <span>Discuss Similar</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </EcosystemPageShell>
  );
}
