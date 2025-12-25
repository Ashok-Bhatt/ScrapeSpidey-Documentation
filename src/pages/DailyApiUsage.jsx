import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance.js";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ReferenceLine } from "recharts";
import { useAuth } from "../context/authContext.jsx";
import { useOutletContext } from "react-router-dom";
import { themeColors } from "../constants/classes.js";

const DailyApiUsage = () => {
    const [dailyData, setDailyData] = useState([]);
    const { token } = useAuth();
    const { project } = useOutletContext();

    useEffect(() => {
        const fetchDailyUsage = async () => {
            try {
                const res = await axiosInstance.get(`/api/v1/analytics/daily-usage?apiKey=${project.apiKey}`, {
                    params: { lastDays: 7 },
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = res.data;
                data.sort((a, b) => (b["date"] < a["date"] ? 1 : -1));
                setDailyData(data);
            } catch (err) {
                console.error("Error fetching daily usage:", err);
            }
        };
        if (project) fetchDailyUsage();
    }, [project, token]);

    if (!project) return <div className={`p-6 ${themeColors.secondary}`}>Loading project data...</div>;

    return (
        <div className={`p-6 ${themeColors.bg} border ${themeColors.border} rounded-lg shadow-sm`}>
            <h2 className={`text-xl font-bold mb-4 ${themeColors.text}`}>Daily API Usage (Last 7 Days)</h2>
            <div className="overflow-x-auto">
                <BarChart width={700} height={300} data={dailyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, Math.max(project["apiPointsDailyLimit"] * 1.2, ...dailyData.map(d => d.apiPointsUsed))]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="requestsMade" fill="#8884d8" name="Requests Made" />
                    <Bar dataKey="apiPointsUsed" fill="#82ca9d" name="API Points Used" />
                    <ReferenceLine y={project["apiPointsDailyLimit"]} stroke="red" strokeDasharray="3 3" label="Daily API Points Limit" />
                </BarChart>
            </div>
        </div>
    );
};

export default DailyApiUsage;
