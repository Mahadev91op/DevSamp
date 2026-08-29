import EcosystemPageShell from "@/components/EcosystemPageShell";
import Link from "next/link";
import { Newspaper, Download, Mail, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Press & Media Resources | DevSamp",
  description: "Official press kit, executive bios, brand logos, and media inquiry channels.",
};

export default function PressPage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[{ label: "Press & Media", href: "/press" }]}
      badge="PRESS & MEDIA ROOM"
      title="DevSamp Newsroom & Media Kit"
      subtitle="Official resources, press releases, company backgrounders, and leadership contacts for journalists and media publishers."
      primaryAction={{ label: "Download Brand Assets", href: "/brand-assets" }}
      secondaryAction={{ label: "Media Inquiry", href: "mailto:devsamp1st@gmail.com?subject=Media%20Inquiry%20-%20DevSamp" }}
    >
      <div className="space-y-8 max-w-4xl">
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900">DevSamp Fast Facts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="font-bold text-slate-500 uppercase">Headquarters</span>
              <p className="text-sm font-bold text-slate-900 mt-1">India (Global Remote Pods)</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="font-bold text-slate-500 uppercase">Core Industry</span>
              <p className="text-sm font-bold text-slate-900 mt-1">Healthcare ERP & SaaS</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="font-bold text-slate-500 uppercase">Media Contact</span>
              <p className="text-sm font-bold text-slate-900 mt-1">devsamp1st@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white space-y-3">
          <h3 className="text-base font-bold">Official Media Kit (.ZIP)</h3>
          <p className="text-xs text-slate-300">Contains vector SVG logos, brand guideline PDF, high-res executive headshots, and company one-pager.</p>
          <div className="pt-2">
            <Link href="/brand-assets">
              <button className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2">
                <Download size={14} />
                <span>Access Brand Assets Page</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </EcosystemPageShell>
  );
}
