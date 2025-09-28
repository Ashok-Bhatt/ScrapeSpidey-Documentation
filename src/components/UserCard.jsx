import React from 'react';

function UserCard({ name, bio, email, profilePic, apiPointsDailyLimit, onClickEvent }) {
  return (
    <div className="flex items-center gap-4 bg-white border shadow-sm rounded-lg p-4" onClick={()=>onClickEvent()}>
      <img
        src={profilePic || "/Images/user_default_image.png"}
        alt="Profile"
        className="w-14 h-14 rounded-full object-cover border"
      />

      <div className="flex flex-col w-full h-full">
        <div className="flex flex-grow flex-wrap justify-between items-center text-sm text-gray-800">
          <span className="font-semibold">{name}</span>
          <span>{email}</span>
          <span>Limit: {apiPointsDailyLimit}</span>
        </div>

        {bio && (
          <p className="text-xs flex-grow text-gray-600 truncate mt-1 max-w-full">
            {bio}
          </p>
        )}
      </div>
    </div>
  );
}

export default UserCard;