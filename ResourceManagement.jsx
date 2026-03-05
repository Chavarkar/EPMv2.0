import { useState } from "react";
import { Card, Badge, Progress, Btn, Tab, StatCard, Modal, FormField, Input, Select } from "../components/UI";

const resources = [
  { id: "RES-001", name: "John Oduya", type: "People", role: "Site Engineer", project: "MMG Tower A", allocation: 80, calendar: "Standard TZ", status: "Active", overAllocated: false },
  { id: "RES-002", name: "Maria Kamau", type: "People", role: "Planning Engineer", project: "MMG Warehouse", allocation: 100, calendar: "Standard KE", status: "Active", overAllocated: false },
  { id: "RES-003", name: "David Ssekandi", type: "People", role: "Site Engineer", project: "MMG Logistics Hub", allocation: 110, calendar: "Standard UG", status: "Active", overAllocated: true },
  { id: "RES-004", name: "Crane – 50T Liebherr", type: "Equipment", role: "Heavy Equipment", project: "MMG Tower A", allocation: 75, calendar: "Standard TZ", status: "Active", overAllocated: false },
  { id: "RES-005", name: "TMT Rebar Fe500", type: "Material", role: "Structural Material", project: "MMG Tower A", allocation: 60, calendar: "N/A", status: "Active", overAllocated: false },
  { id: "RES-006", name: "Sarah Nkemdirim", type: "People", role: "QA Engineer", project: "MMG Office Complex", allocation: 90, calendar: "Standard RW", status: "Active", overAllocated: false },
  { id: "RES-007", name: "Peter Banda", type: "People", role: "Site Engineer", project: "MMG Plant Lusaka", allocation: 115, calendar: "Standard ZM", status: "Active", overAllocated: true },
];

const calendars = [
  { id: "CAL-001", name: "Standard TZ", workDays: "Mon–Sat", hours: "07:00–17:00", holidays: 12, projects: 2 },
  { id: "CAL-002", name: "Standard KE", workDays: "Mon–Fri", hours: "08:00–17:00", holidays: 15, projects: 1 },
  { id: "CAL-003", name: "Standard UG", workDays: "Mon–Sat", hours: "07:00–17:00", holidays: 11, projects: 1 },
  { id: "CAL-004", name: "Standard RW", workDays: "Mon–Fri", hours: "08:00–18:00", holidays: 14, projects: 1 },
];

const allocationData = [
  { task: "Foundation – RCC Work", resource: "John Oduya", from: "Jan 20", to: "Feb 15", effort: "8h/day", pct: 100 },
  { task: "Ground Floor Columns", resource: "David Ssekandi", from: "Mar 01", to: "Apr 30", effort: "9h/day", pct: 110, overAllocated: true },
  { task: "Structural Steel Erection", resource: "Crane – 50T", from: "Mar 10", to: "May 20", effort: "6h/day", pct: 75 },
  { task: "1st Floor Slab", resource: "John Oduya", from: "Apr 01", to: "May 15", effort: "8h/day", pct: 100 },
  { task: "QA Inspection – Phase 1", resource: "Sarah Nkemdirim", from: "May 01", to: "May 30", effort: "7h/day", pct: 90 },
];

export default function ResourceManagement() {
  const [activeTab, setActiveTab] = useState("Resources");
  const [showAddResource, setShowAddResource] = useState(false);
  const [showAddCalendar, setShowAddCalendar] = useState(false);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white font-black text-xl tracking-wide">Resource Management</h1>
          <p className="text-[#555] text-xs mt-1 font-mono">Manage people, equipment, materials, calendars and scheduling</p>
        </div>
        <div className="flex gap-2">
          <Btn variant="ghost" onClick={() => setShowAddCalendar(true)}>+ Create Calendar</Btn>
          <Btn variant="primary" onClick={() => setShowAddResource(true)}>+ Add Resource</Btn>
        </div>
      </div>

      <Tab tabs={["Resources", "Calendars", "Resource Allocation", "Over-Allocation View"]} active={activeTab} setActive={setActiveTab} />

      {activeTab === "Resources" && (
        <div>
          <div className="grid grid-cols-4 gap-4 mb-6">
            <StatCard label="Total Resources" value="43" accent="white" />
            <StatCard label="People" value="31" sub="Site, PE, PM roles" accent="yellow" />
            <StatCard label="Equipment" value="7" sub="Cranes, mixers" accent="red" />
            <StatCard label="Over-Allocated" value="2" sub="Immediate attention" accent="red" />
          </div>
          <Card>
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#1f1f1f]">
              <div className="flex gap-2">
                {["All", "People", "Equipment", "Material"].map(f => (
                  <button key={f} className="text-[11px] px-3 py-1 rounded bg-[#0a0a0a] border border-[#1f1f1f] text-[#888] hover:text-white font-mono">{f}</button>
                ))}
              </div>
              <Btn variant="ghost" small>Bulk Upload CSV</Btn>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1f1f1f]">
                  {["ID", "Name", "Type", "Role", "Current Project", "Allocation %", "Calendar", "Status"].map(c => (
                    <th key={c} className="text-left px-4 py-3 text-[10px] font-bold text-[#555] tracking-widest uppercase font-mono">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {resources.map((r) => (
                  <tr key={r.id} className="border-b border-[#111] hover:bg-[#0d0d0d]">
                    <td className="px-4 py-3 text-[#F6C90E] text-[11px] font-mono">{r.id}</td>
                    <td className="px-4 py-3 text-white text-sm font-semibold">{r.name}</td>
                    <td className="px-4 py-3"><Badge status={r.type} /></td>
                    <td className="px-4 py-3 text-[#888] text-xs">{r.role}</td>
                    <td className="px-4 py-3 text-[#888] text-xs">{r.project}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-[#1f1f1f] rounded overflow-hidden">
                          <div
                            className="h-full rounded"
                            style={{
                              width: `${Math.min(r.allocation, 100)}%`,
                              background: r.overAllocated ? "#E53E3E" : r.allocation > 90 ? "#F6C90E" : "#22c55e"
                            }}
                          />
                        </div>
                        <span className={`text-xs font-mono font-bold ${r.overAllocated ? "text-[#E53E3E]" : "text-[#888]"}`}>
                          {r.allocation}%
                        </span>
                        {r.overAllocated && <span className="text-[#E53E3E] text-[10px]">⚠</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[#888] text-xs font-mono">{r.calendar}</td>
                    <td className="px-4 py-3"><Badge status={r.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      )}

      {activeTab === "Calendars" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
            {calendars.map(cal => (
              <Card key={cal.id} className="p-4 hover:border-[#E53E3E]/40 cursor-pointer transition-colors">
                <div className="text-[#E53E3E] text-xs font-mono font-bold mb-2">{cal.id}</div>
                <div className="text-white font-bold text-sm mb-3">{cal.name}</div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-[#555]">Work Days</span>
                    <span className="text-[#888]">{cal.workDays}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-[#555]">Hours</span>
                    <span className="text-[#888]">{cal.hours}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-[#555]">Holidays</span>
                    <span className="text-[#888]">{cal.holidays}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-[#555]">Projects</span>
                    <span className="text-[#F6C90E]">{cal.projects}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <Card className="p-5">
            <h3 className="text-white font-bold text-sm mb-4">Calendar – Standard TZ (Detail)</h3>
            <div className="grid grid-cols-7 gap-1">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => (
                <div key={d} className={`text-center py-2 rounded text-[11px] font-mono font-bold ${d === "Sun" ? "bg-[#1a0000] text-[#E53E3E]" : "bg-[#0a0a0a] text-green-400"}`}>
                  {d}
                </div>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="bg-[#0a0a0a] rounded p-3">
                <div className="text-[10px] text-[#555] font-mono uppercase mb-1">Working Hours</div>
                <div className="text-white text-sm">07:00 – 17:00 (10h/day)</div>
              </div>
              <div className="bg-[#0a0a0a] rounded p-3">
                <div className="text-[10px] text-[#555] font-mono uppercase mb-1">Upcoming Holiday</div>
                <div className="text-white text-sm">Apr 26 – Union Day (Tanzania)</div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === "Resource Allocation" && (
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold text-sm">Resource Allocation by Task</h3>
            <Btn variant="ghost" small>Switch to Resource View</Btn>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1f1f1f]">
                {["Task", "Resource", "From", "To", "Effort", "Allocation %"].map(c => (
                  <th key={c} className="text-left px-4 py-3 text-[10px] font-bold text-[#555] tracking-widest uppercase font-mono">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allocationData.map((a, i) => (
                <tr key={i} className={`border-b border-[#111] ${a.overAllocated ? "bg-[#1a0000]/50" : "hover:bg-[#0d0d0d]"}`}>
                  <td className="px-4 py-3 text-white text-sm">{a.task}</td>
                  <td className="px-4 py-3 text-[#888] text-xs">
                    <span className={a.overAllocated ? "text-[#E53E3E]" : "text-[#888]"}>{a.resource}</span>
                    {a.overAllocated && <span className="ml-2 text-[10px] bg-[#2a0a0a] text-[#E53E3E] border border-red-900 px-1.5 py-0.5 rounded font-mono">OVER-ALLOCATED</span>}
                  </td>
                  <td className="px-4 py-3 text-[#888] text-xs font-mono">{a.from}</td>
                  <td className="px-4 py-3 text-[#888] text-xs font-mono">{a.to}</td>
                  <td className="px-4 py-3 text-[#888] text-xs">{a.effort}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-[#1a1a1a] rounded overflow-hidden">
                        <div
                          className="h-full rounded"
                          style={{ width: `${Math.min(a.pct, 100)}%`, background: a.overAllocated ? "#E53E3E" : a.pct > 90 ? "#F6C90E" : "#22c55e" }}
                        />
                      </div>
                      <span className={`text-xs font-mono font-bold ${a.overAllocated ? "text-[#E53E3E]" : "text-[#888]"}`}>{a.pct}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {activeTab === "Over-Allocation View" && (
        <div className="space-y-4">
          <div className="bg-[#1a0000] border border-[#E53E3E]/30 rounded p-4 flex items-start gap-3">
            <span className="text-[#E53E3E] text-xl">⚠</span>
            <div>
              <div className="text-[#E53E3E] font-bold text-sm">Over-Allocation Warning</div>
              <div className="text-[#888] text-xs mt-1">The following resources are assigned to overlapping tasks that exceed their working hours. Please reallocate or adjust task schedules.</div>
            </div>
          </div>
          {resources.filter(r => r.overAllocated).map(r => (
            <Card key={r.id} className="p-5 border-[#E53E3E]/30">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#E53E3E] flex items-center justify-center text-white text-xs font-bold">
                    {r.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{r.name}</div>
                    <div className="text-[#555] text-xs font-mono">{r.role} · {r.project}</div>
                  </div>
                </div>
                <div className="text-[#E53E3E] text-2xl font-black font-mono">{r.allocation}%</div>
              </div>
              <div className="w-full h-2 bg-[#1a1a1a] rounded overflow-hidden mb-3">
                <div className="h-full bg-[#E53E3E] rounded" style={{ width: `${Math.min(r.allocation, 100)}%` }} />
              </div>
              <div className="text-[#888] text-xs">
                Resource exceeds 100% allocation. Recommend splitting tasks or adjusting timelines.
              </div>
              <div className="flex gap-2 mt-3">
                <Btn variant="danger" small>Reallocate</Btn>
                <Btn variant="ghost" small>Adjust Timeline</Btn>
              </div>
            </Card>
          ))}
        </div>
      )}

      {showAddResource && (
        <Modal title="Add Resource" onClose={() => setShowAddResource(false)}>
          <FormField label="Resource Name"><Input placeholder="Full name or equipment name" /></FormField>
          <FormField label="Resource Type"><Select options={["People", "Equipment", "Material"]} /></FormField>
          <FormField label="Role / Designation"><Input placeholder="e.g. Site Engineer, Crane 50T" /></FormField>
          <FormField label="Assign Calendar"><Select options={["Standard TZ", "Standard KE", "Standard UG", "Standard RW"]} /></FormField>
          <FormField label="Assign to Project"><Select options={["MMG Tower A", "MMG Logistics Hub", "MMG Warehouse", "MMG Office Complex", "MMG Plant Lusaka"]} /></FormField>
          <div className="flex justify-end gap-3 pt-2">
            <Btn variant="ghost" onClick={() => setShowAddResource(false)}>Cancel</Btn>
            <Btn variant="primary" onClick={() => setShowAddResource(false)}>Save Resource</Btn>
          </div>
        </Modal>
      )}

      {showAddCalendar && (
        <Modal title="Create Calendar" onClose={() => setShowAddCalendar(false)}>
          <FormField label="Calendar Name"><Input placeholder="e.g. Standard TZ, Ramadan Calendar" /></FormField>
          <FormField label="Description"><Input placeholder="Optional description" /></FormField>
          <FormField label="Working Days"><Select options={["Mon–Fri", "Mon–Sat", "Mon–Sun (custom)"]} /></FormField>
          <FormField label="Work Start Time"><Input type="time" /></FormField>
          <FormField label="Work End Time"><Input type="time" /></FormField>
          <div className="flex justify-end gap-3 pt-2">
            <Btn variant="ghost" onClick={() => setShowAddCalendar(false)}>Cancel</Btn>
            <Btn variant="primary" onClick={() => setShowAddCalendar(false)}>Save Calendar</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}
