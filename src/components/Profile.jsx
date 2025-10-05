import React, { useState } from "react";
import { Eye, EyeOff, Copy } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/authContext.jsx";

function Profile() {
  const [showApiKey, setShowApiKey] = useState(false);
  const { user } = useAuth();

  const handleCopy = () => {
    navigator.clipboard.writeText(user.apiKey);
    toast.success("API Key Copied!");
  };

  return (
    <div className="h-full p-6 space-y-6 flex flex-col items-center">

      {/* Profile Image and Name */}
      <div className="flex flex-col items-center space-y-2">
        <img
          src={user?.profilePic || "/Images/user_default_image.png"}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border"
        />
        <h2 className="text-xl font-semibold">{user?.name}</h2>
      </div>

      {/* Remaining Info */}
      <div className="space-y-2 w-full max-w-md">
        <p>
          <span className="font-semibold">Email: </span> {user.email}
        </p>
        <div className="flex items-center gap-3">
          <span className="font-semibold">API Key: </span>
          <span className="px-2 py-1 rounded">
            {showApiKey ? user.apiKey : "•".repeat(user.apiKey.length)}
          </span>
          <button onClick={() => setShowApiKey(!showApiKey)} className="p-1 rounded">
            {showApiKey ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          <button onClick={handleCopy} className="p-1 rounded">
            <Copy size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;