"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Youtube, Plus, Bird } from "lucide-react";

const XIcon = ({ size = 20, className }) => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" width={size} height={size} className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

// BRAHMASTRA FIX: Google Drive Thumbnail Logic
// Yeh function 'view' link ko 'thumbnail' link me badal dega jo 100% chalta hai.
const getGoogleDriveImage = (url) => {
  if (!url) return "";
  
  try {
    let id = null;

    // Pattern 1: /file/d/ID/...
    if (url.includes("/file/d/")) {
      const parts = url.split("/file/d/");
      if (parts.length > 1) {
        id = parts[1].split('/')[0];
      }
    }
    // Pattern 2: id=ID param
    else if (url.includes("id=")) {
      const params = new URLSearchParams(new URL(url).search);
      id = params.get("id");
    }

    // Agar ID mil gayi, to THUMBNAIL link return karo (sz=w1000 matlab 1000px quality)
    if (id) {
      return `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
    }
  } catch (e) {
    console.error("Link Error:", e);
  }

  return url;
};

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch("/api/team");
        const data = await res.json();
        setTeamMembers(data.team || []);
        if (data.team?.length > 0) setActiveId(data.team[0]._id);
      } catch (error) {
        console.error("Failed to fetch team", error);
      }
    };
    fetchTeam();
  }, []);

  if (teamMembers.length === 0) return null;

  return (
    <section id="team" className="py-12 md:py-24 bg-black text-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-6 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4">
            The <span className="text-blue-500">Squad</span>
          </h2>
          <p className="text-sm md:text-base text-gray-400">Meet the people who make the magic happen.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-3 md:gap-4 h-[400px] md:h-[500px] w-full">
          {teamMembers.map((member) => (
            <motion.div
              key={member._id}
              layout
              onClick={() => setActiveId(member._id)}
              onHoverStart={() => setActiveId(member._id)}
              className={`relative rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ease-in-out border border-white/10 ${
                activeId === member._id 
                  ? "flex-[3] grayscale-0" 
                  : "flex-[1] grayscale hover:grayscale-0"
              }`}
            >
              {/* FIX: Using standard <img> with Thumbnail Link */}
              <img 
                src={getGoogleDriveImage(member.image)}
                alt={member.name} 
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="eager"
              />
              
              {/* Fallback Black Background */}
              <div className="absolute inset-0 bg-gray-900 -z-10"></div>
              
              <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
                activeId === member._id ? "opacity-0" : "opacity-60"
              }`}></div>

              {activeId === member._id ? (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="absolute bottom-0 left-0 w-full p-5 md:p-8 bg-gradient-to-t from-black/90 via-black/60 to-transparent"
                >
                    <div className="flex justify-between items-end">
                        <div>
                            <h3 className="text-xl md:text-3xl font-bold text-white mb-1">{member.name}</h3>
                            <p className="text-blue-400 text-xs md:text-base font-medium mb-1 md:mb-3">{member.role}</p>
                            <p className="text-gray-300 text-[10px] md:text-sm max-w-xs line-clamp-2 md:line-clamp-none">{member.desc}</p>
                        </div>
                        
                        <div className="flex flex-col md:flex-row gap-2 md:gap-3">
                            <a href="https://www.freelancer.in/u/DevSamp" target="_blank" className="p-1.5 md:p-2 rounded-full bg-white/20 hover:bg-white text-white hover:text-black transition-all">
                                <Bird size={16} className="md:w-5 md:h-5" />
                            </a>
                            <a href="https://www.youtube.com/@DevSamp1st" target="_blank" className="p-1.5 md:p-2 rounded-full bg-white/20 hover:bg-white text-white hover:text-black transition-all">
                                <Youtube size={16} className="md:w-5 md:h-5" />
                            </a>
                            <a href="https://x.com/devsamp1st" target="_blank" className="p-1.5 md:p-2 rounded-full bg-white/20 hover:bg-white text-white hover:text-black transition-all">
                                <XIcon size={16} className="md:w-5 md:h-5" />
                            </a>
                        </div>
                    </div>
                </motion.div>
              ) : (
                <div className="absolute top-1/2 left-4 -translate-y-1/2 md:top-auto md:left-1/2 md:bottom-8 md:translate-y-0 md:-translate-x-1/2 md:rotate-[-90deg] whitespace-nowrap">
                    <p className="text-sm md:text-xl font-bold tracking-widest text-white/80 uppercase">{member.name}</p>
                </div>
              )}

              {activeId !== member._id && (
                <div className="absolute top-1/2 right-4 -translate-y-1/2 md:top-auto md:right-auto md:bottom-6 md:left-1/2 md:-translate-x-1/2 p-1.5 md:p-2 rounded-full bg-white/10 backdrop-blur-md">
                    <Plus className="text-white" size={16} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;