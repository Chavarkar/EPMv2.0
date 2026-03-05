import { useState } from "react";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import Dashboard from "./pages/Dashboard";
import ProjectManagement from "./pages/ProjectManagement";
import BudgetTracking from "./pages/BudgetTracking";
import ResourceManagement from "./pages/ResourceManagement";
import DocumentManagement from "./pages/DocumentManagement";
import ProcurementTracker from "./pages/ProcurementTracker";
import RiskManagement from "./pages/RiskManagement";
import InventoryManagement from "./pages/InventoryManagement";
import Reports from "./pages/Reports";

export default function App() {
  const [activeModule, setActiveModule] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isDarkMode] = useState(false);

  const renderPage = () => {
    switch (activeModule) {
      case "dashboard": return <Dashboard setActiveModule={setActiveModule} />;
      case "projects": return <ProjectManagement />;
      case "budget": return <BudgetTracking />;
      case "resources": return <ResourceManagement />;
      case "documents": return <DocumentManagement />;
      case "procurement": return <ProcurementTracker />;
      case "risks": return <RiskManagement />;
      case "inventory": return <InventoryManagement />;
      case "reports": return <Reports />;
      default: return <Dashboard setActiveModule={setActiveModule} />;
    }
  };

  return (
    <div className={`flex h-screen overflow-hidden ${isDarkMode ? "dark" : ""}`}>
      <Sidebar
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <div className="flex flex-col flex-1 overflow-hidden bg-slate-50 dark:bg-slate-950">
        <TopBar activeModule={activeModule} />
        <main className="flex-1 overflow-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
