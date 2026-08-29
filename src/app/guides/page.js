import EcosystemPageShell from "@/components/EcosystemPageShell";
import Link from "next/link";
import { BookMarked, ArrowRight, FileText, CheckCircle2, Clock, Sparkles } from "lucide-react";

export const metadata = {
  title: "Business & Digital Playbooks | DevSamp Ecosystem",
  description: "Actionable playbooks, architectural guides, and digitization handbooks for healthcare operators, retail founders, and software engineers.",
};

const GUIDES = [
  {
    title: "The Hospital Digitization & Cloud ERP Playbook",
    category: "HEALTHCARE STRATEGY",
    readTime: "12 min read",
    desc: "A comprehensive handbook on transitioning from legacy paper charts to cloud ERP without disrupting daily OPD clinical operations.",
    chapters: ["Legacy Data Migration", "OPD Triage Calibration", "HL7 Lab Instrument Sync", "Staff Change Management"]
  },
  {
    title: "Scaling Multi-Branch Retail with Offline-First POS",
    category: "RETAIL ARCHITECTURE",
    readTime: "10 min read",
    desc: "How multi-chain retailers prevent billing delays, eliminate inventory shrinkage, and centralize GST tax accounting with SQLite edge sync.",
    chapters: ["Sub-second Local Caching", "Conflict Resolution Rules", "Thermal Hardware Bridges", "Consolidated Ledgers"]
  },
  {
    title: "Architecting Next.js 15 Multi-Tenant SaaS Platforms",
    category: "SOFTWARE ENGINEERING",
    readTime: "15 min read",
    desc: "Best practices for tenant subdomain routing, connection pooling in MongoDB, server actions, and isolating RBAC permissions.",
    chapters: ["Subdomain Wildcard DNS", "Database Sharding Patterns", "JWT Session Management", "Feature Flag Metering"]
  },
  {
    title: "Zero-Trust Cloud Infrastructure for Medical Records",
    category: "CYBERSECURITY & COMPLIANCE",
    readTime: "8 min read",
    desc: "Implementing HIPAA and DPDP compliant encryption at rest, field-level redaction, and immutable cryptographic audit trails.",
    chapters: ["Envelope Encryption", "RBAC Policy Engines", "Automated Backup Verification", "Vulnerability Scans"]
  },
  {
    title: "Deploying AI Speech-to-Text in Sterile Clinical Wards",
    category: "APPLIED AI",
    readTime: "9 min read",
    desc: "How low-latency edge AI transcription models enable doctors and nurses to log vitals and consultation notes completely hands-free.",
    chapters: ["On-Device Speech Parsing", "ICD-10 Vocabulary Tuning", "Audio Quality In Noisy Rooms", "Physician Review UI"]
  },
  {
    title: "Zero-Downtime Blue-Green Kubernetes CI/CD",
    category: "DEVOPS & CLOUD",
    readTime: "11 min read",
    desc: "Automating production container deployments on AWS and GCP with zero dropped user sessions and automated rollbacks.",
    chapters: ["GitHub Actions Matrix", "Traffic Shifting via Nginx", "Database Migration Safety", "Prometheus Health Probes"]
  }
];

export default function GuidesPage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[{ label: "Guides", href: "/guides" }]}
      badge="BUSINESS & TECH PLAYBOOKS"
      title="Engineering Playbooks & Operational Guides"
      subtitle="In-depth, actionable guides curated by our senior architects to help healthcare administrators, retail founders, and software engineers."
      primaryAction={{ label: "Subscribe to Devlogs", href: "/newsletter" }}
      secondaryAction={{ label: "Technical Blog", href: "/blog" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
        {GUIDES.map((g, idx) => (
          <div
            key={idx}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100">
                  {g.category}
                </span>
                <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                  <Clock size={11} />
                  <span>{g.readTime}</span>
                </span>
              </div>

              <h2 className="text-base font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                {g.title}
              </h2>

              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {g.desc}
              </p>

              <div className="pt-2 border-t border-slate-100 space-y-1">
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">Chapters Included:</p>
                {g.chapters.map((ch, cIdx) => (
                  <div key={cIdx} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                    <CheckCircle2 size={12} className="text-emerald-600 shrink-0" />
                    <span>{ch}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
              <span>Read Full Playbook</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </EcosystemPageShell>
  );
}
