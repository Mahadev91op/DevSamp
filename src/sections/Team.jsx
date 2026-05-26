"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Youtube, Plus, Bird, Folder, FileCode, Terminal, User, Code2, Cpu, Settings } from "lucide-react";

const XIcon = ({ size = 20, className }) => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" width={size} height={size} className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

// Google Drive Thumbnail Logic
const getGoogleDriveImage = (url) => {
  if (!url) return "";
  try {
    const fileDMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (fileDMatch && fileDMatch[1]) {
      return `https://drive.google.com/thumbnail?id=${fileDMatch[1]}&sz=w1000`;
    }
    const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (idMatch && idMatch[1]) {
      return `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w1000`;
    }
  } catch (e) {
    console.error("Link Error:", e);
  }
  return url;
};

const getSkillsForRole = (role) => {
  const r = role.toLowerCase();
  if (r.includes("design") || r.includes("ui") || r.includes("ux")) {
    return [
      { name: "Figma & UI Design", level: 95, speed: "100ms" },
      { name: "UX Wireframing", level: 90, speed: "120ms" },
      { name: "Interactive Prototyping", level: 92, speed: "80ms" }
    ];
  }
  if (r.includes("backend") || r.includes("database") || r.includes("server")) {
    return [
      { name: "Node.js & APIs", level: 95, speed: "30ms" },
      { name: "MongoDB & Scale", level: 92, speed: "45ms" },
      { name: "DevOps & Cloud", level: 88, speed: "150ms" }
    ];
  }
  return [
    { name: "Next.js & Frontend", level: 96, speed: "12ms" },
    { name: "State Architecture", level: 92, speed: "25ms" },
    { name: "Fullstack Integrity", level: 90, speed: "60ms" }
  ];
};

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch("/api/team");
        const data = await res.json();
        const members = data.team || [];
        setTeamMembers(members);
        if (members.length > 0) setActiveId(members[0]._id);
      } catch (error) {
        console.error("Failed to fetch team", error);
      }
    };
    fetchTeam();
  }, []);

  if (teamMembers.length === 0) return null;

  const activeMember = teamMembers.find(m => m._id === activeId) || teamMembers[0];
  const activeSkills = (activeMember && activeMember.skills && activeMember.skills.length > 0) 
    ? activeMember.skills 
    : getSkillsForRole(activeMember.role);

  return (
    <section id="team" className="py-12 md:py-24 bg-transparent text-slate-900 overflow-hidden relative">
      <div className="absolute top-[20%] right-[-10%] w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="mb-10 md:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-3">
            Core Engine
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-2 tracking-tight">
            The <span className="text-indigo-650">Squad</span>
          </h2>
          <p className="text-xs md:text-sm text-slate-500 font-semibold max-w-lg">
            Meet the engineers, designers, and builders powering our creative digital systems.
          </p>
        </div>

        {/* Coder Workspace Console */}
        <div className="bg-white/60 border border-slate-200/80 rounded-3xl overflow-hidden shadow-lg backdrop-blur-xl flex flex-col md:grid md:grid-cols-12 min-h-[550px] transition-all duration-300">
          
          {/* Left Panel: File Explorer (Sidebar) */}
          <div className="col-span-3 border-r border-slate-200/80 bg-slate-100/40 p-4 md:p-6 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-y-auto whitespace-nowrap md:whitespace-normal scrollbar-none select-none">
            <div className="hidden md:flex items-center gap-2 mb-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <Folder size={14} className="text-indigo-500" />
              <span>Workspace / Squad</span>
            </div>

            {teamMembers.map((member) => {
              const isActive = member._id === activeId;
              const fileExtension = member.role.toLowerCase().includes("design") ? ".json" : ".js";
              return (
                <button
                  key={member._id}
                  onClick={() => setActiveId(member._id)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-left font-bold text-xs md:text-sm transition-all w-fit md:w-full border ${
                    isActive 
                      ? "bg-white text-indigo-650 border-slate-200 shadow-sm" 
                      : "bg-transparent text-slate-550 border-transparent hover:bg-slate-100/60 hover:text-slate-800"
                  }`}
                  data-cursor="Select"
                >
                  <FileCode size={14} className={isActive ? "text-indigo-600 animate-pulse" : "text-slate-400"} />
                  <span className="truncate">{member.name}{fileExtension}</span>
                </button>
              );
            })}
          </div>

          {/* Right Panel: Active File Editor Window */}
          <div className="col-span-9 flex flex-col h-full bg-white/30">
            {/* Editor Window Bar */}
            <div className="h-11 border-b border-slate-200/80 bg-slate-50/50 px-4 md:px-6 flex items-center justify-between select-none">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-400"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                <span className="w-3 h-3 rounded-full bg-green-400"></span>
              </div>
              <div className="flex items-center gap-1 text-[10px] md:text-xs text-slate-400 font-mono font-bold tracking-wider">
                <Terminal size={12} className="text-slate-400" />
                <span>root@devsamp:~/{activeMember.name.toLowerCase()}{activeMember.role.toLowerCase().includes("design") ? ".json" : ".js"}</span>
              </div>
              <div className="w-12"></div> {/* Spacer to center */}
            </div>

            {/* Editor Content Area */}
            <div className="p-5 md:p-8 flex-1 flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start">
              
              {/* Profile Card Overlay (Left inside Editor) */}
              <div className="lg:col-span-5 w-full flex flex-col items-center text-center">
                <div className="relative group mb-5">
                  {/* Glowing Animated Outer Ring */}
                  <div className="absolute inset-[-6px] bg-gradient-to-tr from-indigo-500 via-purple-500 to-blue-500 rounded-2xl blur-md opacity-40 group-hover:opacity-75 group-hover:scale-105 transition-all duration-500 animate-pulse"></div>
                  
                  {/* Photo Container */}
                  <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-2xl overflow-hidden border-2 border-white bg-slate-100 shadow-md">
                    <img 
                      src={getGoogleDriveImage(activeMember.image)} 
                      alt={activeMember.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      referrerPolicy="no-referrer"
                      loading="eager"
                    />
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-1">{activeMember.name}</h3>
                <p className="text-indigo-650 text-xs md:text-sm font-bold uppercase tracking-wider mb-4">{activeMember.role}</p>

                {/* Social Actions inside Panel */}
                <div className="flex justify-center gap-3">
                  {[
                    { href: "https://www.freelancer.in/u/DevSamp", icon: Bird, label: "Freelancer" },
                    { href: "https://www.youtube.com/@DevSamp1st", icon: Youtube, label: "YouTube" },
                    { href: "https://x.com/devsamp1st", icon: XIcon, label: "X" }
                  ].map((social, index) => (
                    <motion.a 
                      key={index}
                      href={social.href}
                      target="_blank"
                      whileHover={{ y: -3, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2.5 rounded-xl bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 border border-slate-200/60 hover:border-indigo-200/60 transition-colors shadow-sm"
                      title={social.label}
                      data-cursor="Link"
                    >
                      <social.icon size={16} />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Data & Diagnostics (Right inside Editor) */}
              <div className="lg:col-span-7 w-full flex flex-col justify-between h-full space-y-6">
                
                {/* Code-like details display */}
                <div className="bg-slate-900/90 text-slate-350 p-4 md:p-6 rounded-2xl border border-slate-800 font-mono text-[11px] md:text-xs shadow-inner leading-relaxed relative overflow-hidden">
                  <div className="absolute top-2 right-2 flex items-center gap-1.5 text-[9px] text-slate-600 font-sans font-bold uppercase tracking-widest select-none">
                    <Code2 size={10} />
                    <span>JSON Payload</span>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeMember._id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-pink-400 font-bold">const</span> <span className="text-blue-300">developer</span> = &#123;<br />
                      &nbsp;&nbsp;<span className="text-purple-400">name</span>: <span className="text-green-300">"{activeMember.name}"</span>,<br />
                      &nbsp;&nbsp;<span className="text-purple-400">role</span>: <span className="text-green-300">"{activeMember.role}"</span>,<br />
                      &nbsp;&nbsp;<span className="text-purple-400">focus</span>: [
                      {activeSkills.map((s, idx) => (
                        <span key={idx} className="text-yellow-200">
                          {idx > 0 && ", "}"{s.name.split(" ")[0]}"
                        </span>
                      ))}
                      ],<br />
                      &nbsp;&nbsp;<span className="text-purple-400">integrity</span>: <span className="text-orange-400">99.8</span>,<br />
                      &nbsp;&nbsp;<span className="text-purple-400">diagnostics</span>: <span className="text-teal-400">"Online"</span>,<br />
                      &nbsp;&nbsp;<span className="text-purple-400">manifest</span>: <span className="text-gray-400">"{activeMember.desc}"</span><br />
                      &#125;;
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Diagnostics Panel (Progress Bars) */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Cpu size={12} className="text-indigo-600" />
                    <span>Engine Metrics & Core Skills</span>
                  </h4>
                  
                  <div className="space-y-3.5">
                    {activeSkills.map((skill, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-xs font-bold text-slate-700">
                          <span>{skill.name}</span>
                          <span className="text-indigo-650 font-mono text-[10px] bg-indigo-50 border border-indigo-100/50 px-1.5 py-0.5 rounded">
                            L: {skill.level}% | {skill.speed}
                          </span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/40">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ delay: 0.2 + idx * 0.1, duration: 1, type: "spring" }}
                            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Team;