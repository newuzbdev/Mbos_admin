import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar.tsx";
import Sidebar from "../Sidebar";
import { useState } from "react";

export const Layout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const handleSidebarToggle = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
  };
  return (
    <>
      <div className="flex min-h-screen">
        <Sidebar onToggle={handleSidebarToggle} />
        <div
          className={`flex-1 flex flex-col transition-all duration-300 ${
            isSidebarCollapsed ? "ml-20" : "ml-64"
          }`}
        >
          <Navbar />
          <div className="min-h-screen bg-slate-100/80">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
