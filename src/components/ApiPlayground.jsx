"use client";

import { useState } from "react";
import {
  Terminal,
  Play,
  Copy,
  CheckCircle2,
  Code2,
  Sparkles,
  Zap,
  Globe,
  Lock,
  Layers
} from "lucide-react";

const ENDPOINTS = [
  {
    id: "checkin",
    method: "POST",
    path: "/v1/patients/checkin",
    title: "Patient Check-in & Triage Queue",
    desc: "Create an OPD ticket, allocate initial consultation room, and dispatch WhatsApp confirmation.",
    requestPayload: {
      patientId: "PT-99201",
      name: "Ramesh Gupta",
      department: "Cardiology",
      priority: "HIGH",
      doctorCode: "DR-CARDIO-04"
    },
    responsePayload: {
      status: "success",
      statusCode: 200,
      tokenNumber: "OPD-042",
      queuePosition: 3,
      estimatedWaitTimeMinutes: 12,
      assignedDoctor: "Dr. Arvind Mehta",
      consultationRoom: "Room 104 - 1st Floor",
      whatsappDispatched: true,
      timestamp: "2026-08-29T10:45:00.124Z"
    }
  },
  {
    id: "beds",
    method: "GET",
    path: "/v1/hospital/beds?ward=ICU",
    title: "Real-time ICU & IPD Bed Occupancy",
    desc: "Retrieve real-time telemetry, ventilator connection state, and nurse station assignments.",
    requestPayload: null,
    responsePayload: {
      status: "success",
      ward: "ICU-North",
      totalBeds: 24,
      occupiedBeds: 19,
      availableBeds: 5,
      beds: [
        { bedNumber: "ICU-01", status: "OCCUPIED", patientId: "PT-88301", telemetry: "NORMAL", spo2: 98, bpm: 74 },
        { bedNumber: "ICU-02", status: "AVAILABLE", telemetry: "STANDBY" }
      ]
    }
  },
  {
    id: "pos_invoice",
    method: "POST",
    path: "/v1/pos/invoices/generate",
    title: "Sub-Second POS Invoice & Stock Deduct",
    desc: "Generate GST tax invoice, deduct batch inventory, and return ESC/POS print raster.",
    requestPayload: {
      branchCode: "BLR-OUTLET-02",
      items: [
        { sku: "MED-PARACET-500", quantity: 2, unitPrice: 45.00 },
        { sku: "SURG-BANDAGE-M", quantity: 1, unitPrice: 120.00 }
      ],
      paymentMode: "UPI_QR",
      gstin: "29AABCT1332L1ZV"
    },
    responsePayload: {
      status: "success",
      invoiceNumber: "INV-2026-88421",
      subtotal: 210.00,
      cgst: 12.60,
      sgst: 12.60,
      grandTotal: 235.20,
      stockDeducted: true,
      upiQrString: "upi://pay?pa=devsamp@icici&pn=ApexCare&am=235.20",
      thermalPrintBufferLength: 412
    }
  }
];

const LANGUAGES = [
  { id: "curl", label: "cURL" },
  { id: "node", label: "Node.js (Fetch)" },
  { id: "python", label: "Python (Requests)" },
  { id: "go", label: "Go" }
];

export default function ApiPlayground() {
  const [selectedEndpoint, setSelectedEndpoint] = useState(ENDPOINTS[0]);
  const [selectedLang, setSelectedLang] = useState("curl");
  const [copiedCode, setCopiedCode] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [latencyMs, setLatencyMs] = useState(34);

  const getCodeSnippet = (ep, lang) => {
    const baseUrl = "https://api.devsamp.com";
    if (lang === "curl") {
      if (ep.method === "GET") {
        return `curl -X GET "${baseUrl}${ep.path}" \\\n  -H "Authorization: Bearer devsamp_live_pk_884219" \\\n  -H "Accept: application/json"`;
      }
      return `curl -X POST "${baseUrl}${ep.path}" \\\n  -H "Authorization: Bearer devsamp_live_pk_884219" \\\n  -H "Content-Type: application/json" \\\n  -d '${JSON.stringify(ep.requestPayload, null, 2)}'`;
    }

    if (lang === "node") {
      if (ep.method === "GET") {
        return `const res = await fetch("${baseUrl}${ep.path}", {\n  headers: {\n    "Authorization": "Bearer devsamp_live_pk_884219"\n  }\n});\nconst data = await res.json();\nconsole.log(data);`;
      }
      return `const res = await fetch("${baseUrl}${ep.path}", {\n  method: "POST",\n  headers: {\n    "Authorization": "Bearer devsamp_live_pk_884219",\n    "Content-Type": "application/json"\n  },\n  body: JSON.stringify(${JSON.stringify(ep.requestPayload, null, 4)})\n});\nconst data = await res.json();\nconsole.log(data);`;
    }

    if (lang === "python") {
      if (ep.method === "GET") {
        return `import requests\n\nheaders = {"Authorization": "Bearer devsamp_live_pk_884219"}\nres = requests.get("${baseUrl}${ep.path}", headers=headers)\nprint(res.json())`;
      }
      return `import requests\n\npayload = ${JSON.stringify(ep.requestPayload, null, 4)}\nheaders = {\n    "Authorization": "Bearer devsamp_live_pk_884219",\n    "Content-Type": "application/json"\n}\nres = requests.post("${baseUrl}${ep.path}", json=payload, headers=headers)\nprint(res.json())`;
    }

    if (lang === "go") {
      return `package main\n\nimport (\n\t"fmt"\n\t"net/http"\n\t"io/ioutil"\n)\n\nfunc main() {\n\treq, _ := http.NewRequest("${ep.method}", "${baseUrl}${ep.path}", nil)\n\treq.Header.Set("Authorization", "Bearer devsamp_live_pk_884219")\n\tres, _ := http.DefaultClient.Do(req)\n\tbody, _ := ioutil.ReadAll(res.Body)\n\tfmt.Println(string(body))\n}`;
    }

    return "";
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCodeSnippet(selectedEndpoint, selectedLang));
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSendRequest = () => {
    setIsRunning(true);
    setShowResponse(false);
    setTimeout(() => {
      setIsRunning(false);
      setShowResponse(true);
      setLatencyMs(Math.floor(22 + Math.random() * 25));
    }, 450);
  };

  return (
    <div className="bg-slate-950 text-white rounded-3xl border border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6 overflow-hidden">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
              Live Sandbox API Playground
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
            Interactive REST Console
          </h3>
        </div>

        {/* Endpoint Selector Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {ENDPOINTS.map((ep) => {
            const isSelected = selectedEndpoint.id === ep.id;
            return (
              <button
                key={ep.id}
                type="button"
                onClick={() => {
                  setSelectedEndpoint(ep);
                  setShowResponse(false);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <span className={ep.method === "POST" ? "text-emerald-400 mr-1" : "text-blue-300 mr-1"}>{ep.method}</span>
                <span>{ep.path.split("?")[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Endpoint Description Banner */}
      <div className="flex items-center justify-between flex-wrap gap-2 text-xs bg-slate-900/90 p-3 rounded-2xl border border-slate-800/80">
        <div>
          <span className="font-bold text-white">{selectedEndpoint.title}</span>
          <span className="text-slate-400 ml-2 hidden sm:inline">{selectedEndpoint.desc}</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
          <span>Auth: <strong className="text-indigo-400">Bearer Token</strong></span>
          <span>•</span>
          <span>SLA: <strong className="text-emerald-400">&lt;50ms</strong></span>
        </div>
      </div>

      {/* Code Request & Response Two-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Request Snippet & Languages */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.id}
                  type="button"
                  onClick={() => setSelectedLang(lang.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                    selectedLang === lang.id
                      ? "bg-slate-800 text-blue-400 border border-slate-700"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-[11px] font-mono flex items-center gap-1 border border-slate-800 transition-colors cursor-pointer"
              >
                {copiedCode ? <CheckCircle2 size={12} className="text-emerald-400" /> : <Copy size={12} />}
                <span>{copiedCode ? "Copied" : "Copy"}</span>
              </button>

              <button
                type="button"
                onClick={handleSendRequest}
                disabled={isRunning}
                className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md cursor-pointer disabled:opacity-50"
              >
                <Play size={12} fill="currentColor" />
                <span>{isRunning ? "Sending..." : "Send Request"}</span>
              </button>
            </div>
          </div>

          <pre className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-mono text-indigo-300 overflow-x-auto max-h-[280px]">
            {getCodeSnippet(selectedEndpoint, selectedLang)}
          </pre>
        </div>

        {/* Right: Real-time Response Box */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 h-[29px]">
            <span className="font-mono font-bold text-slate-300">Sandbox HTTP Response</span>
            {showResponse && (
              <div className="flex items-center gap-2 font-mono text-[11px]">
                <span className="text-emerald-400 font-bold">200 OK</span>
                <span>•</span>
                <span className="text-slate-400">{latencyMs}ms</span>
              </div>
            )}
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 min-h-[220px] max-h-[280px] overflow-y-auto flex flex-col">
            {isRunning ? (
              <div className="m-auto flex flex-col items-center gap-2 text-slate-400 text-xs font-mono">
                <div className="w-5 h-5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                <span>Executing request against api.devsamp.com sandbox...</span>
              </div>
            ) : showResponse ? (
              <pre className="text-xs font-mono text-emerald-300 leading-relaxed">
                {JSON.stringify(selectedEndpoint.responsePayload, null, 2)}
              </pre>
            ) : (
              <div className="m-auto text-center space-y-2 text-slate-500">
                <Terminal size={24} className="mx-auto text-slate-600" />
                <p className="text-xs font-mono">Click &quot;Send Request&quot; to test live sandbox response.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
