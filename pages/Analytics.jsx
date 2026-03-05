import { Card, StatCard, Badge, Btn } from "../components/UI";
import { useState } from "react";

const stats = [
  { label: "Total Revenue", value: "$12.4M", trend: 8, icon: "💰" },
  { label: "Projects Completed", value: "12", trend: 3, icon: "✓" },
  { label: "Avg Project Duration", value: "8.5 mo", trend: -2, icon: "📅" },
  { label: "Customer Satisfaction", value: "4.6/5", trend: 1, icon: "⭐" },
];

const reports = [
  { title: "Monthly Performance Report", category: "Finance", date: "Mar 1, 2025", pages: 24 },
  { title: "Project Health Dashboard", category: "Management", date: "Feb 28, 2025", pages: 18 },
  { title: "Safety & Compliance Summary", category: "Safety", date: "Feb 25, 2025", pages: 12 },
  { title: "Resource Utilization Report", category: "HR", date: "Feb 20, 2025", pages: 15 },
];

export default function Analytics() {
  const [selectedReport, setSelectedReport] = useState(null);

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50">Analytics & Reporting</h1>
        <p className="text-slate-600 dark:text-slate-400">View key metrics and generate reports</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      <div className="flex gap-4">
        <Btn variant="primary">📊 Generate Report</Btn>
        <Btn variant="secondary">📥 Export Data</Btn>
      </div>

      <div className="grid gap-6">
        <Card>
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">Recent Reports</h2>
          </div>
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {reports.map((report, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedReport(selectedReport === idx ? null : idx)}
                className="p-6 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer flex items-center justify-between"
              >
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-2">{report.title}</h3>
                  <div className="flex gap-4">
                    <Badge variant="default">{report.category}</Badge>
                    <span className="text-sm text-slate-600 dark:text-slate-400">{report.date}</span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">{report.pages} pages</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Btn variant="secondary" size="sm">View</Btn>
                  <Btn variant="ghost" size="sm">Download</Btn>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-6">Project Performance Summary</h2>
            <div className="space-y-4">
              {[
                { name: "MMG Tower A", progress: 67, budget: "On Track", schedule: "On Track" },
                { name: "MMG Logistics Hub", progress: 34, budget: "On Track", schedule: "At Risk" },
                { name: "MMG Warehouse", progress: 51, budget: "Warning", schedule: "Delayed" },
                { name: "MMG Office Complex", progress: 12, budget: "On Track", schedule: "On Track" },
              ].map((project, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-900 dark:text-slate-100">{project.name}</span>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{project.progress}% complete</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <div className="flex gap-3 text-xs">
                    <div className="flex items-center gap-1">
                      <span className="text-slate-600 dark:text-slate-400">Budget:</span>
                      <Badge variant={project.budget === "On Track" ? "success" : "warning"}>
                        {project.budget}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-slate-600 dark:text-slate-400">Schedule:</span>
                      <Badge variant={project.schedule === "On Track" ? "success" : project.schedule === "At Risk" ? "warning" : "danger"}>
                        {project.schedule}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
