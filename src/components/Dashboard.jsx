import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance.js"
import {BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, LineChart, Line, ReferenceLine} from "recharts";
import {useAuth} from "../context/authContext.jsx"
import {themeColors} from "../constants/classes.js"
import {DAILY_API_POINT_LIMIT} from "../constants/index.jsx"

const Dashboard = ({ apiKey }) => {
  const [dailyData, setDailyData] = useState([]);
  const [requestsData, setRequestsData] = useState([]);
  const [dashboardOptionNo, setDashboardOptionNo] = useState(0);
  const [interval, setInterval] = useState(30 * 60 * 1000);
  const {user, token} = useAuth();
  const dashboardOption = ["Daily API Usage", "Requests Made"];

  useEffect(() => {
    const fetchDailyUsage = async () => {
      try {
        const res = await axiosInstance.get(`/api/v1/analytics/daily-usage`, {
          params: { lastDays: 7 },
          headers: {Authorization: `Bearer ${token}`},
        });
        const data = res.data;
        data.map((element)=>(element["apiPointsUsed"] = DAILY_API_POINT_LIMIT - element["remainingApiPoints"]))
        setDailyData(data);
      } catch (err) {
        console.error("Error fetching daily usage:", err);
      }
    };
    if (user) fetchDailyUsage();
  }, []);

  useEffect(() => {
    const fetchRequestsData = async () => {
      try {
        const res = await axiosInstance.get(`/api/v1/analytics/requests`, {
          params: { previousInterval: interval },
          headers: {Authorization: `Bearer ${token}`},
        });

        const data = res.data;
        const beginningTime = new Date().getTime() - interval;
        const formattedData = [];
        const partitionSize = 12
        
        for (let i=0; i<=partitionSize; i++) formattedData[i] = {x:i, y:0};

        for (let i=0; i<data.length; i++){
            const endpointTime = new Date(data[i].createdAt).getTime();
            let x = parseInt(((endpointTime - beginningTime)*partitionSize)/interval);
            formattedData[x].y++;
        }
        setRequestsData(formattedData);
      } catch (err) {
        console.error("Error fetching requests data:", err);
      }
    };
    if (user) fetchRequestsData();
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
          <button className="rounded-full py-1 px-5 border-1 border-gray-500 hover:cursor-pointer" style={{background: dashboardOptionNo==index ? "#00ff00" : "inherit"}} onClick={()=>setDashboardOptionNo(index)} key={option}>{option}</button>
        ))}
      </div>

      {dashboardOptionNo==0 && <div>
        {<h2 className="text-xl font-bold mb-4">Daily API Usage (Last 7 Days)</h2>}
        <BarChart width={700} height={300} data={dailyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[DAILY_API_POINT_LIMIT + 5, 'auto']}/>
          <Tooltip />
          <Legend />
          <Bar dataKey="requestsMade" fill="#8884d8" name="Requests Made" />
          <Bar dataKey="apiPointsUsed" fill="#82ca9d" name="API Points Used" />
          <ReferenceLine y={DAILY_API_POINT_LIMIT} stroke="red" strokeDasharray="3 3" label="Daily API Points Limit" />
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
        <LineChart width={700} height={300} data={requestsData}>
          <CartesianGrid />
          <XAxis
            dataKey="x"
            name="Time"
            type="number"
            domain={["auto", "auto"]}
          />
          <YAxis dataKey="y" name="Requests made" />
          <Tooltip
            formatter={(val, name) =>`${val} Requests`}
          />
          <Legend />
          <Line type="monotone" dataKey="y" stroke="#8884d8" name="Requests" dot={true} />
        </LineChart>
      </div>}
    </div>
  );
};

export default Dashboard;