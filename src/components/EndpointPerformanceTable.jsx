import React from 'react';
import { themeColors } from '../constants/classes.js';

function EndpointPerformanceTable({
    endpoints,
    sortConfig,
    onSort,
    sortOptions
}) {
    const getSuccessRateColor = (successRate) => {
        if (successRate >= 95) return 'text-green-600';
        if (successRate >= 80) return 'text-yellow-600';
        return 'text-red-600';
    };

    return (
        <div className={`${themeColors.bg} border rounded-lg p-6 shadow-sm`}>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Endpoint Performance</h2>
                {/* Sorting Controls */}
                <div className="flex gap-2 items-center">
                    <select
                        value={sortConfig.key}
                        onChange={(e) => onSort(e.target.value)}
                        className={`border rounded-lg px-4 py-2 ${themeColors.bg} ${themeColors.text}`}
                    >
                        {sortOptions.map((option) => (
                            <option key={option.key} value={option.key}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={() => onSort(sortConfig.key)}
                        className="px-3 py-2 border rounded-lg hover:bg-gray-100 transition-colors"
                        title="Reverse sort order"
                    >
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left p-3">Endpoint</th>
                            <th className="text-right p-3">Total Requests</th>
                            <th className="text-right p-3">Successful</th>
                            <th className="text-right p-3">Failed</th>
                            <th className="text-right p-3">Avg Response (ms)</th>
                            <th className="text-right p-3">Success Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {endpoints.map((endpoint, index) => {
                            const successRate = (endpoint.successfulCount / endpoint.count) * 100;
                            return (
                                <tr key={index} className="border-b hover:bg-gray-50">
                                    <td className="p-3 font-mono text-sm">{endpoint.endpoint}</td>
                                    <td className="p-3 text-right font-medium">{endpoint.count.toLocaleString()}</td>
                                    <td className="p-3 text-right text-green-600">{endpoint.successfulCount.toLocaleString()}</td>
                                    <td className="p-3 text-right text-red-600">{endpoint.unsuccessfulCount.toLocaleString()}</td>
                                    <td className="p-3 text-right">{endpoint.averageResponseTime.toFixed(2)}</td>
                                    <td className={`p-3 text-right font-bold ${getSuccessRateColor(successRate)}`}>
                                        {successRate.toFixed(1)}%
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {endpoints.length === 0 && (
                    <p className="text-center py-8 text-gray-500">No endpoint data available for this period</p>
                )}
            </div>
        </div>
    );
}

export default EndpointPerformanceTable;
