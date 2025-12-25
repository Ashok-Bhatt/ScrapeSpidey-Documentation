import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { themeColors } from '../constants/classes.js';
import { BarChart2, Users, Newspaper } from 'lucide-react';
import classNames from 'classnames';

function Admin() {

    const links = [
        { name: 'Analytics', path: '/admin/analytics', icon: <BarChart2 size={18} /> },
        { name: 'Users', path: '/admin/users', icon: <Users size={18} /> },
        { name: 'News', path: '/admin/news', icon: <Newspaper size={18} /> },
    ];

    return (
        <div className="h-full p-6 flex flex-col overflow-hidden">
            <h1 className={`text-3xl font-bold mb-8 ${themeColors.text}`}>Admin Console</h1>

            <div className="flex flex-col md:flex-row gap-8 flex-1 min-h-0">
                {/* Sidebar Navigation */}
                <div className="w-full md:w-64 flex flex-col gap-2 overflow-y-auto">
                    {links.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                classNames(
                                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                    isActive ? "bg-blue-600/10 text-blue-500 shadow-sm" : `${themeColors.secondary} hover:bg-blue-500/5`
                                )
                            }
                        >
                            {link.icon} {link.name}
                        </NavLink>
                    ))}
                </div>

                {/* Content Area */}
                <div className={`flex-1 flex flex-col rounded-xl shadow-sm border p-6 overflow-hidden ${themeColors.bg} ${themeColors.border}`}>
                    <div className="flex-1 overflow-y-auto no-scrollbar">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;
