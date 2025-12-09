import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useAuth } from '../context/authContext';
import toast from 'react-hot-toast';

function ChangeApiLimitModal({ showApiLimitChanger, setShowApiLimitChanger, user }) {
  const [newLimit, setNewLimit] = useState("");
  const { token } = useAuth();

  const handleOk = () => {
    if (newLimit.trim() !== "") {
      axiosInstance.patch("/api/v1/user/daily-api-limit", { userId: user._id, newApiPointsDailyLimit: newLimit }, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          toast.success("Daily API Limit Changed Successfully");
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message || "Something Went Wrong");
        })
    }
    setShowApiLimitChanger(false);
  };

  const handleCancel = () => {
    setShowApiLimitChanger(false);
  };

  if (!showApiLimitChanger) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-semibold mb-4">Change API Limit of User</h2>

        <div className="mb-3">
          <p className="text-gray-700 text-sm">
            <span className="font-medium">Current Limit:</span> {user.apiPointsDailyLimit}
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">New Limit:</label>
          <input
            type="number"
            value={newLimit}
            onChange={(e) => setNewLimit(e.target.value)}
            className="w-full border rounded px-3 py-2 text-sm outline-none focus:ring"
            placeholder="Enter new limit"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-sm border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleOk}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChangeApiLimitModal;