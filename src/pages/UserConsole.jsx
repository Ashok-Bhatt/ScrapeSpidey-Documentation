import React, { useState } from "react";
import {Profile, Dashboard} from "../components/export.js";

function UserConsole() {
  const [active, setActive] = useState("dashboard");

  const handleSignOut = () => {
    alert("Signed out!");
    // add sign out logic here
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-60 bg-gray-900 text-white flex flex-col justify-between">
        <div className="p-4 space-y-4">
          <h2 className="text-xl font-bold mb-6">My Console</h2>
          <nav className="flex flex-col space-y-2">
            <button
              onClick={() => setActive("dashboard")}
              className={`text-left px-3 py-2 rounded hover:bg-gray-700 ${
                active === "dashboard" ? "bg-gray-700" : ""
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActive("profile")}
              className={`text-left px-3 py-2 rounded hover:bg-gray-700 ${
                active === "profile" ? "bg-gray-700" : ""
              }`}
            >
              Profile
            </button>
          </nav>
        </div>
        <div className="p-4">
          <button
            onClick={handleSignOut}
            className="w-full px-3 py-2 bg-red-500 rounded hover:bg-red-600"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 bg-gray-50">
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