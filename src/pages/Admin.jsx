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
            <div className={classNames(themeColors.bg, "w-64 border-r p-4 flex flex-col gap-2")}>
                <h2 className="text-xl font-bold mb-4 px-3 text-blue-600">Admin Console</h2>
                {links.map((link) => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        className={({ isActive }) =>
                            classNames(
                                "px-4 py-2 rounded-lg font-medium transition-colors",
                                isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"
                            )
                        }
                    >
                        {link.name}
                    </NavLink>
                ))}
            </div>

            {/* Main Content Area */}
            <div className={`flex-1 overflow-y-auto p-6 ${themeColors["bg-secondary"]}`}>
                <Outlet />
            </div>
        </div>
    );
}

export default Admin;
