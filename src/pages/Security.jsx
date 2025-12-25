import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance.js";
import toast from "react-hot-toast";
import { useAuth } from "../context/authContext.jsx";
import { themeColors } from "../constants/classes.js";

const Security = () => {
    const { token } = useAuth();
    const [newPassword, setNewPassword] = useState("");
    const [loadingPass, setLoadingPass] = useState(false);

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

    return (
        <div className="space-y-6">
            <h2 className={`text-xl font-semibold border-b ${themeColors.border} pb-4 ${themeColors.text}`}>Change Password</h2>
            <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="max-w-lg">
                    <label className={`block text-sm font-medium ${themeColors.secondary} mb-1`}>New Password</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition ${themeColors["bg-secondary"]} ${themeColors.text} ${themeColors.border}`}
                        placeholder="Min. 6 characters"
                    />
                </div>
                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={loadingPass || !newPassword}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm"
                    >
                        {loadingPass ? "Updating..." : "Update Password"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Security;
