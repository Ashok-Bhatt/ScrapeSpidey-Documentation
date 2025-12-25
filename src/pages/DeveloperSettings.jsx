import React, { useState } from "react";
import { useAuth } from "../context/authContext.jsx";
import axiosInstance from "../utils/axiosInstance.js";
import toast from "react-hot-toast";
import { Edit, Copy, Check, X } from "lucide-react";
import { themeColors } from "../constants/classes.js";

const DeveloperSettings = () => {
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
            toast.error(error?.response?.data?.message || "Something Went Wrong");
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(user?.apiKey || "");
        toast.success("Copied to clipboard");
    };

    return (
        <div className="space-y-6">
            <h2 className={`text-xl font-semibold border-b ${themeColors.border} pb-4 ${themeColors.text}`}>Developer Settings</h2>

            <div className="space-y-4">
                <div>
                    <label className={`block text-sm font-medium ${themeColors.text} mb-2`}>Default API Key</label>
                    <p className={`text-sm ${themeColors.secondary} mb-3`}>
                        This key is used for testing endpoints in the documentation's "Try it out" feature.
                    </p>

                    <div className={`flex items-center gap-2 ${themeColors["bg-secondary"]} p-2 rounded-lg border ${themeColors.border}`}>
                        {isEditingKey ? (
                            <input
                                type="text"
                                value={newApiKey}
                                onChange={(e) => setNewApiKey(e.target.value)}
                                className="bg-transparent border-none outline-none flex-1 font-mono text-gray-800 dark:text-gray-200 text-sm"
                                placeholder="Enter API Key"
                                autoFocus
                            />
                        ) : (
                            <code className="text-sm font-mono flex-1 truncate text-gray-600 dark:text-gray-400">
                                {user?.apiKey || <span className="text-gray-400 dark:text-gray-500 italic">No Default API Key Set</span>}
                            </code>
                        )}

                        <div className={`flex items-center gap-1 border-l pl-2 ${themeColors.border}`}>
                            {isEditingKey ? (
                                <>
                                    <button onClick={handleUpdateApiKey} className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors" title="Save">
                                        <Check size={16} />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsEditingKey(false);
                                            setNewApiKey(user?.apiKey || "");
                                        }}
                                        className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                                        title="Cancel"
                                    >
                                        <X size={16} />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => setIsEditingKey(true)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Edit">
                                        <Edit size={16} />
                                    </button>
                                    {user?.apiKey && (
                                        <button onClick={handleCopy} className="p-1.5 text-gray-500 hover:bg-gray-100 rounded transition-colors" title="Copy">
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
    );
};

export default DeveloperSettings;
