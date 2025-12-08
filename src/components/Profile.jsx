import React, { useState } from "react";
import { useAuth } from "../context/authContext.jsx";
import axiosInstance from "../utils/axiosInstance.js";
import toast from "react-hot-toast";
import { Edit, Copy, Check, X } from "lucide-react";

function Profile() {
  const { user, token, setUser } = useAuth();
  const [isEditingKey, setIsEditingKey] = useState(false);
  const [newApiKey, setNewApiKey] = useState(user?.apiKey || "");

  const handleUpdateApiKey = async () => {
    try {
      const res = await axiosInstance.patch(
        "/api/v1/user/api-key",
        { apiKey: newApiKey },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Default API Key Updated!");
      setUser({ ...user, apiKey: res.data.apiKey });
      setIsEditingKey(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update API Key");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(user?.apiKey || "");
    toast.success("Copied to clipboard");
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
      <div className="space-y-4 w-full max-w-md">
        <p>
          <span className="font-semibold">Email: </span> {user.email}
        </p>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-400">Default API Key</label>
          <div className="flex items-center gap-2 bg-gray-800/50 p-2 rounded border border-gray-700">
            {isEditingKey ? (
              <input
                type="text"
                value={newApiKey}
                onChange={(e) => setNewApiKey(e.target.value)}
                className="bg-transparent border-none outline-none flex-1 font-mono text-white text-sm"
                placeholder="Enter API Key"
              />
            ) : (
              <code className="text-sm font-mono flex-1 truncate text-gray-300">
                {user?.apiKey || <span className="text-gray-500 italic">No Default API Key Set</span>}
              </code>
            )}

            {isEditingKey ? (
              <>
                <button onClick={handleUpdateApiKey} className="p-1 text-green-500 hover:text-green-400">
                  <Check size={18} />
                </button>
                <button
                  onClick={() => {
                    setIsEditingKey(false);
                    setNewApiKey(user?.apiKey || "");
                  }}
                  className="p-1 text-red-500 hover:text-red-400">
                  <X size={18} />
                </button>
              </>
            ) : (
              <>
                <button onClick={() => setIsEditingKey(true)} className="p-1 text-blue-400 hover:text-blue-300">
                  <Edit size={16} />
                </button>
                {user?.apiKey && (
                  <button onClick={handleCopy} className="p-1 text-gray-400 hover:text-white">
                    <Copy size={16} />
                  </button>
                )}
              </>
            )}
          </div>
          <p className="text-xs text-gray-500">
            This API key is used for testing in the documentation when you click "Try it out".
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;