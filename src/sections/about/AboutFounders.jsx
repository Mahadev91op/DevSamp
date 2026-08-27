"use client";

import { motion } from "framer-motion";
import { User, Quote, Github, Linkedin, Twitter, Mail, Sparkles, Code2, ArrowUpRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { getDirectImageUrl } from "@/lib/image-helper";

const smoothEase = [0.16, 1, 0.3, 1];

const defaultFounders = [
  {
    name: "Mahadev Mondal",
    role: "Founder & Lead Architect",
    image: "https://drive.google.com/thumbnail?id=1CElg2x75dACo8yxN7fL1Ss3nand2W64V&sz=w1000",
    bio: "Full-stack engineer, systems architect, and product designer passionate about Next.js, multi-tenant cloud ecosystems, and high-performance developer tools. Leading the architectural vision and engineering standards across the DevSamp product ecosystem.",
    quote: "Software should be engineered as an appreciating asset with zero architectural debt, not disposable agency code.",
    expertise: ["Next.js 15 & React 19", "Multi-Tenant Cloud Systems", "API Gateways & Security", "Product Design", "Distributed State"],
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/mahadev-mondal",
      github: "https://github.com/Mahadev91op",
      twitter: "https://x.com/devsamp1st",
      email: "mailto:devsamp1st@gmail.com"
    }
  }
];

const AboutFounders = ({ data = [] }) => {
  const founders = data && data.length > 0 ? data : defaultFounders;

  if (!founders || founders.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200/60 text-slate-900 relative overflow-hidden">
      <div className="ecosystem-container max-w-5xl">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 min-w-0">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[11px] font-bold text-indigo-700 uppercase tracking-widest mb-3">
            <User size={12} /> Leadership Spotlight
          </div>
          <h2 className="text-fluid-h2 font-black mb-2.5 tracking-tight text-slate-950">
            Founded on Engineering Craftsmanship
          </h2>
          <p className="text-slate-600 text-fluid-body font-normal">
            Directly led by software architects who write production code, design scalable infrastructure, and support live enterprise systems.
          </p>
        </div>

        {/* Magazine-Style Founder Spotlight Card */}
        {founders.map((founder, idx) => {
          const imageUrl = getDirectImageUrl(founder.image) || "https://drive.google.com/thumbnail?id=1CElg2x75dACo8yxN7fL1Ss3nand2W64V&sz=w1000";

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: smoothEase }}
              className="bg-slate-50/80 border border-slate-200/90 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xs relative overflow-hidden min-w-0"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start min-w-0">
                
                {/* Left Column: Portrait & Connectors */}
                <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left space-y-4 min-w-0">
                  <div className="relative">
                    {imageUrl ? (
                      <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden shadow-lg shadow-indigo-600/20 border-4 border-white bg-slate-100 shrink-0">
                        <img 
                          src={imageUrl} 
                          alt={founder.name} 
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            if (e.currentTarget.nextElementSibling) {
                              e.currentTarget.nextElementSibling.style.display = 'flex';
                            }
                          }}
                        />
                        <div className="w-full h-full bg-gradient-to-tr from-blue-600 via-blue-500 to-indigo-600 hidden items-center justify-center text-white text-3xl font-black">
                          {founder.name ? founder.name.charAt(0).toUpperCase() : "M"}
                        </div>
                      </div>
                    ) : (
                      <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-tr from-blue-600 via-blue-500 to-indigo-600 flex items-center justify-center text-white text-4xl font-black shadow-lg shadow-indigo-600/20 border-4 border-white">
                        {founder.name ? founder.name.charAt(0).toUpperCase() : "M"}
                      </div>
                    )}
                    <span className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-emerald-500 text-white ring-4 ring-white shadow-xs">
                      <ShieldCheck size={14} />
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                      {founder.name}
                    </h3>
                    <p className="text-xs font-bold text-indigo-600 mt-0.5 font-mono uppercase tracking-wider">
                      {founder.role}
                    </p>
                  </div>

                  {/* Social Connectors */}
                  <div className="flex gap-2 pt-1">
                    {founder.socialLinks?.github && (
                      <a href={founder.socialLinks.github} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-950 hover:border-slate-300 transition-colors shadow-xs" title="GitHub">
                        <Github size={15} />
                      </a>
                    )}
                    {founder.socialLinks?.linkedin && (
                      <a href={founder.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-slate-300 transition-colors shadow-xs" title="LinkedIn">
                        <Linkedin size={15} />
                      </a>
                    )}
                    {founder.socialLinks?.twitter && (
                      <a href={founder.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-950 hover:border-slate-300 transition-colors shadow-xs" title="Twitter">
                        <Twitter size={15} />
                      </a>
                    )}
                    {founder.socialLinks?.email && (
                      <a href={founder.socialLinks.email} className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-slate-300 transition-colors shadow-xs" title="Email">
                        <Mail size={15} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Column: Bio Narrative, Quote, and Specializations */}
                <div className="lg:col-span-8 space-y-5 min-w-0">
                  
                  {/* Personal Quote Banner */}
                  {founder.quote && (
                    <div className="p-5 bg-white border border-indigo-100/80 rounded-2xl flex items-start gap-3.5 shadow-xs">
                      <Quote size={20} className="text-indigo-600 shrink-0 mt-0.5 opacity-80" />
                      <p className="text-xs sm:text-sm font-semibold text-slate-800 italic leading-relaxed">
                        &quot;{founder.quote}&quot;
                      </p>
                    </div>
                  )}

                  {/* Narrative Bio */}
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                    {founder.bio}
                  </p>

                  {/* Core Specialization Pills */}
                  {founder.expertise && founder.expertise.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-slate-200/80">
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                        Core Technical Specializations
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {founder.expertise.map((tag, tIdx) => (
                          <span key={tIdx} className="text-[11px] font-mono font-bold px-3 py-1 rounded-xl bg-white border border-slate-200 text-slate-800 shadow-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                </div>

              </div>
            </motion.div>
          );
        })}

      </div>
    </section>
  );
};

export default AboutFounders;
