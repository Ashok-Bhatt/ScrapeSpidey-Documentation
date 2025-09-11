import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance.js"
import {BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ScatterChart, Scatter} from "recharts";
import {useAuth} from "../context/authContext.jsx"
import {themeColors} from "../constants/classes.js"
import {DAILY_API_POINT_LIMIT} from "../constants/index.jsx"

const Dashboard = ({ apiKey }) => {
  const [dailyData, setDailyData] = useState([]);
  const [requestsData, setRequestsData] = useState([]);
  const [dashboardOptionNo, setDashboardOptionNo] = useState(0);
  const [interval, setInterval] = useState(30 * 60 * 1000);
  const {user} = useAuth();
  const dashboardOption = ["Daily API Usage", "Requests Made"];

  useEffect(() => {
    const fetchDailyUsage = async () => {
      try {
        const res = await axiosInstance.get(`/api/v1/analytics/daily-usage`, {
          params: { apiKey: user.apiKey, lastDays: 7 }
        });
        const data = res.data;
        data.map((element)=>(element["apiPointsUsed"] = DAILY_API_POINT_LIMIT - element["remainingApiPoints"]))
        setDailyData(data);
      } catch (err) {
        console.error("Error fetching daily usage:", err);
      }
    };
    fetchDailyUsage();
  }, []);

  useEffect(() => {
    const fetchRequestsData = async () => {
      try {
        const res = await axiosInstance.get(`/api/v1/analytics/requests`, {
          params: { apiKey: user.apiKey, previousInterval: interval }
        });
        const formatted = res.data.map(req => ({
          x: new Date(req.createdAt).getTime(),
          y: req.responseTimeMs || 0
        }));
        setRequestsData(formatted);
      } catch (err) {
        console.error("Error fetching requests data:", err);
      }
    };
    fetchRequestsData();
  }, [interval]);

  const intervals = [
    { label: "Last 30 minutes", value: 30 * 60 * 1000 },
    { label: "Last 1 hour", value: 60 * 60 * 1000 },
    { label: "Last 6 hours", value: 6 * 60 * 60 * 1000 },
    { label: "Last 1 day", value: 24 * 60 * 60 * 1000 },
    { label: "Last 1 week", value: 7 * 24 * 60 * 60 * 1000 },
    { label: "Last 15 days", value: 15 * 24 * 60 * 60 * 1000 },
    { label: "Last 1 month", value: 30 * 24 * 60 * 60 * 1000 }
  ];

  return (
    <div className="w-full h-full p-6 space-y-8">

      <div className="flex gap-2">
        {dashboardOption.map((option, index)=>(
          <div className="rounded-full py-1 px-5 border-1 border-gray-500" style={{background: dashboardOptionNo==index ? "#00ff00" : "inherit"}} onClick={()=>setDashboardOptionNo(index)} key={option}>{option}</div>
        ))}
      </div>

      {dashboardOptionNo==0 && <div>
        {<h2 className="text-xl font-bold mb-4">Daily API Usage (Last 7 Days)</h2>}
        <BarChart width={700} height={300} data={dailyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="requestsMade" fill="#8884d8" name="Requests Made" />
          <Bar dataKey="apiPointsUsed" fill="#82ca9d" name="API Points Used" />
        </BarChart>
      </div>}

      {dashboardOptionNo==1 && <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Requests Data</h2>
          <select
            value={interval}
            onChange={(e) => setInterval(Number(e.target.value))}
            className={`border rounded px-2 py-1 ${themeColors["bg"]} ${themeColors["text"]}`}
          >
            {intervals.map((opt, i) => (
              <option key={i} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <ScatterChart width={700} height={300}>
          <CartesianGrid />
          <XAxis
            dataKey="x"
            name="Time"
            type="number"
            domain={["auto", "auto"]}
            tickFormatter={(ts) => new Date(ts).toLocaleTimeString()}
          />
          <YAxis dataKey="y" name="Response Time (ms)" />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            formatter={(val, name) =>
              name === "Time" ? new Date(val).toLocaleString() : `${val} ms`
            }
          />
          <Scatter name="Requests" data={requestsData} fill="#8884d8" />
        </ScatterChart>
      </div>}
    </div>
  );
};

export default Dashboard;