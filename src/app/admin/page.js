"use client";

import { useState, useEffect } from "react";
import { 
  Trash2, Search, LayoutDashboard, 
  Users, Layers, Plus, Loader2, 
  LogOut, Menu, X, Bell, CheckCircle, AlertCircle, XCircle,
  Briefcase, PenBox, ChevronDown, Calendar, Mail, MessageSquare, 
  FolderOpen, ExternalLink, CreditCard, Star, MessageCircle, 
  TrendingUp, Activity, ArrowUpRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- ANIMATED BACKGROUND ---
const Background = () => (
  <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-black">
    <motion.div 
      animate={{ 
        scale: [1, 1.2, 1], 
        rotate: [0, 90, 0], 
        opacity: [0.3, 0.5, 0.3] 
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px]" 
    />
    <motion.div 
      animate={{ 
        scale: [1, 1.5, 1], 
        rotate: [0, -60, 0], 
        opacity: [0.2, 0.4, 0.2] 
      }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px]" 
    />
  </div>
);

// --- COMPONENT: STAT CARD WITH CHART ---
const StatCard = ({ title, value, icon: Icon, color, trend }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -5 }}
    className="relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl group"
  >
    <div className={`absolute top-0 right-0 p-32 bg-${color}-500/10 blur-3xl rounded-full group-hover:bg-${color}-500/20 transition-all duration-500`} />
    
    <div className="relative z-10 flex justify-between items-start">
        <div>
            <div className={`p-3 w-fit rounded-2xl bg-${color}-500/20 text-${color}-400 mb-4`}>
                <Icon size={24} />
            </div>
            <p className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-1">{title}</p>
            <h3 className="text-4xl font-bold text-white tracking-tight">{value}</h3>
        </div>
        
        {/* Fake Mini Chart */}
        <div className="flex items-end gap-1 h-12">
            {[40, 70, 50, 90, 60].map((h, i) => (
                <motion.div 
                    key={i} 
                    initial={{ height: 0 }} 
                    animate={{ height: `${h}%` }} 
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className={`w-2 rounded-t-sm bg-${color}-500/50`} 
                />
            ))}
        </div>
    </div>
    
    {trend && (
        <div className="relative z-10 mt-4 flex items-center gap-2 text-xs font-medium text-green-400">
            <span className="bg-green-500/20 px-2 py-1 rounded-full flex items-center gap-1">
                <ArrowUpRight size={12} /> {trend}
            </span>
            <span className="text-gray-500">vs last month</span>
        </div>
    )}
  </motion.div>
);

// --- COMPONENT: TOAST ---
const Toast = ({ message, type, onClose }) => (
  <motion.div 
    initial={{ opacity: 0, x: 100, scale: 0.9 }}
    animate={{ opacity: 1, x: 0, scale: 1 }}
    exit={{ opacity: 0, x: 100, scale: 0.9 }}
    className={`fixed top-8 right-8 z-[100] pl-4 pr-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border backdrop-blur-md ${
      type === "success" 
        ? "bg-green-900/40 border-green-500/30 text-green-400 shadow-green-900/20" 
        : "bg-red-900/40 border-red-500/30 text-red-400 shadow-red-900/20"
    }`}
  >
    <div className={`p-2 rounded-full ${type === "success" ? "bg-green-500/20" : "bg-red-500/20"}`}>
        {type === "success" ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
    </div>
    <div>
        <h4 className="font-bold text-sm text-white">{type === "success" ? "Success" : "Error"}</h4>
        <p className="text-xs opacity-80">{message}</p>
    </div>
    <button onClick={onClose} className="absolute top-2 right-2 p-1 hover:bg-white/10 rounded-full transition-colors">
        <X size={14} />
    </button>
  </motion.div>
);

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard"); 
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); 
  const [toast, setToast] = useState(null); 

  // Data
  const [leads, setLeads] = useState([]);
  const [services, setServices] = useState([]);
  const [team, setTeam] = useState([]);
  const [projects, setProjects] = useState([]);
  const [pricing, setPricing] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // UI Helpers
  const [searchTerm, setSearchTerm] = useState("");
  const [leadFilter, setLeadFilter] = useState("All");
  const [expandedLead, setExpandedLead] = useState(null);

  // Forms
  const [newService, setNewService] = useState({ title: "", desc: "", icon: "Monitor", color: "text-blue-500", gradient: "from-blue-500 to-cyan-500" });
  const [teamForm, setTeamForm] = useState({ id: null, name: "", role: "", image: "", desc: "" });
  const [projectForm, setProjectForm] = useState({ id: null, title: "", category: "", image: "", tech: "", link: "" });
  const [pricingForm, setPricingForm] = useState({ id: null, name: "", desc: "", priceMonthly: "", priceYearly: "", features: "", missing: "", popular: false });

  const showToast = (message, type = "success") => { setToast({ message, type }); setTimeout(() => setToast(null), 3000); };
  const handleLogin = (e) => { e.preventDefault(); if (password === "devsamp_boss_123") { setIsAuthenticated(true); fetchData(); } else { showToast("Wrong Password!", "error"); } };

  // --- API CALLS ---
  const fetchData = async () => {
    setLoading(true);
    try {
      const [l, s, t, p, pr, r] = await Promise.all([
        fetch("/api/contact"), fetch("/api/services"), fetch("/api/team"), fetch("/api/projects"), fetch("/api/pricing"), fetch("/api/reviews")
      ]);
      setLeads((await l.json()).contacts || []);
      setServices((await s.json()).services || []);
      setTeam((await t.json()).team || []);
      setProjects((await p.json()).projects || []);
      setPricing((await pr.json()).pricing || []);
      setReviews((await r.json()).reviews || []);
    } catch (e) { showToast("Failed to load data", "error"); }
    setLoading(false);
  };

  // --- CRUD HELPERS ---
  const handleDelete = async (api, id, setter, list) => {
    if (!confirm("Are you sure?")) return;
    await fetch(`/api/${api}?id=${id}`, { method: "DELETE" });
    setter(list.filter(item => item._id !== id));
    showToast("Deleted successfully");
  };

  const handleUpdateLead = async (id, status) => {
    setLeads(leads.map(l => l._id === id ? { ...l, status } : l));
    await fetch("/api/contact", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) });
    showToast("Status updated");
  };

  const handleSubmit = async (api, form, setForm, id, setter, isEdit) => {
    setLoading(true);
    const method = id ? "PUT" : "POST";
    // Data processing logic same as before...
    let body = { ...form };
    if (api === 'projects') body.tech = form.tech.includes(',') ? form.tech.split(',').map(t=>t.trim()) : form.tech;
    if (api === 'pricing') {
        body.features = form.features.includes(',') ? form.features.split(',').filter(Boolean) : [form.features];
        body.missing = form.missing.includes(',') ? form.missing.split(',').filter(Boolean) : [];
    }

    const res = await fetch(`/api/${api}`, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if(res.ok) { setIsModalOpen(false); fetchData(); showToast(isEdit ? "Updated Successfully!" : "Added Successfully!"); }
    else { showToast("Operation Failed", "error"); }
    setLoading(false);
  };

  // Modals Openers
  const openModal = (type, data = null) => {
    setModalType(type);
    if (type === 'project') setProjectForm(data ? { ...data, id: data._id, tech: data.tech.join(', ') } : { id: null, title: "", category: "", image: "", tech: "", link: "" });
    if (type === 'service') setNewService(data || { title: "", desc: "", icon: "Monitor", color: "text-blue-500", gradient: "from-blue-500 to-cyan-500" });
    if (type === 'team') setTeamForm(data ? { ...data, id: data._id } : { id: null, name: "", role: "", image: "", desc: "" });
    if (type === 'pricing') setPricingForm(data ? { ...data, id: data._id, features: data.features.join(','), missing: data.missing.join(',') } : { id: null, name: "", desc: "", priceMonthly: "", priceYearly: "", features: "", missing: "", popular: false });
    setIsModalOpen(true);
  };

  // --- LOGIN ---
  if (!isAuthenticated) {
    return (
      <div className="h-screen flex items-center justify-center relative bg-black font-sans">
        <Background />
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-sm bg-black/40 backdrop-blur-2xl border border-white/10 p-10 rounded-[2rem] text-center shadow-2xl relative z-10">
            <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <LayoutDashboard size={32} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Admin Portal</h2>
            <p className="text-gray-400 text-sm mb-8">Welcome back, Commander.</p>
            <form onSubmit={handleLogin} className="space-y-4">
                <input type="password" placeholder="Passkey" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-center tracking-[0.5em] outline-none focus:border-blue-500 transition-all placeholder:tracking-normal" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 hover:scale-[1.02] active:scale-95 transition-all">Unlock System</button>
            </form>
        </motion.div>
        <AnimatePresence>{toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}</AnimatePresence>
      </div>
    );
  }

  // --- MAIN DASHBOARD ---
  return (
    <div className="flex h-screen text-white font-sans overflow-hidden bg-black selection:bg-blue-500/30">
        <Background />
        <AnimatePresence>{toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}</AnimatePresence>

        {/* --- SIDEBAR --- */}
        <aside className={`fixed md:relative z-50 w-72 h-full bg-black/40 backdrop-blur-xl border-r border-white/10 p-6 flex flex-col transition-all duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
            <div className="flex items-center gap-3 mb-10 px-2 py-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-500/20">D</div>
                <div><h1 className="text-lg font-bold tracking-tight leading-none">DEVSAMP</h1><span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Admin OS v2.0</span></div>
                <button onClick={() => setSidebarOpen(false)} className="md:hidden ml-auto text-gray-400"><X size={24} /></button>
            </div>
            
            <nav className="space-y-1 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {[
                    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
                    { type: 'label', label: 'Management' },
                    { id: 'leads', label: 'Inquiries', icon: Users },
                    { id: 'reviews', label: 'Reviews', icon: MessageCircle },
                    { id: 'team', label: 'Squad', icon: Briefcase },
                    { type: 'label', label: 'Content' },
                    { id: 'services', label: 'Services', icon: Layers },
                    { id: 'projects', label: 'Projects', icon: FolderOpen },
                    { id: 'pricing', label: 'Pricing', icon: CreditCard },
                ].map((item, i) => (
                    item.type === 'label' ? 
                    <div key={i} className="text-[10px] uppercase font-bold text-gray-600 mt-6 mb-2 px-4">{item.label}</div> :
                    <button key={item.id} onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }} className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all font-medium text-sm group ${activeTab === item.id ? "bg-white text-black font-bold shadow-lg shadow-white/10" : "text-gray-400 hover:text-white hover:bg-white/5"}`}>
                        <item.icon size={18} className={`transition-colors ${activeTab === item.id ? "text-blue-600" : "text-gray-500 group-hover:text-white"}`} /> {item.label}
                        {activeTab === item.id && <motion.div layoutId="sidebar-active" className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600" />}
                    </button>
                ))}
            </nav>
            <button onClick={() => setIsAuthenticated(false)} className="mt-4 flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors text-sm font-medium border border-transparent hover:border-red-500/20"><LogOut size={18} /> Sign Out</button>
        </aside>

        {/* --- MAIN CONTENT --- */}
        <main className="flex-1 flex flex-col h-full overflow-hidden relative">
            
            {/* Header */}
            <header className="h-20 flex items-center justify-between px-8 z-10">
                <div className="flex items-center gap-4">
                    <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 bg-white/5 rounded-lg"><Menu size={20}/></button>
                    <h2 className="text-xl font-bold capitalize tracking-tight">{activeTab}</h2>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-400">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> System Online
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 border-2 border-white/20 shadow-lg shadow-purple-500/20"></div>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="max-w-7xl mx-auto pb-20">
                    
                    {/* DASHBOARD */}
                    {activeTab === 'dashboard' && (
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                <StatCard title="Total Inquiries" value={leads.length} icon={Users} color="blue" trend="+12%" />
                                <StatCard title="New Leads" value={leads.filter(l => l.status === "New").length} icon={Bell} color="pink" trend="+5%" />
                                <StatCard title="Client Reviews" value={reviews.length} icon={Star} color="yellow" trend="+2%" />
                                <StatCard title="Projects Live" value={projects.length} icon={FolderOpen} color="green" />
                            </div>
                            
                            {/* Visual Chart Area (Mock) */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-32 bg-blue-600/5 blur-3xl rounded-full" />
                                    <div className="flex justify-between items-center mb-8">
                                        <h3 className="font-bold flex items-center gap-2"><Activity size={18} className="text-blue-500"/> Activity Overview</h3>
                                        <select className="bg-black/20 border border-white/10 rounded-lg px-3 py-1 text-xs outline-none"><option>Last 7 Days</option></select>
                                    </div>
                                    <div className="h-48 flex items-end justify-between gap-2">
                                        {[30, 45, 25, 60, 75, 50, 80, 40, 55, 70, 65, 90].map((h, i) => (
                                            <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: i * 0.05 }} className="w-full bg-gradient-to-t from-blue-600/50 to-blue-400 rounded-t-md hover:from-blue-500 hover:to-white transition-all cursor-pointer relative group">
                                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">{h}</div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                                    <h3 className="font-bold mb-6">Quick Actions</h3>
                                    <div className="space-y-3">
                                        <button onClick={() => openModal('project')} className="w-full p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center gap-3 transition-all group">
                                            <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400 group-hover:text-white transition-colors"><Plus size={18}/></div>
                                            <span className="text-sm font-medium">Add New Project</span>
                                        </button>
                                        <button onClick={() => openModal('team')} className="w-full p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center gap-3 transition-all group">
                                            <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400 group-hover:text-white transition-colors"><Briefcase size={18}/></div>
                                            <span className="text-sm font-medium">Update Team</span>
                                        </button>
                                        <button onClick={() => setActiveTab('leads')} className="w-full p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center gap-3 transition-all group">
                                            <div className="p-2 bg-pink-500/20 rounded-lg text-pink-400 group-hover:text-white transition-colors"><Bell size={18}/></div>
                                            <span className="text-sm font-medium">Check Leads</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* LEADS */}
                    {activeTab === 'leads' && (
                        <div className="space-y-6">
                            <div className="flex flex-col md:flex-row justify-between gap-4 sticky top-0 bg-black/80 backdrop-blur-xl z-20 py-4 border-b border-white/10 -mt-8 px-1">
                                <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/10 w-fit">
                                    {['All', 'New', 'Contacted', 'Closed'].map(status => (
                                        <button key={status} onClick={() => setLeadFilter(status)} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${leadFilter === status ? "bg-white text-black shadow-lg" : "text-gray-400 hover:text-white"}`}>{status}</button>
                                    ))}
                                </div>
                                <div className="relative"><Search size={16} className="absolute left-3 top-3 text-gray-500" /><input className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-gray-600 outline-none w-64 focus:border-blue-500 transition-colors" placeholder="Search leads..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} /></div>
                            </div>
                            <div className="grid gap-3">
                                {leads.filter(l => (leadFilter === "All" || l.status === leadFilter) && (l.name.toLowerCase().includes(searchTerm.toLowerCase()) || l.email.toLowerCase().includes(searchTerm.toLowerCase()))).map((lead, i) => (
                                    <motion.div layout key={lead._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className={`bg-white/5 border rounded-2xl overflow-hidden transition-all ${expandedLead === lead._id ? "border-blue-500/50 bg-blue-500/5 ring-1 ring-blue-500/20" : "border-white/5 hover:border-white/20"}`}>
                                        <div onClick={() => setExpandedLead(expandedLead === lead._id ? null : lead._id)} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-lg ${lead.status === 'New' ? 'bg-blue-600' : 'bg-gray-700'}`}>{lead.name.charAt(0)}</div>
                                                <div><h4 className="font-bold text-white">{lead.name}</h4><p className="text-xs text-gray-500">{lead.email}</p></div>
                                            </div>
                                            <div className="flex items-center gap-4 ml-auto" onClick={e => e.stopPropagation()}>
                                                <select value={lead.status} onChange={e => handleUpdateLead(lead._id, e.target.value)} className={`text-xs font-bold px-3 py-1.5 rounded-full outline-none cursor-pointer border ${lead.status === 'New' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' : lead.status === 'Contacted' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' : 'bg-green-500/10 text-green-400 border-green-500/30'}`}>
                                                    <option className="bg-black">New</option><option className="bg-black">Contacted</option><option className="bg-black">Closed</option>
                                                </select>
                                                <button onClick={() => handleDelete('contact', lead._id, setLeads, leads)} className="text-gray-500 hover:text-red-500 p-2 hover:bg-white/5 rounded-lg transition-all"><Trash2 size={18} /></button>
                                                <ChevronDown size={20} className={`text-gray-500 transition-transform ${expandedLead === lead._id ? "rotate-180" : ""}`} />
                                            </div>
                                        </div>
                                        <AnimatePresence>{expandedLead === lead._id && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-t border-white/5 bg-black/20 p-6"><div className="bg-white/5 p-4 rounded-xl border border-white/5"><h5 className="text-xs font-bold text-gray-500 uppercase mb-2 flex items-center gap-2"><MessageSquare size={12}/> Message</h5><p className="text-gray-300 text-sm leading-relaxed">{lead.message}</p></div><div className="mt-4 flex gap-4 text-xs text-gray-500"><span className="flex items-center gap-1"><Layers size={12}/> Service: {lead.service}</span><span className="flex items-center gap-1"><Calendar size={12}/> {new Date(lead.createdAt).toLocaleDateString()}</span></div></motion.div>)}</AnimatePresence>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* SERVICES / TEAM / PROJECTS / PRICING / REVIEWS GRID LAYOUTS */}
                    {['services', 'team', 'projects', 'pricing', 'reviews'].includes(activeTab) && (
                        <>
                            <div className="flex justify-between items-center mb-8 sticky top-0 bg-black/80 backdrop-blur-xl z-20 py-4 -mt-8 border-b border-white/10">
                                <h2 className="text-2xl font-bold capitalize flex items-center gap-3">
                                    {activeTab === 'reviews' && <MessageCircle className="text-yellow-500"/>}
                                    {activeTab === 'team' && <Briefcase className="text-green-500"/>}
                                    {activeTab === 'projects' && <FolderOpen className="text-pink-500"/>}
                                    {activeTab === 'pricing' && <CreditCard className="text-purple-500"/>}
                                    {activeTab === 'services' && <Layers className="text-blue-500"/>}
                                    {activeTab}
                                </h2>
                                {activeTab !== 'reviews' && (
                                    <button onClick={() => openModal(activeTab.slice(0, -1))} className="bg-white text-black px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-gray-200 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-white/10">
                                        <Plus size={18} /> Add New
                                    </button>
                                )}
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {activeTab === 'services' && services.map(s => (
                                    <motion.div layout key={s._id} className="group bg-white/5 border border-white/10 p-6 rounded-3xl hover:border-blue-500/30 transition-all hover:-translate-y-1 relative">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform"><Layers size={24}/></div>
                                        <h3 className="font-bold text-lg text-white mb-2">{s.title}</h3>
                                        <p className="text-sm text-gray-400 line-clamp-2 mb-4">{s.desc}</p>
                                        <button onClick={() => handleDelete('services', s._id, setServices, services)} className="absolute top-6 right-6 text-gray-600 hover:text-red-500 p-2 hover:bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={18}/></button>
                                    </motion.div>
                                ))}

                                {activeTab === 'team' && team.map(t => (
                                    <motion.div layout key={t._id} className="group bg-white/5 border border-white/10 p-5 rounded-3xl flex items-center gap-5 hover:border-green-500/30 transition-all relative">
                                        <img src={t.image} className="w-16 h-16 rounded-full object-cover border-2 border-white/10" alt={t.name}/>
                                        <div><h3 className="font-bold text-white">{t.name}</h3><p className="text-xs text-green-400 uppercase font-bold tracking-wider">{t.role}</p></div>
                                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all"><button onClick={() => openModal('team', t)} className="p-2 bg-white text-black rounded-lg hover:scale-110"><PenBox size={14}/></button><button onClick={() => handleDelete('team', t._id, setTeam, team)} className="p-2 bg-red-500 text-white rounded-lg hover:scale-110"><Trash2 size={14}/></button></div>
                                    </motion.div>
                                ))}

                                {activeTab === 'projects' && projects.map(p => (
                                    <motion.div layout key={p._id} className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-pink-500/30 transition-all relative">
                                        <div className="h-48 relative"><img src={p.image} className="w-full h-full object-cover transition-transform group-hover:scale-105" alt={p.title}/><div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3"><button onClick={() => openModal('project', p)} className="p-3 bg-white rounded-full text-black hover:scale-110 transition-transform"><PenBox size={20}/></button><button onClick={() => handleDelete('projects', p._id, setProjects, projects)} className="p-3 bg-red-500 rounded-full text-white hover:scale-110 transition-transform"><Trash2 size={20}/></button></div></div>
                                        <div className="p-5"><div className="flex justify-between items-start mb-2"><div><span className="text-[10px] font-bold text-pink-400 uppercase tracking-widest">{p.category}</span><h3 className="font-bold text-lg text-white">{p.title}</h3></div><a href={p.link} target="_blank" className="text-gray-500 hover:text-white"><ExternalLink size={18}/></a></div></div>
                                    </motion.div>
                                ))}

                                {activeTab === 'pricing' && pricing.map(p => (
                                    <motion.div layout key={p._id} className={`group bg-white/5 border p-6 rounded-3xl relative ${p.popular ? 'border-purple-500/50 shadow-lg shadow-purple-900/20' : 'border-white/10'}`}>
                                        {p.popular && <span className="absolute -top-3 left-6 bg-purple-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Popular</span>}
                                        <h3 className="text-xl font-bold text-white mt-2">{p.name}</h3>
                                        <div className="text-3xl font-bold text-white mt-4 mb-6">${p.priceMonthly}<span className="text-sm font-normal text-gray-500">/mo</span></div>
                                        <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-all"><button onClick={() => openModal('pricing', p)} className="p-2 bg-white/10 text-white rounded-lg hover:bg-white/20"><PenBox size={16}/></button><button onClick={() => handleDelete('pricing', p._id, setPricing, pricing)} className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20"><Trash2 size={16}/></button></div>
                                    </motion.div>
                                ))}

                                {activeTab === 'reviews' && reviews.map(r => (
                                    <motion.div layout key={r._id} className="bg-white/5 border border-white/10 p-6 rounded-3xl relative group hover:bg-white/10 transition-all">
                                        <div className="flex items-center gap-3 mb-4"><img src={r.image} className="w-10 h-10 rounded-full" alt="user"/><div><h4 className="font-bold text-sm text-white">{r.name}</h4><div className="flex text-yellow-500 text-[10px] gap-0.5">{[...Array(r.rating)].map((_, i) => <Star key={i} size={10} fill="currentColor"/>)}</div></div></div>
                                        <p className="text-gray-400 text-sm italic">"{r.text}"</p>
                                        <button onClick={() => handleDelete('reviews', r._id, setReviews, reviews)} className="absolute top-4 right-4 text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={16}/></button>
                                    </motion.div>
                                ))}
                            </div>
                        </>
                    )}

                </motion.div>
            </div>
        </main>

        {/* --- MODAL (Shared) --- */}
        <AnimatePresence>
            {isModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
                    <motion.div initial={{ scale: 0.9, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.9, y: 20, opacity: 0 }} className="relative bg-[#111] border border-white/10 p-8 rounded-[2rem] w-full max-w-lg shadow-2xl overflow-hidden">
                        <div className="absolute top-0 right-0 p-32 bg-blue-600/10 blur-3xl rounded-full pointer-events-none" />
                        <div className="flex justify-between items-center mb-8 relative z-10">
                            <h3 className="text-2xl font-bold text-white capitalize">{modalType} Details</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white bg-white/5 p-2 rounded-full hover:bg-white/10 transition-all"><X size={20}/></button>
                        </div>
                        
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            if(modalType === 'project') handleSubmit('projects', projectForm, setProjectForm, projectForm.id, setProjects, !!projectForm.id);
                            if(modalType === 'service') handleSubmit('services', newService, setNewService, null, setServices, false);
                            if(modalType === 'team') handleSubmit('team', teamForm, setTeamForm, teamForm.id, setTeam, !!teamForm.id);
                            if(modalType === 'pricing') handleSubmit('pricing', pricingForm, setPricingForm, pricingForm.id, setPricing, !!pricingForm.id);
                        }} className="space-y-4 relative z-10">
                            
                            {/* DYNAMIC FORM FIELDS BASED ON TYPE */}
                            {modalType === 'project' && (
                                <><input className="input-field" placeholder="Project Title" value={projectForm.title} onChange={e=>setProjectForm({...projectForm, title:e.target.value})} required/>
                                <div className="grid grid-cols-2 gap-4"><input className="input-field" placeholder="Category" value={projectForm.category} onChange={e=>setProjectForm({...projectForm, category:e.target.value})}/><input className="input-field" placeholder="Link URL" value={projectForm.link} onChange={e=>setProjectForm({...projectForm, link:e.target.value})}/></div>
                                <input className="input-field" placeholder="Image URL" value={projectForm.image} onChange={e=>setProjectForm({...projectForm, image:e.target.value})}/>
                                <textarea className="input-field h-24 pt-3" placeholder="Tech Stack (comma separated)" value={projectForm.tech} onChange={e=>setProjectForm({...projectForm, tech:e.target.value})}/></>
                            )}

                            {modalType === 'service' && (
                                <><input className="input-field" placeholder="Service Title" value={newService.title} onChange={e=>setNewService({...newService, title:e.target.value})} required/>
                                <div className="grid grid-cols-2 gap-4">
                                    <select className="input-field" value={newService.icon} onChange={e=>setNewService({...newService, icon:e.target.value})}>{['Monitor','Smartphone','Palette','Globe','Search','Server'].map(i=><option key={i} value={i}>{i}</option>)}</select>
                                    <select className="input-field" value={newService.color} onChange={e=>setNewService({...newService, color:e.target.value})}><option value="text-blue-500">Blue</option><option value="text-purple-500">Purple</option><option value="text-pink-500">Pink</option><option value="text-green-500">Green</option></select>
                                </div>
                                <textarea className="input-field h-32 pt-3" placeholder="Description" value={newService.desc} onChange={e=>setNewService({...newService, desc:e.target.value})}/></>
                            )}

                            {modalType === 'team' && (
                                <><input className="input-field" placeholder="Name" value={teamForm.name} onChange={e=>setTeamForm({...teamForm, name:e.target.value})} required/>
                                <input className="input-field" placeholder="Role" value={teamForm.role} onChange={e=>setTeamForm({...teamForm, role:e.target.value})}/>
                                <input className="input-field" placeholder="Image URL" value={teamForm.image} onChange={e=>setTeamForm({...teamForm, image:e.target.value})}/>
                                <textarea className="input-field h-24 pt-3" placeholder="Bio" value={teamForm.desc} onChange={e=>setTeamForm({...teamForm, desc:e.target.value})}/></>
                            )}

                            {modalType === 'pricing' && (
                                <><input className="input-field" placeholder="Plan Name" value={pricingForm.name} onChange={e=>setPricingForm({...pricingForm, name:e.target.value})} required/>
                                <div className="grid grid-cols-2 gap-4"><input className="input-field" placeholder="Monthly Price" value={pricingForm.priceMonthly} onChange={e=>setPricingForm({...pricingForm, priceMonthly:e.target.value})}/><input className="input-field" placeholder="Yearly Price" value={pricingForm.priceYearly} onChange={e=>setPricingForm({...pricingForm, priceYearly:e.target.value})}/></div>
                                <input className="input-field" placeholder="Description" value={pricingForm.desc} onChange={e=>setPricingForm({...pricingForm, desc:e.target.value})}/>
                                <textarea className="input-field h-20 pt-3" placeholder="Features (comma separated)" value={pricingForm.features} onChange={e=>setPricingForm({...pricingForm, features:e.target.value})}/>
                                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5"><input type="checkbox" checked={pricingForm.popular} onChange={e=>setPricingForm({...pricingForm, popular:e.target.checked})} className="w-5 h-5 accent-blue-600"/><label className="text-sm text-gray-300">Mark as Popular Plan</label></div></>
                            )}

                            <button disabled={loading} className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 hover:scale-[1.02] active:scale-95 transition-all flex justify-center gap-2 mt-4">
                                {loading ? <Loader2 className="animate-spin" /> : "Save Changes"}
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>

        <style jsx global>{`
            .input-field { @apply w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500 focus:bg-black/80 transition-all placeholder:text-gray-600; }
            .custom-scrollbar::-webkit-scrollbar { width: 6px; }
            .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
            .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #555; }
        `}</style>
    </div>
  );
}