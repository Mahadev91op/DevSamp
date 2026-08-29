import EcosystemPageShell from "@/components/EcosystemPageShell";
import { Terminal, Github, Star, GitFork, ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "Open Source Projects | DevSamp",
  description: "DevSamp open-source UI libraries, database utilities, and developer tooling contributions.",
};

const REPOS = [
  { name: "devsamp-escpos-engine", desc: "Lightweight, zero-dependency Node.js and WebUSB driver for thermal receipt printers.", stars: "340+", forks: "42", language: "TypeScript" },
  { name: "next-multitenant-mesh", desc: "Production-ready boilerplate for multi-tenant subdomain isolation with Next.js 15 and MongoDB.", stars: "890+", forks: "128", language: "JavaScript" },
  { name: "hl7-astm-parser", desc: "High-speed stream parser for medical and pathology laboratory automated test machines.", stars: "210+", forks: "31", language: "Rust" }
];

export default function OpenSourcePage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[{ label: "Open Source", href: "/open-source" }]}
      badge="OPEN SOURCE SOFTWARE"
      title="DevSamp Open Source Contributions"
      subtitle="We believe in giving back to the developer ecosystem. Explore our open-source tools, protocol parsers, and UI libraries."
      primaryAction={{ label: "View GitHub Organization", href: "https://github.com" }}
      secondaryAction={{ label: "Developer Portal", href: "/developers" }}
    >
      <div className="space-y-4 max-w-4xl">
        {REPOS.map((repo, idx) => (
          <div key={idx} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-indigo-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-sm text-indigo-600">{repo.name}</span>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{repo.language}</span>
              </div>
              <p className="text-xs text-slate-600 font-normal">{repo.desc}</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono text-slate-500 shrink-0">
              <span>★ {repo.stars}</span>
              <span>⑂ {repo.forks}</span>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors">
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </EcosystemPageShell>
  );
}
