import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChartColumn,
  ClipboardList,
  Users2,
  ChevronLeft,
  Menu,
  CreditCard,
  Orbit,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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

  const SidebarContent = () => (
    <>
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
          "absolute -right-3 top-10 z-50 cursor-pointer rounded-full border bg-background text-3xl text-foreground hidden lg:block",
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
            <Link to="/clients" className={getLinkClassName("/clients")}>
              <Users2 className="w-10 h-5" />
              {!isMinimized && <span className="text-lg">Mijozlar</span>}
            </Link>
          </li>
          <Link to="/contract" className={getLinkClassName("/contract")}>
            <ClipboardList className="w-10 h-5" />
            {!isMinimized && <span className="text-lg">Shartnomalar</span>}
          </Link>
          <Link to="/income" className={getLinkClassName("/income")}>
            <CreditCard className="w-10 h-5" />
            {!isMinimized && <span className="text-lg">Daromat</span>}
          </Link>
          <Link to="/service" className={getLinkClassName("/service")}>
            <Orbit className="w-10 h-5" />
            {!isMinimized && <span className="text-lg">Xizmatlar</span>}
          </Link>
        </ul>
      </div>
    </>
  );

  return (
    <>
      <aside
        className={cn(
          `relative hidden h-screen flex-none border-r transition-[width] duration-100 md:block`,
          !isMinimized ? "w-72" : "w-[70px]"
        )}
      >
        <SidebarContent />
      </aside>
      <Sheet>
        <SheetTrigger asChild>
          <Menu className="fixed cursor-pointer md:hidden top-4 left-4" />
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Sidebar;
