import { Card, StatCard, Badge, Btn, SectionTitle, Table } from "../components/UI";

const stats = [
  { label: "Active Projects", value: "5", trend: 12, icon: "📊" },
  { label: "Total Budget", value: "$17.5M", trend: -2, icon: "💰" },
  { label: "Team Members", value: "43", trend: 8, icon: "👥" },
  { label: "Completion Rate", value: "67%", trend: 5, icon: "✅" },
];

const recentProjects = [
  { name: "MMG Tower A – Dar es Salaam", id: "TZ-MMG-2024-001", status: "In-Progress", progress: 67, budget: "$4.2M" },
  { name: "MMG Logistics Hub – Kampala", id: "UG-MMG-2024-002", status: "In-Progress", progress: 34, budget: "$2.8M" },
  { name: "MMG Warehouse – Nairobi", id: "KE-MMG-2024-003", status: "Delayed", progress: 51, budget: "$1.9M" },
  { name: "MMG Office Complex – Kigali", id: "RW-MMG-2025-001", status: "Active", progress: 12, budget: "$3.5M" },
  { name: "MMG Plant – Lusaka", id: "ZM-MMG-2025-002", status: "Active", progress: 8, budget: "$5.1M" },
];

const alerts = [
  { type: "critical", msg: "Warehouse Nairobi – 3 tasks overdue by 5+ days", time: "2h ago" },
  { type: "warning", msg: "Procurement MR #PR-2024-089 awaiting approval", time: "4h ago" },
  { type: "warning", msg: "Budget overrun detected: Tower A – Civil Works +12%", time: "6h ago" },
  { type: "info", msg: "Risk #RSK-042 mitigation deadline approaching", time: "1d ago" },
];

const moduleCards = [
  { id: "projects", icon: "📋", label: "Projects", desc: "Manage timelines & tasks", stat: "5 Active" },
  { id: "budget", icon: "💰", label: "Budget", desc: "Track costs & spending", stat: "$17.5M" },
  { id: "resources", icon: "👥", label: "Resources", desc: "Allocate team members", stat: "43 Users" },
  { id: "documents", icon: "📄", label: "Documents", desc: "Store & organize files", stat: "128 Files" },
  { id: "procurement", icon: "🛒", label: "Procurement", desc: "Purchase orders & tracking", stat: "17 MRs" },
  { id: "risks", icon: "⚠️", label: "Risks", desc: "Identify & mitigate issues", stat: "8 Open" },
  { id: "inventory", icon: "📦", label: "Inventory", desc: "Stock & supply management", stat: "4 Sites" },
  { id: "reports", icon: "📈", label: "Reports", desc: "Analytics & dashboards", stat: "12 Reports" },
];

export default function Dashboard({ setActiveModule }) {
  const getAlertColor = (type) => {
    switch (type) {
      case "critical": return "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800";
      case "warning": return "bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800";
      case "info": return "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800";
      default: return "bg-slate-50 dark:bg-slate-800";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "In-Progress": return "primary";
      case "Active": return "success";
      case "Delayed": return "danger";
      default: return "default";
    }
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50">Welcome back</h1>
        <p className="text-slate-600 dark:text-slate-400">Here's an overview of your enterprise projects</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      {/* Alerts Section */}
      {alerts.length > 0 && (
        <div className="space-y-4">
          <SectionTitle>Active Alerts</SectionTitle>
          <div className="space-y-3">
            {alerts.map((alert, idx) => (
              <div key={idx} className={`border rounded-lg p-4 flex items-start gap-4 ${getAlertColor(alert.type)}`}>
                <div className="text-2xl mt-1">
                  {alert.type === "critical" && "🔴"}
                  {alert.type === "warning" && "🟡"}
                  {alert.type === "info" && "🔵"}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{alert.msg}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Projects */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <SectionTitle>Recent Projects</SectionTitle>
          <Btn variant="primary" onClick={() => setActiveModule("projects")}>
            View All Projects
          </Btn>
        </div>
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="px-6 py-4 text-left font-semibold text-slate-700 dark:text-slate-300">Project</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-700 dark:text-slate-300">ID</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-700 dark:text-slate-300">Status</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-700 dark:text-slate-300">Progress</th>
                  <th className="px-6 py-4 text-left font-semibold text-slate-700 dark:text-slate-300">Budget</th>
                </tr>
              </thead>
              <tbody>
                {recentProjects.map((project, idx) => (
                  <tr key={idx} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">{project.name}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400 font-mono text-sm">{project.id}</td>
                    <td className="px-6 py-4">
                      <Badge variant={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden max-w-xs">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300 w-10 text-right">{project.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-900 dark:text-slate-100 font-medium">{project.budget}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Module Cards */}
      <div className="space-y-4">
        <SectionTitle>Quick Access</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {moduleCards.map((module) => (
            <button
              key={module.id}
              onClick={() => setActiveModule(module.id)}
              className="text-left group"
            >
              <Card className="h-full hover:shadow-lg transition-all cursor-pointer">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <span className="text-4xl">{module.icon}</span>
                    <span className="text-3xl opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-50">{module.label}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{module.desc}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                    <p className="font-bold text-blue-600 dark:text-blue-400">{module.stat}</p>
                  </div>
                </div>
              </Card>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
