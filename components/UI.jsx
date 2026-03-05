import { useState } from "react";

export function Card({ children, className = "" }) {
  return (
    <div className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow ${className}`}>
      {children}
    </div>
  );
}

export function StatCard({ label, value, icon, trend = null, className = "" }) {
  const trendColor = trend ? (trend > 0 ? "text-emerald-600" : "text-red-600") : "";
  
  return (
    <Card className={`${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-2">{label}</p>
          <p className="text-slate-900 dark:text-slate-50 text-3xl font-bold">{value}</p>
          {trend && (
            <p className={`text-xs font-semibold mt-3 flex items-center gap-1 ${trendColor}`}>
              <span>{trend > 0 ? "↑" : "↓"}</span>
              {Math.abs(trend)}% from last month
            </p>
          )}
        </div>
        {icon && <div className="text-4xl opacity-20 ml-4">{icon}</div>}
      </div>
    </Card>
  );
}

export function Badge({ children, variant = "default", className = "" }) {
  const baseClasses = "inline-flex items-center px-3 py-1.5 text-xs font-semibold rounded-full";
  const variants = {
    default: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    primary: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    success: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
    warning: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
    danger: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };

  return (
    <span className={`${baseClasses} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

export function Progress({ value = 0, className = "" }) {
  return (
    <div className={`bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden ${className}`}>
      <div
        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2.5 rounded-full transition-all duration-300"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      ></div>
    </div>
  );
}

export function Btn({ children, variant = "primary", onClick = () => {}, className = "", disabled = false }) {
  const baseClasses = "px-4 py-2.5 rounded-lg font-medium transition-all duration-200 text-sm inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md",
    secondary: "bg-slate-200 text-slate-900 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600",
    danger: "bg-red-600 text-white hover:bg-red-700 shadow-sm hover:shadow-md",
    ghost: "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export function Input({ placeholder = "", value = "", onChange = () => {}, type = "text", className = "" }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${className}`}
    />
  );
}

export function Table({ headers, rows, className = "" }) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
            {headers.map((header, idx) => (
              <th key={idx} className="px-6 py-4 text-left font-semibold text-slate-700 dark:text-slate-300">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              {row.map((cell, cellIdx) => (
                <td key={cellIdx} className="px-6 py-4 text-slate-900 dark:text-slate-100">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Select({ value = "", onChange = () => {}, options = [], className = "" }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${className}`}
    >
      <option value="">Select...</option>
      {options.map((option, idx) => (
        <option key={idx} value={option.value || option}>
          {option.label || option}
        </option>
      ))}
    </select>
  );
}

export function Tab({ tabs, active, setActive }) {
  return (
    <div className="flex gap-0 border-b border-slate-200 dark:border-slate-700 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActive(tab)}
          className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors
            ${active === tab
              ? "text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400"
              : "text-slate-600 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-slate-300"
            }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl w-full max-w-lg max-h-[80vh] overflow-y-auto shadow-xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-slate-900 dark:text-slate-100 font-semibold text-lg">
            {title}
          </h3>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 text-xl transition-colors">✕</button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export function FormField({ label, children, error = null }) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
        {label}
      </label>
      {children}
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  );
}

export function SectionTitle({ children, action }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-slate-900 dark:text-slate-50 font-bold text-2xl">
        {children}
      </h2>
      {action && action}
    </div>
  );
}
