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
    <main className="bg-black min-h-screen text-white selection:bg-blue-500/30">
      {/* Navbar removed */}
      
      <div className="pt-32 pb-24 px-6 container mx-auto max-w-7xl">
        
        {/* --- PAGE HEADER --- */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
          >
            Insights & <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Updates</span>
          </motion.h1>
          <p className="text-gray-400 text-lg">
            Dive into our latest thoughts, tutorials, and social media buzz.
          </p>
        </div>

        {/* --- SEARCH & FILTER BAR --- */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input 
                    type="text" 
                    placeholder="Search articles..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-all placeholder:text-gray-600"
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
                                ? "bg-white text-black border-white" 
                                : "bg-transparent text-gray-400 border-white/10 hover:text-white hover:border-white/30"
                        }`}
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
                className="block group relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden border border-white/10 mb-16"
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10 opacity-90 transition-opacity group-hover:opacity-80"></div>
                <img 
                    src={featuredBlog.image} 
                    alt={featuredBlog.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                <div className="absolute top-6 left-6 z-20">
                    <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                        Featured
                    </span>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-20">
                    <div className="flex items-center gap-3 text-sm text-blue-300 mb-3 font-medium">
                        {featuredBlog.platform === 'youtube' ? <Youtube size={18} /> : <Instagram size={18} />}
                        <span>{new Date(featuredBlog.createdAt).toLocaleDateString()}</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-4xl leading-tight group-hover:text-blue-200 transition-colors">
                        {featuredBlog.title}
                    </h2>
                    <p className="text-gray-300 text-lg max-w-2xl line-clamp-2 mb-6">
                        {featuredBlog.desc}
                    </p>
                    <div className="inline-flex items-center gap-2 text-white font-bold border-b border-white/20 pb-1 group-hover:border-blue-500 transition-all">
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
                        className="group bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all flex flex-col h-full"
                    >
                        {/* Thumbnail */}
                        <div className="w-full aspect-video bg-gray-900 relative overflow-hidden">
                            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            
                            {/* Overlay Icon */}
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px]">
                                {blog.platform === 'youtube' ? <Youtube size={48} className="text-red-500 fill-current" /> : <Instagram size={48} className="text-pink-500" />}
                            </div>

                            <div className="absolute top-4 left-4">
                                <span className={`text-[10px] font-bold px-2 py-1 rounded backdrop-blur-md border border-white/10 uppercase tracking-wider ${blog.platform === 'youtube' ? 'bg-red-900/40 text-red-100' : 'bg-pink-900/40 text-pink-100'}`}>
                                    {blog.category}
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col flex-grow">
                            <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                                <Calendar size={12} />
                                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                            </div>
                            
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
                                {blog.title}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                                {blog.desc}
                            </p>
                            
                            <div className="text-sm font-bold text-white flex items-center gap-1 group-hover:gap-2 transition-all mt-auto pt-4 border-t border-white/5">
                                Open Link <ExternalLink size={14} className="text-blue-500"/>
                            </div>
                        </div>
                    </motion.a>
                ))
            ) : (
                <div className="col-span-full py-20 text-center">
                    <div className="inline-block p-4 rounded-full bg-white/5 mb-4">
                        <Filter size={32} className="text-gray-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">No blogs found</h3>
                    <p className="text-gray-400 mt-2">Try adjusting your search or filters.</p>
                    <button 
                        onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                        className="mt-6 px-6 py-2 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors"
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