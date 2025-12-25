import React, { useState, useEffect } from 'react';
import axiosInstance from "../../utils/axiosInstance.js";
import { useAuth } from "../../context/authContext.jsx";
import toast from 'react-hot-toast';
import { themeColors } from "../../constants/classes.js";

function UserProjectsModal({ user, onClose }) {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();
    const [editingProject, setEditingProject] = useState(null);
    const [newLimit, setNewLimit] = useState("");

    useEffect(() => {
        if (user) {
            fetchProjects();
        }
    }, [user]);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const res = await axiosInstance.get(`/api/v1/project/admin/user/${user._id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProjects(res.data);
        } catch (error) {
            console.error("Error fetching projects:", error);
            toast.error(error?.response?.data?.message || "Something Went Wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleEditLimit = (project) => {
        setEditingProject(project);
        setNewLimit(project.apiPointsDailyLimit);
    };

    const saveLimit = async () => {
        console.log(editingProject._id, newLimit);
        try {
            // ChangeApiLimitModal logic uses /daily-api-limit endpoint which expects projectId
            await axiosInstance.patch("/api/v1/project/daily-api-limit",
                { projectId: editingProject._id, newApiPointsDailyLimit: newLimit },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Limit updated successfully");
            setEditingProject(null);
            fetchProjects(); // Refresh list
        } catch (error) {
            console.error("Failed to update limit", error);
            console.log(error?.response?.data?.message);
            toast.error(error?.response?.data?.message || "Something Went Wrong");
        }
    };

    if (!user) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
            <div className={`${themeColors.bg} rounded-lg shadow-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto border ${themeColors.border}`}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className={`text-xl font-bold ${themeColors.text}`}>Projects for {user.name}</h2>
                    <button onClick={onClose} className={`${themeColors.secondary} hover:${themeColors.text}`}>✕</button>
                </div>

                {loading ? (
                    <p className={themeColors.secondary}>Loading projects...</p>
                ) : projects.length === 0 ? (
                    <p className={themeColors.secondary}>No projects found for this user.</p>
                ) : (
                    <div className="space-y-4">
                        {projects.map((project) => (
                            <div key={project._id} className={`border ${themeColors.border} p-4 rounded flex justify-between items-center ${themeColors["bg-secondary"]} bg-opacity-30`}>
                                <div>
                                    <h3 className={`font-semibold ${themeColors.text}`}>{project.name}</h3>
                                    <p className={`text-sm ${themeColors.secondary}`}>API Key: {project.apiKey.substring(0, 8)}...</p>
                                    <p className={`text-sm ${themeColors.secondary}`}>Daily Limit: {project.apiPointsDailyLimit}</p>
                                </div>
                                <div>
                                    <button
                                        onClick={() => handleEditLimit(project)}
                                        className="px-3 py-1 bg-blue-600/10 text-blue-500 rounded hover:bg-blue-600/20 text-sm transition-colors border border-blue-600/20"
                                    >
                                        Edit Limit
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {editingProject && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-60">
                        <div className={`${themeColors.bg} p-4 rounded-lg shadow-xl border ${themeColors.border} w-80`}>
                            <h3 className={`font-bold mb-2 ${themeColors.text}`}>Edit Limit for {editingProject.name}</h3>
                            <input
                                type="number"
                                value={newLimit}
                                onChange={(e) => setNewLimit(e.target.value)}
                                className={`w-full ${themeColors["bg-secondary"]} border ${themeColors.border} rounded p-2 mb-4 focus:ring-2 focus:ring-blue-500 outline-none ${themeColors.text}`}
                            />
                            <div className="flex justify-end gap-2">
                                <button onClick={() => setEditingProject(null)} className="px-3 py-1 border rounded">Cancel</button>
                                <button onClick={saveLimit} className="px-3 py-1 bg-green-600 text-white rounded">Save</button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-6 flex justify-end">
                    <button onClick={onClose} className={`px-4 py-2 ${themeColors["bg-secondary"]} border ${themeColors.border} ${themeColors.text} rounded hover:bg-opacity-80 transition-colors`}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default UserProjectsModal;
