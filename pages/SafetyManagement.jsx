import { Card, StatCard, Badge, Btn, Input } from "../components/UI";
import { useState } from "react";

const incidents = [
  { date: "Mar 2, 2025", project: "MMG Tower A", type: "Near Miss", severity: "Low", location: "Ground Floor", status: "Reported" },
  { date: "Feb 28, 2025", project: "MMG Logistics Hub", type: "Injury", severity: "High", location: "Concrete Area", status: "Under Investigation" },
  { date: "Feb 25, 2025", project: "MMG Warehouse", type: "Property Damage", severity: "Medium", location: "Roof Area", status: "Closed" },
  { date: "Feb 20, 2025", project: "MMG Tower A", type: "Near Miss", severity: "Low", location: "Stairwell", status: "Reported" },
];

const stats = [
  { label: "Safety Score", value: "92%", trend: 3, icon: "✓" },
  { label: "Incidents (YTD)", value: "8", trend: -2, icon: "⚠" },
  { label: "Days Safe", value: "15", trend: 15, icon: "📅" },
  { label: "Near Miss Reports", value: "12", trend: 4, icon: "🚨" },
];

export default function SafetyManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSeverity, setFilterSeverity] = useState("all");

  const filtered = incidents.filter(inc => {
    const matchesSearch = inc.project.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = filterSeverity === "all" || inc.severity === filterSeverity;
    return matchesSearch && matchesSeverity;
  });

  const getSeverityVariant = (severity) => {
    switch (severity) {
      case "High": return "danger";
      case "Medium": return "warning";
      default: return "success";
    }
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50">Safety Management</h1>
        <p className="text-slate-600 dark:text-slate-400">Track incidents and safety metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search incidents..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <select
          value={filterSeverity}
          onChange={(e) => setFilterSeverity(e.target.value)}
          className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50"
        >
          <option value="all">All Severity</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <Btn variant="primary">+ Report Incident</Btn>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="px-6 py-4 text-left font-semibold text-slate-700 dark:text-slate-300">Date</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700 dark:text-slate-300">Project</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700 dark:text-slate-300">Type</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700 dark:text-slate-300">Severity</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700 dark:text-slate-300">Location</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700 dark:text-slate-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((incident, idx) => (
                  <tr key={idx} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <td className="px-6 py-4 text-slate-900 dark:text-slate-100 text-sm">{incident.date}</td>
                    <td className="px-6 py-4 text-slate-900 dark:text-slate-100 font-medium">{incident.project}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{incident.type}</td>
                    <td className="px-6 py-4">
                      <Badge variant={getSeverityVariant(incident.severity)}>
                        {incident.severity}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400 text-sm">{incident.location}</td>
                    <td className="px-6 py-4">
                      <Badge variant={incident.status === "Closed" ? "success" : incident.status === "Under Investigation" ? "warning" : "default"}>
                        {incident.status}
                      </Badge>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                    No incidents found
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
