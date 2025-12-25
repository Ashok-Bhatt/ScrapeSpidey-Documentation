import React from "react";
import { User, Lock, Code } from "lucide-react";
import { themeColors } from "../constants/classes.js";
import { NavLink, Outlet } from "react-router-dom";
import classNames from "classnames";

function Profile() {
  const tabs = [
    { id: "personal", label: "Personal Info", icon: <User size={18} />, path: "/profile/personal" },
    { id: "security", label: "Security", icon: <Lock size={18} />, path: "/profile/security" },
    { id: "developer", label: "Developer", icon: <Code size={18} />, path: "/profile/developer" },
  ];

  return (
    <div className="h-full p-6">
      <h1 className={`text-3xl font-bold mb-8 ${themeColors.text}`}>Account Settings</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 flex flex-col gap-2">
          {tabs.map((tab) => (
            <NavLink
              key={tab.id}
              to={tab.path}
              className={({ isActive }) =>
                classNames(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  isActive ? "bg-blue-600/10 text-blue-500 shadow-sm" : `${themeColors.secondary} hover:bg-blue-500/5`
                )
              }
            >
              {tab.icon} {tab.label}
            </NavLink>
          ))}
        </div>

        {/* Content Area */}
        <div className={`flex-1 rounded-xl shadow-sm border p-6 ${themeColors.bg} ${themeColors.border}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Profile;