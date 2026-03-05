import { useState } from "react";
import { Card, Badge, Progress, Btn, Tab, StatCard, Modal, FormField, Input, Select } from "../components/UI";

const drawings = [
  { id: "DWG-001", title: "Foundation Plan – Basement Level", project: "MMG Tower A", category: "Structural", discipline: "Civil", status: "Released", version: "Rev 03", drawnBy: "PE Ali Hassan", date: "2024-03-15" },
  { id: "DWG-002", title: "Ground Floor – Column Layout", project: "MMG Tower A", category: "Structural", discipline: "Civil", status: "Released", version: "Rev 02", drawnBy: "PE Ali Hassan", date: "2024-04-01" },
  { id: "DWG-003", title: "Electrical Single Line Diagram", project: "MMG Tower A", category: "MEP", discipline: "Electrical", status: "Draft", version: "Rev 01", drawnBy: "PE Maria K", date: "2024-05-10" },
  { id: "DWG-004", title: "Site Layout Plan", project: "MMG Logistics Hub", category: "Site", discipline: "Civil", status: "Released", version: "Rev 01", drawnBy: "PE Derrick O", date: "2024-03-20" },
  { id: "DWG-005", title: "Roof Plan – PEB Structure", project: "MMG Warehouse", category: "Structural", discipline: "PEB", status: "Released", version: "Rev 02", drawnBy: "PE Sarah N", date: "2024-04-15" },
];

const changeRequests = [
  { id: "CR-001", title: "Increase column size – Grid B4", project: "MMG Tower A", raisedBy: "Business Team", status: "Change Order Approved", severity: "High", date: "2024-03-10" },
  { id: "CR-002", title: "Add emergency exit – Level 2", project: "MMG Tower A", raisedBy: "Project Manager", status: "Review by HOD", severity: "Medium", date: "2024-04-05" },
  { id: "CR-003", title: "Change roof cladding material", project: "MMG Warehouse", raisedBy: "Business Team", status: "Evaluate Impact", severity: "Low", date: "2024-05-01" },
  { id: "CR-004", title: "Shift generator room location", project: "MMG Logistics Hub", raisedBy: "Project Manager", status: "Project Plan Updated", severity: "High", date: "2024-04-20" },
];

const docCenterFolders = [
  { title: "1.0 Design Documents", subfolders: ["1.1 Architectural", "1.2 Structural", "1.3 MEP", "1.4 Landscaping"], files: 34 },
  { title: "2.0 Approvals & Permits", subfolders: ["2.1 Statutory Approvals", "2.2 NOC Documents", "2.3 Environmental Clearance"], files: 18 },
  { title: "3.0 Contracts & Agreements", subfolders: ["3.1 Main Contract", "3.2 Sub-Contracts", "3.3 Vendor Agreements"], files: 12 },
  { title: "4.0 Site Reports", subfolders: ["4.1 DPR Archive", "4.2 Quality Reports", "4.3 Safety Reports"], files: 87 },
];

const crLifecycle = ["Identify Need for Change", "Review by Project Manager", "Evaluate Impact", "Prepare Change Order", "Submit for Approval", "Change Order Approved", "Project Plan Updated", "Change Completed"];

export default function DocumentManagement() {
  const [activeTab, setActiveTab] = useState("Drawings");
  const [selectedCR, setSelectedCR] = useState(null);
  const [showAddDrawing, setShowAddDrawing] = useState(false);
  const [showAddCR, setShowAddCR] = useState(false);
  const [expandedFolder, setExpandedFolder] = useState(null);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white font-black text-xl tracking-wide">Document Management</h1>
          <p className="text-[#555] text-xs mt-1 font-mono">Drawings · Change Requests · Document Center</p>
        </div>
      </div>

      <Tab tabs={["Drawings", "Released Drawings", "Change Requests", "Document Center"]} active={activeTab} setActive={setActiveTab} />

      {activeTab === "Drawings" && (
        <div>
          <div className="grid grid-cols-4 gap-4 mb-6">
            <StatCard label="Total Drawings" value="89" accent="white" />
            <StatCard label="Released" value="72" accent="green" />
            <StatCard label="Draft" value="17" accent="yellow" />
            <StatCard label="Revisions Today" value="3" accent="red" />
          </div>
          <div className="flex justify-end mb-3">
            <Btn variant="primary" onClick={() => setShowAddDrawing(true)}>+ New Drawing</Btn>
          </div>
          <Card>
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1f1f1f]">
                  {["Drawing ID", "Title", "Project", "Category", "Discipline", "Version", "Status", "Date", "Actions"].map(c => (
                    <th key={c} className="text-left px-4 py-3 text-[10px] font-bold text-[#555] tracking-widest uppercase font-mono">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {drawings.map((d) => (
                  <tr key={d.id} className="border-b border-[#111] hover:bg-[#0d0d0d]">
                    <td className="px-4 py-3 text-[#F6C90E] text-[11px] font-mono">{d.id}</td>
                    <td className="px-4 py-3 text-white text-sm">{d.title}</td>
                    <td className="px-4 py-3 text-[#888] text-xs">{d.project}</td>
                    <td className="px-4 py-3 text-[#888] text-xs">{d.category}</td>
                    <td className="px-4 py-3 text-[#888] text-xs">{d.discipline}</td>
                    <td className="px-4 py-3 text-[#888] text-xs font-mono">{d.version}</td>
                    <td className="px-4 py-3"><Badge status={d.status} /></td>
                    <td className="px-4 py-3 text-[#888] text-xs font-mono">{d.date}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        {d.status === "Draft" && <Btn variant="secondary" small>Release</Btn>}
                        {d.status === "Released" && <Btn variant="ghost" small>Revise</Btn>}
                        <Btn variant="ghost" small>Versions</Btn>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      )}

      {activeTab === "Released Drawings" && (
        <Card>
          <div className="px-4 py-3 border-b border-[#1f1f1f]">
            <div className="text-[#555] text-xs font-mono">Site Engineers can only view released drawings · Latest version only</div>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1f1f1f]">
                {["Drawing ID", "Title", "Category", "Latest Version", "Released Date", "View"].map(c => (
                  <th key={c} className="text-left px-4 py-3 text-[10px] font-bold text-[#555] tracking-widest uppercase font-mono">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {drawings.filter(d => d.status === "Released").map((d) => (
                <tr key={d.id} className="border-b border-[#111] hover:bg-[#0d0d0d]">
                  <td className="px-4 py-3 text-[#F6C90E] text-[11px] font-mono">{d.id}</td>
                  <td className="px-4 py-3 text-white text-sm">{d.title}</td>
                  <td className="px-4 py-3 text-[#888] text-xs">{d.category}</td>
                  <td className="px-4 py-3 text-green-400 text-xs font-mono">{d.version}</td>
                  <td className="px-4 py-3 text-[#888] text-xs font-mono">{d.date}</td>
                  <td className="px-4 py-3"><Btn variant="ghost" small>View PDF</Btn></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {activeTab === "Change Requests" && (
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4 mb-2">
            <StatCard label="Total CRs" value="6" accent="white" />
            <StatCard label="Approved" value="2" accent="green" />
            <StatCard label="In Review" value="3" accent="yellow" />
            <StatCard label="Project Log Issues" value="1" accent="red" />
          </div>
          <div className="flex justify-end">
            <Btn variant="primary" onClick={() => setShowAddCR(true)}>+ New Change Request</Btn>
          </div>
          <Card>
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1f1f1f]">
                  {["CR ID", "Title", "Project", "Raised By", "Severity", "Current Status", "Date", "Actions"].map(c => (
                    <th key={c} className="text-left px-4 py-3 text-[10px] font-bold text-[#555] tracking-widest uppercase font-mono">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {changeRequests.map((cr) => (
                  <tr key={cr.id} className="border-b border-[#111] hover:bg-[#0d0d0d] cursor-pointer" onClick={() => setSelectedCR(cr)}>
                    <td className="px-4 py-3 text-[#F6C90E] text-[11px] font-mono">{cr.id}</td>
                    <td className="px-4 py-3 text-white text-sm">{cr.title}</td>
                    <td className="px-4 py-3 text-[#888] text-xs">{cr.project}</td>
                    <td className="px-4 py-3 text-[#888] text-xs">{cr.raisedBy}</td>
                    <td className="px-4 py-3"><Badge status={cr.severity} /></td>
                    <td className="px-4 py-3 text-[#888] text-xs">{cr.status}</td>
                    <td className="px-4 py-3 text-[#888] text-xs font-mono">{cr.date}</td>
                    <td className="px-4 py-3"><Btn variant="ghost" small>View</Btn></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          {selectedCR && (
            <Card className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-[#E53E3E] text-xs font-mono tracking-widest uppercase mb-1">Change Request Lifecycle</div>
                  <div className="text-white font-bold">{selectedCR.title}</div>
                </div>
                <button onClick={() => setSelectedCR(null)} className="text-[#555] hover:text-white">✕</button>
              </div>
              <div className="flex items-center gap-1 overflow-x-auto pb-2">
                {crLifecycle.map((stage, i) => {
                  const currentIdx = crLifecycle.findIndex(s => selectedCR.status.toLowerCase().includes(s.toLowerCase().split(" ")[0]));
                  const isDone = i <= currentIdx;
                  const isCurrent = i === currentIdx;
                  return (
                    <div key={stage} className="flex items-center gap-1 flex-shrink-0">
                      <div className={`px-2 py-1 rounded text-[10px] font-mono font-bold whitespace-nowrap
                        ${isCurrent ? "bg-[#E53E3E] text-white" : isDone ? "bg-[#1a2a0a] text-green-400" : "bg-[#111] text-[#555]"}`}>
                        {stage}
                      </div>
                      {i < crLifecycle.length - 1 && <span className="text-[#333] text-xs">→</span>}
                    </div>
                  );
                })}
              </div>
            </Card>
          )}
        </div>
      )}

      {activeTab === "Document Center" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[#555] text-xs font-mono">Auto-generated document center per project · Organized folder hierarchy</p>
            <div className="flex gap-2">
              <Select value="" onChange={() => {}} options={["MMG Tower A – Dar es Salaam", "MMG Logistics Hub", "MMG Warehouse", "MMG Office Complex"]} />
            </div>
          </div>
          <div className="grid gap-3">
            {docCenterFolders.map((folder, i) => (
              <Card key={i} className="overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-5 py-4 hover:bg-[#141414] transition-colors"
                  onClick={() => setExpandedFolder(expandedFolder === i ? null : i)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[#F6C90E] text-lg">📁</span>
                    <span className="text-white font-semibold text-sm">{folder.title}</span>
                    <span className="text-[#555] text-[11px] font-mono">{folder.files} files</span>
                  </div>
                  <span className="text-[#555] text-xs">{expandedFolder === i ? "▲" : "▼"}</span>
                </button>
                {expandedFolder === i && (
                  <div className="border-t border-[#1f1f1f] px-5 py-3 bg-[#0a0a0a]">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
                      {folder.subfolders.map((sf) => (
                        <div key={sf} className="flex items-center gap-2 p-2 rounded border border-[#1f1f1f] hover:border-[#333] cursor-pointer">
                          <span className="text-[#888]">📂</span>
                          <span className="text-[#888] text-xs hover:text-white transition-colors">{sf}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Btn variant="ghost" small>+ Add Subfolder</Btn>
                      <Btn variant="secondary" small>+ Upload Attachment</Btn>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}

      {showAddDrawing && (
        <Modal title="Add New Drawing" onClose={() => setShowAddDrawing(false)}>
          <FormField label="Drawing Title"><Input placeholder="e.g. Foundation Plan – Basement Level" /></FormField>
          <FormField label="Project"><Select options={["MMG Tower A", "MMG Logistics Hub", "MMG Warehouse", "MMG Office Complex"]} /></FormField>
          <FormField label="Category"><Select options={["Structural", "Architectural", "MEP", "Site", "Landscape"]} /></FormField>
          <FormField label="Discipline"><Select options={["Civil", "Electrical", "Mechanical", "Plumbing", "PEB"]} /></FormField>
          <FormField label="Drawing File">
            <div className="w-full border border-dashed border-[#2f2f2f] rounded p-4 text-center text-[#555] text-xs hover:border-[#E53E3E] cursor-pointer">
              📎 Upload Drawing File (PDF / DWG)
            </div>
          </FormField>
          <div className="flex justify-end gap-3 pt-2">
            <Btn variant="ghost" onClick={() => setShowAddDrawing(false)}>Cancel</Btn>
            <Btn variant="primary" onClick={() => setShowAddDrawing(false)}>Save Drawing</Btn>
          </div>
        </Modal>
      )}

      {showAddCR && (
        <Modal title="Create Change Request" onClose={() => setShowAddCR(false)}>
          <FormField label="CR Title"><Input placeholder="Brief title of the change" /></FormField>
          <FormField label="Project"><Select options={["MMG Tower A", "MMG Logistics Hub", "MMG Warehouse"]} /></FormField>
          <FormField label="Severity"><Select options={["High", "Medium", "Low"]} /></FormField>
          <FormField label="Description"><Input placeholder="Detailed description of the change required" /></FormField>
          <FormField label="Supporting Document">
            <div className="w-full border border-dashed border-[#2f2f2f] rounded p-3 text-center text-[#555] text-xs cursor-pointer hover:border-[#E53E3E]">
              📎 Attach file (optional)
            </div>
          </FormField>
          <div className="flex justify-end gap-3 pt-2">
            <Btn variant="ghost" onClick={() => setShowAddCR(false)}>Cancel</Btn>
            <Btn variant="primary" onClick={() => setShowAddCR(false)}>Save CR</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}
