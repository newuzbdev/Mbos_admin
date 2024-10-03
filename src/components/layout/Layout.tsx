import { Outlet } from "react-router-dom";
import Navbar from "@/components/navbar.tsx";
import Sidebar from "@/components/sidebar.tsx";

export const Layout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Navbar />
        <div className="flex-grow p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
