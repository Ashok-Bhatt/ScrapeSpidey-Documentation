import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Copy, Eye, EyeOff, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { themeColors } from "../constants/classes.js";

const ProjectCard = ({ project, onDelete, userApiKey, onSetDefault }) => {
    const [showApiKey, setShowApiKey] = useState(false);
    const isDefault = project.apiKey === userApiKey;
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/dashboard/${project._id}`);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(project.apiKey);
        toast.success("API Key Copied!");
    };

    const formattedDate = new Date(project.createdAt).toLocaleDateString([], {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    return (
        <div
            className={`p-4 rounded-lg border ${themeColors["border"] || "border-gray-700"} flex flex-col gap-4 shadow-sm relative overflow-hidden cursor-pointer hover:border-blue-500/50 transition-colors group`}
        >
            {/* {isDefault && (
                <div className="absolute top-0 right-0 bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-bl-lg border-b border-l border-green-500/30">
                    Default
                </div>
            )} */}

            <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold truncate pr-8">{project.name}</h3>
                <div className="flex gap-2">
                    <button
                        onClick={(e) => {
                            onDelete(project._id);
                        }}
                        className="p-1 rounded hover:bg-red-900/50 text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                        title="Delete Project"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {/* API Key Section */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-400">API Key</label>
                    <div
                        className="flex items-center gap-2 bg-gray-800/50 p-2 rounded cursor-default"
                    >
                        <code className="text-sm font-mono flex-1 truncate">
                            {showApiKey ? project.apiKey : "•".repeat(20)}
                        </code>
                        <button onClick={() => setShowApiKey(!showApiKey)} className="p-1 hover:text-white text-gray-400">
                            {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                        <button onClick={handleCopy} className="p-1 hover:text-white text-gray-400">
                            <Copy size={16} />
                        </button>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 pt-2">
                    <div className="grid grid-cols-2 gap-3">
                        <div
                            onClick={handleNavigate}
                            className="flex justify-center items-center px-3 py-2 bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 rounded text-sm transition-colors border border-blue-600/30"
                        >
                            View Dashboard
                        </div>
                        <button
                            onClick={() => onSetDefault(project.apiKey)}
                            disabled={isDefault}
                            className={`px-3 py-2 rounded text-sm transition-colors border ${isDefault
                                ? "bg-green-600/20 text-green-400 border-green-600/30 cursor-default"
                                : "bg-gray-700 hover:bg-gray-600 text-gray-200 border-gray-600"
                                }`}
                        >
                            {isDefault ? "Selected" : "Set as Default"}
                        </button>
                    </div>

                    <div className="text-xs text-gray-500 flex justify-between pt-2 border-t border-gray-700/50">
                        <span>Limit: {project.apiPointsDailyLimit}</span>
                        <span>{formattedDate}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
