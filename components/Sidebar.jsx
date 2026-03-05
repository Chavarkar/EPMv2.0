import { useState } from "react";

const MeruLogo = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
    <rect width="60" height="60" rx="8" fill="#111" />
    <path d="M8 48 L8 12 L22 32 L30 18 L38 32 L52 12 L52 48" stroke="#E53E3E" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M8 48 L8 44 L52 44 L52 48" fill="#F6C90E"/>
    <circle cx="30" cy="18" r="3" fill="#F6C90E"/>
  </svg>
);

const modules = [
  { id: "dashboard", label: "Dashboard", icon: "⊞", sub: [] },
  {
    id: "projects", label: "Project Management", icon: "◈",
    sub: ["Projects", "Sub-Projects", "Schedule / Gantt", "Tasks", "Work Progress", "Daily Progress Report", "Baseline Management"]
  },
  {
    id: "budget", label: "Budget Tracking", icon: "◉",
    sub: ["Budgets", "Budget Line Items", "Committed Amounts", "Expenditures", "Budget Reports"]
  },
  {
    id: "resources", label: "Resource Management", icon: "◎",
    sub: ["Resources", "Calendars", "Project Calendars", "Resource Allocation", "Over-Allocation View"]
  },
  {
    id: "documents", label: "Document Management", icon: "◧",
    sub: ["Drawings", "Released Drawings", "Change Requests", "Document Center", "Folder Management"]
  },
  {
    id: "procurement", label: "Procurement Tracker", icon: "◐",
    sub: ["Material Requisitions", "MR Approval", "Purchase Orders", "Payment Tracking", "Shipment Updates", "Custom Clearance", "Sub MRs"]
  },
  {
    id: "risks", label: "Risk Management", icon: "◬",
    sub: ["Risk Register", "Department Review", "Risk Analysis", "Mitigation & Closure", "Risk Dashboards"]
  },
  {
    id: "inventory", label: "Inventory Management", icon: "◫",
    sub: ["Material Master", "Goods Receipt Notes", "Material Issue Requests", "Material Return Requests", "Site-to-Site Transfer", "Inventories", "Reconciliation"]
  },
  { id: "reports", label: "Reports & Analytics", icon: "◈", sub: [] },
];

export default function Sidebar({ activeModule, setActiveModule, collapsed, setCollapsed }) {
  const [expandedModule, setExpandedModule] = useState("projects");

  const handleModuleClick = (id) => {
    setActiveModule(id);
    setExpandedModule(expandedModule === id ? null : id);
  };

  return (
    <aside
      className="flex flex-col bg-[#0d0d0d] border-r border-[#1f1f1f] transition-all duration-300 overflow-y-auto"
      style={{ width: collapsed ? 64 : 260, minWidth: collapsed ? 64 : 260 }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-[#1f1f1f]" style={{ minHeight: 72 }}>
        <MeruLogo size={collapsed ? 32 : 40} />
        {!collapsed && (
          <div>
            <div className="text-white font-black tracking-widest text-sm" style={{ fontFamily: "'Courier New', monospace", letterSpacing: "0.2em" }}>
              MERU
            </div>
            <div className="text-[#E53E3E] text-[9px] font-bold tracking-[0.3em] uppercase">PROTRAK</div>
          </div>
        )}
        <button
          className="ml-auto text-[#444] hover:text-white transition-colors text-xs"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? "▶" : "◀"}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {modules.map((mod) => {
          const isActive = activeModule === mod.id;
          const isExpanded = expandedModule === mod.id && !collapsed;
          return (
            <div key={mod.id}>
              <button
                onClick={() => handleModuleClick(mod.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all group relative
                  ${isActive
                    ? "bg-[#1a0000] border-l-2 border-[#E53E3E] text-white"
                    : "text-[#666] hover:text-white hover:bg-[#151515] border-l-2 border-transparent"
                  }`}
                title={collapsed ? mod.label : ""}
              >
                <span className={`text-lg flex-shrink-0 ${isActive ? "text-[#E53E3E]" : "group-hover:text-[#F6C90E]"}`}>
                  {mod.icon}
                </span>
                {!collapsed && (
                  <>
                    <span className="text-xs font-semibold tracking-wide flex-1" style={{ fontFamily: "'Courier New', monospace" }}>
                      {mod.label}
                    </span>
                    {mod.sub.length > 0 && (
                      <span className="text-[10px] text-[#444]">{isExpanded ? "▲" : "▼"}</span>
                    )}
                  </>
                )}
              </button>

              {/* Sub menu */}
              {isExpanded && mod.sub.length > 0 && (
                <div className="bg-[#080808] border-l-2 border-[#1f1f1f] ml-4">
                  {mod.sub.map((sub) => (
                    <button
                      key={sub}
                      className="w-full text-left px-4 py-2 text-[11px] text-[#555] hover:text-[#F6C90E] hover:bg-[#0f0f0f] transition-colors tracking-wide"
                      style={{ fontFamily: "'Courier New', monospace" }}
                    >
                      — {sub}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* User */}
      {!collapsed && (
        <div className="border-t border-[#1f1f1f] px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#E53E3E] flex items-center justify-center text-white font-bold text-xs">
              PM
            </div>
            <div>
              <div className="text-white text-xs font-semibold">Project Manager</div>
              <div className="text-[#444] text-[10px]">Mount Meru Group</div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
