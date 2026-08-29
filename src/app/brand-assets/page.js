import EcosystemPageShell from "@/components/EcosystemPageShell";
import { Download, Palette, FileText, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Brand Assets & Media Kit | DevSamp Ecosystem",
  description: "Official DevSamp logos, color codes, typography guidelines, and approved media assets.",
};

export default function BrandAssetsPage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[{ label: "Brand Assets", href: "/brand-assets" }]}
      badge="BRAND IDENTITY & MEDIA KIT"
      title="DevSamp Brand Guidelines & Assets"
      subtitle="Official brand assets, logos, color codes, and usage rules for partners, press, and media publishers."
      primaryAction={{ label: "Download Complete Media Kit (.ZIP)", href: "#download" }}
    >
      <div className="space-y-12">
        {/* Logo Variants */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Official Logo Marks</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-3xl bg-slate-950 text-white flex flex-col items-center justify-center space-y-4 text-center">
              <div className="w-16 h-16 rounded-2xl bg-white text-slate-950 font-black text-2xl flex items-center justify-center shadow-lg">
                DS
              </div>
              <div>
                <p className="font-bold text-sm">Dark Background Mark</p>
                <p className="text-xs text-slate-400 mt-0.5">Use on dark themes / media</p>
              </div>
              <button className="px-4 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-xs font-bold transition-colors">
                SVG / PNG (High Res)
              </button>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200 text-slate-900 flex flex-col items-center justify-center space-y-4 text-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-950 text-white font-black text-2xl flex items-center justify-center shadow-lg">
                DS
              </div>
              <div>
                <p className="font-bold text-sm">Light Background Mark</p>
                <p className="text-xs text-slate-500 mt-0.5">Use on white / light papers</p>
              </div>
              <button className="px-4 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-bold transition-colors">
                SVG / PNG (High Res)
              </button>
            </div>

            <div className="p-8 rounded-3xl bg-indigo-600 text-white flex flex-col items-center justify-center space-y-4 text-center">
              <div className="w-16 h-16 rounded-2xl bg-white text-indigo-600 font-black text-2xl flex items-center justify-center shadow-lg">
                DS
              </div>
              <div>
                <p className="font-bold text-sm">Brand Accent Mark</p>
                <p className="text-xs text-indigo-200 mt-0.5">Indigo accent applications</p>
              </div>
              <button className="px-4 py-1.5 rounded-full bg-indigo-700 hover:bg-indigo-800 text-xs font-bold transition-colors">
                SVG / PNG (High Res)
              </button>
            </div>
          </div>
        </div>

        {/* Color Palette */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Core Color Palette</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
              <div className="w-full h-16 rounded-xl bg-slate-950 shadow-inner" />
              <p className="font-bold text-xs text-slate-900">DevSamp Noir</p>
              <p className="text-[11px] text-slate-500 font-mono">#020617 (Slate 950)</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
              <div className="w-full h-16 rounded-xl bg-indigo-600 shadow-inner" />
              <p className="font-bold text-xs text-slate-900">Electric Indigo</p>
              <p className="text-[11px] text-slate-500 font-mono">#4f46e5 (Indigo 600)</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
              <div className="w-full h-16 rounded-xl bg-cyan-500 shadow-inner" />
              <p className="font-bold text-xs text-slate-900">Pulse Cyan</p>
              <p className="text-[11px] text-slate-500 font-mono">#06b6d4 (Cyan 500)</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
              <div className="w-full h-16 rounded-xl bg-emerald-500 shadow-inner" />
              <p className="font-bold text-xs text-slate-900">Verified Emerald</p>
              <p className="text-[11px] text-slate-500 font-mono">#10b981 (Emerald 500)</p>
            </div>
          </div>
        </div>

        {/* Brand Rules */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
          <h3 className="text-base font-bold text-slate-900">Usage & Attribution Rules</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
              <span>Do maintain clear padding around the DS emblem (minimum 25% of mark width).</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
              <span>Do refer to the company as &ldquo;DevSamp&rdquo; (CamelCase with capital D and S).</span>
            </div>
          </div>
        </div>
      </div>
    </EcosystemPageShell>
  );
}
