import React, { useState } from "react";
import { Eye, EyeOff, Copy } from "lucide-react";

function Profile({ email, apiKey }) {
  const [showApiKey, setShowApiKey] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    alert("API Key copied!");
  };

  return (
    <div className="h-full p-6 space-y-6">
      <h2 className="text-2xl font-bold">Profile</h2>
      <div className="space-y-2">
        <p>
          <span className="font-semibold">Email: </span> {email}
        </p>
        <div className="flex items-center gap-3">
          <span className="font-semibold">API Key: </span>
          <span className="px-2 py-1 bg-gray-100 rounded">
            {showApiKey ? apiKey : "••••••••••••••••••••"}
          </span>
          <button
            onClick={() => setShowApiKey(!showApiKey)}
            className="p-1 hover:bg-gray-200 rounded"
          >
            {showApiKey ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          <button
            onClick={handleCopy}
            className="p-1 hover:bg-gray-200 rounded"
          >
            <Copy size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

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
          <div className="p-6">
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <p className="mt-2 text-gray-600">
              Dashboard content goes here...
            </p>
          </div>
        )}
        {active === "profile" && (
          <Profile email="ashok@example.com" apiKey="89123443-a4a9-409e-a478-25f146dhib77" />
        )}
      </div>
    </div>
  );
}

export default UserConsole;