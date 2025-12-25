import React, { useState, useRef } from "react";
import { useAuth } from "../context/authContext.jsx";
import axiosInstance from "../utils/axiosInstance.js";
import toast from "react-hot-toast";
import { Camera } from "lucide-react";
import { conf } from "../utils/config.js";
import { themeColors } from "../constants/classes.js";
import axios from "axios";

const PersonalInfo = () => {
    const { user, token, setUser } = useAuth();
    const [name, setName] = useState(user?.name || "");
    const [bio, setBio] = useState(user?.bio || "");
    const [loadingInfo, setLoadingInfo] = useState(false);
    const fileInputRef = useRef(null);
    const [uploadingImg, setUploadingImg] = useState(false);

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

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-6 pb-6 border-b">
                <div className="relative group">
                    <img
                        src={user?.profilePic || "/Images/user_default_image.png"}
                        alt="Profile"
                        className={`w-24 h-24 rounded-full object-cover border-2 ${themeColors.border}`}
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
                    <h2 className={`text-xl font-semibold ${themeColors.text}`}>{user?.name}</h2>
                    <p className={`${themeColors.secondary} text-sm`}>{user?.email}</p>
                    {uploadingImg && <p className="text-blue-500 text-xs mt-1">Uploading...</p>}
                </div>
            </div>

            <form onSubmit={handleUpdateInfo} className="space-y-4 max-w-lg">
                <div>
                    <label className={`block text-sm font-medium ${themeColors.secondary} mb-1`}>Full Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition ${themeColors["bg-secondary"]} ${themeColors.text} ${themeColors.border}`}
                        placeholder="Your Name"
                    />
                </div>
                <div>
                    <label className={`block text-sm font-medium ${themeColors.secondary} mb-1`}>Bio</label>
                    <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        rows="3"
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition resize-none ${themeColors["bg-secondary"]} ${themeColors.text} ${themeColors.border}`}
                        placeholder="Tell us a bit about yourself"
                    />
                </div>
                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={loadingInfo}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm"
                    >
                        {loadingInfo ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PersonalInfo;
