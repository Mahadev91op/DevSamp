import EcosystemPageShell from "@/components/EcosystemPageShell";
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Contact & Pod Inquiry | DevSamp Ecosystem",
  description: "Get in touch with DevSamp engineering leads, project architects, and support specialists.",
};

export default function ContactPage() {
  return (
    <EcosystemPageShell
      breadcrumbs={[{ label: "Contact", href: "/contact" }]}
      badge="DIRECT ARCHITECT ROUTING"
      title="Connect with Our Engineering Pods"
      subtitle="Whether you are deploying proprietary software or commissioning a dedicated engineering pod, our team is ready to assist you."
      primaryAction={{ label: "Book a Demo", href: "/book-demo" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900">Official Communication Channels</h2>
            
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <Mail className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Direct Engineering Email</p>
                  <a href="mailto:devsamp1st@gmail.com" className="text-indigo-600 hover:underline">
                    devsamp1st@gmail.com
                  </a>
                  <p className="text-[11px] text-slate-500 mt-0.5">Response SLA: Under 2 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <Phone className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Direct Phone / WhatsApp</p>
                  <a href="tel:+919330680642" className="text-indigo-600 hover:underline font-mono">
                    +91 9330680642
                  </a>
                  <p className="text-[11px] text-slate-500 mt-0.5">Mon - Sat: 9:00 AM - 9:00 PM IST</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <MapPin className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Engineering HQ</p>
                  <p className="text-slate-600">DevSamp Technologies, India</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Serving clients across APAC, EMEA, and Americas</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
              Live Support Desk
            </span>
            <h3 className="text-sm font-bold mt-1">Existing Customer or Licensee?</h3>
            <p className="text-xs text-slate-300">
              For urgent bug fixes or operational support, please use the Client Portal or Help Center to track tickets.
            </p>
            <div className="pt-2">
              <a
                href="/account/tickets"
                className="inline-flex items-center gap-1.5 text-xs text-indigo-300 font-bold hover:text-white"
              >
                <span>Go to Support Tickets</span>
                <span className="text-sm">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-lg">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Send an Inquiry</h2>
          <p className="text-xs text-slate-500 mb-6">
            Provide details about your project scope or business objectives.
          </p>

          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Inquiry Type *</label>
              <select className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:border-indigo-500 outline-none bg-white">
                <option>New Software Product Deployment (MedERP / FlowPulse)</option>
                <option>Dedicated Fullstack Engineering Pod</option>
                <option>Custom SaaS & Cloud Architecture</option>
                <option>Partnership or Reseller Alliance</option>
                <option>Careers & Pod Applications</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Project Details / Message *</label>
              <textarea
                rows={5}
                required
                placeholder="Describe your current tech stack, requirements, timeline, and expectations..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 outline-none resize-none"
              />
            </div>

            <button
              type="button"
              className="w-full py-3.5 rounded-xl bg-slate-950 hover:bg-indigo-600 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send size={14} />
              <span>Transmit Message to Architects</span>
            </button>
          </form>
        </div>

      </div>
    </EcosystemPageShell>
  );
}
