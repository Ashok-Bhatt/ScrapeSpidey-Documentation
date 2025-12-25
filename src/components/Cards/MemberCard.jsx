import React from 'react';
import { themeColors } from '../../constants/classes.js';

const MemberCard = ({ name, role, image, linkedin }) => {
    return (
        <div
            className={`${themeColors.bg} border ${themeColors.border} rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl text-center flex flex-col`}
            style={{ width: "260px", minWidth: "220px", maxWidth: "100%" }}
        >
            <img
                src={image}
                alt={name}
                className="w-full h-48 object-cover"
            />
            <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                    <h3 className={`text-xl font-semibold ${themeColors.text}`}>{name}</h3>
                    <p className={`${themeColors.secondary}`}>{role}</p>
                </div>
                <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                    LinkedIn
                </a>
            </div>
        </div>
    );
};

export default MemberCard;
