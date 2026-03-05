import { useState } from "react";
import { Card, Badge, Progress, Btn, Tab, StatCard, Modal, FormField, Input, Select } from "../components/UI";

const mrs = [
  {
    id: "MR-2024-001", title: "TMT Rebar Fe500 – Tower A Foundation", project: "MMG Tower A",
    raisedBy: "Site Eng. Ali", pm: "James Mwangi", status: "Payment Completed", priority: "High",
    date: "2024-01-10", po: "PO-2024-007", blNo: "BL-20240301-XYZ", shipLine: "MSC",
    etd: "2024-03-01", eta: "2024-04-15", paymentPct: 100,
    milestones: ["MR Raised ✓", "MR Approved ✓", "Under Purchase Dept ✓", "Approval Received ✓", "PO Uploaded ✓", "Payment Done ✓", "Doc Compliance ✓", "Shipment Update ✓", "Custom Clearance ✓", "Material Delivered ✓"],
  },
  {
    id: "MR-2024-007", title: "Structural Steel Sections – H-Beams", project: "MMG Logistics Hub",
    raisedBy: "Site Eng. Derrick", pm: "Amina Osei", status: "Shipment Update", priority: "High",
    date: "2024-03-05", po: "PO-2024-018", blNo: "BL-20240520-DEF", shipLine: "Hapag-Lloyd",
    etd: "2024-05-20", eta: "2024-07-01", paymentPct: 80,
    milestones: ["MR Raised ✓", "MR Approved ✓", "Under Purchase Dept ✓", "Approval Received ✓", "PO Uploaded ✓", "Payment Done ✓", "Doc Compliance ✓", "Shipment Update →", "Custom Clearance", "Material Delivered"],
  },
  {
    id: "MR-2024-012", title: "PEB Cladding Sheets – Warehouse Roof", project: "MMG Warehouse",
    raisedBy: "Site Eng. Sarah", pm: "Peter Kimani", status: "MR Approved", priority: "Medium",
    date: "2024-04-15", po: "-", blNo: "-", shipLine: "-",
    etd: "-", eta: "-", paymentPct: 0,
    milestones: ["MR Raised ✓", "MR Approved ✓", "Under Purchase Dept →", "Approval Received", "PO Uploaded", "Payment Done", "Doc Compliance", "Shipment Update", "Custom Clearance", "Material Delivered"],
  },
  {
    id: "MR-2025-003", title: "Electrical Conduits & Trunking", project: "MMG Office Complex",
    raisedBy: "Site Eng. Alice", pm: "Alice Uwimana", status: "MR Raised", priority: "Low",
    date: "2025-01-20", po: "-", blNo: "-", shipLine: "-",
    etd: "-", eta: "-", paymentPct: 0,
    milestones: ["MR Raised →", "MR Approved", "Under Purchase Dept", "Approval Received", "PO Uploaded", "Payment Done", "Doc Compliance", "Shipment Update", "Custom Clearance", "Material Delivered"],
  },
];

const procurementLifecycle = [
  "MR Raised", "MR Approved", "Under Purchase Dept", "Approval Received",
  "Move to Payment", "Payment Done for Dispatch", "Payment Completed",
  "Initiate Document Compliance", "Initiate Shipment Update", "Custom Clearance", "Material Delivered"
];

export default function ProcurementTracker() {
  const [activeTab, setActiveTab] = useState("Material Requisitions");
  const [selectedMR, setSelectedMR] = useState(null);
  const [showNewMR, setShowNewMR] = useState(false);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white font-black text-xl tracking-wide">Procurement Tracker</h1>
          <p className="text-[#555] text-xs mt-1 font-mono">Material Requisition lifecycle · PO · Shipment · Delivery</p>
        </div>
        <Btn variant="primary" onClick={() => setShowNewMR(true)}>+ Raise New MR</Btn>
      </div>

      <Tab tabs={["Material Requisitions", "Actionable Indents", "Payment Tracking", "Shipment Updates", "Reports"]} active={activeTab} setActive={setActiveTab} />

      {activeTab === "Material Requisitions" && (
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4 mb-4">
            <StatCard label="Total MRs" value="17" accent="white" />
            <StatCard label="Awaiting Approval" value="3" accent="yellow" />
            <StatCard label="In Transit" value="4" accent="red" />
            <StatCard label="Delivered" value="8" accent="green" />
          </div>
          <Card>
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1f1f1f]">
                  {["MR ID", "Title", "Project", "Priority", "Status", "Raised By", "PO Number", "Payment %", "Date", "Actions"].map(c => (
                    <th key={c} className="text-left px-3 py-3 text-[10px] font-bold text-[#555] tracking-widest uppercase font-mono">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mrs.map((mr) => (
                  <tr key={mr.id} className="border-b border-[#111] hover:bg-[#0d0d0d] cursor-pointer" onClick={() => setSelectedMR(mr)}>
                    <td className="px-3 py-3 text-[#F6C90E] text-[11px] font-mono">{mr.id}</td>
                    <td className="px-3 py-3 text-white text-sm max-w-xs truncate">{mr.title}</td>
                    <td className="px-3 py-3 text-[#888] text-xs">{mr.project}</td>
                    <td className="px-3 py-3"><Badge status={mr.priority} /></td>
                    <td className="px-3 py-3 text-[#888] text-xs">{mr.status}</td>
                    <td className="px-3 py-3 text-[#888] text-xs">{mr.raisedBy}</td>
                    <td className="px-3 py-3 text-[#888] text-xs font-mono">{mr.po}</td>
                    <td className="px-3 py-3 w-24">
                      <Progress value={mr.paymentPct} color={mr.paymentPct === 100 ? "green" : mr.paymentPct > 50 ? "yellow" : "red"} />
                    </td>
                    <td className="px-3 py-3 text-[#888] text-xs font-mono">{mr.date}</td>
                    <td className="px-3 py-3"><Btn variant="ghost" small>View</Btn></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          {selectedMR && (
            <Card className="p-5 mt-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-[#E53E3E] text-xs font-mono tracking-widest uppercase mb-1">MR Lifecycle – {selectedMR.id}</div>
                  <div className="text-white font-bold text-sm">{selectedMR.title}</div>
                </div>
                <button onClick={() => setSelectedMR(null)} className="text-[#555] hover:text-white">✕</button>
              </div>

              {/* Lifecycle Progress */}
              <div className="overflow-x-auto mb-5">
                <div className="flex gap-1 min-w-max">
                  {selectedMR.milestones.map((m, i) => {
                    const isDone = m.includes("✓");
                    const isCurrent = m.includes("→");
                    return (
                      <div key={i} className="flex items-center gap-1">
                        <div className={`px-2 py-1 rounded text-[10px] font-mono whitespace-nowrap
                          ${isCurrent ? "bg-[#E53E3E] text-white" : isDone ? "bg-[#0a2a0a] text-green-400 border border-green-900" : "bg-[#111] text-[#444]"}`}>
                          {m.replace(" ✓", "").replace(" →", "")}
                        </div>
                        {i < selectedMR.milestones.length - 1 && <span className="text-[#333]">›</span>}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { l: "Project Manager", v: selectedMR.pm },
                  { l: "PO Number", v: selectedMR.po },
                  { l: "BL Number", v: selectedMR.blNo },
                  { l: "Shipping Line", v: selectedMR.shipLine },
                  { l: "ETD", v: selectedMR.etd },
                  { l: "ETA", v: selectedMR.eta },
                  { l: "Payment", v: `${selectedMR.paymentPct}%` },
                  { l: "Priority", v: selectedMR.priority },
                ].map(f => (
                  <div key={f.l} className="bg-[#0a0a0a] rounded p-3">
                    <div className="text-[10px] text-[#555] uppercase font-mono mb-1">{f.l}</div>
                    <div className="text-white text-sm">{f.v}</div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 mt-4">
                <Btn variant="primary" small>Advance Stage</Btn>
                <Btn variant="secondary" small>Upload PO</Btn>
                <Btn variant="ghost" small>Add Sub MR</Btn>
                <Btn variant="ghost" small>Revise MR</Btn>
              </div>
            </Card>
          )}
        </div>
      )}

      {activeTab === "Actionable Indents" && (
        <div className="space-y-3">
          <div className="bg-[#1a1a00] border border-yellow-900 rounded p-4 text-[#F6C90E] text-xs font-mono">
            ⚡ MRs requiring your action based on your role
          </div>
          {mrs.filter(mr => ["MR Raised", "MR Approved", "Shipment Update"].includes(mr.status)).map(mr => (
            <Card key={mr.id} className="p-4 hover:border-[#E53E3E]/40 cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[#F6C90E] text-xs font-mono">{mr.id}</div>
                  <div className="text-white font-semibold text-sm mt-1">{mr.title}</div>
                  <div className="text-[#555] text-xs mt-1">{mr.project} · Raised by {mr.raisedBy}</div>
                </div>
                <div className="text-right">
                  <Badge status={mr.priority} />
                  <div className="text-[#888] text-xs mt-2 font-mono">{mr.status}</div>
                  <Btn variant="primary" small onClick={() => setSelectedMR(mr)}>Take Action →</Btn>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "Payment Tracking" && (
        <Card className="p-5">
          <h3 className="text-white font-bold text-sm mb-4">Payment Stage Tracker</h3>
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1f1f1f]">
                {["MR ID", "Title", "PO Ref", "Payment %", "Dispatch Payment", "Payment Completed", "Status"].map(c => (
                  <th key={c} className="text-left px-4 py-3 text-[10px] font-bold text-[#555] tracking-widest uppercase font-mono">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mrs.map(mr => (
                <tr key={mr.id} className="border-b border-[#111] hover:bg-[#0d0d0d]">
                  <td className="px-4 py-3 text-[#F6C90E] text-[11px] font-mono">{mr.id}</td>
                  <td className="px-4 py-3 text-white text-xs max-w-xs truncate">{mr.title}</td>
                  <td className="px-4 py-3 text-[#888] text-xs font-mono">{mr.po}</td>
                  <td className="px-4 py-3 w-28"><Progress value={mr.paymentPct} color={mr.paymentPct === 100 ? "green" : "yellow"} /></td>
                  <td className="px-4 py-3"><Badge status={mr.paymentPct >= 50 ? "Completed" : "Pending"} /></td>
                  <td className="px-4 py-3"><Badge status={mr.paymentPct === 100 ? "Completed" : "Pending"} /></td>
                  <td className="px-4 py-3 text-[#888] text-xs">{mr.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {activeTab === "Shipment Updates" && (
        <div className="space-y-4">
          {mrs.filter(mr => mr.blNo !== "-").map(mr => (
            <Card key={mr.id} className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-[#E53E3E] text-xs font-mono tracking-widest">SHIPMENT TRACKING</div>
                  <div className="text-white font-bold text-sm mt-1">{mr.title}</div>
                </div>
                <Badge status={mr.priority} />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {[
                  { l: "BL Number", v: mr.blNo },
                  { l: "Shipping Line", v: mr.shipLine },
                  { l: "ETD", v: mr.etd },
                  { l: "ETA", v: mr.eta },
                  { l: "Current Status", v: mr.status },
                ].map(f => (
                  <div key={f.l} className="bg-[#0a0a0a] rounded p-3">
                    <div className="text-[10px] text-[#555] uppercase font-mono mb-1">{f.l}</div>
                    <div className="text-white text-sm">{f.v}</div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-4">
                <Btn variant="ghost" small>Initiate Custom Clearance</Btn>
                <Btn variant="ghost" small>Upload Shipment Doc</Btn>
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "Reports" && (
        <div className="grid grid-cols-2 gap-4">
          {[
            { title: "MR Status Report", desc: "Breakdown of all MRs by status", type: "Pie" },
            { title: "PO Status Report", desc: "MRs under purchase department", type: "Bar" },
          ].map(r => (
            <Card key={r.title} className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-white font-bold text-sm">{r.title}</div>
                  <div className="text-[#555] text-xs mt-0.5">{r.desc}</div>
                </div>
                <div className="flex gap-2">
                  <Btn variant="ghost" small>Refresh</Btn>
                  <Btn variant="secondary" small>Export</Btn>
                </div>
              </div>
              <div className="bg-[#0a0a0a] rounded p-6 text-center">
                <div className="text-6xl mb-3">📊</div>
                <div className="text-[#555] text-xs font-mono">{r.type} Chart – Click refresh to load</div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {showNewMR && (
        <Modal title="Raise New Material Request" onClose={() => setShowNewMR(false)}>
          <FormField label="MR Title"><Input placeholder="e.g. TMT Rebar Fe500 – Phase 2" /></FormField>
          <FormField label="Project"><Select options={["MMG Tower A", "MMG Logistics Hub", "MMG Warehouse", "MMG Office Complex"]} /></FormField>
          <FormField label="Priority"><Select options={["High", "Medium", "Low"]} /></FormField>
          <FormField label="Required Date"><Input type="date" /></FormField>
          <FormField label="Description"><Input placeholder="Material specifications and quantity" /></FormField>
          <FormField label="MR Document">
            <div className="w-full border border-dashed border-[#2f2f2f] rounded p-4 text-center text-[#555] text-xs cursor-pointer hover:border-[#E53E3E]">
              📎 Upload MR Document
            </div>
          </FormField>
          <div className="flex justify-end gap-3 pt-2">
            <Btn variant="ghost" onClick={() => setShowNewMR(false)}>Save Draft</Btn>
            <Btn variant="primary" onClick={() => setShowNewMR(false)}>Raise MR</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}
