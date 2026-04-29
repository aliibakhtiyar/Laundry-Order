import { Link, useLocation } from "react-router-dom";
import { FaHome, FaBox } from "react-icons/fa";

export default function Sidebar() {
  const { pathname } = useLocation();

  const menu = [
    { name: "Dashboard", path: "/", icon: <FaHome /> },
    { name: "Orders", path: "/orders", icon: <FaBox /> }
  ];

  return (
    <div className="w-20 bg-slate-900 border-r border-white/10 min-h-screen flex flex-col">
      
      {/* 🔹 TOP ICON (STATIC) */}
      <div className="flex items-center justify-center h-16 border-b border-white/10">
        <div className="text-gray-400 text-lg">≡</div>
      </div>

      {/* 🔹 MENU */}
      <div className="flex flex-col items-center pt-6 space-y-6">
        {menu.map((item) => {
          const active = pathname === item.path;

          return (
            <Link to={item.path} key={item.name}>
              <div
                className={`
                  flex items-center justify-center
                  w-12 h-12 rounded-xl transition-all duration-200
                  ${
                    active
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                <span className="text-xl">{item.icon}</span>
              </div>
            </Link>
          );
        })}
      </div>

    </div>
  );
}