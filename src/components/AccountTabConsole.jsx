"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Key,
  Copy,
  CheckCircle2,
  Plus,
  Trash2,
  RefreshCw,
  LifeBuoy,
  FileText,
  Download,
  Users,
  ShieldCheck,
  Clock,
  Send,
  Boxes,
  CreditCard
} from "lucide-react";

export default function AccountTabConsole({ tab }) {
  // API Keys state
  const [apiKeys, setApiKeys] = useState([
    { id: "key_1", name: "Production Gateway Key", key: "devsamp_live_pk_9948102948190284", created: "10 Aug 2026", env: "Production" },
    { id: "key_2", name: "Sandbox Testing Secret", key: "devsamp_test_sk_4482019481029384", created: "18 Aug 2026", env: "Sandbox" }
  ]);
  const [copiedKeyId, setCopiedKeyId] = useState(null);

  // Support Tickets state
  const [tickets, setTickets] = useState([
    { id: "TCK-8842", subject: "Pathology Analyzer HL7 Sync Latency", severity: "High", status: "In Progress", created: "Today at 09:30 AM", sla: "15 min response" },
    { id: "TCK-8720", subject: "Add New Counter POS Printer Driver", severity: "Normal", status: "Resolved", created: "2 days ago", sla: "Met SLA" }
  ]);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [newTicket, setNewTicket] = useState({ subject: "", severity: "Normal", message: "", category: "MedERP Pro" });

  // Team RBAC state
  const [teamMembers, setTeamMembers] = useState([
    { name: "Dr. Arvind Mehta", email: "director@apexcare.com", role: "Owner / Administrator", status: "Active" },
    { name: "Suresh Pillai", email: "pharmacy.lead@apexcare.com", role: "Pharmacy Manager", status: "Active" },
    { name: "Ananya Sharma", email: "billing@apexcare.com", role: "Billing Specialist", status: "Active" }
  ]);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [newMember, setNewMember] = useState({ name: "", email: "", role: "Billing Specialist" });

  // Invoices state
  const [invoices, setInvoices] = useState([
    { id: "INV-2026-08", period: "August 2026", amount: "₹7,999", plan: "MedERP Pro Hospital Cloud", status: "Paid", date: "01 Aug 2026" },
    { id: "INV-2026-07", period: "July 2026", amount: "₹7,999", plan: "MedERP Pro Hospital Cloud", status: "Paid", date: "01 Jul 2026" }
  ]);

  const copyKeyToClipboard = (id, keyText) => {
    navigator.clipboard.writeText(keyText);
    setCopiedKeyId(id);
    setTimeout(() => setCopiedKeyId(null), 2500);
  };

  const handleGenerateKey = () => {
    const randomHex = Math.random().toString(36).substring(2, 12) + Math.random().toString(36).substring(2, 12);
    const newKeyObj = {
      id: `key_${Date.now()}`,
      name: `API Token #${apiKeys.length + 1}`,
      key: `devsamp_live_pk_${randomHex}`,
      created: "Just now",
      env: "Production"
    };
    setApiKeys([newKeyObj, ...apiKeys]);
  };

  const handleRevokeKey = (id) => {
    setApiKeys(apiKeys.filter((k) => k.id !== id));
  };

  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!newTicket.subject.trim()) return;

    const createdTicket = {
      id: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
      subject: newTicket.subject,
      severity: newTicket.severity,
      status: "Open (Assigned to L3 Pod)",
      created: "Just now",
      sla: "15 min emergency timer"
    };
    setTickets([createdTicket, ...tickets]);
    setIsTicketModalOpen(false);
    setNewTicket({ subject: "", severity: "Normal", message: "", category: "MedERP Pro" });
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!newMember.name.trim() || !newMember.email.trim()) return;
    setTeamMembers([...teamMembers, { ...newMember, status: "Invite Sent" }]);
    setIsTeamModalOpen(false);
    setNewMember({ name: "", email: "", role: "Staff" });
  };

  const simulateDownloadInvoice = (invId) => {
    alert(`Downloading Tax Invoice ${invId} (GST Compliant PDF)...`);
  };

  return (
    <div className="space-y-6">
      
      {/* 1. API KEYS CONSOLE */}
      {tab === "api-keys" && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Developer API Credentials</h3>
              <p className="text-xs text-slate-500">
                Use these tokens to securely authenticate webhook relays and custom integrations.
              </p>
            </div>
            <button
              type="button"
              onClick={handleGenerateKey}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <Plus size={14} />
              <span>Generate New Key</span>
            </button>
          </div>

          <div className="space-y-3">
            {apiKeys.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900">{item.name}</span>
                    <span className="text-[9px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 uppercase">
                      {item.env}
                    </span>
                  </div>
                  <div className="font-mono text-xs text-slate-700 bg-white px-3 py-1.5 rounded-lg border border-slate-200 inline-block max-w-full truncate">
                    {item.key}
                  </div>
                  <div className="text-[10px] text-slate-400">Created: {item.created}</div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => copyKeyToClipboard(item.id, item.key)}
                    className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                  >
                    {copiedKeyId === item.id ? (
                      <>
                        <CheckCircle2 size={13} className="text-emerald-600" />
                        <span className="text-emerald-700 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRevokeKey(item.id)}
                    className="p-2 rounded-xl bg-white hover:bg-red-50 text-slate-400 hover:text-red-600 border border-slate-200 transition-colors cursor-pointer"
                    title="Revoke Key"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. SUPPORT TICKETS CONSOLE */}
      {tab === "tickets" && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Support Tickets & SLA Tracking</h3>
              <p className="text-xs text-slate-500">
                Direct channel to our L3 Senior Engineering Pod with guaranteed SLA timers.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsTicketModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <Plus size={14} />
              <span>Create New Ticket</span>
            </button>
          </div>

          <div className="space-y-3">
            {tickets.map((t) => (
              <div
                key={t.id}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-blue-600">{t.id}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                      t.severity === "High"
                        ? "bg-red-50 text-red-700 border border-red-100"
                        : "bg-slate-100 text-slate-600"
                    }`}>
                      {t.severity} Severity
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                      {t.status}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{t.subject}</h4>
                  <p className="text-[11px] text-slate-500">{t.created} • SLA: {t.sla}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 shadow-2xs">
                    View Thread
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Ticket Creation Modal */}
          {isTicketModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
              <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4">
                <h3 className="text-lg font-bold text-slate-900">Create Support Ticket</h3>
                <form onSubmit={handleCreateTicket} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Issue Subject</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lab HL7 Analyzer not receiving specimen data"
                      value={newTicket.subject}
                      onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:bg-white focus:border-blue-600 font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Severity Level</label>
                      <select
                        value={newTicket.severity}
                        onChange={(e) => setNewTicket({ ...newTicket, severity: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:bg-white focus:border-blue-600 font-medium"
                      >
                        <option value="Critical">Critical (System Down)</option>
                        <option value="High">High (Core Feature Blocked)</option>
                        <option value="Normal">Normal (Inquiry / Config)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Product</label>
                      <select
                        value={newTicket.category}
                        onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:bg-white focus:border-blue-600 font-medium"
                      >
                        <option value="MedERP Pro">MedERP Pro Hospital</option>
                        <option value="POS Retail">Retail POS</option>
                        <option value="Pod Engineering">Pod Retainer</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Detailed Description</label>
                    <textarea
                      rows={4}
                      placeholder="Please describe the steps to reproduce or specific error message..."
                      value={newTicket.message}
                      onChange={(e) => setNewTicket({ ...newTicket, message: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:bg-white focus:border-blue-600 font-medium"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsTicketModalOpen(false)}
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold"
                    >
                      Submit Ticket
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. INVOICES & BILLING CONSOLE */}
      {tab === "invoices" && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Tax Invoices & Payment Receipts</h3>
              <p className="text-xs text-slate-500">
                GST compliant invoices with breakdown of licensed hospital beds and pod retainers.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {invoices.map((inv) => (
              <div
                key={inv.id}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-slate-900">{inv.id}</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                      {inv.status}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{inv.period} — {inv.plan}</h4>
                  <p className="text-xs text-slate-500">Date: {inv.date} • Amount: <strong className="text-slate-900">{inv.amount}</strong> (Incl. GST)</p>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => simulateDownloadInvoice(inv.id)}
                    className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200 flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                  >
                    <Download size={13} />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. TEAM RBAC CONSOLE */}
      {tab === "team" && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Team Members & Permissions (RBAC)</h3>
              <p className="text-xs text-slate-500">
                Manage doctor, pharmacy, and billing team member permissions.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsTeamModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <Plus size={14} />
              <span>Invite Member</span>
            </button>
          </div>

          <div className="space-y-3">
            {teamMembers.map((m, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900">{m.name}</h4>
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                      {m.role}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-mono">{m.email}</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                    {m.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Member Invite Modal */}
          {isTeamModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
              <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
                <h3 className="text-lg font-bold text-slate-900">Invite Team Member</h3>
                <form onSubmit={handleAddMember} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Rajesh Kumar"
                      value={newMember.name}
                      onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:bg-white focus:border-blue-600 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Work Email</label>
                    <input
                      type="email"
                      required
                      placeholder="rajesh@apexcare.com"
                      value={newMember.email}
                      onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:bg-white focus:border-blue-600 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Assigned Role</label>
                    <select
                      value={newMember.role}
                      onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:bg-white focus:border-blue-600 font-medium"
                    >
                      <option value="Administrator">Administrator (Full Access)</option>
                      <option value="Doctor / Clinician">Doctor / Clinician (OPD/IPD)</option>
                      <option value="Pharmacy Manager">Pharmacy Manager (POS/Stock)</option>
                      <option value="Billing Lead">Billing Lead (Invoices)</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsTeamModalOpen(false)}
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold"
                    >
                      Send Invitation
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 5. DEFAULT / OTHER TABS */}
      {tab !== "api-keys" && tab !== "tickets" && tab !== "invoices" && tab !== "team" && (
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900">Console Tab: {tab}</h3>
          <p className="text-xs text-slate-600 leading-relaxed font-normal">
            Your organization settings and data streams for <strong className="font-mono text-blue-600">{tab}</strong> are securely synchronized with the central DevSamp Platform Core.
          </p>
          <div className="pt-2">
            <Link href="/account">
              <button className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold">
                Return to Account Console
              </button>
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
