"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, Youtube, Instagram, ExternalLink, GitCommit, GitBranch, Sparkles } from "lucide-react";

const smoothEase = [0.16, 1, 0.3, 1];

const Blogs = ({ initialBlogs = [], sectionData = null }) => {
  const blogs = initialBlogs;

  if (blogs.length === 0) return null;

  const badge = sectionData?.badge || "Version Logs";
  const title = sectionData?.title || "Latest Releases & Engineering Devlogs";
  const description = sectionData?.description || "Live stream updates and devlogs directly from our version control branch channels.";

  return (
    <section id="blog" className="py-16 md:py-24 bg-white border-b border-slate-200/60 text-slate-900 relative">
      <div className="ecosystem-container max-w-5xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-14 gap-5 min-w-0">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-bold text-indigo-700 uppercase tracking-widest mb-3">
              <Sparkles size={13} /> {badge}
            </div>
            <h2 className="text-fluid-h2 font-black text-slate-950 mb-2.5 tracking-tight">
              {title}
            </h2>
            <p className="text-slate-600 text-fluid-lead font-normal">
              {description}
            </p>
          </div>

          <div className="shrink-0">
            <Link href="/blog">
              <button 
                className="px-5 py-2.5 border border-slate-300 bg-slate-50 rounded-full text-slate-900 hover:bg-slate-950 hover:text-white transition-all text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs whitespace-nowrap cursor-pointer" 
                data-cursor="Blog"
              >
                <span>Inspect Changelog</span> <ArrowRight size={14} />
              </button>
            </Link>
          </div>
        </div>

        {/* Git Branch Changelog Timeline */}
        <div className="relative border-l border-slate-200/80 ml-3 md:ml-6 pl-6 md:pl-8 space-y-10 min-w-0">
          
          {/* Glowing Branch Line */}
          <div className="absolute left-[-1px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-indigo-500 via-purple-500 to-transparent pointer-events-none" />

          {blogs.slice(0, 3).map((blog, index) => {
            const commitHash = `commit ${blog._id ? blog._id.slice(-7) : "8f9a21"}`;
            const isYoutube = blog.platform === 'youtube';
            
            return (
              <motion.div
                key={blog._id || index}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: smoothEase, delay: index * 0.08 }}
                className="relative group min-w-0"
              >
                {/* Timeline node */}
                <div className="absolute left-[-37px] md:left-[-45px] top-1.5 w-7 h-7 md:w-8 md:h-8 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-slate-400 group-hover:border-indigo-500 group-hover:text-indigo-600 transition-all shadow-xs z-10">
                  <GitCommit size={14} className="group-hover:rotate-90 transition-transform duration-300" />
                </div>

                {/* Git Node tag */}
                <div className="flex flex-wrap items-center gap-2 mb-2.5 select-none">
                  <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded">
                    {commitHash}
                  </span>
                  <span className="text-xs font-mono text-slate-500 font-bold flex items-center gap-1">
                    <GitBranch size={12} /> main
                  </span>
                  <span className="text-slate-300 text-xs">|</span>
                  <div className="flex items-center gap-1 text-xs text-slate-500 font-bold">
                    <Calendar size={13} />
                    <span>{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : "Latest"}</span>
                  </div>
                </div>

                {/* Changelog Card */}
                <a
                  href={blog.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-slate-50/80 border border-slate-200 hover:bg-white hover:border-indigo-300 p-5 md:p-6 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300 relative overflow-hidden min-w-0"
                  data-cursor="Read"
                >
                  <div className="flex flex-col md:flex-row gap-5 min-w-0">
                    {blog.image && (
                      <div className="w-full md:w-48 h-32 shrink-0 rounded-xl overflow-hidden relative bg-slate-100 border border-slate-200">
                        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400" loading="lazy" />
                        <div className="absolute inset-0 bg-slate-950/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          {isYoutube ? <Youtube size={30} className="text-red-500 fill-current" /> : <Instagram size={30} className="text-pink-500" />}
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col justify-between flex-grow min-w-0">
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded text-white uppercase tracking-wider ${isYoutube ? 'bg-red-600' : 'bg-pink-600'}`}>
                            {blog.platform === 'youtube' ? 'Video' : 'Social'}
                          </span>
                          <span className="text-slate-500 text-xs font-bold truncate">in &quot;{blog.category || "Updates"}&quot;</span>
                        </div>
                        
                        <h3 className="text-lg md:text-xl font-black text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors line-clamp-1 leading-tight truncate">
                          {blog.title}
                        </h3>
                        <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 leading-relaxed font-normal mb-3">
                          {blog.desc}
                        </p>
                      </div>

                      <div className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1 group-hover:gap-1.5 group-hover:text-indigo-600 transition-all select-none">
                        <span>{isYoutube ? 'Run Media Player' : 'Inspect Source Post'}</span>
                        <ExternalLink size={13} className="text-indigo-600 shrink-0"/>
                      </div>
                    </div>
                  </div>
                </a>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Blogs;