import React from 'react';
import { themeColors } from '../constants/classes.js';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function RequestDistributionChart({ successfulCount, unsuccessfulCount, totalCount }) {
    const pieChartData = [
        { name: 'Successful', value: successfulCount, color: '#10b981' },
        { name: 'Failed', value: unsuccessfulCount, color: '#ef4444' }
    ];

    return (
        <div className={`${themeColors.bg} border ${themeColors.border} rounded-lg p-6 shadow-sm`}>
            <h2 className={`text-xl font-bold mb-4 ${themeColors.text}`}>Request Distribution</h2>
            <div className="flex flex-col md:flex-row items-center justify-around">
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {pieChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 md:mt-0">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <div className="w-4 h-4 bg-green-500 rounded"></div>
                            <span className={`font-medium ${themeColors.text}`}>Successful: {successfulCount.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-4 h-4 bg-red-500 rounded"></div>
                            <span className={`font-medium ${themeColors.text}`}>Failed: {unsuccessfulCount.toLocaleString()}</span>
                        </div>
                        <div className={`pt-2 border-t ${themeColors.border}`}>
                            <span className={`font-bold ${themeColors.text}`}>Total: {totalCount.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RequestDistributionChart;
