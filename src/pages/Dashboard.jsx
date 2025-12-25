import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance.js";
import { useAuth } from "../context/authContext.jsx";
import { themeColors } from "../constants/classes.js";
import { useParams, NavLink, Outlet } from "react-router-dom";
import classNames from "classnames";

const Dashboard = () => {
  const [project, setProject] = useState(null);
  const { user, token } = useAuth();
  const { projectId } = useParams();

  useEffect(() => {
    const getProject = async () => {
      try {
        const res = await axiosInstance.get(`/api/v1/project/${projectId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProject(res.data);
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };
    if (user && projectId) getProject();
  }, [user, projectId, token]);

  const links = [
    { name: "Daily API Usage", path: `/dashboard/${projectId}/daily-usage` },
    { name: "Requests Made", path: `/dashboard/${projectId}/requests` }
  ];

  if (!project) return <div className={`p-6 ${themeColors.secondary}`}>Loading Dashboard...</div>;

  return (
    <div className="w-full h-full p-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className={`text-2xl font-bold ${themeColors.text}`}>Project: {project.name}</h1>
        <p className={`text-sm ${themeColors.secondary}`}>API Key: {project.apiKey}</p>
      </div>

      <div className="flex gap-4 border-b border-gray-200 dark:border-gray-700 pb-px">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              classNames(
                "pb-3 px-1 text-sm font-medium transition-all duration-200 border-b-2",
                isActive
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300"
              )
            }
          >
            {link.name}
          </NavLink>
        ))}
      </div>

      <div className="mt-6">
        <Outlet context={{ project }} />
      </div>
    </div>
  );
};

export default Dashboard;