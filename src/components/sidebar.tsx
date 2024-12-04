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
  Box,
  ChevronDown,
  ChevronUp,
  Database,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

type SidebarProps = {
  className?: string;
};

const Sidebar: React.FC<SidebarProps> = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isContractOpen, setIsContractOpen] = useState(false);
  const [isIncomeOpen, setIsIncomeOpen] = useState(false);
  const location = useLocation();
  const path = location.pathname;

  const handleToggle = () => {
    setIsMinimized(!isMinimized);
  };

  const getLinkClassName = (linkPath: string) =>
    `flex items-center p-2 rounded-xl hover:bg-primary hover:text-white py-2 ${
      path === linkPath
        ? "bg-primary text-white text-lg"
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

          <li>
            <div
              className={cn(
                "flex items-center p-2 rounded-xl cursor-pointer",
                "text-white"
              )}
              onClick={() => setIsContractOpen(!isContractOpen)}
            >
              <ClipboardList className="w-10 h-5 text-primary" />
              {!isMinimized && (
                <div className="flex items-center justify-between flex-1">
                  <span className="text-lg text-primary">Shartnomalar</span>
                  {isContractOpen ? (
                    <ChevronUp className="w-6 h-6 text-primary" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-primary" />
                  )}
                </div>
              )}
            </div>
            {isContractOpen && (
              <ul
                className={cn(
                  "pl-4 space-y-2 ",
                  "transition-opacity duration-700 ease-in-out",
                  isContractOpen ? "opacity-100" : "opacity-0"
                )}
              >
                <li>
                  <Link
                    to="/contract"
                    className={getLinkClassName("/contract")}
                  >
                    Barcha shartnomalar
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contract/unpaid"
                    className={getLinkClassName("/contract/unpaid")}
                  >
                    To'lanmaganlar
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contract/paid"
                    className={getLinkClassName("/contract/paid")}
                  >
                    To'langanlar
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <div
              className={cn(
                "flex items-center p-2 rounded-xl cursor-pointer",
                "text-white"
              )}
              onClick={() => setIsIncomeOpen(!isIncomeOpen)}
            >
              <CreditCard className="w-10 h-5 text-primary" />
              {!isMinimized && (
                <div className="flex items-center justify-between flex-1">
                  <span className="text-lg text-primary">Daromat</span>
                  {isIncomeOpen ? (
                    <ChevronUp className="w-6 h-6 text-primary" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-primary" />
                  )}
                </div>
              )}
            </div>
            {isIncomeOpen && (
              <ul
                className={cn(
                  "pl-4 space-y-2 ",
                  "transition-opacity duration-700 ease-in-out",
                  isIncomeOpen ? "opacity-100" : "opacity-0"
                )}
              >
                <li>
                  <Link to="/income" className={getLinkClassName("/income")}>
                    Barchasi
                  </Link>
                </li>
                <li>
                  <Link
                    to="/income/profit"
                    className={getLinkClassName("/income/profit")}
                  >
                    Kirim
                  </Link>
                </li>
                <li>
                  <Link
                    to="/income/moneyspend"
                    className={getLinkClassName("/income/moneyspend")}
                  >
                    Chiqim
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link to="/service" className={getLinkClassName("/service")}>
              <Orbit className="w-10 h-5" />
              {!isMinimized && <span className="text-lg">Xizmatlar</span>}
            </Link>
          </li>
          <li>
            <Link to="/product" className={getLinkClassName("/product")}>
              <Box className="w-10 h-5" />
              {!isMinimized && <span className="text-lg">Productlar</span>}
            </Link>
          </li>
          <li>
            <Link to="/server" className={getLinkClassName("/server")}>
              <Database className="w-10 h-5" />
              {!isMinimized && <span className="text-lg">Server Ma'lumotlari</span>}
            </Link>
          </li>
        </ul>
      </div>
    </>
  );

  return (
    <>
      <aside
        className={cn(
          `relative hidden h-screen flex-none border-r transition-all duration-500 ease-in-out md:block`,
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
