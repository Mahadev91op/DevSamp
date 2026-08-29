"use client";

import { motion } from "framer-motion";
import { 
  Building2, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Lock, 
  Activity, 
  Users,
  CheckCircle2,
  Cpu
} from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

export default function CustomerHero({ data = null, customerCount = 0 }) {
  const eyebrow = data?.eyebrow || "DEVSAMP CUSTOMER ECOSYSTEM";
  const title = data?.title || "Organizations & Teams Powered by DevSamp Engineering";
  const description = data?.description || "DevSamp collaborates with forward-thinking enterprises, healthcare networks, retail operators, and high-growth startups to design, build, and operate mission-critical software systems.";
  const badge = data?.badge || "Customer Ecosystem";
  const primaryCta = {
    text: data?.primaryCta?.text || "Explore Customer Directory",
    link: data?.primaryCta?.link || "#directory",
  };
  const secondaryCta = {
    text: data?.secondaryCta?.text || "Start a Relationship",
    link: data?.secondaryCta?.link || "/#contact",
  };

  return (
    <section className="relative w-full min-h-[85dvh] flex items-center justify-center bg-transparent overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24 border-b border-slate-200/60">
      
      {/* Blueprint grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e125_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e125_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_60%,transparent_100%)] pointer-events-none" />
      
      {/* Ambient background glows */}
      <div className="absolute top-[12%] left-[15%] w-[450px] h-[350px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[450px] h-[350px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="ecosystem-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-w-0">
          
          {/* Left Column: Manifesto */}
          <div className="lg:col-span-7 space-y-5 text-left min-w-0">
            
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: smoothEase }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-800 shadow-xs"
            >
              <Building2 size={13} className="text-blue-600 animate-pulse" />
              <span className="tracking-wide uppercase text-[11px] font-mono text-blue-700">{eyebrow}</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-600 font-bold text-[11px]">{badge}</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: smoothEase, delay: 0.08 }}
              className="text-fluid-display font-black tracking-tight text-slate-950 leading-[1.12]"
            >
              Organizations Built On{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600">
                Resilient Foundations.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: smoothEase, delay: 0.16 }}
              className="text-slate-600 text-fluid-lead font-normal max-w-xl leading-relaxed"
            >
              {description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: smoothEase, delay: 0.24 }}
              className="flex flex-wrap items-center gap-3.5 pt-1.5"
            >
              <a href={primaryCta.link}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 rounded-full bg-slate-950 hover:bg-blue-600 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-slate-950/15 flex items-center gap-2 group cursor-pointer"
                  data-cursor="Customers"
                >
                  <Users size={16} />
                  <span>{primaryCta.text}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </a>

              <a href={secondaryCta.link}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 rounded-full bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs sm:text-sm transition-all border border-slate-200 shadow-xs flex items-center gap-2 cursor-pointer"
                  data-cursor="Contact"
                >
                  <Sparkles size={15} className="text-blue-600" />
                  <span>{secondaryCta.text}</span>
                </motion.button>
              </a>
            </motion.div>

            {/* Micro Trust Signals */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: smoothEase, delay: 0.32 }}
              className="flex flex-wrap items-center gap-4 sm:gap-6 pt-3 text-[11px] font-semibold text-slate-500"
            >
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-blue-600" />
                <span>100% In-House Engineering</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Lock size={14} className="text-indigo-600" />
                <span>NDA & Confidentiality Protected</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Activity size={14} className="text-blue-600" />
                <span>Direct Architect Communication</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Interactive Ecosystem Blueprint Card */}
          <div className="lg:col-span-5 min-w-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: smoothEase, delay: 0.15 }}
              className="relative p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-xl shadow-slate-900/5 backdrop-blur-xl"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider">
                    Relationship Governance
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-bold border border-blue-100">
                  SECURE • AUDITED
                </span>
              </div>

              <div className="space-y-3.5 py-4">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Total IP Assignment</h4>
                    <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                      Full ownership of source code, schemas, and proprietary business logic transferred to client.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Cpu size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Dedicated Pod Allocation</h4>
                    <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                      Senior fullstack engineers assigned directly without junior churn or offshore handoffs.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">24/7 Production SLA</h4>
                    <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                      Continuous telemetry monitoring and direct incident response escalations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="font-mono">Security: Strict NDA Compliance</span>
                <span className="font-bold text-blue-600">Enterprise Ready</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
