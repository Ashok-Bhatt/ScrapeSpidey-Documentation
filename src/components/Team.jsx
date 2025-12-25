import React from 'react';
import { teamMembers } from '../constants/index.jsx';
import MemberCard from './Cards/MemberCard.jsx';
import { themeColors } from '../constants/classes.js';

const Team = () => {
    return (
        <div className="space-y-6">
            <h2 className={`text-3xl font-bold text-center ${themeColors.text}`}>Meet Our Team</h2>
            <div className="flex flex-wrap justify-center gap-6 w-full">
                {teamMembers.map((member) => (
                    <MemberCard
                        key={member.name}
                        {...member}
                    />
                ))}
            </div>
        </div>
    );
};

export default Team;
