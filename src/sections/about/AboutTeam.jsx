"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Users, Sparkles, Code2 } from "lucide-react";
import { getDirectImageUrl } from "@/lib/image-helper";

const smoothEase = [0.16, 1, 0.3, 1];

const AboutTeam = ({ data = [] }) => {
  const team = data;

  if (!team || team.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-slate-50/60 border-b border-slate-200/70 text-slate-900 relative">
      <div className="ecosystem-container">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 min-w-0">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[11px] font-bold text-indigo-700 uppercase tracking-widest mb-3">
            <Users size={12} /> Engineering Pod
          </div>
          <h2 className="text-fluid-h2 font-black mb-2.5 tracking-tight text-slate-950">
            Core Leadership & Pod Engineers
          </h2>
          <p className="text-slate-600 text-fluid-body font-normal">
            Specialized engineering talent driving product features, architecture, and developer operations.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 min-w-0">
          {team.map((member, idx) => {
            const imageUrl = getDirectImageUrl(member.image);

            return (
              <motion.div
                key={member._id || idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: smoothEase, delay: idx * 0.08 }}
                className="bg-white border border-slate-200/90 hover:border-indigo-400 p-6 rounded-3xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between min-w-0"
              >
                <div className="space-y-3.5 min-w-0">
                  <div className="flex items-center gap-3.5 min-w-0">
                    {imageUrl ? (
                      <div className="w-14 h-14 rounded-2xl overflow-hidden relative border border-slate-200 shadow-xs shrink-0 bg-slate-100">
                        <Image 
                          src={imageUrl} 
                          alt={member.name} 
                          fill 
                          sizes="56px" 
                          className="object-cover" 
                          unoptimized 
                        />
                      </div>
                    ) : (
                      <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-base shrink-0">
                        {member.name ? member.name.charAt(0).toUpperCase() : "T"}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-black text-slate-900 truncate">{member.name}</h3>
                      <p className="text-xs font-bold text-indigo-600 truncate">{member.role}</p>
                    </div>
                  </div>

                  <p className="text-slate-500 text-xs leading-relaxed font-normal">
                    {member.desc}
                  </p>
                </div>

                {member.skills && member.skills.length > 0 && (
                  <div className="pt-4 mt-4 border-t border-slate-100 flex flex-wrap gap-1">
                    {member.skills.map((skill, sIdx) => {
                      const skillLabel = typeof skill === "object" && skill !== null ? (skill.name || skill.title || "Skill") : String(skill);
                      return (
                        <span key={sIdx} className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                          {skillLabel}
                        </span>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default AboutTeam;
