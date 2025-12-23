import React from 'react';
import { themeColors } from '../constants/classes.js';

function StatCard({ title, value, badge, valueColor = '' }) {
    return (
        <div className={`${themeColors.bg} border rounded-lg p-6 shadow-sm`}>
            <h3 className="text-sm font-medium text-gray-500 mb-2">{title}</h3>
            <p className={`text-3xl font-bold mb-2 ${valueColor}`}>
                {value.toLocaleString()}
            </p>
            {badge && (
                <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-sm font-medium ${badge.className}`}>
                        {badge.text}
                    </span>
                </div>
            )}
        </div>
    );
}

export default StatCard;
