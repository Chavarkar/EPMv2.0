import { useState } from "react";
import { Card, StatCard, Badge, Progress, Btn } from "../components/UI";

const MeruLogo = () => (
  <svg width="48" height="48" viewBox="0 0 60 60" fill="none">
    <rect width="60" height="60" rx="8" fill="#111" />
    <path d="M8 48 L8 12 L22 32 L30 18 L38 32 L52 12 L52 48" stroke="#E53E3E" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M8 48 L8 44 L52 44 L52 48" fill="#F6C90E"/>
    <circle cx="30" cy="18" r="3" fill="#F6C90E"/>
  </svg>
);

const recentProjects = [
  { name: "MMG Tower A – Dar es Salaam", id: "TZ-MMG-2024-001", status: "In-Progress", progress: 67, budget: "$4.2M", risk: "Medium" },
  { name: "MMG Logistics Hub – Kampala", id: "UG-MMG-2024-002", status: "In-Progress", progress: 34, budget: "$2.8M", risk: "Low" },
  { name: "MMG Warehouse – Nairobi", id: "KE-MMG-2024-003", status: "Delayed", progress: 51, budget: "$1.9M", risk: "High" },
  { name: "MMG Office Complex – Kigali", id: "RW-MMG-2025-001", status: "Active", progress: 12, budget: "$3.5M", risk: "Low" },
  { name: "MMG Plant – Lusaka", id: "ZM-MMG-2025-002", status: "Active", progress: 8, budget: "$5.1M", risk: "Medium" },
];

const alerts = [
  { type: "critical", msg: "Warehouse Nairobi – 3 tasks overdue by 5+ days", time: "2h ago" },
  { type: "warning", msg: "Procurement MR #PR-2024-089 awaiting approval", time: "4h ago" },
  { type: "warning", msg: "Budget overrun detected: Tower A – Civil Works +12%", time: "6h ago" },
  { type: "info", msg: "Risk #RSK-042 mitigation deadline approaching", time: "1d ago" },
];

const moduleCards = [
  { id: "projects", icon: "◈", label: "Project Management", desc: "Gantt, scheduling, tasks, DPR", stat: "5 Active", color: "#E53E3E" },
  { id: "budget", icon: "◉", label: "Budget Tracking", desc: "Committed, actual vs plan", stat: "$17.5M", color: "#F6C90E" },
  { id: "resources", icon: "◎", label: "Resource Management", desc: "Calendars, allocation, scheduling", stat: "43 Resources", color: "#E53E3E" },
  { id: "documents", icon: "◧", label: "Document Management", desc: "Drawings, change requests, center", stat: "128 Docs", color: "#F6C90E" },
  { id: "procurement", icon: "◐", label: "Procurement Tracker", desc: "MR lifecycle, PO, shipment", stat: "17 Active MRs", color: "#E53E3E" },
  { id: "risks", icon: "◬", label: "Risk Management", desc: "Identify, analyze, mitigate risks", stat: "8 Open Risks", color: "#F6C90E" },
  { id: "inventory", icon: "◫", label: "Inventory Management", desc: "GRN, MIR, STS, reconciliation", stat: "4 Inventories", color: "#E53E3E" },
  { id: "reports", icon: "◈", label: "Reports & Analytics", desc: "Comprehensive cross-module reports", stat: "12 Reports", color: "#F6C90E" },
];

export default function Dashboard({ setActiveModule }) {
  return (
    <div className="p-6 space-y-6">

      {/* Hero Banner */}
      <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-lg p-6 flex items-center justify-between" style={{ background: "linear-gradient(135deg, #0d0d0d 0%, #1a0000 100%)" }}>
        <div className="flex items-center gap-5">
          <MeruLogo />
          <div>
            <div className="text-[#E53E3E] text-xs font-bold tracking-[0.4em] uppercase mb-1" style={{ fontFamily: "'Courier New', monospace" }}>
              MOUNT MERU GROUP
            </div>
            <div className="text-white text-2xl font-black tracking-tight">PROTRAK Enterprise</div>
            <div className="text-[#666] text-xs mt-1" style={{ fontFamily: "'Courier New', monospace" }}>
              Construction Management Platform · FY 2025
            </div>
          </div>
        </div>
        <div className="text-right hidden md:block">
          <div className="text-[#F6C90E] text-xs tracking-widest uppercase mb-1" style={{ fontFamily: "'Courier New', monospace" }}>Portfolio Overview</div>
          <div className="text-white text-3xl font-black">5</div>
          <div className="text-[#666] text-xs">Active Projects</div>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Budget" value="$17.5M" sub="Across all projects" accent="red" />
        <StatCard label="Committed" value="$11.2M" sub="64% of total budget" accent="yellow" />
        <StatCard label="Actual Spent" value="$8.9M" sub="51% expenditure rate" accent="white" />
        <StatCard label="Open Risks" value="8" sub="3 High · 4 Medium · 1 Low" accent="red" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Active MRs" value="17" sub="3 awaiting approval" accent="yellow" />
        <StatCard label="Open Change Req." value="6" sub="2 pending HOD review" accent="red" />
        <StatCard label="Resources" value="43" sub="2 over-allocated" accent="white" />
        <StatCard label="Drawings Released" value="89" sub="12 in draft state" accent="yellow" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Projects */}
        <div className="lg:col-span-2">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-bold text-xs tracking-widest uppercase" style={{ fontFamily: "'Courier New', monospace" }}>
                Active Projects
              </h2>
              <Btn variant="ghost" small onClick={() => setActiveModule("projects")}>View All →</Btn>
            </div>
            <div className="space-y-4">
              {recentProjects.map((p) => (
                <div key={p.id} className="border border-[#1a1a1a] rounded p-3 hover:border-[#E53E3E]/30 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="text-white text-sm font-semibold">{p.name}</div>
                      <div className="text-[#555] text-[10px] mt-0.5" style={{ fontFamily: "'Courier New', monospace" }}>{p.id}</div>
                    </div>
                    <div className="flex gap-2">
                      <Badge status={p.status} />
                      <Badge status={p.risk} />
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <Progress value={p.progress} color={p.status === "Delayed" ? "red" : p.progress > 50 ? "yellow" : "white"} />
                    </div>
                    <div className="text-[#555] text-[11px]" style={{ fontFamily: "'Courier New', monospace" }}>{p.budget}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Alerts */}
        <div>
          <Card className="p-5 h-full">
            <h2 className="text-white font-bold text-xs tracking-widest uppercase mb-4" style={{ fontFamily: "'Courier New', monospace" }}>
              Alerts & Notifications
            </h2>
            <div className="space-y-3">
              {alerts.map((a, i) => (
                <div key={i} className={`p-3 rounded border-l-2 ${
                  a.type === "critical" ? "border-[#E53E3E] bg-[#1a0000]" :
                  a.type === "warning" ? "border-[#F6C90E] bg-[#1a1a00]" :
                  "border-[#333] bg-[#0a0a0a]"
                }`}>
                  <div className="text-white text-xs">{a.msg}</div>
                  <div className="text-[#555] text-[10px] mt-1" style={{ fontFamily: "'Courier New', monospace" }}>{a.time}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Module Cards */}
      <div>
        <h2 className="text-white font-bold text-xs tracking-widest uppercase mb-4" style={{ fontFamily: "'Courier New', monospace" }}>
          All Modules
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {moduleCards.map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveModule(m.id)}
              className="bg-[#111] border border-[#1f1f1f] rounded-lg p-4 text-left hover:border-[#E53E3E]/50 hover:bg-[#141414] transition-all group"
            >
              <div className="text-2xl mb-3 group-hover:scale-110 transition-transform" style={{ color: m.color }}>{m.icon}</div>
              <div className="text-white text-xs font-bold mb-1">{m.label}</div>
              <div className="text-[#555] text-[10px] mb-3">{m.desc}</div>
              <div className="text-[11px] font-bold" style={{ color: m.color, fontFamily: "'Courier New', monospace" }}>{m.stat}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
