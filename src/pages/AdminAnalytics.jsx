import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance.js';
import { useAuth } from '../context/authContext.jsx';
import toast from 'react-hot-toast';
import StatCard from '../components/StatCard.jsx';
import DateRangeSelector from '../components/DateRangeSelector.jsx';
import RequestDistributionChart from '../components/RequestDistributionChart.jsx';
import EndpointPerformanceTable from '../components/EndpointPerformanceTable.jsx';
import { themeColors } from '../constants/classes.js';

function AdminAnalytics() {
    const [analyticsData, setAnalyticsData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [dateRange, setDateRange] = useState('30days');
    const [customStart, setCustomStart] = useState('');
    const [customEnd, setCustomEnd] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'count', direction: 'desc' });
    const { token } = useAuth();

    const dateRanges = {
        '7days': { label: 'Last 7 Days', days: 7 },
        '30days': { label: 'Last 30 Days', days: 30 },
        '90days': { label: 'Last 3 Months', days: 90 },
        'custom': { label: 'Custom Range', days: null }
    };

    const sortOptions = [
        { key: 'count', label: 'Total Requests' },
        { key: 'successfulCount', label: 'Successful Requests' },
        { key: 'unsuccessfulCount', label: 'Failed Requests' },
        { key: 'averageResponseTime', label: 'Avg Response Time' },
        { key: 'successRate', label: 'Success Rate' },
        { key: 'endpoint', label: 'Endpoint Name' }
    ];

    const getTimestamps = () => {
        if (dateRange === 'custom') {
            if (!customStart || !customEnd) return null;
            return {
                startInterval: new Date(customStart).getTime(),
                endInterval: new Date(customEnd).getTime()
            };
        }
        const endInterval = Date.now();
        const startInterval = endInterval - (dateRanges[dateRange].days * 24 * 60 * 60 * 1000);
        return { startInterval, endInterval };
    };

    const fetchAnalytics = async () => {
        const timestamps = getTimestamps();
        if (!timestamps) {
            toast.error('Please select valid date range');
            return;
        }

        setLoading(true);
        try {
            const res = await axiosInstance.get('/api/v1/analytics/admin-analytics', {
                params: timestamps,
                headers: { Authorization: `Bearer ${token}` }
            });
            setAnalyticsData(res.data);
        } catch (error) {
            console.error('Error fetching analytics:', error);
            toast.error(error?.response?.data?.message || 'Failed to fetch analytics data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token && dateRange != "custom") {
            fetchAnalytics();
        }
    }, [dateRange, token]);

    const handleSort = (key) => {
        let direction = 'desc';
        if (sortConfig.key === key) {
            direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
        }
        setSortConfig({ key, direction });
    };

    const getSortedEndpoints = () => {
        if (!analyticsData?.endpointAnalytics) return [];

        const sorted = [...analyticsData.endpointAnalytics].sort((a, b) => {
            let aValue = a[sortConfig.key];
            let bValue = b[sortConfig.key];

            if (sortConfig.key === 'successRate') {
                aValue = (a.successfulCount / a.count) * 100;
                bValue = (b.successfulCount / b.count) * 100;
            }

            if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });

        return sorted;
    };

    const calculatePercentage = (value, total) => {
        return total > 0 ? ((value / total) * 100).toFixed(1) : 0;
    };

    return (
        <div className="h-full flex flex-col">
            <div className="mb-6">
                <h1 className={`text-3xl font-bold mb-4 ${themeColors.text}`}>Analytics Dashboard</h1>

                <DateRangeSelector
                    dateRange={dateRange}
                    setDateRange={setDateRange}
                    customStart={customStart}
                    setCustomStart={setCustomStart}
                    customEnd={customEnd}
                    setCustomEnd={setCustomEnd}
                    onApply={fetchAnalytics}
                    loading={loading}
                />
            </div>

            {loading && !analyticsData ? (
                <div className="flex items-center justify-center h-64">
                    <p className="text-xl text-gray-500">Loading analytics data...</p>
                </div>
            ) : analyticsData ? (
                <div className="flex-1 overflow-y-auto space-y-6">
                    {/* Statistics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <StatCard
                            title="Total Users"
                            value={analyticsData.users.totalAllTime}
                            badge={{
                                text: `+${analyticsData.users.createdInInterval} in period`,
                                className: 'bg-blue-100 text-blue-700'
                            }}
                        />

                        <StatCard
                            title="Total Projects"
                            value={analyticsData.projects.totalAllTime}
                            badge={{
                                text: `+${analyticsData.projects.createdInInterval} in period`,
                                className: 'bg-purple-100 text-purple-700'
                            }}
                        />

                        <StatCard
                            title="Successful Requests"
                            value={analyticsData.requests.successfulCount}
                            valueColor="text-green-600"
                            badge={{
                                text: `${calculatePercentage(analyticsData.requests.successfulCount, analyticsData.requests.totalInInterval)}% success rate`,
                                className: 'text-sm text-gray-600 bg-transparent px-0'
                            }}
                        />

                        <StatCard
                            title="Failed Requests"
                            value={analyticsData.requests.unsuccessfulCount}
                            valueColor="text-red-600"
                            badge={{
                                text: `${calculatePercentage(analyticsData.requests.unsuccessfulCount, analyticsData.requests.totalInInterval)}% failure rate`,
                                className: 'text-sm text-gray-600 bg-transparent px-0'
                            }}
                        />
                    </div>

                    {/* Request Distribution Chart */}
                    <RequestDistributionChart
                        successfulCount={analyticsData.requests.successfulCount}
                        unsuccessfulCount={analyticsData.requests.unsuccessfulCount}
                        totalCount={analyticsData.requests.totalInInterval}
                    />

                    {/* Endpoint Performance Table */}
                    <EndpointPerformanceTable
                        endpoints={getSortedEndpoints()}
                        sortConfig={sortConfig}
                        onSort={handleSort}
                        sortOptions={sortOptions}
                    />
                </div>
            ) : (
                <div className="flex items-center justify-center h-64">
                    <p className="text-xl text-gray-500">No data available</p>
                </div>
            )}
        </div>
    );
}

export default AdminAnalytics;
