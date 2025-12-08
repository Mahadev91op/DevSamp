"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, Youtube, Instagram, ExternalLink } from "lucide-react";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs");
        const data = await res.json();
        setBlogs(data.blogs?.slice(0, 3) || []);
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      }
    };
    fetchBlogs();
  }, []);

  if (blogs.length === 0) return null;

  return (
    <section id="blog" className="py-24 bg-black text-white relative">
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <motion.h2 initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="text-4xl md:text-5xl font-bold text-white mb-2">
              Latest <span className="text-blue-500">Updates</span>
            </motion.h2>
            <p className="text-gray-400">Content straight from our social channels.</p>
          </div>
          <Link href="/blog"><button className="px-6 py-2 border border-white/20 rounded-full text-white hover:bg-white hover:text-black transition-all text-sm font-bold flex items-center gap-2">View All <ArrowRight size={16} /></button></Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.a
                href={blog.link}
                target="_blank"
                rel="noopener noreferrer"
                key={blog._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all flex flex-col h-full"
            >
                <div className="h-52 w-full relative overflow-hidden bg-gray-900">
                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    
                    {/* Overlay Icon */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        {blog.platform === 'youtube' ? <Youtube size={48} className="text-red-500 fill-current" /> : <Instagram size={48} className="text-pink-500" />}
                    </div>

                    <div className={`absolute top-4 left-4 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${blog.platform === 'youtube' ? 'bg-red-600' : 'bg-pink-600'}`}>
                        {blog.platform === 'youtube' ? 'Video' : 'Post'}
                    </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                        <Calendar size={12} />
                        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
                        {blog.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2 mb-4 flex-grow">
                        {blog.desc}
                    </p>
                    <div className="text-sm font-bold text-white flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
                        {blog.platform === 'youtube' ? 'Watch Video' : 'View Post'} <ExternalLink size={14} className="text-blue-500"/>
                    </div>
                </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Blogs;