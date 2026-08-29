import EcosystemPageShell from "@/components/EcosystemPageShell";
import Link from "next/link";
import { Briefcase, ArrowUpRight, TrendingUp, Sparkles } from "lucide-react";
import { getCaseStudies } from "@/lib/data";

export const revalidate = 60; // ISR revalidate 60s

export const metadata = {
  title: "Case Studies & Impact | DevSamp Ecosystem",
  description: "Real-world engineering case studies: problem, architectural solution, and measurable business outcomes.",
};

const DEFAULT_CASE_STUDIES = [
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

export default async function CaseStudiesPage() {
  const dbCaseStudies = await getCaseStudies(12);
  const caseStudies = dbCaseStudies && dbCaseStudies.length > 0 ? dbCaseStudies : DEFAULT_CASE_STUDIES;

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
          {caseStudies.map((study, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">
                    {study.tag || study.industry || "ENGINEERING"}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{study.category || "Case Study"}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 leading-snug">
                  {study.title}
                </h3>

                {(study.metrics || study.impact) && (
                  <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-100 text-xs font-bold text-blue-950 flex items-center gap-2">
                    <TrendingUp size={15} className="text-blue-600 shrink-0" />
                    <span>{study.metrics || study.impact}</span>
                  </div>
                )}

                <div className="space-y-2 text-xs text-slate-600">
                  {study.problem && (
                    <p>
                      <strong className="text-slate-900">Challenge:</strong> {study.problem}
                    </p>
                  )}
                  {study.solution && (
                    <p>
                      <strong className="text-slate-900">Architecture:</strong> {study.solution}
                    </p>
                  )}
                  {!study.problem && !study.solution && study.summary && (
                    <p className="leading-relaxed">{study.summary}</p>
                  )}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">{study.client || study.clientName || "Enterprise Client"}</span>
                <Link
                  href="/contact"
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
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
