"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Briefcase, ArrowRight, Sparkles, Send } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const AboutCareers = ({ data = null }) => {
  const title = data?.title || "Build the Future with Us";
  const description = data?.description || "We are always excited to connect with talented full-stack engineers, UI designers, and systems architects who take pride in writing pristine code.";
  const cultureStatement = data?.cultureStatement || "Autonomous pods, async-first workflows, high agency, and direct impact on real production products.";
  const ctaText = data?.ctaText || "Connect with Founders";
  const ctaLink = data?.ctaLink || "/#contact";

  return (
    <section className="py-16 md:py-24 bg-slate-50/60 border-b border-slate-200/70 text-slate-900 relative">
      <div className="ecosystem-container max-w-4xl">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 md:p-12 shadow-xs text-center space-y-5 min-w-0"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[11px] font-bold text-emerald-700 uppercase tracking-widest">
            <Briefcase size={12} /> Join Our Engineering Pod
          </div>

          <h2 className="text-fluid-h2 font-black tracking-tight text-slate-950 leading-tight">
            {title}
          </h2>

          <p className="text-slate-600 text-fluid-body font-normal max-w-xl mx-auto leading-relaxed">
            {description}
          </p>

          <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl max-w-md mx-auto text-xs font-mono font-bold text-slate-700">
            {cultureStatement}
          </div>

          <div className="pt-3">
            <Link href={ctaLink}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-7 py-3.5 rounded-full bg-slate-950 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
                data-cursor="Join"
              >
                <Send size={14} />
                <span>{ctaText}</span>
                <ArrowRight size={14} />
              </motion.button>
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutCareers;
