import React, { useEffect, useState, useCallback } from "react";
import axiosInstance from "../utils/axiosInstance.js";
import { useAuth } from "../context/authContext.jsx";
import toast from "react-hot-toast";
import { ProjectCard, CreateProjectModal } from "../components/export.js";
import { Plus } from "lucide-react";
import { themeColors } from "../constants/classes.js";

function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
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

    const handleCreateProject = async (name) => {
        try {
            const res = await axiosInstance.post(
                "/api/v1/project",
                { name },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setProjects((prev) => [res.data, ...prev]);
            toast.success("Project created successfully!");
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
                            projects={projects}
                            setProjects={setProjects}
                            userApiKey={user?.apiKey}
                            onSetDefault={handleSetDefaultApiKey}
                        />
                    ))}
                </div>
            )}

            <CreateProjectModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onCreate={handleCreateProject}
            />
        </div>
    );
}

export default Projects;
