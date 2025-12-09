import React, { useState, useRef } from "react";
import { useAuth } from "../context/authContext.jsx";
import axiosInstance from "../utils/axiosInstance.js";
import toast from "react-hot-toast";
import { Edit, Copy, Check, X, User, Lock, Code, Camera, Upload } from "lucide-react";
import { conf } from "../utils/config.js";
import { themeColors } from "../constants/classes.js";
import axios from "axios";

function Profile() {
  const { user, token, setUser } = useAuth();
  const [activeTab, setActiveTab] = useState("personal"); // personal, security, developer

  // Personal Info State
  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [loadingInfo, setLoadingInfo] = useState(false);
  const fileInputRef = useRef(null);
  const [uploadingImg, setUploadingImg] = useState(false);

  // Security State
  const [newPassword, setNewPassword] = useState("");
  const [loadingPass, setLoadingPass] = useState(false);

  // Developer State (API Key)
  const [isEditingKey, setIsEditingKey] = useState(false);
  const [newApiKey, setNewApiKey] = useState(user?.apiKey || "");

  // Handlers
  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    setLoadingInfo(true);
    try {
      const res = await axiosInstance.patch(
        "/api/v1/user",
        { name, bio },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Profile updated successfully!");
      setUser({ ...user, name: res.data.user.name, bio: res.data.user.bio });
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something Went Wrong");
    } finally {
      setLoadingInfo(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePic", file);

    setUploadingImg(true);
    try {
      const res = await axios.patch(
        `${conf.serverBaseUrl}/api/v1/user/profile-pic`,
        formData,
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } }
      );
      toast.success("Profile picture updated!");
      setUser({ ...user, profilePic: res.data.profilePic });
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something Went Wrong");
    } finally {
      setUploadingImg(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }
    setLoadingPass(true);
    try {
      await axiosInstance.patch(
        "/api/v1/user/password",
        { newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Password updated successfully!");
      setNewPassword("");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something Went Wrong");
    } finally {
      setLoadingPass(false);
    }
  };

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
      toast.error(error?.response?.data?.message || "Something Went Wrong");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(user?.apiKey || "");
    toast.success("Copied to clipboard");
  };

  return (
    <div className="h-full p-6">
      <h1 className={`text-3xl font-bold mb-8 ${themeColors.text}`}>Account Settings</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 flex flex-col gap-2">
          <button
            onClick={() => setActiveTab("personal")}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === "personal" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
              }`}
          >
            <User size={18} /> Personal Info
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === "security" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
              }`}
          >
            <Lock size={18} /> Security
          </button>
          <button
            onClick={() => setActiveTab("developer")}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === "developer" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
              }`}
          >
            <Code size={18} /> Developer
          </button>
        </div>

        {/* Content Area */}
        <div className={`flex-1 rounded-xl shadow-sm border p-6 ${themeColors.bg} dark:border-gray-700`}>

          {/* PERSONAL INFO TAB */}
          {activeTab === "personal" && (
            <div className="space-y-6">
              <div className="flex items-center gap-6 pb-6 border-b">
                <div className="relative group">
                  <img
                    src={user?.profilePic || "/Images/user_default_image.png"}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-100"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImg}
                    className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <Camera className="text-white" size={24} />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    className="hidden"
                    accept="image/*"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{user?.name}</h2>
                  <p className="text-gray-500 text-sm">{user?.email}</p>
                  {uploadingImg && <p className="text-blue-500 text-xs mt-1">Uploading...</p>}
                </div>
              </div>

              <form onSubmit={handleUpdateInfo} className="space-y-4 max-w-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows="3"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                    placeholder="Tell us a bit about yourself"
                  />
                </div>
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loadingInfo}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    {loadingInfo ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* SECURITY TAB */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold border-b pb-4">Change Password</h2>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="max-w-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                    placeholder="Min. 6 characters"
                  />
                </div>
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loadingPass || !newPassword}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    {loadingPass ? "Updating..." : "Update Password"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* DEVELOPER TAB */}
          {activeTab === "developer" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold border-b pb-4">Developer Settings</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Default API Key</label>
                  <p className="text-sm text-gray-500 mb-3">
                    This key is used for testing endpoints in the documentation's "Try it out" feature.
                  </p>

                  <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-200">
                    {isEditingKey ? (
                      <input
                        type="text"
                        value={newApiKey}
                        onChange={(e) => setNewApiKey(e.target.value)}
                        className="bg-transparent border-none outline-none flex-1 font-mono text-gray-800 dark:text-gray-200 text-sm"
                        placeholder="Enter API Key"
                      />
                    ) : (
                      <code className="text-sm font-mono flex-1 truncate text-gray-600">
                        {user?.apiKey || <span className="text-gray-400 italic">No Default API Key Set</span>}
                      </code>
                    )}

                    <div className="flex items-center gap-1 border-l pl-2 border-gray-300">
                      {isEditingKey ? (
                        <>
                          <button onClick={handleUpdateApiKey} className="p-1.5 text-green-600 hover:bg-green-50 rounded">
                            <Check size={16} />
                          </button>
                          <button
                            onClick={() => {
                              setIsEditingKey(false);
                              setNewApiKey(user?.apiKey || "");
                            }}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                          >
                            <X size={16} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => setIsEditingKey(true)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded">
                            <Edit size={16} />
                          </button>
                          {user?.apiKey && (
                            <button onClick={handleCopy} className="p-1.5 text-gray-500 hover:bg-gray-100 rounded">
                              <Copy size={16} />
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Profile;