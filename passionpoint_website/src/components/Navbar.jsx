import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../components/ui/dropdown-menu";
import { Button } from "./ui/button.tsx";
import { User } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      auth.signOut().then(() => navigate("/login"));
    }
  };

  return (
    <nav className="bg-black p-4 text-white flex justify-between items-center">
      {/* Logo + Name */}
      <div className="flex items-center space-x-2">
        <img src="/images/logo.png" alt="PassionPoint Logo" className="h-10 w-10" />
        <div className="text-2xl font-bold">PassionPoint</div>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center space-x-4">
        <Link to="/">Home</Link>
        <Link to="/about">About Us</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/forum">Forum</Link>
        <Link to="/register">Register</Link>

        {/* Account Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-1 text-white hover:bg-gray-800">
              <User size={18} />
              <span>Account</span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-48">
            {user ? (
              <>
                <DropdownMenuItem asChild>
                  <Link to="/account">My Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/create">Create Blog</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem asChild>
                <Link to="/login">Login</Link>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}

export default Navbar;
