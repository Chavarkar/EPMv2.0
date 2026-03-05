import { useState } from "react";
import { Card, Badge, StatCard, Btn, Input, Select, SectionTitle } from "../components/UI";

const projects = [
  { id: "TZ-MMG-2024-001", name: "MMG Tower A – Dar es Salaam", status: "In-Progress", progress: 67, budget: "$4.2M", team: 12, pm: "James Mwangi", start: "Jan 15, 2024", end: "Jun 30, 2025" },
  { id: "UG-MMG-2024-002", name: "MMG Logistics Hub – Kampala", status: "In-Progress", progress: 34, budget: "$2.8M", team: 8, pm: "Amina Osei", start: "Mar 01, 2024", end: "Sep 15, 2025" },
  { id: "KE-MMG-2024-003", name: "MMG Warehouse – Nairobi", status: "Delayed", progress: 51, budget: "$1.9M", team: 6, pm: "Peter Kimani", start: "Feb 20, 2024", end: "Apr 30, 2025" },
  { id: "RW-MMG-2025-001", name: "MMG Office Complex – Kigali", status: "Active", progress: 12, budget: "$3.5M", team: 10, pm: "Alice Uwimana", start: "Jan 10, 2025", end: "Mar 31, 2026" },
];

const stats = [
  { label: "Total Projects", value: "4", trend: 2, icon: "📋" },
  { label: "In Progress", value: "2", trend: 0, icon: "⏳" },
  { label: "Completed", value: "1", trend: 1, icon: "✅" },
  { label: "Avg Progress", value: "41%", trend: 5, icon: "📊" },
];

export default function ProjectManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || p.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

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
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50">Project Management</h1>
        <p className="text-slate-600 dark:text-slate-400">Track and manage all active projects</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          options={[
            { value: "all", label: "All Status" },
            { value: "Active", label: "Active" },
            { value: "In-Progress", label: "In Progress" },
            { value: "Delayed", label: "Delayed" },
          ]}
          className="w-full sm:w-48"
        />
        <Btn variant="primary">+ New Project</Btn>
      </div>

      {/* Projects List */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="px-6 py-4 text-left font-semibold text-slate-700 dark:text-slate-300">Project Name</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700 dark:text-slate-300">Status</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700 dark:text-slate-300">Progress</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700 dark:text-slate-300">PM</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700 dark:text-slate-300">Team</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700 dark:text-slate-300">Budget</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700 dark:text-slate-300">Timeline</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <tr key={project.id} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">{project.name}</td>
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
                    <td className="px-6 py-4 text-slate-900 dark:text-slate-100 text-sm">{project.pm}</td>
                    <td className="px-6 py-4 text-slate-900 dark:text-slate-100 text-sm">{project.team} members</td>
                    <td className="px-6 py-4 text-slate-900 dark:text-slate-100 font-medium">{project.budget}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400 text-sm">{project.start} - {project.end}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                    No projects found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
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
