const moduleLabels = {
  dashboard: "Dashboard",
  projects: "Projects",
  budget: "Budget Tracking",
  resources: "Resource Management",
  documents: "Documents",
  procurement: "Procurement",
  risks: "Risk Management",
  inventory: "Inventory",
  reports: "Reports",
  safety: "Safety Management",
  analytics: "Analytics & Reporting",
};

export default function TopBar({ activeModule }) {
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" });

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
          {moduleLabels[activeModule] || "Dashboard"}
        </h1>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-slate-600 dark:text-slate-400 text-sm">
          {dateStr}
        </div>

        <button className="relative p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 transition-colors">
          <span className="text-xl">🔔</span>
          <span className="absolute top-0 right-0 w-5 h-5 bg-red-600 text-white text-xs flex items-center justify-center rounded-full font-bold">4</span>
        </button>

        <button className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 transition-colors">
          <span className="text-xl">⚙️</span>
        </button>

        <div className="flex items-center gap-3 pl-6 border-l border-slate-200 dark:border-slate-700">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
            JD
          </div>
          <div className="hidden sm:block">
            <p className="font-medium text-slate-900 dark:text-slate-50 text-sm">John Doe</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Project Manager</p>
          </div>
        </div>
      </div>
    </header>
  );
}
