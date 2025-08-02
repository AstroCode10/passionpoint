import React from "react";
import { LogOut } from "lucide-react";

const LogoutButton = ({ onLogout }) => {
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      onLogout?.();
      // You can redirect or clear auth tokens here
      console.log("Logged out");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-4 py-2 mt-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200"
    >
      <LogOut size={18} />
      Logout
    </button>
  );
};

export default LogoutButton;
