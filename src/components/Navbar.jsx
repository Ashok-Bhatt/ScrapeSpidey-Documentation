import { Link, useLocation } from "react-router-dom";
import { themeColors } from "../constants/classes.js";
import { ToggleButton, LogoutButton } from "./export.js";
import { useAuth } from "../context/authContext.jsx";

function Navbar() {
  const location = useLocation();
  const {user} = useAuth();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Auth", path: "/auth" },
    { name: "Documentation", path: "/docs" },
    { name: "Dashboard", path: "/user-console" },
  ];

  return (
    <nav className={`bg-${themeColors.bg} text-${themeColors.text} w-full shadow-md`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex h-full items-center gap-5">
            <img src="/Images/logo.png" alt="Website logo" className="h-9/10 rounded-full" />
            <div className="font-bold text-lg text-blue-700">
              Scrape <span className="text-green-700">Spidey</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-6">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-lg font-medium transition ${
                    isActive
                      ? `bg-${themeColors.primary} text-white`
                      : `hover:bg-${themeColors.secondary} hover:text-white`
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
            
          {/* Theme Toggle Button */}
          <div className="flex">
            <LogoutButton/>
            <ToggleButton/>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;