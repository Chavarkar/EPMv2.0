import { useState } from "react";
import { Card, StatCard, Badge, Btn, Input } from "../components/UI";

const documents = [
  { title: "Project Charter – MMG Tower A", category: "Planning", date: "Mar 1, 2025", author: "James Mwangi", size: "2.4 MB" },
  { title: "Bid Evaluation Report", category: "Procurement", date: "Feb 28, 2025", author: "Amina Osei", size: "1.8 MB" },
  { title: "Site Safety Plan", category: "Safety", date: "Feb 15, 2025", author: "Peter Kimani", size: "3.2 MB" },
  { title: "Financial Reports Q1 2025", category: "Finance", date: "Mar 2, 2025", author: "Alice Uwimana", size: "5.1 MB" },
];

const stats = [
  { label: "Total Documents", value: "234", trend: 12, icon: "📄" },
  { label: "This Month", value: "28", trend: 5, icon: "📅" },
  { label: "Teams", value: "12", trend: 2, icon: "👥" },
  { label: "Storage Used", value: "2.3 GB", trend: 8, icon: "💾" },
];

export default function DocumentManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const filtered = documents.filter(d => {
    const matchesSearch = d.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || d.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50">Document Management</h1>
        <p className="text-slate-600 dark:text-slate-400">Store and organize project documents</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search documents..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50"
        >
          <option value="all">All Categories</option>
          <option value="Planning">Planning</option>
          <option value="Procurement">Procurement</option>
          <option value="Safety">Safety</option>
          <option value="Finance">Finance</option>
        </select>
        <Btn variant="primary">+ Upload Document</Btn>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="px-6 py-4 text-left font-semibold text-slate-700 dark:text-slate-300">Title</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700 dark:text-slate-300">Category</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700 dark:text-slate-300">Date</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700 dark:text-slate-300">Author</th>
                <th className="px-6 py-4 text-left font-semibold text-slate-700 dark:text-slate-300">Size</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((doc, idx) => (
                  <tr key={idx} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">{doc.title}</td>
                    <td className="px-6 py-4">
                      <Badge variant="default">{doc.category}</Badge>
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400 text-sm">{doc.date}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400 text-sm">{doc.author}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400 text-sm">{doc.size}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                    No documents found
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
