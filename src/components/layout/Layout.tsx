import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar.tsx";
import Sidebar from "../Sidebar";

export const Layout = () => {
  return (
    <>
      <div className="flex min-h-screen">
        <Sidebar />
        <Navbar />
        <div className="min-h-screen bg-slate-100/80">
          <Outlet />
        </div>
      </div>
    </>
  );
};
