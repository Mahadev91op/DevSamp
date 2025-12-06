"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  // API se Data Fetch karna
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjects(data.projects || []);
      } catch (error) {
        console.error("Failed to fetch projects", error);
      }
    };
    fetchProjects();
  }, []);

  // Unique Categories nikalna (Dynamic)
  const categories = ["All", ...new Set(projects.map(p => p.category))];

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="work" className="py-24 bg-black relative">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-white mb-2"
            >
              Selected <span className="text-blue-500">Works</span>
            </motion.h2>
            <p className="text-gray-400">Check out some of our latest projects.</p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                  activeCategory === cat
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-gray-400 border-white/10 hover:border-white/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={project._id}
                className="group relative rounded-2xl overflow-hidden cursor-pointer bg-white/5 border border-white/10"
              >
                {/* Image Container */}
                <div className="relative h-[300px] w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">
                    {project.category}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                  
                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((t, i) => (
                        <span key={i} className="text-[10px] bg-white/10 px-2 py-1 rounded text-gray-300">
                            {t}
                        </span>
                    ))}
                  </div>

                  <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    <a href={project.link} target="_blank" className="flex items-center gap-1 text-sm font-medium text-white hover:text-blue-400 transition-colors">
                        View Project <ExternalLink size={16} />
                    </a>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Button */}
        <div className="mt-16 flex justify-center">
            <button className="px-8 py-3 border border-white/20 rounded-full text-white hover:bg-white hover:text-black transition-all">
                View All Projects
            </button>
        </div>

      </div>
    </section>
  );
};

export default Portfolio;