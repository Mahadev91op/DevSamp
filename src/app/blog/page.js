// src/app/blog/page.js
"use client";

import { useState, useEffect, useMemo } from "react";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  Youtube, 
  Instagram, 
  ExternalLink, 
  Search, 
  Filter, 
  GitCommit, 
  GitBranch,
  Terminal,
  ChevronRight
} from "lucide-react";
import { BlogsSkeleton } from "@/components/Skeletons";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [categories, setCategories] = useState(["All"]);

  // 1. Data Fetching
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs");
        const data = await res.json();
        const fetchedBlogs = data.blogs || [];
        setBlogs(fetchedBlogs);

        // Unique Categories Extraction
        const cats = ["All", ...new Set(fetchedBlogs.map(b => b.category))];
        setCategories(cats);
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // 2. Filtering Logic (Search + Category)
  const filteredBlogs = useMemo(() => {
    let result = blogs;

    // Filter by Category
    if (activeCategory !== "All") {
      result = result.filter(blog => blog.category === activeCategory);
    }

    // Filter by Search
    if (searchQuery) {
      result = result.filter(blog => 
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.desc.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return result;
  }, [searchQuery, activeCategory, blogs]);

  return (
    <main className="bg-transparent min-h-screen text-slate-900 selection:bg-indigo-500/20">
      
      <div className="pt-32 pb-24 px-6 container mx-auto max-w-5xl">
        
        {/* --- PAGE HEADER --- */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-3">
            System logs
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black mb-4 tracking-tight"
          >
            Git <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-650 font-extrabold">Changelog</span>
          </motion.h1>
          <p className="text-slate-500 text-xs md:text-sm font-semibold max-w-md mx-auto">
            Inspect our repository streams, tutorials, and announcements compiled as a release timeline.
          </p>
        </div>

        {/* --- SEARCH & FILTER BAR (Console style) --- */}
        {!loading && (
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-16 bg-white border border-slate-200/80 p-4 rounded-2xl shadow-sm">
              
              {/* Search Input styled as query box */}
              <div className="relative w-full md:w-96 select-none">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-xs font-bold">
                    $ grep
                  </span>
                  <input 
                      type="text" 
                      placeholder="search articles..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-16 pr-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-indigo-500 focus:outline-none transition-all placeholder:text-slate-400 font-medium"
                  />
              </div>

              {/* Category Tabs */}
              <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none select-none">
                  {categories.map((cat) => (
                      <button
                          key={cat}
                          onClick={() => setActiveCategory(cat)}
                          className={`px-4.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                              activeCategory === cat 
                                  ? "bg-slate-950 text-white border-slate-950 shadow-sm" 
                                  : "bg-transparent text-slate-550 border-slate-200 hover:text-slate-900 hover:border-slate-350"
                          }`}
                          data-cursor="Category"
                      >
                          {cat}
                      </button>
                  ))}
              </div>
          </div>
        )}

        {/* --- TIMELINE LIST --- */}
        {loading ? (
          <BlogsSkeleton count={3} />
        ) : (
          <div className="relative border-l border-slate-200/80 ml-4 md:ml-8 pl-8 md:pl-10 space-y-12">
          
          <div className="absolute left-[-1px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-indigo-500 via-purple-500 to-transparent pointer-events-none"></div>

          <AnimatePresence mode="popLayout">
            {filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog, index) => {
                  const commitHash = `commit ${blog._id.slice(-7)}`;
                  const isYoutube = blog.platform === 'youtube';
                  return (
                    <motion.div
                        layout
                        key={blog._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="relative group"
                    >
                        {/* Timeline Node */}
                        <div className="absolute left-[-42px] md:left-[-50px] top-1.5 w-7 h-7 md:w-8 md:h-8 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-slate-400 group-hover:border-indigo-500 group-hover:text-indigo-600 transition-all shadow-sm z-10">
                          <GitCommit size={14} className="group-hover:rotate-90 transition-transform duration-300" />
                        </div>

                        {/* Metadata Row */}
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
                          className="block bg-white/90 border border-slate-200 hover:border-indigo-200/80 p-5 md:p-6 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.01)] hover:shadow-md transition-all relative overflow-hidden"
                          data-cursor="Read"
                        >
                          <div className="flex flex-col md:flex-row gap-6">
                            {/* Thumbnail */}
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
                                  <span className="text-slate-400 text-[9px] font-bold">in category &quot;{blog.category || "Updates"}&quot;</span>
                                </div>
                                
                                <h3 className="text-base md:text-lg font-black text-slate-800 mb-1 group-hover:text-indigo-650 transition-colors line-clamp-1 leading-tight">
                                  {blog.title}
                                </h3>
                                <p className="text-slate-550 text-[11px] md:text-xs line-clamp-2 leading-relaxed font-medium mb-3">
                                  {blog.desc}
                                </p>
                              </div>

                              <div className="text-[11px] font-bold text-slate-705 flex items-center gap-1 group-hover:gap-1.5 group-hover:text-indigo-600 transition-all select-none">
                                {isYoutube ? 'Launch Stream' : 'Verify Post Reference'} 
                                <ExternalLink size={11} className="text-indigo-500"/>
                              </div>
                            </div>
                          </div>
                        </a>
                    </motion.div>
                  );
                })
            ) : (
                <div className="py-20 text-center select-none bg-white/80 border border-dashed border-slate-200 rounded-3xl">
                    <div className="inline-block p-4 rounded-full bg-slate-100 border border-slate-200 mb-3 text-slate-400">
                        <Terminal size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800">No commits found</h3>
                    <p className="text-xs text-slate-500 font-medium mt-1">Grep did not return matching results.</p>
                    <button 
                        onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                        className="mt-6 px-6 py-2.5 bg-slate-950 text-white font-bold rounded-xl hover:bg-slate-800 transition-all text-xs shadow-sm"
                        data-cursor="Clear"
                    >
                        Reset Grep Query
                    </button>
                </div>
            )}
          </AnimatePresence>
        </div>
        )}

      </div>

      <Footer />
    </main>
  );
}