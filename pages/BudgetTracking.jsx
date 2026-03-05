import { useState } from "react";
import { Card, Badge, Progress, Btn, Tab, StatCard, Modal, FormField, Input, Select } from "../components/UI";

const budgets = [
  {
    id: "BDG-001", project: "MMG Tower A – Dar es Salaam", total: 4200000, committed: 2950000, spent: 2310000,
    lineItems: [
      { id: "BLI-001", wbs: "1.1 – Civil Works", category: "Labour", subCat: "Skilled", area: "Foundation", detail: "Concrete works – basement", budgeted: 520000, committed: 480000, expenditure: 420000 },
      { id: "BLI-002", wbs: "1.2 – Structural", category: "Material", area: "Ground Floor", detail: "Reinforcement bars TMT Fe500", budgeted: 890000, committed: 810000, expenditure: 780000 },
      { id: "BLI-003", wbs: "1.3 – MEP", category: "Subcontractor", area: "Electrical", detail: "Electrical rough-in works", budgeted: 340000, committed: 200000, expenditure: 120000 },
      { id: "BLI-004", wbs: "2.1 – Finishing", category: "Material", area: "Interiors", detail: "Tiles, paint, false ceiling", budgeted: 650000, committed: 310000, expenditure: 180000 },
    ]
  },
];

export default function BudgetTracking() {
  const [activeTab, setActiveTab] = useState("Budgets");
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [showAddLineItem, setShowAddLineItem] = useState(false);
  const [showAddCommitted, setShowAddCommitted] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);

  const b = budgets[0];
  const balance = b.total - b.committed;
  const balancePayment = b.total - b.spent;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white font-black text-xl tracking-wide">Budget Tracking</h1>
          <p className="text-[#555] text-xs mt-1 font-mono">Manage budgets, commitments, and expenditures per project</p>
        </div>
        <Btn variant="primary" onClick={() => setSelectedBudget(b)}>+ Create Budget</Btn>
      </div>

      <Tab tabs={["Budgets", "Budget Line Items", "Committed Amounts", "Expenditures", "Budget Reports"]} active={activeTab} setActive={setActiveTab} />

      {activeTab === "Budgets" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <StatCard label="Total Budget" value="$17.5M" sub="5 projects" accent="white" />
            <StatCard label="Total Committed" value="$11.2M" sub="64% committed" accent="yellow" />
            <StatCard label="Total Spent" value="$8.9M" sub="51% of budget" accent="red" />
            <StatCard label="Balance (Committed)" value="$6.3M" sub="36% remaining" accent="green" />
          </div>
          <Card>
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1f1f1f]">
                  {["Budget ID", "Project", "Budgeted Amount", "Committed", "Expenditure", "Balance (Committed)", "Balance (Payment)", "Action"].map(c => (
                    <th key={c} className="text-left px-4 py-3 text-[10px] font-bold text-[#555] tracking-widest uppercase font-mono">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {budgets.map(bg => (
                  <tr key={bg.id} className="border-b border-[#111] hover:bg-[#0d0d0d] cursor-pointer" onClick={() => { setSelectedBudget(bg); setActiveTab("Budget Line Items"); }}>
                    <td className="px-4 py-3 text-[#F6C90E] text-xs font-mono">{bg.id}</td>
                    <td className="px-4 py-3 text-white text-sm">{bg.project}</td>
                    <td className="px-4 py-3 text-white text-sm font-mono">${(bg.total / 1000).toFixed(0)}K</td>
                    <td className="px-4 py-3 text-[#F6C90E] text-sm font-mono">${(bg.committed / 1000).toFixed(0)}K</td>
                    <td className="px-4 py-3 text-[#E53E3E] text-sm font-mono">${(bg.spent / 1000).toFixed(0)}K</td>
                    <td className="px-4 py-3 text-green-400 text-sm font-mono">${((bg.total - bg.committed) / 1000).toFixed(0)}K</td>
                    <td className="px-4 py-3 text-green-300 text-sm font-mono">${((bg.total - bg.spent) / 1000).toFixed(0)}K</td>
                    <td className="px-4 py-3"><Btn variant="ghost" small>View</Btn></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      )}

      {activeTab === "Budget Line Items" && (
        <div className="space-y-4">
          {/* Summary bar */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-white font-bold text-sm">{b.project}</div>
              <Btn variant="primary" small onClick={() => setShowAddLineItem(true)}>+ Add Budget Line Item</Btn>
            </div>
            <div className="grid grid-cols-5 gap-3">
              {[
                { l: "Budgeted", v: `$${(b.total / 1000).toFixed(0)}K`, color: "text-white" },
                { l: "Committed", v: `$${(b.committed / 1000).toFixed(0)}K`, color: "text-[#F6C90E]" },
                { l: "Expenditure", v: `$${(b.spent / 1000).toFixed(0)}K`, color: "text-[#E53E3E]" },
                { l: "Balance (Committed)", v: `$${(balance / 1000).toFixed(0)}K`, color: "text-green-400" },
                { l: "Balance (Payment)", v: `$${(balancePayment / 1000).toFixed(0)}K`, color: "text-green-300" },
              ].map(s => (
                <div key={s.l} className="bg-[#0a0a0a] rounded p-3">
                  <div className="text-[10px] text-[#555] uppercase font-mono mb-1">{s.l}</div>
                  <div className={`text-sm font-bold font-mono ${s.color}`}>{s.v}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1f1f1f]">
                  {["ID", "WBS", "Category", "Area", "Detail", "Budgeted", "Committed", "Expenditure", "Balance", "Actions"].map(c => (
                    <th key={c} className="text-left px-3 py-3 text-[10px] font-bold text-[#555] tracking-widest uppercase font-mono">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.lineItems.map((li) => {
                  const bal = li.budgeted - li.committed;
                  return (
                    <tr key={li.id} className="border-b border-[#111] hover:bg-[#0d0d0d] transition-colors">
                      <td className="px-3 py-3 text-[#F6C90E] text-[11px] font-mono">{li.id}</td>
                      <td className="px-3 py-3 text-white text-xs">{li.wbs}</td>
                      <td className="px-3 py-3"><Badge status={li.category} /></td>
                      <td className="px-3 py-3 text-[#888] text-xs">{li.area}</td>
                      <td className="px-3 py-3 text-[#888] text-xs max-w-xs truncate">{li.detail}</td>
                      <td className="px-3 py-3 text-white text-xs font-mono">${(li.budgeted / 1000).toFixed(0)}K</td>
                      <td className="px-3 py-3 text-[#F6C90E] text-xs font-mono">${(li.committed / 1000).toFixed(0)}K</td>
                      <td className="px-3 py-3 text-[#E53E3E] text-xs font-mono">${(li.expenditure / 1000).toFixed(0)}K</td>
                      <td className="px-3 py-3 font-mono text-xs" style={{ color: bal >= 0 ? "#22c55e" : "#E53E3E" }}>${(bal / 1000).toFixed(0)}K</td>
                      <td className="px-3 py-3">
                        <div className="flex gap-1">
                          <Btn variant="ghost" small onClick={() => setShowAddCommitted(true)}>+ Commit</Btn>
                          <Btn variant="ghost" small onClick={() => setShowAddExpense(true)}>+ Expense</Btn>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </div>
      )}

      {activeTab === "Committed Amounts" && (
        <Card className="p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-bold text-sm">Commitment Records</h3>
            <Btn variant="primary" small onClick={() => setShowAddCommitted(true)}>+ Add Commitment</Btn>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1f1f1f]">
                {["Line Item", "Category", "Commitment Date", "Committed Amount", "PO / Work Order", "Status"].map(c => (
                  <th key={c} className="text-left px-4 py-3 text-[10px] font-bold text-[#555] tracking-widest uppercase font-mono">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { li: "BLI-001 – Civil Works Labour", cat: "Labour", date: "2024-02-01", amount: 480000, ref: "WO-2024-001", status: "Active" },
                { li: "BLI-002 – Structural Material", cat: "Material", date: "2024-02-15", amount: 810000, ref: "PO-2024-007", status: "Active" },
                { li: "BLI-003 – MEP Subcontractor", cat: "Subcontractor", date: "2024-03-01", amount: 200000, ref: "WO-2024-012", status: "Pending" },
              ].map((c, i) => (
                <tr key={i} className="border-b border-[#111] hover:bg-[#0d0d0d]">
                  <td className="px-4 py-3 text-white text-xs">{c.li}</td>
                  <td className="px-4 py-3"><Badge status={c.cat} /></td>
                  <td className="px-4 py-3 text-[#888] text-xs font-mono">{c.date}</td>
                  <td className="px-4 py-3 text-[#F6C90E] text-sm font-mono font-bold">${(c.amount / 1000).toFixed(0)}K</td>
                  <td className="px-4 py-3 text-[#888] text-xs font-mono">{c.ref}</td>
                  <td className="px-4 py-3"><Badge status={c.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {activeTab === "Expenditures" && (
        <Card className="p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-bold text-sm">Expenditure Records</h3>
            <Btn variant="primary" small onClick={() => setShowAddExpense(true)}>+ Record Expense</Btn>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1f1f1f]">
                {["Commitment Ref", "Payment Date", "Payment Amount", "Transaction Ref", "Attachment", "Recorded By"].map(c => (
                  <th key={c} className="text-left px-4 py-3 text-[10px] font-bold text-[#555] tracking-widest uppercase font-mono">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { ref: "WO-2024-001", date: "2024-03-15", amount: 210000, txRef: "UTR-20240315-ABC", att: "Invoice_001.pdf" },
                { ref: "WO-2024-001", date: "2024-04-20", amount: 210000, txRef: "UTR-20240420-DEF", att: "Invoice_002.pdf" },
                { ref: "PO-2024-007", date: "2024-03-01", amount: 780000, txRef: "PO-PMT-007-01", att: "PO_Receipt_007.pdf" },
              ].map((e, i) => (
                <tr key={i} className="border-b border-[#111] hover:bg-[#0d0d0d]">
                  <td className="px-4 py-3 text-[#F6C90E] text-xs font-mono">{e.ref}</td>
                  <td className="px-4 py-3 text-[#888] text-xs font-mono">{e.date}</td>
                  <td className="px-4 py-3 text-[#E53E3E] text-sm font-mono font-bold">${(e.amount / 1000).toFixed(0)}K</td>
                  <td className="px-4 py-3 text-[#888] text-xs font-mono">{e.txRef}</td>
                  <td className="px-4 py-3 text-[#888] text-xs underline cursor-pointer hover:text-white">📄 {e.att}</td>
                  <td className="px-4 py-3 text-[#888] text-xs">Finance Team</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {activeTab === "Budget Reports" && (
        <div className="space-y-4">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-sm">Budget vs Commitment vs Actual</h3>
              <div className="flex gap-2">
                <Select value="Budget vs Commitment Vs Actual" onChange={() => {}} options={["Budget vs Commitment Vs Actual", "Budget Utilization by Category", "Over-Budget Items"]} />
                <Btn variant="secondary" small>Export</Btn>
              </div>
            </div>
            <div className="space-y-3">
              {b.lineItems.map((li) => (
                <div key={li.id} className="bg-[#0a0a0a] rounded p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-white text-xs font-semibold">{li.wbs} – {li.area}</div>
                    <Badge status={li.category} />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-24 text-[10px] text-[#555] font-mono">Budgeted</div>
                      <div className="flex-1 h-2 bg-[#1a1a1a] rounded overflow-hidden">
                        <div className="h-full bg-white rounded" style={{ width: "100%" }} />
                      </div>
                      <div className="w-20 text-[11px] text-right text-white font-mono">${(li.budgeted / 1000).toFixed(0)}K</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 text-[10px] text-[#555] font-mono">Committed</div>
                      <div className="flex-1 h-2 bg-[#1a1a1a] rounded overflow-hidden">
                        <div className="h-full bg-[#F6C90E] rounded" style={{ width: `${(li.committed / li.budgeted) * 100}%` }} />
                      </div>
                      <div className="w-20 text-[11px] text-right text-[#F6C90E] font-mono">${(li.committed / 1000).toFixed(0)}K</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 text-[10px] text-[#555] font-mono">Actual</div>
                      <div className="flex-1 h-2 bg-[#1a1a1a] rounded overflow-hidden">
                        <div className="h-full bg-[#E53E3E] rounded" style={{ width: `${(li.expenditure / li.budgeted) * 100}%` }} />
                      </div>
                      <div className="w-20 text-[11px] text-right text-[#E53E3E] font-mono">${(li.expenditure / 1000).toFixed(0)}K</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {showAddLineItem && (
        <Modal title="Add Budget Line Item" onClose={() => setShowAddLineItem(false)}>
          <FormField label="Budget WBS"><Select options={["1.1 – Civil Works", "1.2 – Structural", "1.3 – MEP", "2.1 – Finishing"]} /></FormField>
          <FormField label="Category"><Select options={["Labour", "Material", "Subcontractor", "Equipment", "Overhead"]} /></FormField>
          <FormField label="Sub-Category (for Labour)"><Select options={["Skilled", "Unskilled", "Supervisory"]} /></FormField>
          <FormField label="Area (Optional)"><Input placeholder="e.g. Foundation, Ground Floor" /></FormField>
          <FormField label="Detail"><Input placeholder="Short description of budget item" /></FormField>
          <FormField label="Budgeted Amount ($)"><Input type="number" placeholder="e.g. 500000" /></FormField>
          <div className="flex justify-end gap-3 pt-2">
            <Btn variant="ghost" onClick={() => setShowAddLineItem(false)}>Cancel</Btn>
            <Btn variant="primary" onClick={() => setShowAddLineItem(false)}>Save Line Item</Btn>
          </div>
        </Modal>
      )}

      {showAddCommitted && (
        <Modal title="Add Committed Amount" onClose={() => setShowAddCommitted(false)}>
          <FormField label="Commitment Date"><Input type="date" /></FormField>
          <FormField label="Committed Amount ($)"><Input type="number" placeholder="Enter commitment amount" /></FormField>
          <FormField label="Reference (PO / WO No.)"><Input placeholder="e.g. PO-2024-001" /></FormField>
          <div className="flex justify-end gap-3 pt-2">
            <Btn variant="ghost" onClick={() => setShowAddCommitted(false)}>Cancel</Btn>
            <Btn variant="primary" onClick={() => setShowAddCommitted(false)}>Done</Btn>
          </div>
        </Modal>
      )}

      {showAddExpense && (
        <Modal title="Record Expenditure" onClose={() => setShowAddExpense(false)}>
          <FormField label="Payment Date"><Input type="date" /></FormField>
          <FormField label="Payment Amount ($)"><Input type="number" placeholder="Enter payment amount" /></FormField>
          <FormField label="Transaction Reference"><Input placeholder="e.g. Invoice No., UTR, PO No." /></FormField>
          <FormField label="Attachment (Invoice / Receipt)">
            <div className="w-full border border-dashed border-[#2f2f2f] rounded p-4 text-center text-[#555] text-xs hover:border-[#E53E3E] cursor-pointer">
              📎 Click to upload or drag & drop
            </div>
          </FormField>
          <div className="flex justify-end gap-3 pt-2">
            <Btn variant="ghost" onClick={() => setShowAddExpense(false)}>Cancel</Btn>
            <Btn variant="primary" onClick={() => setShowAddExpense(false)}>Save Expense</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}
