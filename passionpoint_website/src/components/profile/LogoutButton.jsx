import React from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { Button } from "../ui/button.tsx"; // Assuming you have a Button component in ui/button

const LogoutButton = ({ onLogout }) => {
  const navigate = useNavigate(); // React Router hook for programmatic navigation

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to log out?")) {
      const auth = getAuth();
      try {
        await signOut(auth); // actually logs the user out
        onLogout?.();         // optional additional cleanup
        console.log("Logged out");
        navigate("/login");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }
  };


  return (
    <Button
      onClick={handleLogout}
      className="flex items-center gap-2 px-4 py-2 mt-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200"
    >
      <LogOut size={18} />
      Logout
    </Button>
  );
};

export default LogoutButton;

