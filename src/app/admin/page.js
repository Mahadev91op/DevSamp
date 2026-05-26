"use client";

import { useState, useEffect, useMemo } from "react";
import { 
  LayoutDashboard, Users, Layers, Plus, Loader2, LogOut, Menu, X, 
  CheckCircle, AlertCircle, Briefcase, PenBox, 
  Trash2, Search, ExternalLink, CreditCard, Star, MessageCircle, 
  TrendingUp, Filter, Rss, Download, Wand2, Eye, Mail, 
  ChevronLeft, ChevronRight, Image as ImageIcon, Maximize2, Minimize2, 
  BarChart3, Activity, ArrowRight, Zap, FolderKanban, Clock, Save, Link as LinkIcon, DollarSign, FileText,
  UploadCloud, File, Calendar as CalendarIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- HELPERS (SAME AS BEFORE) ---
const getTimeRangeConfig = (range) => {
    const now = new Date();
    switch(range) {
        case '1D': return { days: 1, labelFormat: 'hour' };
        case '7D': return { days: 7, labelFormat: 'day' };
        case '1M': return { days: 30, labelFormat: 'date' };
        case '3M': return { days: 90, labelFormat: 'month' };
        case '6M': return { days: 180, labelFormat: 'month' };
        case '1Y': return { days: 365, labelFormat: 'month' };
        case '3Y': return { days: 1095, labelFormat: 'year' };
        default: return { days: 7, labelFormat: 'day' };
    }
};

const filterAndGroupData = (items, range) => {
    const { days, labelFormat } = getTimeRangeConfig(range);
    const now = new Date();
    const startDate = new Date();
    startDate.setDate(now.getDate() - days);

    const filtered = items.filter(item => new Date(item.createdAt) >= startDate);
    const groups = {};
    const labels = [];
    
    if (labelFormat === 'hour') {
        for(let i=0; i<24; i++) {
            const d = new Date(startDate);
            d.setHours(d.getHours() + i);
            const key = d.toLocaleTimeString([], { hour: '2-digit' });
            groups[key] = 0;
            labels.push(key);
        }
    } else if (labelFormat === 'month' || labelFormat === 'year') {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        for (let i = (labelFormat === 'year' ? 3 : 6); i >= 0; i--) {
             const d = new Date();
             if(labelFormat === 'year') d.setFullYear(d.getFullYear() - i);
             else d.setMonth(d.getMonth() - i);
             const key = labelFormat === 'year' ? d.getFullYear() : `${monthNames[d.getMonth()]}`;
             groups[key] = 0;
             if(!labels.includes(String(key))) labels.push(String(key));
        }
    } else {
        for(let i=0; i<days; i++) {
            const d = new Date(startDate);
            d.setDate(d.getDate() + i + 1);
            const key = d.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' });
            groups[key] = 0;
            labels.push(key);
        }
    }

    filtered.forEach(item => {
        const d = new Date(item.createdAt);
        let key;
        if (labelFormat === 'hour') key = d.toLocaleTimeString([], { hour: '2-digit' });
        else if (labelFormat === 'month') key = d.toLocaleString('default', { month: 'short' });
        else if (labelFormat === 'year') key = d.getFullYear();
        else key = d.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' });

        if (groups[key] !== undefined) groups[key]++;
    });

    const finalData = labels.map(l => groups[l] || 0);
    return { labels, data: finalData };
};

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

const gradientOptions = [
    { name: "Blue", class: "from-blue-500 to-cyan-500" },
    { name: "Purple", class: "from-purple-500 to-pink-500" },
    { name: "Orange", class: "from-orange-500 to-red-500" },
    { name: "Green", class: "from-emerald-500 to-green-500" },
    { name: "Dark", class: "from-gray-700 to-black" },
];

const LineChart = ({ data, labels, expanded, onToggleExpand, timeRange, setTimeRange, color = "blue" }) => {
  const [hoveredVal, setHoveredVal] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const h = expanded ? 400 : 200; 
  const w = expanded ? 1000 : 600;
  const max = Math.max(...data) || 1;
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - (val / max) * (h * 0.7) - 20; 
    return [x, y];
  });
  const pathD = points.reduce((acc, [x, y], i, arr) => {
    if (i === 0) return `M ${x},${y}`;
    const [px, py] = arr[i - 1];
    const cp1x = px + (x - px) / 2;
    const cp1y = py;
    const cp2x = px + (x - px) / 2;
    const cp2y = y;
    return `${acc} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${x},${y}`;
  }, "");
  return (
    <div className={`relative bg-white border border-slate-200/80 p-6 rounded-3xl transition-all duration-500 ease-in-out ${expanded ? "col-span-full row-span-2 z-50 scale-[1.01] shadow-2xl" : "col-span-1 shadow-sm"}`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
            <h3 className={`font-bold text-slate-800 flex items-center gap-2 ${expanded ? "text-2xl" : "text-lg"}`}>
                <Activity size={expanded ? 24 : 18} className={`text-${color}-600`}/> Leads Overview
            </h3>
            <p className="text-slate-450 text-xs mt-1">Inquiries received over time.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
            <div className="flex bg-slate-100 border border-slate-200 rounded-lg p-1 overflow-x-auto max-w-full">
                {['1D', '7D', '1M', '3M', '1Y'].map(r => (
                    <button key={r} onClick={() => setTimeRange(r)} className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all whitespace-nowrap ${timeRange === r ? `bg-indigo-600 text-white shadow-sm` : "text-slate-500 hover:text-slate-900"}`}>{r}</button>
                ))}
            </div>
            <button onClick={onToggleExpand} className="p-2 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-800 transition-colors">{expanded ? <Minimize2 size={16}/> : <Maximize2 size={16}/>}</button>
        </div>
      </div>
      <div className={`w-full relative group select-none ${expanded ? "h-[400px]" : "h-[200px]"}`}>
        <AnimatePresence>
            {hoveredVal !== null && (
                <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`absolute bg-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-xl pointer-events-none transform -translate-x-1/2 z-20`} style={{ left: `${(hoveredIndex / (data.length - 1)) * 100}%`, top: points[hoveredIndex][1] - 40 }}>{hoveredVal} Leads<div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-indigo-600 rotate-45"></div></motion.div>
            )}
        </AnimatePresence>
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full overflow-visible preserve-3d">
            <defs>
                <linearGradient id={`grad-${color}`} x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.3" /><stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
                </linearGradient>
            </defs>
            <line x1="0" y1={h} x2={w} y2={h} stroke="#e2e8f0" strokeWidth="1" />
            <line x1="0" y1={0} x2={w} y2={0} stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="0" y1={h/2} x2={w} y2={h/2} stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
            <path d={`${pathD} L ${w},${h} L 0,${h} Z`} fill={`url(#grad-${color})`} />
            <path d={pathD} fill="none" stroke="#4f46e5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_4px_10px_rgba(79,70,229,0.15)]" />
            {points.map(([x, y], i) => (<circle key={i} cx={x} cy={y} r="5" fill="white" stroke="#4f46e5" strokeWidth="3" className="cursor-pointer transition-all duration-200 hover:r-7 hover:fill-indigo-650 hover:stroke-indigo-650 z-10" onMouseEnter={() => { setHoveredVal(data[i]); setHoveredIndex(i); }} onMouseLeave={() => { setHoveredVal(null); setHoveredIndex(null); }}/>))}
        </svg>
        <div className="flex justify-between mt-4 text-[10px] text-slate-400 font-mono font-bold uppercase tracking-widest">{labels.map((l, i) => (<span key={i} className={`${i % 2 !== 0 && !expanded ? "hidden" : "block"}`}>{l}</span>))}</div>
      </div>
    </div>
  );
};

const BarChart = ({ data, labels, expanded, onToggleExpand, color = "purple" }) => {
    const max = Math.max(...data) || 1;
    return (
        <div className={`bg-white border border-slate-200/80 p-6 rounded-3xl transition-all duration-500 ease-in-out relative overflow-hidden ${expanded ? "col-span-full row-span-2 z-50 scale-[1.01] shadow-2xl" : "col-span-1 shadow-sm"}`}>
            <div className="flex justify-between items-center mb-8">
                <div><h3 className={`font-bold text-slate-800 flex items-center gap-2 ${expanded ? "text-2xl" : "text-lg"}`}><BarChart3 size={expanded ? 24 : 18} className="text-purple-600"/> Popular Services</h3><p className="text-slate-450 text-xs mt-1">Most requested services by clients.</p></div>
                <button onClick={onToggleExpand} className="p-2 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-800 transition-colors">{expanded ? <Minimize2 size={16}/> : <Maximize2 size={16}/>}</button>
            </div>
            <div className={`w-full flex items-end justify-between gap-2 md:gap-4 ${expanded ? "h-[400px]" : "h-[200px]"}`}>
                {data.map((val, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center justify-end h-full group relative">
                        <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-xs font-bold px-2 py-1 rounded mb-2 z-10 pointer-events-none">{val}</div>
                        <motion.div initial={{ height: 0 }} animate={{ height: `${(val / max) * 100}%` }} transition={{ duration: 1, delay: i * 0.1, type: "spring" }} className="w-full max-w-[40px] rounded-t-lg bg-gradient-to-t from-purple-100 to-purple-600 border-t border-x border-purple-200 hover:to-purple-500 transition-all cursor-pointer relative overflow-hidden" />
                        <span className="text-[9px] md:text-[10px] text-slate-450 mt-3 font-mono uppercase tracking-wider truncate w-full text-center">{labels[i]}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Toast = ({ message, type, onClose }) => (<motion.div initial={{ opacity: 0, y: -20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.9 }} className={`fixed top-6 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 px-6 py-3 rounded-full shadow-2xl border bg-white border-slate-205 ${type === "success" ? "text-emerald-600" : "text-red-500"}`}>{type === "success" ? <CheckCircle size={18} /> : <AlertCircle size={18} />}<span className="text-sm font-bold tracking-wide">{message}</span></motion.div>);

const StatCard = ({ title, value, icon: Icon, color, trend, onClick }) => (<div onClick={onClick} className="bg-white border border-slate-200/80 p-6 rounded-2xl relative overflow-hidden group hover:border-slate-350 transition-all hover:-translate-y-1 duration-300 shadow-sm hover:shadow-md cursor-pointer"><div className={`absolute -right-6 -top-6 w-24 h-24 bg-indigo-500/5 blur-2xl rounded-full group-hover:bg-indigo-500/10 transition-all`}></div><div className="flex justify-between items-start mb-4 relative z-10"><div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100/50"><Icon size={20} /></div>{trend && (<span className="text-[10px] font-bold text-green-700 bg-green-50 border border-green-150 px-2 py-0.5 rounded-full flex items-center gap-1"><TrendingUp size={10} /> {trend}</span>)}</div><h3 className="text-3xl font-black text-slate-900 mb-1 tracking-tight">{value}</h3><div className="flex items-center gap-2"><p className="text-slate-450 text-[10px] uppercase tracking-widest font-bold">{title}</p><ArrowRight size={12} className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" /></div></div>);

const Pagination = ({ total, perPage, current, onChange }) => { const pages = Math.ceil(total / perPage); if (pages <= 1) return null; return (<div className="flex items-center justify-end gap-2 mt-4"><button disabled={current === 1} onClick={() => onChange(current - 1)} className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"><ChevronLeft size={16}/></button><span className="text-xs text-slate-500 font-bold font-mono">Page {current} of {pages}</span><button disabled={current === pages} onClick={() => onChange(current + 1)} className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"><ChevronRight size={16}/></button></div>); };

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [password, setPassword] = useState("");

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/admin/auth");
        const data = await res.json();
        if (data.isAuthenticated) {
          setIsAuthenticated(true);
          fetchAllData();
        }
      } catch (err) {
        console.error("Session check failed", err);
      } finally {
        setIsCheckingSession(false);
      }
    };
    checkSession();
  }, []);
  
  const [activeTab, setActiveTab] = useState("dashboard"); 
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [extracting, setExtracting] = useState(false);
  const [uploading, setUploading] = useState(false); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); 
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewLead, setViewLead] = useState(null);
  const [leadsTimeRange, setLeadsTimeRange] = useState('7D');
  const [expandedChart, setExpandedChart] = useState(null); 
  const [calendarDate, setCalendarDate] = useState(new Date());

  const [data, setData] = useState({ leads: [], services: [], team: [], projects: [], pricing: [], reviews: [], blogs: [], clientProjects: [] });
  
  const [calcSettings, setCalcSettings] = useState({
    basePrice: 299,
    pricePerPage: 40,
    addons: [
      { name: "Interactive Admin Panel (CMS)", price: 299, enabled: true },
      { name: "Vitals SEO optimization", price: 149, enabled: true },
      { name: "Payment Gateway integrations", price: 199, enabled: true }
    ]
  });
  const [calcLoading, setCalcLoading] = useState(false);

  const [forms, setForms] = useState({
    project: { id: null, title: "", category: "", image: "", tech: "", link: "" },
    service: { title: "", desc: "", icon: "Monitor", color: "text-blue-500", gradient: "from-blue-500 to-cyan-500" },
    team: { id: null, name: "", role: "", image: "", desc: "", skills: [] },
    pricing: { id: null, name: "", desc: "", priceMonthly: "", priceYearly: "", features: "", missing: "", popular: false, gradient: "from-gray-500 to-gray-700" },
    blog: { id: null, link: "", title: "", desc: "", image: "", category: "", platform: "other" },
    review: { id: null, name: "", role: "", text: "", rating: 5, image: "" },
    clientProject: { 
        id: null, title: "", clientEmail: "", status: "Active", progress: 0, nextMilestone: "Discovery", dueDate: "TBD", 
        description: "", budget: "", paymentStatus: "Pending", links: [], 
        documents: [], 
        stages: [
            { id: 1, title: "Discovery", status: "pending", date: "Pending" },
            { id: 2, title: "UI/UX Design", status: "pending", date: "Pending" },
            { id: 3, title: "Development", status: "pending", date: "Pending" },
            { id: 4, title: "Testing", status: "pending", date: "Pending" },
            { id: 5, title: "Deployment", status: "pending", date: "Pending" }
        ], 
        updates: [] 
    }
  });

  const showToast = (message, type = "success") => { setToast({ message, type }); setTimeout(() => setToast(null), 3000); };

  const lineChartData = useMemo(() => filterAndGroupData(data.leads, leadsTimeRange), [data.leads, leadsTimeRange]);
  const barChartData = useMemo(() => { const counts = {}; data.leads.forEach(l => { const svc = l.service || "General"; counts[svc] = (counts[svc] || 0) + 1; }); const sorted = Object.entries(counts).sort((a,b) => b[1] - a[1]).slice(0, 5); return { labels: sorted.map(s => s[0]), data: sorted.map(s => s[1]) }; }, [data.leads]);

  const itemsPerPage = 8;
  const filteredData = useMemo(() => {
    let list = [];
    if(activeTab === 'leads') list = data.leads;
    else if(activeTab === 'projects') list = data.projects;
    else if(activeTab === 'blogs') list = data.blogs;
    else if(activeTab === 'team') list = data.team;
    else if(activeTab === 'services') list = data.services;
    else if(activeTab === 'reviews') list = data.reviews;
    else if(activeTab === 'pricing') list = data.pricing;
    else if(activeTab === 'client-projects') list = data.clientProjects; 

    if (!searchTerm) return list;
    return list.filter(item => Object.values(item).some(val => String(val).toLowerCase().includes(searchTerm.toLowerCase())));
  }, [activeTab, data, searchTerm]);

  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleLogin = async (e) => { 
    e.preventDefault(); 
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        fetchAllData(); 
        showToast("Access Granted!");
      } else {
        showToast(data.message || "Invalid Passkey", "error");
      }
    } catch (error) {
      showToast("Connection failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/admin/auth", {
        method: "DELETE"
      });
      if (res.ok) {
        setIsAuthenticated(false);
        setPassword("");
        showToast("Logged out successfully");
      } else {
        showToast("Logout failed", "error");
      }
    } catch (error) {
      showToast("Logout error", "error");
    }
  };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const endpoints = ["contact", "services", "team", "projects", "pricing", "reviews", "blogs", "client-projects"];
      const responses = await Promise.all(endpoints.map(ep => fetch(`/api/${ep}`).then(res => res.json())));
      setData({
        leads: responses[0].contacts || [],
        services: responses[1].services || [],
        team: responses[2].team || [],
        projects: responses[3].projects || [],
        pricing: responses[4].pricing || [],
        reviews: responses[5].reviews || [],
        blogs: responses[6].blogs || [],
        clientProjects: responses[7].projects || []
      });

      const settingsRes = await fetch("/api/pricing/settings");
      if (settingsRes.ok) {
        const settingsData = await settingsRes.json();
        if (settingsData.settings) {
          setCalcSettings(settingsData.settings);
        }
      }
    } catch (e) { showToast("Sync Failed", "error"); }
    setLoading(false);
  };

  const handleSaveCalcSettings = async (e) => {
    e.preventDefault();
    setCalcLoading(true);
    try {
      const res = await fetch("/api/pricing/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(calcSettings)
      });
      if (res.ok) {
        showToast("Calculator Settings Saved!");
      } else {
        showToast("Failed to save settings", "error");
      }
    } catch (err) {
      showToast("Network Error", "error");
    } finally {
      setCalcLoading(false);
    }
  };

  const handleExtractMeta = async () => {
    if (!forms.blog.link) return showToast("Please enter a link first", "error");
    setExtracting(true);
    try {
        const res = await fetch("/api/extract", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url: forms.blog.link }) });
        const meta = await res.json();
        if (res.ok) {
            setForms(prev => ({ ...prev, blog: { ...prev.blog, title: meta.title || "", desc: meta.desc || "", image: meta.image || "", platform: meta.platform || "other", category: meta.platform === 'youtube' ? 'Video' : 'Social' } }));
            showToast("Data Fetched!");
        } else { showToast("Could not fetch data", "error"); }
    } catch (e) { showToast("Extraction Error", "error"); }
    setExtracting(false);
  };

  const handleDelete = async (api, id) => {
    if (!confirm("Are you sure? This action cannot be undone.")) return;
    try { await fetch(`/api/${api}?id=${id}`, { method: "DELETE" }); showToast("Item Deleted"); fetchAllData(); } catch(e) { showToast("Delete Failed", "error"); }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
        await fetch("/api/contact", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) });
        const updatedLeads = data.leads.map(l => l._id === id ? { ...l, status } : l);
        setData(prev => ({...prev, leads: updatedLeads}));
        showToast("Status Updated");
    } catch(e) { showToast("Update Failed", "error"); }
  };

  const getTypeFromTab = (tab) => {
    const map = { projects: 'project', services: 'service', blogs: 'blog', team: 'team', pricing: 'pricing', reviews: 'review', 'client-projects': 'clientProject' };
    return map[tab] || null;
  };

  const openModal = (type, item = null) => {
    if(!forms[type]) return;
    setModalType(type);
    
    if(type === 'clientProject') {
        setForms(p => ({ 
            ...p, 
            clientProject: item ? { ...item, id: item._id, links: item.links || [], documents: item.documents || [] } : { 
                id: null, title: "", clientEmail: "", status: "Active", progress: 0, nextMilestone: "Discovery", dueDate: "TBD", 
                description: "", budget: "", paymentStatus: "Pending", links: [], documents: [],
                stages: [
                    { id: 1, title: "Discovery", status: "pending", date: "Pending" },
                    { id: 2, title: "UI/UX Design", status: "pending", date: "Pending" },
                    { id: 3, title: "Development", status: "pending", date: "Pending" },
                    { id: 4, title: "Testing", status: "pending", date: "Pending" },
                    { id: 5, title: "Deployment", status: "pending", date: "Pending" }
                ], 
                updates: [] 
            } 
        }));
    } 
    else if(type === 'project') setForms(p => ({ ...p, project: item ? { ...item, id: item._id, tech: item.tech.join(', ') } : { id: null, title: "", category: "", image: "", tech: "", link: "" } }));
    else if(type === 'service') setForms(p => ({ ...p, service: item ? { ...item, id: item._id } : { title: "", desc: "", icon: "Monitor", color: "text-blue-500", gradient: "from-blue-500 to-cyan-500" } }));
    else if(type === 'team') setForms(p => ({ ...p, team: item ? { ...item, id: item._id, skills: item.skills || [] } : { id: null, name: "", role: "", image: "", desc: "", skills: [] } }));
    else if(type === 'pricing') setForms(p => ({ ...p, pricing: item ? { ...item, id: item._id, features: item.features.join(','), missing: item.missing.join(','), popular: item.popular, gradient: item.gradient || "from-gray-500 to-gray-700" } : { id: null, name: "", desc: "", priceMonthly: "", priceYearly: "", features: "", missing: "", popular: false, gradient: "from-gray-500 to-gray-700" } }));
    else if(type === 'blog') setForms(p => ({ ...p, blog: item ? { ...item, id: item._id } : { id: null, link: "", title: "", desc: "", image: "", category: "", platform: "other" } }));
    else if(type === 'review') setForms(p => ({ ...p, review: item ? { ...item, id: item._id } : { id: null, name: "", role: "", text: "", rating: 5, image: "" } }));

    setIsModalOpen(true);
  };

  const handleAddNew = () => { const type = getTypeFromTab(activeTab); if(type) openModal(type); };
  const handleEditItem = (item) => { const type = getTypeFromTab(activeTab); if(type) openModal(type, item); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const apiMap = { project: 'projects', service: 'services', blog: 'blogs', team: 'team', pricing: 'pricing', review: 'reviews', clientProject: 'client-projects' };
    let api = apiMap[modalType];
    let currentForm = forms[modalType];
    let body = { ...currentForm };
    if (modalType === 'project') body.tech = currentForm.tech.split(',').map(t => t.trim());
    if (modalType === 'pricing') { 
        body.features = currentForm.features.split(',').map(s=>s.trim()).filter(Boolean); 
        body.missing = currentForm.missing.split(',').map(s=>s.trim()).filter(Boolean); 
    }

    try {
        const res = await fetch(`/api/${api}`, { method: body.id ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
        if(res.ok) { setIsModalOpen(false); fetchAllData(); showToast("Saved Successfully!"); } 
        else { showToast("Server Error", "error"); }
    } catch(e) { showToast("Operation Failed", "error"); }
    setLoading(false);
  };

  const handleAdminFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
        const formData = new FormData();
        formData.append("file", file);

        const uploadRes = await fetch("/api/upload", {
            method: "POST",
            body: formData
        });
        const uploadData = await uploadRes.json();

        if (uploadRes.ok) {
            const newDoc = {
                name: file.name,
                url: uploadData.url,
                uploadedBy: "Admin",
                date: new Date().toLocaleDateString()
            };

            setForms(p => ({
                ...p,
                clientProject: {
                    ...p.clientProject,
                    documents: [newDoc, ...p.clientProject.documents]
                }
            }));
            showToast("File Ready (Click Save to Confirm)");
        } else {
            showToast("Upload Failed", "error");
        }
    } catch (error) {
        showToast("Network Error", "error");
    }
    setUploading(false);
  };

  const addProjectUpdate = () => {
    const newUpdate = { title: "New Update", desc: "Description here", date: new Date().toLocaleDateString() };
    setForms(prev => ({ ...prev, clientProject: { ...prev.clientProject, updates: [newUpdate, ...prev.clientProject.updates] } }));
  };

  const addProjectLink = () => {
    const newLink = { title: "New Resource", url: "https://" };
    setForms(prev => ({ ...prev, clientProject: { ...prev.clientProject, links: [...prev.clientProject.links, newLink] } }));
  };

  if (isCheckingSession) return (
    <div className="h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-800 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-100/40 via-slate-50 to-slate-50 pointer-events-none"></div>
        <div className="relative z-10 text-center space-y-6">
            <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full animate-ping"></div>
                <div className="absolute inset-0 border-t-4 border-indigo-600 rounded-full animate-spin"></div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-lg font-bold text-white shadow-lg shadow-indigo-500/30">DS</div>
            </div>
            <div>
                <h2 className="text-xl font-bold tracking-wide">Securing mainframe...</h2>
                <p className="text-slate-450 text-xs mt-1 animate-pulse">Decrypting secure session credentials</p>
            </div>
        </div>
    </div>
  );

  if (!isAuthenticated) return (
    <div className="h-screen flex items-center justify-center bg-slate-50 text-slate-800 overflow-hidden cursor-default selection:bg-indigo-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-100/40 via-slate-50 to-slate-50 pointer-events-none"></div>
        <div className="w-full max-w-sm p-8 z-10 bg-white border border-slate-200/80 rounded-3xl backdrop-blur-xl shadow-2xl relative m-4">
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-indigo-650/30">DS</div>
                <h1 className="text-3xl font-black mb-2 text-slate-900">Welcome Back</h1>
                <p className="text-slate-500 text-sm font-semibold">Enter your master key to access the dashboard.</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-5">
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-center tracking-[0.5em] focus:border-indigo-600 focus:bg-white transition-all outline-none text-lg font-bold text-slate-900" placeholder="••••••••" autoFocus />
                <button className="w-full bg-slate-950 text-white hover:bg-slate-800 font-bold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2">Access Dashboard <ChevronRight size={16}/></button>
            </form>
        </div>
        <AnimatePresence>{toast && <Toast {...toast} onClose={() => setToast(null)} />}</AnimatePresence>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-50 text-slate-800 font-sans overflow-hidden cursor-default selection:bg-indigo-500/20 relative">
        <AnimatePresence>{toast && <Toast {...toast} onClose={() => setToast(null)} />}</AnimatePresence>
        <AnimatePresence>{isSidebarOpen && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-45 md:hidden" />)}</AnimatePresence>

        {/* Sidebar Panel */}
        <aside className={`fixed md:relative z-50 w-72 h-full bg-white border-r border-slate-200/85 flex flex-col transition-transform duration-305 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
            <div className="p-6 border-b border-slate-200/60 flex justify-between items-center"><div className="flex items-center gap-3 font-bold text-xl tracking-tight"><div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-xs text-white shadow-indigo-500/50 shadow-md font-bold">DS</div><span className="text-slate-900">DEVSAMP<span className="text-indigo-600 text-xs align-top ml-1 font-bold">ADMIN</span></span></div><button onClick={() => setSidebarOpen(false)} className="md:hidden text-slate-500"><X size={20}/></button></div>
            <div className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar select-none">
                <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 mt-2">Overview</p>
                <NavItem icon={LayoutDashboard} label="Dashboard" id="dashboard" active={activeTab} set={(id) => { setActiveTab(id); setSidebarOpen(false); }} />
                <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 mt-6">CRM</p>
                <NavItem icon={Users} label="Inquiries (Leads)" id="leads" active={activeTab} set={(id) => { setActiveTab(id); setSidebarOpen(false); }} badge={data.leads.filter(l=>l.status==='New').length} />
                <NavItem icon={FolderKanban} label="Client Projects" id="client-projects" active={activeTab} set={(id) => { setActiveTab(id); setSidebarOpen(false); }} /> 
                <NavItem icon={CalendarIcon} label="Project Calendar" id="calendar" active={activeTab} set={(id) => { setActiveTab(id); setSidebarOpen(false); }} /> 
                <NavItem icon={MessageCircle} label="Testimonials" id="reviews" active={activeTab} set={(id) => { setActiveTab(id); setSidebarOpen(false); }} />
                <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 mt-6">CMS</p>
                <NavItem icon={ExternalLink} label="Projects (Portfolio)" id="projects" active={activeTab} set={(id) => { setActiveTab(id); setSidebarOpen(false); }} />
                <NavItem icon={Briefcase} label="Our Team" id="team" active={activeTab} set={(id) => { setActiveTab(id); setSidebarOpen(false); }} />
                <NavItem icon={Layers} label="Services" id="services" active={activeTab} set={(id) => { setActiveTab(id); setSidebarOpen(false); }} />
                <NavItem icon={CreditCard} label="Pricing Plans" id="pricing" active={activeTab} set={(id) => { setActiveTab(id); setSidebarOpen(false); }} />
                <NavItem icon={Rss} label="Blogs & News" id="blogs" active={activeTab} set={(id) => { setActiveTab(id); setSidebarOpen(false); }} />
            </div>
            <div className="p-4 border-t border-slate-200/60"><button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all font-bold text-sm"><LogOut size={18} /> Sign Out</button></div>
        </aside>

        {/* Content Box */}
        <main className="flex-1 flex flex-col h-full overflow-hidden relative">
            <header className="h-16 border-b border-slate-200/60 flex items-center justify-between px-4 md:px-6 bg-white/80 backdrop-blur-xl z-20">
                <div className="flex items-center gap-3 md:gap-4"><button onClick={() => setSidebarOpen(true)} className="md:hidden text-slate-550 p-1"><Menu size={24}/></button><h2 className="text-base md:text-lg font-black text-slate-900 capitalize flex items-center gap-2 truncate">{activeTab.replace('-', ' ')} <span className="text-slate-400 font-semibold text-sm hidden sm:inline">/ Management</span></h2></div>
                <div className="flex items-center gap-3 md:gap-4"><button onClick={fetchAllData} className={`p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-all ${loading && "animate-spin text-indigo-600"}`} title="Refresh Data"><Loader2 size={18}/></button><div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center text-xs font-bold shadow-sm">A</div></div>
            </header>

            <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar relative">
                
                {activeTab === 'dashboard' && (
                    <div className="space-y-6 md:space-y-8 animate-fade-in max-w-7xl mx-auto pb-20 md:pb-0">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <StatCard title="Total Leads" value={data.leads.length} icon={Users} color="blue" trend="+12%" onClick={() => setActiveTab('leads')} />
                            <StatCard title="Active Clients" value={data.clientProjects.length} icon={FolderKanban} color="green" onClick={() => setActiveTab('client-projects')} />
                            <StatCard title="Services" value={data.services.length} icon={Layers} color="pink" onClick={() => setActiveTab('services')} />
                            <StatCard title="Blogs Posted" value={data.blogs.length} icon={Rss} color="orange" onClick={() => setActiveTab('blogs')} />
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <LineChart data={lineChartData.data} labels={lineChartData.labels} expanded={expandedChart === 'line'} onToggleExpand={() => setExpandedChart(expandedChart === 'line' ? null : 'line')} timeRange={leadsTimeRange} setTimeRange={setLeadsTimeRange} color="blue" />
                            <BarChart data={barChartData.data} labels={barChartData.labels} expanded={expandedChart === 'bar'} onToggleExpand={() => setExpandedChart(expandedChart === 'bar' ? null : 'bar')} color="purple" />
                        </div>
                    </div>
                )}

                {activeTab === 'leads' && (
                    <div className="space-y-4 max-w-7xl mx-auto animate-fade-in pb-20 md:pb-0">
                        <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[800px] md:min-w-0">
                                    <thead><tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200/60 font-bold"><th className="p-5 font-bold">Client Info</th><th className="p-5 font-bold">Interest</th><th className="p-5 font-bold">Date</th><th className="p-5 font-bold">Status</th><th className="p-5 font-bold text-right">Actions</th></tr></thead>
                                    <tbody className="text-sm text-slate-700 divide-y divide-slate-100">
                                        {paginatedData.map((lead) => (
                                            <tr key={lead._id} className="hover:bg-slate-50/50 transition-colors group">
                                                <td className="p-5"><div className="font-bold text-slate-800 text-base">{lead.name}</div><div className="text-xs text-slate-450 flex items-center gap-1 mt-1 font-semibold"><Mail size={10}/> {lead.email}</div></td>
                                                <td className="p-5"><span className="bg-blue-50 text-blue-600 border border-blue-150 px-2.5 py-1 rounded-lg text-xs font-bold">{lead.service}</span></td>
                                                <td className="p-5 text-xs text-slate-500 font-mono font-bold">{new Date(lead.createdAt).toLocaleDateString()}</td>
                                                <td className="p-5">
                                                    <select value={lead.status} onChange={(e) => handleUpdateStatus(lead._id, e.target.value)} className={`appearance-none pl-3 pr-8 py-1.5 rounded-lg text-xs font-bold outline-none cursor-pointer border transition-all ${lead.status === 'New' ? 'bg-blue-50 text-blue-600 border-blue-150' : lead.status === 'Closed' ? 'bg-green-50 text-green-600 border-green-150' : 'bg-yellow-50 text-yellow-600 border-yellow-150'}`}>
                                                        <option className="bg-white" value="New">New</option><option className="bg-white" value="Contacted">Contacted</option><option className="bg-white" value="Closed">Closed</option>
                                                    </select>
                                                </td>
                                                <td className="p-5 text-right"><div className="flex justify-end gap-2 opacity-100 md:opacity-60 md:group-hover:opacity-100 transition-opacity"><button onClick={() => setViewLead(lead)} className="p-2 bg-slate-50 hover:bg-slate-100 rounded-lg text-blue-600 transition-colors border border-slate-200" title="View Details"><Eye size={14}/></button><button onClick={() => handleDelete('contact', lead._id)} className="p-2 bg-slate-50 hover:bg-red-50 text-red-500 rounded-lg transition-colors border border-slate-200" title="Delete"><Trash2 size={14}/></button></div></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="p-4 border-t border-slate-200 bg-white"><Pagination total={filteredData.length} perPage={itemsPerPage} current={currentPage} onChange={setCurrentPage} /></div>
                        </div>
                    </div>
                )}

                {activeTab === 'client-projects' && (
                    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto pb-20 md:pb-0">
                        <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
                            <h3 className="text-lg font-black text-slate-800 flex items-center gap-2"><FolderKanban className="text-indigo-600"/> Manage Client Projects</h3>
                            <button onClick={handleAddNew} className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-sm"><Plus size={14}/> New Project</button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {paginatedData.map((project) => (
                                <div key={project._id} onClick={() => handleEditItem(project)} className="bg-white border border-slate-200/80 rounded-2xl p-6 cursor-pointer hover:border-indigo-500/50 hover:bg-slate-50/30 transition-all group relative shadow-sm hover:shadow-md">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><Briefcase size={20}/></div>
                                        <div className={`text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${project.status === 'Active' ? 'bg-green-50 text-green-700 border border-green-150' : 'bg-slate-100 text-slate-500 border border-slate-200'}`}>{project.status}</div>
                                    </div>
                                    <h4 className="text-lg font-extrabold text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors">{project.title}</h4>
                                    <p className="text-xs text-slate-450 font-semibold mb-6">{project.clientEmail}</p>
                                    
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs text-slate-500 font-bold">
                                            <span>Progress</span>
                                            <span className="font-mono">{project.progress}%</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" style={{ width: `${project.progress}%` }}></div>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-6 pt-4 border-t border-slate-150 flex justify-between text-xs text-slate-450 font-semibold">
                                        <span className="flex items-center gap-1"><Clock size={12}/> {project.nextMilestone}</span>
                                        <span>Due: {project.dueDate}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {paginatedData.length === 0 && <div className="text-center text-slate-500 py-10 font-bold text-sm">No active client projects. Create one!</div>}
                    </div>
                )}

                {/* --- CALENDAR TAB --- */}
                {activeTab === 'calendar' && (
                    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto pb-20 md:pb-0">
                        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-black text-slate-805 flex items-center gap-2">
                                    <CalendarIcon className="text-indigo-600" /> Project Deadlines
                                </h3>
                                <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1 border border-slate-200/40 select-none">
                                    <button onClick={() => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1))} className="p-1.5 hover:bg-white rounded-md text-slate-500 hover:text-slate-800 transition-colors"><ChevronLeft size={16}/></button>
                                    <span className="text-xs font-bold text-slate-850 px-2 min-w-[120px] text-center uppercase tracking-wider">{calendarDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                                    <button onClick={() => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1))} className="p-1.5 hover:bg-white rounded-md text-slate-500 hover:text-slate-800 transition-colors"><ChevronRight size={16}/></button>
                                </div>
                            </div>

                            <div className="grid grid-cols-7 gap-1 md:gap-2">
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                                    <div key={d} className="text-center text-[10px] font-bold text-slate-400 uppercase py-2">{d}</div>
                                ))}
                                {(() => {
                                    const year = calendarDate.getFullYear();
                                    const month = calendarDate.getMonth();
                                    const daysInMonth = new Date(year, month + 1, 0).getDate();
                                    const firstDay = new Date(year, month, 1).getDay();
                                    const days = [];

                                    for (let i = 0; i < firstDay; i++) {
                                        days.push(<div key={`empty-${i}`} className="h-16 md:h-24 bg-transparent border border-slate-100 opacity-10 rounded-lg"></div>);
                                    }

                                    for (let d = 1; d <= daysInMonth; d++) {
                                        const dueProjects = data.clientProjects.filter(p => {
                                            const pDate = new Date(p.dueDate);
                                            return !isNaN(pDate) && pDate.getDate() === d && pDate.getMonth() === month && pDate.getFullYear() === year;
                                        });

                                        const isToday = new Date().getDate() === d && new Date().getMonth() === month && new Date().getFullYear() === year;

                                        days.push(
                                            <div key={d} className={`h-16 md:h-24 bg-slate-50/50 border ${isToday ? 'border-indigo-650 bg-indigo-50/20' : 'border-slate-100'} rounded-lg p-2 flex flex-col hover:bg-slate-100/50 transition-colors group relative overflow-hidden`}>
                                                <span className={`text-[10px] font-bold mb-1 ${isToday ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-800'}`}>{d}</span>
                                                <div className="flex-1 flex flex-col gap-1 overflow-y-auto custom-scrollbar">
                                                    {dueProjects.map(p => (
                                                        <div key={p._id} className="text-[8px] bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded truncate border border-indigo-100 cursor-pointer hover:bg-indigo-650 hover:text-white transition-colors font-bold" onClick={() => handleEditItem(p)} title={p.title}>
                                                            {p.title}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    }
                                    return days;
                                })()}
                            </div>
                        </div>
                    </div>
                )}

                {['services', 'team', 'projects', 'pricing', 'reviews', 'blogs'].includes(activeTab) && (
                    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto pb-20 md:pb-0">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="relative w-full md:w-80">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold text-slate-800 focus:border-indigo-500 outline-none" placeholder={`Search ${activeTab}...`} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                            </div>
                            {activeTab !== 'reviews' && (
                                <button onClick={handleAddNew} className="bg-slate-950 text-white px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-slate-800 transition-colors shadow-sm w-full md:w-auto justify-center uppercase tracking-wider">
                                    <Plus size={14} /> Add {getTypeFromTab(activeTab)}
                                </button>
                            )}
                        </div>

                        {activeTab === 'pricing' && (
                            <div className="bg-white border border-slate-200/80 p-6 rounded-3xl shadow-sm mb-6 max-w-4xl">
                                <h3 className="text-base font-extrabold text-slate-805 mb-2 flex items-center gap-2">
                                    <CreditCard size={18} className="text-indigo-600"/>
                                    <span>Interactive Quote Calculator Configurator</span>
                                </h3>
                                <p className="text-[11px] text-slate-500 font-semibold mb-6">
                                    Manage the coefficients and additional modules driving the homepage scope evaluator tool.
                                </p>
                                
                                <form onSubmit={handleSaveCalcSettings} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] text-slate-400 font-bold uppercase ml-1">Base Price ($)</label>
                                            <input 
                                              type="number" 
                                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs font-bold outline-none focus:bg-white focus:border-indigo-500" 
                                              value={calcSettings.basePrice} 
                                              onChange={e => setCalcSettings(p => ({ ...p, basePrice: Number(e.target.value) }))} 
                                              required 
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] text-slate-400 font-bold uppercase ml-1">Price Per Page ($)</label>
                                            <input 
                                              type="number" 
                                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs font-bold outline-none focus:bg-white focus:border-indigo-500" 
                                              value={calcSettings.pricePerPage} 
                                              onChange={e => setCalcSettings(p => ({ ...p, pricePerPage: Number(e.target.value) }))} 
                                              required 
                                            />
                                        </div>
                                    </div>

                                    {/* Addons Manager */}
                                    <div className="space-y-3 bg-slate-50/50 p-4 rounded-2xl border border-slate-200">
                                        <div className="flex justify-between items-center select-none">
                                            <h4 className="text-xs font-bold text-slate-700">Calculator Addon Checkboxes</h4>
                                            <button 
                                              type="button" 
                                              onClick={() => {
                                                const newAddons = [...(calcSettings.addons || []), { name: "New Addon Module", price: 100, enabled: true }];
                                                setCalcSettings(p => ({ ...p, addons: newAddons }));
                                              }} 
                                              className="text-[9px] bg-indigo-600 px-2.5 py-1.5 rounded-lg text-white hover:bg-indigo-700 font-bold uppercase"
                                            >
                                                Add Addon
                                            </button>
                                        </div>
                                        <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                                            {(calcSettings.addons || []).map((addon, idx) => (
                                                <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 space-y-2.5 shadow-sm">
                                                    <div className="flex gap-2 items-center">
                                                        <input 
                                                          className="bg-slate-50 border border-slate-200 rounded px-2 py-1.5 text-xs font-semibold text-slate-800 w-full outline-none focus:bg-white focus:border-indigo-500" 
                                                          placeholder="Addon Module Name" 
                                                          value={addon.name} 
                                                          onChange={(e) => {
                                                            const newAddons = [...calcSettings.addons];
                                                            newAddons[idx].name = e.target.value;
                                                            setCalcSettings(p => ({ ...p, addons: newAddons }));
                                                          }}
                                                        />
                                                        <input 
                                                          type="number"
                                                          className="bg-slate-50 border border-slate-200 rounded px-2 py-1.5 text-xs font-mono text-slate-650 w-24 outline-none focus:bg-white focus:border-indigo-500" 
                                                          placeholder="Price ($)" 
                                                          value={addon.price} 
                                                          onChange={(e) => {
                                                            const newAddons = [...calcSettings.addons];
                                                            newAddons[idx].price = Number(e.target.value);
                                                            setCalcSettings(p => ({ ...p, addons: newAddons }));
                                                          }}
                                                        />
                                                        <button 
                                                          type="button" 
                                                          onClick={() => {
                                                            const newAddons = [...calcSettings.addons];
                                                            newAddons[idx].enabled = !newAddons[idx].enabled;
                                                            setCalcSettings(p => ({ ...p, addons: newAddons }));
                                                          }}
                                                          className={`px-2.5 py-1.5 text-[9px] font-bold rounded border uppercase transition-all shrink-0 ${
                                                            addon.enabled 
                                                              ? "bg-green-50 text-green-700 border-green-200" 
                                                              : "bg-slate-150 text-slate-500 border-slate-300"
                                                          }`}
                                                        >
                                                            {addon.enabled ? "Enabled" : "Disabled"}
                                                        </button>
                                                        <button 
                                                          type="button" 
                                                          onClick={() => {
                                                            const newAddons = calcSettings.addons.filter((_, i) => i !== idx);
                                                            setCalcSettings(p => ({ ...p, addons: newAddons }));
                                                          }} 
                                                          className="text-red-500 hover:text-red-650 shrink-0"
                                                        >
                                                            <X size={14}/>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <button 
                                      type="submit" 
                                      disabled={calcLoading} 
                                      className="w-full bg-slate-950 hover:bg-slate-800 text-white font-bold py-3 rounded-xl transition-all shadow-md flex justify-center items-center gap-2 text-xs uppercase tracking-wider"
                                    >
                                        {calcLoading ? <Loader2 className="animate-spin" size={12} /> : <Save size={12} />}
                                        <span>Save Calculator Configuration</span>
                                    </button>
                                </form>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {paginatedData.map((item) => (
                                <div key={item._id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden group hover:border-slate-350 transition-all flex flex-col relative shadow-sm hover:shadow-md">
                                    {(item.image || activeTab === 'blogs' || activeTab === 'projects') && (
                                        <div className="h-48 bg-slate-100 relative overflow-hidden border-b border-slate-200/60">
                                            {item.image ? (
                                                <img src={getGoogleDriveImage(item.image)} alt={item.title || item.name} className="w-full h-full object-cover group-hover:scale-103 transition-all duration-500" referrerPolicy="no-referrer" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-400"><ImageIcon size={32}/></div>
                                            )}
                                            <div className="absolute top-3 right-3 flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all md:translate-y-2 md:group-hover:translate-y-0 z-10">
                                                <button onClick={() => handleEditItem(item)} className="p-2 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-indigo-600 hover:text-white transition-colors shadow-sm"><PenBox size={13}/></button>
                                                <button onClick={() => handleDelete(activeTab === 'team' ? 'team' : activeTab, item._id)} className="p-2 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-red-600 hover:text-white transition-colors shadow-sm"><Trash2 size={13}/></button>
                                            </div>
                                        </div>
                                    )}
                                    <div className="p-5 flex-1 flex flex-col">
                                        <div className="flex gap-2 mb-3">
                                            {item.category && <span className="text-[9px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded uppercase tracking-wider">{item.category}</span>}
                                            {item.role && <span className="text-[9px] font-bold text-purple-700 bg-purple-50 border border-purple-100 px-2 py-0.5 rounded uppercase tracking-wider">{item.role}</span>}
                                            {item.popular && <span className="text-[9px] font-bold text-amber-700 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded uppercase tracking-wider">Popular</span>}
                                        </div>
                                        <h4 className="font-extrabold text-base text-slate-800 mb-1 line-clamp-1">{item.title || item.name}</h4>
                                        <p className="text-xs text-slate-500 font-semibold line-clamp-2 flex-1 leading-relaxed">{item.desc || item.text || item.message}</p>
                                        {item.priceMonthly && <div className="mt-4 text-lg font-black text-slate-800 font-mono">${item.priceMonthly}<span className="text-xs font-normal text-slate-400">/mo</span></div>}
                                        {activeTab === 'services' && !item.image && (
                                            <div className="absolute top-4 right-4 p-2 bg-slate-50 rounded-lg text-slate-500 group-hover:text-slate-800 border border-slate-200"><Layers size={18}/></div>
                                        )}
                                        {activeTab === 'reviews' && (
                                            <div className="flex gap-0.5 mt-3 text-amber-400">{[...Array(item.rating || 5)].map((_,i)=><Star key={i} size={12} fill="currentColor"/>)}</div>
                                        )}
                                        {!item.image && activeTab !== 'blogs' && activeTab !== 'projects' && (
                                            <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100 justify-end">
                                                <button onClick={() => handleEditItem(item)} className="text-[10px] font-bold text-indigo-600 hover:underline uppercase tracking-wider">Edit</button>
                                                <button onClick={() => handleDelete(activeTab === 'reviews' ? 'reviews' : activeTab, item._id)} className="text-[10px] font-bold text-red-500 hover:underline uppercase tracking-wider">Delete</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {paginatedData.length === 0 && (
                            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200/80 shadow-sm select-none">
                                <div className="inline-block p-4 rounded-full bg-slate-50 mb-3 border border-slate-150"><Search size={32} className="text-slate-400"/></div>
                                <h3 className="text-base font-bold text-slate-800">No results found</h3>
                                <p className="text-xs text-slate-500 font-semibold mt-1">Try adding a new item or clear your search.</p>
                            </div>
                        )}

                        <Pagination total={filteredData.length} perPage={itemsPerPage} current={currentPage} onChange={setCurrentPage} />
                    </div>
                )}
            </div>
        </main>

        {/* View Inquiries Modal */}
        <AnimatePresence>
            {viewLead && (
                <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white border border-slate-200/80 p-8 rounded-2xl w-full max-w-lg shadow-2xl relative">
                        <button onClick={() => setViewLead(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"><X size={20}/></button>
                        <h3 className="text-2xl font-black text-slate-800 mb-1">{viewLead.name}</h3>
                        <p className="text-xs text-slate-450 font-bold mb-6 flex items-center gap-2"><Mail size={12}/> {viewLead.email}</p>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6"><label className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider mb-2 block">Message</label><p className="text-slate-700 text-xs font-semibold leading-relaxed whitespace-pre-wrap">{viewLead.message}</p></div>
                        <div className="flex gap-4"><a href={`mailto:${viewLead.email}`} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors text-xs uppercase tracking-wider"><Mail size={14}/> Reply via Email</a><button onClick={() => { setViewLead(null); handleDelete('contact', viewLead._id); }} className="px-4 border border-red-200 text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={16}/></button></div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>

        {/* CMS Edit/Add Modals */}
        <AnimatePresence>
            {isModalOpen && forms[modalType] && (
                <div className="fixed inset-0 z-[150] flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm p-4">
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className={`bg-white border border-slate-200 p-6 md:p-8 rounded-3xl w-full transition-all shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto custom-scrollbar ${['team', 'project', 'pricing', 'blog'].includes(modalType) ? "max-w-5xl" : "max-w-lg"}`}>
                        <div className="absolute top-0 right-0 p-32 bg-indigo-500/5 blur-3xl rounded-full pointer-events-none"></div>
                        <div className="flex justify-between items-center mb-6 relative z-10">
                            <h3 className="text-xl font-black text-slate-900 capitalize">{forms[modalType].id ? "Edit" : "Add New"} {modalType.replace('clientProject', 'Project')}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700 bg-slate-50 p-2 rounded-full border border-slate-200 hover:bg-slate-100 transition-all"><X size={16}/></button>
                        </div>
                        
                        <div className={`grid grid-cols-1 ${['team', 'project', 'pricing', 'blog'].includes(modalType) ? "lg:grid-cols-2" : ""} gap-8`}>
                            {/* Form Column */}
                            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                            
                            {modalType === 'clientProject' && (
                                <div className="space-y-5">
                                    <FormInput label="Project Title" value={forms.clientProject.title} onChange={e=>setForms(p=>({...p, clientProject:{...p.clientProject, title:e.target.value}}))} />
                                    <FormInput label="Client Email (Must Match User Login)" value={forms.clientProject.clientEmail} onChange={e=>setForms(p=>({...p, clientProject:{...p.clientProject, clientEmail:e.target.value}}))} />
                                    <FormTextarea label="Project Description / Brief" value={forms.clientProject.description} onChange={e=>setForms(p=>({...p, clientProject:{...p.clientProject, description:e.target.value}}))} />

                                    <div className="flex gap-4">
                                        <div className="flex-1 space-y-1">
                                            <label className="text-xs text-slate-450 font-bold uppercase ml-1">Status</label>
                                            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs font-bold outline-none" value={forms.clientProject.status} onChange={e=>setForms(p=>({...p, clientProject:{...p.clientProject, status:e.target.value}}))}>
                                                <option value="Active">Active</option>
                                                <option value="Pending">Pending</option>
                                                <option value="Completed">Completed</option>
                                            </select>
                                        </div>
                                        <FormInput label="Due Date" value={forms.clientProject.dueDate} onChange={e=>setForms(p=>({...p, clientProject:{...p.clientProject, dueDate:e.target.value}}))} placeholder="YYYY-MM-DD" />
                                    </div>

                                    <div className="flex gap-4">
                                        <FormInput label="Budget (Optional)" value={forms.clientProject.budget} onChange={e=>setForms(p=>({...p, clientProject:{...p.clientProject, budget:e.target.value}}))} placeholder="$5000" />
                                        <div className="flex-1 space-y-1">
                                            <label className="text-xs text-slate-450 font-bold uppercase ml-1">Payment Status</label>
                                            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs font-bold outline-none" value={forms.clientProject.paymentStatus} onChange={e=>setForms(p=>({...p, clientProject:{...p.clientProject, paymentStatus:e.target.value}}))}>
                                                <option value="Pending">Pending</option>
                                                <option value="Partial">Partial Paid</option>
                                                <option value="Paid">Fully Paid</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                         <label className="text-xs text-slate-500 font-bold uppercase ml-1">Progress: {forms.clientProject.progress}%</label>
                                         <input type="range" min="0" max="100" value={forms.clientProject.progress} onChange={e=>setForms(p=>({...p, clientProject:{...p.clientProject, progress:Number(e.target.value)}}))} className="w-full accent-indigo-600 h-1.5 bg-slate-100 rounded-full appearance-none cursor-pointer" />
                                     </div>

                                    <div className="space-y-3 bg-slate-50/50 p-4 rounded-2xl border border-slate-200">
                                        <div className="flex justify-between items-center">
                                            <h4 className="text-xs font-bold text-slate-700 flex items-center gap-2"><LinkIcon size={12}/> Resources & Links</h4>
                                            <button type="button" onClick={addProjectLink} className="text-[9px] bg-indigo-600 px-2 py-1 rounded text-white hover:bg-indigo-700 font-bold uppercase">Add Link</button>
                                        </div>
                                        {forms.clientProject.links.length === 0 && <p className="text-[10px] text-slate-400 italic">No resources added.</p>}
                                        {forms.clientProject.links.map((link, i) => (
                                            <div key={i} className="flex gap-2 items-center">
                                                <input className="bg-white rounded px-2 py-1.5 text-xs text-slate-800 border border-slate-250 flex-1 outline-none focus:border-indigo-500" placeholder="Title (e.g. Figma)" value={link.title} onChange={(e) => {
                                                    const newLinks = [...forms.clientProject.links];
                                                    newLinks[i].title = e.target.value;
                                                    setForms(p => ({...p, clientProject:{...p.clientProject, links: newLinks}}));
                                                }} />
                                                <input className="bg-white rounded px-2 py-1.5 text-xs text-indigo-600 border border-slate-250 flex-[2] outline-none focus:border-indigo-500" placeholder="URL (https://...)" value={link.url} onChange={(e) => {
                                                    const newLinks = [...forms.clientProject.links];
                                                    newLinks[i].url = e.target.value;
                                                    setForms(p => ({...p, clientProject:{...p.clientProject, links: newLinks}}));
                                                }} />
                                                <button type="button" onClick={() => {
                                                    const newLinks = forms.clientProject.links.filter((_, idx) => idx !== i);
                                                    setForms(p => ({...p, clientProject:{...p.clientProject, links: newLinks}}));
                                                }} className="text-red-500"><X size={14}/></button>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-3 bg-slate-50/50 p-4 rounded-2xl border border-slate-200">
                                        <div className="flex justify-between items-center">
                                            <h4 className="text-xs font-bold text-slate-700 flex items-center gap-2"><File size={12}/> Project Documents</h4>
                                            <label className="text-[9px] bg-purple-650 px-2 py-1 rounded text-white hover:bg-purple-700 cursor-pointer flex items-center gap-1 font-bold uppercase">
                                                {uploading ? <Loader2 className="animate-spin" size={10}/> : <UploadCloud size={10}/>} Upload
                                                <input type="file" className="hidden" onChange={handleAdminFileUpload} disabled={uploading} />
                                            </label>
                                        </div>
                                        {forms.clientProject.documents.length === 0 && <p className="text-[10px] text-slate-400 italic">No documents uploaded.</p>}
                                        <div className="space-y-2">
                                            {forms.clientProject.documents.map((doc, i) => (
                                                <div key={i} className="flex justify-between items-center bg-white p-2 rounded-lg border border-slate-200 shadow-sm">
                                                    <div className="flex items-center gap-2 overflow-hidden">
                                                        <File size={12} className="text-slate-400 shrink-0"/>
                                                        <span className="text-xs text-slate-700 truncate max-w-[150px] font-semibold">{doc.name}</span>
                                                        <span className="text-[8px] text-slate-400 font-bold uppercase border border-slate-200 px-1 rounded">{doc.uploadedBy}</span>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <a href={doc.url} target="_blank" className="text-indigo-600 hover:underline"><ExternalLink size={12}/></a>
                                                        <button type="button" onClick={() => {
                                                            const newDocs = forms.clientProject.documents.filter((_, idx) => idx !== i);
                                                            setForms(p => ({...p, clientProject:{...p.clientProject, documents: newDocs}}));
                                                        }} className="text-red-500 hover:text-red-655"><Trash2 size={12}/></button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-3 bg-slate-50/50 p-4 rounded-2xl border border-slate-200">
                                        <h4 className="text-xs font-bold text-slate-700 flex items-center gap-2"><Layers size={12}/> Stages</h4>
                                        {forms.clientProject.stages.map((stage, i) => (
                                            <div key={i} className="flex gap-2 items-center">
                                                <span className="text-xs text-slate-400 w-6 font-bold">{i+1}.</span>
                                                <input className="bg-transparent border-b border-slate-200 text-xs text-slate-800 w-full focus:border-indigo-500 outline-none pb-1 font-semibold" value={stage.title} onChange={(e) => {
                                                    const newStages = [...forms.clientProject.stages];
                                                    newStages[i].title = e.target.value;
                                                    setForms(p => ({...p, clientProject:{...p.clientProject, stages: newStages}}));
                                                }} />
                                                <select className="bg-slate-100 text-[9px] font-bold rounded px-1.5 py-1 text-slate-650 outline-none border border-slate-200" value={stage.status} onChange={(e) => {
                                                    const newStages = [...forms.clientProject.stages];
                                                    newStages[i].status = e.target.value;
                                                    setForms(p => ({...p, clientProject:{...p.clientProject, stages: newStages}}));
                                                }}>
                                                    <option value="pending">Pending</option>
                                                    <option value="completed">Done</option>
                                                </select>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-3 bg-slate-50/50 p-4 rounded-2xl border border-slate-200">
                                        <div className="flex justify-between items-center">
                                            <h4 className="text-xs font-bold text-slate-700 flex items-center gap-2"><Rss size={12}/> Recent Updates</h4>
                                            <button type="button" onClick={addProjectUpdate} className="text-[9px] bg-indigo-600 px-2 py-1 rounded text-white hover:bg-indigo-700 font-bold uppercase">Add Update</button>
                                        </div>
                                        {forms.clientProject.updates.length === 0 && <p className="text-[10px] text-slate-400 italic">No updates added.</p>}
                                        {forms.clientProject.updates.map((update, i) => (
                                            <div key={i} className="bg-white p-3 rounded-xl border border-slate-200 space-y-2 shadow-sm">
                                                <input className="w-full bg-transparent text-xs font-bold text-slate-800 outline-none border-b border-slate-100 pb-1" placeholder="Update Title" value={update.title} onChange={(e) => {
                                                    const newUpdates = [...forms.clientProject.updates];
                                                    newUpdates[i].title = e.target.value;
                                                    setForms(p => ({...p, clientProject:{...p.clientProject, updates: newUpdates}}));
                                                }}/>
                                                <textarea className="w-full bg-transparent text-[10px] text-slate-500 outline-none resize-none font-semibold" placeholder="Description..." value={update.desc} onChange={(e) => {
                                                    const newUpdates = [...forms.clientProject.updates];
                                                    newUpdates[i].desc = e.target.value;
                                                    setForms(p => ({...p, clientProject:{...p.clientProject, updates: newUpdates}}));
                                                }}/>
                                                <button type="button" onClick={() => {
                                                    const newUpdates = forms.clientProject.updates.filter((_, idx) => idx !== i);
                                                    setForms(p => ({...p, clientProject:{...p.clientProject, updates: newUpdates}}));
                                                }} className="text-[9px] text-red-500 hover:underline font-bold uppercase">Remove</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {modalType === 'blog' && (
                                <div className="space-y-4">
                                    <div className="flex gap-2 p-3 bg-indigo-50 rounded-xl border border-indigo-100">
                                        <div className="flex-1">
                                            <label className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider ml-1 mb-1 block">Magic Autocomplete</label>
                                            <input className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-xs font-semibold outline-none focus:border-indigo-500 placeholder:text-slate-400" placeholder="Paste YouTube or Instagram link..." value={forms.blog.link} onChange={e=>setForms(p=>({...p, blog:{...p.blog, link:e.target.value}}))} />
                                        </div>
                                        <button type="button" onClick={handleExtractMeta} disabled={extracting} className="mt-5 px-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all flex items-center justify-center">
                                            {extracting ? <Loader2 className="animate-spin" size={16} /> : <Wand2 size={16} />}
                                        </button>
                                    </div>
                                    <FormInput label="Title" value={forms.blog.title} onChange={e=>setForms(p=>({...p, blog:{...p.blog, title:e.target.value}}))} />
                                    <FormInput label="Image URL" value={forms.blog.image} onChange={e=>setForms(p=>({...p, blog:{...p.blog, image:e.target.value}}))} preview />
                                    <FormTextarea label="Description" value={forms.blog.desc} onChange={e=>setForms(p=>({...p, blog:{...p.blog, desc:e.target.value}}))} />
                                </div>
                            )}

                            {modalType === 'project' && (
                                <>
                                    <FormInput label="Project Title" value={forms.project.title} onChange={e=>setForms(p=>({...p, project:{...p.project, title:e.target.value}}))} />
                                    <div className="flex gap-4">
                                        <FormInput label="Category" value={forms.project.category} onChange={e=>setForms(p=>({...p, project:{...p.project, category:e.target.value}}))} />
                                        <FormInput label="Link" value={forms.project.link} onChange={e=>setForms(p=>({...p, project:{...p.project, link:e.target.value}}))} />
                                    </div>
                                    <FormInput label="Image URL" value={forms.project.image} onChange={e=>setForms(p=>({...p, project:{...p.project, image:e.target.value}}))} preview />
                                    <FormTextarea label="Tech Stack (comma sep)" value={forms.project.tech} onChange={e=>setForms(p=>({...p, project:{...p.project, tech:e.target.value}}))} />
                                </>
                            )}

                            {modalType === 'service' && (
                                <>
                                    <FormInput label="Service Title" value={forms.service.title} onChange={e=>setForms(p=>({...p, service:{...p.service, title:e.target.value}}))} />
                                    <FormInput label="Icon Name (Lucide)" value={forms.service.icon} onChange={e=>setForms(p=>({...p, service:{...p.service, icon:e.target.value}}))} />
                                    <FormTextarea label="Description" value={forms.service.desc} onChange={e=>setForms(p=>({...p, service:{...p.service, desc:e.target.value}}))} />
                                </>
                            )}

                            {modalType === 'team' && (
                                <div className="space-y-4">
                                    <div className="flex gap-4">
                                        <FormInput label="Name" value={forms.team.name} onChange={e=>setForms(p=>({...p, team:{...p.team, name:e.target.value}}))} />
                                        <FormInput label="Role" value={forms.team.role} onChange={e=>setForms(p=>({...p, team:{...p.team, role:e.target.value}}))} />
                                    </div>
                                    <FormInput label="Photo URL" value={forms.team.image} onChange={e=>setForms(p=>({...p, team:{...p.team, image:e.target.value}}))} preview />
                                    <FormTextarea label="Bio" value={forms.team.desc} onChange={e=>setForms(p=>({...p, team:{...p.team, desc:e.target.value}}))} />
                                    
                                    {/* Dynamic Skills Editor */}
                                    <div className="space-y-3 bg-slate-50/50 p-4 rounded-2xl border border-slate-200">
                                        <div className="flex justify-between items-center select-none">
                                            <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                                                <Save size={12}/> Team Member Skills
                                            </h4>
                                            <button 
                                              type="button" 
                                              onClick={() => {
                                                const newSkills = [...(forms.team.skills || []), { name: "Next.js & Frontend", level: 80, speed: "25ms" }];
                                                setForms(p => ({ ...p, team: { ...p.team, skills: newSkills } }));
                                              }} 
                                              className="text-[9px] bg-indigo-650 px-2 py-1 rounded text-white hover:bg-indigo-700 font-bold uppercase"
                                            >
                                                Add Skill
                                            </button>
                                        </div>
                                        {(!forms.team.skills || forms.team.skills.length === 0) && <p className="text-[10px] text-slate-400 italic">No skills defined. Falls back to role defaults.</p>}
                                        <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                                            {(forms.team.skills || []).map((skill, idx) => (
                                                <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200/80 space-y-2.5 shadow-sm">
                                                    <div className="flex gap-2 items-center">
                                                        <input 
                                                          className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs font-semibold text-slate-800 w-full outline-none focus:bg-white focus:border-indigo-500" 
                                                          placeholder="Skill Name" 
                                                          value={skill.name} 
                                                          onChange={(e) => {
                                                            const newSkills = [...forms.team.skills];
                                                            newSkills[idx].name = e.target.value;
                                                            setForms(p => ({ ...p, team: { ...p.team, skills: newSkills } }));
                                                          }}
                                                        />
                                                        <input 
                                                          className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs font-mono text-slate-650 w-24 outline-none focus:bg-white focus:border-indigo-500" 
                                                          placeholder="Speed (e.g. 12ms)" 
                                                          value={skill.speed} 
                                                          onChange={(e) => {
                                                            const newSkills = [...forms.team.skills];
                                                            newSkills[idx].speed = e.target.value;
                                                            setForms(p => ({ ...p, team: { ...p.team, skills: newSkills } }));
                                                          }}
                                                        />
                                                        <button 
                                                          type="button" 
                                                          onClick={() => {
                                                            const newSkills = forms.team.skills.filter((_, i) => i !== idx);
                                                            setForms(p => ({ ...p, team: { ...p.team, skills: newSkills } }));
                                                          }} 
                                                          className="text-red-500 hover:text-red-650 shrink-0"
                                                        >
                                                            <X size={14}/>
                                                        </button>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-[9px] font-bold text-slate-400 font-mono w-14">Lvl: {skill.level}%</span>
                                                        <input 
                                                          type="range" 
                                                          min="0" 
                                                          max="100" 
                                                          value={skill.level} 
                                                          onChange={(e) => {
                                                            const newSkills = [...forms.team.skills];
                                                            newSkills[idx].level = Number(e.target.value);
                                                            setForms(p => ({ ...p, team: { ...p.team, skills: newSkills } }));
                                                          }}
                                                          className="w-full accent-indigo-655 h-1 bg-slate-100 rounded-lg cursor-pointer" 
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {modalType === 'pricing' && (
                                <>
                                    <div className="flex items-center justify-between bg-slate-50 border border-slate-200 p-3 rounded-xl mb-2">
                                        <span className="text-sm font-bold text-slate-800">Popular Plan?</span>
                                        <button type="button" onClick={() => setForms(p => ({...p, pricing: {...p.pricing, popular: !p.pricing.popular}}))} className={`w-12 h-6 rounded-full p-1 transition-colors ${forms.pricing.popular ? 'bg-indigo-600' : 'bg-slate-350'}`}>
                                            <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${forms.pricing.popular ? 'translate-x-6' : 'translate-x-0'}`}></div>
                                        </button>
                                    </div>
                                    <div className="flex gap-2 mb-4 overflow-x-auto pb-2">{gradientOptions.map((g) => (<button key={g.name} type="button" onClick={() => setForms(p => ({...p, pricing: {...p.pricing, gradient: g.class}}))} className={`w-8 h-8 rounded-full bg-gradient-to-br ${g.class} ring-2 ring-offset-2 ring-offset-white transition-all ${forms.pricing.gradient === g.class ? 'ring-indigo-650 scale-110' : 'ring-transparent opacity-70 hover:opacity-100'}`} title={g.name} />))}</div>
                                    <FormInput label="Plan Name" value={forms.pricing.name} onChange={e=>setForms(p=>({...p, pricing:{...p.pricing, name:e.target.value}}))} />
                                    <FormTextarea label="Short Description" value={forms.pricing.desc} onChange={e=>setForms(p=>({...p, pricing:{...p.pricing, desc:e.target.value}}))} />
                                    <div className="flex gap-4">
                                        <FormInput label="Monthly Price ($)" value={forms.pricing.priceMonthly} onChange={e=>setForms(p=>({...p, pricing:{...p.pricing, priceMonthly:e.target.value}}))} />
                                        <FormInput label="Yearly Price ($)" value={forms.pricing.priceYearly} onChange={e=>setForms(p=>({...p, pricing:{...p.pricing, priceYearly:e.target.value}}))} />
                                    </div>
                                    <FormTextarea label="Features (Comma separated)" value={forms.pricing.features} onChange={e=>setForms(p=>({...p, pricing:{...p.pricing, features:e.target.value}}))} />
                                    <FormTextarea label="Missing Features (Comma separated)" value={forms.pricing.missing} onChange={e=>setForms(p=>({...p, pricing:{...p.pricing, missing:e.target.value}}))} />
                                </>
                            )}

                            {modalType === 'review' && (
                                <>
                                    <div className="flex gap-4">
                                        <FormInput label="Client Name" value={forms.review.name} onChange={e=>setForms(p=>({...p, review:{...p.review, name:e.target.value}}))} />
                                        <FormInput label="Role/Designation" value={forms.review.role} onChange={e=>setForms(p=>({...p, review:{...p.review, role:e.target.value}}))} />
                                    </div>
                                    <div className="flex gap-4">
                                         <FormInput label="Rating (1-5)" value={forms.review.rating} onChange={e=>setForms(p=>({...p, review:{...p.review, rating:e.target.value}}))} />
                                         <FormInput label="Avatar URL" value={forms.review.image} onChange={e=>setForms(p=>({...p, review:{...p.review, image:e.target.value}}))} preview />
                                    </div>
                                    <FormTextarea label="Feedback" value={forms.review.text} onChange={e=>setForms(p=>({...p, review:{...p.review, text:e.target.value}}))} />
                                </>
                            )}

                            <button disabled={loading} className="w-full bg-indigo-650 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all flex justify-center items-center gap-2 mt-6 shadow-md uppercase tracking-wider text-xs">
                                {loading ? <Loader2 className="animate-spin" /> : "Save Changes"}
                            </button>
                        </form>

                        {/* Live Preview Column */}
                        {['team', 'project', 'pricing', 'blog'].includes(modalType) && (
                            <div className="hidden lg:flex flex-col justify-start border-l border-slate-100 pl-8 space-y-4 max-h-[75vh] overflow-y-auto custom-scrollbar sticky top-0 select-none">
                                <div className="text-[10px] font-bold text-slate-450 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                                    <Eye size={12} className="text-indigo-500" />
                                    <span>Live Visual Preview</span>
                                </div>
                                <div className="border border-slate-200/80 rounded-2xl p-4 bg-slate-50/50 flex justify-center items-center overflow-hidden min-h-[350px]">
                                    {modalType === 'team' && <TeamPreviewCard member={forms.team} />}
                                    {modalType === 'project' && <ProjectPreviewCard project={forms.project} />}
                                    {modalType === 'pricing' && <PricingPreviewCard plan={forms.pricing} />}
                                    {modalType === 'blog' && <BlogPreviewCard blog={forms.blog} />}
                                </div>
                            </div>
                        )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    </div>
  );
}

const NavItem = ({ icon: Icon, label, id, active, set, badge }) => (
    <button onClick={() => set(id)} className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all text-sm font-semibold group ${active === id ? "bg-indigo-50 border border-indigo-150/40 text-indigo-700 shadow-sm" : "text-slate-500 hover:text-slate-900 hover:bg-slate-100/50"}`}>
        <Icon size={18} className={active === id ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-700"} /> 
        {label}
        {badge > 0 && (<span className="ml-auto flex items-center justify-center"><span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-indigo-400 opacity-75 mr-4"></span><span className="bg-indigo-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm relative z-10">{badge}</span></span>)}
    </button>
);

const FormInput = ({ label, value, onChange, preview, placeholder }) => (
    <div className="space-y-1 w-full">
        <label className="text-xs text-slate-400 ml-1 font-bold uppercase tracking-wider">{label}</label>
        <div className="flex gap-4">
            <input className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-xs font-semibold outline-none focus:border-indigo-500 transition-all placeholder:text-slate-400 focus:bg-white" value={value} onChange={onChange} placeholder={placeholder} required />
            {preview && value && (<div className="w-12 h-11 relative rounded-lg overflow-hidden border border-slate-200 shrink-0 bg-slate-100"><img src={getGoogleDriveImage(value)} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" /></div>)}
        </div>
    </div>
);

const FormTextarea = ({ label, value, onChange }) => (
    <div className="space-y-1 w-full">
        <label className="text-xs text-slate-400 ml-1 font-bold uppercase tracking-wider">{label}</label>
        <textarea className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-850 text-xs font-semibold outline-none focus:border-indigo-500 transition-all min-h-[100px] placeholder:text-slate-400 resize-none focus:bg-white" value={value} onChange={onChange} required />
    </div>
);

// --- PREVIEW COMPONENTS FOR DYNAMIC ADMIN PANEL ---
const TeamPreviewCard = ({ member }) => {
  const fileExtension = member.role ? (member.role.toLowerCase().includes("design") ? ".json" : ".js") : ".js";
  
  const getSkillsForRole = (role) => {
    const r = role ? role.toLowerCase() : "";
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

  const skills = (member.skills && member.skills.length > 0) 
    ? member.skills 
    : getSkillsForRole(member.role || "");

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/80 shadow-md overflow-hidden text-slate-800">
      <div className="h-9 bg-slate-100 border-b border-slate-200 px-4 flex items-center justify-between text-[10px] font-mono text-slate-400">
        <div className="flex gap-1">
          <span className="w-2 h-2 rounded-full bg-red-400"></span>
          <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
          <span className="w-2 h-2 rounded-full bg-green-400"></span>
        </div>
        <span>root@devsamp:~/{member.name ? member.name.toLowerCase().replace(/\s+/g, '') : "member"}{fileExtension}</span>
      </div>
      <div className="p-4 flex flex-col items-center">
        <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-slate-200 mb-3 bg-slate-50">
          {member.image ? (
            <img src={getGoogleDriveImage(member.image)} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-350"><ImageIcon size={24} /></div>
          )}
        </div>
        <h4 className="text-sm font-black text-slate-900">{member.name || "Teammate Name"}</h4>
        <p className="text-[9px] text-indigo-650 font-extrabold uppercase tracking-wider mb-2">{member.role || "Developer Role"}</p>
        <p className="text-[10px] text-slate-500 text-center line-clamp-2 max-w-[240px] mb-4 min-h-[30px] font-semibold leading-relaxed">
          {member.desc || "Write a brief description about the squad member."}
        </p>
        <div className="w-full space-y-2 mt-2 pt-2 border-t border-slate-100">
          <span className="text-[8px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-1">Metrics</span>
          {skills.slice(0, 3).map((skill, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-[9px] font-bold text-slate-700 font-mono">
                <span>{skill.name}</span>
                <span className="text-[8px] text-indigo-600 bg-indigo-50 px-1 rounded font-mono">L: {skill.level}% | {skill.speed}</span>
              </div>
              <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" style={{ width: `${skill.level}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProjectPreviewCard = ({ project }) => {
  const techArray = typeof project.tech === 'string' 
    ? project.tech.split(',').map(t => t.trim()).filter(Boolean) 
    : project.tech || [];

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl border border-slate-200/80 shadow-md overflow-hidden text-slate-800">
      <div className="relative aspect-video w-full bg-slate-105 overflow-hidden border-b border-slate-100">
        {project.image ? (
          <img src={getGoogleDriveImage(project.image)} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-350"><ImageIcon size={32} /></div>
        )}
      </div>
      <div className="p-4 space-y-2">
        <span className="text-[9px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded uppercase tracking-wider">{project.category || "Web App"}</span>
        <h4 className="text-base font-extrabold text-slate-900">{project.title || "Project Title"}</h4>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {techArray.map((tag, idx) => (
            <span key={idx} className="text-[9px] font-bold text-slate-500 bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded font-mono">
              {tag}
            </span>
          ))}
          {techArray.length === 0 && <span className="text-[9px] text-slate-400 italic">No technology tags</span>}
        </div>
      </div>
    </div>
  );
};

const PricingPreviewCard = ({ plan }) => {
  const featuresArray = typeof plan.features === 'string' 
    ? plan.features.split(',').map(t => t.trim()).filter(Boolean) 
    : plan.features || [];
    
  const missingArray = typeof plan.missing === 'string' 
    ? plan.missing.split(',').map(t => t.trim()).filter(Boolean) 
    : plan.missing || [];

  return (
    <div className={`relative w-full max-w-xs p-5 rounded-2xl border backdrop-blur-xl transition-all duration-300 flex flex-col bg-white ${
      plan.popular ? "border-indigo-500 shadow-md ring-2 ring-indigo-500/10" : "border-slate-200 shadow-sm"
    }`}>
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full text-[8px] font-bold tracking-widest uppercase text-white shadow-sm whitespace-nowrap">
          Popular Choice
        </div>
      )}
      <div className="border-b border-slate-200/80 pb-3 mb-3 text-slate-400 text-[8px] font-mono font-bold flex justify-between">
        <span>DEVSAMP_BILL</span>
        <span>#PREVIEW</span>
      </div>
      <h3 className="text-base font-black text-slate-805">{plan.name || "Plan Name"}</h3>
      <p className="text-[10px] text-slate-450 mt-1 leading-normal line-clamp-2 min-h-[30px] font-semibold">{plan.desc || "Short plan outline summary description."}</p>
      
      <div className="my-4 flex items-baseline gap-0.5">
        <span className="text-2xl font-black text-slate-900 font-mono">${plan.priceMonthly || "0"}</span>
        <span className="text-[10px] text-slate-405 font-bold">/mo</span>
      </div>
      
      <div className="space-y-2 mt-2 pt-2 border-t border-slate-100 flex-grow">
        {featuresArray.map((feat, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
            <span className="text-[10px] text-slate-650 font-bold">{feat}</span>
          </div>
        ))}
        {missingArray.map((feat, i) => (
          <div key={i} className="flex items-center gap-2 opacity-40">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-350"></span>
            <span className="text-[10px] text-slate-400 line-through">{feat}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const BlogPreviewCard = ({ blog }) => {

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl border border-slate-200/80 shadow-md overflow-hidden text-slate-800">
      <div className="relative aspect-video w-full bg-slate-100 overflow-hidden border-b border-slate-100">
        {blog.image ? (
          <img src={getGoogleDriveImage(blog.image)} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-350"><ImageIcon size={32} /></div>
        )}
      </div>
      <div className="p-4 space-y-1">
        <span className="text-[9px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded uppercase tracking-wider">{blog.category || "News"}</span>
        <h4 className="text-sm font-extrabold text-slate-900 line-clamp-1">{blog.title || "Blog Title"}</h4>
        <p className="text-[11px] text-slate-500 font-semibold line-clamp-2 leading-relaxed">{blog.desc || "Short blog post description summary."}</p>
      </div>
    </div>
  );
};