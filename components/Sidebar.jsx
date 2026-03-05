import { useState } from "react";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: "📊" },
  { id: "projects", label: "Projects", icon: "📋" },
  { id: "budget", label: "Budget", icon: "💰" },
  { id: "resources", label: "Resources", icon: "👥" },
  { id: "documents", label: "Documents", icon: "📄" },
  { id: "procurement", label: "Procurement", icon: "🛒" },
  { id: "risks", label: "Risks", icon: "⚠️" },
  { id: "inventory", label: "Inventory", icon: "📦" },
  { id: "reports", label: "Reports", icon: "📈" },
  { id: "safety", label: "Safety", icon: "🛡️" },
  { id: "analytics", label: "Analytics", icon: "📊" },
];

export default function Sidebar({ activeModule, setActiveModule, collapsed, setCollapsed }) {
  return (
    <aside className={`${collapsed ? "w-20" : "w-64"} bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 transition-all duration-300 flex flex-col overflow-hidden shadow-sm`}>
      {/* Header */}
      <div className="px-6 py-6 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between gap-2">
        {!collapsed && (
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold text-sm shadow-md">
              EP
            </div>
            <div className="flex flex-col flex-1">
              <span className="font-bold text-slate-900 dark:text-slate-50 text-sm leading-tight">Enterprise</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">Project Manager</span>
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-600 dark:text-slate-400"
          aria-label="Toggle sidebar"
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveModule(item.id)}
            className={`w-full px-4 py-3 rounded-lg transition-all duration-200 font-medium text-sm flex items-center gap-3 ${
              activeModule === item.id
                ? "bg-blue-600 text-white shadow-md"
                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
            title={collapsed ? item.label : ""}
          >
            <span className="text-lg flex-shrink-0">{item.icon}</span>
            {!collapsed && <span className="truncate">{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-6 border-t border-slate-200 dark:border-slate-700">
        <div className={`flex items-center ${collapsed ? "justify-center" : "gap-3"}`}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-md">
            JD
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="font-medium text-slate-900 dark:text-slate-50 text-sm truncate">John Doe</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">PM</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
