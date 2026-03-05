import { useState } from "react";
import { Card, StatCard, Badge, Btn, Input } from "../components/UI";

const resources = [
  { name: "James Mwangi", role: "Project Manager", projects: 2, allocation: 85, status: "Assigned" },
  { name: "Amina Osei", role: "Senior Engineer", projects: 3, allocation: 95, status: "Assigned" },
  { name: "Peter Kimani", role: "Site Supervisor", projects: 1, allocation: 60, status: "Assigned" },
  { name: "Alice Uwimana", role: "Financial Analyst", projects: 2, allocation: 75, status: "Assigned" },
];

const stats = [
  { label: "Total Resources", value: "43", trend: 8, icon: "👥" },
  { label: "Allocated", value: "37", trend: 3, icon: "✓" },
  { label: "Avg Utilization", value: "79%", trend: 2, icon: "📊" },
  { label: "Available", value: "6", trend: -2, icon: "🆓" },
];

export default function ResourceManagement() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = resources.filter(r =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50">Resource Management</h1>
        <p className="text-slate-600 dark:text-slate-400">Manage team allocation and capacity</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search resources..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Btn variant="primary">+ Add Resource</Btn>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="px-6 py-4 text-left font-semibold text-slate-700 dark:text-slate-300">Name</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700 dark:text-slate-300">Role</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700 dark:text-slate-300">Projects</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700 dark:text-slate-300">Allocation</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700 dark:text-slate-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((resource, idx) => (
                  <tr key={idx} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">{resource.name}</td>
                    <td className="px-6 py-4 text-slate-900 dark:text-slate-100">{resource.role}</td>
                    <td className="px-6 py-4 text-slate-900 dark:text-slate-100">{resource.projects} active</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden max-w-xs">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                            style={{ width: `${resource.allocation}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300 w-10 text-right">{resource.allocation}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="success">{resource.status}</Badge>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                    No resources found
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
