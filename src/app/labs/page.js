import EcosystemPageShell from "@/components/EcosystemPageShell";
import { FlaskConical, Sparkles, Brain, Cpu, ArrowRight } from "lucide-react";

export const metadata = {
  title: "DevSamp Labs (R&D) | Emerging Technologies",
  description: "Experimental prototypes, edge AI models, automated diagnosis assistants, and next-generation software research.",
};

const EXPERIMENTS = [
  { name: "Neural Bedside Voice Charting", status: "Beta Experiment", desc: "Low-latency on-device speech-to-text allowing nurses to log patient vitals hands-free in sterile environments." },
  { name: "Autonomous Lab Anomaly Flagging", status: "Internal Alpha", desc: "Predictive machine learning models identifying specimen contamination before physician review." },
  { name: "Zero-Knowledge Medical Record Sharing", status: "Research Paper", desc: "Cryptographic verifiable credentials enabling patient data exchange without central key escrow." }
];

export default function LabsPage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[{ label: "DevSamp Labs", href: "/labs" }]}
      badge="R&D EXPERIMENTS"
      title="DevSamp Labs & Emerging Research"
      subtitle="Where our senior architects explore the frontiers of edge AI, zero-knowledge clinical data systems, and real-time medical automation."
      primaryAction={{ label: "Request Early Alpha Access", href: "mailto:devsamp1st@gmail.com?subject=Labs%20Alpha%20Access" }}
      secondaryAction={{ label: "Engineering Devlogs", href: "/blog" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
        {EXPERIMENTS.map((exp, idx) => (
          <div key={idx} className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <span className="text-[10px] font-black uppercase text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-100">
                {exp.status}
              </span>
              <h2 className="text-base font-bold text-slate-900 leading-snug">{exp.name}</h2>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">{exp.desc}</p>
            </div>
            <div className="pt-4 border-t border-slate-100">
              <span className="text-xs font-mono text-indigo-600 font-bold">Research Pod: DevSamp R&D</span>
            </div>
          </div>
        ))}
      </div>
    </EcosystemPageShell>
  );
}
