import { useState } from "react";
import { useAuth } from "../context/authContext.jsx"

const LogoutButton = () => {
  const {logout} = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await logout();
    setLoading(false);
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 hover:cursor-pointer disabled:opacity-50"
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
};

export default LogoutButton;