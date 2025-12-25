import React from 'react';
import { themeColors } from "../../constants/classes.js";

const ConfirmationModal = ({ isOpen, title, message, onConfirm, onCancel, confirmText = "Confirm", cancelText = "Cancel", isDanger = false }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className={`${themeColors.bg} rounded-lg shadow-lg w-full max-w-md overflow-hidden transform transition-all border ${themeColors.border}`}>
                <div className="p-6">
                    <h3 className={`text-lg font-semibold ${themeColors.text} mb-2`}>
                        {title}
                    </h3>
                    <p className={`${themeColors.secondary} text-sm`}>
                        {message}
                    </p>
                </div>

                <div className={`${themeColors["bg-secondary"]} px-6 py-4 flex justify-end gap-3 border-t ${themeColors.border}`}>
                    <button
                        onClick={onCancel}
                        className={`px-4 py-2 text-sm font-medium ${themeColors.text} ${themeColors.bg} border ${themeColors.border} rounded-md hover:opacity-80 transition-opacity`}
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${isDanger
                            ? "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                            : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
                            }`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
