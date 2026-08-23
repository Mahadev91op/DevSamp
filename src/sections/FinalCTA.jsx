"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Boxes, 
  ArrowRight, 
  ArrowUpRight, 
  Sparkles, 
  Cpu,
  Mail
} from "lucide-react";

const FinalCTA = ({ sectionData = null, siteSettings = null }) => {
  const badge = sectionData?.badge || "Next Step";
  const title = sectionData?.title || siteSettings?.finalCtaTitle || "Build what's next with the DevSamp Ecosystem.";
  const description = sectionData?.description || siteSettings?.finalCtaDescription || "Deploy enterprise-grade software products or collaborate with our engineering pod to compile your custom software vision.";
  
  const primaryCta = {
    text: sectionData?.ctaText || siteSettings?.finalCtaPrimary?.text || "Explore Products",
    link: sectionData?.ctaLink || siteSettings?.finalCtaPrimary?.link || "/#products"
  };

  const secondaryCta = {
    text: sectionData?.secondaryCtaText || siteSettings?.finalCtaSecondary?.text || "Initialize Project",
    link: sectionData?.secondaryCtaLink || siteSettings?.finalCtaSecondary?.link || "/#contact"
  };

  return (
    <section className="py-16 md:py-24 bg-transparent text-slate-900 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl md:rounded-[2.5rem] p-8 md:p-16 lg:p-20 overflow-hidden shadow-2xl border border-slate-800"
        >
          {/* Subtle Ambient lights inside card */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-blue-500/15 rounded-full blur-[100px] pointer-events-none" />
          
          {/* Background grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] font-bold text-indigo-300 uppercase tracking-widest backdrop-blur-sm">
              <Sparkles size={12} /> {badge}
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight leading-[1.1]">
              {title}
            </h2>

            <p className="text-slate-300 text-sm md:text-lg font-medium max-w-xl mx-auto leading-relaxed">
              {description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link href={primaryCta.link} className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm md:text-base transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 group"
                  data-cursor="Products"
                >
                  <Boxes size={16} />
                  <span>{primaryCta.text}</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>

              <Link href={secondaryCta.link} className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold text-sm md:text-base transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
                  data-cursor="Connect"
                >
                  <Mail size={16} className="text-indigo-400" />
                  <span>{secondaryCta.text}</span>
                </motion.button>
              </Link>
            </div>

            {/* Small reassurance line */}
            <div className="pt-6 flex flex-wrap justify-center items-center gap-4 md:gap-8 text-[11px] font-mono text-slate-400 font-bold">
              <span>✓ Enterprise Ready</span>
              <span>✓ Rapid Deployment</span>
              <span>✓ 24/7 SLA Guarantee</span>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default FinalCTA;
