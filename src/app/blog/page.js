// src/app/blog/page.js
"use client";

import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  Youtube, 
  Instagram, 
  ExternalLink, 
  Search, 
  Filter, 
  ArrowRight 
} from "lucide-react";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
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
        setFilteredBlogs(fetchedBlogs);

        // Unique Categories Extract karna
        const cats = ["All", ...new Set(fetchedBlogs.map(b => b.category))];
        setCategories(cats);
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      }
    };
    fetchBlogs();
  }, []);

  // 2. Filtering Logic (Search + Category)
  useEffect(() => {
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

    setFilteredBlogs(result);
  }, [searchQuery, activeCategory, blogs]);

  // Featured Blog (Latest one) - Only show when no filter/search is active
  const featuredBlog = (searchQuery === "" && activeCategory === "All") ? blogs[0] : null;
  const gridBlogs = featuredBlog ? filteredBlogs.slice(1) : filteredBlogs;

  return (
    <main className="bg-transparent min-h-screen text-slate-900 selection:bg-indigo-500/20">
      {/* Navbar removed */}
      
      <div className="pt-32 pb-24 px-6 container mx-auto max-w-7xl">
        
        {/* --- PAGE HEADER --- */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-6 tracking-tight"
          >
            Insights & <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">Updates</span>
          </motion.h1>
          <p className="text-slate-500 text-lg font-semibold">
            Dive into our latest thoughts, tutorials, and social media buzz.
          </p>
        </div>

        {/* --- SEARCH & FILTER BAR --- */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16 bg-white/70 border border-slate-200 p-4 rounded-2xl shadow-sm backdrop-blur-sm">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                    type="text" 
                    placeholder="Search articles..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-slate-900 focus:bg-white focus:border-indigo-500 focus:outline-none transition-all placeholder:text-slate-400 font-medium"
                />
            </div>

            {/* Category Tabs */}
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 custom-scrollbar">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all border ${
                            activeCategory === cat 
                                ? "bg-slate-950 text-white border-slate-950 shadow-sm" 
                                : "bg-transparent text-slate-650 border-slate-200 hover:text-slate-900 hover:border-slate-350"
                        }`}
                        data-cursor="Category"
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>

        {/* --- FEATURED BLOG (HERO) --- */}
        {featuredBlog && (
            <motion.a 
                href={featuredBlog.link}
                target="_blank"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="block group relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden border border-slate-200/80 mb-16 shadow-md"
                data-cursor="Read"
            >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent z-10 opacity-90 transition-opacity group-hover:opacity-85"></div>
                <img 
                    src={featuredBlog.image} 
                    alt={featuredBlog.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                <div className="absolute top-6 left-6 z-20">
                    <span className="bg-indigo-650 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                        Featured
                    </span>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-20">
                    <div className="flex items-center gap-3 text-sm text-indigo-300 mb-3 font-semibold">
                        {featuredBlog.platform === 'youtube' ? <Youtube size={18} /> : <Instagram size={18} />}
                        <span>{new Date(featuredBlog.createdAt).toLocaleDateString()}</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-4 max-w-4xl leading-tight group-hover:text-blue-100 transition-colors tracking-tight">
                        {featuredBlog.title}
                    </h2>
                    <p className="text-slate-200 text-lg max-w-2xl line-clamp-2 mb-6 font-medium">
                        {featuredBlog.desc}
                    </p>
                    <div className="inline-flex items-center gap-2 text-white font-bold border-b border-white/20 pb-1 group-hover:border-indigo-400 transition-all">
                        Read Full Story <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
                    </div>
                </div>
            </motion.a>
        )}

        {/* --- BLOG GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {gridBlogs.length > 0 ? (
                gridBlogs.map((blog, index) => (
                    <motion.a
                        href={blog.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        layout
                        key={blog._id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-indigo-500/30 shadow-sm hover:shadow-md transition-all flex flex-col h-full"
                        data-cursor="Read"
                    >
                        {/* Thumbnail */}
                        <div className="w-full aspect-video bg-slate-100 relative overflow-hidden">
                            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            
                            {/* Overlay Icon */}
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px]">
                                {blog.platform === 'youtube' ? <Youtube size={48} className="text-red-500 fill-current" /> : <Instagram size={48} className="text-pink-500" />}
                            </div>

                            <div className="absolute top-4 left-4">
                                <span className={`text-[10px] font-bold px-2 py-1 rounded backdrop-blur-md border border-white/10 uppercase tracking-wider ${blog.platform === 'youtube' ? 'bg-red-600 text-white' : 'bg-pink-600 text-white'}`}>
                                    {blog.category}
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col flex-grow">
                            <div className="flex items-center gap-2 text-xs text-slate-400 font-bold mb-3">
                                <Calendar size={12} />
                                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                            </div>
                            
                            <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
                                {blog.title}
                            </h3>
                            <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-grow line-clamp-3 font-medium">
                                {blog.desc}
                            </p>
                            
                            <div className="text-sm font-bold text-slate-800 flex items-center gap-1 group-hover:gap-2 group-hover:text-indigo-600 transition-all mt-auto pt-4 border-t border-slate-100">
                                Open Link <ExternalLink size={14} className="text-indigo-600"/>
                            </div>
                        </div>
                    </motion.a>
                ))
            ) : (
                <div className="col-span-full py-20 text-center">
                    <div className="inline-block p-4 rounded-full bg-slate-100 mb-4 border border-slate-200">
                        <Filter size={32} className="text-slate-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">No blogs found</h3>
                    <p className="text-slate-500 font-medium mt-2">Try adjusting your search or filters.</p>
                    <button 
                        onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                        className="mt-6 px-6 py-2.5 bg-slate-950 text-white font-bold rounded-full hover:bg-slate-800 transition-colors shadow-sm"
                        data-cursor="Clear"
                    >
                        Clear Filters
                    </button>
                </div>
            )}
          </AnimatePresence>
        </div>

      </div>

      <Footer />
    </main>
  );
}