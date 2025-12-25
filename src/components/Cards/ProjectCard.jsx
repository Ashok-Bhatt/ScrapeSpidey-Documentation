import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Copy, Eye, EyeOff, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { themeColors } from "../../constants/classes.js";
import axiosInstance from "../../utils/axiosInstance.js";
import { ConfirmationModal } from "../export.js";
import { useAuth } from "../../context/authContext.jsx";

const ProjectCard = ({ project, projects, setProjects, userApiKey, onSetDefault }) => {
    const [showApiKey, setShowApiKey] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const isDefault = project.apiKey === userApiKey;
    const navigate = useNavigate();
    const { token } = useAuth();

    const handleNavigate = () => {
        navigate(`/dashboard/${project._id}/daily-usage`);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(project.apiKey);
        toast.success("API Key Copied!");
    };

    const handleDeleteProject = async (projectId) => {
        try {
            await axiosInstance.delete(`/api/v1/project/${projectId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setShowDeleteModal(false);
            setProjects((prev) => prev.filter((p) => p._id !== projectId));
            toast.success("Project deleted.");
        } catch (error) {
            console.error("Error deleting project:", error);
            toast.error(error?.response?.data?.message || "Something Went Wrong");
        }
    };

    const formattedDate = new Date(project.createdAt).toLocaleDateString([], {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    return (
        <div
            className={`p-4 rounded-lg border ${themeColors.border} flex flex-col gap-4 shadow-sm relative overflow-hidden cursor-pointer hover:border-blue-500/50 transition-colors group ${themeColors.bg}`}
        >

            <div className="flex justify-between items-start">
                <div className="flex items-center">
                    <h3 className={`text-lg font-semibold truncate pr-8 ${themeColors.text}`}>{project.name}</h3>
                    {isDefault && (
                        <div className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-lg border-b border-l border-green-500/30">
                            Default
                        </div>
                    )}
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => {
                            setShowDeleteModal(true);
                        }}
                        className="p-1 rounded hover:bg-red-500/10 text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                        title="Delete Project"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {/* API Key Section */}
                <div className="flex flex-col gap-1">
                    <label className={`text-sm ${themeColors.secondary}`}>API Key</label>
                    <div
                        className={`flex items-center gap-2 ${themeColors["bg-secondary"]} p-2 rounded cursor-default border ${themeColors.border}`}
                    >
                        <code className={`text-sm font-mono flex-1 truncate ${themeColors.text}`}>
                            {showApiKey ? project.apiKey : "•".repeat(20)}
                        </code>
                        <button onClick={(e) => { e.stopPropagation(); setShowApiKey(!showApiKey); }} className={`p-1 hover:text-blue-500 ${themeColors.secondary}`}>
                            {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); handleCopy(); }} className={`p-1 hover:text-blue-500 ${themeColors.secondary}`}>
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
                            onClick={(e) => { e.stopPropagation(); onSetDefault(project.apiKey); }}
                            disabled={isDefault}
                            className={`px-3 py-2 rounded text-sm transition-colors border ${isDefault
                                ? "bg-green-600/10 text-green-500 border-green-600/30 cursor-default"
                                : `${themeColors["bg-secondary"]} hover:bg-opacity-80 ${themeColors.text} ${themeColors.border}`
                                }`}
                        >
                            {isDefault ? "Selected" : "Set as Default"}
                        </button>
                    </div>

                    <div className={`text-xs ${themeColors.secondary} flex justify-between pt-2 border-t ${themeColors.border}`}>
                        <span>Limit: {project.apiPointsDailyLimit}</span>
                        <span>{formattedDate}</span>
                    </div>
                </div>
            </div>

            <ConfirmationModal
                isOpen={showDeleteModal}
                title="Delete Project"
                message="Are you sure you want to delete this project? This action cannot be undone."
                onConfirm={() => handleDeleteProject(project._id)}
                onClose={() => setShowDeleteModal(false)}
            />
        </div>
    );
};

export default ProjectCard;
