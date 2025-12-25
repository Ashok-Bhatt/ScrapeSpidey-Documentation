import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance.js";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from "recharts";
import { useAuth } from "../context/authContext.jsx";
import { useOutletContext } from "react-router-dom";
import { themeColors } from "../constants/classes.js";

const RequestData = () => {
    const [requestsData, setRequestsData] = useState([]);
    const [interval, setInterval] = useState(30 * 60 * 1000);
    const [labels, setLabels] = useState([]);
    const { token } = useAuth();
    const { project } = useOutletContext();

    const intervals = [
        { label: "Last 30 minutes", value: 30 * 60 * 1000 },
        { label: "Last 1 hour", value: 60 * 60 * 1000 },
        { label: "Last 6 hours", value: 6 * 60 * 60 * 1000 },
        { label: "Last 1 day", value: 24 * 60 * 60 * 1000 },
        { label: "Last 1 week", value: 7 * 24 * 60 * 60 * 1000 },
        { label: "Last 15 days", value: 15 * 24 * 60 * 60 * 1000 },
        { label: "Last 1 month", value: 30 * 24 * 60 * 60 * 1000 }
    ];

    const getLabels = (interval) => {
        const now = new Date();
        const labels = [];
        const formatHM = (d) => d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        const formatDay = (d) => d.toLocaleDateString([], { weekday: "long" });
        const formatDate = (d) => d.toLocaleDateString([], { day: "2-digit", month: "short" });

        if (interval === 30 * 60 * 1000) {
            const step = interval / 10;
            for (let i = 0; i <= 10; i++) {
                const t = new Date(now.getTime() - (10 - i) * step);
                labels.push(formatHM(t));
            }
        } else if (interval === 60 * 60 * 1000) {
            const step = interval / 12;
            for (let i = 0; i <= 12; i++) {
                const t = new Date(now.getTime() - (12 - i) * step);
                labels.push(formatHM(t));
            }
        } else if (interval === 6 * 60 * 60 * 1000) {
            const step = interval / 12;
            for (let i = 0; i <= 12; i++) {
                const t = new Date(now.getTime() - (12 - i) * step);
                labels.push(formatHM(t));
            }
        } else if (interval === 24 * 60 * 60 * 1000) {
            const step = interval / 8;
            for (let i = 0; i <= 8; i++) {
                const t = new Date(now.getTime() - (8 - i) * step);
                labels.push(formatHM(t));
            }
        } else if (interval === 7 * 24 * 60 * 60 * 1000) {
            for (let i = 6; i >= 0; i--) {
                const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
                labels.push(i === 0 ? "Today" : formatDay(d));
            }
        } else if (interval === 15 * 24 * 60 * 60 * 1000) {
            for (let i = 14; i >= 0; i--) {
                labels.push(i === 0 ? "Today" : `${i} day${i > 1 ? "s" : ""} ago`);
            }
        } else if (interval === 30 * 24 * 60 * 60 * 1000) {
            const step = 5 * 24 * 60 * 60 * 1000;
            for (let i = 5; i >= 0; i--) {
                const start = new Date(now.getTime() - i * step);
                const end = new Date(start.getTime() + step - 1);
                labels.push(`${formatDate(start)} - ${formatDate(end)}`);
            }
        }
        return labels;
    };

    useEffect(() => {
        const fetchRequestsData = async () => {
            try {
                const newLabels = getLabels(interval);
                setLabels(newLabels);

                const res = await axiosInstance.get(`/api/v1/analytics/requests?apiKey=${project.apiKey}`, {
                    params: { previousInterval: interval },
                    headers: { Authorization: `Bearer ${token}` },
                });

                const data = res.data;
                const beginningTime = new Date().getTime() - interval;
                const formattedData = [];
                const partitionSize = newLabels.length;

                for (let i = 0; i < partitionSize; i++) formattedData[i] = { x: i, y: 0 };

                for (let i = 0; i < data.length; i++) {
                    const endpointTime = new Date(data[i].createdAt).getTime();
                    let x = parseInt(((endpointTime - beginningTime) * partitionSize) / interval);
                    if (x >= 0 && x < partitionSize) formattedData[x].y++;
                }
                setRequestsData(formattedData);
            } catch (err) {
                console.error("Error fetching requests data:", err);
            }
        };
        if (project) fetchRequestsData();
    }, [interval, project, token]);

    if (!project) return <div className={`p-6 ${themeColors.secondary}`}>Loading project data...</div>;

    return (
        <div className={`p-6 ${themeColors.bg} border ${themeColors.border} rounded-lg shadow-sm`}>
            <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
                <h2 className={`text-xl font-bold ${themeColors.text}`}>Requests Data</h2>
                <select
                    value={interval}
                    onChange={(e) => setInterval(Number(e.target.value))}
                    className={`border rounded px-2 py-1 ${themeColors["bg"]} ${themeColors["text"]} border-${themeColors.border}`}
                >
                    {intervals.map((opt, i) => (
                        <option key={i} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>
            <div className="overflow-x-auto">
                <LineChart width={700} height={300} data={requestsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="x"
                        ticks={labels.map((_, i) => i)}
                        tickFormatter={(i) => labels[i]}
                    />
                    <YAxis dataKey="y" name="Requests made" />
                    <Tooltip formatter={(val) => `${val} Requests`} />
                    <Legend />
                    <Line type="monotone" dataKey="y" stroke="#8884d8" name="Requests" dot={true} />
                </LineChart>
            </div>
        </div>
    );
};

export default RequestData;
