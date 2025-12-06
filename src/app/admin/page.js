"use client";

import { useState, useEffect } from "react";
import { 
  Trash2, Search, Download, LayoutDashboard, 
  Users, Settings, LogOut, Loader2 
} from "lucide-react";
import { motion } from "framer-motion";

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // --- LOGIN LOGIC ---
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "devsamp_boss_123") {
      setIsAuthenticated(true);
      fetchLeads();
    } else {
      alert("Wrong Password!");
    }
  };

  // --- FETCH DATA ---
  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();
      setLeads(data.contacts);
      setFilteredLeads(data.contacts);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- UPDATE & DELETE LOGIC ---
  const updateStatus = async (id, newStatus) => {
    const updatedLeads = leads.map(lead => 
        lead._id === id ? { ...lead, status: newStatus } : lead
    );
    setLeads(updatedLeads);
    setFilteredLeads(updatedLeads);

    await fetch("/api/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
    });
  };

  const deleteLead = async (id) => {
    if (!confirm("Are you sure?")) return;
    const res = await fetch(`/api/contact?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      const newLeads = leads.filter((lead) => lead._id !== id);
      setLeads(newLeads);
      setFilteredLeads(newLeads);
    }
  };

  // --- SEARCH & EXPORT ---
  useEffect(() => {
    const results = leads.filter(lead =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLeads(results);
  }, [searchTerm, leads]);

  const downloadCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Date,Name,Email,Service,Status,Message\n"
      + leads.map(e => `${e.createdAt},${e.name},${e.email},${e.service},${e.status},"${e.message}"`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "leads.csv");
    document.body.appendChild(link);
    link.click();
  };

  // --- LOGIN SCREEN ---
  if (!isAuthenticated) {
    return (
      <div className="h-screen bg-black flex items-center justify-center p-4">
        <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-sm bg-[#111] border border-white/10 p-8 rounded-3xl text-center"
        >
            <div className="mb-6 inline-flex p-4 bg-blue-600/10 rounded-full text-blue-500">
                <LayoutDashboard size={32} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Admin Login</h2>
            <p className="text-gray-500 text-sm mb-6">Enter your secret key to continue</p>
            <form onSubmit={handleLogin} className="space-y-4">
                <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-all text-center tracking-widest"
                />
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all">
                    Unlock Dashboard
                </button>
            </form>
        </motion.div>
      </div>
    );
  }

  // --- MAIN DASHBOARD LAYOUT ---
  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
        
        {/* --- 1. SIDEBAR (Fixed Left) --- */}
        <aside className="w-64 border-r border-white/10 bg-[#0a0a0a] flex-col hidden md:flex">
            <div className="p-8">
                <h1 className="text-2xl font-bold tracking-tighter">DEV<span className="text-blue-500">SAMP</span></h1>
            </div>
            
            <nav className="flex-1 px-4 space-y-2">
                <div className="flex items-center gap-3 px-4 py-3 bg-blue-600/10 text-blue-500 rounded-xl font-medium cursor-pointer">
                    <LayoutDashboard size={20} /> Dashboard
                </div>
                <div className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all cursor-pointer">
                    <Users size={20} /> Leads
                </div>
                <div className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all cursor-pointer">
                    <Settings size={20} /> Settings
                </div>
            </nav>

            <div className="p-4 border-t border-white/10">
                <button onClick={() => setIsAuthenticated(false)} className="flex items-center gap-2 text-red-500 hover:text-red-400 w-full px-4 py-2">
                    <LogOut size={18} /> Logout
                </button>
            </div>
        </aside>

        {/* --- 2. MAIN CONTENT (Scrollable Right) --- */}
        <main className="flex-1 flex flex-col h-full overflow-hidden">
            
            {/* Header */}
            <header className="h-20 border-b border-white/10 flex items-center justify-between px-8 bg-black/50 backdrop-blur-md z-10">
                <h2 className="text-xl font-bold">Inquiries Overview</h2>
                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-[#111] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:border-blue-500 outline-none w-64"
                        />
                    </div>
                    <button onClick={downloadCSV} className="bg-white text-black px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-gray-200 transition-colors">
                        <Download size={16} /> Export
                    </button>
                </div>
            </header>

            {/* Scrollable Area */}
            <div className="flex-1 overflow-y-auto p-8">
                
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {['Total Leads', 'New', 'Closed'].map((title, i) => (
                        <div key={i} className="bg-[#111] border border-white/10 p-6 rounded-2xl">
                            <h3 className="text-gray-400 text-xs uppercase tracking-wider mb-2">{title}</h3>
                            <p className="text-3xl font-bold">
                                {i === 0 ? leads.length : 
                                 i === 1 ? leads.filter(l => l.status === "New").length : 
                                 leads.filter(l => l.status === "Closed").length}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Table Container */}
                <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                    {loading ? (
                        <div className="p-20 flex justify-center"><Loader2 className="animate-spin text-blue-500" /></div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-white/5 text-gray-400 text-xs uppercase font-medium">
                                    <tr>
                                        <th className="p-5 tracking-wider">Date</th>
                                        <th className="p-5 tracking-wider">Client Details</th>
                                        <th className="p-5 tracking-wider">Service</th>
                                        <th className="p-5 tracking-wider">Status</th>
                                        <th className="p-5 tracking-wider">Message</th>
                                        <th className="p-5 text-right tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 text-sm">
                                    {filteredLeads.map((lead) => (
                                        <tr key={lead._id} className="hover:bg-white/5 transition-colors group">
                                            <td className="p-5 text-gray-500 whitespace-nowrap">
                                                {new Date(lead.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="p-5">
                                                <div className="font-bold text-white">{lead.name}</div>
                                                <div className="text-gray-500 text-xs">{lead.email}</div>
                                            </td>
                                            <td className="p-5">
                                                <span className="px-2 py-1 rounded bg-white/10 text-gray-300 text-xs">
                                                    {lead.service}
                                                </span>
                                            </td>
                                            <td className="p-5">
                                                <select 
                                                    value={lead.status || "New"}
                                                    onChange={(e) => updateStatus(lead._id, e.target.value)}
                                                    className={`bg-transparent border border-white/20 rounded px-2 py-1 text-xs font-bold outline-none cursor-pointer ${
                                                        lead.status === "Contacted" ? "text-green-400 border-green-500/30" :
                                                        lead.status === "Closed" ? "text-red-400 border-red-500/30" :
                                                        "text-blue-400 border-blue-500/30"
                                                    }`}
                                                >
                                                    <option className="bg-black" value="New">New</option>
                                                    <option className="bg-black" value="Contacted">Contacted</option>
                                                    <option className="bg-black" value="Closed">Closed</option>
                                                </select>
                                            </td>
                                            <td className="p-5 text-gray-400 max-w-xs truncate">{lead.message}</td>
                                            <td className="p-5 text-right">
                                                <button onClick={() => deleteLead(lead._id)} className="text-gray-600 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-white/5">
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {filteredLeads.length === 0 && !loading && (
                        <div className="p-12 text-center text-gray-500">No leads found.</div>
                    )}
                </div>

            </div>
        </main>
    </div>
  );
}