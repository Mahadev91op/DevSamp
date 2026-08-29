import EcosystemPageShell from "@/components/EcosystemPageShell";
import { Download, Palette, FileText, CheckCircle2, Copy } from "lucide-react";

export const metadata = {
  title: "Brand Assets & Media Kit | DevSamp Ecosystem",
  description: "Official DevSamp logos, blue theme color codes, typography guidelines, and approved media assets.",
};

const COLOR_TOKENS = [
  { name: "DevSamp Electric Blue", hex: "#2563EB", hsl: "hsl(221, 83%, 53%)", desc: "Primary brand accent & interactive focus", role: "Primary Accent" },
  { name: "Deep Navy Slate", hex: "#020617", hsl: "hsl(222, 47%, 5%)", desc: "Console backgrounds & typography", role: "Dark Surface" },
  { name: "Pure White & Cloud Slate", hex: "#FFFFFF", hsl: "hsl(0, 0%, 100%)", desc: "Light container surfaces & cards", role: "Light Surface" },
  { name: "Slate Muted Gray", hex: "#64748B", hsl: "hsl(215, 16%, 47%)", desc: "Secondary text & subtle borders", role: "Subtle Text" }
];

export default function BrandAssetsPage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[{ label: "Brand Assets", href: "/brand-assets" }]}
      badge="BRAND IDENTITY & MEDIA KIT"
      title="DevSamp Brand Guidelines & Assets"
      subtitle="Official brand assets, logo marks, color tokens, and usage rules for partners, press, and media publishers."
      primaryAction={{ label: "Download Logo Package (SVG/PNG)", href: "#logos" }}
      secondaryAction={{ label: "Press Room", href: "/press" }}
    >
      <div className="space-y-12 max-w-5xl">
        {/* Logo Variants */}
        <div id="logos" className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Official Logo Marks</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-3xl bg-slate-950 text-white flex flex-col items-center justify-center space-y-4 text-center shadow-md">
              <div className="w-16 h-16 rounded-2xl bg-white text-slate-950 font-black text-2xl flex items-center justify-center shadow-lg">
                DS
              </div>
              <div>
                <p className="font-bold text-sm">Dark Background Mark</p>
                <p className="text-xs text-slate-400 mt-0.5">Use on dark themes & videos</p>
              </div>
              <button className="px-4 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-xs font-bold transition-colors">
                Vector SVG / High-Res PNG
              </button>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200 text-slate-900 flex flex-col items-center justify-center space-y-4 text-center shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-slate-950 text-white font-black text-2xl flex items-center justify-center shadow-lg">
                DS
              </div>
              <div>
                <p className="font-bold text-sm">Light Background Mark</p>
                <p className="text-xs text-slate-500 mt-0.5">Use on white / light papers</p>
              </div>
              <button className="px-4 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-bold transition-colors">
                Vector SVG / High-Res PNG
              </button>
            </div>

            <div className="p-8 rounded-3xl bg-blue-600 text-white flex flex-col items-center justify-center space-y-4 text-center shadow-md">
              <div className="w-16 h-16 rounded-2xl bg-white text-blue-600 font-black text-2xl flex items-center justify-center shadow-lg">
                DS
              </div>
              <div>
                <p className="font-bold text-sm">Primary Blue Accent Mark</p>
                <p className="text-xs text-blue-100 mt-0.5">Hero & high-contrast branding</p>
              </div>
              <button className="px-4 py-1.5 rounded-full bg-blue-700 hover:bg-blue-800 text-xs font-bold transition-colors">
                Vector SVG / High-Res PNG
              </button>
            </div>
          </div>
        </div>

        {/* Color Palette */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Color Palette & Hex Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {COLOR_TOKENS.map((c, idx) => (
              <div key={idx} className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div
                  className="w-full h-16 rounded-2xl border border-slate-200 shadow-inner"
                  style={{ backgroundColor: c.hex }}
                />
                <div>
                  <span className="text-[10px] font-bold uppercase text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{c.role}</span>
                  <h3 className="font-bold text-xs text-slate-900 mt-1">{c.name}</h3>
                  <p className="font-mono text-xs text-slate-600 mt-0.5">{c.hex}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Usage Rules */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Brand Guidelines & Usage Rules</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <span className="font-bold text-emerald-700 flex items-center gap-1.5">
                <CheckCircle2 size={14} />
                <span>Do:</span>
              </span>
              <p>Maintain proper clear space around the DevSamp logo mark.</p>
              <p>Use high-resolution SVG files on light or dark high-contrast backgrounds.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <span className="font-bold text-rose-700 flex items-center gap-1.5">
                <CheckCircle2 size={14} />
                <span>Don&apos;t:</span>
              </span>
              <p>Do not skew, stretch, rotate, or alter the proportions of the logo.</p>
              <p>Do not apply unapproved drop shadows or neon color effects.</p>
            </div>
          </div>
        </div>
      </div>
    </EcosystemPageShell>
  );
}
