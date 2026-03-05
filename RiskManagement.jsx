import { useState } from "react";
import { Card, Badge, Progress, Btn, Tab, StatCard, Modal, FormField, Input, Select } from "../components/UI";

const risks = [
  {
    id: "RSK-001", category: "Timeline", description: "Delayed delivery of structural steel from overseas supplier", severity: "High",
    impacted: "Timeline", status: "Analysis Phase", raisedBy: "James Mwangi", raisedOn: "2024-02-10",
    owner: "Alice Hassan", closureDate: "2025-04-30", mitigation: "Identify alternate local supplier; increase procurement lead time.",
    updates: [
      { date: "2024-03-01", remark: "Contacted 3 alternative suppliers. Quotes received.", evidence: true },
      { date: "2024-03-15", remark: "Local supplier confirmed delivery within 3 weeks.", evidence: true },
    ]
  },
  {
    id: "RSK-002", category: "Budget", description: "Cement price escalation due to import duties", severity: "High",
    impacted: "Budget", status: "Mitigation Phase", raisedBy: "Peter Kimani", raisedOn: "2024-03-05",
    owner: "Peter Kimani", closureDate: "2025-05-15", mitigation: "Bulk procurement locked in at current rate; contingency budget reserved.",
    updates: [
      { date: "2024-03-20", remark: "Bulk order placed. Price locked for 6 months.", evidence: true },
    ]
  },
  {
    id: "RSK-003", category: "Quality & Compliance", description: "Subcontractor quality deviation on rebar placement", severity: "Medium",
    impacted: "Quality & Compliance", status: "Department Review", raisedBy: "Site Eng. Bello", raisedOn: "2024-04-10",
    owner: "Unassigned", closureDate: "-", mitigation: "",
    updates: []
  },
  {
    id: "RSK-004", category: "Timeline", description: "Heavy rains forecast during concrete works", severity: "Medium",
    impacted: "Timeline", status: "Closed", raisedBy: "James Mwangi", raisedOn: "2024-01-15",
    owner: "James Mwangi", closureDate: "2024-02-28", mitigation: "Temporary shelters erected. Work rescheduled during dry hours.",
    updates: [
      { date: "2024-02-01", remark: "Shelters installed. Concreting done at 6AM.", evidence: true },
      { date: "2024-02-28", remark: "Risk resolved. No delays incurred.", evidence: false },
    ]
  },
  {
    id: "RSK-005", category: "Compliance", description: "Environmental permit renewal delay", severity: "Low",
    impacted: "Timeline, Budget", status: "Draft", raisedBy: "Alice Uwimana", raisedOn: "2025-01-20",
    owner: "Unassigned", closureDate: "-", mitigation: "",
    updates: []
  },
];

const riskLifecycle = ["Draft", "Department Review", "Analysis Phase", "Mitigation Phase", "Closed"];

export default function RiskManagement() {
  const [activeTab, setActiveTab] = useState("Risk Register");
  const [selectedRisk, setSelectedRisk] = useState(null);
  const [showAddRisk, setShowAddRisk] = useState(false);
  const [showAddUpdate, setShowAddUpdate] = useState(false);

  const open = risks.filter(r => !["Closed", "Void"].includes(r.status));
  const high = risks.filter(r => r.severity === "High" && r.status !== "Closed");
  const medium = risks.filter(r => r.severity === "Medium" && r.status !== "Closed");

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white font-black text-xl tracking-wide">Risk Management</h1>
          <p className="text-[#555] text-xs mt-1 font-mono">Identify · Assess · Mitigate · Monitor project risks</p>
        </div>
        <Btn variant="primary" onClick={() => setShowAddRisk(true)}>+ New Risk</Btn>
      </div>

      <Tab tabs={["Risk Register", "Department Review", "Analysis Phase", "Mitigation & Closure", "Risk Dashboards"]} active={activeTab} setActive={setActiveTab} />

      {activeTab === "Risk Register" && (
        <div>
          <div className="grid grid-cols-4 gap-4 mb-6">
            <StatCard label="Open Risks" value={open.length} accent="red" />
            <StatCard label="High Severity" value={high.length} sub="Immediate action" accent="red" />
            <StatCard label="Medium Severity" value={medium.length} sub="Monitor closely" accent="yellow" />
            <StatCard label="Closed Risks" value={risks.filter(r => r.status === "Closed").length} accent="green" />
          </div>
          <Card>
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1f1f1f]">
                  {["Risk ID", "Category", "Description", "Severity", "Impacted", "Status", "Owner", "Closure Date", "Actions"].map(c => (
                    <th key={c} className="text-left px-3 py-3 text-[10px] font-bold text-[#555] tracking-widest uppercase font-mono">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {risks.map((r) => (
                  <tr key={r.id} className="border-b border-[#111] hover:bg-[#0d0d0d] cursor-pointer" onClick={() => setSelectedRisk(r)}>
                    <td className="px-3 py-3 text-[#F6C90E] text-[11px] font-mono">{r.id}</td>
                    <td className="px-3 py-3 text-[#888] text-xs">{r.category}</td>
                    <td className="px-3 py-3 text-white text-xs max-w-xs">{r.description}</td>
                    <td className="px-3 py-3"><Badge status={r.severity} /></td>
                    <td className="px-3 py-3 text-[#888] text-xs">{r.impacted}</td>
                    <td className="px-3 py-3">
                      <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded
                        ${r.status === "Closed" ? "bg-[#0a2a0a] text-green-400 border border-green-900" :
                          r.status === "Mitigation Phase" ? "bg-[#1a0000] text-[#E53E3E] border border-red-900" :
                          "bg-[#1a1a00] text-[#F6C90E] border border-yellow-900"}`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-[#888] text-xs">{r.owner}</td>
                    <td className="px-3 py-3 text-[#888] text-xs font-mono">{r.closureDate}</td>
                    <td className="px-3 py-3"><Btn variant="ghost" small>View</Btn></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      )}

      {(activeTab === "Department Review" || activeTab === "Analysis Phase") && (
        <div className="space-y-3">
          <div className={`border rounded p-4 text-xs font-mono ${activeTab === "Department Review" ? "bg-[#1a1a00] border-yellow-900 text-[#F6C90E]" : "bg-[#1a0000] border-red-900 text-[#E53E3E]"}`}>
            {activeTab === "Department Review" ? "⚡ Risks awaiting your review and acknowledgment" : "🔬 Risks in analysis – Add mitigation plan, owner, and closure timeline"}
          </div>
          {risks.filter(r => r.status === (activeTab === "Department Review" ? "Department Review" : "Analysis Phase")).map(r => (
            <Card key={r.id} className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-[#F6C90E] text-xs font-mono">{r.id}</div>
                  <div className="text-white font-bold text-sm mt-1">{r.description}</div>
                  <div className="text-[#555] text-xs mt-1">{r.category} · Raised by {r.raisedBy} on {r.raisedOn}</div>
                </div>
                <Badge status={r.severity} />
              </div>
              {activeTab === "Department Review" ? (
                <div className="flex gap-2 mt-3">
                  <Btn variant="secondary" small>Move to Analysis Phase</Btn>
                  <Btn variant="danger" small>Mark as Void</Btn>
                </div>
              ) : (
                <div className="space-y-3">
                  <FormField label="Mitigation Plan">
                    <textarea className="w-full bg-[#0a0a0a] border border-[#2f2f2f] rounded px-3 py-2 text-white text-xs resize-none focus:outline-none focus:border-[#E53E3E]" rows={2} defaultValue={r.mitigation} />
                  </FormField>
                  <div className="flex gap-2">
                    <Btn variant="primary" small>Move to Mitigation Phase</Btn>
                    <Btn variant="ghost" small>Save Progress</Btn>
                  </div>
                </div>
              )}
            </Card>
          ))}
          {risks.filter(r => r.status === (activeTab === "Department Review" ? "Department Review" : "Analysis Phase")).length === 0 && (
            <Card className="p-8 text-center">
              <div className="text-[#555] text-sm font-mono">No risks in this stage</div>
            </Card>
          )}
        </div>
      )}

      {activeTab === "Mitigation & Closure" && (
        <div className="space-y-4">
          {risks.filter(r => r.status === "Mitigation Phase" || r.status === "Closed").map(r => (
            <Card key={r.id} className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#F6C90E] text-xs font-mono">{r.id}</span>
                    <Badge status={r.severity} />
                    <Badge status={r.status} />
                  </div>
                  <div className="text-white font-bold text-sm mt-1">{r.description}</div>
                  <div className="text-[#555] text-xs mt-0.5">Owner: {r.owner} · Target: {r.closureDate}</div>
                </div>
              </div>

              <div className="bg-[#0a0a0a] rounded p-3 mb-4">
                <div className="text-[10px] text-[#555] uppercase font-mono mb-1">Mitigation Plan</div>
                <div className="text-[#888] text-xs">{r.mitigation}</div>
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-[11px] font-bold text-[#888] uppercase font-mono tracking-widest">Mitigation Updates</div>
                  {r.status !== "Closed" && <Btn variant="ghost" small onClick={() => setShowAddUpdate(true)}>+ Add Update</Btn>}
                </div>
                <div className="space-y-2">
                  {r.updates.map((u, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-[#0a0a0a] rounded border-l-2 border-[#E53E3E]/30">
                      <div className="text-[#E53E3E] text-xs font-mono w-20 flex-shrink-0">{u.date}</div>
                      <div className="flex-1 text-[#888] text-xs">{u.remark}</div>
                      {u.evidence && <span className="text-[10px] bg-[#111] border border-[#2f2f2f] px-1.5 py-0.5 rounded text-[#888]">📎 Evidence</span>}
                    </div>
                  ))}
                  {r.updates.length === 0 && <div className="text-[#444] text-xs font-mono">No updates yet</div>}
                </div>
              </div>

              {r.status !== "Closed" && (
                <Btn variant="primary" small>Mark as Closed</Btn>
              )}
            </Card>
          ))}
        </div>
      )}

      {activeTab === "Risk Dashboards" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: "Risk Distribution by Severity", desc: "High / Medium / Low proportion" },
            { title: "Risks by Owner", desc: "Distribution of responsibility across team" },
            { title: "Risk Status Pipeline", desc: "Track resolution progress by stage" },
            { title: "Risks by Impact Area", desc: "Timeline vs Budget vs Quality" },
          ].map(d => (
            <Card key={d.title} className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-white font-bold text-sm">{d.title}</div>
                  <div className="text-[#555] text-xs mt-0.5">{d.desc}</div>
                </div>
                <Btn variant="ghost" small>Expand</Btn>
              </div>
              {/* Simulated chart */}
              <div className="bg-[#0a0a0a] rounded p-4">
                {d.title.includes("Severity") && (
                  <div className="space-y-2">
                    {[["High", 2, "#E53E3E"], ["Medium", 2, "#F6C90E"], ["Low", 1, "#22c55e"]].map(([l, c, col]) => (
                      <div key={l} className="flex items-center gap-2">
                        <div className="w-16 text-[11px] text-[#888] font-mono">{l}</div>
                        <div className="flex-1 h-4 bg-[#111] rounded overflow-hidden">
                          <div className="h-full rounded flex items-center px-2" style={{ width: `${(c/5)*100}%`, background: col }}>
                            <span className="text-[10px] text-white font-mono">{c}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {d.title.includes("Owner") && (
                  <div className="space-y-2">
                    {[["James Mwangi", 2], ["Peter Kimani", 1], ["Alice Hassan", 1], ["Unassigned", 2]].map(([n, c]) => (
                      <div key={n} className="flex items-center gap-2">
                        <div className="w-24 text-[11px] text-[#888] truncate">{n}</div>
                        <div className="flex-1 h-3 bg-[#111] rounded overflow-hidden">
                          <div className="h-full bg-[#E53E3E] rounded" style={{ width: `${(c/3)*100}%` }} />
                        </div>
                        <span className="text-[11px] text-[#888] font-mono w-4">{c}</span>
                      </div>
                    ))}
                  </div>
                )}
                {d.title.includes("Status") && (
                  <div className="flex gap-1 flex-wrap">
                    {riskLifecycle.map(stage => {
                      const count = risks.filter(r => r.status === stage).length;
                      return (
                        <div key={stage} className="bg-[#111] border border-[#1f1f1f] rounded p-2 text-center">
                          <div className="text-[#E53E3E] text-lg font-black font-mono">{count}</div>
                          <div className="text-[#555] text-[9px] font-mono">{stage}</div>
                        </div>
                      );
                    })}
                  </div>
                )}
                {d.title.includes("Impact") && (
                  <div className="space-y-2">
                    {[["Timeline", 3, "#E53E3E"], ["Budget", 2, "#F6C90E"], ["Quality", 1, "#22c55e"]].map(([l, c, col]) => (
                      <div key={l} className="flex items-center gap-2">
                        <div className="w-20 text-[11px] text-[#888]">{l}</div>
                        <div className="flex-1 h-4 bg-[#111] rounded overflow-hidden">
                          <div className="h-full rounded" style={{ width: `${(c/4)*100}%`, background: col }} />
                        </div>
                        <span className="text-[11px] text-[#888] font-mono">{c}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {showAddRisk && (
        <Modal title="Create New Risk" onClose={() => setShowAddRisk(false)}>
          <FormField label="Risk Category"><Select options={["Timeline", "Budget", "Quality & Compliance", "Safety", "Environmental", "Resource"]} /></FormField>
          <FormField label="Description"><Input placeholder="Describe the risk clearly and concisely" /></FormField>
          <FormField label="Severity"><Select options={["High – Requires immediate action", "Medium – Needs monitoring", "Low – Observe and track"]} /></FormField>
          <FormField label="Impacted Area"><Select options={["Timeline", "Budget", "Quality & Compliance", "All"]} /></FormField>
          <FormField label="Project"><Select options={["MMG Tower A", "MMG Logistics Hub", "MMG Warehouse", "MMG Office Complex"]} /></FormField>
          <FormField label="Stakeholders"><Input placeholder="Add team members to notify" /></FormField>
          <FormField label="Initial Mitigation Suggestion"><Input placeholder="Optional early mitigation idea" /></FormField>
          <div className="flex justify-end gap-3 pt-2">
            <Btn variant="ghost" onClick={() => setShowAddRisk(false)}>Save Draft</Btn>
            <Btn variant="primary" onClick={() => setShowAddRisk(false)}>Move to Dept. Review</Btn>
          </div>
        </Modal>
      )}

      {showAddUpdate && (
        <Modal title="Add Mitigation Update" onClose={() => setShowAddUpdate(false)}>
          <FormField label="Date"><Input type="date" /></FormField>
          <FormField label="Progress Remarks"><Input placeholder="What mitigation action was taken?" /></FormField>
          <FormField label="Evidence / Document">
            <div className="w-full border border-dashed border-[#2f2f2f] rounded p-4 text-center text-[#555] text-xs cursor-pointer hover:border-[#E53E3E]">
              📎 Upload evidence (photo, document)
            </div>
          </FormField>
          <div className="flex justify-end gap-3 pt-2">
            <Btn variant="ghost" onClick={() => setShowAddUpdate(false)}>Cancel</Btn>
            <Btn variant="primary" onClick={() => setShowAddUpdate(false)}>Done</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}
