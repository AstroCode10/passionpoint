import React from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LogoutButton = ({ onLogout }) => {
  const navigate = useNavigate(); // React Router hook for programmatic navigation

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      onLogout?.();

      // Optional: clear localStorage/sessionStorage if used
      // localStorage.removeItem("token"); // example

      console.log("Logged out");
      navigate("/login"); // 🔁 redirect to login page
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

