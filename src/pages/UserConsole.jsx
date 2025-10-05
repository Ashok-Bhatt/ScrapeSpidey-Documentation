import React, { useState } from "react";
import {Profile, Dashboard} from "../components/export.js";
import { themeColors } from "../constants/classes.js";
import { useAuth } from "../context/authContext.jsx";

function UserConsole() {
  const [active, setActive] = useState("profile");

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-60 flex flex-col justify-between border-r-1 border-gray-500">
        <div className="p-4 space-y-4">
          <h2 className="text-xl font-bold mb-6">My Console</h2>
          <nav className="flex flex-col space-y-2">
            <button
              onClick={() => setActive("profile")}
              className={`text-left px-3 py-2 rounded ${themeColors["bg-secondary"]} ${
                active === "profile" ? "bg-blue-600" : ""
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActive("dashboard")}
              className={`text-left px-3 py-2 rounded ${themeColors["bg-secondary"]} ${
                active === "dashboard" ? "bg-blue-600" : ""
              }`}
            >
              Dashboard
            </button>
          </nav>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1">
        {active === "dashboard" && (
          <Dashboard/>
        )}
        {active === "profile" && (
          <Profile/>
        )}
      </div>
    </div>
  );
}

export default UserConsole;