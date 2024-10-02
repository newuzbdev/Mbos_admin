import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChartColumn, ClipboardList, Users2, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type SidebarProps = {
  className?: string;
};

const Sidebar: React.FC<SidebarProps> = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const location = useLocation();
  const path = location.pathname;

  const handleToggle = () => {
    setIsMinimized(!isMinimized);
  };

  const getLinkClassName = (linkPath: string) =>
    `flex items-center p-2 rounded-xl hover:bg-primary hover:text-white py-2 ${
      path === linkPath
        ? "bg-primary text-white text-sm"
        : "text-primary text-lg"
    }`;

  return (
    <aside
      className={cn(
        `relative hidden h-screen flex-none border-r transition-[width] duration-500 md:block`,
        !isMinimized ? "w-72" : "w-[70px]"
      )}
    >
      <div className="hidden p-5 pt-10 lg:block">
        <Link to={"/"}>
          <img
            src="https://mbos-landing.vercel.app/_next/image?url=%2Fimages%2Fmbos.png&w=96&q=75"
            alt="logo"
          />
        </Link>
      </div>
      <ChevronLeft
        className={cn(
          "absolute -right-3 top-10 z-50 cursor-pointer rounded-full border bg-background text-3xl text-foreground",
          isMinimized && "rotate-180"
        )}
        onClick={handleToggle}
      />

      <div>
        <ul className="p-3 space-y-2">
          <li>
            <Link to="/" className={getLinkClassName("/")}>
              <ChartColumn className="w-10 h-6" />
              {!isMinimized && <span className="text-lg">Asosiy</span>}
            </Link>
          </li>
          <li>
            <Link to="/services" className={getLinkClassName("/services")}>
              <ClipboardList className="w-10 h-5" />
              {!isMinimized && <span className="text-lg">Xizmatlar</span>}
            </Link>
          </li>
          <li>
            <Link to="/users" className={getLinkClassName("/users")}>
              <Users2 className="w-10 h-5" />
              {!isMinimized && (
                <span className="text-lg">Foydanaluvchilar</span>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
