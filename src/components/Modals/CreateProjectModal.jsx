import React, { useState } from "react";
import { themeColors } from "../../constants/classes.js";

const CreateProjectModal = ({ isOpen, onClose, onCreate }) => {
    const [projectName, setProjectName] = useState("");

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!projectName.trim()) return;
        onCreate(projectName);
        setProjectName("");
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className={`${themeColors.bg} border ${themeColors.border} p-6 rounded-lg w-full max-w-md shadow-xl`}>
                <h3 className={`text-xl font-bold mb-4 ${themeColors.text}`}>Create New Project</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className={`block text-sm font-medium ${themeColors.secondary} mb-1`}>Project Name</label>
                        <input
                            type="text"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            className={`w-full ${themeColors["bg-secondary"]} border ${themeColors.border} rounded p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${themeColors.text}`}
                            placeholder="e.g., My Awesome App"
                            autoFocus
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            onClick={() => {
                                onClose();
                                setProjectName("");
                            }}
                            className={`px-4 py-2 ${themeColors["bg-secondary"]} hover:opacity-80 rounded ${themeColors.text} transition-colors border ${themeColors.border}`}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white transition-colors shadow-sm"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProjectModal;
