import { Link, useLocation } from "react-router-dom";
import { themeColors } from "../constants/classes.js";
import { ToggleButton, LogoutButton, AuthRenderer } from "./export.js";
import classNames from "classnames";

function Navbar() {

  const navItems = [
    { name: "Home", path: "/", alwaysRender: true },
    { name: "Documentation", path: "/docs", alwaysRender: true },
    { name: "Login", path: "/auth", alwaysRender: false, authentication: false },
    { name: "My console", path: "/user-console", alwaysRender:false, authentication: true },
  ];

  return (
    <nav className={classNames(themeColors["bg"], themeColors["text"], "w-full shadow-md")}>
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
              return (
                item.alwaysRender ? (
                  <Link key={item.path} to={item.path}
                    className={`px-3 py-2 rounded-lg font-medium transition`}
                  >
                    {item.name}
                  </Link>
                ): (
                  <AuthRenderer key={item.path} authentication={item.authentication}>
                    <Link to={item.path}
                      className={`px-3 py-2 rounded-lg font-medium transition`}
                    >
                      {item.name}
                    </Link>
                  </AuthRenderer>
                )
              );
            })}
          </div>
            
          {/* Theme Toggle Button */}
          <div className="flex items-center gap-10">
            <AuthRenderer authentication={true}>
              <LogoutButton/>
            </AuthRenderer>
            <ToggleButton/>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;