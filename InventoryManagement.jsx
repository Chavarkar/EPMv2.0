import { useState } from "react";
import { Card, Badge, Progress, Btn, Tab, StatCard, Modal, FormField, Input, Select } from "../components/UI";

const materials = [
  { id: "MAT-001", name: "TMT Rebar Fe500", code: "MAT-RB-001", category: "Structural Steel", spec: "12mm dia", uom: "MT", stock: 24.5, threshold: 10 },
  { id: "MAT-002", name: "OPC Cement 53 Grade", code: "MAT-CM-001", category: "Civil Material", spec: "50kg bags", uom: "Bags", stock: 450, threshold: 200 },
  { id: "MAT-003", name: "River Sand – Zone II", code: "MAT-SD-001", category: "Civil Material", spec: "Fine aggregate", uom: "CFT", stock: 1800, threshold: 500 },
  { id: "MAT-004", name: "Hollow Block 200mm", code: "MAT-HB-001", category: "Masonry", spec: "200x200x400mm", uom: "Nos", stock: 2400, threshold: 1000 },
  { id: "MAT-005", name: "GI Pipe 25mm", code: "MAT-GP-001", category: "Plumbing", spec: "Class B IS:1239", uom: "Mtrs", stock: 85, threshold: 100 },
  { id: "MAT-006", name: "PVC Conduit 25mm", code: "MAT-PC-001", category: "Electrical", spec: "IS:9537 Grade", uom: "Mtrs", stock: 320, threshold: 150 },
];

const grns = [
  { id: "GRN-001", project: "MMG Tower A", inventory: "TZ-WH-001", date: "2025-02-10", materials: 3, status: "Delivered", challan: "DC-2025-001" },
  { id: "GRN-002", project: "MMG Warehouse", inventory: "KE-WH-001", date: "2025-02-20", materials: 2, status: "Delivered", challan: "DC-2025-007" },
  { id: "GRN-003", project: "MMG Logistics Hub", inventory: "UG-WH-001", date: "2025-03-01", materials: 4, status: "Delivered", challan: "DC-2025-012" },
];

const mirs = [
  { id: "MIR-001", project: "MMG Tower A", contractor: "Ace Contractors", items: 3, status: "Issued", date: "2025-02-15" },
  { id: "MIR-002", project: "MMG Warehouse", contractor: "BuildRight Ltd", items: 2, status: "Pending", date: "2025-03-02" },
];

const mrrs = [
  { id: "MRR-001", project: "MMG Tower A", items: 2, status: "Approved", date: "2025-02-28" },
];

const sts = [
  { id: "STS-001", from: "TZ-WH-001 (Dar es Salaam)", to: "KE-WH-001 (Nairobi)", materials: 2, status: "Dispatched", date: "2025-03-01", challan: "AUTO-GEN" },
];

const inventories = [
  { id: "TZ-WH-001", name: "MMG Tower A – Site Store", project: "MMG Tower A", manager: "John Oduya", status: "Active", items: 18, value: "$124K" },
  { id: "KE-WH-001", name: "MMG Warehouse – Site Store", project: "MMG Warehouse", manager: "Peter Banda", status: "Active", items: 12, value: "$89K" },
  { id: "UG-WH-001", name: "MMG Logistics Hub – Store", project: "MMG Logistics Hub", manager: "Maria K", status: "Active", items: 15, value: "$97K" },
  { id: "RW-WH-001", name: "MMG Office – Site Store", project: "MMG Office Complex", manager: "Sarah N", status: "Under Reconciliation", items: 9, value: "$45K" },
];

export default function InventoryManagement() {
  const [activeTab, setActiveTab] = useState("Material Master");
  const [showAddMaterial, setShowAddMaterial] = useState(false);
  const [showAddGRN, setShowAddGRN] = useState(false);
  const [showAddMIR, setShowAddMIR] = useState(false);
  const [showAddSTS, setShowAddSTS] = useState(false);
  const [showReconciliation, setShowReconciliation] = useState(false);

  const belowThreshold = materials.filter(m => m.stock < m.threshold);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white font-black text-xl tracking-wide">Inventory Management</h1>
          <p className="text-[#555] text-xs mt-1 font-mono">Material Master · GRN · MIR · MRR · STS · Reconciliation</p>
        </div>
      </div>

      {belowThreshold.length > 0 && (
        <div className="bg-[#1a1a00] border border-yellow-900 rounded p-3 mb-4 flex items-center gap-3">
          <span className="text-[#F6C90E]">⚠</span>
          <span className="text-[#F6C90E] text-xs font-mono">
            {belowThreshold.length} material(s) below minimum threshold: {belowThreshold.map(m => m.name).join(", ")}
          </span>
        </div>
      )}

      <Tab tabs={["Material Master", "Goods Receipt Notes", "Material Issue Requests", "Material Return Requests", "Site-to-Site Transfer", "Inventories", "Reconciliation", "Reports"]} active={activeTab} setActive={setActiveTab} />

      {activeTab === "Material Master" && (
        <div>
          <div className="grid grid-cols-4 gap-4 mb-4">
            <StatCard label="Total Materials" value={materials.length} accent="white" />
            <StatCard label="Below Threshold" value={belowThreshold.length} accent="red" />
            <StatCard label="Categories" value="6" accent="yellow" />
            <StatCard label="Inventories" value="4" accent="green" />
          </div>
          <div className="flex justify-end mb-3">
            <div className="flex gap-2">
              <Btn variant="ghost" small>Bulk Upload Excel</Btn>
              <Btn variant="primary" small onClick={() => setShowAddMaterial(true)}>+ Add Material</Btn>
            </div>
          </div>
          <Card>
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1f1f1f]">
                  {["Material ID", "Name", "Code", "Category", "Specifications", "UOM", "Current Stock", "Min Threshold", "Status"].map(c => (
                    <th key={c} className="text-left px-3 py-3 text-[10px] font-bold text-[#555] tracking-widest uppercase font-mono">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {materials.map((m) => {
                  const isLow = m.stock < m.threshold;
                  return (
                    <tr key={m.id} className={`border-b border-[#111] hover:bg-[#0d0d0d] ${isLow ? "bg-[#1a1a00]/20" : ""}`}>
                      <td className="px-3 py-3 text-[#F6C90E] text-[11px] font-mono">{m.id}</td>
                      <td className="px-3 py-3 text-white text-sm font-semibold">{m.name}</td>
                      <td className="px-3 py-3 text-[#888] text-xs font-mono">{m.code}</td>
                      <td className="px-3 py-3 text-[#888] text-xs">{m.category}</td>
                      <td className="px-3 py-3 text-[#888] text-xs">{m.spec}</td>
                      <td className="px-3 py-3 text-[#888] text-xs">{m.uom}</td>
                      <td className="px-3 py-3 font-bold text-sm font-mono" style={{ color: isLow ? "#E53E3E" : "#22c55e" }}>{m.stock}</td>
                      <td className="px-3 py-3 text-[#888] text-xs font-mono">{m.threshold}</td>
                      <td className="px-3 py-3"><Badge status={isLow ? "at-risk" : "active"} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </div>
      )}

      {activeTab === "Goods Receipt Notes" && (
        <div>
          <div className="flex justify-end mb-3">
            <Btn variant="primary" onClick={() => setShowAddGRN(true)}>+ New GRN</Btn>
          </div>
          <Card>
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1f1f1f]">
                  {["GRN ID", "Project", "Inventory", "Date", "Items", "Delivery Challan", "Status", "Actions"].map(c => (
                    <th key={c} className="text-left px-4 py-3 text-[10px] font-bold text-[#555] tracking-widest uppercase font-mono">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {grns.map(g => (
                  <tr key={g.id} className="border-b border-[#111] hover:bg-[#0d0d0d]">
                    <td className="px-4 py-3 text-[#F6C90E] text-[11px] font-mono">{g.id}</td>
                    <td className="px-4 py-3 text-white text-sm">{g.project}</td>
                    <td className="px-4 py-3 text-[#888] text-xs font-mono">{g.inventory}</td>
                    <td className="px-4 py-3 text-[#888] text-xs font-mono">{g.date}</td>
                    <td className="px-4 py-3 text-[#888] text-xs">{g.materials} materials</td>
                    <td className="px-4 py-3 text-[#888] text-xs underline cursor-pointer hover:text-white">📄 {g.challan}</td>
                    <td className="px-4 py-3"><Badge status={g.status} /></td>
                    <td className="px-4 py-3"><Btn variant="ghost" small>View</Btn></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      )}

      {activeTab === "Material Issue Requests" && (
        <div>
          <div className="flex justify-end mb-3">
            <Btn variant="primary" onClick={() => setShowAddMIR(true)}>+ New MIR</Btn>
          </div>
          <Card>
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1f1f1f]">
                  {["MIR ID", "Project", "Contractor", "Items Requested", "Status", "Date", "Actions"].map(c => (
                    <th key={c} className="text-left px-4 py-3 text-[10px] font-bold text-[#555] tracking-widest uppercase font-mono">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mirs.map(m => (
                  <tr key={m.id} className="border-b border-[#111] hover:bg-[#0d0d0d]">
                    <td className="px-4 py-3 text-[#F6C90E] text-[11px] font-mono">{m.id}</td>
                    <td className="px-4 py-3 text-white text-sm">{m.project}</td>
                    <td className="px-4 py-3 text-[#888] text-xs">{m.contractor}</td>
                    <td className="px-4 py-3 text-[#888] text-xs">{m.items}</td>
                    <td className="px-4 py-3"><Badge status={m.status} /></td>
                    <td className="px-4 py-3 text-[#888] text-xs font-mono">{m.date}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <Btn variant="ghost" small>View</Btn>
                        {m.status === "Pending" && <Btn variant="secondary" small>Issue Material</Btn>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      )}

      {activeTab === "Material Return Requests" && (
        <div>
          <div className="flex justify-end mb-3">
            <Btn variant="primary">+ New MRR</Btn>
          </div>
          <Card>
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1f1f1f]">
                  {["MRR ID", "Project", "Items", "Status", "Date", "Actions"].map(c => (
                    <th key={c} className="text-left px-4 py-3 text-[10px] font-bold text-[#555] tracking-widest uppercase font-mono">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mrrs.map(m => (
                  <tr key={m.id} className="border-b border-[#111] hover:bg-[#0d0d0d]">
                    <td className="px-4 py-3 text-[#F6C90E] text-[11px] font-mono">{m.id}</td>
                    <td className="px-4 py-3 text-white text-sm">{m.project}</td>
                    <td className="px-4 py-3 text-[#888] text-xs">{m.items} items</td>
                    <td className="px-4 py-3"><Badge status={m.status} /></td>
                    <td className="px-4 py-3 text-[#888] text-xs font-mono">{m.date}</td>
                    <td className="px-4 py-3"><Btn variant="ghost" small>View</Btn></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      )}

      {activeTab === "Site-to-Site Transfer" && (
        <div>
          <div className="flex justify-end mb-3">
            <Btn variant="primary" onClick={() => setShowAddSTS(true)}>+ New STS</Btn>
          </div>
          <Card>
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1f1f1f]">
                  {["STS ID", "From Inventory", "To Project", "Materials", "Status", "Date", "Delivery Challan", "Actions"].map(c => (
                    <th key={c} className="text-left px-3 py-3 text-[10px] font-bold text-[#555] tracking-widest uppercase font-mono">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sts.map(s => (
                  <tr key={s.id} className="border-b border-[#111] hover:bg-[#0d0d0d]">
                    <td className="px-3 py-3 text-[#F6C90E] text-[11px] font-mono">{s.id}</td>
                    <td className="px-3 py-3 text-[#888] text-xs">{s.from}</td>
                    <td className="px-3 py-3 text-white text-xs">{s.to}</td>
                    <td className="px-3 py-3 text-[#888] text-xs">{s.materials}</td>
                    <td className="px-3 py-3"><Badge status={s.status} /></td>
                    <td className="px-3 py-3 text-[#888] text-xs font-mono">{s.date}</td>
                    <td className="px-3 py-3 text-[#888] text-xs underline cursor-pointer hover:text-white">📄 {s.challan}</td>
                    <td className="px-3 py-3">
                      <div className="flex gap-1">
                        <Btn variant="ghost" small>View</Btn>
                        <Btn variant="secondary" small>Mark Received</Btn>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      )}

      {activeTab === "Inventories" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {inventories.map(inv => (
            <Card key={inv.id} className="p-5 hover:border-[#E53E3E]/30 cursor-pointer transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-[#F6C90E] text-xs font-mono">{inv.id}</div>
                  <div className="text-white font-bold text-sm mt-1">{inv.name}</div>
                  <div className="text-[#555] text-xs mt-0.5">{inv.project}</div>
                </div>
                <Badge status={inv.status === "Under Reconciliation" ? "at-risk" : "active"} />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-[#0a0a0a] rounded p-2">
                  <div className="text-[9px] text-[#555] uppercase font-mono">Store Manager</div>
                  <div className="text-white text-xs mt-0.5">{inv.manager}</div>
                </div>
                <div className="bg-[#0a0a0a] rounded p-2">
                  <div className="text-[9px] text-[#555] uppercase font-mono">Items</div>
                  <div className="text-white text-xs mt-0.5">{inv.items} materials</div>
                </div>
                <div className="bg-[#0a0a0a] rounded p-2">
                  <div className="text-[9px] text-[#555] uppercase font-mono">Stock Value</div>
                  <div className="text-[#F6C90E] text-xs font-mono mt-0.5">{inv.value}</div>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <Btn variant="ghost" small>View Details</Btn>
                {inv.status !== "Under Reconciliation" && <Btn variant="danger" small onClick={() => setShowReconciliation(true)}>Initiate Reconciliation</Btn>}
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "Reconciliation" && (
        <div className="space-y-4">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-[#E53E3E] text-xs font-mono tracking-widest uppercase">Inventory Reconciliation</div>
                <div className="text-white font-bold text-sm mt-1">MMG Office – Site Store (RW-WH-001)</div>
                <div className="text-[#F6C90E] text-xs mt-0.5 font-mono">Status: Under Reconciliation</div>
              </div>
              <div className="bg-[#1a0000] border border-[#E53E3E]/30 rounded p-3 text-center">
                <div className="text-[#E53E3E] text-xs font-mono">⚠ Inventory Locked</div>
                <div className="text-[#555] text-[10px] mt-1">No GRN/MIR/MRR/STS allowed</div>
              </div>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1f1f1f]">
                  {["Material", "System Stock", "Physical Stock", "Current Wastage", "Overall Wastage"].map(c => (
                    <th key={c} className="text-left px-3 py-3 text-[10px] font-bold text-[#555] tracking-widest uppercase font-mono">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {materials.slice(0, 4).map((m, i) => {
                  const physical = [m.stock - 2, m.stock + 5, m.stock, m.stock - 10][i] || m.stock;
                  const wastage = m.stock - physical;
                  return (
                    <tr key={m.id} className="border-b border-[#111]">
                      <td className="px-3 py-3 text-white text-sm">{m.name}</td>
                      <td className="px-3 py-3 text-white text-sm font-mono">{m.stock} {m.uom}</td>
                      <td className="px-3 py-3">
                        <input defaultValue={physical} className="w-24 bg-[#0a0a0a] border border-[#E53E3E]/50 rounded px-2 py-1 text-white text-sm focus:outline-none font-mono" />
                        <span className="text-[#555] text-xs ml-1">{m.uom}</span>
                      </td>
                      <td className="px-3 py-3 font-mono text-sm" style={{ color: wastage > 0 ? "#E53E3E" : "#22c55e" }}>
                        {wastage > 0 ? `+${wastage}` : wastage} {m.uom}
                      </td>
                      <td className="px-3 py-3 text-[#555] text-sm font-mono">—</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex gap-3 mt-4 pt-4 border-t border-[#1f1f1f]">
              <Btn variant="ghost">Complete Reconciliation (No Stock Update)</Btn>
              <Btn variant="primary">Complete Reconciliation & Correct Stock</Btn>
            </div>
          </Card>
        </div>
      )}

      {activeTab === "Reports" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: "Budgeted vs Issued vs Consumed", desc: "Material planning vs actual usage comparison" },
            { title: "Min Threshold Report", desc: "Materials below minimum stock level" },
            { title: "Stock Value Report", desc: "Total value of materials in each inventory" },
            { title: "Material Consumption Report", desc: "Filterable by date range and project" },
            { title: "Stock Inventory Report", desc: "Current stock, average price, stock value" },
            { title: "Material Issue Report", desc: "All MIRs raised per inventory" },
            { title: "Material Return Report", desc: "All MRRs raised per inventory" },
            { title: "Reconciliation Report", desc: "Auto-generated PDF after each reconciliation" },
            { title: "Site-to-Site Transfer History", desc: "All STS records per inventory" },
          ].map(r => (
            <Card key={r.title} className="p-4 hover:border-[#E53E3E]/30 cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-bold text-sm">{r.title}</div>
                  <div className="text-[#555] text-xs mt-0.5">{r.desc}</div>
                </div>
                <Btn variant="secondary" small>View Report</Btn>
              </div>
            </Card>
          ))}
        </div>
      )}

      {showAddGRN && (
        <Modal title="Create Goods Receipt Note" onClose={() => setShowAddGRN(false)}>
          <FormField label="Project"><Select options={["MMG Tower A", "MMG Logistics Hub", "MMG Warehouse"]} /></FormField>
          <FormField label="Delivery Challan">
            <div className="w-full border border-dashed border-[#2f2f2f] rounded p-3 text-center text-[#555] text-xs cursor-pointer hover:border-[#E53E3E]">📎 Upload Delivery Challan</div>
          </FormField>
          <FormField label="Invoice">
            <div className="w-full border border-dashed border-[#2f2f2f] rounded p-3 text-center text-[#555] text-xs cursor-pointer hover:border-[#E53E3E]">📎 Upload Invoice</div>
          </FormField>
          <div className="flex justify-end gap-3 pt-2">
            <Btn variant="ghost" onClick={() => setShowAddGRN(false)}>Cancel</Btn>
            <Btn variant="primary" onClick={() => setShowAddGRN(false)}>Create GRN</Btn>
          </div>
        </Modal>
      )}

      {showAddMaterial && (
        <Modal title="Add Material to Master List" onClose={() => setShowAddMaterial(false)}>
          <FormField label="Material Name"><Input placeholder="e.g. TMT Rebar Fe500" /></FormField>
          <FormField label="Material Code"><Input placeholder="e.g. MAT-RB-001" /></FormField>
          <FormField label="Category"><Select options={["Structural Steel", "Civil Material", "Masonry", "Plumbing", "Electrical", "Finishing"]} /></FormField>
          <FormField label="Specifications"><Input placeholder="e.g. 12mm dia, IS:1786" /></FormField>
          <FormField label="Unit of Measurement (UOM)"><Select options={["MT", "Bags", "Nos", "Mtrs", "CFT", "SqM", "Ltrs", "Kgs"]} /></FormField>
          <div className="flex justify-end gap-3 pt-2">
            <Btn variant="ghost" onClick={() => setShowAddMaterial(false)}>Cancel</Btn>
            <Btn variant="primary" onClick={() => setShowAddMaterial(false)}>Save Material</Btn>
          </div>
        </Modal>
      )}

      {showAddSTS && (
        <Modal title="Create Site-to-Site Transfer" onClose={() => setShowAddSTS(false)}>
          <FormField label="Source Inventory"><Select options={["TZ-WH-001 – MMG Tower A", "KE-WH-001 – MMG Warehouse", "UG-WH-001 – MMG Logistics Hub"]} /></FormField>
          <FormField label="Destination Project"><Select options={["MMG Tower A", "MMG Logistics Hub", "MMG Warehouse", "MMG Office Complex"]} /></FormField>
          <div className="flex justify-end gap-3 pt-2">
            <Btn variant="ghost" onClick={() => setShowAddSTS(false)}>Cancel</Btn>
            <Btn variant="primary" onClick={() => setShowAddSTS(false)}>Raise Transfer Request</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}
