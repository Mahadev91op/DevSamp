import EcosystemPageShell from "@/components/EcosystemPageShell";
import Link from "next/link";
import { Terminal, Github, Star, GitFork, ArrowUpRight, Download, CheckCircle2 } from "lucide-react";
import { getSourceCodes } from "@/lib/data";

export const revalidate = 60;

export const metadata = {
  title: "Open Source Projects & Free Boilerplates | DevSamp",
  description: "Download verified open-source starters, multi-tenant boilerplates, protocol drivers, and dev utilities by DevSamp on GitHub.",
};

export default async function OpenSourcePage() {
  const freeItems = await getSourceCodes({ isFree: true });

  return (
    <EcosystemPageShell
      breadcrumbs={[{ label: "Open Source", href: "/open-source" }]}
      badge="COMMUNITY & OPEN ARCHITECTURES"
      title="DevSamp Open Source Software & Starters"
      subtitle="Free, production-ready source code repositories and developer utilities engineered for high performance and zero technical debt."
      primaryAction={{ label: "Source Code Marketplace", href: "/marketplace" }}
      secondaryAction={{ label: "Developer APIs", href: "/developers" }}
      relatedSection={{
        badge: "FULL CATALOG",
        title: "Explore Commercial SaaS & ERP Codebases",
        description: "Need full production clinical hospital management or retail POS suites? Visit our official marketplace.",
        href: "/marketplace",
        actionLabel: "Visit Marketplace"
      }}
    >
      <div className="space-y-4 max-w-5xl">
        {freeItems.map((repo, idx) => (
          <div
            key={repo._id || idx}
            className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
          >
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono font-bold text-sm text-blue-600">
                  {repo.slug}
                </span>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-mono">
                  {repo.version}
                </span>
                <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 font-mono">
                  FREE DOWNLOAD
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900">{repo.title}</h3>
              <p className="text-xs text-slate-600 font-normal leading-relaxed">{repo.tagline || repo.description}</p>
              
              <div className="flex flex-wrap gap-1.5 pt-1">
                {repo.techStack?.slice(0, 5).map((tech, tIdx) => (
                  <span key={tIdx} className="text-[10px] font-bold bg-slate-50 border border-slate-200 text-slate-600 px-2 py-0.5 rounded font-mono">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right font-mono text-xs text-slate-500 pr-2 hidden sm:block">
                <span className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star size={13} fill="currentColor" /> {repo.rating || 5.0}
                </span>
                <span className="text-[11px] text-slate-400">{repo.downloadsCount || 100}+ downloads</span>
              </div>

              <a
                href={repo.downloadUrl || `${repo.githubUrl}/archive/refs/heads/main.zip`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
              >
                <Download size={13} />
                <span>Download (.zip)</span>
              </a>

              <a
                href={repo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                title="View GitHub Repository"
              >
                <Github size={16} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </EcosystemPageShell>
  );
}
