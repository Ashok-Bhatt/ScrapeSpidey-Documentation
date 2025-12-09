import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useAuth } from '../context/authContext';
import toast from 'react-hot-toast';

function UserProjectsModal({ user, onClose }) {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();
    const [editingProject, setEditingProject] = useState(null);
    const [newLimit, setNewLimit] = useState("");

    console.log(editingProject);

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
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[600px] max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Projects for {user.name}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
                </div>

                {loading ? (
                    <p>Loading projects...</p>
                ) : projects.length === 0 ? (
                    <p>No projects found for this user.</p>
                ) : (
                    <div className="space-y-4">
                        {projects.map((project) => (
                            <div key={project._id} className="border p-4 rounded flex justify-between items-center">
                                <div>
                                    <h3 className="font-semibold">{project.name}</h3>
                                    <p className="text-sm text-gray-600">API Key: {project.apiKey.substring(0, 8)}...</p>
                                    <p className="text-sm text-gray-600">Daily Limit: {project.apiPointsDailyLimit}</p>
                                </div>
                                <div>
                                    <button
                                        onClick={() => handleEditLimit(project)}
                                        className="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 text-sm"
                                    >
                                        Edit Limit
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {editingProject && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-60">
                        <div className="bg-white p-4 rounded shadow border w-80">
                            <h3 className="font-bold mb-2">Edit Limit for {editingProject.name}</h3>
                            <input
                                type="number"
                                value={newLimit}
                                onChange={(e) => setNewLimit(e.target.value)}
                                className="w-full border rounded p-2 mb-2"
                            />
                            <div className="flex justify-end gap-2">
                                <button onClick={() => setEditingProject(null)} className="px-3 py-1 border rounded">Cancel</button>
                                <button onClick={saveLimit} className="px-3 py-1 bg-green-600 text-white rounded">Save</button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-6 flex justify-end">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Close</button>
                </div>
            </div>
        </div>
    );
}

export default UserProjectsModal;
