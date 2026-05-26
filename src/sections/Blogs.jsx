"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, Youtube, Instagram, ExternalLink, GitCommit, GitBranch } from "lucide-react";

const Blogs = ({ initialBlogs = [] }) => {
  const blogs = initialBlogs;

  if (blogs.length === 0) return null;

  return (
    <section id="blog" className="py-12 md:py-24 bg-transparent text-slate-900 relative">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-4 md:gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-3">
              Version Logs
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-1 md:mb-2 tracking-tight">
              Latest <span className="text-indigo-650 font-extrabold">Updates</span>
            </h2>
            <p className="text-slate-550 text-xs md:text-sm font-semibold">
              Live stream updates and devlogs directly from our version control branch channels.
            </p>
          </div>
          <Link href="/blog">
            <button className="px-5 py-2.5 border border-slate-300 bg-white/40 backdrop-blur-sm rounded-full text-slate-700 hover:bg-slate-900 hover:text-white transition-all text-xs font-bold flex items-center gap-2 shadow-sm" data-cursor="Blog">
                Inspect Changelog <ArrowRight size={14} />
            </button>
          </Link>
        </div>

        {/* Git Branch Changelog Timeline */}
        <div className="relative border-l border-slate-200/80 ml-4 md:ml-8 pl-8 md:pl-10 space-y-12">
          
          {/* Animated Glowing Branch Path */}
          <div className="absolute left-[-1px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-indigo-500 via-purple-500 to-transparent pointer-events-none"></div>

          {blogs.slice(0, 3).map((blog, index) => {
            const commitHash = `commit ${blog._id.slice(-7)}`;
            const isYoutube = blog.platform === 'youtube';
            
            return (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="relative group"
              >
                {/* Timeline node */}
                <div className="absolute left-[-42px] md:left-[-50px] top-1.5 w-7 h-7 md:w-8 md:h-8 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-slate-400 group-hover:border-indigo-500 group-hover:text-indigo-600 transition-all shadow-sm z-10">
                  <GitCommit size={14} className="group-hover:rotate-90 transition-transform duration-300" />
                </div>

                {/* Git Node tag */}
                <div className="flex flex-wrap items-center gap-2 mb-2 select-none">
                  <span className="text-[10px] font-mono font-bold text-indigo-650 bg-indigo-50 border border-indigo-100/60 px-2 py-0.5 rounded">
                    {commitHash}
                  </span>
                  <span className="text-[9px] font-mono text-slate-400 font-bold flex items-center gap-1">
                    <GitBranch size={10} /> main
                  </span>
                  <span className="text-slate-300 text-[10px]">|</span>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold">
                    <Calendar size={10} />
                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Changelog Card */}
                <a
                  href={blog.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white/50 border border-slate-200 hover:border-indigo-200/80 p-5 md:p-6 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.01)] hover:shadow-md transition-all relative overflow-hidden"
                  data-cursor="Read"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Thumbnail Image */}
                    {blog.image && (
                      <div className="w-full md:w-44 h-28 shrink-0 rounded-xl overflow-hidden relative bg-slate-100 border border-slate-200/50">
                        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                        <div className="absolute inset-0 bg-slate-950/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          {isYoutube ? <Youtube size={32} className="text-red-500 fill-current" /> : <Instagram size={32} className="text-pink-500" />}
                        </div>
                      </div>
                    )}

                    {/* Meta info */}
                    <div className="flex flex-col justify-between flex-grow">
                      <div>
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded text-white uppercase tracking-wider ${isYoutube ? 'bg-red-600' : 'bg-pink-600'}`}>
                            {blog.platform === 'youtube' ? 'Video' : 'Social'}
                          </span>
                          <span className="text-slate-400 text-[9px] font-bold">in category "{blog.category || "Updates"}"</span>
                        </div>
                        
                        <h3 className="text-base md:text-lg font-black text-slate-800 mb-1 group-hover:text-indigo-650 transition-colors line-clamp-1 leading-tight">
                          {blog.title}
                        </h3>
                        <p className="text-slate-500 text-[11px] md:text-xs line-clamp-2 leading-relaxed font-medium mb-3">
                          {blog.desc}
                        </p>
                      </div>

                      <div className="text-[11px] font-bold text-slate-700 flex items-center gap-1 group-hover:gap-1.5 group-hover:text-indigo-600 transition-all select-none">
                        {isYoutube ? 'Run Media Player' : 'Inspect Source Post'} 
                        <ExternalLink size={11} className="text-indigo-500"/>
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