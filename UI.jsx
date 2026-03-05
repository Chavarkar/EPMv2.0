// Shared UI primitives

export function Card({ children, className = "" }) {
  return (
    <div className={`bg-[#111] border border-[#1f1f1f] rounded-lg ${className}`}>
      {children}
    </div>
  );
}

export function SectionTitle({ children, action }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-white font-bold text-sm tracking-widest uppercase" style={{ fontFamily: "'Courier New', monospace" }}>
        {children}
      </h2>
      {action && action}
    </div>
  );
}

export function Badge({ status }) {
  const styles = {
    active: "bg-[#0a2a0a] text-green-400 border border-green-900",
    completed: "bg-[#0a2a0a] text-green-300 border border-green-800",
    "in-progress": "bg-[#1a1a00] text-[#F6C90E] border border-yellow-900",
    pending: "bg-[#1a1a00] text-[#F6C90E] border border-yellow-900",
    delayed: "bg-[#2a0a0a] text-[#E53E3E] border border-red-900",
    high: "bg-[#2a0a0a] text-[#E53E3E] border border-red-900",
    medium: "bg-[#1a1a00] text-[#F6C90E] border border-yellow-900",
    low: "bg-[#0a1a0a] text-green-400 border border-green-900",
    approved: "bg-[#0a2a0a] text-green-400 border border-green-900",
    draft: "bg-[#151515] text-[#888] border border-[#333]",
    closed: "bg-[#151515] text-[#666] border border-[#333]",
    void: "bg-[#151515] text-[#555] border border-[#333]",
    "on-track": "bg-[#0a2a0a] text-green-400 border border-green-900",
    "at-risk": "bg-[#1a1a00] text-[#F6C90E] border border-yellow-900",
    critical: "bg-[#2a0a0a] text-[#E53E3E] border border-red-900",
  };
  const s = styles[status?.toLowerCase()] || styles.draft;
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase ${s}`}>
      {status}
    </span>
  );
}

export function StatCard({ label, value, sub, accent }) {
  const accentColors = {
    red: "border-l-[#E53E3E] text-[#E53E3E]",
    yellow: "border-l-[#F6C90E] text-[#F6C90E]",
    green: "border-l-green-500 text-green-400",
    white: "border-l-white text-white",
  };
  const ac = accentColors[accent] || accentColors.white;
  return (
    <Card className={`p-5 border-l-4 ${ac.split(" ")[0]}`}>
      <div className={`text-2xl font-black mb-1 ${ac.split(" ")[1]}`} style={{ fontFamily: "'Courier New', monospace" }}>
        {value}
      </div>
      <div className="text-[#888] text-xs tracking-wider uppercase">{label}</div>
      {sub && <div className="text-[#555] text-[10px] mt-1">{sub}</div>}
    </Card>
  );
}

export function TableHeader({ columns }) {
  return (
    <thead>
      <tr className="border-b border-[#1f1f1f]">
        {columns.map((col) => (
          <th key={col} className="text-left px-4 py-3 text-[10px] font-bold text-[#555] tracking-widest uppercase" style={{ fontFamily: "'Courier New', monospace" }}>
            {col}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export function Progress({ value, color = "red" }) {
  const colors = { red: "bg-[#E53E3E]", yellow: "bg-[#F6C90E]", green: "bg-green-500", white: "bg-white" };
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-[#1f1f1f] rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${colors[color]}`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-[11px] text-[#888] w-8 text-right" style={{ fontFamily: "'Courier New', monospace" }}>{value}%</span>
    </div>
  );
}

export function Btn({ children, variant = "primary", onClick, small }) {
  const base = `font-bold tracking-widest uppercase transition-all border cursor-pointer`;
  const size = small ? "text-[10px] px-3 py-1.5" : "text-xs px-4 py-2";
  const variants = {
    primary: "bg-[#E53E3E] text-white border-[#E53E3E] hover:bg-[#C53030]",
    secondary: "bg-transparent text-[#F6C90E] border-[#F6C90E] hover:bg-[#1a1a00]",
    ghost: "bg-transparent text-[#888] border-[#333] hover:text-white hover:border-[#555]",
    danger: "bg-transparent text-[#E53E3E] border-[#E53E3E] hover:bg-[#2a0a0a]",
  };
  return (
    <button
      onClick={onClick}
      className={`${base} ${size} ${variants[variant]} rounded`}
      style={{ fontFamily: "'Courier New', monospace" }}
    >
      {children}
    </button>
  );
}

export function Tab({ tabs, active, setActive }) {
  return (
    <div className="flex gap-1 mb-6 border-b border-[#1f1f1f] overflow-x-auto">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => setActive(t)}
          className={`px-4 py-2.5 text-[11px] font-bold tracking-wider uppercase whitespace-nowrap transition-colors border-b-2
            ${active === t
              ? "text-[#E53E3E] border-[#E53E3E]"
              : "text-[#555] border-transparent hover:text-white"
            }`}
          style={{ fontFamily: "'Courier New', monospace" }}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

export function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-[#111] border border-[#2f2f2f] rounded-lg w-full max-w-lg max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1f1f1f]">
          <h3 className="text-white font-bold tracking-widest text-sm uppercase" style={{ fontFamily: "'Courier New', monospace" }}>
            {title}
          </h3>
          <button onClick={onClose} className="text-[#555] hover:text-white text-lg transition-colors">✕</button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export function FormField({ label, children }) {
  return (
    <div className="mb-4">
      <label className="block text-[11px] font-bold tracking-widest uppercase text-[#666] mb-1.5" style={{ fontFamily: "'Courier New', monospace" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

export function Input({ placeholder, value, onChange, type = "text" }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full bg-[#0a0a0a] border border-[#2f2f2f] rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#E53E3E] transition-colors placeholder-[#444]"
    />
  );
}

export function Select({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full bg-[#0a0a0a] border border-[#2f2f2f] rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#E53E3E] transition-colors"
    >
      {options.map((o) => (
        <option key={o.value || o} value={o.value || o}>{o.label || o}</option>
      ))}
    </select>
  );
}
