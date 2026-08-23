"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GitCommit, Sparkles, BookOpen, Clock, ArrowUpRight, CheckCircle2, ChevronRight } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const defaultChapters = [
  {
    year: "2023",
    title: "The Foundation: Specialized Engineering",
    description: "Started as a dedicated full-stack engineering pod building complex web platforms, APIs, and cloud infrastructure for fast-growing businesses.",
    highlight: "Custom Engineering DNA",
    order: 1
  },
  {
    year: "2024",
    title: "First Vertical Product: MedERP Pro",
    description: "Identified deep fragmentation in healthcare clinical operations and engineered MedERP Pro—a full HIPAA-ready hospital orchestration platform.",
    highlight: "First Flagship SaaS",
    order: 2
  },
  {
    year: "2025",
    title: "Ecosystem Architecture & Multi-Tenancy",
    description: "Expanded product portfolio with DevScale Core and FlowPulse POS, while developing our unified developer API gateway and telemetry mesh.",
    highlight: "Multi-Product Mesh",
    order: 3
  },
  {
    year: "2026 & Beyond",
    title: "The Global Connected Ecosystem",
    description: "Unifying products, bespoke engineering pods, and open developer infrastructure to power next-generation business workflows globally.",
    highlight: "The Future Layer",
    order: 4
  }
];

const AboutStory = ({ data = null }) => {
  const [activeChapter, setActiveChapter] = useState(0);

  const title = data?.title || "From Agile Engineering Pod to an Interconnected Product Ecosystem";
  const introduction = data?.introduction || "DevSamp began with a fundamental premise: modern high-growth businesses don't just need isolated freelance software builds; they require unified, compounding digital infrastructure and enterprise-grade software products.";
  const chapters = data?.chapters && data.chapters.length > 0 ? data.chapters : defaultChapters;

  return (
    <section id="story" className="py-16 md:py-24 bg-slate-50/60 border-b border-slate-200/70 text-slate-900 relative overflow-hidden">
      <div className="ecosystem-container">
        
        {/* Split Story Layout: Left Sticky Info & Right Interactive Chronology */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start min-w-0">
          
          {/* Left Column: Sticky Story Header & Interactive Chapter Index */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6 min-w-0">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[11px] font-bold text-indigo-700 uppercase tracking-widest">
              <BookOpen size={12} /> Company Story
            </div>

            <h2 className="text-fluid-h2 font-black mb-3 tracking-tight text-slate-950 leading-tight">
              {title}
            </h2>

            <p className="text-slate-600 text-fluid-body font-normal leading-relaxed">
              {introduction}
            </p>

            {/* Interactive Chapter Quick Index */}
            <div className="space-y-2 pt-2 select-none">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                Chronological Chapters
              </span>
              {chapters.map((chap, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveChapter(idx)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between text-xs font-bold ${
                    activeChapter === idx
                      ? "bg-white border-indigo-300 text-indigo-700 shadow-xs ring-1 ring-indigo-500/20"
                      : "bg-transparent border-slate-200/60 text-slate-600 hover:bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="font-mono text-[11px] text-indigo-600">{chap.year}</span>
                    <span className="truncate">{chap.title}</span>
                  </div>
                  <ChevronRight size={13} className={activeChapter === idx ? "text-indigo-600" : "text-slate-400"} />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Timeline Narrative Chapters */}
          <div className="lg:col-span-7 relative border-l-2 border-indigo-200 ml-3 md:ml-6 pl-6 md:pl-8 space-y-8 min-w-0">
            {chapters.map((chap, idx) => {
              const isSelected = activeChapter === idx;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: smoothEase, delay: idx * 0.08 }}
                  onClick={() => setActiveChapter(idx)}
                  className={`relative group cursor-pointer transition-all ${
                    isSelected ? "scale-[1.01]" : "opacity-90 hover:opacity-100"
                  }`}
                >
                  {/* Timeline Dot Marker */}
                  <div className={`absolute left-[-37px] md:left-[-45px] top-4 w-7 h-7 md:w-8 md:h-8 rounded-full border-2 flex items-center justify-center font-bold text-xs transition-all shadow-xs z-10 ${
                    isSelected 
                      ? "bg-indigo-600 border-white text-white shadow-md shadow-indigo-600/30" 
                      : "bg-white border-indigo-300 text-indigo-600"
                  }`}>
                    <GitCommit size={14} />
                  </div>

                  {/* Chapter Card */}
                  <div className={`p-6 sm:p-7 rounded-3xl border transition-all duration-300 ${
                    isSelected 
                      ? "bg-white border-indigo-400 shadow-md ring-1 ring-indigo-500/30" 
                      : "bg-white/80 border-slate-200/80 hover:bg-white hover:border-slate-300 shadow-xs"
                  }`}>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-mono font-black px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700">
                        {chap.year}
                      </span>
                      <span className="text-[10px] font-mono uppercase font-bold text-slate-400">
                        CHAPTER 0{idx + 1} • {chap.highlight}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-slate-950 mb-2 leading-snug">
                      {chap.title}
                    </h3>
                    
                    <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed">
                      {chap.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono font-bold text-slate-400">
                      <span>STATUS: RECORDED</span>
                      <span className="text-indigo-600 font-extrabold">✓ VERIFIED INFLECTION</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutStory;
