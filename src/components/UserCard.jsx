import React from 'react';
import { themeColors } from "../constants/classes.js";
import { FolderOpen } from "lucide-react";

function UserCard({ name, bio, email, profilePic, onSeeProjects }) {
  return (
    <div className={`p-4 rounded-lg border ${themeColors["border"] || "border-gray-200 dark:border-gray-700"} flex flex-col gap-4 shadow-sm relative overflow-hidden transition-colors hover:border-blue-500/50 ${themeColors.bg}`}>
      <div className="flex items-start gap-4">
        <img
          src={profilePic || "/Images/user_default_image.png"}
          alt="Profile"
          className="w-14 h-14 rounded-full object-cover border dark:border-gray-600"
        />

        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div>
              <h3 className={`text-lg font-semibold truncate ${themeColors.text}`}>{name}</h3>
              <p className={`text-sm ${themeColors.secondary} truncate`}>{email}</p>
            </div>
          </div>

          {bio && (
            <p className={`text-xs ${themeColors.secondary} opacity-80 truncate mt-1 max-w-full`}>
              {bio}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end pt-2 border-t border-gray-100 dark:border-gray-700">
        <button
          onClick={onSeeProjects}
          className="flex items-center gap-2 px-3 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors text-sm font-medium"
        >
          <FolderOpen size={16} />
          See Projects
        </button>
      </div>
    </div>
  );
}

export default UserCard;