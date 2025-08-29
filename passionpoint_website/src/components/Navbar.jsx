// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../firebase";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../components/ui/dropdown-menu";
import { Button } from "../components/ui/button.tsx"; // <- fixed import (no .tsx)
import { User } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  // Keep user state in sync with Firebase auth
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  // Log out
  const handleLogout = async () => {
    if (!window.confirm("Are you sure you want to log out?")) return;
    try {
      await auth.signOut();
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // New blog: consistent route
  const handleNewBlogClick = () => {
    if (user) {
      navigate("/create-blog");
    } else {
      navigate("/register");
    }
  };

  /**
   * Smooth scroll helper:
   * - If already on home (pathname === "/") scroll immediately.
   * - Otherwise navigate to home and pass the target in location.state.
   * Home page should read location.state?.scrollTo and perform the scrolling (see note below).
   */
  const gotoHomeSection = (sectionId) => {
    if (location.pathname === "/") {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: sectionId } });
    }
  };

  // Utility class for NavLink active styling
  const navLinkClass = ({ isActive }) =>
    `px-2 py-1 rounded-sm transition "hover:text-gray-300"}`;

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className="w-full bg-black p-4 text-white flex justify-between items-center fixed top-0 left-0 z-50"
    >
      {/* Logo + Name (clickable) */}
      <NavLink to="/" className="flex items-center gap-3" aria-label="Go to PassionPoint home">
        <img
          src="/images/logo.png"
          alt="PassionPoint — Home"
          className="h-10 w-10 object-contain"
          width={40}
          height={40}
        />
        <span className="text-2xl font-bold">PassionPoint</span>
      </NavLink>

      {/* Links */}
      <div className="flex items-center space-x-4">
        {/* Home & About: use button-like elements so we control navigation + scrolling */}
        <Button onClick={() => gotoHomeSection("hero")}
        className="text-white hover:text-gray-300" aria-haspopup="menu">
          Home
        </Button>

        <Button onClick={() => gotoHomeSection("about")}
        className="text-white hover:text-gray-300" aria-haspopup="menu">
          About Us
        </Button>

        {/* Blog Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button  className="text-white hover:text-gray-300" aria-haspopup="menu">
              Blog
            </Button>
          </DropdownMenuTrigger>

          {/* simplified styling — avoid force-override (!) usage */}
          <DropdownMenuContent className="bg-black text-white border-none shadow-lg min-w-[160px]">
            <DropdownMenuItem asChild>
              <NavLink to="/blog" className="w-full block px-3 py-2 hover:bg-gray-900 rounded-sm">
                View Blogs
              </NavLink>
            </DropdownMenuItem>

            {/* New Blog uses logic that checks auth and routes appropriately */}
            <DropdownMenuItem>
              <button
                onClick={handleNewBlogClick}
                className="w-full text-left px-3 py-2 hover:bg-gray-900 rounded-sm"
              >
                New Blog
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Forum (use NavLink to get active styling) */}
        <Button className="text-white hover:text-gray-300" aria-haspopup="menu">
          <NavLink to="/forum" className={navLinkClass}>
            Forum
          </NavLink>
        </Button>

        {/* Register: hide when logged in */}
        {!user && (
          <Button className="text-white hover:text-gray-300" aria-haspopup="menu">
            <NavLink to="/register" className={navLinkClass}>
              Register
            </NavLink>
          </Button>
        )}

        {/* Account Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="flex items-center gap-1 text-white hover:bg-gray-800"
              aria-label="Account menu"
              aria-haspopup="menu"
            >
              <User size={18} />
              <span>Account</span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="bg-black text-white border-none shadow-lg min-w-[160px]">
            {user ? (
              <>
                <DropdownMenuItem asChild>
                  <NavLink to="/account" className="w-full block px-3 py-2 hover:bg-gray-900 rounded-sm">
                    My Profile
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button onClick={handleLogout} className="w-full text-left px-3 py-2 hover:bg-gray-900 rounded-sm">
                    Logout
                  </button>
                </DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem asChild>
                <NavLink to="/login" className="w-full block px-3 py-2 hover:bg-gray-900 rounded-sm">
                  Login
                </NavLink>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}

export default Navbar;
