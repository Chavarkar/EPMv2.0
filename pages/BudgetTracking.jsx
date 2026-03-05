import { useState } from "react";
import { Card, StatCard, Badge, Btn, Input } from "../components/UI";

const budgetData = [
  { project: "MMG Tower A", allocated: "$4.2M", committed: "$3.1M", spent: "$2.8M", variance: -5, status: "On Track" },
  { project: "MMG Logistics Hub", allocated: "$2.8M", committed: "$1.9M", spent: "$1.6M", variance: -2, status: "On Track" },
  { project: "MMG Warehouse", allocated: "$1.9M", committed: "$1.5M", spent: "$1.3M", variance: 8, status: "Warning" },
  { project: "MMG Office Complex", allocated: "$3.5M", committed: "$0.8M", spent: "$0.4M", variance: 0, status: "On Track" },
];

const stats = [
  { label: "Total Budget", value: "$12.4M", trend: 2, icon: "💰" },
  { label: "Committed", value: "$7.3M", trend: 3, icon: "📊" },
  { label: "Spent", value: "$6.1M", trend: 5, icon: "💸" },
  { label: "Remaining", value: "$5.1M", trend: -2, icon: "📈" },
];

export default function BudgetTracking() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = budgetData.filter(b => 
    b.project.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getVarianceColor = (variance) => {
    if (variance < -5) return "danger";
    if (variance > 5) return "warning";
    return "success";
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50">Budget Tracking</h1>
        <p className="text-slate-600 dark:text-slate-400">Monitor project budgets and spending</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search budgets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Btn variant="primary">+ New Budget</Btn>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="px-6 py-4 text-left font-semibold text-slate-700 dark:text-slate-300">Project</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700 dark:text-slate-300">Allocated</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700 dark:text-slate-300">Committed</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700 dark:text-slate-300">Spent</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700 dark:text-slate-300">Variance %</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700 dark:text-slate-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((budget, idx) => (
                  <tr key={idx} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">{budget.project}</td>
                    <td className="px-6 py-4 text-slate-900 dark:text-slate-100">{budget.allocated}</td>
                    <td className="px-6 py-4 text-slate-900 dark:text-slate-100">{budget.committed}</td>
                    <td className="px-6 py-4 text-slate-900 dark:text-slate-100">{budget.spent}</td>
                    <td className="px-6 py-4">
                      <span className={`font-medium ${budget.variance < 0 ? "text-green-600" : budget.variance > 5 ? "text-red-600" : "text-slate-900 dark:text-slate-100"}`}>
                        {budget.variance < 0 ? "−" : "+"}{Math.abs(budget.variance)}%
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={budget.status === "Warning" ? "warning" : "success"}>
                        {budget.status}
                      </Badge>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                    No budgets found
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
