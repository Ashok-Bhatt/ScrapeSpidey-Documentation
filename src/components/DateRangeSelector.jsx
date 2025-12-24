import React from 'react';
import { themeColors } from '../constants/classes.js';
import { Loader } from 'lucide-react';

function DateRangeSelector({
    dateRange,
    setDateRange,
    customStart,
    setCustomStart,
    customEnd,
    setCustomEnd,
    onApply,
    loading
}) {
    const dateRanges = {
        '7days': { label: 'Last 7 Days', days: 7 },
        '30days': { label: 'Last 30 Days', days: 30 },
        '90days': { label: 'Last 3 Months', days: 90 },
        'custom': { label: 'Custom Range', days: null }
    };

    return (
        <div className="flex flex-wrap gap-4 items-end">
            <div>
                <label className={`block text-sm font-medium mb-2 ${themeColors.secondary}`}>Time Period</label>
                <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className={`border rounded-lg px-4 py-2 ${themeColors.bg} ${themeColors.text}`}
                >
                    {Object.entries(dateRanges).map(([key, { label }]) => (
                        <option key={key} value={key}>{label}</option>
                    ))}
                </select>
            </div>

            {dateRange === 'custom' && (
                <>
                    <div>
                        <label className={`block text-sm font-medium mb-2 ${themeColors.secondary}`}>Start Date</label>
                        <input
                            type="date"
                            value={customStart}
                            onChange={(e) => setCustomStart(e.target.value)}
                            className={`border rounded-lg px-4 py-2 ${themeColors.bg} ${themeColors.text}`}
                        />
                    </div>
                    <div>
                        <label className={`block text-sm font-medium mb-2 ${themeColors.secondary}`}>End Date</label>
                        <input
                            type="date"
                            value={customEnd}
                            onChange={(e) => setCustomEnd(e.target.value)}
                            className={`border rounded-lg px-4 py-2 ${themeColors.bg} ${themeColors.text}`}
                        />
                    </div>
                    <button
                        onClick={onApply}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        disabled={loading}
                    >
                        {loading ? <Loader /> : 'Apply'}
                    </button>
                </>
            )}
        </div>
    );
}

export default DateRangeSelector;
