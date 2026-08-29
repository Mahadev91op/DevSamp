import EcosystemPageShell from "@/components/EcosystemPageShell";
import { Calendar, Clock, Video, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Book a Demo | DevSamp Ecosystem",
  description: "Schedule a live, interactive 1-on-1 walkthrough of MedERP Pro, FlowPulse POS, or discuss a dedicated engineering pod.",
};

export default function BookDemoPage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[{ label: "Book a Demo", href: "/book-demo" }]}
      badge="LIVE PRODUCT WALKTHROUGH"
      title="Experience the DevSamp Ecosystem in Action"
      subtitle="Schedule a tailored 30-minute demonstration with our senior product architects. Discover how our proprietary software and dedicated engineering pods scale your business."
      primaryAction={{ label: "Contact Sales Directly", href: "/contact" }}
      relatedSection={{
        badge: "SOFTWARE CATALOG",
        title: "Explore Our Full Software Portfolio",
        description: "Review MedERP Pro, FlowPulse POS, and modular enterprise tools before your call.",
        href: "/products",
        actionLabel: "View Catalog"
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-lg">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Schedule Your Discovery Session</h2>
          <p className="text-xs text-slate-500 mb-6 font-normal">
            Fill in your details below and an architect from our core team will confirm your session within 2 hours.
          </p>

          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Rajesh Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Work Email *</label>
                <input
                  type="email"
                  required
                  placeholder="rajesh@hospital.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Phone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Organization / Hospital Name</label>
                <input
                  type="text"
                  placeholder="e.g. Apex Health Clinic"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Platform of Interest *</label>
              <select className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:border-indigo-500 outline-none bg-white">
                <option value="mederp">MedERP Pro Clinical & Hospital Suite</option>
                <option value="pos">FlowPulse Multi-Branch Retail POS</option>
                <option value="custom">Dedicated Engineering Pod (Custom Web/SaaS/App)</option>
                <option value="ai">AI Solutions & Process Automation</option>
                <option value="other">General Ecosystem Partnership</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Key Requirements / Notes</label>
              <textarea
                rows={4}
                placeholder="Tell us about your branch count, current challenges, or deployment timeline..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 outline-none resize-none"
              />
            </div>

            <button
              type="button"
              className="w-full py-3.5 rounded-xl bg-slate-950 hover:bg-indigo-600 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar size={14} />
              <span>Confirm Demo Booking</span>
            </button>
          </form>
        </div>

        {/* Right Info Box */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-extrabold uppercase">
              What to Expect
            </div>
            <h3 className="text-lg font-bold">In this 30-minute session:</h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>Live walkthrough of core workflows tailored to your industry domain.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>Q&A with senior architects—no aggressive sales pitches, just technical clarity.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>Transparent pricing, rollout timeline, and multi-tenant isolation review.</span>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-3xl bg-indigo-50 border border-indigo-100 space-y-2">
            <h4 className="text-xs font-bold text-indigo-950 uppercase tracking-wider">
              Need Instant Assistance?
            </h4>
            <p className="text-xs text-slate-600">
              Connect directly with our engineering office via WhatsApp or call:
            </p>
            <p className="text-sm font-black text-indigo-700">+91 9330680642</p>
            <p className="text-xs text-slate-500 font-mono">devsamp1st@gmail.com</p>
          </div>
        </div>
      </div>
    </EcosystemPageShell>
  );
}
