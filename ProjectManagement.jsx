import { useState } from "react";
import { Card, Badge, Progress, Btn, Tab, StatCard, FormField, Input, Select, Modal } from "../components/UI";

const projects = [
  {
    id: "TZ-MMG-2024-001", name: "MMG Tower A – Dar es Salaam", status: "In-Progress",
    progress: 67, budget: 4200000, startDate: "2024-01-15", endDate: "2025-06-30",
    sbu: "RCC", country: "Tanzania", team: 12, subProjects: 3, tasksTotal: 84, tasksCompleted: 56,
    pm: "James Mwangi", site: "Plot 34, Msasani, Dar es Salaam"
  },
  {
    id: "UG-MMG-2024-002", name: "MMG Logistics Hub – Kampala", status: "In-Progress",
    progress: 34, budget: 2800000, startDate: "2024-03-01", endDate: "2025-09-15",
    sbu: "Structural", country: "Uganda", team: 8, subProjects: 2, tasksTotal: 62, tasksCompleted: 21,
    pm: "Amina Osei", site: "Namanve Industrial Area, Kampala"
  },
  {
    id: "KE-MMG-2024-003", name: "MMG Warehouse – Nairobi", status: "Delayed",
    progress: 51, budget: 1900000, startDate: "2024-02-20", endDate: "2025-04-30",
    sbu: "PEB", country: "Kenya", team: 6, subProjects: 1, tasksTotal: 45, tasksCompleted: 23,
    pm: "Peter Kimani", site: "Athi River EPZ, Nairobi"
  },
  {
    id: "RW-MMG-2025-001", name: "MMG Office Complex – Kigali", status: "Active",
    progress: 12, budget: 3500000, startDate: "2025-01-10", endDate: "2026-03-31",
    sbu: "RCC", country: "Rwanda", team: 10, subProjects: 4, tasksTotal: 96, tasksCompleted: 12,
    pm: "Alice Uwimana", site: "Kigali City Center, KN 4 Ave"
  },
];

const tasks = [
  { id: "TSK-001", name: "Site Preparation & Excavation", project: "MMG Tower A", status: "Completed", assignee: "Site Eng. Ali", baseline: "2024-01-20", actual: "2024-01-22", progress: 100, delay: 2 },
  { id: "TSK-002", name: "Foundation – RCC Work", project: "MMG Tower A", status: "Completed", assignee: "Site Eng. Bello", baseline: "2024-02-01", actual: "2024-02-05", progress: 100, delay: 4 },
  { id: "TSK-003", name: "Ground Floor Columns & Beams", project: "MMG Tower A", status: "In-Progress", assignee: "Site Eng. Chidi", baseline: "2024-04-01", actual: "2024-04-03", progress: 78, delay: 0 },
  { id: "TSK-004", name: "1st Floor Slab", project: "MMG Tower A", status: "In-Progress", assignee: "Site Eng. Ali", baseline: "2024-05-01", actual: "2024-05-10", progress: 45, delay: 9 },
  { id: "TSK-005", name: "Electrical Rough-In", project: "MMG Tower A", status: "Pending", assignee: "Unassigned", baseline: "2024-07-01", actual: "-", progress: 0, delay: 0 },
  { id: "TSK-006", name: "Structural Steel Erection", project: "MMG Logistics Hub", status: "In-Progress", assignee: "Site Eng. Derrick", baseline: "2024-05-01", actual: "2024-05-04", progress: 55, delay: 3 },
];

const GanttBar = ({ task, index }) => {
  const startOffset = (index * 3) % 30;
  const width = task.progress < 30 ? 15 : task.progress < 70 ? 25 : 40;
  const colors = { Completed: "#22c55e", "In-Progress": "#F6C90E", Pending: "#444", Delayed: "#E53E3E" };
  const color = colors[task.status] || "#888";
  return (
    <div className="flex items-center gap-2 py-1">
      <div className="w-48 text-[11px] text-[#888] truncate">{task.name}</div>
      <div className="flex-1 relative h-5 bg-[#0a0a0a] rounded overflow-hidden">
        <div className="absolute h-full rounded opacity-20" style={{ left: `${startOffset}%`, width: `${width + 20}%`, background: "#333" }} />
        <div className="absolute h-full rounded" style={{ left: `${startOffset}%`, width: `${width * (task.progress / 100)}%`, background: color, opacity: 0.9 }} />
      </div>
      <div className="w-10 text-[11px] text-right" style={{ color, fontFamily: "'Courier New', monospace" }}>{task.progress}%</div>
    </div>
  );
};

const dprEntries = [
  { date: "2025-03-04", location: "Ground Floor – Grid A-D", weather: "Sunny", planned: "Concreting Column C3", actual: "Concreting C3 completed", manpower: 18, delay: "None" },
  { date: "2025-03-03", location: "Basement – East Wing", weather: "Partly Cloudy", planned: "Waterproofing works", actual: "Partial – 60% done", manpower: 12, delay: "Material shortage – 2hrs" },
  { date: "2025-03-02", location: "Foundation Zone B", weather: "Sunny", planned: "Rebar placement", actual: "Completed as planned", manpower: 20, delay: "None" },
];

export default function ProjectManagement() {
  const [activeTab, setActiveTab] = useState("Projects");
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [ganttProject, setGanttProject] = useState("MMG Tower A");

  const tabs = ["Projects", "Schedule / Gantt", "Tasks", "Work Progress", "Daily Progress Report"];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white font-black text-xl tracking-wide">Project Management</h1>
          <p className="text-[#555] text-xs mt-1" style={{ fontFamily: "'Courier New', monospace" }}>
            Manage projects, scheduling, tasks, and progress reporting
          </p>
        </div>
        <Btn variant="primary" onClick={() => setShowModal(true)}>+ New Project</Btn>
      </div>

      <Tab tabs={tabs} active={activeTab} setActive={setActiveTab} />

      {/* PROJECTS TAB */}
      {activeTab === "Projects" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <StatCard label="Total Projects" value="5" accent="white" />
            <StatCard label="On Track" value="3" accent="green" />
            <StatCard label="Delayed" value="1" accent="red" />
            <StatCard label="Total Tasks" value="287" sub="142 completed" accent="yellow" />
          </div>
          <Card>
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1f1f1f]">
                  {["Project ID", "Name", "Country", "SBU", "PM", "Progress", "Status", "Budget", "Actions"].map(c => (
                    <th key={c} className="text-left px-4 py-3 text-[10px] font-bold text-[#555] tracking-widest uppercase" style={{ fontFamily: "'Courier New', monospace" }}>{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p.id} className="border-b border-[#111] hover:bg-[#0d0d0d] transition-colors cursor-pointer" onClick={() => setSelectedProject(p)}>
                    <td className="px-4 py-3 text-[#F6C90E] text-[11px] font-mono">{p.id}</td>
                    <td className="px-4 py-3 text-white text-sm font-semibold">{p.name}</td>
                    <td className="px-4 py-3 text-[#888] text-xs">{p.country}</td>
                    <td className="px-4 py-3 text-[#888] text-xs">{p.sbu}</td>
                    <td className="px-4 py-3 text-[#888] text-xs">{p.pm}</td>
                    <td className="px-4 py-3 w-32"><Progress value={p.progress} color={p.status === "Delayed" ? "red" : "yellow"} /></td>
                    <td className="px-4 py-3"><Badge status={p.status} /></td>
                    <td className="px-4 py-3 text-[#888] text-xs font-mono">${(p.budget / 1000000).toFixed(1)}M</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <Btn variant="ghost" small>View</Btn>
                        <Btn variant="ghost" small>Edit</Btn>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          {selectedProject && (
            <Card className="p-5 mt-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold text-sm">{selectedProject.name}</h3>
                <button onClick={() => setSelectedProject(null)} className="text-[#555] hover:text-white">✕</button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { l: "Project ID", v: selectedProject.id },
                  { l: "SBU Type", v: selectedProject.sbu },
                  { l: "Country", v: selectedProject.country },
                  { l: "Site", v: selectedProject.site },
                  { l: "Project Manager", v: selectedProject.pm },
                  { l: "Start Date", v: selectedProject.startDate },
                  { l: "End Date", v: selectedProject.endDate },
                  { l: "Team Members", v: selectedProject.team },
                  { l: "Sub-Projects", v: selectedProject.subProjects },
                  { l: "Total Tasks", v: selectedProject.tasksTotal },
                  { l: "Completed Tasks", v: selectedProject.tasksCompleted },
                  { l: "Budget", v: `$${(selectedProject.budget / 1000000).toFixed(1)}M` },
                ].map(item => (
                  <div key={item.l} className="bg-[#0a0a0a] rounded p-3">
                    <div className="text-[#555] text-[10px] tracking-widest uppercase mb-1" style={{ fontFamily: "'Courier New', monospace" }}>{item.l}</div>
                    <div className="text-white text-sm font-semibold">{item.v}</div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      )}

      {/* GANTT TAB */}
      {activeTab === "Schedule / Gantt" && (
        <div className="space-y-4">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h3 className="text-white font-bold text-sm tracking-wide">Gantt Chart</h3>
                <select
                  className="bg-[#0a0a0a] border border-[#2f2f2f] rounded px-3 py-1.5 text-white text-xs focus:outline-none focus:border-[#E53E3E]"
                  value={ganttProject}
                  onChange={e => setGanttProject(e.target.value)}
                >
                  {projects.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                </select>
              </div>
              <div className="flex gap-2">
                <Btn variant="ghost" small>Import MPP</Btn>
                <Btn variant="ghost" small>Update Baseline</Btn>
                <Btn variant="secondary" small>Export</Btn>
              </div>
            </div>

            {/* Month headers */}
            <div className="flex gap-2 mb-2 ml-52">
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"].map(m => (
                <div key={m} className="flex-1 text-center text-[10px] text-[#555] font-mono">{m}</div>
              ))}
            </div>

            <div className="space-y-1">
              {tasks.filter(t => t.project === ganttProject).concat(tasks.filter(t => t.project !== ganttProject).slice(0, 2)).map((t, i) => (
                <GanttBar key={t.id} task={t} index={i} />
              ))}
            </div>

            <div className="flex gap-4 mt-4 pt-4 border-t border-[#1f1f1f]">
              {[["Completed", "#22c55e"], ["In-Progress", "#F6C90E"], ["Pending", "#444"], ["Delayed", "#E53E3E"]].map(([l, c]) => (
                <div key={l} className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded" style={{ background: c }} />
                  <span className="text-[11px] text-[#666]">{l}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* TASKS TAB */}
      {activeTab === "Tasks" && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-2">
              {["All Tasks", "Actionable Tasks", "Today's Tasks", "Active Tasks", "Completed Tasks", "Delayed Tasks"].map(f => (
                <button key={f} className="text-[11px] px-3 py-1.5 rounded bg-[#111] border border-[#1f1f1f] text-[#888] hover:text-white hover:border-[#333] transition-colors font-mono">
                  {f}
                </button>
              ))}
            </div>
            <Btn variant="ghost" small>+ Add Task</Btn>
          </div>
          <Card>
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1f1f1f]">
                  {["Task ID", "Task Name", "Project", "Assignee", "Baseline Start", "Actual Start", "Progress", "Delay (days)", "Status"].map(c => (
                    <th key={c} className="text-left px-4 py-3 text-[10px] font-bold text-[#555] tracking-widest uppercase font-mono">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tasks.map((t) => (
                  <tr key={t.id} className="border-b border-[#111] hover:bg-[#0d0d0d] transition-colors">
                    <td className="px-4 py-3 text-[#F6C90E] text-[11px] font-mono">{t.id}</td>
                    <td className="px-4 py-3 text-white text-sm">{t.name}</td>
                    <td className="px-4 py-3 text-[#888] text-xs">{t.project}</td>
                    <td className="px-4 py-3 text-[#888] text-xs">{t.assignee}</td>
                    <td className="px-4 py-3 text-[#888] text-xs font-mono">{t.baseline}</td>
                    <td className="px-4 py-3 text-[#888] text-xs font-mono">{t.actual}</td>
                    <td className="px-4 py-3 w-28"><Progress value={t.progress} color={t.status === "Delayed" ? "red" : t.progress === 100 ? "green" : "yellow"} /></td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-mono font-bold ${t.delay > 0 ? "text-[#E53E3E]" : "text-[#555]"}`}>
                        {t.delay > 0 ? `+${t.delay}` : "–"}
                      </span>
                    </td>
                    <td className="px-4 py-3"><Badge status={t.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      )}

      {/* WORK PROGRESS TAB */}
      {activeTab === "Work Progress" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <p className="text-[#555] text-xs font-mono">Log daily work progress for assigned tasks</p>
            <Btn variant="primary" small>+ Add Work Progress</Btn>
          </div>
          <Card className="p-5">
            <h3 className="text-white font-bold text-sm mb-4">Work Progress Entries</h3>
            <div className="space-y-3">
              {[
                { task: "Ground Floor Columns & Beams", date: "2025-03-04", qty: "12 nos", manpower: "18 workers", contractor: "Ace Contractors", desc: "Completed 4 columns in Grid B-D. No delays.", photo: true },
                { task: "1st Floor Slab", date: "2025-03-04", qty: "45 m²", manpower: "22 workers", contractor: "BuildRight Ltd", desc: "Partial concreting – NE section done. Waiting for rebar.", photo: true },
                { task: "Structural Steel Erection", date: "2025-03-03", qty: "6 tons", manpower: "15 workers", contractor: "SteelTech", desc: "Erection of primary beams completed in Zone A.", photo: false },
              ].map((wp, i) => (
                <div key={i} className="bg-[#0a0a0a] rounded p-4 border border-[#1a1a1a]">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-white font-semibold text-sm">{wp.task}</div>
                      <div className="text-[#555] text-[10px] font-mono mt-1">{wp.date} · {wp.contractor}</div>
                    </div>
                    <div className="flex gap-2">
                      {wp.photo && <span className="text-xs bg-[#111] border border-[#2f2f2f] px-2 py-0.5 rounded text-[#888]">📷 Photo</span>}
                      <Badge status="Completed" />
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-3">
                    <div><div className="text-[10px] text-[#555] uppercase font-mono">Quantity</div><div className="text-white text-xs mt-0.5">{wp.qty}</div></div>
                    <div><div className="text-[10px] text-[#555] uppercase font-mono">Manpower</div><div className="text-white text-xs mt-0.5">{wp.manpower}</div></div>
                    <div><div className="text-[10px] text-[#555] uppercase font-mono">Notes</div><div className="text-[#888] text-xs mt-0.5">{wp.desc}</div></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* DPR TAB */}
      {activeTab === "Daily Progress Report" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[#555] text-xs font-mono">Auto-generated daily at 11:00 AM · One DPR per project per day</p>
            <Btn variant="secondary" small>Generate DPR</Btn>
          </div>
          <div className="grid gap-4">
            {dprEntries.map((dpr, i) => (
              <Card key={i} className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-[#E53E3E] text-xs font-mono tracking-widest uppercase">Daily Progress Report</div>
                    <div className="text-white font-bold text-sm mt-0.5">{dpr.date} – MMG Tower A</div>
                  </div>
                  <div className="flex gap-2">
                    <Btn variant="ghost" small>Preview</Btn>
                    <Btn variant="ghost" small>Export PDF</Btn>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { l: "Location of Work", v: dpr.location },
                    { l: "Weather Conditions", v: dpr.weather },
                    { l: "Planned Work", v: dpr.planned },
                    { l: "Actual Work Done", v: dpr.actual },
                    { l: "Manpower Deployed", v: `${dpr.manpower} workers` },
                    { l: "Delay Reported", v: dpr.delay },
                  ].map(f => (
                    <div key={f.l} className="bg-[#0a0a0a] rounded p-3">
                      <div className="text-[10px] text-[#555] uppercase font-mono mb-1">{f.l}</div>
                      <div className="text-white text-xs">{f.v}</div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* New Project Modal */}
      {showModal && (
        <Modal title="Create New Project" onClose={() => setShowModal(false)}>
          <div className="space-y-3">
            <FormField label="Project Name"><Input placeholder="e.g. MMG Warehouse – Lusaka" /></FormField>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Country">
                <Select options={["Tanzania", "Kenya", "Uganda", "Rwanda", "Zambia", "Ethiopia"]} />
              </FormField>
              <FormField label="SBU Code">
                <Select options={["RCC", "Structural", "PEB", "Other"]} />
              </FormField>
            </div>
            <FormField label="Site Address"><Input placeholder="Plot/Street, City" /></FormField>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Project Budget ($)"><Input type="number" placeholder="e.g. 5000000" /></FormField>
              <FormField label="Project Manager">
                <Select options={["James Mwangi", "Amina Osei", "Peter Kimani", "Alice Uwimana"]} />
              </FormField>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Start Date"><Input type="date" /></FormField>
              <FormField label="End Date"><Input type="date" /></FormField>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Btn variant="ghost" onClick={() => setShowModal(false)}>Cancel</Btn>
              <Btn variant="primary" onClick={() => setShowModal(false)}>Save Project</Btn>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
