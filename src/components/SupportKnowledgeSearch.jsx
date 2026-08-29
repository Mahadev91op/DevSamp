"use client";

import { useState } from "react";
import {
  Search,
  ChevronDown,
  ThumbsUp,
  ThumbsDown,
  CheckCircle2,
  HelpCircle,
  BookOpen,
  Wrench,
  Printer,
  ShieldCheck
} from "lucide-react";

const KNOWLEDGE_ARTICLES = [
  {
    id: "kb-1",
    category: "Hospital & MedERP",
    title: "How to connect a Roche Cobas or Beckman Coulter lab analyzer?",
    snippet: "MedERP Pro includes a background bidirectional HL7 service. Navigate to Settings > Laboratory Devices > Add Analyzer. Input the instrument IP address and port 5000.",
    helpfulCount: 48
  },
  {
    id: "kb-2",
    category: "Hospital & MedERP",
    title: "How to generate and print automated discharge summaries with doctor e-signatures?",
    snippet: "Open Patient IPD Record > Clinical Notes > Click 'Generate Discharge Summary'. The system will auto-populate vitals, medications given, and doctor advice. Click 'Sign & Finalize'.",
    helpfulCount: 62
  },
  {
    id: "kb-3",
    category: "Retail POS",
    title: "How does offline POS mode work when the internet is disconnected?",
    snippet: "The DevSamp offline POS stores all billing transactions locally in encrypted SQLite. When internet connectivity is restored, the background mesh automatically synchronizes sales with central cloud servers in batches.",
    helpfulCount: 39
  },
  {
    id: "kb-4",
    category: "Hardware & Printers",
    title: "How to configure thermal receipt printers (ESC/POS) on Windows and Android?",
    snippet: "Connect your thermal printer via USB or Bluetooth. In MedERP/POS Settings > Printers > Select 'Auto-Detect ESC/POS'. Test print a 80mm or 58mm sample receipt.",
    helpfulCount: 71
  },
  {
    id: "kb-5",
    category: "Billing & Tax",
    title: "How to configure GSTIN rates and automatic CGST/SGST ledger splits?",
    snippet: "Go to Account > Organization Settings > Tax & Billing. Enter your 15-digit GSTIN number. The system will automatically compute intra-state (CGST+SGST) vs inter-state (IGST) invoices.",
    helpfulCount: 55
  }
];

const CATEGORIES = ["All", "Hospital & MedERP", "Retail POS", "Hardware & Printers", "Billing & Tax"];

export default function SupportKnowledgeSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");
  const [expandedId, setExpandedId] = useState(KNOWLEDGE_ARTICLES[0].id);
  const [votedArticles, setVotedArticles] = useState({});

  const filteredArticles = KNOWLEDGE_ARTICLES.filter((article) => {
    const matchesCat = selectedCat === "All" || article.category === selectedCat;
    const matchesSearch =
      !searchQuery.trim() ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.snippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleVote = (id, type) => {
    if (votedArticles[id]) return;
    setVotedArticles({ ...votedArticles, [id]: type });
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
      
      {/* Search Input Box */}
      <div className="space-y-4">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides, setup manuals, printer fixes, or FAQs..."
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-600 focus:bg-white transition-all font-medium"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCat(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedCat === cat
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion FAQ Articles List */}
      <div className="space-y-3">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => {
            const isExpanded = expandedId === article.id;
            const vote = votedArticles[article.id];

            return (
              <div
                key={article.id}
                className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/40 transition-all"
              >
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : article.id)}
                  className="w-full flex items-center justify-between p-4 text-left transition-colors hover:bg-slate-100/60"
                >
                  <div className="space-y-1 pr-4">
                    <span className="text-[10px] font-bold uppercase text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                      {article.category}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                      {article.title}
                    </h4>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-slate-400 shrink-0 transition-transform duration-200 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 bg-white border-t border-slate-100 space-y-4">
                    <p className="text-xs text-slate-700 leading-relaxed font-normal">
                      {article.snippet}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                      <span>Was this answer helpful?</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleVote(article.id, "yes")}
                          className={`px-2.5 py-1 rounded-lg border flex items-center gap-1 transition-colors ${
                            vote === "yes"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200 font-bold"
                              : "bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200"
                          }`}
                        >
                          <ThumbsUp size={11} />
                          <span>Yes ({article.helpfulCount + (vote === "yes" ? 1 : 0)})</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleVote(article.id, "no")}
                          className={`px-2.5 py-1 rounded-lg border flex items-center gap-1 transition-colors ${
                            vote === "no"
                              ? "bg-rose-50 text-rose-700 border-rose-200 font-bold"
                              : "bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200"
                          }`}
                        >
                          <ThumbsDown size={11} />
                          <span>No</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="p-8 text-center text-slate-500 space-y-2">
            <HelpCircle size={24} className="mx-auto text-slate-400" />
            <p className="text-xs font-bold text-slate-700">No knowledge base articles found matching your query.</p>
            <p className="text-xs text-slate-500">Try searching for &quot;analyzer&quot;, &quot;printer&quot;, or &quot;discharge&quot;.</p>
          </div>
        )}
      </div>

    </div>
  );
}
