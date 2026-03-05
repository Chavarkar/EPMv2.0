const moduleLabels = {
  dashboard: "Enterprise Dashboard",
  projects: "Project Management",
  budget: "Budget Tracking",
  resources: "Resource Management",
  documents: "Document Management",
  procurement: "Procurement Tracker",
  risks: "Risk Management",
  inventory: "Inventory Management",
  reports: "Reports & Analytics",
};

export default function TopBar({ activeModule }) {
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" });

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-[#0d0d0d] border-b border-[#1f1f1f]" style={{ minHeight: 56 }}>
      <div className="flex items-center gap-3">
        <div className="text-[#E53E3E] text-xs font-bold tracking-widest" style={{ fontFamily: "'Courier New', monospace" }}>
          MOUNT MERU GROUP
        </div>
        <span className="text-[#222]">|</span>
        <h1 className="text-white text-sm font-bold tracking-wider" style={{ fontFamily: "'Courier New', monospace" }}>
          {moduleLabels[activeModule] || "Protrak"}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-[#444] text-[11px]" style={{ fontFamily: "'Courier New', monospace" }}>{dateStr}</div>

        <button className="relative text-[#666] hover:text-white transition-colors">
          <span className="text-lg">🔔</span>
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#E53E3E] rounded-full text-[8px] flex items-center justify-center text-white font-bold">4</span>
        </button>

        <button className="text-[#666] hover:text-white transition-colors text-lg">⚙</button>

        <div className="flex items-center gap-2 bg-[#111] border border-[#1f1f1f] rounded px-3 py-1">
          <div className="w-6 h-6 rounded-full bg-[#E53E3E] flex items-center justify-center text-white font-bold text-[10px]">PM</div>
          <span className="text-[#888] text-[11px]" style={{ fontFamily: "'Courier New', monospace" }}>admin@meru.com</span>
        </div>
      </div>
    </header>
  );
}
