"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { Heart, CheckCircle2, BookOpen, Zap, MessageSquare, Sparkles, Youtube, Github, ExternalLink } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const defaultValues = [
  {
    title: "Extreme Ownership",
    description: "Every engineer and designer takes end-to-end responsibility for what they ship to production.",
    icon: "CheckCircle2"
  },
  {
    title: "Continuous Learning",
    description: "Constantly sharpening our architectural knowledge and adopting better, simpler engineering patterns.",
    icon: "BookOpen"
  },
  {
    title: "Speed With Precision",
    description: "Moving fast without breaking architectural integrity, type safety, or user experience.",
    icon: "Zap"
  },
  {
    title: "Transparent Communication",
    description: "Direct, honest technical feedback and clear documentation for clients and colleagues alike.",
    icon: "MessageSquare"
  }
];

const AboutCulture = ({ cultureData = null, communityData = null }) => {
  const cultureTitle = cultureData?.title || "Our Culture & Internal DNA";
  const cultureDescription = cultureData?.description || "We operate with the agility of a high-growth startup and the technical discipline of an enterprise engineering firm.";
  const values = cultureData?.values && cultureData.values.length > 0 ? cultureData.values : defaultValues;

  const communityTitle = communityData?.title || "Community & Knowledge Sharing";
  const communityDescription = communityData?.description || "We regularly publish architectural devlogs, UI libraries, and fullstack tutorials on YouTube and open source repositories.";

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200/60 text-slate-900 relative">
      <div className="ecosystem-container space-y-16">
        
        {/* Culture Part */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 min-w-0">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[11px] font-bold text-indigo-700 uppercase tracking-widest mb-3">
              <Heart size={12} /> Culture & DNA
            </div>
            <h2 className="text-fluid-h2 font-black mb-2.5 tracking-tight text-slate-950">
              {cultureTitle}
            </h2>
            <p className="text-slate-600 text-fluid-body font-normal">
              {cultureDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 min-w-0">
            {values.map((val, idx) => {
              const Icon = LucideIcons[val.icon] || CheckCircle2;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: smoothEase, delay: idx * 0.08 }}
                  className="bg-slate-50/80 border border-slate-200/90 hover:bg-white hover:border-indigo-400 p-6 rounded-3xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between min-w-0"
                >
                  <div>
                    <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-xs mb-4">
                      <Icon size={20} />
                    </div>
                    <h3 className="text-base font-black text-slate-900 mb-1.5 truncate">
                      {val.title}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed font-normal">
                      {val.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-200/70 text-[10px] font-mono text-slate-400 font-bold">
                    CORE BEHAVIOR
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Community Part */}
        <div className="bg-slate-50/80 border border-slate-200/90 rounded-3xl p-6 sm:p-8 md:p-10 min-w-0">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 min-w-0">
            <div className="max-w-xl min-w-0">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-[11px] font-bold text-purple-700 uppercase tracking-widest mb-3">
                <Sparkles size={12} /> Open Knowledge
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight mb-2">
                {communityTitle}
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-normal">
                {communityDescription}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 w-full md:w-auto">
              <a href="https://www.youtube.com/@DevSamp1st" target="_blank" rel="noopener noreferrer" className="flex-1 md:flex-initial">
                <button className="w-full px-5 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer">
                  <Youtube size={16} />
                  <span>YouTube Devlogs</span>
                  <ExternalLink size={13} />
                </button>
              </a>

              <a href="https://github.com/Mahadev91op" target="_blank" rel="noopener noreferrer" className="flex-1 md:flex-initial">
                <button className="w-full px-5 py-3 rounded-full bg-slate-950 hover:bg-indigo-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer">
                  <Github size={16} />
                  <span>GitHub Repos</span>
                  <ExternalLink size={13} />
                </button>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutCulture;
