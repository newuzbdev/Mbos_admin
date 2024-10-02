import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChartColumn,
  ClipboardList,
  Users2,
} from "lucide-react";

const Sidebar: React.FC<{ onToggle: (collapsed: boolean) => void }> = ({
  onToggle,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const path = location.pathname;

  const handleToggle = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    onToggle(newCollapsed);
  };

  const getLinkClassName = (linkPath: string) =>
    `flex items-center p-2 rounded-xl hover:bg-primary hover:text-white py-4 ${
      path === linkPath
        ? "bg-primary text-white text-sm"
        : "text-primary text-lg"
    }`;

  return (
    <aside
      className={`fixed top-0 left-0 h-full transition-width duration-300 shadow-md border-r ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between p-4">
        <button onClick={handleToggle} className="p-2 text-white bg-primary">
          {isCollapsed ? (
            <ChevronRightIcon className="w-6 h-6" />
          ) : (
            <ChevronLeftIcon className="w-6 h-6" />
          )}
        </button>
      </div>
      <div>
        <ul className="p-3 space-y-2">
          <li>
            <Link to="/" className={getLinkClassName("/")}>
              <ChartColumn className="w-10 h-6" />
              {!isCollapsed && <span className="text-lg">Asosiy</span>}
            </Link>
          </li>
          <li>
            <Link to="/services" className={getLinkClassName("/services")}>
              <ClipboardList className="w-10 h-5" />
              {!isCollapsed && <span className="text-lg">Xizmatlar</span>}
            </Link>
          </li>
          <li>
            <Link to="/users" className={getLinkClassName("/users")}>
              <Users2 className="w-10 h-5" />
              {!isCollapsed && (
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
