import { useState } from "react";
import { Card, Btn, Tab, StatCard } from "../components/UI";

const reportGroups = [
  {
    module: "Project Management", color: "#E53E3E",
    reports: [
      { name: "Project Status Overview", desc: "All projects, progress, delays", type: "Table + Chart" },
      { name: "Task Completion Rate", desc: "Completed vs pending tasks per project", type: "Bar Chart" },
      { name: "Gantt Summary Report", desc: "Schedule adherence across all projects", type: "Gantt" },
      { name: "Daily Progress Report Archive", desc: "DPR history per project per day", type: "List" },
      { name: "Delayed Tasks Report", desc: "Tasks past due date with delay analysis", type: "Table" },
    ]
  },
  {
    module: "Budget Tracking", color: "#F6C90E",
    reports: [
      { name: "Budget vs Commitment vs Actual", desc: "Full financial comparison by project", type: "Bar Chart" },
      { name: "Budget Utilization by Category", desc: "Labour, Material, Subcontractor breakdown", type: "Pie Chart" },
      { name: "Over-Budget Items", desc: "Budget line items exceeding allocation", type: "Table" },
      { name: "Expenditure Timeline", desc: "Monthly spend trend per project", type: "Line Chart" },
    ]
  },
  {
    module: "Resource Management", color: "#E53E3E",
    reports: [
      { name: "Resource Utilization Report", desc: "Allocation % across all resources", type: "Bar Chart" },
      { name: "Over-Allocation Report", desc: "Resources exceeding 100% allocation", type: "Alert List" },
      { name: "Calendar Adherence", desc: "Holiday & non-working day impact", type: "Table" },
    ]
  },
  {
    module: "Document Management", color: "#F6C90E",
    reports: [
      { name: "Drawing Register Report", desc: "All drawings – draft and released state", type: "Table" },
      { name: "Released Drawings by Category", desc: "Category-wise site drawing breakdown", type: "Pie Chart" },
      { name: "Change Request Status Report", desc: "CR lifecycle progress and resolution", type: "Funnel" },
    ]
  },
  {
    module: "Procurement Tracker", color: "#E53E3E",
    reports: [
      { name: "MR Status Report", desc: "All MRs and their current lifecycle stage", type: "Pie Chart" },
      { name: "PO Status Report", desc: "MRs under purchase department", type: "Bar Chart" },
      { name: "Payment Completion Rate", desc: "Payment milestones per MR", type: "Table" },
      { name: "Shipment Tracking Summary", desc: "BL numbers, ETD/ETA, status", type: "Table" },
    ]
  },
  {
    module: "Risk Management", color: "#F6C90E",
    reports: [
      { name: "Risk Distribution by Severity", desc: "High / Medium / Low proportions", type: "Pie Chart" },
      { name: "Risk by Owner", desc: "Responsibility distribution", type: "Bar Chart" },
      { name: "Risk Status Pipeline", desc: "Stage-wise risk count", type: "Funnel" },
      { name: "Risk by Impact Area", desc: "Timeline vs Budget vs Quality", type: "Pie Chart" },
    ]
  },
  {
    module: "Inventory Management", color: "#E53E3E",
    reports: [
      { name: "Budgeted vs Issued vs Consumed", desc: "Material usage against plan", type: "Bar Chart" },
      { name: "Min Threshold Alert Report", desc: "Materials below minimum stock", type: "Alert Table" },
      { name: "Stock Value Report", desc: "Total inventory value per site", type: "Table" },
      { name: "Material Consumption Report", desc: "Consumption by date range & project", type: "Line Chart" },
      { name: "Stock Inventory Report", desc: "Current stock, avg price, stock value", type: "Table" },
      { name: "MIR / MRR Dashboard", desc: "Issue and return request history", type: "Dashboard" },
      { name: "Reconciliation Report (PDF)", desc: "Auto-generated post-reconciliation", type: "PDF" },
      { name: "Site-to-Site Transfer History", desc: "All STS records per inventory", type: "Table" },
    ]
  },
];

export default function Reports() {
  const [activeModule, setActiveModule] = useState("All");

  const modules = ["All", ...reportGroups.map(r => r.module)];
  const filtered = activeModule === "All" ? reportGroups : reportGroups.filter(r => r.module === activeModule);

  const totalReports = reportGroups.reduce((sum, g) => sum + g.reports.length, 0);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white font-black text-xl tracking-wide">Reports & Analytics</h1>
          <p className="text-[#555] text-xs mt-1 font-mono">Comprehensive cross-module reporting for all stakeholders</p>
        </div>
        <Btn variant="ghost">⬇ Export All Reports</Btn>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Reports" value={totalReports} accent="white" />
        <StatCard label="Modules Covered" value="7" accent="yellow" />
        <StatCard label="Scheduled Reports" value="4" sub="Daily auto-send" accent="red" />
        <StatCard label="Report Formats" value="PDF, Excel, Chart" accent="green" />
      </div>

      {/* Module filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {modules.map(m => (
          <button
            key={m}
            onClick={() => setActiveModule(m)}
            className={`px-4 py-2 rounded text-[11px] font-bold tracking-wider uppercase whitespace-nowrap transition-colors font-mono
              ${activeModule === m ? "bg-[#E53E3E] text-white" : "bg-[#111] border border-[#1f1f1f] text-[#666] hover:text-white"}`}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {filtered.map((group) => (
          <div key={group.module}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1 h-6 rounded" style={{ background: group.color }} />
              <h2 className="text-white font-bold text-sm tracking-widest uppercase font-mono">{group.module}</h2>
              <div className="text-[#444] text-xs font-mono">{group.reports.length} reports</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {group.reports.map((r) => (
                <Card key={r.name} className="p-4 hover:border-[#333] cursor-pointer transition-all group">
                  <div className="flex items-start justify-between mb-2">
                    <div className="text-white font-semibold text-sm group-hover:text-[#E53E3E] transition-colors">{r.name}</div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-[#1f1f1f] text-[#555] flex-shrink-0 ml-2">{r.type}</span>
                  </div>
                  <div className="text-[#555] text-xs mb-3">{r.desc}</div>
                  <div className="flex gap-2">
                    <Btn variant="ghost" small>View</Btn>
                    <Btn variant="ghost" small>Refresh</Btn>
                    <Btn variant="ghost" small>Export</Btn>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
