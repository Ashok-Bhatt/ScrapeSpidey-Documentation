import React, { useEffect, useState, useCallback } from "react";
import axiosInstance from "../utils/axiosInstance.js";
import { useAuth } from "../context/authContext.jsx";
import toast from "react-hot-toast";
import ProjectCard from "./ProjectCard";
import { Plus } from "lucide-react";
import { themeColors } from "../constants/classes.js";

function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newProjectName, setNewProjectName] = useState("");
    const { token, user, setUser } = useAuth();


    const fetchProjects = useCallback(async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get("/api/v1/project", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProjects(res.data);
        } catch (error) {
            console.error("Error fetching projects:", error);
            toast.error(error?.response?.data?.message || "Something Went Wrong");
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    const handleCreateProject = async (e) => {
        e.preventDefault();
        if (!newProjectName.trim()) return toast.error("Project name is required");

        try {
            const res = await axiosInstance.post(
                "/api/v1/project",
                { name: newProjectName },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setProjects((prev) => [res.data, ...prev]);
            toast.success("Project created successfully!");
            setNewProjectName("");
            setShowCreateModal(false);
        } catch (error) {
            console.error("Error creating project:", error);
            toast.error(error?.response?.data?.message || "Something Went Wrong");
        }
    };

    const handleSetDefaultApiKey = async (apiKey) => {
        try {
            const res = await axiosInstance.patch(
                "/api/v1/user/api-key",
                { apiKey },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Default API Key updated!");
            setUser({ ...user, apiKey: res.data.apiKey });
        } catch (error) {
            console.error("Error updating default api key:", error);
            toast.error(error?.response?.data?.message || "Something Went Wrong");
        }
    };

    const handleDeleteProject = async (projectId) => {
        if (!window.confirm("Are you sure you want to delete this project? This action cannot be undone.")) return;

        try {
            await axiosInstance.delete(`/api/v1/project/${projectId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProjects((prev) => prev.filter((p) => p._id !== projectId));
            toast.success("Project deleted.");
        } catch (error) {
            console.error("Error deleting project:", error);
            toast.error(error?.response?.data?.message || "Something Went Wrong");
        }
    };

    return (
        <div className="h-full p-6 w-full overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className={`text-2xl font-bold ${themeColors.text}`}>My Projects</h2>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
                >
                    <Plus size={20} /> New Project
                </button>
            </div>

            {loading ? (
                <div className={`text-center py-10 ${themeColors.secondary}`}>Loading projects...</div>
            ) : projects.length === 0 ? (
                <div className={`text-center py-10 ${themeColors.secondary} border-2 border-dashed ${themeColors.border} rounded-lg`}>
                    No projects found. Create one to get started!
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <ProjectCard
                            key={project._id}
                            project={project}
                            onDelete={handleDeleteProject}
                            userApiKey={user?.apiKey}
                            onSetDefault={handleSetDefaultApiKey}
                        />
                    ))}
                </div>
            )}

            {showCreateModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className={`${themeColors.bg} border ${themeColors.border} p-6 rounded-lg w-full max-w-md shadow-xl`}>
                        <h3 className={`text-xl font-bold mb-4 ${themeColors.text}`}>Create New Project</h3>
                        <form onSubmit={handleCreateProject} className="space-y-4">
                            <div>
                                <label className={`block text-sm font-medium ${themeColors.secondary} mb-1`}>Project Name</label>
                                <input
                                    type="text"
                                    value={newProjectName}
                                    onChange={(e) => setNewProjectName(e.target.value)}
                                    className={`w-full ${themeColors["bg-secondary"]} border ${themeColors.border} rounded p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${themeColors.text}`}
                                    placeholder="e.g., My Awesome App"
                                    autoFocus
                                />
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateModal(false)}
                                    className={`px-4 py-2 ${themeColors["bg-secondary"]} hover:opacity-80 rounded ${themeColors.text} transition-colors border ${themeColors.border}`}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white transition-colors"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Projects;
