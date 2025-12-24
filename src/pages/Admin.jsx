import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { themeColors } from '../constants/classes';
import classNames from 'classnames';

function Admin() {
    const [activeTab, setActiveTab] = useState('analytics');

    const links = [
        { name: 'Analytics', path: '/admin/analytics' },
        { name: 'Users', path: '/admin/users' },
        { name: 'News', path: '/admin/news' },
    ];

    return (
        <div className="flex h-[calc(100vh-64px)] w-full"> {/* Adjust height based on Navbar */}
            {/* Sidebar */}
            <div className={classNames(themeColors.bg, themeColors.border, "w-64 border-r p-4 flex flex-col gap-2")}>
                <h2 className="text-xl font-bold mb-4 px-3 text-blue-600">Admin Console</h2>
                {links.map((link) => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        className={({ isActive }) =>
                            classNames(
                                "px-4 py-2 rounded-lg font-medium transition-colors",
                                isActive ? "bg-blue-600/10 text-blue-500" : `${themeColors.secondary} hover:bg-blue-500/5`
                            )
                        }
                    >
                        {link.name}
                    </NavLink>
                ))}
            </div>

            {/* Main Content Area */}
            <div className={`flex-1 overflow-y-auto p-6 ${themeColors["bg-gradient"]}`}>
                <Outlet />
            </div>
        </div>
    );
}

export default Admin;
